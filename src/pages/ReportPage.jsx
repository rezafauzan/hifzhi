import { FaRegBell, FaRegUserCircle } from "react-icons/fa"
import { FiPrinter } from "react-icons/fi"
import { Link } from "react-router"

export const ReportPage = () => {
    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
            <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-100">
        
                {/* Header / Navbar */}
                <header className="flex flex-col md:flex-row justify-between items-center px-8 py-5 border-b gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-800 rounded-lg shadow-inner flex items-center justify-center text-white font-bold">P</div>
                        <div>
                            <h1 className="font-bold text-sm text-emerald-900 leading-tight">PPIQU Doplang Adipala-Cilacap</h1>
                            <p className="text-[10px] text-slate-400">Jl. Pangeran No. 10 RT 02/RW 03 Adipala</p>
                        </div>
                    </div>
                    <nav className="flex items-center gap-6 text-sm font-semibold text-slate-500">
                        <Link to="/dashboard" className="hover:text-emerald-700 transition-colors">Dashboard</Link>
                        <a href="#" className="text-emerald-700 border-b-2 border-emerald-700 pb-1">Ujian Tahfiz</a>
                        <div className="flex gap-4 ml-4 text-slate-400">
                            <button className="hover:text-emerald-600"> <FaRegBell className="w-5 h-5"/> </button>
                            <button className="hover:text-emerald-600"> <FiPrinter className="w-5 h-5"/> </button>
                            <button className="hover:text-emerald-600"> <FaRegUserCircle className="w-5 h-5"/> </button>
                        </div>
                    </nav>
                </header>

                <main className="p-6 md:p-10">
                    {/* Judul Halaman */}
                    <div className="mb-10">
                        <h2 className="text-3xl font-extrabold text-emerald-900 tracking-tight">Penilaian Ujian Tahfiz</h2>
                        <p className="text-slate-500 text-sm italic mt-1 font-medium">
                            Penilaian hafalan Al-Qur'an santri Pondok Pesantren Ihyaul Qur'an Al-Utsmaniyyah.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
                        {/* Kolom Kiri: Form Data */}
                        <div className="space-y-6">
                            {/* Card Profil Santri */}
                            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 relative group">
                                <div className="absolute top-5 right-5 text-slate-300 group-hover:text-emerald-500 transition-colors">👤</div>
                                <h3 className="font-bold text-emerald-900 mb-5 flex items-center gap-2">Profil Santri</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Lengkap</label>
                                        <input type="text" placeholder="Masukkan nama santri" className="w-full p-2.5 bg-slate-200/50 border-transparent rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Alamat</label>
                                        <textarea placeholder="Alamat asal" className="w-full p-2.5 bg-slate-200/50 border-transparent rounded-lg text-sm h-20 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all"></textarea>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Kelas</label>
                                            <input type="text" placeholder="Contoh: VII A" className="w-full p-2.5 bg-slate-200/50 border-transparent rounded-lg text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tahun Ke-</label>
                                            <div className="relative">
                                                <input type="text" placeholder="2" className="w-full p-2.5 bg-slate-200/50 border-transparent rounded-lg text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500" />
                                                <span className="absolute right-3 top-2.5 text-slate-400 text-xs">📅</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Card Detail Ujian */}
                            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 relative group">
                                <div className="absolute top-5 right-5 text-slate-300 group-hover:text-emerald-500 transition-colors">⚙️</div>
                                <h3 className="font-bold text-emerald-900 mb-5">Detail Ujian</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tanggal Pelaksanaan</label>
                                        <input type="date" className="w-full p-2.5 bg-slate-200/50 border-transparent rounded-lg text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Juz</label>
                                            <select className="w-full p-2.5 bg-slate-200/50 border-transparent rounded-lg text-sm outline-none text-slate-500 focus:bg-white">
                                                <option>Pilih Juz</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Surah</label>
                                            <input type="text" placeholder="Nama Surah" className="w-full p-2.5 bg-slate-200/50 border-transparent rounded-lg text-sm outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Kolom Kanan: Penilaian */}
                        <div className="lg:col-span-2 space-y-6">
                            <section className="h-full">
                                <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                                    Aspek Penilaian
                                </h3>
                
                                {/* Kelancaran */}
                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-bold text-emerald-800">Kelancaran Hafalan</h4>
                                        <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-tight">Bobot: 70%</span>
                                    </div>
                                    <div className="bg-slate-50 rounded-2xl p-10 text-center border-2 border-dashed border-slate-200 group hover:border-emerald-200 transition-all cursor-pointer">
                                        <div className="text-5xl font-black text-slate-800 mb-1 group-hover:scale-110 transition-transform">A+</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Mutqin</div>
                                    </div>
                                </div>

                                {/* Fashohah & Adab */}
                                <div className="bg-slate-50 p-7 rounded-2xl border border-slate-200/60 shadow-sm">
                                    <div className="flex justify-between items-center mb-6">
                                        <h4 className="font-bold text-emerald-800">Fashohah & Adab</h4>
                                        <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-tight">Bobot: 30%</span>
                                    </div>
                                    <div className="space-y-5">
                                        {[
                                            { label: 'Tajwid & Makhorijul Huruf', score: '85/100' },
                                            { label: 'Tempo / Irama (Tartil)', score: '70/100' },
                                            { label: 'Waqaf & Ibtida', score: '90/100' }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center border-b border-slate-200 pb-3 group">
                                                <span className="text-sm text-slate-600 font-medium group-hover:text-emerald-700 transition-colors">{item.label}</span>
                                                <span className="font-bold text-slate-800 text-sm bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">{item.score}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Catatan Penguji */}
                                <div className="mt-8">
                                    <h4 className="font-bold text-emerald-800 mb-3 ml-1">Catatan Penguji</h4>
                                    <textarea 
                                        placeholder="Tuliskan catatan khusus terkait bacaan, hafalan, atau rekomendasi perbaikan di sini..." 
                                        className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm italic text-slate-600 h-28 focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-inner"
                                    ></textarea>
                                </div>
                            </section>
                        </div>
                    </div>

                    {/* Banner Skor Akhir */}
                    <div className="mt-10 bg-emerald-900 rounded-3xl p-8 md:p-10 text-white flex flex-col md:row justify-between items-center shadow-xl shadow-emerald-900/20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16"></div>
            
                        <div className="w-full md:w-1/2 relative z-10">
                            <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
                                Predikat: Sangat Baik
                            </div>
                            <div className="space-y-3 text-sm font-medium">
                                <div className="flex justify-between max-w-60 border-b border-white/10 pb-1">
                                    <span className="opacity-70">Kelancaran (70%)</span> 
                                    <span className="font-bold text-emerald-300">62.0</span>
                                </div>
                                <div className="flex justify-between max-w-60 border-b border-white/10 pb-1">
                                    <span className="opacity-70">Fashohah (30%)</span> 
                                    <span className="font-bold text-emerald-300">26.5</span>
                                </div>
                            </div>
                        </div>

                        <div className="text-center md:text-right mt-8 md:mt-0 relative z-10">
                            <div className="text-[10px] uppercase font-black tracking-[0.3em] text-emerald-400 mb-1">Skor Akhir</div>
                            <div className="text-7xl font-black drop-shadow-lg">88.5</div>
                        </div>
                    </div>

                    {/* Tanda Tangan */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
                        <div className="space-y-20">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Penguji</p>
                            <div className="border-b-2 border-slate-100 w-56 mx-auto"></div>
                        </div>
                        <div className="space-y-20">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pengasuh</p>
                            <div className="flex flex-col items-center">
                                <p className="font-bold text-emerald-900 text-lg">Kyai Ratno Usmen Al Qudsy</p>
                                <div className="h-0.5 w-16 bg-emerald-500 mt-1"></div>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-slate-50/80 border-t border-slate-100 py-8 text-center backdrop-blur-sm">
                    <p className="text-[10px] text-slate-400 font-medium mb-3 uppercase tracking-wider">
                        © 2024 Pondok Pesantren Ihyaul Qur'an Al-Utsmaniyyah (PPIQU)
                    </p>
                    <div className="flex justify-center gap-6 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                        <a href="#" className="hover:text-emerald-800 transition-colors">Bantuan</a>
                        <a href="#" className="hover:text-emerald-800 transition-colors">Pengaturan</a>
                        <a href="#" className="underline underline-offset-4 decoration-2 hover:text-emerald-800 transition-colors">Cetak Laporan</a>
                    </div>
                </footer>
            </div>
        </div>
    )
}