import { useState, useEffect } from 'react'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            id="navbar"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-sm'
                : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <a
                        href="#"
                        id="navbar-logo"
                        className="text-lg font-bold text-primary tracking-tight hover:opacity-80 transition-opacity"
                    >
                        Lorem Ipsum
                    </a>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-4 lg:gap-8">
                        <a
                            href="#features"
                            id="nav-link-features"
                            className="relative px-2 py-2 text-base font-semibold text-primary border-b-2 border-primary transition-colors"
                        >
                            Ipsum
                        </a>
                        <a
                            href="#about"
                            id="nav-link-about"
                            className="relative px-2 py-2 text-base font-medium text-text-secondary hover:text-primary transition-colors"
                        >
                            Dolor
                        </a>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <a
                            href="#contact"
                            id="navbar-cta"
                            className="inline-flex items-center px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            Sit Amet
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        id="mobile-menu-toggle"
                        className="md:hidden p-2 text-text-secondary hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-60 pb-4' : 'max-h-0'
                    }`}
                >
                    <div className="flex flex-col gap-2 pt-2">
                        <a href="#features" className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors">
                            Ipsum
                        </a>
                        <a href="#about" className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors">
                            Dolor
                        </a>
                        <a href="#contact" className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg mt-2">
                            Sit Amet
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}
