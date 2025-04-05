import useTrackStore from '../../stores/useTrackStore'
import { IoStopSharp } from 'react-icons/io5';
import { BsRecordFill } from 'react-icons/bs';

const RecordingControls = () => {
  const { isRecording, startRecording, stopRecordingAndExport } = useTrackStore();
  return (
    <div className="mt-4 mb-6 p-4 bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Record & Export</h2>
      <div className="flex gap-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white flex items-center"
          >
            <BsRecordFill className="w-5 h-5 mr-2" />
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecordingAndExport}
            className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white flex items-center"
          >
            <IoStopSharp className="w-5 h-5 mr-2" />
            Stop & Export
          </button>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-300">
        {isRecording ? (
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            Recording in progress...
          </div>
        ) : (
          <p>Record your sequence and export as audio file</p>
        )}
      </div>
    </div>
  );
}

export default RecordingControls