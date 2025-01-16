"use client"
import { useState, useEffect, useRef } from 'react';
import { VolumeUpIcon, VolumeOffIcon, PlayIcon, PauseIcon } from '@heroicons/react/solid'; // Import HeroIcons

export default function Meditation() {
    const [timer, setTimer] = useState(0);
    const [isMeditating, setIsMeditating] = useState(false);
    const [initialTime, setInitialTime] = useState(0);
    const [theme, setTheme] = useState('rose'); // Set default theme to 'rose'
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5); // Default volume is 50%
    const [isAudioReady, setIsAudioReady] = useState(false); // To check if audio is ready

    const audioRef = useRef(null);

    useEffect(() => {
        // Set the audio source based on the default 'rose' theme
        if (audioRef.current) {
            audioRef.current.src = themeMusic['rose']; // Default audio for 'rose' theme
        }
    }, []); // Empty dependency array to run only once when the component mounts

    useEffect(() => {
        if (isMeditating && timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else if (timer === 0 && isMeditating) {
            setIsMeditating(false);
        }
    }, [timer, isMeditating]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
            if (isMeditating && !audioRef.current.paused && isAudioReady) {
                audioRef.current.play();
            }
        }
    }, [isMuted, volume, isMeditating, isAudioReady]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('canplaythrough', () => {
                setIsAudioReady(true); // Audio is ready to play
            });

            // Cleanup the event listener when the component is unmounted
            return () => {
                if (audioRef.current) {
                    audioRef.current.removeEventListener('canplaythrough', () => { });
                }
            };
        }
    }, []);

    const startMeditation = () => {
        if (timer > 0) {
            setInitialTime(timer);
            setIsMeditating(true);
            // Trigger audio play when meditation starts
            if (audioRef.current && isAudioReady) {
                audioRef.current.play(); // Play the music when meditation starts
            }
        }
    };

    const stopMeditation = () => {
        setTimer(0);
        setIsMeditating(false);
        // Pause the audio when meditation stops
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const changeTimer = (amount) => {
        setTimer((prev) => Math.max(0, prev + amount));
    };

    const progress = timer > 0 ? (timer / initialTime) * 100 : 0;
    const circleRadius = 60;
    const circleCircumference = 2 * Math.PI * circleRadius;

    const handleThemeChange = (color) => {
        setTheme(color);
        // Stop current audio and change the source
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Reset to start
        }
        // Set new theme music
        audioRef.current.src = themeMusic[color];
        setIsAudioReady(false); // Reset audio readiness state
        if (isMeditating) {
            audioRef.current.play(); // Play the new theme music if meditation is active
        }
    };

    const themeMusic = {
        rose: '/MeditationMusic/rose.mp3',
        orange: '/MeditationMusic/orange.mp3',
        teal: '/MeditationMusic/teal.mp3',
        cyan: '/MeditationMusic/cyan.mp3'
    };

    // Theme colors for text, circular ring, and background gradient
    const themeColors = {
        rose: '#BE123C',
        orange: '#EA580C',
        teal: '#0D9488',
        cyan: '#0E7490'
    };

    const themeGradients = {
        rose: 'linear-gradient(to bottom, #FFE4E6, #FEB2B2)',
        orange: 'linear-gradient(to bottom, #FFEDD5, #FDBA74)',
        teal: 'linear-gradient(to bottom, #CCFBF1, #5EEAD4)',
        cyan: 'linear-gradient(to bottom, #CFFAFE, #22D3EE)'
    };

    return (
        <div
            className="relative min-h-screen p-8 flex items-center justify-center transition-all duration-500"
            style={{ background: themeGradients[theme] }}
        >
            <div className="relative bg-white shadow-xl rounded-lg p-10 transition-all duration-500 w-full max-w-lg">
                <h1 style={{ color: themeColors[theme] }} className="text-4xl font-bold text-center mb-6">
                    Meditation Timer
                </h1>
                <p className="text-center text-gray-600 mb-10 text-lg">
                    Set a duration for your meditation session and start relaxing.
                </p>

                {!isMeditating ? (
                    <div className="text-center flex flex-col items-center">
                        <div className="flex items-center space-x-6 mb-8">
                            <button
                                onClick={() => changeTimer(-300)}
                                style={{ backgroundColor: themeColors[theme] }}
                                className="text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl hover:opacity-90 transform hover:scale-105"
                            >
                                -
                            </button>
                            <span style={{ color: themeColors[theme] }} className="text-5xl font-semibold">
                                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                            </span>
                            <button
                                onClick={() => changeTimer(300)}
                                style={{ backgroundColor: themeColors[theme] }}
                                className="text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl hover:opacity-90 transform hover:scale-105"
                            >
                                +
                            </button>
                        </div>
                        <button
                            onClick={startMeditation}
                            style={{ backgroundColor: themeColors[theme] }}
                            className="mt-6 text-white rounded-md px-6 py-2 text-lg hover:opacity-90 transition-transform duration-500 transform hover:scale-105"
                        >
                            <PlayIcon className="w-11 h-11" />
                        </button>
                    </div>
                ) : (
                    <div className="relative flex flex-col items-center transition-opacity duration-500 opacity-100">
                        <svg
                            className={`w-80 h-80 mb-6`}
                            viewBox="0 0 150 150"
                        >
                            <circle
                                cx="75"
                                cy="75"
                                r={circleRadius}
                                stroke="rgba(0, 0, 0, 0.1)"
                                strokeWidth="12"
                                fill="none"
                            />
                            <circle
                                cx="75"
                                cy="75"
                                r={circleRadius}
                                stroke={themeColors[theme]}
                                strokeWidth="12"
                                fill="none"
                                strokeDasharray={circleCircumference}
                                strokeDashoffset={(1 - progress / 100) * circleCircumference}
                                strokeLinecap="round"
                                className="transition-all duration-1000"
                            />
                        </svg>
                        <div style={{ color: themeColors[theme] }} className="absolute text-6xl font-semibold top-32">
                            {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                        </div>
                        <button
                            onClick={stopMeditation}
                            className="mt-6 bg-red-500 text-white rounded-md px-6 py-2 text-lg hover:bg-red-600 transition-transform duration-500 transform hover:scale-105"
                        >
                            <PauseIcon className="w-11 h-11" />
                        </button>
                    </div>
                )}
            </div>

            {/* Theme Buttons on Right Edge */}
            <div className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col space-y-4">
                <button onClick={() => handleThemeChange('rose')} className="w-12 h-12 rounded-full shadow-xl border border-rose-600 bg-rose-500 transition-transform transform hover:scale-110" />
                <button onClick={() => handleThemeChange('orange')} className="w-12 h-12 rounded-full shadow-xl border border-orange-600 bg-orange-500 transition-transform transform hover:scale-110" />
                <button onClick={() => handleThemeChange('teal')} className="w-12 h-12 rounded-full shadow-xl border border-teal-600 bg-teal-500 transition-transform transform hover:scale-110" />
                <button onClick={() => handleThemeChange('cyan')} className="w-12 h-12 rounded-full shadow-xl border border-cyan-600 bg-cyan-500 transition-transform transform hover:scale-110" />
            </div>

            <audio ref={audioRef} preload="auto" loop />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700"
                >
                    {isMuted ? (
                        <VolumeOffIcon className="w-6 h-6" />
                    ) : (
                        <VolumeUpIcon className="w-6 h-6" />
                    )}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-32"
                    disabled={isMuted}
                />
            </div>
        </div>
    );
}
