// src/components/SaveBeatForm.tsx
import React, { useState } from 'react';


const SaveBeatForm: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genres: [] as string[],
        coverFile: null as File | null,
    });

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
        setFormData((prev) => {
            const genres = prev.genres.includes(genre)
                ? prev.genres.filter((g) => g !== genre)
                : [...prev.genres, genre];
            return { ...prev, genres };
        });
    };

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
                        {['Hip-Hop', 'Trap', 'Electronic', 'Pop', 'Rock'].map((genre) => (
                            <label key={genre} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    value={genre}
                                    checked={formData.genres.includes(genre)}
                                    onChange={handleGenreChange}
                                    className="accent-red-500"
                                />
                                {genre}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        className="px-4 py-2 rounded bg-zinc-700 hover:bg-zinc-600 text-white"
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