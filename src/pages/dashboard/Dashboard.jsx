import React, { useState, useEffect } from "react"
import { Menu, ChevronDown, Plus } from "lucide-react"

export default function Dashboard() {
    const [selectedGrade, setSelectedGrade] = useState("A")
    const [notes, setNotes] = useState("")
    const [suratList, setSuratList] = useState([])
    const [selectedSurat, setSelectedSurat] = useState(null)
    const [selectedJuz, setSelectedJuz] = useState("30")
    const [halaman, setHalaman] = useState("1")
    const [ayatStart, setAyatStart] = useState("1")
    const [ayatEnd, setAyatEnd] = useState("10")
    const [loading, setLoading] = useState(true)
    const [ayatList, setAyatList] = useState([])
    const [loadingAyat, setLoadingAyat] = useState(false)
    
    // Fasholah state
    const [fasholahMode, setFasholahMode] = useState("manual") // "manual" or "radio"
    const [tajwidScore, setTajwidScore] = useState(85)
    const [tempoScore, setTempoScore] = useState(90)
    const [waqafScore, setWaqafScore] = useState(88)

    // Fetch surat list from API
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
        } catch (error) {
            console.error("Error fetching ayat:", error)
            setAyatList([])
        } finally {
            setLoadingAyat(false)
        }
    }

    const handleSuratChange = (e) => {
        const surat = suratList.find(s => s.nomor == e.target.value)
        setSelectedSurat(surat)
        if (surat) {
            setAyatEnd(Math.min(40, surat.jumlahAyat))
            fetchAyat(surat.nomor)
        }
    }

    const handleAyatStartChange = (val) => {
        const num = parseInt(val) || 1
        setAyatStart(num.toString())
    }

    const handleAyatEndChange = (val) => {
        const num = parseInt(val) || 40
        const maxAyat = selectedSurat?.jumlahAyat || 286
        setAyatEnd(Math.min(num, maxAyat).toString())
    }

    const gradeOptions = [
        { value: "A+", score: 91, max: 100, label: "Sangat Lancar (Lulus)", color: "green" },
        { value: "A", score: 81, max: 90, label: "Lancar (Lulus)", color: "green" },
        { value: "B", score: 71, max: 80, label: "Cukup (Lulus)", color: "yellow" },
        { value: "C", score: 61, max: 70, label: "Kurang (Lulus)", color: "orange" },
        { value: "D", score: 51, max: 60, label: "Bernyarat", color: "red" },
        { value: "O", score: 30, max: 50, label: "Gagal (Ulang)", color: "red" },
    ]

    const scoreQualities = [
        { score: 95, label: "Sempurna" },
        { score: 85, label: "Baik" },
        { score: 75, label: "Cukup" },
        { score: 60, label: "Kurang" },
        { score: 40, label: "Sangat Kurang" },
    ]

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-56 bg-white border-r border-gray-200 overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="text-sm font-bold text-gray-800">PPIQU Doplang</div>
                    <div className="text-sm font-bold text-gray-800">Adipala-Cilacap</div>
                    <div className="text-xs text-gray-500 mt-1">Tahfidz System</div>
                </div>

                <nav className="mt-6">
                    <div className="px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                        <Menu size={18} /> Dashboard
                    </div>
                    <div className="px-4 py-3 bg-gray-100 text-gray-800 font-medium cursor-pointer flex items-center gap-2 border-l-4 border-green-600">
                        <Menu size={18} /> Input Nilai
                    </div>
                    <div className="px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                        <Menu size={18} /> Data Santri
                    </div>
                    <div className="px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                        <Menu size={18} /> Laporan
                    </div>
                    <div className="px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                        <Menu size={18} /> Pengaturan
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <div className="bg-white border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-800 mb-3">
                                Input Nilai Ujian
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <span>📍</span>
                                    <span>Penguji Ust: Ahmad Fauzi</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>📍</span>
                                    <span>Gedung Utama, Ruang 3A</span>
                                </div>
                            </div>
                        </div>
                        <button className="text-gray-700 font-medium hover:text-gray-900">
                            ⏱️ Riwayat
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Student Details */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm">👤</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            Muhammad Rizky
                                        </h3>
                                        <p className="text-xs text-gray-500">NIS: 20230145</p>
                                    </div>
                                </div>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Kelas</span>
                                        <span className="font-medium">10 IPA 1</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tahun Program</span>
                                        <span className="font-medium">Tahun ke-2</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Asal Kota</span>
                                        <span className="font-medium">Bandung</span>
                                    </div>
                                </div>
                            </div>

                            {/* Exam Configuration - Enhanced */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 shadow-sm border border-blue-200">
                                <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                    ⚙️ Konfigurasi Ujian
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-700 uppercase">
                                            Tanggal Ujian
                                        </label>
                                        <input
                                            type="text"
                                            value="10/24/2023"
                                            className="w-full mt-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700"
                                            readOnly
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs font-semibold text-gray-700 uppercase">
                                                Juz
                                            </label>
                                            <select
                                                value={selectedJuz}
                                                onChange={(e) => setSelectedJuz(e.target.value)}
                                                className="w-full mt-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                                            >
                                                {Array.from({ length: 30 }, (_, i) => (
                                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-700 uppercase">
                                                Surat
                                            </label>
                                            <select
                                                onChange={handleSuratChange}
                                                value={selectedSurat?.nomor || ""}
                                                className="w-full mt-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                                                disabled={loading}
                                            >
                                                <option value="">Pilih Surat...</option>
                                                {suratList.map((surat) => (
                                                    <option key={surat.nomor} value={surat.nomor}>
                                                        {surat.nomor}. {surat.namaLatin}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    
                                    {selectedSurat && (
                                        <div className="bg-white rounded-lg p-3 border border-blue-100 text-sm">
                                            <div className="font-semibold text-gray-800">{selectedSurat.namaLatin}</div>
                                            <div className="text-xs text-gray-600 mt-1">Total: {selectedSurat.jumlahAyat} ayat</div>
                                            <div className="text-xs text-gray-600">{selectedSurat.tempatTurun}</div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs font-semibold text-gray-700 uppercase">
                                                Halaman
                                            </label>
                                            <input
                                                type="number"
                                                value={halaman}
                                                onChange={(e) => setHalaman(e.target.value)}
                                                placeholder="582"
                                                className="w-full mt-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-700 uppercase">
                                                Ayat
                                            </label>
                                            <div className="flex gap-2 mt-2">
                                                <input
                                                    type="number"
                                                    value={ayatStart}
                                                    onChange={(e) => handleAyatStartChange(e.target.value)}
                                                    placeholder="1"
                                                    className="flex-1 px-2 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                                                />
                                                <span className="flex items-center text-gray-400">-</span>
                                                <input
                                                    type="number"
                                                    value={ayatEnd}
                                                    onChange={(e) => handleAyatEndChange(e.target.value)}
                                                    placeholder={selectedSurat?.jumlahAyat || "40"}
                                                    className="flex-1 px-2 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold text-gray-700 uppercase">
                                            Durasi Ujian
                                        </label>
                                        <div className="flex gap-2 mt-2">
                                            <input
                                                type="number"
                                                defaultValue="30"
                                                className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                                            />
                                            <select className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm">
                                                <option>Menit</option>
                                            </select>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-2">Maksimal 60 Menit</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Score Panel */}
                            <div className="bg-gradient-to-r from-green-700 to-green-800 rounded-lg p-8 text-white shadow-sm">
                                <div className="text-6xl font-bold mb-2">92</div>
                                <p className="text-green-100 text-sm mb-4">
                                    Pastikan objektifitas dalam memberikan evaluasi
                                </p>
                                {selectedSurat && (
                                    <div className="mt-4 p-4 bg-green-600 bg-opacity-50 rounded-lg">
                                        <div className="text-xs uppercase tracking-wider text-green-200 mb-2 font-semibold">
                                            Info Surat Ujian
                                        </div>
                                        <div className="text-sm text-white">
                                            <div><strong>{selectedSurat.nomor}. {selectedSurat.namaLatin}</strong></div>
                                            <div className="text-green-100 text-xs mt-1">{selectedSurat.arti}</div>
                                            <div className="text-green-100 text-xs mt-2">Ayat {ayatStart} - {ayatEnd} dari {selectedSurat.jumlahAyat}</div>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-4 text-xs uppercase tracking-wider text-green-200 font-semibold">
                                    Skor Sementara
                                </div>
                            </div>

                            {/* Kelancaran Section */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-6">
                                    <h3 className="font-semibold text-gray-800">
                                        🎯 Kelancaran (Hafalan)
                                    </h3>
                                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                                        AKTIF
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mb-6">
                                    Bobot Penilaian: 70%
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {gradeOptions.map((grade) => (
                                        <div
                                            key={grade.value}
                                            onClick={() => setSelectedGrade(grade.value)}
                                            className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                                                selectedGrade === grade.value
                                                    ? "border-green-500 bg-green-50"
                                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                            }`}
                                        >
                                            <div className={`text-lg font-bold text-${grade.color}-600`}>
                                                {grade.value}
                                            </div>
                                            <div className="text-xs text-gray-600 mt-1">
                                                {grade.score} - {grade.max}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {grade.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Fasholah Section - Enhanced */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-semibold text-gray-800">
                                        📋 Fasholah (Kefasihan)
                                    </h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setFasholahMode("manual")}
                                            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                                                fasholahMode === "manual"
                                                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                                                    : "bg-gray-100 text-gray-600 border border-gray-200"
                                            }`}
                                        >
                                            Input Manual
                                        </button>
                                        <button
                                            onClick={() => setFasholahMode("radio")}
                                            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                                                fasholahMode === "radio"
                                                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                                                    : "bg-gray-100 text-gray-600 border border-gray-200"
                                            }`}
                                        >
                                            Radio Button
                                        </button>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 mb-6">
                                    Bobot Penilaian: 30%
                                </p>

                                <div className="space-y-6">
                                    {/* Tajwid */}
                                    <div className="pb-6 border-b border-gray-200">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-gray-700 font-medium">
                                                Tajwid (Hukum Bacaan)
                                            </span>
                                            <span className="font-semibold text-green-700">
                                                {tajwidScore} / 100
                                            </span>
                                        </div>
                                        {fasholahMode === "manual" ? (
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={tajwidScore}
                                                onChange={(e) => setTajwidScore(parseInt(e.target.value))}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                            />
                                        ) : (
                                            <div className="space-y-2">
                                                {scoreQualities.map((quality) => (
                                                    <label key={quality.score} className="flex items-center gap-3 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="tajwid"
                                                            value={quality.score}
                                                            checked={tajwidScore === quality.score}
                                                            onChange={(e) => setTajwidScore(parseInt(e.target.value))}
                                                            className="w-4 h-4 text-blue-600"
                                                        />
                                                        <span className="text-sm text-gray-700">{quality.label} ({quality.score})</span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
                                            <span>Banyak Kesalahan</span>
                                            <span>Sempurna</span>
                                        </div>
                                    </div>

                                    {/* Tempo & Irama */}
                                    <div className="pb-6 border-b border-gray-200">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-gray-700 font-medium">
                                                Tempo & Irama (Tartil)
                                            </span>
                                            <span className="font-semibold text-green-700">
                                                {tempoScore} / 100
                                            </span>
                                        </div>
                                        {fasholahMode === "manual" ? (
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={tempoScore}
                                                onChange={(e) => setTempoScore(parseInt(e.target.value))}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                            />
                                        ) : (
                                            <div className="space-y-2">
                                                {scoreQualities.map((quality) => (
                                                    <label key={quality.score} className="flex items-center gap-3 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="tempo"
                                                            value={quality.score}
                                                            checked={tempoScore === quality.score}
                                                            onChange={(e) => setTempoScore(parseInt(e.target.value))}
                                                            className="w-4 h-4 text-blue-600"
                                                        />
                                                        <span className="text-sm text-gray-700">{quality.label} ({quality.score})</span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
                                            <span>Terburu-buru</span>
                                            <span>Tartil & Konsisten</span>
                                        </div>
                                    </div>

                                    {/* Waqaf & Ibtida */}
                                    <div>
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-gray-700 font-medium">
                                                Waqaf & Ibtida (Pemberhentian)
                                            </span>
                                            <span className="font-semibold text-green-700">
                                                {waqafScore} / 100
                                            </span>
                                        </div>
                                        {fasholahMode === "manual" ? (
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={waqafScore}
                                                onChange={(e) => setWaqafScore(parseInt(e.target.value))}
                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                            />
                                        ) : (
                                            <div className="space-y-2">
                                                {scoreQualities.map((quality) => (
                                                    <label key={quality.score} className="flex items-center gap-3 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="waqaf"
                                                            value={quality.score}
                                                            checked={waqafScore === quality.score}
                                                            onChange={(e) => setWaqafScore(parseInt(e.target.value))}
                                                            className="w-4 h-4 text-blue-600"
                                                        />
                                                        <span className="text-sm text-gray-700">{quality.label} ({quality.score})</span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
                                            <span>Sering Terputus</span>
                                            <span>Tepat & Sesuai Makna</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Catatan Penguji */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-800 mb-4">
                                    💬 Catatan Penguji
                                </h3>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Tuliskan evaluasi khusus, masukan, atau area yang perlu diperbaiki oleh santri..."
                                    className="w-full h-24 p-4 border border-gray-200 rounded-lg text-sm text-gray-600 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Bottom Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 justify-between">
                                <button className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition">
                                    <Plus size={20} /> Ujian Baru
                                </button>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button className="bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition">
                                        💾 Simpan Draft
                                    </button>
                                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition">
                                        ✓ Finalisasi Nilai
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}