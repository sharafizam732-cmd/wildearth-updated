import React, { useState } from 'react';
import {
  Film,
  ShoppingBag,
  Heart,
  History,
  User as UserIcon,
  Settings,
  KeyRound,
  LogOut,
  Play,
  Clock,
  CheckCircle2,
  Trash2,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VideoCard } from '../components/VideoCard';

type Tab =
  | 'dashboard'
  | 'library'
  | 'purchased'
  | 'wishlist'
  | 'history'
  | 'profile'
  | 'settings'
  | 'password';

export const UserAccountPage: React.FC = () => {
  const {
    currentUser,
    logout,
    videos,
    purchasedVideoIds,
    wishlistIds,
    watchHistory,
    openVideoPlayer,
    navigateTo,
    openAuth,
  } = useApp();

  const [activeTab, setActiveTab] = useState<Tab>('library');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  if (!currentUser) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 bg-[#070d0a]">
        <div className="max-w-md w-full bg-[#0b1510] border border-[#2d5a47] rounded-3xl p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white font-['Montserrat']">Sign In to Your Account</h2>
          <p className="text-xs text-neutral-400">
            Access your personalized documentary library, purchased masterclasses, and watchlist.
          </p>
          <button
            onClick={() => openAuth('login')}
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070d0a] font-bold text-xs uppercase tracking-wider"
          >
            Sign In / Register
          </button>
        </div>
      </div>
    );
  }

  // Videos in Library (unlocked + free)
  const purchasedVideos = videos.filter((v) => purchasedVideoIds.includes(v.id));
  const libraryVideos = videos.filter((v) => !v.isPremium || purchasedVideoIds.includes(v.id));
  const wishlistVideos = videos.filter((v) => wishlistIds.includes(v.id));
  const historyVideos = watchHistory
    .map((h) => videos.find((v) => v.id === h.videoId))
    .filter((v): v is typeof videos[0] => Boolean(v));

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess(true);
    setTimeout(() => {
      setPasswordSuccess(false);
      setNewPassword('');
    }, 2500);
  };

  const navItems: { id: Tab; label: string; icon: any; count?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: UserIcon },
    { id: 'library', label: 'My Library', icon: Film, count: libraryVideos.length },
    { id: 'purchased', label: 'Purchased Videos', icon: ShoppingBag, count: purchasedVideos.length },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlistVideos.length },
    { id: 'history', label: 'Watch History', icon: History, count: historyVideos.length },
    { id: 'profile', label: 'Profile', icon: UserIcon },
    { id: 'settings', label: 'Account Settings', icon: Settings },
    { id: 'password', label: 'Change Password', icon: KeyRound },
  ];

  return (
    <div className="min-h-screen py-10 bg-[#070d0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Banner */}
        <div className="bg-[#0b1510] border border-[#2d5a47]/50 rounded-3xl p-6 sm:p-8 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#10b981] to-[#047857] flex items-center justify-center text-white font-extrabold text-2xl shadow-lg">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-xl sm:text-2xl font-bold text-white font-['Montserrat']">
                  {currentUser.name}
                </h1>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-1">{currentUser.email}</p>
              <p className="text-[11px] text-neutral-500 mt-0.5">Conservation Patron since {currentUser.memberSince}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser.role === 'admin' && (
              <button
                onClick={() => navigateTo('admin')}
                className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 text-xs font-bold flex items-center gap-2 transition-all shadow-md"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin Video Manager</span>
              </button>
            )}
            <button
              onClick={() => logout()}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-neutral-300 hover:text-red-300 border border-white/10 text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <div className="bg-[#0b1510] border border-[#2d5a47]/50 rounded-3xl p-4 h-fit space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#10b981] text-[#070d0a] shadow-md'
                      : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold tabular-nums ${
                        isActive ? 'bg-[#070d0a]/20 text-[#070d0a]' : 'bg-white/10 text-neutral-300'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Tab Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Dashboard Overview */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#0b1510] border border-white/10 p-5 rounded-2xl">
                    <div className="text-neutral-400 text-xs font-medium">Purchased Documentaries</div>
                    <div className="text-3xl font-extrabold text-white mt-2 font-['Montserrat']">
                      {purchasedVideos.length}
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-1">Lifetime 4K access</div>
                  </div>
                  <div className="bg-[#0b1510] border border-white/10 p-5 rounded-2xl">
                    <div className="text-neutral-400 text-xs font-medium">Saved in Wishlist</div>
                    <div className="text-3xl font-extrabold text-white mt-2 font-['Montserrat']">
                      {wishlistVideos.length}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-1">Ready to stream or purchase</div>
                  </div>
                  <div className="bg-[#0b1510] border border-white/10 p-5 rounded-2xl">
                    <div className="text-neutral-400 text-xs font-medium">Conservation Contribution</div>
                    <div className="text-3xl font-extrabold text-emerald-400 mt-2 font-['Montserrat']">
                      ${purchasedVideos.reduce((sum, v) => sum + v.price, 0).toFixed(2)}
                    </div>
                    <div className="text-[11px] text-neutral-400 mt-1">Directed to field efforts</div>
                  </div>
                </div>

                <div className="bg-[#0b1510] border border-[#2d5a47]/50 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white font-['Montserrat']">Recently Watched</h2>
                    <button
                      onClick={() => setActiveTab('history')}
                      className="text-xs text-emerald-400 hover:underline"
                    >
                      Full History &rarr;
                    </button>
                  </div>
                  {historyVideos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {historyVideos.slice(0, 2).map((vid) => (
                        <div
                          key={vid.id}
                          onClick={() => openVideoPlayer(vid)}
                          className="flex items-center gap-3 p-3 rounded-xl bg-[#070d0a] border border-white/5 hover:border-emerald-500/50 cursor-pointer transition-all"
                        >
                          <img
                            src={vid.thumbnail}
                            alt={vid.title}
                            className="w-20 h-14 rounded-lg object-cover"
                          />
                          <div className="overflow-hidden">
                            <h4 className="text-xs font-bold text-white truncate">{vid.title}</h4>
                            <p className="text-[10px] text-neutral-400">{vid.categoryName} · {vid.duration}</p>
                            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                              <Play className="w-2.5 h-2.5 fill-current" />
                              Resume Playback
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-400">No watch history yet.</p>
                  )}
                </div>
              </div>
            )}

            {/* My Library Tab */}
            {activeTab === 'library' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white font-['Montserrat']">
                    My Streaming Library ({libraryVideos.length})
                  </h2>
                  <p className="text-xs text-neutral-400">
                    All unlocked premium purchases and available free documentaries
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {libraryVideos.map((video) => (
                    <VideoCard key={video.id} video={video} showPrice={false} />
                  ))}
                </div>
              </div>
            )}

            {/* Purchased Videos Tab */}
            {activeTab === 'purchased' && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-white font-['Montserrat']">
                    Purchased Videos ({purchasedVideos.length})
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    Documentaries you own with permanent streaming rights
                  </p>
                </div>

                {purchasedVideos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchasedVideos.map((video) => (
                      <VideoCard key={video.id} video={video} showPrice={false} />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center bg-[#0b1510] rounded-3xl border border-white/5 space-y-3">
                    <ShoppingBag className="w-10 h-10 text-neutral-500 mx-auto" />
                    <h4 className="text-base font-bold text-white">No Purchased Videos Yet</h4>
                    <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                      Explore our premium documentary masterclasses and support frontline conservation projects.
                    </p>
                    <button
                      onClick={() => navigateTo('videos')}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 text-[#070d0a] text-xs font-bold"
                    >
                      Browse Premium Catalog
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white font-['Montserrat']">
                  My Wishlist ({wishlistVideos.length})
                </h2>
                {wishlistVideos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistVideos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center bg-[#0b1510] rounded-3xl border border-white/5 space-y-2">
                    <Heart className="w-10 h-10 text-neutral-500 mx-auto" />
                    <h4 className="text-base font-bold text-white">Wishlist is Empty</h4>
                    <p className="text-xs text-neutral-400">Click the heart icon on any documentary to save it here.</p>
                  </div>
                )}
              </div>
            )}

            {/* Watch History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white font-['Montserrat']">
                  Watch History ({historyVideos.length})
                </h2>
                {historyVideos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {historyVideos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center bg-[#0b1510] rounded-3xl border border-white/5 space-y-2">
                    <History className="w-10 h-10 text-neutral-500 mx-auto" />
                    <h4 className="text-base font-bold text-white">No Watch History</h4>
                    <p className="text-xs text-neutral-400">Videos you play will appear here for easy resumption.</p>
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-[#0b1510] border border-[#2d5a47]/50 rounded-3xl p-6 sm:p-8 space-y-6">
                <h2 className="text-xl font-bold text-white font-['Montserrat']">Profile Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Full Name</label>
                    <input
                      type="text"
                      disabled
                      value={currentUser.name}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070d0a] border border-white/10 text-neutral-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Email</label>
                    <input
                      type="email"
                      disabled
                      value={currentUser.email}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070d0a] border border-white/10 text-neutral-300 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Account Role</label>
                    <input
                      type="text"
                      disabled
                      value={currentUser.role}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070d0a] border border-white/10 text-neutral-300 text-xs uppercase"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Member Since</label>
                    <input
                      type="text"
                      disabled
                      value={currentUser.memberSince}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070d0a] border border-white/10 text-neutral-300 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Account Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-[#0b1510] border border-[#2d5a47]/50 rounded-3xl p-6 sm:p-8 space-y-6">
                <h2 className="text-xl font-bold text-white font-['Montserrat']">Streaming & Notification Preferences</h2>
                <div className="space-y-4 text-xs">
                  <label className="flex items-center justify-between p-4 rounded-xl bg-[#070d0a] border border-white/5 cursor-pointer">
                    <div>
                      <div className="text-white font-semibold">Default 4K Ultra HD Quality</div>
                      <div className="text-neutral-400 text-[11px]">Stream at maximum resolution when bandwidth allows</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded text-emerald-500 focus:ring-0" />
                  </label>

                  <label className="flex items-center justify-between p-4 rounded-xl bg-[#070d0a] border border-white/5 cursor-pointer">
                    <div>
                      <div className="text-white font-semibold">Monthly Conservation Dispatch</div>
                      <div className="text-neutral-400 text-[11px]">Receive field telemetry and new film release alerts</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded text-emerald-500 focus:ring-0" />
                  </label>
                </div>
              </div>
            )}

            {/* Change Password Tab */}
            {activeTab === 'password' && (
              <div className="bg-[#0b1510] border border-[#2d5a47]/50 rounded-3xl p-6 sm:p-8 space-y-6 max-w-lg">
                <h2 className="text-xl font-bold text-white font-['Montserrat']">Change Password</h2>

                {passwordSuccess && (
                  <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Your password has been successfully updated.</span>
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Current Password</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070d0a] border border-[#2d5a47] text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#070d0a] border border-[#2d5a47] text-white text-xs"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070d0a] font-bold text-xs uppercase tracking-wider"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
