import { useState } from "react";
import { Pad } from "./Pad";
import { STEPS } from "../util/DrumData";

interface PadsProps {
  name?: string;
}

const Pads: React.FC<PadsProps> = ({name = 'Pad'}) => {
  const [activePads, setActivePads] = useState<boolean[]>(Array(STEPS).fill(false));

  const togglePad = (index: number) => {
    setActivePads((prev) =>
      prev.map((pad, i) => (i === index ? !pad : pad))
    );
  };

  return (
    <>
      <p>{name}</p>
      <div className="grid grid-cols-16 gap-3">
        {activePads.map((isActive, i) => (
          <Pad key={i} isActive={isActive} onClick={() => togglePad(i)} />
        ))}
      </div>
    </>
  );
};

export default Pads;
