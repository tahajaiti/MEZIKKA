import React, { useEffect, useState } from 'react'
import { useCreatePlaylist } from '../../api/services/playlist/query';

interface props {
    onClose: () => void;
}

const PlaylistCreateForm = ({ onClose }: props) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        cover: null as File | null,
    });

    useEffect(() => {
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [onClose]);

    const { mutate, isError } = useCreatePlaylist();


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { title, description, cover } = formData;

        const data = new FormData();
        data.append('title', title.trim());
        data.append('description', description.trim() || 'No description');

        if (cover instanceof File) {
            data.append('cover_file', cover);
        }
        mutate(data, {
            onSuccess: () => {
                setFormData({
                    title: '',
                    description: '',
                    cover: null,
                });
                onClose();
            },
            onError: () => {
                setFormData({
                    title: '',
                    description: '',
                    cover: null,
                });
            }
        });

    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, cover: file }));
    };

    const handleClose = () => {
        onClose();
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-lg w-full max-w-md text-white">
                {isError && (
                    <div className="mb-4 text-red-500">
                        An error occurred while creating the playlist. Please try again.
                    </div>
                )}

                <h3 className="text-xl font-bold mb-4">Create Playlist</h3>

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

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        className="px-4 py-2 rounded bg-zinc-700 hover:bg-zinc-600 text-white"
                        onClick={handleClose}
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
    )
}

export default PlaylistCreateForm