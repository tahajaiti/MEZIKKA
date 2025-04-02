import Pads from "./components/Pads"
import DRUM_DATA from "./util/DrumData"


const App = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 h-screen overflow-y-auto">
        {DRUM_DATA.map(pad => <Pads key={pad.id} {...pad} />)}
      </div>
    </>
  )
}

export default App