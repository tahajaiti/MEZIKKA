import { useState } from "react";
import Profile from "../../types/Profile";
import { Camera, Save, X } from "lucide-react";
import { formatUrl } from "../../util/Formatters";
import { useUpdateProfile } from "../../api/services/user/query";
import useToastStore from "../../stores/useToastStore";

interface ProfileEditProps {
    profile: Profile;
    close: () => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ profile, close }) => {
    const [username, setUsername] = useState(profile.username)
    const [bio, setBio] = useState(profile.bio || "")
    const [image, setImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const { mutate } = useUpdateProfile();  
    const { showToast } = useToastStore();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImage(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('username', username);
        formData.append('bio', bio);
        if (image) {
            formData.append('avatar', image);
        }

        mutate(formData, {
            onSuccess: () => {
                showToast("Profile updated successfully", "success");
                
                close();
            },
            onError: () => {
                showToast("Username already taken", "error");
            },
        });
    }

    return (
        <form onSubmit={handleSave} className="p-6 flex flex-col gap-5">
            <h2 className="text-xl font-bold text-white text-center">Edit Profile</h2>

            <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-zinc-800 border-2 border-zinc-700">
                        <img src={previewUrl || formatUrl(profile.avatar)} alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-zinc-700 hover:bg-zinc-600 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                        <Camera className="w-4 h-4 text-white" />
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="px-4 py-2.5 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none transition-colors"
                    placeholder="Username"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-zinc-400">Bio</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="px-4 py-2.5 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:outline-none transition-colors resize-none"
                    rows={4}
                    placeholder="Bio..."
                />
            </div>

            <div className="flex gap-3 mt-2">
                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 flex-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
                >
                    <Save className="w-4 h-4" />
                    Save
                </button>
                <button
                    type="button"
                    onClick={close}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 flex-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors font-medium"
                >
                    <X className="w-4 h-4" />
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ProfileEdit;
