import { useState } from "react";
import Profile from "../../types/Profile";

interface ProfileEditProps {
    profile: Profile;
    close: () => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ profile, close }) => {
    const [username, setUsername] = useState(profile.username);
    const [bio, setBio] = useState(profile.bio || "");
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSave = () => {
        const updatedProfile = {
            username,
            bio,
            avatar: image
        };
    };

    return (
        <form className="p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label className="text-white">Profile Image</label>
                <div className="flex items-center gap-4">
                    {image ? (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="New Avatar"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-gray-500" />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="px-4 py-2 rounded-lg bg-zinc-800 text-white"
                    />
                </div>
            </div>


            <div className="flex flex-col gap-2">
                <label className="text-white">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-zinc-800 text-white"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-white">Bio</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-zinc-800 text-white"
                    rows={4}
                />
            </div>

            <div className="flex gap-2 items-center">
                <button
                    className="px-6 py-2 w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white rounded-lg mt-4"
                    onClick={handleSave}
                >
                    Save
                </button>
                <button
                    className="px-6 py-2 w-full bg-zinc-500 hover:bg-zinc-600 cursor-pointer text-white rounded-lg mt-4"
                    onClick={close}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ProfileEdit;
