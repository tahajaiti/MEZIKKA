import React from 'react'
import { useParams } from 'react-router'
import { useGetSong } from '../api/services/song/query';
import { formatUrl } from '../util/Formatters';

const songData = {
    id: 1,
    name: "Midnight Groove",
    description: "A smooth beat with deep bass and jazzy elements. Perfect for late night sessions.",
    file_path: "/songs/midnight-groove.mp3",
    cover_path: "/placeholder.svg?height=400&width=400",
    genre: {
        id: 3,
        name: "Jazz Hip-Hop",
        description: "A fusion of jazz and hip-hop elements",
    },
    metadata: {
        id: 1,
        bpm: 92,
        key: "F Minor",
        duration: 184, // in seconds
        instruments: ["Drums", "Bass", "Piano", "Saxophone"],
    },
    user: {
        id: 42,
        name: "James Watson",
        email: "jwatson213@example.com",
        role_id: 1,
        role: {
            id: 1,
            name: "Artist",
        },
        profile: {
            id: 42,
            username: "jwatson213",
            bio: "I'm a software engineer, and I love to code!",
            avatar: "/placeholder.svg?height=150&width=150",
            created_at: "2021-10-10T00:00:00.000Z",
            updated_at: "2023-06-03T00:00:00.000Z",
        },
        created_at: "2021-10-10T00:00:00.000Z",
        updated_at: "2023-06-03T00:00:00.000Z",
    },
    created_at: "2023-11-15T00:00:00.000Z",
    updated_at: "2023-12-02T00:00:00.000Z",
}

const Song = () => {
    const { id } = useParams();

    const { data } = useGetSong(id!);

    console.log(data);

    const song = data?.data;
    const user = song?.user;

    const img = formatUrl(data?.data?.cover_path);
    const userImg = formatUrl(user?.profile.avatar);

    return (
        <div className='bg-zinc-900 rounded-xl h-full w-full border border-zinc-800 shadow-lg overflow-hidden'>
            <div className="relative">
                <div className="aspect-square max-h-[600px] w-full overflow-hidden bg-zinc-800">
                    <img
                        src={img}
                        alt={song?.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h1 className="text-3xl font-bold text-white mb-2">{song?.name}</h1>
                    <a href={`/profile/${user?.id}`} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-zinc-800">
                            <img
                                src={userImg}
                                alt={user?.profile.username}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="text-zinc-300 group-hover:text-white transition-colors">
                            <span className="font-medium">{songData.user.name}</span>
                            <span className="text-zinc-400 text-sm ml-2">@{songData.user.profile.username}</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Song