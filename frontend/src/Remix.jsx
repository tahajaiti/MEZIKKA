import React from "react";
import * as Tone from "tone";

const Remix = () => {
    const [audioFile, setAudioFile] = React.useState(null);
    const [player, setPlayer] = React.useState(null);

    const handleAudioUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setAudioFile(file);

        const url = URL.createObjectURL(file);

        const play = new Tone.Player(url).toDestination();
        setPlayer(play);
    }

    const playAudio = async () => {
        if (player){
            await Tone.start();
            player.start();
        }
    }

    return (
        <>
            <div className="w-full max-w-2xl mb-8 p-4 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Upload Audio</h2>
                <input type="file" accept="audio/*" onChange={handleAudioUpload} className="w-full p-2 border rounded" />
            </div>

            <button onClick={playAudio}>PLay</button>
        </>
    );
};

export default Remix;
