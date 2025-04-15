import { useState } from "react"
import ProfileCard from "../components/Profile/ProfileCard"
import { Disc, Heart, UserRoundCheck, UsersRoundIcon } from "lucide-react"
import FollowTab from "../components/Follow/FollowTab"
import { useParams } from "react-router"
import ProfileSkeleton from "../components/Profile/ProfileCardSkeleton"
import FollowingTab from "../components/Follow/FollowingTab"

const Profile: React.FC = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<"beats" | "liked" | "followers" | "follows">("beats");

  if (!id) {
    return <ProfileSkeleton />
  }

  return (
    <div className="h-full w-full px-12 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
        {/* Profile Card */}
        <div>
          <ProfileCard userId={id} />
        </div>

        {/* Content Area */}
        <div className="space-y-6">
          {/* Tabs */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-4">
            <div className="flex border-b border-zinc-800">
              <button
                className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === "beats" ? "text-red-500 border-b-2 border-red-500" : "text-zinc-400 hover:text-white"
                  }`}
                onClick={() => setActiveTab("beats")}
              >
                <Disc className="w-4 h-4" />
                Beats
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === "liked" ? "text-red-500 border-b-2 border-red-500" : "text-zinc-400 hover:text-white"
                  }`}
                onClick={() => setActiveTab("liked")}
              >
                <Heart className="w-4 h-4" />
                Liked
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === "followers" ? "text-red-500 border-b-2 border-red-500" : "text-zinc-400 hover:text-white"
                  }`}
                onClick={() => setActiveTab("followers")}
              >
                <UserRoundCheck className="w-4 h-4" />
                Followers
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === "follows" ? "text-red-500 border-b-2 border-red-500" : "text-zinc-400 hover:text-white"
                  }`}
                onClick={() => setActiveTab("follows")}
              >
                <UsersRoundIcon className="w-4 h-4" />
                Following
              </button>
            </div>

            <div className="pt-6 overflow-auto">
              {activeTab === "beats" && (
                <div>BEATS</div>
              )}

              {activeTab === "liked" && (
                <div className="text-center py-8 text-zinc-400">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                  <h3 className="text-lg font-medium mb-2">No liked beats yet</h3>
                  <p className="text-sm">When you like beats, they'll appear here.</p>
                </div>
              )}

              {activeTab === "followers" && (
                <FollowTab userId={id} />
              )}

              {activeTab === "follows" && (
                <FollowingTab userId={id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
