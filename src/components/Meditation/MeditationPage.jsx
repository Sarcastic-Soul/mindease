"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Wind } from 'lucide-react';

// --- Animated Background Component ---
const AnimatedBackground = ({ themeGradient }) => (
    <div className={`absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-br ${themeGradient}`}>
        <motion.div
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/40 rounded-full filter blur-3xl opacity-60"
            animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute -top-20 -right-20 w-80 h-80 bg-white/40 rounded-full filter blur-3xl opacity-60"
            animate={{ x: [20, -20, 20], y: [20, -20, 20] }}
            transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
        />
    </div>
);

// --- Theme and Music Configuration ---
const themes = {
    forest: {
        primary: 'text-emerald-600', bg: 'bg-emerald-600', gradient: 'from-emerald-50 to-green-100', ring: 'stroke-emerald-500',
        music: '/MeditationMusic/emerald.mp3'
    },
    ocean: {
        primary: 'text-orange-600', bg: 'bg-orange-600', gradient: 'from-orange-50 to-blue-100', ring: 'stroke-orange-500',
        music: '/MeditationMusic/orange.mp3',
    },
    dusk: {
        primary: 'text-rose-600', bg: 'bg-rose-600', gradient: 'from-rose-50 to-red-100', ring: 'stroke-rose-500',
        music: '/MeditationMusic/rose.mp3',
    },
    cosmos: {
        primary: 'text-indigo-600', bg: 'bg-indigo-600', gradient: 'from-indigo-50 to-purple-100', ring: 'stroke-indigo-500',
        music: '/MeditationMusic/indigo.mp3',
    },
};

// --- Main Component ---
export default function MeditationPage() {
    const [timer, setTimer] = useState(300);
    const [isMeditating, setIsMeditating] = useState(false);
    const [initialTime, setInitialTime] = useState(300);
    const [theme, setTheme] = useState('forest');
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [timeInput, setTimeInput] = useState("5:00");

    // --- Restored from your original code ---
    const [isAudioReady, setIsAudioReady] = useState(false);
    const audioRef = useRef(null);

    // --- YOUR PROVEN AUDIO LOGIC (RE-IMPLEMENTED) ---

    // 1. On component mount, set up the readiness listener
    useEffect(() => {
        if (audioRef.current) {
            const handleAudioReady = () => setIsAudioReady(true);
            audioRef.current.addEventListener('canplaythrough', handleAudioReady);

            // Set initial audio source
            audioRef.current.src = themes[theme].music;

            return () => {
                if (audioRef.current) {
                    audioRef.current.removeEventListener('canplaythrough', handleAudioReady);
                }
            };
        }
    }, []); // Empty dependency array ensures this runs only once.

    // 2. Manage playback state
    useEffect(() => {
        if (isMeditating && isAudioReady) {
            audioRef.current.play().catch(e => console.error("Error playing audio:", e));
        } else if (!isMeditating) {
            audioRef.current.pause();
        }
    }, [isMeditating, isAudioReady]);

    // 3. Manage volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [volume, isMuted]);

    // 4. Timer countdown logic
    useEffect(() => {
        if (isMeditating && timer > 0) {
            const countdown = setInterval(() => setTimer(prev => prev - 1), 1000);
            return () => clearInterval(countdown);
        }
        if (timer === 0 && isMeditating) {
            setIsMeditating(false);
        }
    }, [timer, isMeditating]);

    // --- CONTROL FUNCTIONS ---

    const startMeditation = () => {
        if (timer > 0) {
            setInitialTime(timer);
            setIsMeditating(true);
        }
    };

    const stopMeditation = () => setIsMeditating(false);

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        if (audioRef.current) {
            setIsAudioReady(false); // Critical step: Reset readiness for new source
            audioRef.current.src = themes[newTheme].music;
            audioRef.current.load();
        }
    };

    const handleTimeInput = (e) => {
        const value = e.target.value;
        setTimeInput(value);
        if (value.includes(':')) {
            const [minutes, seconds] = value.split(':').map(Number);
            setTimer((minutes || 0) * 60 + (seconds || 0));
        } else {
            setTimer(Number(value) * 60);
        }
    };

    // --- RENDER LOGIC ---
    const progress = initialTime > 0 ? (timer / initialTime) : 0;
    const circleCircumference = 2 * Math.PI * 120;

    return (
        <div className="w-full min-h-full flex items-center justify-center p-4 relative overflow-hidden">
            <AnimatedBackground themeGradient={themes[theme].gradient} />
            <audio ref={audioRef} loop preload="auto" />

            <motion.div layout className="w-full max-w-sm bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg p-6 text-center z-10">
                <motion.div layout="position" className="mb-4">
                    <h1 className={`text-2xl font-bold ${themes[theme].primary}`}>Meditation Space</h1>
                    <p className="text-gray-600 text-sm">Find your inner peace.</p>
                </motion.div>

                <div className="relative w-64 h-64 mx-auto mb-4 flex items-center justify-center">
                    <AnimatePresence>
                        {isMeditating ? (
                            <motion.div key="timer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0">
                                <svg className="w-full h-full" viewBox="0 0 260 260"><circle cx="130" cy="130" r="120" strokeWidth="6" className="stroke-gray-200/70" fill="none" /><motion.circle cx="130" cy="130" r="120" strokeWidth="8" className={themes[theme].ring} fill="none" strokeLinecap="round" strokeDasharray={circleCircumference} animate={{ strokeDashoffset: circleCircumference * (1 - progress) }} transition={{ duration: 1, ease: "linear" }} /></svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className={`text-5xl font-bold tabular-nums ${themes[theme].primary}`}>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
                                    <motion.div animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="text-gray-500 text-xs mt-1 flex items-center gap-1"><Wind size={12}/> Breathe...</motion.div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div key="setter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <input type="text" value={timeInput} onFocus={(e) => e.target.select()} onChange={handleTimeInput} className={`text-6xl font-bold w-48 text-center bg-transparent border-none focus:outline-none focus:ring-0 tabular-nums ${themes[theme].primary}`} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <motion.button layout onClick={isMeditating ? stopMeditation : startMeditation} className={`w-16 h-16 rounded-full text-white shadow-lg flex items-center justify-center mx-auto transition-colors ${themes[theme].bg}`} >
                    {isMeditating ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                </motion.button>

                <motion.div layout className="mt-6">
                    <div className="flex justify-center gap-3 mb-4">
                        {Object.keys(themes).map(key => (<button key={key} onClick={() => handleThemeChange(key)} className={`w-7 h-7 rounded-full transition-all ${themes[key].bg} ${theme === key ? 'ring-2 ring-offset-2 ring-current' : 'opacity-50 hover:opacity-100'}`} style={{ color: themes[key].primary.replace('text-', '') }} />))}
                    </div>

                    <div className="flex items-center justify-center gap-3">
                        <button onClick={() => setIsMuted(!isMuted)}>{isMuted ? <VolumeX className="text-gray-500"/> : <Volume2 className="text-gray-500"/>}</button>
                        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} disabled={isMuted} className="w-28 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer thumb-styling" style={{ '--thumb-color': themes[theme].primary.includes('emerald') ? '#10b981' : themes[theme].primary.includes('sky') ? '#0ea5e9' : themes[theme].primary.includes('rose') ? '#e11d48' : '#6366f1' }} />
                    </div>
                </motion.div>
            </motion.div>

            <style jsx global>{`
                .thumb-styling::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 16px; height: 16px; background-color: var(--thumb-color); border-radius: 50%; cursor: pointer; }
                .thumb-styling::-moz-range-thumb { width: 16px; height: 16px; background-color: var(--thumb-color); border-radius: 50%; cursor: pointer; }
            `}</style>
        </div>
    );
}
