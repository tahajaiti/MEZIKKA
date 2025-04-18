import * as Tone from "tone";
import { useEffect } from "react";
import Pads from "../components/Tracks/Pads";
import useTrackStore from "../stores/useTrackStore";
import CustomSoundControls from "../components/Tracks/CustomSoundControls";
import RecordingControls from "../components/Tracks/RecordingControls";
import SaveBeatForm from "../components/Tracks/SaveBeatForm";
import SongInfo from "../components/Tracks/SongInfo";
import { matserGain, recordGain } from "../util/CustomGain";

const CreateSongPage: React.FC = () => {
  const { drums, saveFormOpen, startStopSequencer } = useTrackStore();

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        useTrackStore.setState({ saveFormOpen: false });
      }
      if (e.key === " ") {
        startStopSequencer();
      }
    };

    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [startStopSequencer]);

  useEffect(() => {
    const sampler = new Tone.Sampler({
      urls: drums.reduce((acc, drum) => {
        acc[drum.note] = drum.soundUrl;
        return acc;
      }, {} as Record<string, string>),
    });
    sampler.connect(matserGain);
    sampler.connect(recordGain);

    const sequence = new Tone.Sequence(
      (time, step) => {
        const state = useTrackStore.getState();
        const activePads = state.drums.filter(
          (drum) => !state.mutedPads.has(drum.id) && state.sequences[drum.id][step]
        );
        activePads.forEach((pad) => {
          const velocity = (pad.volume + 20) / 25;
          sampler.triggerAttackRelease(pad.note, "16n", time, velocity);
        });
        state.setCurrentStep(step);
      },
      Array.from({ length: 16 }, (_, i) => i),
      "16n"
    );

    sequence.start(0);

    return () => {
      sampler.dispose();
      sequence.dispose();
    };
  }, [drums]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-6 lg:p-8">
      <div className="space-y-6">
        <div className="px-4">
          <SongInfo />
        </div>
        <div className="w-full grid md:grid-cols-2 grid-rows-1 gap-4 p-4">
          <RecordingControls />
          <CustomSoundControls />
        </div>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold">Drum Tracks</h2>
            <div className="h-px flex-1 bg-zinc-800"></div>
          </div>

          <div className="grid grid-cols-2 gap-4 h-fit overflow-auto">
            {drums.map((d) => (
              <Pads
                key={Number(d.id)}
                id={Number(d.id)}
                name={d.name || `Track ${d.id}`}
              />
            ))}
          </div>
        </section>

        {saveFormOpen && <SaveBeatForm />}
      </div>
    </div>
  );
};

export default CreateSongPage;