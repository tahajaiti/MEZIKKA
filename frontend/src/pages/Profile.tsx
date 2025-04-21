import { useState } from "react";
import { useParams } from "react-router";
import { Disc, Heart, UserRoundCheck, UsersRoundIcon } from "lucide-react";
import ProfileCard from "../components/Profile/ProfileCard";
import ProfileSkeleton from "../components/Profile/ProfileCardSkeleton";
import FollowTabs from "../components/Follow/FollowTabs";
import LikesTab from "../components/Like/LikesTab";
import useAuthStore from "../stores/authStore";
import SongTab from "../components/Song/SongTab";

const tabs = [
  { key: "beats", name: "Beats", icon: <Disc className="w-4 h-4" />, canSee: true },
  { key: "likes", name: "Likes", icon: <Heart className="w-4 h-4" />, canSee: false },
  { key: "followers", name: "Followers", icon: <UserRoundCheck className="w-4 h-4" />, canSee: true },
  { key: "following", name: "Following", icon: <UsersRoundIcon className="w-4 h-4" />, canSee: true },
];

const Profile: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("beats");

  if (!id || !user) return <ProfileSkeleton />;

  const isCurrentUser = Number(id) === user.id;

  return (
    <div className="h-full w-full px-12 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
        <ProfileCard userId={id} />

        <div className="space-y-6">
          {/* Tabs */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-4">
            <div className="flex border-b border-zinc-800 overflow-x-auto">
              {tabs.map((tab) => {
                if (!tab.canSee && !isCurrentUser) return null;

                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 font-medium text-sm cursor-pointer flex items-center gap-2 transition-all whitespace-nowrap
                    ${activeTab === tab.key ? "text-red-500 border-b-2 border-red-500" : "text-zinc-400 hover:text-white"}`}
                  >
                    {tab.icon}
                    {tab.name}
                  </button>
                );
              })}
            </div>

            <div className="pt-6 overflow-auto">
              {activeTab === "beats" && <SongTab id={id}/>}

              {activeTab === "likes" && (
                <LikesTab />
              )}

              {activeTab === "followers" && <FollowTabs userId={id} type="followers" />}

              {activeTab === "following" && <FollowTabs userId={id} type="follows" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
