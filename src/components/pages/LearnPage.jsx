import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import feather from "feather-icons";
import './../../App.css'
import AudioPlayer from "../AudioPlayer";
import E7 from "../chords/Video Project.m4a"
import A7 from "../chords/a7.m4a"
import B7 from "../chords/b7.m4a"


const LearnPage = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
        feather.replace();
    }, []);

    return (
        <div className="min-h-screen  text-white font-sans overflow-x-hidden">



            {/* Hero */}
            <header className="h-screen flex flex-col justify-center items-center text-center px-6">
                <h1
                    className="text-5xl md:text-7xl font-bold mb-6 text-black"
                    data-aos="fade-up"
                >
                    Master the <span className="text-blue-400">Blues Guitar</span>
                </h1>
                <p className="text-lg text-gray-800 max-w-2xl mb-8" data-aos="fade-up">
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                        <div className="chord-diagram" data-aos="zoom-in">
                            <p className="chord-name">E7</p>
                            <img
                                src='https://nationalguitaracademy.com/wp-content/uploads/2015/09/How-To-Play-The-E-Chord-On-Guitar-E7.jpg'
                                alt='a7'/>
                           <div className='mt-20'>
                               <AudioPlayer src={E7}/>
                           </div>
                        </div>


                        <div className="chord-diagram" data-aos="zoom-in">
                            <p className="chord-name">A7</p>
                            <img
                                src='https://nationalguitaracademy.com/wp-content/uploads/2015/08/Guitar-Chords-For-Beginners-A7.jpg'
                                alt='a7'/>
                            <div className='mt-16'>
                                <AudioPlayer src={A7}/>
                            </div>
                        </div>

                        <div className="chord-diagram" data-aos="zoom-in">
                            <p className="chord-name">B7</p>
                            <img
                                src='https://nationalguitaracademy.com/wp-content/uploads/2015/09/Guitar-Chords-For-Beginners-B7.jpg'
                                alt='a7'/>
                            <div className='mt-20'>
                                <AudioPlayer src={B7}/>
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

        </div>
    );
}

export default  LearnPage;