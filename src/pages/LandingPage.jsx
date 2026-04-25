import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import heroStudentsImg from '../assets/images/hero-students.png'
import digitalGlobeImg from '../assets/images/digital-globe.png'
import libraryImg from '../assets/images/library.png'

const features = [
    {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        title: 'Lorem Ipsum Dolor',
        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        bgColor: 'bg-primary-light',
        iconBg: 'bg-primary',
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        title: 'Sit Amet Consectetur',
        description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        bgColor: 'bg-primary-light',
        iconBg: 'bg-primary',
    },
    {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        title: 'Adipiscing Elit Sed',
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
        bgColor: 'bg-primary-light',
        iconBg: 'bg-primary',
    },
]

const testimonials = [
    {
        quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
        name: 'Lorem Ipsum',
        role: 'Dolor Sit',
        avatarBg: 'bg-blue-600',
        avatarInitial: 'LI',
    },
    {
        quote: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
        name: 'Dolor Sit',
        role: 'Amet Consectetur',
        avatarBg: 'bg-primary',
        avatarInitial: 'DS',
    },
]

export default function LandingPage() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main>
                {/* --- HERO SECTION --- */}
                <section id="hero" className="relative pt-24 lg:pt-32 pb-20 lg:pb-28 bg-surface-muted overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            {/* Left Content */}
                            <div className="animate-fade-in-up">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-primary tracking-tight">
                                    Lorem ipsum dolor sit amet consectetur adipiscing elit
                                </h1>
                                <p className="mt-6 text-base lg:text-lg text-text-secondary leading-relaxed max-w-lg">
                                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                                <div className="mt-10 flex flex-wrap gap-4">
                                    <a
                                        href="#features"
                                        id="hero-cta-primary"
                                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-base font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-lg group"
                                    >
                                        Lorem Ipsum
                                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#about"
                                        id="hero-cta-secondary"
                                        className="inline-flex items-center px-8 py-3.5 bg-primary-light text-primary text-base font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                        Dolor Sit Amet
                                    </a>
                                </div>
                            </div>

                            {/* Right Image */}
                            <div className="animate-fade-in-up delay-200 relative">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src={heroStudentsImg}
                                        alt="Students collaborating on campus"
                                        className="w-full h-auto object-cover aspect-4/3"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-light/20 rounded-full blur-2xl" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- FEATURES SECTION --- */}
                <section id="features" className="py-24 lg:py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        {/* Section Header */}
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
                                Lorem Ipsum
                            </h2>
                            <p className="mt-4 text-base text-text-secondary leading-relaxed">
                                Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                            {/* Feature Card 1 - Top Left */}
                            <div
                                id="feature-card-1"
                                className="group relative bg-white rounded-2xl border border-border-light p-10 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="flex-1">
                                        <div className={`w-12 h-12 ${features[0].iconBg} text-white rounded-xl flex items-center justify-center mb-6`}>
                                            {features[0].icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-text-primary mb-3">
                                            {features[0].title}
                                        </h3>
                                        <p className="text-text-secondary text-base leading-relaxed">
                                            {features[0].description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Feature Card 2 - Top Right */}
                            <div
                                id="feature-card-2"
                                className="group relative bg-white rounded-2xl border border-border-light p-10 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="flex-1">
                                        <div className={`w-12 h-12 ${features[1].iconBg} text-white rounded-xl flex items-center justify-center mb-6`}>
                                            {features[1].icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-text-primary mb-3">
                                            {features[1].title}
                                        </h3>
                                        <p className="text-text-secondary text-base leading-relaxed">
                                            {features[1].description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Feature Card 3 - Bottom Left */}
                            <div
                                id="feature-card-3"
                                className="group relative bg-white rounded-2xl border border-border-light p-10 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="flex items-start gap-5">
                                    <div className="flex-1">
                                        <div className={`w-12 h-12 ${features[2].iconBg} text-white rounded-xl flex items-center justify-center mb-6`}>
                                            {features[2].icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-text-primary mb-3">
                                            {features[2].title}
                                        </h3>
                                        <p className="text-text-secondary text-base leading-relaxed">
                                            {features[2].description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Image Card - Bottom Right */}
                            <div className="relative rounded-2xl overflow-hidden shadow-xl h-full min-h-75">
                                <img
                                    src={digitalGlobeImg}
                                    alt="Digital globe technology visualization"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- ABOUT SECTION --- */}
                <section id="about" className="py-24 lg:py-32 bg-surface-muted overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                            {/* Left Image */}
                            <div className="relative">
                                <div className="rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src={libraryImg}
                                        alt="Beautiful classic library interior"
                                        className="w-full h-auto object-cover aspect-4/5"
                                    />
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                            </div>

                            {/* Right Content */}
                            <div className="flex flex-col justify-center">
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight mb-2">
                                    Lorem Ipsum
                                </h2>
                                <h3 className="text-xl lg:text-2xl font-semibold text-accent mb-8">
                                    Dolor Sit Amet
                                </h3>
                                <div className="space-y-6 text-base lg:text-lg text-text-secondary leading-relaxed">
                                    <p>
                                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus.
                                    </p>
                                    <p>
                                        Nequs porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- TESTIMONIALS SECTION --- */}
                <section id="testimonials" className="py-24 lg:py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        {/* Section Header */}
                        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
                                Lorem Ipsum
                            </h2>
                        </div>

                        {/* Testimonials Grid */}
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    id={`testimonial-card-${index + 1}`}
                                    className="bg-surface-muted rounded-2xl p-8 lg:p-10 border border-border-light hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
                                >
                                    <div>
                                        {/* Quote Icon */}
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className={`w-10 h-10 ${testimonial.avatarBg} text-white rounded-xl flex items-center justify-center shadow-md`}>
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
                                                </svg>
                                            </div>
                                        </div>

                                        <p className="text-text-secondary text-base lg:text-lg leading-relaxed mb-8 font-medium">
                                            &ldquo;{testimonial.quote}&rdquo;
                                        </p>
                                    </div>

                                    {/* Author */}
                                    <div className="flex items-center gap-4 border-t border-border pt-6">
                                        <div className={`w-12 h-12 ${testimonial.avatarBg} text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm`}>
                                            {testimonial.avatarInitial}
                                        </div>
                                        <div>
                                            <p className="text-base font-bold text-text-primary">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-sm text-text-muted font-medium">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}