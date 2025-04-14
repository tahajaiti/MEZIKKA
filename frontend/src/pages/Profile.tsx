import { useState } from "react"
import ProfileCard from "../components/Profile/ProfileCard"
import { Disc, Heart } from "lucide-react"

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"beats" | "liked">("beats")

  return (
    <div className="h-full w-full px-12 py-6 overflow-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
        {/* Profile Card */}
        <div>
          <ProfileCard />
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
            </div>

            <div className="pt-6">
              {activeTab === "beats" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-zinc-800 rounded-lg overflow-hidden">
                      <div className="aspect-square bg-zinc-700 relative group">
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6 text-white"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-white">Beat #{i}</h3>
                        <p className="text-xs text-zinc-400">2 days ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "liked" && (
                <div className="text-center py-8 text-zinc-400">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                  <h3 className="text-lg font-medium mb-2">No liked beats yet</h3>
                  <p className="text-sm">When you like beats, they'll appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
