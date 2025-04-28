import React, { useEffect, useState } from 'react'
import { useEditGenre } from '../../../api/services/genre/query';
import useToastStore from '../../../stores/useToastStore';
import Genre from '../../../types/Genre';

interface Props {
  onClose: () => void;
  genre: Genre;
}

const GenreEditForm = ({ onClose, genre }: Props) => {
  const [name, setName] = useState(genre.name);
  const { showToast } = useToastStore();

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

  const { mutate, isError } = useEditGenre();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || name.length < 2) {
      showToast('Name must be at least 2 characters long', 'error');
      return;
    };

    mutate({id: genre.id, name}, {
      onSuccess: () => {
        setName('');
        onClose();
        showToast('Genre edited successfully', 'success');
      },
      onError: () => {
        setName('');
        showToast('An error occurred while editing the genre', 'error');
      }
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-lg w-full max-w-md text-white">
        {isError && (
          <div className="mb-4 text-red-500">
            An error occurred while editing the genre. Please try again.
          </div>
        )}

        <h3 className="text-xl font-bold mb-4">Edit Genre</h3>

        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded bg-zinc-700 hover:bg-zinc-600 text-white"
            onClick={() => onClose()}
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
}

export default GenreEditForm;
