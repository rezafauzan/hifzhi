import React, { useState } from "react"
import { Menu, ChevronDown, Clock } from "lucide-react"

export default function Dashboard() {
    const [selectedGrade, setSelectedGrade] = useState("A")
    const [notes, setNotes] = useState("")

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-56 bg-white border-r border-gray-200">
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
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <div className="bg-white border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-800 mb-3">
                Input Nilai Ujian
                            </h1>
                            <div className="flex items-center gap-8 text-sm text-gray-600">
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
                    <div className="grid grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="col-span-1 space-y-6">
                            {/* Student Details */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
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

                            {/* Exam Configuration */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  Konfigurasi Ujian
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-600 uppercase">
                      Tanggal Ujian
                                        </label>
                                        <input
                                            type="text"
                                            value="10/24/2023"
                                            className="w-full mt-1 px-3 py-2 bg-gray-100 rounded text-sm"
                                            readOnly
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs font-medium text-gray-600 uppercase">
                        JUZ
                                            </label>
                                            <select className="w-full mt-1 px-3 py-2 bg-gray-100 rounded text-sm">
                                                <option>Juz 30</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-600 uppercase">
                        SURAT
                                            </label>
                                            <select className="w-full mt-1 px-3 py-2 bg-gray-100 rounded text-sm">
                                                <option>An-Naba</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs font-medium text-gray-600 uppercase">
                        HALAMAN
                                            </label>
                                            <input
                                                type="text"
                                                value="Misal: 582"
                                                className="w-full mt-1 px-3 py-2 bg-gray-100 rounded text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-medium text-gray-600 uppercase">
                        AYAT
                                            </label>
                                            <input
                                                type="text"
                                                value="1 - 40"
                                                className="w-full mt-1 px-3 py-2 bg-gray-100 rounded text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-600 uppercase">
                      DURASI UJIAN
                                        </label>
                                        <div className="flex gap-2 mt-1">
                                            <input
                                                type="text"
                                                value="30"
                                                className="flex-1 px-3 py-2 bg-gray-100 rounded text-sm"
                                            />
                                            <select className="px-3 py-2 bg-gray-100 rounded text-sm">
                                                <option>Menit</option>
                                            </select>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">MAX 60 MNT</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-span-2 space-y-6">
                            {/* Score Panel */}
                            <div className="bg-linear-to-r from-green-700 to-green-800 rounded-lg p-8 text-white shadow-sm">
                                <div className="text-6xl font-bold mb-2">92</div>
                                <p className="text-green-100 text-sm">
                  Pastikan objektifitas dalam memberikan evaluasi
                                </p>
                                <div className="mt-4 text-xs uppercase tracking-wider text-green-200">
                  Skor Sementara
                                </div>
                            </div>

                            {/* Kelancaran Section */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-6">
                                    <h3 className="font-semibold text-gray-800">
                    🎯 Kelancaran (Hafalan)
                                    </h3>
                                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                    AKTIF
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 mb-6">
                  Bobot Penilaian: 70%
                                </p>
                                <div className="grid grid-cols-3 gap-3">
                                    <div
                                        onClick={() => setSelectedGrade("A+")}
                                        className={`p-4 rounded border-2 cursor-pointer transition ${
                                            selectedGrade === "A+"
                                                ? "border-green-500 bg-green-50"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        <div className="text-lg font-bold text-green-700">A+</div>
                                        <div className="text-xs text-gray-600 mt-1">91 - 100</div>
                                        <div className="text-xs text-gray-500">
                      Sangat Lancar (Lulus)
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => setSelectedGrade("A")}
                                        className={`p-4 rounded border-2 cursor-pointer transition ${
                                            selectedGrade === "A"
                                                ? "border-green-500 bg-green-50"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        <div className="text-lg font-bold text-green-600">A</div>
                                        <div className="text-xs text-gray-600 mt-1">81 - 90</div>
                                        <div className="text-xs text-gray-500">Lancar (Lulus)</div>
                                    </div>
                                    <div
                                        onClick={() => setSelectedGrade("B")}
                                        className={`p-4 rounded border-2 cursor-pointer transition ${
                                            selectedGrade === "B"
                                                ? "border-green-500 bg-green-50"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        <div className="text-lg font-bold text-yellow-600">B</div>
                                        <div className="text-xs text-gray-600 mt-1">71 - 80</div>
                                        <div className="text-xs text-gray-500">Cukup (Lulus)</div>
                                    </div>
                                    <div className="p-4 rounded border-2 border-gray-200">
                                        <div className="text-lg font-bold text-orange-600">C</div>
                                        <div className="text-xs text-gray-600 mt-1">61 - 70</div>
                                        <div className="text-xs text-gray-500">Kurang (Lulus)</div>
                                    </div>
                                    <div className="p-4 rounded border-2 border-gray-200">
                                        <div className="text-lg font-bold text-red-600">D</div>
                                        <div className="text-xs text-gray-600 mt-1">51 - 60</div>
                                        <div className="text-xs text-gray-500">Bernyarat</div>
                                    </div>
                                    <div className="p-4 rounded border-2 border-gray-200">
                                        <div className="text-lg font-bold text-red-600">O</div>
                                        <div className="text-xs text-gray-600 mt-1">30 - 50</div>
                                        <div className="text-xs text-gray-500">Gagal (Ulang)</div>
                                    </div>
                                </div>
                            </div>

                            {/* Fasholah Section */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-800 mb-6">
                  📋 Fasholah (Kefasihan)
                                </h3>
                                <p className="text-xs text-gray-500 mb-6">
                  Bobot Penilaian: 30%
                                </p>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-3 border-b">
                                        <span className="text-gray-700">Tajwid (Hukum Bacaan)</span>
                                        <span className="font-semibold text-green-700">
                      85 / 100
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                                        <span>Banyak Kesalahan</span>
                                        <span>Sempurna</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b">
                                        <span className="text-gray-700">
                      Tempo & Irama (Tartil)
                                        </span>
                                        <span className="font-semibold text-green-700">
                      90 / 100
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                                        <span>Terburu-buru</span>
                                        <span>Tartil & Konsisten</span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 border-b">
                                        <span className="text-gray-700">
                      Waqaf & Ibtida (Pemberhentian)
                                        </span>
                                        <span className="font-semibold text-green-700">
                      88 / 100
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                        <span>Sering Terpotus</span>
                                        <span>Tepat & Sesuai Makna</span>
                                    </div>
                                </div>
                            </div>

                            {/* Catatan Penguji */}
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h3 className="font-semibold text-gray-800 mb-4">
                  Catatan Penguji
                                </h3>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Tuliskan evaluasi khusus, masukan, atau area yang perlu diperbaiki oleh santri..."
                                    className="w-full h-24 p-4 border border-gray-200 rounded-lg text-sm text-gray-600 placeholder-gray-400 resize-none"
                                />
                            </div>

                            {/* Bottom Buttons */}
                            <div className="flex gap-3 justify-between">
                                <button className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition">
                  + Ujian Baru
                                </button>
                                <div className="flex gap-3">
                                    <button className="bg-white border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition">
                    Simpan Draft
                                    </button>
                                    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition">
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
