import { useState, useRef, useEffect } from 'react'
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight, Bookmark, Copy, Volume2, Pause, Play, Search, Settings, X, RotateCcw } from 'lucide-react'
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
    const [searchQuery, setSearchQuery] = useState("")
    const [showSettings, setShowSettings] = useState(false)
    const [fontSize, setFontSize] = useState('lg')
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

    const fontSizeClasses = {
        sm: 'text-2xl md:text-3xl',
        md: 'text-3xl md:text-4xl',
        lg: 'text-4xl md:text-5xl',
        xl: 'text-5xl md:text-6xl'
    }

    // Fetch surat list on component mount
    useEffect(() => {
        const fetchSurat = async () => {
            try {
                const response = await fetch("https://equran.id/api/v2/surat")
                const data = await response.json()
                setSuratList(data.data || [])

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

    const filteredSurats = suratList.filter(surat =>
        surat.namaLatin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        surat.nomor.toString().includes(searchQuery)
    )

    const handleSuratChange = (suratNomor) => {
        const surat = suratList.find(s => s.nomor === suratNomor)
        if (surat) {
            setSelectedSurat(surat)
            fetchAyat(surat.nomor)
            setPlayingAyat(null)
            setIsPlayingFullSurah(false)
            if (audioRef.current) {
                audioRef.current.pause()
            }
            setSearchQuery("")
        }
    }

    const handlePrevSurat = () => {
        if (selectedSurat?.nomor > 1) {
            const prevSurat = suratList.find(s => s.nomor === selectedSurat.nomor - 1)
            if (prevSurat) {
                handleSuratChange(prevSurat.nomor)
            }
        }
    }

    const handleNextSurat = () => {
        if (selectedSurat?.nomor < 114) {
            const nextSurat = suratList.find(s => s.nomor === selectedSurat.nomor + 1)
            if (nextSurat) {
                handleSuratChange(nextSurat.nomor)
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
            <div className="h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="mb-6">
                        <BookOpen size={56} className="text-amber-700 mx-auto animate-bounce" />
                    </div>
                    <div className="text-xl text-amber-900 font-serif font-semibold">Loading Quran...</div>
                    <div className="text-sm text-amber-700 mt-2 font-serif">Retrieving sacred verses</div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-yellow-900 text-white shadow-2xl z-50 flex-shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-40 h-40 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-48 h-48 border-2 border-white rounded-full"></div>
                </div>
                
                <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 relative z-10">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                            <div className="bg-amber-700 bg-opacity-40 p-2.5 sm:p-3 rounded-lg backdrop-blur flex-shrink-0">
                                <img src={quran} alt="Quran" className="w-10 sm:w-14 h-10 sm:h-14" />
                            </div>
                            <div className="min-w-0">
                                <h1 className="text-2xl sm:text-4xl font-serif font-bold truncate">Mushaf Al-Qur'an Online by Hifdzi</h1>
                                <p className="text-amber-100 text-xs sm:text-sm font-light tracking-wide hidden sm:block">Baca, dengarkan, tadabburi</p>
                                <p className="text-amber-20 text-xs sm:text-sm font-light tracking-wide hidden sm:block">API by equran.id</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                            <div className="text-right hidden sm:block">
                                <p className="text-amber-200 text-lg font-serif font-semibold">Surah {selectedSurat?.nomor}</p>
                                <p className="text-amber-100 text-xs">of 114</p>
                            </div>
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
                                title="Settings"
                            >
                                <Settings size={20} className="text-white" />
                            </button>
                            <button
                                onClick={() => setIsPanelHidden(!isPanelHidden)}
                                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
                                title={isPanelHidden ? "Show controls" : "Hide controls"}
                            >
                                {isPanelHidden ? (
                                    <ChevronDown size={20} className="text-white" />
                                ) : (
                                    <ChevronLeft size={20} className="text-white" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div className="bg-white border-b-2 border-amber-200 shadow-lg z-40 flex-shrink-0 px-4 py-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-serif font-bold text-amber-900">Display Settings</h3>
                            <button onClick={() => setShowSettings(false)} className="text-gray-500 hover:text-gray-700">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-serif font-bold text-amber-900 mb-2 block">Arabic Text Size</label>
                                <div className="flex gap-2">
                                    {['sm', 'md', 'lg', 'xl'].map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setFontSize(size)}
                                            className={`px-3 py-1 rounded text-xs font-serif font-bold transition-all ${
                                                fontSize === size
                                                    ? 'bg-amber-600 text-white'
                                                    : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                                            }`}
                                        >
                                            {size.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-serif font-bold text-amber-900 mb-2 block">Repeat Count</label>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setRepeatCount(Math.max(1, repeatCount - 1))}
                                        className="p-1 bg-amber-100 text-amber-900 rounded hover:bg-amber-200 transition"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <span className="font-serif font-bold text-amber-900 w-8 text-center">{repeatCount}</span>
                                    <button
                                        onClick={() => setRepeatCount(Math.min(10, repeatCount + 1))}
                                        className="p-1 bg-amber-100 text-amber-900 rounded hover:bg-amber-200 transition"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Controls Section */}
            <div className={`bg-white shadow-xl z-40 flex-shrink-0 border-b-2 border-amber-100 overflow-hidden transition-all duration-300 ${isPanelHidden ? 'max-h-0' : 'max-h-96'} overflow-y-auto`}>
                <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
                    <div className="space-y-6">
                        {/* Selection Controls */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Surat Search and Selection */}
                            <div className="sm:col-span-2 lg:col-span-2">
                                <label className="block text-xs font-serif font-bold text-amber-900 mb-3 uppercase tracking-widest">
                                    Search Surah
                                </label>
                                <div className="relative mb-3">
                                    <Search size={16} className="absolute left-3 top-3.5 text-amber-600" />
                                    <input
                                        type="text"
                                        placeholder="Search by name or number..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-white border-2 border-amber-200 rounded-lg pl-9 pr-4 py-2.5 focus:border-amber-600 focus:outline-none text-sm hover:border-amber-400 transition-colors"
                                    />
                                </div>
                                {searchQuery && (
                                    <div className="bg-amber-50 rounded-lg border border-amber-200 max-h-40 overflow-y-auto">
                                        {filteredSurats.slice(0, 8).map(surat => (
                                            <button
                                                key={surat.nomor}
                                                onClick={() => handleSuratChange(surat.nomor)}
                                                className="w-full text-left px-4 py-2.5 hover:bg-amber-100 border-b border-amber-100 last:border-b-0 font-serif text-sm transition-colors"
                                            >
                                                <span className="font-bold text-amber-900">{surat.nomor}.</span> {surat.namaLatin}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Reader Selection */}
                            <div>
                                <label className="block text-xs font-serif font-bold text-amber-900 mb-3 uppercase tracking-widest">
                                    Reciter
                                </label>
                                <select
                                    value={selectedReader}
                                    onChange={(e) => setSelectedReader(e.target.value)}
                                    className="w-full border-2 border-amber-200 rounded-lg px-3 py-2.5 focus:border-amber-600 focus:outline-none text-sm font-serif hover:border-amber-400 transition-colors"
                                >
                                    {Object.entries(readers).map(([key, name]) => (
                                        <option key={key} value={key}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Navigation and Play Buttons */}
                        <div className="flex gap-2 flex-wrap items-center pt-4 border-t border-amber-100">
                            <button
                                onClick={handlePrevSurat}
                                disabled={selectedSurat?.nomor === 1}
                                className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-all text-xs sm:text-sm font-serif uppercase tracking-wide disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={16} /> Previous
                            </button>
                            <button
                                onClick={handleNextSurat}
                                disabled={selectedSurat?.nomor === 114}
                                className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-all text-xs sm:text-sm font-serif uppercase tracking-wide disabled:cursor-not-allowed"
                            >
                                Next <ChevronRight size={16} />
                            </button>
                            
                            {selectedSurat?.audioFull && selectedSurat.audioFull[selectedReader] && (
                                <button
                                    onClick={playFullSurah}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm font-serif uppercase tracking-wide ml-auto ${
                                        isPlayingFullSurah
                                            ? 'bg-red-600 hover:bg-red-700 text-white'
                                            : 'bg-green-700 hover:bg-green-800 text-white'
                                    }`}
                                >
                                    {isPlayingFullSurah ? (
                                        <>
                                            <Pause size={16} /> Stop
                                        </>
                                    ) : (
                                        <>
                                            <Play size={16} /> Play
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        {/* Audio Progress Bar */}
                        {isPlayingFullSurah && (
                            <div className="pt-4 border-t border-amber-100">
                                <div className="w-full bg-amber-200 rounded-full h-2 overflow-hidden shadow-sm">
                                    <div
                                        className="bg-gradient-to-r from-amber-600 to-yellow-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${audioProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {/* Surah Info Card */}
                        {selectedSurat && (
                            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 sm:p-6 border-2 border-amber-100 shadow-sm">
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase font-serif font-bold text-amber-900 tracking-widest mb-1">Name</span>
                                        <p className="font-serif font-bold text-amber-900 text-sm sm:text-base">{selectedSurat.namaLatin}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase font-serif font-bold text-amber-900 tracking-widest mb-1">Arabic</span>
                                        <p className="font-arabic text-lg sm:text-2xl text-amber-900">{selectedSurat.nama}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase font-serif font-bold text-amber-900 tracking-widest mb-1">Meaning</span>
                                        <p className="font-serif text-amber-900 text-xs sm:text-sm">{selectedSurat.arti}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase font-serif font-bold text-amber-900 tracking-widest mb-1">Verses</span>
                                        <p className="font-serif font-bold text-xl sm:text-2xl text-amber-900">{selectedSurat.jumlahAyat}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase font-serif font-bold text-amber-900 tracking-widest mb-1">Revealed</span>
                                        <p className="font-serif text-amber-900 text-xs sm:text-sm">{selectedSurat.tempatTurun}</p>
                                    </div>
                                </div>
                                <p className="font-serif text-xs text-amber-800 border-t border-amber-200 pt-3 mt-3">
                                    Page {currentPage} of {totalPages} • Verses {(currentPage - 1) * versesPerPage + 1}–{Math.min(currentPage * versesPerPage, selectedSurat.jumlahAyat)}
                                </p>
                            </div>
                        )}

                        {/* Surah Description */}
                        {selectedSurat?.deskripsi && (
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-700 rounded-lg p-4 sm:p-5">
                                <span className="text-xs uppercase font-serif font-bold text-green-900 tracking-widest block mb-2">About This Surah</span>
                                <p className="font-serif text-xs sm:text-sm text-green-900 leading-relaxed line-clamp-3">
                                    {selectedSurat.deskripsi}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Verses Display */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
                    {loadingAyat ? (
                        <div className="text-center text-amber-900 py-12">
                            <div className="inline-block">
                                <BookOpen size={48} className="text-amber-600 mx-auto mb-4 animate-pulse" />
                                <p className="font-serif text-lg">Loading Verses...</p>
                            </div>
                        </div>
                    ) : displayedAyat.length > 0 ? (
                        <div className="space-y-5 sm:space-y-6">
                            {displayedAyat.map((ayat) => {
                                const isBookmarked = bookmarks.includes(`${selectedSurat?.nomor}-${ayat.nomorAyat}`)
                                const isPlaying = playingAyat === `${selectedSurat?.nomor}-${ayat.nomorAyat}`

                                return (
                                    <div
                                        key={`${selectedSurat?.nomor}-${ayat.nomorAyat}`}
                                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-5 sm:p-6 border-l-4 border-amber-600 overflow-hidden relative group"
                                    >
                                        <div className="absolute top-0 right-0 h-1 w-20 sm:w-32 bg-gradient-to-l from-amber-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                        {/* Header */}
                                        <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                                            <div className="flex items-center gap-3">
                                                <span className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-amber-600 to-yellow-600 text-white font-serif font-bold text-sm sm:text-lg flex-shrink-0 shadow-lg">
                                                    {ayat.nomorAyat}
                                                </span>
                                                <span className="text-xs sm:text-sm text-amber-800 font-serif font-semibold">
                                                    {selectedSurat?.namaLatin} : {ayat.nomorAyat}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 flex-wrap justify-end">
                                                {ayat.audio && ayat.audio[selectedReader] && (
                                                    <button
                                                        onClick={() => playAyahAudio(ayat)}
                                                        className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                                                            isPlaying
                                                                ? 'bg-amber-100 text-amber-700 shadow-md scale-105'
                                                                : 'hover:bg-amber-50 text-amber-600 hover:scale-105'
                                                        }`}
                                                        title="Play verse"
                                                    >
                                                        <Volume2 size={18} fill={isPlaying ? 'currentColor' : 'none'} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => toggleBookmark(ayat)}
                                                    className={`p-1.5 sm:p-2 rounded-lg transition-all ${
                                                        isBookmarked
                                                            ? 'bg-yellow-100 text-yellow-700 shadow-md scale-105'
                                                            : 'hover:bg-amber-50 text-gray-600 hover:scale-105'
                                                    }`}
                                                    title="Bookmark"
                                                >
                                                    <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                                                </button>
                                                <button
                                                    onClick={() => copyToClipboard(ayat.teksArab, ayat.nomorAyat)}
                                                    className="p-1.5 sm:p-2 hover:bg-amber-50 text-gray-600 rounded-lg transition-all hover:scale-105"
                                                    title="Copy text"
                                                >
                                                    <Copy size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Repeat Badge */}
                                        {isPlaying && (
                                            <div className="mb-4 flex gap-2">
                                                <span className={`text-xs font-serif font-bold px-2 py-1 rounded-full animate-pulse ${
                                                    currentRepeat >= 5 
                                                        ? 'bg-yellow-100 text-yellow-700' 
                                                        : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                    {currentRepeat}x 🔊
                                                </span>
                                            </div>
                                        )}

                                        {/* Arabic Text */}
                                        <div className="mb-5 p-4 sm:p-6 bg-gradient-to-l from-amber-50 via-white to-transparent rounded-lg border border-amber-100">
                                            <p className={`font-arabic ${fontSizeClasses[fontSize]} leading-loose text-right text-stone-900 tracking-wider`}>
                                                {ayat.teksArab}
                                            </p>
                                        </div>

                                        {/* Transliteration */}
                                        <p className="font-serif text-xs sm:text-sm text-amber-900 italic mb-4 leading-relaxed pl-3 sm:pl-4 border-l-2 border-amber-400 font-semibold">
                                            {ayat.teksLatin}
                                        </p>

                                        {/* Translation */}
                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-5 rounded-lg border border-green-200">
                                            <p className="font-serif text-sm text-gray-900 font-medium leading-relaxed text-justify">
                                                {ayat.teksIndonesia}
                                            </p>
                                        </div>

                                        {/* Copy Feedback */}
                                        {copyFeedback === ayat.nomorAyat && (
                                            <div className="mt-3 text-xs sm:text-sm text-green-700 font-semibold font-serif flex items-center gap-2 animate-pulse">
                                                <span>✓</span> Copied to Clipboard
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-lg p-12 text-center text-gray-600">
                            <p className="font-serif text-lg">No verses available.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-8 sm:mt-10 flex justify-center items-center gap-1 sm:gap-2 flex-wrap">
                            <button
                                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white rounded-lg text-xs sm:text-sm font-serif font-semibold transition-all disabled:cursor-not-allowed"
                            >
                                ← Prev
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
                                    className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-serif font-bold transition-all ${
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
                                className="px-3 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white rounded-lg text-xs sm:text-sm font-serif font-semibold transition-all disabled:cursor-not-allowed"
                            >
                                Next →
                            </button>
                        </div>
                    )}

                    {/* Bookmarks Summary */}
                    {bookmarks.length > 0 && (
                        <div className="mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-lg p-4 shadow-lg flex items-center justify-between gap-4">
                            <p className="text-xs sm:text-sm font-serif font-bold text-yellow-900">
                                📌 {bookmarks.length} Verse{bookmarks.length !== 1 ? 's' : ''} Bookmarked
                            </p>
                            <button
                                onClick={() => setBookmarks([])}
                                className="text-xs font-serif font-bold text-yellow-700 hover:text-yellow-900 transition-colors flex items-center gap-1"
                            >
                                <RotateCcw size={14} /> Clear
                            </button>
                        </div>
                    )}

                    <div className="h-8"></div>
                </div>
            </div>
        </div>
    )
}