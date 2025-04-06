// src/components/SaveBeatForm.tsx
import React, { useState } from 'react';
import useTrackStore from '../../stores/useTrackStore';
import { useGetGenres } from '../../api/services/genre/query';


const SaveBeatForm: React.FC = () => {
    const { openCloseForm } = useTrackStore();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genre: '',
        coverFile: null as File | null,
    });

    const { data, isPending } = useGetGenres();

    const availableGenres = data?.data || [];

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, coverFile: file }));
    };

    const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const genre = e.target.value;
        setFormData((prev) => ({ ...prev, genre: genre }))
    };

    if (isPending) return <p>Loading...</p>

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <form className="bg-zinc-900 p-6 rounded-lg w-full max-w-md text-white">
                <h3 className="text-xl font-bold mb-4">Save Your Beat</h3>

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
                    <label className="block mb-1">
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
                    <label className="block mb-1">Genres</label>
                    <div className="flex flex-wrap gap-2">
                        {availableGenres.map((genre) => (
                            <label key={genre.id} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    value={genre.id}
                                    onChange={handleGenreChange}
                                    className="accent-red-500"
                                />
                                {genre.name}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        className="px-4 py-2 rounded bg-zinc-700 hover:bg-zinc-600 text-white"
                        onClick={() => openCloseForm()}
                    >
                        Cancel
                    </button>
                    <button
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