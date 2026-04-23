import { useState, useRef, useEffect } from 'react'
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight, Bookmark, Copy, Volume2, Pause, Play, Search, Settings, X, RotateCcw, Moon, Sun, Sparkles, Loader2 } from 'lucide-react'

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
    const [currentRepeat, setCurrentRepeat] = useState(0)
    const [isPanelHidden, setIsPanelHidden] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [showSettings, setShowSettings] = useState(false)
    const [fontSize, setFontSize] = useState('lg')
    const [darkMode, setDarkMode] = useState(false)
    
    // Vector Search States
    const [showVectorSearch, setShowVectorSearch] = useState(false)
    const [vectorQuery, setVectorQuery] = useState("")
    const [vectorResults, setVectorResults] = useState([])
    const [isVectorSearching, setIsVectorSearching] = useState(false)
    const [vectorError, setVectorError] = useState(null)

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

    // Dark mode theme classes
    const t = darkMode ? {
        bg: 'bg-gradient-to-br from-gray-950 via-gray-900 to-stone-950',
        header: 'bg-gradient-to-r from-gray-900 via-stone-900 to-gray-900 border-b border-amber-900/30',
        headerText: 'text-amber-100',
        headerSub: 'text-amber-300/70',
        headerAccent: 'text-amber-400/80',
        headerBtnHover: 'hover:bg-white/10',
        headerIconBg: 'bg-amber-900/40',
        settingsPanel: 'bg-gray-900 border-b border-amber-900/30',
        settingsTitle: 'text-amber-200',
        settingsBtnActive: 'bg-amber-700 text-white',
        settingsBtnInactive: 'bg-gray-800 text-amber-200 hover:bg-gray-700',
        controlsPanel: 'bg-gray-900/95 border-b border-amber-900/20',
        label: 'text-amber-300',
        searchInput: 'bg-gray-800 border-gray-700 text-amber-100 placeholder-gray-500 focus:border-amber-600',
        searchDropdown: 'bg-gray-800 border-gray-700',
        searchItem: 'hover:bg-gray-700 border-gray-700 text-amber-200',
        searchItemBold: 'text-amber-400',
        select: 'bg-gray-800 border-gray-700 text-amber-100 focus:border-amber-600',
        navBtn: 'bg-amber-800 hover:bg-amber-700 disabled:bg-gray-700 text-white disabled:text-gray-500',
        playBtn: 'bg-emerald-800 hover:bg-emerald-700 text-white',
        stopBtn: 'bg-red-800 hover:bg-red-700 text-white',
        progressBg: 'bg-gray-700',
        progressFill: 'bg-gradient-to-r from-amber-600 to-yellow-500',
        infoCard: 'bg-gradient-to-r from-gray-800/80 to-stone-800/80 border-amber-900/40',
        infoLabel: 'text-amber-400',
        infoValue: 'text-amber-100',
        infoSub: 'text-amber-300/60 border-amber-800/40',
        descCard: 'bg-gradient-to-r from-emerald-950/50 to-green-950/50 border-l-emerald-700',
        descLabel: 'text-emerald-400',
        descText: 'text-emerald-200/80',
        verseCard: 'bg-gray-900/90 border-l-amber-700 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30',
        verseHoverStripe: 'from-amber-600',
        verseBadge: 'from-amber-700 to-yellow-700',
        verseSurahLabel: 'text-amber-300',
        verseAudioActive: 'bg-amber-900/50 text-amber-400',
        verseAudioInactive: 'hover:bg-gray-800 text-amber-500',
        verseBookmarkActive: 'bg-yellow-900/50 text-yellow-400',
        verseBookmarkInactive: 'hover:bg-gray-800 text-gray-500',
        verseCopyBtn: 'hover:bg-gray-800 text-gray-500',
        repeatBadge: 'bg-amber-900/50 text-amber-400',
        repeatBadgeHigh: 'bg-yellow-900/50 text-yellow-400',
        arabicBg: 'bg-gradient-to-l from-gray-800/60 via-gray-900/30 to-transparent border-gray-800',
        arabicText: 'text-amber-50',
        latinText: 'text-amber-300/80 border-l-amber-700/50',
        translationBg: 'bg-gradient-to-r from-emerald-950/40 to-green-950/40 border-emerald-800/40',
        translationText: 'text-emerald-100/90',
        copyFeedback: 'text-emerald-400',
        emptyState: 'bg-gray-900 text-gray-400',
        pageBtn: 'bg-gray-800 border-gray-700 text-amber-200 hover:border-amber-600 hover:bg-gray-700',
        pageBtnActive: 'bg-amber-700 text-white',
        bookmarkBar: 'bg-gradient-to-r from-yellow-950/50 to-amber-950/50 border-yellow-800/50',
        bookmarkText: 'text-yellow-300',
        bookmarkClear: 'text-yellow-400 hover:text-yellow-200',
        loadingText: 'text-amber-200',
        loadingSub: 'text-amber-400/60',
    } : {
        bg: 'bg-gradient-to-br from-amber-50 via-white to-emerald-50',
        header: 'bg-gradient-to-r from-amber-900 via-amber-800 to-yellow-900',
        headerText: 'text-white',
        headerSub: 'text-amber-100',
        headerAccent: 'text-amber-200',
        headerBtnHover: 'hover:bg-white/20',
        headerIconBg: 'bg-amber-700/40',
        settingsPanel: 'bg-white border-b-2 border-amber-200',
        settingsTitle: 'text-amber-900',
        settingsBtnActive: 'bg-amber-600 text-white',
        settingsBtnInactive: 'bg-amber-100 text-amber-900 hover:bg-amber-200',
        controlsPanel: 'bg-white border-b-2 border-amber-100',
        label: 'text-amber-900',
        searchInput: 'bg-white border-2 border-amber-200 text-gray-900 placeholder-gray-400 focus:border-amber-600',
        searchDropdown: 'bg-amber-50 border-amber-200',
        searchItem: 'hover:bg-amber-100 border-amber-100 text-gray-800',
        searchItemBold: 'text-amber-900',
        select: 'border-2 border-amber-200 text-gray-900 focus:border-amber-600',
        navBtn: 'bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white disabled:text-white',
        playBtn: 'bg-green-700 hover:bg-green-800 text-white',
        stopBtn: 'bg-red-600 hover:bg-red-700 text-white',
        progressBg: 'bg-amber-200',
        progressFill: 'bg-gradient-to-r from-amber-600 to-yellow-600',
        infoCard: 'bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-100',
        infoLabel: 'text-amber-900',
        infoValue: 'text-amber-900',
        infoSub: 'text-amber-800 border-amber-200',
        descCard: 'bg-gradient-to-r from-green-50 to-emerald-50 border-l-green-700',
        descLabel: 'text-green-900',
        descText: 'text-green-900',
        verseCard: 'bg-white border-l-amber-600 shadow-md hover:shadow-lg',
        verseHoverStripe: 'from-amber-600',
        verseBadge: 'from-amber-600 to-yellow-600',
        verseSurahLabel: 'text-amber-800',
        verseAudioActive: 'bg-amber-100 text-amber-700',
        verseAudioInactive: 'hover:bg-amber-50 text-amber-600',
        verseBookmarkActive: 'bg-yellow-100 text-yellow-700',
        verseBookmarkInactive: 'hover:bg-amber-50 text-gray-600',
        verseCopyBtn: 'hover:bg-amber-50 text-gray-600',
        repeatBadge: 'bg-amber-100 text-amber-700',
        repeatBadgeHigh: 'bg-yellow-100 text-yellow-700',
        arabicBg: 'bg-gradient-to-l from-amber-50 via-white to-transparent border-amber-100',
        arabicText: 'text-stone-900',
        latinText: 'text-amber-900 border-l-amber-400',
        translationBg: 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200',
        translationText: 'text-gray-900',
        copyFeedback: 'text-green-700',
        emptyState: 'bg-white text-gray-600',
        pageBtn: 'bg-white border-2 border-amber-300 text-amber-900 hover:border-amber-600 hover:bg-amber-50',
        pageBtnActive: 'bg-amber-600 text-white',
        bookmarkBar: 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300',
        bookmarkText: 'text-yellow-900',
        bookmarkClear: 'text-yellow-700 hover:text-yellow-900',
        loadingText: 'text-amber-900',
        loadingSub: 'text-amber-700',
    }

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
            if (audioRef.current) audioRef.current.pause()
            setSearchQuery("")
        }
    }

    const handlePrevSurat = () => {
        if (selectedSurat?.nomor > 1) {
            const prevSurat = suratList.find(s => s.nomor === selectedSurat.nomor - 1)
            if (prevSurat) handleSuratChange(prevSurat.nomor)
        }
    }

    const handleNextSurat = () => {
        if (selectedSurat?.nomor < 114) {
            const nextSurat = suratList.find(s => s.nomor === selectedSurat.nomor + 1)
            if (nextSurat) handleSuratChange(nextSurat.nomor)
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
            audio.onended = () => setIsPlayingFullSurah(false)
            audio.ontimeupdate = () => {
                if (audio.duration) setAudioProgress((audio.currentTime / audio.duration) * 100)
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
            if (audioRef.current) audioRef.current.pause()
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

    const handleVectorSearch = async () => {
        if (!vectorQuery.trim()) return
        setIsVectorSearching(true)
        setVectorError(null)
        try {
            const response = await fetch("https://equran.id/api/vector", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cari: vectorQuery,
                    batas: 5,
                    tipe: ["ayat"],
                    skorMin: 0.5
                })
            })
            const data = await response.json()
            // Map the explicit API response structure
            if (data && data.status === "sukses" && Array.isArray(data.hasil)) {
                setVectorResults(data.hasil)
            } else if (data && data.data) {
                setVectorResults(data.data)
            } else if (Array.isArray(data)) {
                setVectorResults(data)
            } else {
                setVectorResults([])
            }
        } catch (error) {
            console.error("Vector search error:", error)
            setVectorError("Terjadi kesalahan saat mencari. Silakan coba lagi.")
            setVectorResults([])
        } finally {
            setIsVectorSearching(false)
        }
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
            <div className={`h-screen ${t.bg} flex items-center justify-center`}>
                <div className="text-center">
                    <div className="mb-6">
                        <BookOpen size={56} className="text-amber-700 mx-auto animate-bounce" />
                    </div>
                    <div className={`text-xl ${t.loadingText} font-serif font-semibold`}>Loading Quran...</div>
                    <div className={`text-sm ${t.loadingSub} mt-2 font-serif`}>Retrieving sacred verses</div>
                </div>
            </div>
        )
    }

    return (
        <div className={`h-screen ${t.bg} flex flex-col overflow-hidden transition-colors duration-500`}>
            {/* Header */}
            <div className={`${t.header} text-white shadow-2xl z-50 flex-shrink-0 relative overflow-hidden transition-colors duration-500`}>
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-40 h-40 border-2 border-white rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-48 h-48 border-2 border-white rounded-full"></div>
                </div>
                <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 relative z-10">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                            <div className={`${t.headerIconBg} p-2.5 sm:p-3 rounded-lg backdrop-blur flex-shrink-0`}>
                                <BookOpen size={40} className="text-amber-200" />
                            </div>
                            <div className="min-w-0">
                                <h1 className={`text-2xl sm:text-4xl font-serif font-bold truncate ${t.headerText}`}>Mushaf Al-Qur'an Online by Hifdzi</h1>
                                <p className={`${t.headerSub} text-xs sm:text-sm font-light tracking-wide hidden sm:block`}>Baca, dengarkan, tadabburi</p>
                                <p className={`${t.headerSub} text-xs sm:text-sm font-light tracking-wide hidden sm:block opacity-60`}>API by equran.id</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                            <div className="text-right hidden sm:block">
                                <p className={`${t.headerAccent} text-lg font-serif font-semibold`}>Surah {selectedSurat?.nomor}</p>
                                <p className={`${t.headerSub} text-xs`}>of 114</p>
                            </div>
                            <button
                                onClick={() => setShowVectorSearch(true)}
                                className={`p-2 ${t.headerBtnHover} rounded-lg transition-all`}
                                title="Pencarian Semantik (Vector Search)"
                            >
                                <Sparkles size={20} className={t.headerText} />
                            </button>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`p-2 ${t.headerBtnHover} rounded-lg transition-all`}
                                title={darkMode ? "Light mode" : "Dark mode"}
                            >
                                {darkMode ? <Sun size={20} className="text-amber-300" /> : <Moon size={20} className="text-white" />}
                            </button>
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className={`p-2 ${t.headerBtnHover} rounded-lg transition-all`}
                                title="Settings"
                            >
                                <Settings size={20} className={t.headerText} />
                            </button>
                            <button
                                onClick={() => setIsPanelHidden(!isPanelHidden)}
                                className={`p-2 ${t.headerBtnHover} rounded-lg transition-all`}
                                title={isPanelHidden ? "Show controls" : "Hide controls"}
                            >
                                {isPanelHidden ? (
                                    <ChevronDown size={20} className={t.headerText} />
                                ) : (
                                    <ChevronLeft size={20} className={t.headerText} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vector Search Overlay */}
            {showVectorSearch && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm">
                    <div className={`${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-amber-200'} border-2 rounded-xl shadow-2xl w-full max-w-3xl h-[85vh] sm:max-h-[90vh] flex flex-col overflow-hidden transition-colors`}>
                        {/* Header */}
                        <div className={`p-4 border-b ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-amber-100 bg-amber-50'} flex items-center justify-between`}>
                            <div className="flex items-center gap-2">
                                <Sparkles className={darkMode ? "text-amber-400" : "text-amber-600"} size={20} />
                                <h3 className={`font-serif font-bold ${darkMode ? 'text-amber-200' : 'text-amber-900'} text-lg`}>Pencarian Pintar (Semantic Vector)</h3>
                            </div>
                            <button onClick={() => setShowVectorSearch(false)} className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}>
                                <X size={20} />
                            </button>
                        </div>
                        {/* Input Form */}
                        <div className={`p-4 border-b ${darkMode ? 'border-gray-800' : 'border-amber-100'}`}>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <input 
                                    type="text" 
                                    value={vectorQuery}
                                    onChange={e => setVectorQuery(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleVectorSearch()}
                                    placeholder="Cari ayat tentang makna, topik, atau kalimat..." 
                                    className={`flex-1 rounded-lg px-4 py-2.5 focus:outline-none transition-colors text-sm sm:text-base ${darkMode ? 'bg-gray-800 border-2 border-gray-700 text-amber-100 focus:border-amber-600' : 'bg-white border-2 border-amber-200 text-gray-900 focus:border-amber-600'}`}
                                />
                                <button 
                                    onClick={handleVectorSearch}
                                    disabled={isVectorSearching || !vectorQuery.trim()}
                                    className={`px-6 py-2.5 rounded-lg font-serif font-bold text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2 ${darkMode ? 'bg-amber-700 hover:bg-amber-600' : 'bg-amber-600 hover:bg-amber-700'}`}
                                >
                                    {isVectorSearching ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                                    Cari
                                </button>
                            </div>
                        </div>
                        {/* Results */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {isVectorSearching && (
                                <div className="text-center py-12">
                                    <Loader2 size={40} className={`mx-auto mb-4 animate-spin ${darkMode ? 'text-amber-500' : 'text-amber-600'}`} />
                                    <p className={`font-serif text-lg ${darkMode ? 'text-amber-200' : 'text-amber-800'}`}>Mencari makna dan konteks...</p>
                                </div>
                            )}
                            {!isVectorSearching && vectorError && (
                                <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-red-900/30 text-red-400 border border-red-900/50' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                                    {vectorError}
                                </div>
                            )}
                            {!isVectorSearching && !vectorError && vectorResults.length === 0 && vectorQuery && (
                                <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'} font-serif`}>
                                    Belum ada hasil pencarian. Coba kalimat lain yang relevan.
                                </div>
                            )}
                            {!isVectorSearching && !vectorError && vectorResults.map((result, idx) => {
                                const d = result.data || {};
                                
                                const arab = d.teks_arab || result.teksArab || "";
                                const indo = d.terjemahan_id || result.teksIndonesia || "";
                                const surahNo = d.id_surat || result.suratNomor || 1;
                                const ayatNo = d.nomor_ayat || result.nomorAyat || "";
                                const suratNama = d.nama_surat || result.namaLatin || `Surah ${surahNo}`;
                                const score = result.skor || 0;
                                const relevansi = result.relevansi || "";

                                return (
                                    <div key={idx} className={`p-4 sm:p-5 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-amber-700/50 shadow-md shadow-black/20' : 'bg-white border-amber-200 hover:border-amber-400 shadow-sm'} transition-colors relative overflow-hidden group`}>
                                        <div className="flex justify-between items-start mb-4 gap-4">
                                            <div className="flex-1">
                                                <div className={`font-serif font-bold text-sm sm:text-base ${darkMode ? 'text-amber-400' : 'text-amber-700'}`}>
                                                    {suratNama} : Ayat {ayatNo}
                                                </div>
                                                <div className="flex items-center gap-2 mt-1.5">
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${darkMode ? 'bg-amber-900/40 text-amber-400 border border-amber-700/50' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                                                        Skor: {(score * 100).toFixed(1)}%
                                                    </span>
                                                    {relevansi && (
                                                        <span className={`text-xs px-2 py-0.5 rounded-full capitalize font-semibold ${darkMode ? 'bg-gray-800 text-emerald-400 border border-emerald-900/50' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                                                            {relevansi}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => {
                                                    setShowVectorSearch(false)
                                                    handleSuratChange(parseInt(surahNo))
                                                }}
                                                className={`flex-shrink-0 px-3 py-1.5 text-xs font-serif font-bold rounded-md transition-colors ${darkMode ? 'bg-amber-900/50 text-amber-300 hover:bg-amber-900' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'}`}
                                            >
                                                Buka Surah
                                            </button>
                                        </div>
                                        {arab && (
                                            <p className={`font-arabic text-xl sm:text-2xl text-right mb-4 ${darkMode ? 'text-amber-50' : 'text-stone-900'} leading-loose tracking-wide`}>
                                                {arab}
                                            </p>
                                        )}
                                        {indo && (
                                            <p className={`font-serif text-sm ${darkMode ? 'text-emerald-200/90' : 'text-gray-700'} leading-relaxed text-justify`}>
                                                {indo}
                                            </p>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Settings Panel */}
            {showSettings && (
                <div className={`${t.settingsPanel} shadow-lg z-40 flex-shrink-0 px-4 py-4 transition-colors duration-500`}>
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className={`font-serif font-bold ${t.settingsTitle}`}>Display Settings</h3>
                            <button onClick={() => setShowSettings(false)} className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className={`text-xs font-serif font-bold ${t.label} mb-2 block`}>Arabic Text Size</label>
                                <div className="flex gap-2">
                                    {['sm', 'md', 'lg', 'xl'].map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setFontSize(size)}
                                            className={`px-3 py-1 rounded text-xs font-serif font-bold transition-all ${
                                                fontSize === size ? t.settingsBtnActive : t.settingsBtnInactive
                                            }`}
                                        >
                                            {size.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className={`text-xs font-serif font-bold ${t.label} mb-2 block`}>Theme</label>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded text-xs font-serif font-bold transition-all ${
                                        darkMode ? 'bg-amber-700 text-white' : 'bg-gray-800 text-white'
                                    }`}
                                >
                                    {darkMode ? <><Sun size={14} /> Light Mode</> : <><Moon size={14} /> Dark Mode</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Controls Section */}
            <div className={`${t.controlsPanel} shadow-xl z-40 flex-shrink-0 overflow-hidden transition-all duration-300 ${isPanelHidden ? 'max-h-0' : 'max-h-96'} overflow-y-auto`}>
                <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="sm:col-span-2 lg:col-span-2">
                                <label className={`block text-xs font-serif font-bold ${t.label} mb-3 uppercase tracking-widest`}>Search Surah</label>
                                <div className="relative mb-3">
                                    <Search size={16} className={`absolute left-3 top-3.5 ${darkMode ? 'text-amber-500' : 'text-amber-600'}`} />
                                    <input
                                        type="text"
                                        placeholder="Search by name or number..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={`w-full rounded-lg pl-9 pr-4 py-2.5 focus:outline-none text-sm transition-colors ${t.searchInput}`}
                                    />
                                </div>
                                {searchQuery && (
                                    <div className={`rounded-lg border max-h-40 overflow-y-auto ${t.searchDropdown}`}>
                                        {filteredSurats.slice(0, 8).map(surat => (
                                            <button
                                                key={surat.nomor}
                                                onClick={() => handleSuratChange(surat.nomor)}
                                                className={`w-full text-left px-4 py-2.5 border-b last:border-b-0 font-serif text-sm transition-colors ${t.searchItem}`}
                                            >
                                                <span className={`font-bold ${t.searchItemBold}`}>{surat.nomor}.</span> {surat.namaLatin}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className={`block text-xs font-serif font-bold ${t.label} mb-3 uppercase tracking-widest`}>Reciter</label>
                                <select
                                    value={selectedReader}
                                    onChange={(e) => setSelectedReader(e.target.value)}
                                    className={`w-full rounded-lg px-3 py-2.5 focus:outline-none text-sm font-serif transition-colors ${t.select}`}
                                >
                                    {Object.entries(readers).map(([key, name]) => (
                                        <option key={key} value={key}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={`flex gap-2 flex-wrap items-center pt-4 border-t ${darkMode ? 'border-amber-900/20' : 'border-amber-100'}`}>
                            <button onClick={handlePrevSurat} disabled={selectedSurat?.nomor === 1} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm font-serif uppercase tracking-wide disabled:cursor-not-allowed ${t.navBtn}`}>
                                <ChevronLeft size={16} /> Previous
                            </button>
                            <button onClick={handleNextSurat} disabled={selectedSurat?.nomor === 114} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm font-serif uppercase tracking-wide disabled:cursor-not-allowed ${t.navBtn}`}>
                                Next <ChevronRight size={16} />
                            </button>
                            {selectedSurat?.audioFull && selectedSurat.audioFull[selectedReader] && (
                                <button onClick={playFullSurah} className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm font-serif uppercase tracking-wide ml-auto ${isPlayingFullSurah ? t.stopBtn : t.playBtn}`}>
                                    {isPlayingFullSurah ? <><Pause size={16} /> Stop</> : <><Play size={16} /> Play</>}
                                </button>
                            )}
                        </div>

                        {isPlayingFullSurah && (
                            <div className={`pt-4 border-t ${darkMode ? 'border-amber-900/20' : 'border-amber-100'}`}>
                                <div className={`w-full rounded-full h-2 overflow-hidden shadow-sm ${t.progressBg}`}>
                                    <div className={`${t.progressFill} h-2 rounded-full transition-all duration-300`} style={{ width: `${audioProgress}%` }}></div>
                                </div>
                            </div>
                        )}

                        {selectedSurat && (
                            <div className={`rounded-lg p-4 sm:p-6 shadow-sm ${t.infoCard}`}>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                                    <div className="flex flex-col">
                                        <span className={`text-xs uppercase font-serif font-bold ${t.infoLabel} tracking-widest mb-1`}>Name</span>
                                        <p className={`font-serif font-bold ${t.infoValue} text-sm sm:text-base`}>{selectedSurat.namaLatin}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-xs uppercase font-serif font-bold ${t.infoLabel} tracking-widest mb-1`}>Arabic</span>
                                        <p className={`font-arabic text-lg sm:text-2xl ${t.infoValue}`}>{selectedSurat.nama}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-xs uppercase font-serif font-bold ${t.infoLabel} tracking-widest mb-1`}>Meaning</span>
                                        <p className={`font-serif ${t.infoValue} text-xs sm:text-sm`}>{selectedSurat.arti}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-xs uppercase font-serif font-bold ${t.infoLabel} tracking-widest mb-1`}>Verses</span>
                                        <p className={`font-serif font-bold text-xl sm:text-2xl ${t.infoValue}`}>{selectedSurat.jumlahAyat}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-xs uppercase font-serif font-bold ${t.infoLabel} tracking-widest mb-1`}>Revealed</span>
                                        <p className={`font-serif ${t.infoValue} text-xs sm:text-sm`}>{selectedSurat.tempatTurun}</p>
                                    </div>
                                </div>
                                <p className={`font-serif text-xs ${t.infoSub} border-t pt-3 mt-3`}>
                                    Page {currentPage} of {totalPages} • Verses {(currentPage - 1) * versesPerPage + 1}–{Math.min(currentPage * versesPerPage, selectedSurat.jumlahAyat)}
                                </p>
                            </div>
                        )}

                        {selectedSurat?.deskripsi && (
                            <div className={`border-l-4 rounded-lg p-4 sm:p-5 ${t.descCard}`}>
                                <span className={`text-xs uppercase font-serif font-bold ${t.descLabel} tracking-widest block mb-2`}>About This Surah</span>
                                <p className={`font-serif text-xs sm:text-sm ${t.descText} leading-relaxed line-clamp-3`}>{selectedSurat.deskripsi}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Verses Display */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
                    {loadingAyat ? (
                        <div className="text-center py-12">
                            <BookOpen size={48} className="text-amber-600 mx-auto mb-4 animate-pulse" />
                            <p className={`font-serif text-lg ${t.loadingText}`}>Loading Verses...</p>
                        </div>
                    ) : displayedAyat.length > 0 ? (
                        <div className="space-y-5 sm:space-y-6">
                            {displayedAyat.map((ayat) => {
                                const isBookmarked = bookmarks.includes(`${selectedSurat?.nomor}-${ayat.nomorAyat}`)
                                const isPlaying = playingAyat === `${selectedSurat?.nomor}-${ayat.nomorAyat}`
                                return (
                                    <div key={`${selectedSurat?.nomor}-${ayat.nomorAyat}`} className={`rounded-lg transition-all p-5 sm:p-6 border-l-4 overflow-hidden relative group ${t.verseCard}`}>
                                        <div className={`absolute top-0 right-0 h-1 w-20 sm:w-32 bg-gradient-to-l ${t.verseHoverStripe} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                                        <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                                            <div className="flex items-center gap-3">
                                                <span className={`inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br ${t.verseBadge} text-white font-serif font-bold text-sm sm:text-lg flex-shrink-0 shadow-lg`}>{ayat.nomorAyat}</span>
                                                <span className={`text-xs sm:text-sm ${t.verseSurahLabel} font-serif font-semibold`}>{selectedSurat?.namaLatin} : {ayat.nomorAyat}</span>
                                            </div>
                                            <div className="flex items-center gap-1 flex-wrap justify-end">
                                                {ayat.audio && ayat.audio[selectedReader] && (
                                                    <button onClick={() => playAyahAudio(ayat)} className={`p-1.5 sm:p-2 rounded-lg transition-all hover:scale-105 ${isPlaying ? `${t.verseAudioActive} shadow-md scale-105` : t.verseAudioInactive}`} title="Play verse">
                                                        <Volume2 size={18} fill={isPlaying ? 'currentColor' : 'none'} />
                                                    </button>
                                                )}
                                                <button onClick={() => toggleBookmark(ayat)} className={`p-1.5 sm:p-2 rounded-lg transition-all hover:scale-105 ${isBookmarked ? `${t.verseBookmarkActive} shadow-md scale-105` : t.verseBookmarkInactive}`} title="Bookmark">
                                                    <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                                                </button>
                                                <button onClick={() => copyToClipboard(ayat.teksArab, ayat.nomorAyat)} className={`p-1.5 sm:p-2 rounded-lg transition-all hover:scale-105 ${t.verseCopyBtn}`} title="Copy text">
                                                    <Copy size={18} />
                                                </button>
                                            </div>
                                        </div>
                                        {isPlaying && (
                                            <div className="mb-4 flex gap-2">
                                                <span className={`text-xs font-serif font-bold px-2 py-1 rounded-full animate-pulse ${currentRepeat >= 5 ? t.repeatBadgeHigh : t.repeatBadge}`}>{currentRepeat}x 🔊</span>
                                            </div>
                                        )}
                                        <div className={`mb-5 p-4 sm:p-6 rounded-lg border ${t.arabicBg}`}>
                                            <p className={`font-arabic ${fontSizeClasses[fontSize]} leading-loose text-right ${t.arabicText} tracking-wider`}>{ayat.teksArab}</p>
                                        </div>
                                        <p className={`font-serif text-xs sm:text-sm ${t.latinText} italic mb-4 leading-relaxed pl-3 sm:pl-4 border-l-2 font-semibold`}>{ayat.teksLatin}</p>
                                        <div className={`p-4 sm:p-5 rounded-lg border ${t.translationBg}`}>
                                            <p className={`font-serif text-sm ${t.translationText} font-medium leading-relaxed text-justify`}>{ayat.teksIndonesia}</p>
                                        </div>
                                        {copyFeedback === ayat.nomorAyat && (
                                            <div className={`mt-3 text-xs sm:text-sm ${t.copyFeedback} font-semibold font-serif flex items-center gap-2 animate-pulse`}>
                                                <span>✓</span> Copied to Clipboard
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className={`rounded-lg shadow-lg p-12 text-center ${t.emptyState}`}>
                            <p className="font-serif text-lg">No verses available.</p>
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="mt-8 sm:mt-10 flex justify-center items-center gap-1 sm:gap-2 flex-wrap">
                            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-serif font-semibold transition-all disabled:cursor-not-allowed ${t.navBtn}`}>← Prev</button>
                            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                                let page = i + 1
                                if (totalPages > 7 && currentPage > 4) page = currentPage - 3 + i
                                if (totalPages > 7 && page > totalPages - 3) return null
                                return page
                            }).filter(Boolean).map((page) => (
                                <button key={page} onClick={() => setCurrentPage(page)} className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-serif font-bold transition-all ${currentPage === page ? `${t.pageBtnActive} shadow-lg scale-105` : t.pageBtn}`}>{page}</button>
                            ))}
                            <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-serif font-semibold transition-all disabled:cursor-not-allowed ${t.navBtn}`}>Next →</button>
                        </div>
                    )}

                    {bookmarks.length > 0 && (
                        <div className={`mt-8 rounded-lg p-4 shadow-lg flex items-center justify-between gap-4 ${t.bookmarkBar}`}>
                            <p className={`text-xs sm:text-sm font-serif font-bold ${t.bookmarkText}`}>📌 {bookmarks.length} Verse{bookmarks.length !== 1 ? 's' : ''} Bookmarked</p>
                            <button onClick={() => setBookmarks([])} className={`text-xs font-serif font-bold transition-colors flex items-center gap-1 ${t.bookmarkClear}`}>
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
