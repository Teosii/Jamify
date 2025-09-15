import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import feather from "feather-icons";
import './../../App.css'


const LearnPage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
        feather.replace();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white font-sans">



            {/* Hero */}
            <header className="h-screen flex flex-col justify-center items-center text-center px-6">
                <h1
                    className="text-5xl md:text-7xl font-bold mb-6"
                    data-aos="fade-up"
                >
                    Master the <span className="text-blue-400">Blues Guitar</span>
                </h1>
                <p className="text-lg text-gray-300 max-w-2xl mb-8" data-aos="fade-up">
                    Learn classic 12-bar blues, essential chords, rhythm patterns, and
                    improvisation with easy interactive lessons.
                </p>
                <a
                    href="#lessons"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg transition"
                    data-aos="fade-up"
                >
                    Start Learning
                </a>
            </header>

            {/* Chords Section */}
            <section id="chords" className="py-20 px-6 bg-gray-900">
                <div className="container mx-auto text-center" data-aos="fade-right">
                    <h2 className="text-4xl font-bold mb-12">Essential Blues Chords</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="chord-diagram" data-aos="zoom-in">
                            <p className="chord-name">E7</p>
                            <div className="chord-fretboard">
                                <div className="chord-string"><span className="chord-open"></span></div>
                                <div className="chord-string"><span className="chord-finger">1</span></div>
                                <div className="chord-string"><span className="chord-finger">2</span></div>
                                <div className="chord-string"></div>
                                <div className="chord-string"><span className="chord-open"></span></div>
                                <div className="chord-string"><span className="chord-open"></span></div>
                            </div>
                        </div>

                        <div className="chord-diagram" data-aos="zoom-in">
                            <p className="chord-name">A7</p>
                            <div className="chord-fretboard">
                                <div className="chord-string"><span className="chord-muted">X</span></div>
                                <div className="chord-string"><span className="chord-open"></span></div>
                                <div className="chord-string"><span className="chord-finger">2</span></div>
                                <div className="chord-string"><span className="chord-finger">1</span></div>
                                <div className="chord-string"><span className="chord-open"></span></div>
                                <div className="chord-string"><span className="chord-open"></span></div>
                            </div>
                        </div>

                        <div className="chord-diagram" data-aos="zoom-in">
                            <p className="chord-name">B7</p>
                            <div className="chord-fretboard">
                                <div className="chord-string"><span className="chord-muted">X</span></div>
                                <div className="chord-string"><span className="chord-finger">1</span></div>
                                <div className="chord-string"><span className="chord-finger">2</span></div>
                                <div className="chord-string"><span className="chord-finger">3</span></div>
                                <div className="chord-string"><span className="chord-open"></span></div>
                                <div className="chord-string"><span className="chord-finger">4</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rhythm Section */}
            <section id="rhythm" className="py-20 px-6 bg-black">
                <div className="container mx-auto text-center" data-aos="fade-left">
                    <h2 className="text-4xl font-bold mb-12">Rhythm Patterns</h2>
                    <div className="rhythm-pattern justify-center" data-aos="fade-up">
                        <div className="beat downstroke">D</div>
                        <div className="beat muted">X</div>
                        <div className="beat upstroke">U</div>
                        <div className="beat downstroke">D</div>
                        <div className="beat slide">⇢</div>
                    </div>
                    <p className="text-gray-400 mt-6">
                        Classic shuffle rhythm with downstrokes, upstrokes, and muted hits.
                    </p>
                </div>
            </section>

            {/* Lessons Section */}
            <section id="lessons" className="py-20 px-6 bg-gray-900">
                <div className="container mx-auto text-center" data-aos="zoom-in">
                    <h2 className="text-4xl font-bold mb-12">Interactive Lessons</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="bg-black/60 p-6 rounded-lg hover:scale-105 transition">
                            <h3 className="text-2xl font-bold mb-4">12-Bar Blues</h3>
                            <p className="text-gray-400">Learn the foundation of every blues song with the classic 12-bar structure.</p>
                        </div>
                        <div className="bg-black/60 p-6 rounded-lg hover:scale-105 transition">
                            <h3 className="text-2xl font-bold mb-4">Blues Soloing</h3>
                            <p className="text-gray-400">Master the pentatonic scale and start improvising like a pro.</p>
                        </div>
                        <div className="bg-black/60 p-6 rounded-lg hover:scale-105 transition">
                            <h3 className="text-2xl font-bold mb-4">Slide Guitar</h3>
                            <p className="text-gray-400">Discover expressive slide guitar techniques used by blues legends.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black py-12 border-t border-gray-800">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="font-bold mb-4">Blues Guitar Academy</h4>
                        <p className="text-gray-400">Your path to mastering the blues guitar, step by step.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Explore</h4>
                        <ul className="space-y-2">
                            <li><a href="#chords" className="text-gray-400 hover:text-white">Chords</a></li>
                            <li><a href="#rhythm" className="text-gray-400 hover:text-white">Rhythm</a></li>
                            <li><a href="#lessons" className="text-gray-400 hover:text-white">Lessons</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Resources</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Chord Charts</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Backing Tracks</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Scale Finder</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Metronome</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white"><i data-feather="facebook"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white"><i data-feather="instagram"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white"><i data-feather="youtube"></i></a>
                            <a href="#" className="text-gray-400 hover:text-white"><i data-feather="twitter"></i></a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
                    <p>&copy; 2023 Blues Guitar Academy. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default  LearnPage;