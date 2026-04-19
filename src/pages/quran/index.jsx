import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown, BookOpen, Volume2, Pause, Play, Bookmark, Share2, Copy, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'

export default function QuranPage() {
    const [suratList, setSuratList] = useState([])
    const [selectedSurat, setSelectedSurat] = useState(null)
    const [ayatList, setAyatList] = useState([])
    const [ayatStart, setAyatStart] = useState("1")
    const [ayatEnd, setAyatEnd] = useState("10")
    const [loading, setLoading] = useState(true)
    const [loadingAyat, setLoadingAyat] = useState(false)
    const [playingAyat, setPlayingAyat] = useState(null)
    const [selectedReader, setSelectedReader] = useState("01")
    const [bookmarks, setBookmarks] = useState([])
    const [copyFeedback, setCopyFeedback] = useState(null)
    const audioRef = useRef(null)

    const readers = {
        "01": "Abdullah Al-Juhany",
        "02": "Abdul Muhsin Al-Qasim",
        "03": "Abdurrahman as-Sudais",
        "04": "Ibrahim Al-Dossari",
        "05": "Misyari Rasyid Al-Afasi",
        "06": "Yasser Al-Dosari"
    }

    // Fetch surat list on component mount
    useEffect(() => {
        const fetchSurat = async () => {
            try {
                const response = await fetch("https://equran.id/api/v2/surat")
                const data = await response.json()
                setSuratList(data.data || [])

                // Set default surat
                const anNaba = data.data?.find(s => s.namaLatin === "An-Naba")
                if (anNaba) {
                    setSelectedSurat(anNaba)
                    fetchAyat(anNaba.nomor)
                    setAyatEnd(Math.min(20, anNaba.jumlahAyat).toString())
                }
            } catch (error) {
                console.error("Error fetching surat:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchSurat()
    }, [])

    const fetchAyat = async (suratNomor) => {
        setLoadingAyat(true)
        try {
            const response = await fetch(`https://equran.id/api/v2/surat/${suratNomor}`)
            const data = await response.json()
            setAyatList(data.data?.ayat || [])
        } catch (error) {
            console.error("Error fetching ayat:", error)
            setAyatList([])
        } finally {
            setLoadingAyat(false)
        }
    }

    const handleSuratChange = (e) => {
        const surat = suratList.find(s => s.nomor == e.target.value)
        if (surat) {
            setSelectedSurat(surat)
            setAyatStart("1")
            setAyatEnd(Math.min(20, surat.jumlahAyat).toString())
            fetchAyat(surat.nomor)
            setPlayingAyat(null)
        }
    }

    const handleAyatStartChange = (val) => {
        const num = Math.max(1, parseInt(val) || 1)
        setAyatStart(num.toString())
    }

    const handleAyatEndChange = (val) => {
        const num = parseInt(val) || 20
        const maxAyat = selectedSurat?.jumlahAyat || 286
        setAyatEnd(Math.min(num, maxAyat).toString())
    }

    const handlePrevSurat = () => {
        if (selectedSurat?.nomor > 1) {
            const prevSurat = suratList.find(s => s.nomor === selectedSurat.nomor - 1)
            if (prevSurat) {
                setSelectedSurat(prevSurat)
                setAyatStart("1")
                setAyatEnd(Math.min(20, prevSurat.jumlahAyat).toString())
                fetchAyat(prevSurat.nomor)
                setPlayingAyat(null)
            }
        }
    }

    const handleNextSurat = () => {
        if (selectedSurat?.nomor < 114) {
            const nextSurat = suratList.find(s => s.nomor === selectedSurat.nomor + 1)
            if (nextSurat) {
                setSelectedSurat(nextSurat)
                setAyatStart("1")
                setAyatEnd(Math.min(20, nextSurat.jumlahAyat).toString())
                fetchAyat(nextSurat.nomor)
                setPlayingAyat(null)
            }
        }
    }

    const playAyat = (ayat) => {
        if (!ayat.audio || !ayat.audio[selectedReader]) return

        setPlayingAyat(ayat.nomorAyat)
        const audio = new Audio(ayat.audio[selectedReader])
        audio.play()

        audio.onended = () => {
            setPlayingAyat(null)
        }
    }

    const toggleBookmark = (ayat) => {
        const bookmarkKey = `${selectedSurat?.nomor}-${ayat.nomorAyat}`
        if (bookmarks.includes(bookmarkKey)) {
            setBookmarks(bookmarks.filter(b => b !== bookmarkKey))
        } else {
            setBookmarks([...bookmarks, bookmarkKey])
        }
    }

    const copyToClipboard = (text, ayatNum) => {
        navigator.clipboard.writeText(text)
        setCopyFeedback(ayatNum)
        setTimeout(() => setCopyFeedback(null), 2000)
    }

    const getDisplayedAyat = () => {
        const start = parseInt(ayatStart) || 1
        const end = parseInt(ayatEnd) || 20
        return ayatList.filter(a => a.nomorAyat >= start && a.nomorAyat <= end)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading Quran data...</div>
            </div>
        )
    }

    const displayedAyat = getDisplayedAyat()
    const maxAyat = selectedSurat?.jumlahAyat || 286

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <BookOpen size={32} />
                            <div>
                                <h1 className="text-3xl font-bold">Quran Reader</h1>
                                <p className="text-green-100 text-sm">Read and study the Holy Quran</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-green-100 text-sm">Surat {selectedSurat?.nomor} of 114</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Controls Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8 sticky top-24 z-40">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        {/* Surat Selection */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Surah
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedSurat?.nomor || ""}
                                    onChange={handleSuratChange}
                                    className="w-full appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-2 pr-10 focus:border-green-500 focus:outline-none text-sm"
                                >
                                    {suratList.map((surat) => (
                                        <option key={surat.nomor} value={surat.nomor}>
                                            {surat.nomor}. {surat.namaLatin}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown
                                    size={18}
                                    className="absolute right-3 top-2.5 text-gray-400 pointer-events-none"
                                />
                            </div>
                        </div>

                        {/* Ayat Range */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                From
                            </label>
                            <input
                                type="number"
                                min="1"
                                max={maxAyat}
                                value={ayatStart}
                                onChange={(e) => handleAyatStartChange(e.target.value)}
                                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                To
                            </label>
                            <input
                                type="number"
                                min="1"
                                max={maxAyat}
                                value={ayatEnd}
                                onChange={(e) => handleAyatEndChange(e.target.value)}
                                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none text-sm"
                            />
                        </div>

                        {/* Reader Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reader
                            </label>
                            <select
                                value={selectedReader}
                                onChange={(e) => setSelectedReader(e.target.value)}
                                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none text-sm"
                            >
                                {Object.entries(readers).map(([key, name]) => (
                                    <option key={key} value={key}>{name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={handlePrevSurat}
                            disabled={selectedSurat?.nomor === 1}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors text-sm"
                        >
                            <ChevronLeft size={16} /> Previous Surah
                        </button>
                        <button
                            onClick={handleNextSurat}
                            disabled={selectedSurat?.nomor === 114}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors text-sm"
                        >
                            Next Surah <ChevronRight size={16} />
                        </button>
                    </div>

                    {/* Surat Info */}
                    {selectedSurat && (
                        <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <span className="text-gray-600 text-xs uppercase">Name</span>
                                <p className="font-semibold text-gray-800">{selectedSurat.namaLatin}</p>
                            </div>
                            <div>
                                <span className="text-gray-600 text-xs uppercase">Arabic</span>
                                <p className="font-semibold text-xl text-gray-800">{selectedSurat.nama}</p>
                            </div>
                            <div>
                                <span className="text-gray-600 text-xs uppercase">Meaning</span>
                                <p className="font-semibold text-gray-800">{selectedSurat.arti}</p>
                            </div>
                            <div>
                                <span className="text-gray-600 text-xs uppercase">Verses</span>
                                <p className="font-semibold text-gray-800">{selectedSurat.jumlahAyat}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Verses Display */}
                {loadingAyat ? (
                    <div className="text-center text-gray-600 py-12">
                        <p>Loading verses...</p>
                    </div>
                ) : displayedAyat.length > 0 ? (
                    <div className="space-y-4">
                        {displayedAyat.map((ayat) => {
                            const isBookmarked = bookmarks.includes(`${selectedSurat?.nomor}-${ayat.nomorAyat}`)
                            const isPlaying = playingAyat === ayat.nomorAyat

                            return (
                                <div
                                    key={`${selectedSurat?.nomor}-${ayat.nomorAyat}`}
                                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border-l-4 border-green-500"
                                >
                                    {/* Header with Verse Number and Actions */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-600 text-white font-semibold text-sm flex-shrink-0">
                                                {ayat.nomorAyat}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {selectedSurat?.namaLatin} {ayat.nomorAyat}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {ayat.audio && ayat.audio[selectedReader] && (
                                                <button
                                                    onClick={() => playAyat(ayat)}
                                                    className={`p-2 rounded-lg transition-colors ${
                                                        isPlaying
                                                            ? 'bg-green-100 text-green-600'
                                                            : 'hover:bg-green-100 text-gray-600'
                                                    }`}
                                                    title="Play audio"
                                                >
                                                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                                                </button>
                                            )}
                                            <button
                                                onClick={() => toggleBookmark(ayat)}
                                                className={`p-2 rounded-lg transition-colors ${
                                                    isBookmarked
                                                        ? 'bg-yellow-100 text-yellow-600'
                                                        : 'hover:bg-gray-100 text-gray-600'
                                                }`}
                                                title="Add bookmark"
                                            >
                                                <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                                            </button>
                                            <button
                                                onClick={() => copyToClipboard(ayat.teksArab, ayat.nomorAyat)}
                                                className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
                                                title="Copy Arabic text"
                                            >
                                                <Copy size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Arabic Text */}
                                    <div className="mb-4 p-4 bg-gradient-to-l from-green-50 to-transparent rounded-lg">
                                        <p className="text-2xl md:text-3xl leading-relaxed text-right text-gray-800 font-semibold">
                                            {ayat.teksArab}
                                        </p>
                                    </div>

                                    {/* Latin Transliteration */}
                                    <p className="text-sm text-gray-600 italic mb-3 leading-relaxed">
                                        {ayat.teksLatin}
                                    </p>

                                    {/* Translation */}
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <p className="text-gray-700 leading-relaxed">
                                            {ayat.teksIndonesia}
                                        </p>
                                    </div>

                                    {/* Copy Feedback */}
                                    {copyFeedback === ayat.nomorAyat && (
                                        <div className="mt-3 text-xs text-green-600 font-medium">
                                            ✓ Copied to clipboard
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center text-gray-600">
                        <p>No verses found for the selected range.</p>
                    </div>
                )}

                {/* Bookmarks Summary */}
                {bookmarks.length > 0 && (
                    <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                        <p className="text-sm font-semibold text-yellow-800">
                            📌 {bookmarks.length} verse{bookmarks.length !== 1 ? 's' : ''} bookmarked
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}