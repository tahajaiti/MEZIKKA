import { Disc, Mic, Square, Save, Upload } from "lucide-react"
import useTrackStore from "../../stores/useTrackStore"

const RecordingControls = () => {
  const { isRecording, startRecording, stopRecordingAndExport, openCloseForm } = useTrackStore();

  return (
    <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 shadow-lg  w-full h-full grid grid-rows-2  gap-2">
      <div className="flex flex-col items-center justify-between">
        <div className="flex items-center gap-2 mb-5">
          <Mic className="w-5 h-5 text-red-500" />
          <h2 className="text-lg font-bold text-white">Record & Export</h2>
        </div>

        <div className="flex gap-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 transition-all"
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute  h-full w-full rounded-full bg-red-600"></span>
              </span>
              Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecordingAndExport}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium bg-zinc-800 hover:bg-zinc-700 text-white transition-all"
            >
              <Square className="w-4 h-4 fill-current" />
              Stop Recording
            </button>
          )}
        </div>

        <div className="mt-4">
          {isRecording ? (
            <div className="flex items-center p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center justify-center w-8 h-8 bg-red-500/20 rounded-full mr-3">
                <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </div>
              <div>
                <p className="text-red-400 font-medium">Recording in progress</p>
                <p className="text-xs text-zinc-400 mt-0.5">Click "Stop Recording" when finished</p>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-zinc-800/50 border border-zinc-700/50 rounded-lg">
              <p className="text-zinc-400 text-sm">
                Record your sequence and export it as a <span className="text-red-500">MEZIKKA</span> key, which can be shared with others.
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-between">
        <div className="flex items-center gap-2 mb-5 w-full">
          <Disc className="w-5 h-5 text-red-500" />
          <h2 className="text-lg font-bold text-white">Load & Save</h2>
        </div>

        <div className="flex justify-between items-center w-full gap-2">
          <button
            onClick={() => openCloseForm()}
            className="w-1/3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 transition-all"
          >
            <Save className="w-4 h-4"
            />
            Save Beat
          </button>
          <div className="flex justify-between items-center gap-2 w-2/3">
            <button
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 transition-all w-full"
            >
              <Upload className="w-4 h-4" />
              Load Beat
            </button>
            <input type="text"
              placeholder="MEZIKKA Key"
              className="w-full pl-3 pr-3 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-white 
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all
              "
            />
          </div>
        </div>

        <div className="w-full p-3 bg-zinc-800/30 rounded-lg border border-zinc-700/20">
          <p className="text-xs text-center text-zinc-500">
            Beats are stored in the cloud and can be accessed from any device using their unique <span className="text-red-500">MEZIKKA</span> key.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RecordingControls

