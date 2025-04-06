// src/components/SaveBeatForm.tsx
import React, { useEffect, useState } from 'react';
import useTrackStore from '../../stores/useTrackStore';
import { useGetGenres } from '../../api/services/genre/query';
import Genre from '../../types/Genre';
import { useCreateSong } from '../../api/services/song/query';
import useToastStore from '../../stores/useToastStore';

const SaveBeatForm: React.FC = () => {
    const { openCloseForm, soundFile, getSongData, setSongId } = useTrackStore();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genre: '',
        coverFile: null as File | null,
    });
    const [genres, setGenres] = useState<Genre[]>([]);

    const { data } = useGetGenres();
    const { mutate } = useCreateSong();
    const {showToast} = useToastStore();

    useEffect(() => {
        if (data?.data) {
            setGenres(data.data);
        }
    }, [data]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, coverFile: file }));
    };

    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const genre = e.target.value;
        setFormData((prev) => ({ ...prev, genre }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();        

        const { title, description, genre, coverFile } = formData;

        const form = new FormData();
        form.append('name', title.trim());
        form.append('description', description.trim() || 'No description');
        form.append('genre_id', genre);

        if (coverFile) {
            form.append('cover_file', coverFile);
        }

        if (soundFile) {
            form.append('song_file', soundFile);
        }

        try {
            const songData = getSongData();
            form.append('metadata', JSON.stringify(songData));
        } catch (error) {
            console.error('Failed to get song data:', error);
            return;
        }

        mutate(form, {
            onSuccess: (data) => {
                if (data.data) {
                    const id = `MEZ-${data.data.id}`;
                    setSongId(id);
                }
                openCloseForm();
                setFormData({
                    title: '',
                    description: '',
                    genre: '',
                    coverFile: null,
                });
                showToast('Song saved successfully!', 'success', 10000);
            },
            onError: (error) => {
                console.error('Failed to save song:', error);
            },
        });
    };


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-lg w-full max-w-md text-white">
                <h3 className="text-xl font-bold mb-4">Save Your Beat</h3>

                {soundFile === null && (
                    <p className="text-red-500 mb-4 font-medium">
                        Please record a sound before saving.
                    </p>
                )}

                <div className="mb-4">
                    <label htmlFor="title" className="block mb-1">
                        Title <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={formData.title}
                        onChange={handleFormChange}
                        required
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block mb-1">
                        Description (Optional)
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows={3}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="cover" className="block mb-1">
                        Cover Image <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="cover"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-zinc-400"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="genre" className="block mb-1">Genres</label>
                    <select
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleGenreChange}
                        className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <option value="" disabled>{genres.length ? 'Select a genre' : 'No genres available'}</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        className="px-4 py-2 rounded bg-zinc-700 hover:bg-zinc-600 text-white"
                        onClick={openCloseForm}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={soundFile === null}
                        type="submit"
                        className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SaveBeatForm;