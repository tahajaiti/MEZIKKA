import { Disc, Mic, Square, Save, Upload, Lock } from "lucide-react";
import useTrackStore from "../../stores/useTrackStore";
import { useState, useCallback, useMemo } from "react";
import { useGetSong } from "../../api/services/song/query";
import useToastStore from "../../stores/useToastStore";
import useRecordStore from "../../stores/useRecordStore";

const RecordingControls = () => {
  const { openCloseForm, songId, loadSong, getSequences, startStopSequencer, isPlaying } = useTrackStore();
  const { isRecording, startRecording, stopRecordingAndExport, soundFile } = useRecordStore();
  const { showToast } = useToastStore();
  const [inputKey, setInputKey] = useState("");
  const { isLoading, refetch } = useGetSong(inputKey ? inputKey.split("-")[1] : "");

  const sequences = getSequences();

  const areSequencesEmpty = useMemo(() => {
    return Object.values(sequences).every((s) => s.every(step => step === false))
  }, [sequences]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputKey(e.target.value);
  }, []);

  const handleSaveClick = useCallback(() => {
    if (!soundFile) {
      showToast('Please record a beat first', 'error');
      return;
    }
    openCloseForm();
  }, [soundFile, openCloseForm, showToast]);

  const handleSubmit = useCallback(async () => {
    if (!inputKey) {
      showToast('Please enter a MEZIKKA Key', 'error');
      return;
    }

    const result = await refetch();

    if (!result.data?.data) {
      showToast('Invalid or missing MEZIKKA Key', 'error');
      return;
    }

    loadSong(result.data.data.metadata, String(result.data.data.id));
    showToast('Beat loaded successfully', 'success');
    setInputKey("");
  }, [inputKey, refetch, loadSong, showToast]);

  const handleRecord = async () => {
    if (isRecording) {
      await stopRecordingAndExport();
      await startStopSequencer();
    } else if (!isPlaying) {
      await startStopSequencer();
      await startRecording();
    } else if (isPlaying){
      await startRecording();
    }
  }

  return (
    <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg w-full h-full flex flex-col gap-6">
      {/* Record & Export */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Mic className="w-5 h-5 text-red-500" />
          <h2 className="text-lg font-bold text-white">Record & Export</h2>
        </div>

        <div className="flex flex-col items-center gap-4">
          {!isRecording ? (
            <button
              onClick={handleRecord}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-red-500 
              hover:bg-red-600 text-white shadow-lg shadow-red-500/20 transition-all 
              disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:shadow-none"
              disabled={isRecording || areSequencesEmpty}
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute h-full w-full rounded-full bg-red-600 animate-ping" />
                <span className="relative h-full w-full rounded-full bg-red-400" />
              </span>
              Start Recording
            </button>
          ) : (
            <button
              onClick={handleRecord}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-zinc-700 hover:bg-zinc-600 text-white transition-all"
            >
              <Square className="w-4 h-4 fill-current" />
              Stop Recording
            </button>
          )}

          <div className="w-full max-w-md">
            {isRecording ? (
              <div className="flex items-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-red-500/20 rounded-full mr-3">
                  <span className="inline-block w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </div>
                <div>
                  <p className="text-red-400 font-medium">Recording in progress</p>
                  <p className="text-xs text-zinc-400 mt-1">Click "Stop Recording" when finished</p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-center">
                <p className="text-zinc-400 text-sm">
                  Record your sequence and export it as a{" "}
                  <span className="text-red-500 font-medium">MEZIKKA</span> key to share with others.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Load & Save */}
      <section className="flex flex-col gap-4" >
        <div className="flex items-center gap-2">
          <Disc className="w-5 h-5 text-red-500" />
          <h2 className="text-lg font-bold text-white">Load & Save</h2>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-center">
            <p className="text-zinc-500 font-medium">
              MEZIKKA Key:{" "}
              <span className="font-bold text-red-500">{songId || "None"}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleSaveClick}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${!soundFile
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20"
                }`}
              disabled={!soundFile}
            >
              {soundFile ? (
                <Save className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              {soundFile ? "Save Beat" : "Record a Beat First"}
            </button>

            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || !inputKey}
            >
              <Upload className="w-4 h-4" />
              {isLoading ? "Loading..." : "Load"}
            </button>

            <input
              type="text"
              placeholder="Enter MEZIKKA Key"
              value={inputKey}
              onChange={handleChange}
              className="w-full px-3 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="p-4 bg-zinc-800/30 rounded-lg border border-zinc-700/20 text-center">
            <p className="text-xs text-zinc-500">
              Beats are stored in the cloud and can be accessed from any device using their unique{" "}
              <span className="text-red-500 font-medium">MEZIKKA</span> key.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecordingControls;