import React, { useEffect, useState } from 'react'
import SongCard from '../components/Song/SongCard'
import { useGetAllSongs } from '../api/services/song/query'
import SongData from '../types/Song';

const Home = () => {
  const [songs, setSongs] = useState<SongData[]>([]);

  const { data, isPending } = useGetAllSongs();

  console.log(data);

  useEffect(() => {
    if (data && data.data) {
      setSongs(data.data);
    }
  }, [data]);

  if (isPending) {
    return (
      <div className='w-full h-full pt-16 p-8 bg-gradient-to-br from-red-950 to-zinc-950 overflow-y-auto'>
        <h2 className='text-3xl'>Loading...</h2>
      </div>
    )
  }

  return (
    <div className='w-full h-full pt-16 p-8 bg-gradient-to-br from-red-950 to-zinc-950 overflow-y-auto'>

      <section className='flex flex-col gap-4'>
        <h2 className='text-3xl'>New Mezikka</h2>
        <div className='flex items-center justify-between gap-4 h-fit w-full p-8'>
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
            />
          ))}
        </div>
      </section>

      <section className='flex flex-col gap-4'>
        <h2 className='text-3xl'>New Mezikka</h2>
        <div className='flex items-center justify-between gap-4 h-fit w-full p-8'>
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
            />
          ))}
        </div>
      </section>

    </div>
  )
}

export default Home