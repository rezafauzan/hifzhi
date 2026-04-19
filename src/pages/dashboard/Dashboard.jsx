import React, { useState } from 'react'
import { Menu, Plus, Settings, Bell, LogOut, ChevronDown, Clock, CheckCircle } from 'lucide-react'

export default function HafalanEvaluation() {
    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Left Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-10 h-10 bg-green-700 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">P</span>
                        </div>
                        <div>
                            <p className="font-bold text-sm text-green-700">PPIQU</p>
                            <p className="text-xs text-gray-600">PPIQU Cicilap</p>
                        </div>
                    </div>
                    <button className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:bg-green-800">
                        <Plus size={18} /> Tambah Sesi Baru
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavItem icon="📊" label="Ringkasan" />
                    <NavItem icon="📖" label="Penilaian Tahfiz" />
                    <NavItem icon="👤" label="Profil Santri" />
                    <NavItem icon="⚙️" label="Konfigurasi Ujian" />
                    <NavItem icon="📄" label="Laporan Cetak" />
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                        <img src="/api/placeholder/40/40" alt="User" className="w-10 h-10 rounded-full" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">Ust. Ahmad Zaki</p>
                            <p className="text-xs text-gray-500 truncate">Pengaji Utama</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <input
                        type="text"
                        placeholder="Cari santri..."
                        className="px-4 py-2 bg-gray-100 rounded-lg text-sm w-64 focus:outline-none"
                    />
                    <div className="flex items-center gap-4">
                        <Bell size={20} className="text-gray-600 cursor-pointer" />
                        <Settings size={20} className="text-gray-600 cursor-pointer" />
                        <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-900">Muhammad Al-Fatih</p>
                                <p className="text-xs text-gray-500">NIS: 2023.04.302</p>
                            </div>
                            <img src="/api/placeholder/32/32" alt="Profile" className="w-8 h-8 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-auto">
                    <div className="p-6 max-w-7xl mx-auto grid grid-cols-3 gap-6">
                        {/* Left Column - Main Content */}
                        <div className="col-span-2 space-y-6">
                            <div>
                                <p className="text-sm text-gray-600 mb-2">Evaluasi Hafalan Al-Qur'an</p>
                                <h1 className="text-3xl font-bold text-gray-900 mb-6">Setor Hafalan</h1>
                            </div>

                            {/* Detail Ujian */}
                            <div className="bg-white rounded-lg border-l-4 border-green-700 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6">Detail Ujian</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                        Tanggal Pelaksanaan
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="mm/dd/yyyy"
                                                className="w-full px-3 py-2 bg-gray-100 rounded text-sm focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                        Juz
                                            </label>
                                            <select className="w-full px-3 py-2 bg-gray-100 rounded text-sm focus:outline-none">
                                                <option>Pilih Juz</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                        Surah
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Nama Surah"
                                                className="w-full px-3 py-2 bg-gray-100 rounded text-sm focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                        Ayat Mulai
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="0"
                                                className="w-full px-3 py-2 bg-gray-100 rounded text-sm focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                        Ayat Selesai
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="1-10"
                                                className="w-full px-3 py-2 bg-gray-100 rounded text-sm focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                      Durasi
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Clock size={18} className="text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Menit"
                                                className="flex-1 px-3 py-2 bg-gray-100 rounded text-sm focus:outline-none"
                                            />
                                            <span className="text-sm text-gray-500">MAX 60 MENIT</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Kelancaran Hafalan */}
                            <div className="bg-white rounded-lg border-l-4 border-green-700 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Kelancaran Hafalan</h2>
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Tahap 1
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">Bobot Penilaian: 70%</p>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-sm font-semibold text-gray-700">
                        Nilai Kelancaran (0-100)
                                            </label>
                                            <span className="text-sm text-gray-600">/100</span>
                                        </div>
                                        <input
                                            type="number"
                                            defaultValue="85"
                                            className="w-full px-3 py-2 bg-gray-100 rounded text-sm focus:outline-none"
                                        />
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">Status:</span> Jayyd Jiddan (Sangat Baik). Hafalan lancar dengan sedikit koreksi.
                                    </p>
                                </div>
                                <div className="mt-4 text-right">
                                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm font-semibold">
                    Predikat: A
                                    </span>
                                </div>
                            </div>

                            {/* Fashohah & Adab */}
                            <div className="bg-white rounded-lg border-l-4 border-green-700 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6">Fashohah & Adab</h2>
                                <p className="text-sm text-gray-600 mb-6">Bobot Penilaian: 30%</p>
                                <div className="grid grid-cols-3 gap-4">
                                    <ScoreCard label="Tajwid & Makhrojul" score="88" description="Kesesuaian makhoroj dan sifat." />
                                    <ScoreCard label="Tempo & Irama" score="90" description="Konsistensi bacaan (Iarts/ Hadr) bacaan." />
                                    <ScoreCard label="Waqaf & Ibtida'" score="85" description="Kesesuaian pemberhentian dan penyambungan bacaan." />
                                </div>
                            </div>

                            {/* Catatan Pengaji */}
                            <div className="bg-white rounded-lg border-l-4 border-green-700 p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  📝 Catatan Pengaji
                                </h2>
                                <textarea
                                    placeholder="Tambahkan catatan khusus terkait perkembangan hafalan santri..."
                                    className="w-full px-4 py-3 bg-gray-50 rounded text-sm focus:outline-none border border-gray-200 resize-none"
                                    rows="4"
                                />
                            </div>
                        </div>

                        {/* Right Column - Student Details */}
                        <div className="space-y-6">
                            {/* Student Card */}
                            <div className="bg-white rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detai Santri</h3>
                                <p className="text-xs text-gray-500 mb-4">Lorem ipsum dolor sit amet.</p>
                                <div className="flex flex-col items-center mb-6">
                                    <img src="/api/placeholder/60/60" alt="Student" className="w-16 h-16 rounded-full mb-3" />
                                    <h4 className="text-lg font-semibold text-gray-900">Muhammad Rizky</h4>
                                    <p className="text-sm text-gray-600">NIS: 202300143</p>
                                </div>
                                <div className="space-y-3 text-sm">
                                    <DetailRow label="Kelas" value="10 IPA 1" />
                                    <DetailRow label="Tahun Ajaran" value="2026/2027" />
                                    <DetailRow label="Kelas" value="Citayem" />
                                </div>
                            </div>

                            {/* Final Score */}
                            <div className="bg-gradient-to-br from-green-700 to-green-800 rounded-lg p-6 text-white">
                                <p className="text-sm font-semibold opacity-90 mb-2">SKOR AKHIR</p>
                                <div className="flex items-baseline gap-2 mb-3">
                                    <h2 className="text-5xl font-bold">86</h2>
                                    <span className="text-2xl">.3</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={18} />
                                    <span className="text-sm font-semibold">LULUS (Mumaiz)</span>
                                </div>
                            </div>

                            {/* Sheet & Contact */}
                            <div className="bg-white rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lembar Pengasaan</h3>
                                <p className="text-sm text-gray-600 mb-6">Pengaji:</p>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 mb-1">Ust. Ahmad Zaki</p>
                                        <p className="text-xs text-gray-600">Mengelahui Pengasuh</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 mb-1">Kyal Ritino Usman Al-Qudsy</p>
                                        <button className="text-sm font-semibold text-green-700 mt-3 border border-green-700 px-3 py-2 rounded-lg w-full hover:bg-green-50">
                      ✓ Simpan Penilaian
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function NavItem({ icon, label }) {
    return (
        <button className="w-full text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center gap-3 text-sm font-medium">
            <span>{icon}</span>
            <span>{label}</span>
        </button>
    )
}

function ScoreCard({ label, score, description }) {
    return (
        <div className="bg-gray-50 rounded-lg p-4 text-center">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">{label}</h4>
            <div className="text-3xl font-bold text-green-700 mb-2">{score}</div>
            <p className="text-xs text-gray-600">{description}</p>
        </div>
    )
}

function DetailRow({ label, value }) {
    return (
        <div className="flex justify-between">
            <span className="text-gray-600">{label}</span>
            <span className="font-semibold text-gray-900">{value}</span>
        </div>
    )
}