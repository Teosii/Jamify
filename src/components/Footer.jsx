import {FaFacebook, FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";

export const Newsletter = () => (
    <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest news, products, and exclusive
                offers from Fender.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <input
                    type="email"
                    placeholder="Your email address"
                    className="px-6 py-3 rounded-md text-gray-900 w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-md text-lg font-semibold transition-all transform hover:scale-105">
                    Subscribe
                </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
            </p>
        </div>
    </section>
);

export const Footer = () => (
    <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-white text-lg font-semibold mb-4">FENDER</h3>
                    <ul className="space-y-2">
                        {["About Us", "Careers", "News", "Dealers"].map((item, idx) => (
                            <li key={idx}>
                                <a href="#" className="hover:text-white">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-white text-lg font-semibold mb-4">SUPPORT</h3>
                    <ul className="space-y-2">
                        {["Contact Us", "Help Center", "Warranty", "Returns"].map(
                            (item, idx) => (
                                <li key={idx}>
                                    <a href="#" className="hover:text-white">
                                        {item}
                                    </a>
                                </li>
                            )
                        )}
                    </ul>
                </div>
                <div>
                    <h3 className="text-white text-lg font-semibold mb-4">LEGAL</h3>
                    <ul className="space-y-2">
                        {[
                            "Terms of Use",
                            "Privacy Policy",
                            "Cookie Policy",
                            "Accessibility",
                        ].map((item, idx) => (
                            <li key={idx}>
                                <a href="#" className="hover:text-white">
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="text-white text-lg font-semibold mb-4">CONNECT</h3>
                    <div className="flex space-x-4 mb-4">
                        <FaFacebook className="text-gray-400 hover:text-white text-xl" />
                        <FaTwitter className="text-gray-400 hover:text-white text-xl" />
                        <FaInstagram className="text-gray-400 hover:text-white text-xl" />
                        <FaYoutube className="text-gray-400 hover:text-white text-xl" />
                    </div>
                    <p className="text-sm">
                        © 2023 Fender Musical Instruments Corporation. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    </footer>
);
