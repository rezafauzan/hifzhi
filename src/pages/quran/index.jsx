import { useState, useRef, useEffect } from 'react'
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight, Bookmark, Copy, Volume2, Pause, Play, Square } from 'lucide-react'

export default function QuranPage() {
    const [suratList, setSuratList] = useState([])
    const [selectedSurat, setSelectedSurat] = useState(null)
    const [ayatList, setAyatList] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingAyat, setLoadingAyat] = useState(false)
    const [playingAyat, setPlayingAyat] = useState(null)
    const [selectedReader, setSelectedReader] = useState("01")
    const [bookmarks, setBookmarks] = useState([])
    const [copyFeedback, setCopyFeedback] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [isPlayingFullSurah, setIsPlayingFullSurah] = useState(false)
    const [audioProgress, setAudioProgress] = useState(0)
    const [repeatCount, setRepeatCount] = useState(1)
    const [currentRepeat, setCurrentRepeat] = useState(0)
    const audioRef = useRef(null)
    const versesPerPage = 10

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
            console.log("data", data)
            setAyatList(data.data?.ayat || [])
            setCurrentPage(1)
        } catch (error) {
            console.error("Error fetching ayat:", error)
            setAyatList([])
        } finally {
            setLoadingAyat(false)
        }
    }

    const handleSuratChange = (e) => {
        const suratNomor = parseInt(e.target.value)
        const surat = suratList.find(s => s.nomor === suratNomor)
        if (surat) {
            setSelectedSurat(surat)
            fetchAyat(surat.nomor)
            setPlayingAyat(null)
            setIsPlayingFullSurah(false)
            if (audioRef.current) {
                audioRef.current.pause()
            }
        }
    }

    const handlePrevSurat = () => {
        if (selectedSurat?.nomor > 1) {
            const prevSurat = suratList.find(s => s.nomor === selectedSurat.nomor - 1)
            if (prevSurat) {
                setSelectedSurat(prevSurat)
                fetchAyat(prevSurat.nomor)
                setPlayingAyat(null)
                setIsPlayingFullSurah(false)
                if (audioRef.current) {
                    audioRef.current.pause()
                }
            }
        }
    }

    const handleNextSurat = () => {
        if (selectedSurat?.nomor < 114) {
            const nextSurat = suratList.find(s => s.nomor === selectedSurat.nomor + 1)
            if (nextSurat) {
                setSelectedSurat(nextSurat)
                fetchAyat(nextSurat.nomor)
                setPlayingAyat(null)
                setIsPlayingFullSurah(false)
                if (audioRef.current) {
                    audioRef.current.pause()
                }
            }
        }
    }

    const playFullSurah = () => {
        if (!selectedSurat?.audioFull || !selectedSurat.audioFull[selectedReader]) return

        if (isPlayingFullSurah) {
            audioRef.current?.pause()
            setIsPlayingFullSurah(false)
        } else {
            setIsPlayingFullSurah(true)
            setPlayingAyat(null)

            const audio = new Audio(selectedSurat.audioFull[selectedReader])
            audioRef.current = audio

            audio.play().catch(err => console.error("Error playing audio:", err))

            audio.onended = () => {
                setIsPlayingFullSurah(false)
            }

            audio.ontimeupdate = () => {
                if (audio.duration) {
                    setAudioProgress((audio.currentTime / audio.duration) * 100)
                }
            }
        }
    }

    const playAyahAudio = (ayat) => {
        if (!ayat.audio || !ayat.audio[selectedReader]) return

        const ayahKey = `${selectedSurat?.nomor}-${ayat.nomorAyat}`

        if (playingAyat === ayahKey) {
            audioRef.current?.pause()
            setPlayingAyat(null)
            setCurrentRepeat(0)
        } else {
            if (audioRef.current) {
                audioRef.current.pause()
            }

            setIsPlayingFullSurah(false)
            setPlayingAyat(ayahKey)
            setCurrentRepeat(1)

            const audio = new Audio(ayat.audio[selectedReader])
            audioRef.current = audio

            audio.play().catch(err => console.error("Error playing audio:", err))

            audio.onended = () => {
                if (currentRepeat < repeatCount) {
                    setCurrentRepeat(prev => prev + 1)
                    audio.currentTime = 0
                    audio.play().catch(err => console.error("Error replaying audio:", err))
                } else {
                    setPlayingAyat(null)
                    setCurrentRepeat(0)
                }
            }
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
        const start = (currentPage - 1) * versesPerPage
        const end = start + versesPerPage
        return ayatList.slice(start, end)
    }

    const totalPages = Math.ceil(ayatList.length / versesPerPage)
    const displayedAyat = getDisplayedAyat()

    if (loading) {
        return (
            <div className="h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
                <div className="text-xl text-gray-600 font-poppins">Loading Quran data...</div>
            </div>
        )
    }

    return (
        <div className="h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
            {/* Header - Fixed */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg z-50 flex-shrink-0">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <BookOpen size={32} />
                            <div>
                                <h1 className="text-3xl font-bold font-poppins">Quran Reader</h1>
                                <p className="text-green-100 text-sm font-poppins">Read and study the Holy Quran</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-green-100 text-sm font-poppins">Surat {selectedSurat?.nomor} of 114</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Section - Fixed */}
            <div className="bg-white shadow-md z-40 flex-shrink-0 border-b border-gray-200 overflow-y-auto max-h-96">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {/* Surat Selection */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                                Select Surah
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedSurat?.nomor || ""}
                                    onChange={handleSuratChange}
                                    className="w-full appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-2 pr-10 focus:border-green-500 focus:outline-none text-sm font-poppins"
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

                        {/* Reader Selection */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 font-poppins">
                                Reader
                            </label>
                            <select
                                value={selectedReader}
                                onChange={(e) => setSelectedReader(e.target.value)}
                                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none text-sm font-poppins"
                            >
                                {Object.entries(readers).map(([key, name]) => (
                                    <option key={key} value={key}>{name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Navigation and Play Full Surah Buttons */}
                    <div className="flex gap-2 flex-wrap mb-6">
                        <button
                            onClick={handlePrevSurat}
                            disabled={selectedSurat?.nomor === 1}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors text-sm font-poppins"
                        >
                            <ChevronLeft size={16} /> Previous Surah
                        </button>
                        <button
                            onClick={handleNextSurat}
                            disabled={selectedSurat?.nomor === 114}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors text-sm font-poppins"
                        >
                            Next Surah <ChevronRight size={16} />
                        </button>
                        
                        {selectedSurat?.audioFull && selectedSurat.audioFull[selectedReader] && (
                            <button
                                onClick={playFullSurah}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors text-sm font-poppins ${
                                    isPlayingFullSurah
                                        ? 'bg-red-500 hover:bg-red-600 text-white'
                                        : 'bg-green-500 hover:bg-green-600 text-white'
                                }`}
                            >
                                {isPlayingFullSurah ? (
                                    <>
                                        <Pause size={16} /> Stop
                                    </>
                                ) : (
                                    <>
                                        <Play size={16} /> Play Full Surah
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    {/* Audio Progress Bar */}
                    {isPlayingFullSurah && (
                        <div className="mb-6">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full transition-all"
                                    style={{ width: `${audioProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Surat Info */}
                    {selectedSurat && (
                        <div className="pt-6 border-t border-gray-200">
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-4">
                                <div>
                                    <span className="text-gray-600 text-xs uppercase font-poppins">Name</span>
                                    <p className="font-semibold text-gray-800 font-poppins">{selectedSurat.namaLatin}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600 text-xs uppercase font-poppins">Arabic</span>
                                    <p className="font-semibold text-xl text-gray-800 font-arabic">{selectedSurat.nama}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600 text-xs uppercase font-poppins">Meaning</span>
                                    <p className="font-semibold text-gray-800 font-poppins">{selectedSurat.arti}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600 text-xs uppercase font-poppins">Verses</span>
                                    <p className="font-semibold text-gray-800 font-poppins">{selectedSurat.jumlahAyat}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600 text-xs uppercase font-poppins">Repeat</span>
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => setRepeatCount(Math.max(1, repeatCount - 1))}
                                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs font-poppins"
                                        >
                                            −
                                        </button>
                                        <span className="font-semibold text-gray-800 min-w-6 text-center font-poppins">{repeatCount}</span>
                                        <button
                                            onClick={() => setRepeatCount(Math.min(10, repeatCount + 1))}
                                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs font-poppins"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <p className="font-poppins text-xs text-gray-600">
                                Page {currentPage} of {totalPages} • Showing verses {(currentPage - 1) * versesPerPage + 1}-{Math.min(currentPage * versesPerPage, selectedSurat.jumlahAyat)}
                            </p>
                        </div>
                    )}
                     
                </div>
                {selectedSurat?.deskripsi && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mt-4">
                        <span className="text-gray-600 text-xs uppercase font-poppins">Deskripsi Surat</span>
                        <p className="font-poppins text-sm text-gray-700 leading-relaxed">
                            {selectedSurat.deskripsi}
                        </p>
                    </div>
                )}
            </div>

            {/* Verses Display - Scrollable Only */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {loadingAyat ? (
                        <div className="text-center text-gray-600 py-12">
                            <p className="font-poppins">Loading verses...</p>
                        </div>
                    ) : displayedAyat.length > 0 ? (
                        <div className="space-y-4">
                            {displayedAyat.map((ayat) => {
                                const isBookmarked = bookmarks.includes(`${selectedSurat?.nomor}-${ayat.nomorAyat}`)
                                const isPlaying = playingAyat === `${selectedSurat?.nomor}-${ayat.nomorAyat}`

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
                                                <span className="text-xs text-gray-500 font-poppins">
                                                    {selectedSurat?.namaLatin} {ayat.nomorAyat}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {ayat.audio && ayat.audio[selectedReader] && (
                                                    <div className="flex items-center gap-1">
                                                        <button
                                                            onClick={() => playAyahAudio(ayat)}
                                                            className={`p-2 rounded-lg transition-colors ${
                                                                isPlaying
                                                                    ? 'bg-green-100 text-green-600'
                                                                    : 'hover:bg-gray-100 text-gray-600'
                                                            }`}
                                                            title="Play verse audio"
                                                        >
                                                            <Volume2 size={18} fill={isPlaying ? 'currentColor' : 'none'} />
                                                        </button>
                                                        {isPlaying && (
                                                            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded font-poppins">
                                                                {currentRepeat}/{repeatCount}
                                                            </span>
                                                        )}
                                                    </div>
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
                                            <p className="font-arabic text-2xl md:text-3xl leading-relaxed text-right text-gray-800">
                                                {ayat.teksArab}
                                            </p>
                                        </div>

                                        {/* Latin Transliteration */}
                                        <p className="font-poppins text-sm text-gray-600 italic mb-3 leading-relaxed">
                                            {ayat.teksLatin}
                                        </p>

                                        {/* Translation */}
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <p className="font-poppins text-gray-700 leading-relaxed">
                                                {ayat.teksIndonesia}
                                            </p>
                                        </div>

                                        {/* Copy Feedback */}
                                        {copyFeedback === ayat.nomorAyat && (
                                            <div className="mt-3 text-xs text-green-600 font-medium font-poppins">
                                                ✓ Copied to clipboard
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center text-gray-600">
                            <p className="font-poppins">No verses found for the selected range.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-poppins"
                            >
                                ← Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors font-poppins ${
                                        currentPage === page
                                            ? 'bg-green-600 text-white'
                                            : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-green-500'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-poppins"
                            >
                                Next →
                            </button>
                        </div>
                    )}

                    {/* Bookmarks Summary */}
                    {bookmarks.length > 0 && (
                        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                            <p className="text-sm font-semibold text-yellow-800 font-poppins">
                                📌 {bookmarks.length} verse{bookmarks.length !== 1 ? 's' : ''} bookmarked
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}