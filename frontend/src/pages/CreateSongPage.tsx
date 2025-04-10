import Pads from "../components/Tracks/Pads"
import useTrackStore from "../stores/useTrackStore"
import CustomSoundControls from "../components/Tracks/CustomSoundControls"
import RecordingControls from "../components/Tracks/RecordingControls"
import SaveBeatForm from "../components/Tracks/SaveBeatForm"
import SongInfo from "../components/Tracks/SongInfo"
import { useEffect } from "react"
// import DrumsHeader from "../components/Tracks/DrumsHeader"

const CreateSongPage: React.FC = () => {
  const { drums, saveFormOpen, startStopSequencer} = useTrackStore();

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
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-6 lg:p-8 ">


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
                soundUrl={d.soundUrl || ""}
              />
            ))}
          </div>
        </section>

        {saveFormOpen &&
          (<SaveBeatForm

          />)}

      </div>
    </div>
  )
}

export default CreateSongPage

