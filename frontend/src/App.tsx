import Pads from "./components/Pads"

const App = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 h-screen overflow-y-auto">
        <Pads name="kick" />
        <Pads name="snare" />
        <Pads name="hihat" />
        <Pads name="perc" />
      </div>
    </>
  )
}

export default App