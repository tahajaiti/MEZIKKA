import { create } from 'zustand';
import * as Tone from 'tone';
import { recordGain } from '../util/CustomGain';
import * as lamejs from '@breezystack/lamejs';

interface RecordState {
    isRecording: boolean;
    recorder: Tone.Recorder | null;
    soundFile: File | null;
    startRecording: () => Promise<void>;
    stopRecordingAndExport: () => Promise<File | null>;
}

const useRecordStore = create<RecordState>((set, get) => ({
    isRecording: false,
    recorder: null,
    soundFile: null,

    startRecording: async () => {
        await Tone.start();
        const recorder = new Tone.Recorder();
        recordGain.connect(recorder);
        await recorder.start();
        set({ recorder, isRecording: true });
    },

    stopRecordingAndExport: async () => {
        const { recorder } = get();
        if (!recorder) return null;

        try {
            const webmBlob = await recorder.stop();
            const mp3Blob = await convertToMp3(webmBlob);

            const fileName = `recording-${Date.now()}.mp3`;
            const mp3File = new File([mp3Blob], fileName, { type: 'audio/mp3' });

            set({ soundFile: mp3File, isRecording: false, recorder: null });
            recorder.dispose();
            return mp3File;
        } catch (error) {
            console.error('Recording error:', error);
            set({ isRecording: false, recorder: null });
            return null;
        }
    },
}));



const convertToMp3 = async (blob: Blob) => {
    const audioContext = new AudioContext();
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const channelData = audioBuffer.getChannelData(0);
    const samples = convertFloat32ToInt16(channelData);

    // channels(1 mono, 2 stereo)
    // sampleRate we use the audio samplerate but the default is (44100)
    // kbps = 128
    const mp3Encoder = new lamejs.Mp3Encoder(1, audioBuffer.sampleRate, 128);
    const mp3Data = [];

    const sampleBlockSize = 1152;
    for (let i = 0; i < samples.length; i += sampleBlockSize) {
        const sampleChunk = samples.subarray(i, i + sampleBlockSize);
        const mp3buf = mp3Encoder.encodeBuffer(sampleChunk);
        if (mp3buf.length > 0) {
            mp3Data.push(mp3buf);
        }
    }

    const finalBuf = mp3Encoder.flush();
    if (finalBuf.length > 0) {
        mp3Data.push(finalBuf);
    }

    return new Blob(mp3Data, { type: 'audio/mp3' });
};

const convertFloat32ToInt16 = (buffer: Float32Array) => {
    const int16array = new Int16Array(buffer.length);
    
    for (let i = 0; i < buffer.length; i++) {
        // the values are between -32768 and 32767
        // we need to convert them to -1 and 1
        // and then multiply by 32767 which is the max value for int16
        const sample = Math.max(-1, Math.min(1, buffer[i]));
        
        int16array[i] = Math.round(sample * 32767);
    }
    
    return int16array;
}


export default useRecordStore;