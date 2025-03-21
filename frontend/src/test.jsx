import React, { useState, useRef, useEffect } from 'react';
import * as Tone from 'tone';

const AudioRemixer = () => {
    const [audioFile, setAudioFile] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [volume, setVolume] = useState(0);
    const [tempo, setTempo] = useState(1);
    const [filter, setFilter] = useState(20000);
    const [reverb, setReverb] = useState(0);
    const [delay, setDelayAmount] = useState(0);
    const [eqLow, setEqLow] = useState(0);
    const [eqMid, setEqMid] = useState(0);
    const [eqHigh, setEqHigh] = useState(0);
    const [pitchShift, setPitchShift] = useState(0);

    // References to audio elements
    const playerRef = useRef(null);
    const volumeNodeRef = useRef(null);
    const filterNodeRef = useRef(null);
    const reverbNodeRef = useRef(null);
    const delayNodeRef = useRef(null);
    const eqLowRef = useRef(null);
    const eqMidRef = useRef(null);
    const eqHighRef = useRef(null);
    const pitchShiftRef = useRef(null);

    // Initialize Tone.js when component mounts
    useEffect(() => {
        // Create audio processing chain
        volumeNodeRef.current = new Tone.Volume(volume);
        filterNodeRef.current = new Tone.Filter(filter, "lowpass");
        reverbNodeRef.current = new Tone.Reverb(1);
        reverbNodeRef.current.wet.value = reverb;
        delayNodeRef.current = new Tone.FeedbackDelay("8n", 0.5);
        delayNodeRef.current.wet.value = delay;

        // EQ
        eqLowRef.current = new Tone.EQ3(eqLow, eqMid, eqHigh);

        // Pitch shifting
        pitchShiftRef.current = new Tone.PitchShift();
        pitchShiftRef.current.pitch = pitchShift;

        // Connect all nodes
        Tone.Destination.chain(
            volumeNodeRef.current,
            filterNodeRef.current,
            eqLowRef.current,
            pitchShiftRef.current,
            reverbNodeRef.current,
            delayNodeRef.current
        );

        return () => {
            // Clean up
            if (playerRef.current) {
                playerRef.current.stop();
                playerRef.current.dispose();
            }
            volumeNodeRef.current.dispose();
            filterNodeRef.current.dispose();
            reverbNodeRef.current.dispose();
            delayNodeRef.current.dispose();
            eqLowRef.current.dispose();
            pitchShiftRef.current.dispose();
        };
    }, []);

    // Handle file upload
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setAudioFile(file);
        setIsLoaded(false);

        if (playerRef.current) {
            playerRef.current.stop();
            playerRef.current.dispose();
        }

        // Create a URL for the audio file
        const fileUrl = URL.createObjectURL(file);

        // Create a new player
        playerRef.current = new Tone.Player({
            url: fileUrl,
            onload: () => {
                setIsLoaded(true);
                playerRef.current.connect(volumeNodeRef.current);
            }
        }).toDestination();
    };

    // Play/pause functionality
    const togglePlayback = async () => {
        if (!isLoaded) return;

        await Tone.start();

        if (isPlaying) {
            playerRef.current.stop();
        } else {
            playerRef.current.start();
        }

        setIsPlaying(!isPlaying);
    };

    // Update audio parameters
    useEffect(() => {
        if (volumeNodeRef.current) volumeNodeRef.current.volume.value = volume;
    }, [volume]);

    useEffect(() => {
        if (filterNodeRef.current) filterNodeRef.current.frequency.value = filter;
    }, [filter]);

    useEffect(() => {
        if (reverbNodeRef.current) reverbNodeRef.current.wet.value = reverb;
    }, [reverb]);

    useEffect(() => {
        if (delayNodeRef.current) delayNodeRef.current.wet.value = delay;
    }, [delay]);

    useEffect(() => {
        if (eqLowRef.current) eqLowRef.current.low.value = eqLow;
    }, [eqLow]);

    useEffect(() => {
        if (eqMidRef.current) eqMidRef.current.mid.value = eqMid;
    }, [eqMid]);

    useEffect(() => {
        if (eqHighRef.current) eqHighRef.current.high.value = eqHigh;
    }, [eqHigh]);

    useEffect(() => {
        if (pitchShiftRef.current) pitchShiftRef.current.pitch = pitchShift;
    }, [pitchShift]);

    useEffect(() => {
        if (playerRef.current && isLoaded) {
            playerRef.current.playbackRate = tempo;
        }
    }, [tempo, isLoaded]);

    return (
        <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Audio Remixer</h1>

            {/* File Upload */}
            <div className="w-full max-w-2xl mb-8 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Upload Audio</h2>
                <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="w-full p-2 border rounded"
                />
            </div>

            {/* Transport controls */}
            <div className="w-full max-w-2xl mb-8 p-4 bg-white rounded-lg shadow-md">
                <button
                    onClick={togglePlayback}
                    disabled={!isLoaded}
                    className={`px-6 py-2 rounded-lg ${isLoaded ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}`}
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">Tempo</label>
                    <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.01"
                        value={tempo}
                        onChange={(e) => setTempo(parseFloat(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between">
                        <span>0.5x</span>
                        <span>{tempo.toFixed(2)}x</span>
                        <span>2x</span>
                    </div>
                </div>
            </div>

            {/* Effects Controls */}
            <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Volume */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2">Volume</h3>
                    <input
                        type="range"
                        min="-60"
                        max="0"
                        step="1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between">
                        <span>-60 dB</span>
                        <span>{volume} dB</span>
                        <span>0 dB</span>
                    </div>
                </div>

                {/* Filter */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2">Filter</h3>
                    <input
                        type="range"
                        min="20"
                        max="20000"
                        step="1"
                        value={filter}
                        onChange={(e) => setFilter(parseFloat(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between">
                        <span>20 Hz</span>
                        <span>{filter} Hz</span>
                        <span>20k Hz</span>
                    </div>
                </div>

                {/* Reverb */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2">Reverb</h3>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={reverb}
                        onChange={(e) => setReverb(parseFloat(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between">
                        <span>0%</span>
                        <span>{Math.round(reverb * 100)}%</span>
                        <span>100%</span>
                    </div>
                </div>

                {/* Delay */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2">Delay</h3>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={delay}
                        onChange={(e) => setDelayAmount(parseFloat(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between">
                        <span>0%</span>
                        <span>{Math.round(delay * 100)}%</span>
                        <span>100%</span>
                    </div>
                </div>

                {/* EQ Low */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2">EQ Low</h3>
                    <input
                        type="range"
                        min="-12"
                        max="12"
                        step="0.1"
                        value={eqLow}
                        onChange={(e) => setEqLow(parseFloat(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between">
                        <span>-12 dB</span>
                        <span>{eqLow.toFixed(1)} dB</span>
                        <span>+12 dB</span>
                    </div>
                </div>

                {/* EQ Mid */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2">EQ Mid</h3>
                    <input
                        type="range"
                        min="-12"
                        max="12"
                        step="0.1"
                        value={eqMid}
                        onChange={(e) => setEqMid(parseFloat(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between">
                        <span>-12 dB</span>
                        <span>{eqMid.toFixed(1)} dB</span>
                        <span>+12 dB</span>
                    </div>
                </div>

                {/* EQ High */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2">EQ High</h3>
                    <input
                        type="range"
                        min="-12"
                        max="12"
                        step="0.1"
                        value={eqHigh}
                        onChange={(e) => setEqHigh(parseFloat(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between">
                        <span>-12 dB</span>
                        <span>{eqHigh.toFixed(1)} dB</span>
                        <span>+12 dB</span>
                    </div>
                </div>

                {/* Pitch Shift */}
                <div className="p-4 bg-white rounded-lg shadow-md">
                    <h3 className="font-semibold mb-2">Pitch Shift</h3>
                    <input
                        type="range"
                        min="-12"
                        max="12"
                        step="1"
                        value={pitchShift}
                        onChange={(e) => setPitchShift(parseInt(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between">
                        <span>-12</span>
                        <span>{pitchShift} semitones</span>
                        <span>+12</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioRemixer;