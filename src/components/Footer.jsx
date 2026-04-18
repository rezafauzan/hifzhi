export default function Footer() {
    return (
        <footer id="footer" className="bg-surface-muted border-t border-border py-12 lg:py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <a href="#" className="text-lg font-bold text-primary tracking-tight">
                            Lorem Ipsum
                        </a>
                        <p className="mt-3 text-xs text-text-muted leading-relaxed max-w-xs">
                            &copy; 2024 Lorem ipsum dolor sit amet consectetur adipiscing.
                        </p>
                    </div>

                    {/* Links Column 1 */}
                    <div>
                        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4">
                            Lorem Ipsum
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">
                                    Dolor Sit
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Links Column 2 */}
                    <div>
                        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4">
                            Amet Consectetur
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">
                                    Adipiscing Elit
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Links Column 3 */}
                    <div>
                        <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4">
                            Adipiscing Elit
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm text-text-secondary hover:text-primary transition-colors">
                                    Sed Do
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
