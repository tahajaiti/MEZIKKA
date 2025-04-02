import React from 'react'
import DRUM_DATA from '../util/DrumData'
import Pads from '../components/Pads'

const CreateSongPage = () => {
  return (
    <>
      {DRUM_DATA.map((d) => (
        <Pads key={d.id}
          name={d.name}
          volume={d.volume}
        />
      ))}

      
    </>
  )
}

export default CreateSongPage