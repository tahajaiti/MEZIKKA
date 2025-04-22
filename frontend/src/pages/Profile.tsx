import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from 'motion/react';
import { Disc, Heart, Play, UserRoundCheck, UsersRoundIcon } from "lucide-react";
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
  { key: "playlist", name: "Playlists", icon: <Play className="w-4 h-4" />, canSee: true },
];

const Profile: React.FC = () => {
  const { userId } = useParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("beats");

  if (!user) return <ProfileSkeleton />;
  
  const id = userId ? userId : user.id;

  const isCurrentUser = Number(id) === user.id;

  const handleClick = (key: string) => {
    if (isCurrentUser && key === "playlist") {
      console.log("hehe");
      navigate("/playlist");
      return;
    }
    setActiveTab(key);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="h-full w-full px-12 py-6 bg-gradient-to-br from-gray-800 to-zinc-950">
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
        <ProfileCard userId={String(id)} />

        <div className="space-y-6">
          {/* Tabs */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-4">
            <div className="flex border-b border-zinc-800 overflow-x-auto">
              {tabs.map((tab) => {
                if (!tab.canSee && !isCurrentUser) return null;

                return (
                  <button
                    key={tab.key}
                    onClick={() => {
                      handleClick(tab.key);
                    }}
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
              {activeTab === "beats" && <SongTab id={id} />}

              {activeTab === "likes" && (
                <LikesTab />
              )}

              {activeTab === "followers" && <FollowTabs userId={String(id)} type="followers" />}

              {activeTab === "following" && <FollowTabs userId={String(id)} type="follows" />}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
