import { useState, useRef, useEffect } from 'react'
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight, Bookmark, Copy, Volume2, Pause, Play } from 'lucide-react'
import quran from "../../assets/images/al-quran.png"

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
    const [isPanelHidden, setIsPanelHidden] = useState(false)
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
            <div className="h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 flex items-center justify-center">
                <div className="text-center">
                    <BookOpen size={48} className="text-amber-700 mx-auto mb-4" />
                    <div className="text-xl text-amber-900 font-serif">Loading Quran...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 flex flex-col">
            {/* Header - Premium Islamic Design */}
            <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-yellow-900 text-white shadow-2xl z-50 flex-shrink-0 relative overflow-hidden">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-32 h-32 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 border-2 border-white rounded-full"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-amber bg-opacity-20 p-3 rounded-lg backdrop-blur">
                                <img src={quran} alt="Quran" className="w-14 h-14" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-serif font-bold">Al-Quran Al-Kareem</h1>
                                <p className="text-amber-100 text-sm font-light tracking-wide">Read, Reflect, and Connect with Divine Guidance</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-right hidden md:block">
                                <p className="text-amber-200 text-lg font-serif">Surah {selectedSurat?.nomor}</p>
                                <p className="text-amber-100 text-sm">of 114 Surahs</p>
                            </div>
                            <button
                                onClick={() => setIsPanelHidden(!isPanelHidden)}
                                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
                                title={isPanelHidden ? "Show controls" : "Hide controls"}
                            >
                                {isPanelHidden ? (
                                    <ChevronDown size={24} className="text-white" />
                                ) : (
                                    <ChevronLeft size={24} className="text-white" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Section - Elegant Design */}
            <div className={`bg-white shadow-xl z-40 flex-shrink-0 border-b-2 border-amber-100 overflow-hidden transition-all duration-300 ${isPanelHidden ? 'max-h-0' : 'max-h-96'} overflow-y-auto`}>
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="space-y-6">
                        {/* Selection Controls */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Surat Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-amber-900 mb-3 font-serif uppercase tracking-widest">
                                    Surah
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedSurat?.nomor || ""}
                                        onChange={handleSuratChange}
                                        className="w-full appearance-none bg-white border-2 border-amber-200 rounded-lg px-4 py-3 pr-10 focus:border-amber-600 focus:outline-none text-sm font-serif hover:border-amber-400 transition-colors"
                                    >
                                        {suratList.map((surat) => (
                                            <option key={surat.nomor} value={surat.nomor}>
                                                {surat.nomor}. {surat.namaLatin}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-3 top-3.5 text-amber-600 pointer-events-none" />
                                </div>
                            </div>

                            {/* Reader Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-amber-900 mb-3 font-serif uppercase tracking-widest">
                                    Reciter
                                </label>
                                <select
                                    value={selectedReader}
                                    onChange={(e) => setSelectedReader(e.target.value)}
                                    className="w-full border-2 border-amber-200 rounded-lg px-4 py-3 focus:border-amber-600 focus:outline-none text-sm font-serif hover:border-amber-400 transition-colors"
                                >
                                    {Object.entries(readers).map(([key, name]) => (
                                        <option key={key} value={key}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Navigation and Play Buttons */}
                        <div className="flex gap-3 flex-wrap items-center pt-4 border-t border-amber-100">
                            <button
                                onClick={handlePrevSurat}
                                disabled={selectedSurat?.nomor === 1}
                                className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors text-sm font-serif uppercase tracking-wide"
                            >
                                <ChevronLeft size={16} /> Previous
                            </button>
                            <button
                                onClick={handleNextSurat}
                                disabled={selectedSurat?.nomor === 114}
                                className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors text-sm font-serif uppercase tracking-wide"
                            >
                                Next <ChevronRight size={16} />
                            </button>
                            
                            {selectedSurat?.audioFull && selectedSurat.audioFull[selectedReader] && (
                                <button
                                    onClick={playFullSurah}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-colors text-sm font-serif uppercase tracking-wide ml-auto ${
                                        isPlayingFullSurah
                                            ? 'bg-red-600 hover:bg-red-700 text-white'
                                            : 'bg-green-700 hover:bg-green-800 text-white'
                                    }`}
                                >
                                    {isPlayingFullSurah ? (
                                        <>
                                            <Pause size={18} /> Stop
                                        </>
                                    ) : (
                                        <>
                                            <Play size={18} /> Play Full Surah
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        {/* Audio Progress Bar */}
                        {isPlayingFullSurah && (
                            <div className="pt-4 border-t border-amber-100">
                                <div className="w-full bg-amber-200 rounded-full h-2 overflow-hidden">
                                    <div
                                        className="bg-gradient-to-r from-amber-600 to-yellow-600 h-2 rounded-full transition-all"
                                        style={{ width: `${audioProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {/* Surah Info Card */}
                        {selectedSurat && (
                            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-6 border-2 border-amber-100">
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                                    <div>
                                        <span className="text-xs uppercase font-serif font-bold text-amber-900 tracking-widest">Nama Surat</span>
                                        <p className="font-serif font-bold text-amber-900 mt-1">{selectedSurat.namaLatin}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs uppercase font-serif font-bold text-amber-900 tracking-widest">Arabic</span>
                                        <p className="font-arabic text-2xl text-amber-900 mt-1">{selectedSurat.nama}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs uppercase font-serif font-bold text-amber-900 tracking-widest">Arti</span>
                                        <p className="font-serif text-amber-900 mt-1 text-sm">{selectedSurat.arti}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs uppercase font-serif font-bold text-amber-900 tracking-widest">Jumlah Ayat</span>
                                        <p className="font-serif font-bold text-2xl text-amber-900 mt-1">{selectedSurat.jumlahAyat}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs uppercase font-serif font-bold text-amber-900 tracking-widest">Tempat diturunkan</span>
                                        <p className="font-serif text-amber-900 mt-1 text-sm">{selectedSurat.tempatTurun}</p>
                                    </div>
                                </div>
                                <p className="font-serif text-xs text-amber-800 border-t border-amber-200 pt-3">
                                    Page {currentPage} of {totalPages} • Verses {(currentPage - 1) * versesPerPage + 1}–{Math.min(currentPage * versesPerPage, selectedSurat.jumlahAyat)}
                                </p>
                            </div>
                        )}

                        {/* Surah Description */}
                        {selectedSurat?.deskripsi && (
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-700 rounded-lg p-5">
                                <span className="text-xs uppercase font-serif font-bold text-green-900 tracking-widest block mb-2">Tentang Surat</span>
                                <p className="font-serif text-sm text-green-900 leading-relaxed">
                                    {selectedSurat.deskripsi}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Verses Display - Scrollable */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {loadingAyat ? (
                        <div className="text-center text-amber-900 py-12">
                            <div className="inline-block">
                                <BookOpen size={48} className="text-amber-600 mx-auto mb-4 animate-pulse" />
                                <p className="font-serif text-lg">Loading Verses...</p>
                            </div>
                        </div>
                    ) : displayedAyat.length > 0 ? (
                        <div className="space-y-6">
                            {displayedAyat.map((ayat) => {
                                const isBookmarked = bookmarks.includes(`${selectedSurat?.nomor}-${ayat.nomorAyat}`)
                                const isPlaying = playingAyat === `${selectedSurat?.nomor}-${ayat.nomorAyat}`

                                return (
                                    <div
                                        key={`${selectedSurat?.nomor}-${ayat.nomorAyat}`}
                                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-7 border-l-4 border-amber-600 overflow-hidden relative"
                                    >
                                        {/* Decorative right border */}
                                        <div className="absolute top-0 right-0 h-1 w-32 bg-gradient-to-l from-amber-600 to-transparent"></div>

                                        {/* Header with Verse Number and Actions */}
                                        <div className="flex items-start justify-between mb-5">
                                            <div className="flex items-center gap-4">
                                                <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-br from-amber-600 to-yellow-600 text-white font-serif font-bold text-lg flex-shrink-0 shadow-lg">
                                                    {ayat.nomorAyat}
                                                </span>
                                                <span className="text-sm text-amber-800 font-serif font-semibold">
                                                    {selectedSurat?.namaLatin} : {ayat.nomorAyat}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {ayat.audio && ayat.audio[selectedReader] && (
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => playAyahAudio(ayat)}
                                                            className={`p-2 rounded-lg transition-all ${
                                                                isPlaying
                                                                    ? 'bg-amber-100 text-amber-700 shadow-md'
                                                                    : 'hover:bg-amber-50 text-amber-600'
                                                            }`}
                                                            title="Play verse"
                                                        >
                                                            <Volume2 size={20} fill={isPlaying ? 'currentColor' : 'none'} />
                                                        </button>
                                                        {isPlaying && (
                                                            <div className="flex items-center gap-2">
                                                                {currentRepeat >= 5 ? (
                                                                    <span className="text-xs font-serif font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-full animate-bounce">
                                                                        {currentRepeat}x 🎉✨ that's great!
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-xs font-serif font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                                                                        {currentRepeat}x 🔥
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                <button
                                                    onClick={() => toggleBookmark(ayat)}
                                                    className={`p-2 rounded-lg transition-all ${
                                                        isBookmarked
                                                            ? 'bg-yellow-100 text-yellow-700 shadow-md'
                                                            : 'hover:bg-amber-50 text-gray-600'
                                                    }`}
                                                    title="Bookmark"
                                                >
                                                    <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
                                                </button>
                                                <button
                                                    onClick={() => copyToClipboard(ayat.teksArab, ayat.nomorAyat)}
                                                    className="p-2 hover:bg-amber-50 text-gray-600 rounded-lg transition-all"
                                                    title="Copy text"
                                                >
                                                    <Copy size={20} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Arabic Text - Premium Display */}
                                        <div className="mb-5 p-6 bg-gradient-to-l from-amber-50 via-white to-transparent rounded-lg border border-amber-100">
                                            <p className="font-arabic text-3xl md:text-4xl leading-loose text-right text-stone-900 tracking-wider">
                                                {ayat.teksArab}
                                            </p>
                                        </div>

                                        {/* Latin Transliteration */}
                                        <p className="font-serif text-sm text-amber-900 italic mb-4 leading-relaxed pl-4 border-l-2 border-amber-400 font-semibold">
                                            {ayat.teksLatin}
                                        </p>

                                        {/* Translation */}
                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-lg border border-green-200">
                                            <p className="font-serif text-gray-900 font-medium leading-relaxed text-justify">
                                                {ayat.teksIndonesia}
                                            </p>
                                        </div>

                                        {/* Copy Feedback */}
                                        {copyFeedback === ayat.nomorAyat && (
                                            <div className="mt-4 text-sm text-green-700 font-semibold font-serif flex items-center gap-2 animate-pulse">
                                                <span>✓</span> Copied to Clipboard
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-lg p-16 text-center text-gray-600">
                            <p className="font-serif text-lg">No verses available.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white rounded-lg text-sm font-serif font-semibold transition-colors"
                            >
                                ← Previous
                            </button>

                            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                                let page = i + 1
                                if (totalPages > 7 && currentPage > 4) {
                                    page = currentPage - 3 + i
                                }
                                if (totalPages > 7 && page > totalPages - 3) {
                                    return null
                                }
                                return page
                            }).filter(Boolean).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-2 rounded-lg text-sm font-serif font-bold transition-all ${
                                        currentPage === page
                                            ? 'bg-amber-600 text-white shadow-lg scale-105'
                                            : 'bg-white border-2 border-amber-300 text-amber-900 hover:border-amber-600 hover:bg-amber-50'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white rounded-lg text-sm font-serif font-semibold transition-colors"
                            >
                                Next →
                            </button>
                        </div>
                    )}

                    {/* Bookmarks Summary */}
                    {bookmarks.length > 0 && (
                        <div className="mt-10 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-lg p-5 shadow-lg">
                            <p className="text-sm font-serif font-bold text-yellow-900">
                                📌 {bookmarks.length} Verse{bookmarks.length !== 1 ? 's' : ''} Bookmarked
                            </p>
                        </div>
                    )}

                    <div className="h-8"></div>
                </div>
            </div>
        </div>
    )
}