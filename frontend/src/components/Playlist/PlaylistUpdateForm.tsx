import React, { useEffect, useState } from 'react';
import { useUpdatePlaylist } from '../../api/services/playlist/query';
import { PlaylistData } from '../../types/Playlist';
import { formatUrl } from '../../util/Formatters';
import useToastStore from '../../stores/useToastStore';

interface Props {
    onClose: () => void;
    playlist: PlaylistData;
}

const PlaylistUpdateForm = ({ onClose, playlist }: Props) => {
    const { showToast } = useToastStore();

    const [formData, setFormData] = useState({
        title: playlist.title,
        description: playlist.description,
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

    const { mutate, isError } = useUpdatePlaylist();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { title, description, cover } = formData;

        const data = new FormData();
        data.append('title', title.trim());
        data.append('description', description.trim() || 'No description');

        if (cover instanceof File) {
            data.append('cover_file', cover);
        }

        mutate({ id: String(playlist.id), formData: data }, {
            onSuccess: () => {
                setFormData({
                    title: '',
                    description: '',
                    cover: null,
                });
                onClose();
                showToast('Playlist updated successfully!', 'success');
            },
            onError: () => {
                setFormData({
                    title: playlist.title,
                    description: playlist.description,
                    cover: null,
                });
                showToast('Failed to update playlist. Please try again.', 'error');
            }
        });
    };

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
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-lg w-full max-w-md text-white">
                {isError && (
                    <div className="mb-4 text-red-500">
                        An error occurred while updating the playlist. Please try again.
                    </div>
                )}

                <h3 className="text-xl font-bold mb-4">Update Playlist</h3>

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
                        Cover Image (Optional)
                    </label>
                    {playlist.cover && !formData.cover && (
                        <div className="mb-2 flex justify-center">
                            <img src={formatUrl(playlist.cover)} alt="Current cover" className="w-24 h-24 object-cover rounded" />
                        </div>
                    )}
                    <input
                        id="cover"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
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
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PlaylistUpdateForm;