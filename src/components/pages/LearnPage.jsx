import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import feather from "feather-icons";
import AudioPlayer from "../AudioPlayer";
import E7 from "../chords/Video Project.m4a"
import A7 from "../chords/a7.m4a"
import B7 from "../chords/b7.m4a"
import { Footer } from "../Footer";


export default function BluesMaster() {
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 800, easing: "ease-in-out", once: true });
        // Replace feather icons after first render and whenever mobile toggles
        feather.replace();
    }, []);

    useEffect(() => {
        // Re-run feather.replace whenever mobile menu changes (to ensure icons render)
        feather.replace();
    }, [mobileOpen]);

    return (
        <div className="text-white font-poppins bg-gradient-to-br from-[#1a1a2e] to-[#16213e] min-h-screen">


            {/* Hero Section */}
            <header className="min-h-screen flex flex-col justify-center items-center text-center px-6 hero-gradient relative">
                <div className="container mx-auto max-w-4xl py-24" data-aos="fade-up">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Master the <span className="text-blue-300">Blues Guitar</span>
                    </h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
                        Learn classic 12-bar blues, essential chords, rhythm patterns, and improvisation with interactive lessons designed by professional musicians.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="#lessons" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-full transition transform hover:scale-105 shadow-lg">
                            Start Learning Now
                        </a>
                        <a href="#chords" className="border-2 border-white hover:border-blue-400 text-white font-bold px-8 py-4 rounded-full transition transform hover:scale-105">
                            Explore Chords
                        </a>
                    </div>
                </div>

                <div className="absolute bottom-10 animate-bounce">
                    <a href="#chords" className="text-white">
                        <i data-feather="chevron-down" className="w-10 h-10"></i>
                    </a>
                </div>
            </header>

            {/* Chords Section */}
            <section id="chords" className="py-20 px-6 bg-gray-900">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-right">Essential Blues Chords</h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto" data-aos="fade-left">
                        These three chords form the foundation of the 12-bar blues progression
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        <div className="chord-diagram" data-aos="zoom-in">
                            <p className="chord-name">E7</p>
                            <img src="https://nationalguitaracademy.com/wp-content/uploads/2015/09/How-To-Play-The-E-Chord-On-Guitar-E7.jpg" alt="E7 chord diagram" className="w-full h-auto rounded-lg shadow-xl" />

                            <div className="mt-6 audio-player">
                                <AudioPlayer src={E7}/>
                            </div>

                            <p className="mt-4 text-gray-300">The dominant 7th chord that gives blues its signature sound</p>
                        </div>

                        <div className="chord-diagram" data-aos="zoom-in" data-aos-delay="100">
                            <p className="chord-name">A7</p>
                            <img src="https://nationalguitaracademy.com/wp-content/uploads/2015/08/Guitar-Chords-For-Beginners-A7.jpg" alt="A7 chord diagram" className="w-full h-auto rounded-lg shadow-xl" />

                            <div className="mt-6 audio-player">

                                    <AudioPlayer src={A7}/>

                            </div>

                            <p className="mt-4 text-gray-300">A movable shape that works in many blues progressions</p>
                        </div>

                        <div className="chord-diagram" data-aos="zoom-in" data-aos-delay="200">
                            <p className="chord-name">B7</p>
                            <img src="https://nationalguitaracademy.com/wp-content/uploads/2015/09/Guitar-Chords-For-Beginners-B7.jpg" alt="B7 chord diagram" className="w-full h-auto rounded-lg shadow-xl" />

                            <div className="mt-6 audio-player">

                                    <AudioPlayer src={B7}/>


                            </div>

                            <p className="mt-4 text-gray-300">Adds tension and resolution to your blues playing</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rhythm Section */}
            <section id="rhythm" className="py-20 px-6 bg-black">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" data-aos="fade-left">Rhythm Patterns</h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto" data-aos="fade-right">
                        Master these essential blues rhythms to develop your groove
                    </p>

                    <div className="max-w-4xl mx-auto bg-gray-900/50 p-8 rounded-2xl" data-aos="fade-up">
                        <h3 className="text-2xl font-bold mb-6 text-blue-400">Classic Shuffle Rhythm</h3>
                        <div className="rhythm-pattern flex justify-center mb-8">
                            <div className="beat downstroke">D</div>
                            <div className="beat muted">X</div>
                            <div className="beat upstroke">U</div>
                            <div className="beat downstroke">D</div>
                            <div className="beat slide">⇢</div>
                        </div>

                        <p className="text-gray-400 mb-8">
                            Practice this pattern with a metronome at 60 BPM, gradually increasing speed as you gain confidence.
                        </p>

                        <div className="flex justify-center">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-full transition flex items-center">
                                <i data-feather="play" className="mr-2"></i> Play Along
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lessons Section */}
            <section id="lessons" className="py-20 px-6 bg-gray-900">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" data-aos="zoom-in">Interactive Lessons</h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto" data-aos="zoom-in" data-aos-delay="100">
                        Structured learning paths to take you from beginner to advanced
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="lesson-card p-8" data-aos="fade-up" data-aos-delay="0">
                            <div className="text-blue-400 mb-4">
                                <i data-feather="layers" className="w-12 h-12"></i>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">12-Bar Blues</h3>
                            <p className="text-gray-400 mb-6">
                                Learn the foundation of every blues song with the classic I-IV-V 12-bar structure and variations.
                            </p>
                            <a href="#" className="text-blue-400 hover:text-blue-300 font-medium flex items-center justify-center">
                                Start Lesson <i data-feather="arrow-right" className="ml-2 w-4 h-4"></i>
                            </a>
                        </div>

                        <div className="lesson-card p-8" data-aos="fade-up" data-aos-delay="100">
                            <div className="text-blue-400 mb-4">
                                <i data-feather="activity" className="w-12 h-12"></i>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Blues Soloing</h3>
                            <p className="text-gray-400 mb-6">
                                Master the pentatonic and blues scales, licks, and phrasing to start improvising like a pro.
                            </p>
                            <a href="#" className="text-blue-400 hover:text-blue-300 font-medium flex items-center justify-center">
                                Start Lesson <i data-feather="arrow-right" className="ml-2 w-4 h-4"></i>
                            </a>
                        </div>

                        <div className="lesson-card p-8" data-aos="fade-up" data-aos-delay="200">
                            <div className="text-blue-400 mb-4">
                                <i data-feather="sliders" className="w-12 h-12"></i>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Slide Guitar</h3>
                            <p className="text-gray-400 mb-6">
                                Discover expressive slide guitar techniques used by blues legends from Delta to Chicago styles.
                            </p>
                            <a href="#" className="text-blue-400 hover:text-blue-300 font-medium flex items-center justify-center">
                                Start Lesson <i data-feather="arrow-right" className="ml-2 w-4 h-4"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

           <Footer/>
        </div>
    );
}
