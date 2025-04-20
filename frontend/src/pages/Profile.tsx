import { useState } from "react";
import { useParams } from "react-router";
import { Disc, Heart, UserRoundCheck, UsersRoundIcon } from "lucide-react";
import ProfileCard from "../components/Profile/ProfileCard";
import ProfileSkeleton from "../components/Profile/ProfileCardSkeleton";
import FollowTabs from "../components/Follow/FollowTabs";

const tabs = [
  { key: "beats", name: "Beats", icon: <Disc className="w-4 h-4" /> },
  { key: "liked", name: "Liked", icon: <Heart className="w-4 h-4" /> },
  { key: "followers", name: "Followers", icon: <UserRoundCheck className="w-4 h-4" /> },
  { key: "following", name: "Following", icon: <UsersRoundIcon className="w-4 h-4" /> },
];

const Profile: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("beats");

  if (!id) return <ProfileSkeleton />;

  return (
    <div className="h-full w-full px-12 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
        <ProfileCard userId={id} />

        <div className="space-y-6">
          {/* Tabs */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-4">
            <div className="flex border-b border-zinc-800 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 font-medium text-sm cursor-pointer flex items-center gap-2 transition-all whitespace-nowrap
                    ${activeTab === tab.key ? "text-red-500 border-b-2 border-red-500" : "text-zinc-400 hover:text-white"}`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              ))}
            </div>

            <div className="pt-6 overflow-auto">
              {activeTab === "beats" && <div>BEATS</div>}

              {activeTab === "liked" && (
                <div className="text-center py-8 text-zinc-400">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                  <h3 className="text-lg font-medium mb-2">No liked beats yet</h3>
                  <p className="text-sm">When you like beats, they'll appear here.</p>
                </div>
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
