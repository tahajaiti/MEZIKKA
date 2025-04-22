import { useEffect, useState, useRef } from "react"
import {motion} from 'motion/react';
import { ChevronLeft, ChevronRight } from "lucide-react"
import SongCard from "../components/Song/SongCard"
import { useGetAllSongs } from "../api/services/song/query"
import type SongData from "../types/Song"
import { Music } from "lucide-react"
import SongCardSkeleton from "../components/Song/SongCardSkeleton"

const Home: React.FC = () => {
  const [songs, setSongs] = useState<SongData[]>([])
  const carouselRef = useRef<HTMLDivElement>(null)

  const { data, isPending } = useGetAllSongs()

  useEffect(() => {
    if (data && data.data) {
      setSongs(data.data)
    }
  }, [data])

  const scrollPrev = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.75
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    }
  }

  const scrollNext = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.75
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full h-full pt-16 p-8 bg-gradient-to-br from-red-950 to-zinc-950 overflow-y-auto">
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">New Mezikka</h2>

          {songs.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={scrollPrev}
                className="p-2.5 rounded-full bg-red-600/20 hover:bg-red-600/40 text-white transition-colors"
                aria-label="Previous songs"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                className="p-2.5 rounded-full bg-red-600/20 hover:bg-red-600/40 text-white transition-colors"
                aria-label="Next songs"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="relative w-full">
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-8 pb-8 pt-4 scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            {isPending
              ? Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="snap-start flex-shrink-0 w-[240px] md:w-[280px]">
                  <SongCardSkeleton />
                </div>
              ))
              : songs.length > 0
                ? songs.map((song) => (
                  <div key={song.id} className="snap-start flex-shrink-0 w-[240px] md:w-[280px]">
                    <SongCard song={song} />
                  </div>
                ))
                : (
                  <div className="w-full flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 mb-6 rounded-full bg-zinc-800/50 flex items-center justify-center">
                      <Music className="w-10 h-10 text-zinc-400" />
                    </div>
                    <h3 className="text-2xl font-medium text-white mb-3">No songs found</h3>
                  </div>
                )}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Home
