import React, { useState, useRef } from 'react';
import {
  Plus,
  Edit3,
  Trash2,
  Video as VideoIcon,
  CheckCircle2,
  DollarSign,
  Save,
  X,
  ExternalLink,
  ShieldCheck,
  Lock,
  Mail,
  ArrowLeft,
  LogOut,
  Upload,
  Play,
  Image as ImageIcon,
  FolderPlus,
  Layers,
  Sparkles,
  Eye,
  Tag
} from 'lucide-react';
import { useApp, ADMIN_CREDENTIALS } from '../context/AppContext';
import { Video, VideoCategory, CategoryItem } from '../types';
import { BrandLogo } from './BrandLogo';
import { UniversalVideoPlayer } from '../utils/videoUtils';

export const AdminVideoManager: React.FC = () => {
  const {
    videos,
    categories,
    addOrUpdateVideo,
    deleteVideo,
    addCategory,
    updateCategory,
    deleteCategory,
    navigateTo,
    currentUser,
    login,
    logout,
  } = useApp();

  // Active top-level admin tab: 'videos' or 'categories'
  const [activeTab, setActiveTab] = useState<'videos' | 'categories'>('videos');

  // Video Management States
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Video file upload state
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Thumbnail image upload state (Direct image upload facility)
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedImageName, setUploadedImageName] = useState('');
  const [isDraggingImage, setIsDraggingImage] = useState(false);

  // Admin login form state for gated access
  const [gateEmail, setGateEmail] = useState<string>(ADMIN_CREDENTIALS.email);
  const [gatePassword, setGatePassword] = useState<string>('');
  const [gateError, setGateError] = useState('');

  // Video Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [category, setCategory] = useState<VideoCategory>('wildlife');
  const [duration, setDuration] = useState('45 min');
  const [isPremium, setIsPremium] = useState(false);
  const [price, setPrice] = useState(0);
  const [vimeoId, setVimeoId] = useState('76979871');
  const [vimeoOttUrl, setVimeoOttUrl] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [unlockUrl, setUnlockUrl] = useState('');
  const [previewTrailerModal, setPreviewTrailerModal] = useState<string | null>(null);
  const [featured, setFeatured] = useState(false);
  const [location, setLocation] = useState('Maasai Mara, Kenya');
  const [director, setDirector] = useState('WildEarth Field Team');
  const [tagsStr, setTagsStr] = useState('Lions, Savannah, Predators');

  // Category Management States (for revising or introducing new categories)
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryItem | null>(null);
  const [catTitle, setCatTitle] = useState('');
  const [catId, setCatId] = useState('');
  const [catDescription, setCatDescription] = useState('');
  const [catImage, setCatImage] = useState('');
  const [catUploadedImageName, setCatUploadedImageName] = useState('');
  const [isDraggingCatImage, setIsDraggingCatImage] = useState(false);
  const catImageInputRef = useRef<HTMLInputElement | null>(null);

  const handleGateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setGateError('');

    const res = login(gateEmail, gatePassword, 'admin');
    if (!res.success) {
      setGateError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  // If not logged in as admin, display the dedicated Administrator Login Portal
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-[#070d0a]">
        <div className="max-w-md w-full bg-[#0b1510] border border-[#2d5a47] rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="flex justify-center mb-2">
            <BrandLogo size="md" variant="light" />
          </div>
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400 shadow-inner">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold text-white font-['Montserrat']">
              Administrator Access Required
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Only the authorized administrator account can access and manage Custom Post Type Videos, Categories, and Payment Gateway Links.
            </p>
          </div>

          {gateError && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs text-center">
              {gateError}
            </div>
          )}

          <form onSubmit={handleGateLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                Administrator Gmail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={gateEmail}
                  onChange={(e) => setGateEmail(e.target.value)}
                  placeholder="wccvod@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#070d0a] border border-[#2d5a47] focus:border-amber-400 focus:outline-none text-white text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-neutral-300 block mb-1.5">
                Administrator Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={gatePassword}
                  onChange={(e) => setGatePassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#070d0a] border border-[#2d5a47] focus:border-amber-400 focus:outline-none text-white text-xs font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#070d0a] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-950/40"
            >
              Log In as Administrator
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => navigateTo('home')}
              className="text-xs text-neutral-400 hover:text-white inline-flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Video Form Helpers
  const startCreate = () => {
    setIsCreatingNew(true);
    setEditingVideo(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setLongDescription('');
    setThumbnail('https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80');
    setCategory(categories[0]?.id || 'wildlife');
    setDuration('45 min');
    setIsPremium(false);
    setPrice(0);
    setVimeoId('76979871');
    setVimeoOttUrl('');
    setTrailerUrl('');
    setUnlockUrl('');
    setUploadedFileName('');
    setUploadedImageName('');
    setFeatured(false);
    setLocation('Maasai Mara, Kenya');
    setDirector('WildEarth Field Team');
    setTagsStr('Lions, Savannah, Predators');
  };

  const startEdit = (vid: Video) => {
    setEditingVideo(vid);
    setIsCreatingNew(false);
    setTitle(vid.title);
    setSlug(vid.slug);
    setDescription(vid.description);
    setLongDescription(vid.longDescription);
    setThumbnail(vid.thumbnail);
    setCategory(vid.category);
    setDuration(vid.duration);
    setIsPremium(vid.isPremium);
    setPrice(vid.price);
    setVimeoId(vid.vimeoId);
    setVimeoOttUrl(vid.vimeoOttUrl || '');
    setTrailerUrl(vid.trailerUrl || '');
    setUnlockUrl(vid.unlockUrl || '');
    setUploadedFileName('');
    setUploadedImageName('');
    setFeatured(vid.featured);
    setLocation(vid.location);
    setDirector(vid.director);
    setTagsStr(vid.tags.join(', '));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const objectUrl = URL.createObjectURL(file);
    setVimeoId(objectUrl);
    setUploadedFileName(file.name);

    const tempVideo = document.createElement('video');
    tempVideo.preload = 'metadata';
    tempVideo.src = objectUrl;
    tempVideo.onloadedmetadata = () => {
      const totalSec = Math.round(tempVideo.duration);
      if (totalSec && !isNaN(totalSec)) {
        const mins = Math.floor(totalSec / 60);
        const secs = totalSec % 60;
        setDuration(mins > 0 ? `${mins} min ${secs > 0 ? `${secs} sec` : ''}`.trim() : `${secs} sec`);
      }
      setIsUploading(false);
    };
    tempVideo.onerror = () => {
      setIsUploading(false);
    };
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImageName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          setThumbnail(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const isDirectVideo =
      vimeoId.startsWith('blob:') ||
      vimeoId.startsWith('data:') ||
      /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(vimeoId);

    const matchedCat = categories.find((c) => c.id === category);

    const videoObj: Video = {
      id: editingVideo ? editingVideo.id : 'vid-' + Date.now(),
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description,
      longDescription: longDescription || description,
      thumbnail,
      category,
      categoryName: matchedCat ? matchedCat.title : category,
      duration,
      releaseDate: editingVideo ? editingVideo.releaseDate : new Date().toISOString().split('T')[0],
      isPremium,
      price: isPremium ? Number(price) : 0,
      vimeoId,
      vimeoOttUrl: vimeoOttUrl.trim() || undefined,
      trailerUrl: trailerUrl.trim() || undefined,
      unlockUrl: unlockUrl.trim() || undefined,
      previewUrl: isDirectVideo
        ? vimeoId
        : editingVideo
        ? editingVideo.previewUrl
        : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      featured,
      isLatest: true,
      tags: tagsStr.split(',').map((t) => t.trim()).filter(Boolean),
      species: editingVideo ? editingVideo.species : ['Panthera leo'],
      location,
      director,
      resolution: '4K UHD',
      rating: 5.0,
      reviewsCount: 1,
      viewsCount: '1.2k',
      audioTracks: ['English 5.1'],
      published: true,
    };

    addOrUpdateVideo(videoObj);
    setIsCreatingNew(false);
    setEditingVideo(null);
    setSuccessMsg(`Video "${videoObj.title}" successfully saved!`);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  // Category Management Helpers
  const startCreateCategory = () => {
    setCategoryToEdit(null);
    setCatTitle('');
    setCatId('');
    setCatDescription('');
    setCatImage('https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80');
    setCatUploadedImageName('');
    setIsEditingCategory(true);
  };

  const startEditCategory = (cat: CategoryItem) => {
    setCategoryToEdit(cat);
    setCatTitle(cat.title);
    setCatId(cat.id);
    setCatDescription(cat.description);
    setCatImage(cat.image);
    setCatUploadedImageName('');
    setIsEditingCategory(true);
  };

  const handleCatImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCatUploadedImageName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          setCatImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const finalId = catId.trim()
      ? catId.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : catTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newCat: CategoryItem = {
      id: finalId,
      title: catTitle.trim(),
      description: catDescription.trim(),
      image: catImage.trim() || 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=80',
    };

    if (categoryToEdit) {
      updateCategory(newCat);
      setSuccessMsg(`Category "${newCat.title}" successfully revised!`);
    } else {
      addCategory(newCat);
      setSuccessMsg(`New category "${newCat.title}" successfully introduced!`);
    }

    setIsEditingCategory(false);
    setCategoryToEdit(null);
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const handleDeleteCategory = (cat: CategoryItem) => {
    const assignedCount = videos.filter((v) => v.category === cat.id).length;
    const confirmText = assignedCount > 0
      ? `Category "${cat.title}" has ${assignedCount} video(s) assigned to it. Are you sure you want to delete it?`
      : `Are you sure you want to delete category "${cat.title}"?`;

    if (window.confirm(confirmText)) {
      deleteCategory(cat.id);
      setSuccessMsg(`Category "${cat.title}" deleted.`);
      setTimeout(() => setSuccessMsg(''), 3500);
    }
  };

  return (
    <div className="min-h-screen py-10 bg-[#070d0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-3">
            <BrandLogo size="md" variant="light" />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-mono font-bold uppercase mb-2">
                <span>Admissions &amp; Content Management Portal</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white font-['Montserrat']">
                Documentary &amp; Category Control
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Manage documentary videos, upload media files, revise or introduce categories, and link custom payment gateways to the &quot;Unlock Full Film&quot; button.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="font-mono font-semibold">{currentUser?.email}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400 text-black font-bold uppercase">Admin</span>
            </div>
            <button
              onClick={() => logout()}
              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-300 border border-white/10 text-xs transition-colors"
              title="Log Out of Administrator"
            >
              <LogOut className="w-4 h-4" />
            </button>
            {activeTab === 'videos' ? (
              <button
                onClick={startCreate}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070d0a] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Video</span>
              </button>
            ) : (
              <button
                onClick={startCreateCategory}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070d0a] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
              >
                <FolderPlus className="w-4 h-4" />
                <span>Introduce New Category</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation: Videos vs Categories */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'videos'
                ? 'bg-emerald-500 text-[#070d0a] shadow-lg shadow-emerald-950/50'
                : 'bg-[#0b1510] text-neutral-400 hover:text-white border border-[#2d5a47]'
            }`}
          >
            <VideoIcon className="w-4 h-4" />
            <span>Documentary Videos ({videos.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              activeTab === 'categories'
                ? 'bg-emerald-500 text-[#070d0a] shadow-lg shadow-emerald-950/50'
                : 'bg-[#0b1510] text-neutral-400 hover:text-white border border-[#2d5a47]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Category Manager ({categories.length})</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
              Admissions Option
            </span>
          </button>
        </div>

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 1: VIDEOS & DOCUMENTARIES MANAGER */}
        {/* ============================================================== */}
        {activeTab === 'videos' && (
          <div className="space-y-8">
            {/* Modal / Inline Video Editor */}
            {(isCreatingNew || editingVideo) && (
              <div className="bg-[#0b1510] border border-[#2d5a47] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white font-['Montserrat']">
                      {isCreatingNew ? 'Add New Wildlife Video' : `Edit: ${editingVideo?.title}`}
                    </h2>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Configure film details, trailer URL, and payment gateway link for the &quot;Unlock Full Film&quot; button.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCreatingNew(false);
                      setEditingVideo(null);
                    }}
                    className="text-neutral-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-300 block mb-1 font-medium">Video Title</label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Kingdom of the Cheetah"
                        className="w-full px-3 py-2 rounded-xl bg-[#070d0a] border border-[#2d5a47] text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs text-neutral-300 font-medium">Video File Upload</label>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 transition-all px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 shadow-sm"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{isUploading ? 'Loading...' : 'Upload Video File'}</span>
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        value={vimeoId}
                        onChange={(e) => setVimeoId(e.target.value)}
                        placeholder="Vimeo Video ID or Direct URL"
                        className="w-full px-3 py-2 rounded-xl bg-[#070d0a] border border-[#2d5a47] text-white text-xs font-mono"
                      />
                      {uploadedFileName && (
                        <p className="text-[11px] text-emerald-400 font-mono mt-1">
                          ✓ File selected: {uploadedFileName}
                        </p>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-matroska,.mp4,.webm,.mov,.mkv,.m4v"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </div>

                    {/* Dynamic Category Selector */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs text-neutral-300 font-medium">Category</label>
                        <button
                          type="button"
                          onClick={() => setActiveTab('categories')}
                          className="text-[10px] text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <span>Manage Categories</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      </div>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#070d0a] border border-[#2d5a47] text-white text-xs focus:border-emerald-500 focus:outline-none"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-neutral-300 block mb-1 font-medium">Duration</label>
                      <input
                        type="text"
                        required
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g. 48 min"
                        className="w-full px-3 py-2 rounded-xl bg-[#070d0a] border border-[#2d5a47] text-white text-xs"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs text-neutral-200 font-semibold flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Thumbnail Image</span>
                        </label>
                        {uploadedImageName && (
                          <span className="text-[10px] text-emerald-400 font-mono truncate max-w-[140px]">
                            {uploadedImageName}
                          </span>
                        )}
                      </div>

                      <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/avif,image/svg+xml,image/*"
                        className="hidden"
                        onChange={handleImageFileUpload}
                      />

                      {thumbnail ? (
                        <div className="rounded-xl overflow-hidden border border-[#2d5a47] bg-[#070d0a] p-2 flex items-center gap-3">
                          <img
                            src={thumbnail}
                            alt="Uploaded thumbnail preview"
                            className="w-20 h-14 object-cover rounded-lg border border-white/10 shrink-0 bg-black"
                          />
                          <div className="flex-1 min-w-0 space-y-1">
                            <p className="text-xs font-semibold text-white truncate">
                              {uploadedImageName || 'Uploaded Image Active'}
                            </p>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => imageInputRef.current?.click()}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold transition-colors flex items-center gap-1"
                              >
                                <Upload className="w-3 h-3" />
                                <span>Change Image</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setThumbnail('');
                                  setUploadedImageName('');
                                }}
                                className="px-2 py-1 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 text-[11px] transition-colors"
                              >
                                Clear
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => imageInputRef.current?.click()}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsDraggingImage(true);
                          }}
                          onDragLeave={() => setIsDraggingImage(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setIsDraggingImage(false);
                            const file = e.dataTransfer.files?.[0];
                            if (file && file.type.startsWith('image/')) {
                              setUploadedImageName(file.name);
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (typeof event.target?.result === 'string') {
                                  setThumbnail(event.target.result);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className={`cursor-pointer rounded-xl border-2 border-dashed transition-all p-3.5 text-center flex flex-col items-center justify-center gap-1 ${
                            isDraggingImage
                              ? 'border-emerald-400 bg-emerald-950/30'
                              : 'border-[#2d5a47] bg-[#070d0a] hover:border-emerald-500/60 hover:bg-[#0c1812]'
                          }`}
                        >
                          <div className="w-7 h-7 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                            <Upload className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-semibold text-white">Click or drag &amp; drop to upload image directly</span>
                          <span className="text-[10px] text-neutral-400">PNG, JPG, WebP, AVIF accepted</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-xs text-neutral-300 block mb-1 font-medium">Filming Location</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#070d0a] border border-[#2d5a47] text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-300 block mb-1 font-medium">Short Synopsis</label>
                    <textarea
                      rows={2}
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#070d0a] border border-[#2d5a47] text-white text-xs"
                    />
                  </div>

                  {/* Official Trailer Link Feature */}
                  <div className="p-4 rounded-2xl bg-[#070d0a] border border-[#10b981]/50 space-y-3 shadow-lg shadow-emerald-950/20">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
                        <span>Official Trailer Link (For &quot;Watch Trailer&quot; Button)</span>
                      </label>
                      {trailerUrl && (
                        <button
                          type="button"
                          onClick={() => setPreviewTrailerModal(trailerUrl)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 text-[11px] font-semibold transition-colors"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Test Play Trailer</span>
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="https://player.vimeo.com/video/76979871, https://youtube.com/watch?v=..., or MP4 URL"
                      value={trailerUrl}
                      onChange={(e) => setTrailerUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b1510] border border-[#2d5a47] text-white text-xs font-mono placeholder:text-neutral-600 focus:outline-none focus:border-[#10b981]"
                    />
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Enter the trailer stream link (Vimeo URL, Vimeo ID, YouTube, or direct MP4). Visitors click <strong>&quot;Watch Trailer&quot;</strong> on the video page to stream this preview.
                    </p>
                  </div>

                  {/* Unlock Full Film Link (Payment Gateway Website Link) */}
                  <div className="p-4 rounded-2xl bg-[#070d0a] border border-amber-500/60 space-y-3 shadow-lg shadow-amber-950/30">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                        <span className="text-amber-300">Unlock Full Film URL (Payment Gateway Website)</span>
                      </label>
                      {unlockUrl && (
                        <a
                          href={unlockUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 text-[11px] font-semibold transition-colors"
                        >
                          <span>Test Gateway Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="url"
                      placeholder="https://your-payment-gateway-website.com/checkout/film-123"
                      value={unlockUrl}
                      onChange={(e) => setUnlockUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b1510] border border-amber-500/50 text-white text-xs font-mono placeholder:text-neutral-600 focus:outline-none focus:border-amber-400"
                    />
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      <strong>Payment Gateway Website Integration:</strong> No internal on-site checkout is required. Upload your video and link its payment gateway URL here. Clicking <strong>&quot;Unlock Full Film&quot;</strong> on the film page will redirect visitors to this gateway URL.
                    </p>
                  </div>

                  {/* Vimeo OTT Direct Watch / Purchase Link */}
                  <div className="p-4 rounded-2xl bg-[#070d0a] border border-[#00adef]/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-white flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00adef] animate-pulse" />
                        <span>Vimeo OTT / On Demand Stream Link (Optional Fallback)</span>
                      </label>
                      {vimeoOttUrl && (
                        <a
                          href={vimeoOttUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-[#00adef] hover:underline font-semibold"
                        >
                          <span>Open Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <input
                      type="url"
                      placeholder="https://vimeo.com/ondemand/your-film or https://watch.vimeo.com/..."
                      value={vimeoOttUrl}
                      onChange={(e) => setVimeoOttUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b1510] border border-[#2d5a47] text-white text-xs font-mono placeholder:text-neutral-600 focus:outline-none focus:border-[#00adef]"
                    />
                  </div>

                  {/* Pricing & Access Tier */}
                  <div className="p-4 rounded-2xl bg-[#070d0a] border border-[#2d5a47] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPremium}
                        onChange={(e) => setIsPremium(e.target.checked)}
                        className="rounded text-emerald-500 focus:ring-0 w-4 h-4"
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">Requires Purchase (&quot;Unlock Full Film&quot; Button)</span>
                        <span className="text-[11px] text-neutral-400">If unchecked, stream is free to all visitors</span>
                      </div>
                    </label>

                    {isPremium && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-300 font-medium">Display Price (USD):</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0.99"
                          value={price}
                          onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                          className="w-24 px-3 py-1.5 rounded-lg bg-[#0b1510] border border-amber-500 text-white text-xs font-bold font-mono"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingNew(false);
                        setEditingVideo(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070d0a] font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Video Post</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Video Table List */}
            <div className="bg-[#0b1510] border border-[#2d5a47]/50 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-white font-['Montserrat']">
                    All Videos ({videos.length})
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Click title to view single video page and verify &quot;Watch Trailer&quot; and &quot;Unlock Full Film&quot; buttons.
                  </p>
                </div>
                <span className="text-xs text-emerald-400 font-mono">
                  {videos.filter(v => v.isPremium).length} Premium · {videos.filter(v => !v.isPremium).length} Free
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#070d0a] text-neutral-400 uppercase tracking-wider border-b border-white/5">
                    <tr>
                      <th className="py-3 px-4">Thumbnail</th>
                      <th className="py-3 px-4">Title</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4">Access / Price</th>
                      <th className="py-3 px-4">Official Trailer</th>
                      <th className="py-3 px-4">Unlock Film Link</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-300">
                    {videos.map((vid) => (
                      <tr key={vid.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4">
                          <img
                            src={vid.thumbnail}
                            alt={vid.title}
                            className="w-14 h-9 rounded object-cover"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => navigateTo('single-video', { slug: vid.slug })}
                            className="font-bold text-white hover:text-emerald-400 text-left line-clamp-1 flex items-center gap-1"
                          >
                            <span>{vid.title}</span>
                            <ExternalLink className="w-3 h-3 text-neutral-500" />
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-medium">
                            {vid.categoryName}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono">{vid.duration}</td>
                        <td className="py-3 px-4">
                          {vid.isPremium ? (
                            <span className="font-bold text-amber-400 font-mono">
                              ${vid.price.toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-emerald-400 font-semibold">Free</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {vid.trailerUrl ? (
                            <button
                              type="button"
                              onClick={() => setPreviewTrailerModal(vid.trailerUrl || vid.previewUrl)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold transition-colors"
                              title="Play & test trailer stream"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>Test Trailer</span>
                            </button>
                          ) : (
                            <span className="text-[11px] text-neutral-500 italic">None set</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {vid.unlockUrl ? (
                            <a
                              href={vid.unlockUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 text-[11px] font-mono hover:bg-amber-500/25 transition-colors"
                              title={vid.unlockUrl}
                            >
                              <span className="truncate max-w-[120px]">
                                {vid.unlockUrl.replace(/^https?:\/\//, '')}
                              </span>
                              <ExternalLink className="w-3 h-3 flex-shrink-0" />
                            </a>
                          ) : vid.vimeoOttUrl ? (
                            <span className="text-[11px] text-[#00adef] font-mono">Vimeo OTT</span>
                          ) : (
                            <span className="text-[11px] text-neutral-500 italic">Pending gateway</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => startEdit(vid)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-neutral-300 hover:text-emerald-300"
                              title="Edit Video"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteVideo(vid.id)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-300 hover:text-red-400"
                              title="Delete Video"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: CATEGORY MANAGEMENT (ADMISSIONS SECTION OPTION) */}
        {/* ============================================================== */}
        {activeTab === 'categories' && (
          <div className="space-y-8">
            {/* Category Intro Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0b1510] to-[#070d0a] border border-[#2d5a47] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Admissions Option: Category Architecture</span>
                </div>
                <h2 className="text-xl font-bold text-white font-['Montserrat']">
                  Revise Existing Categories or Introduce New Taxonomies
                </h2>
                <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
                  Modify existing video categories, change titles, update cover images and descriptions, or introduce brand-new categories for newly uploaded documentary films.
                </p>
              </div>

              <button
                onClick={startCreateCategory}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070d0a] font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shrink-0"
              >
                <FolderPlus className="w-4 h-4" />
                <span>Introduce New Category</span>
              </button>
            </div>

            {/* Inline / Modal Category Editor */}
            {isEditingCategory && (
              <div className="bg-[#0b1510] border border-[#2d5a47] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Montserrat']">
                      {categoryToEdit ? `Revise Category: ${categoryToEdit.title}` : 'Introduce New Category'}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {categoryToEdit ? 'Update title, description, or cover image for this category' : 'Create a new category for tagging and organizing documentaries.'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsEditingCategory(false);
                      setCategoryToEdit(null);
                    }}
                    className="text-neutral-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveCategory} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-300 block mb-1 font-medium">Category Title</label>
                      <input
                        type="text"
                        required
                        value={catTitle}
                        onChange={(e) => {
                          setCatTitle(e.target.value);
                          if (!categoryToEdit && !catId) {
                            setCatId(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                          }
                        }}
                        placeholder="e.g. Marine Expeditions, Birds of Prey"
                        className="w-full px-3 py-2 rounded-xl bg-[#070d0a] border border-[#2d5a47] text-white text-xs focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-neutral-300 block mb-1 font-medium">
                        Category Identifier / Slug
                      </label>
                      <input
                        type="text"
                        required
                        value={catId}
                        disabled={!!categoryToEdit}
                        onChange={(e) => setCatId(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
                        placeholder="e.g. marine-expeditions"
                        className={`w-full px-3 py-2 rounded-xl bg-[#070d0a] border border-[#2d5a47] text-white text-xs font-mono ${
                          categoryToEdit ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      />
                      <span className="text-[10px] text-neutral-500 mt-0.5 block">
                        Used in URL routing: /category/{catId || 'slug'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-300 block mb-1 font-medium">Description</label>
                    <textarea
                      rows={2}
                      required
                      value={catDescription}
                      onChange={(e) => setCatDescription(e.target.value)}
                      placeholder="Brief synopsis of documentaries that belong to this category..."
                      className="w-full px-3 py-2 rounded-xl bg-[#070d0a] border border-[#2d5a47] text-white text-xs focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* Category Cover Image with Direct Upload */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs text-neutral-200 font-semibold flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Category Cover Banner Image</span>
                      </label>
                      {catUploadedImageName && (
                        <span className="text-[10px] text-emerald-400 font-mono truncate max-w-[140px]">
                          {catUploadedImageName}
                        </span>
                      )}
                    </div>

                    <input
                      ref={catImageInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCatImageFileUpload}
                    />

                    {catImage ? (
                      <div className="rounded-xl overflow-hidden border border-[#2d5a47] bg-[#070d0a] p-2 flex items-center gap-3">
                        <img
                          src={catImage}
                          alt="Category Cover Preview"
                          className="w-24 h-16 object-cover rounded-lg border border-white/10 shrink-0 bg-black"
                        />
                        <div className="flex-1 min-w-0 space-y-1">
                          <p className="text-xs font-semibold text-white truncate">
                            {catUploadedImageName || 'Category Cover Active'}
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => catImageInputRef.current?.click()}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold transition-colors flex items-center gap-1"
                            >
                              <Upload className="w-3 h-3" />
                              <span>Change Image</span>
                            </button>
                            <input
                              type="url"
                              value={catImage}
                              onChange={(e) => setCatImage(e.target.value)}
                              placeholder="Or paste external image URL..."
                              className="flex-1 px-2.5 py-1 rounded-lg bg-[#0b1510] border border-[#2d5a47] text-white text-[11px] font-mono focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => catImageInputRef.current?.click()}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDraggingCatImage(true);
                        }}
                        onDragLeave={() => setIsDraggingCatImage(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDraggingCatImage(false);
                          const file = e.dataTransfer.files?.[0];
                          if (file && file.type.startsWith('image/')) {
                            setCatUploadedImageName(file.name);
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (typeof event.target?.result === 'string') {
                                setCatImage(event.target.result);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className={`cursor-pointer rounded-xl border-2 border-dashed transition-all p-3.5 text-center flex flex-col items-center justify-center gap-1 ${
                          isDraggingCatImage
                            ? 'border-emerald-400 bg-emerald-950/30'
                            : 'border-[#2d5a47] bg-[#070d0a] hover:border-emerald-500/60 hover:bg-[#0c1812]'
                        }`}
                      >
                        <div className="w-7 h-7 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                          <Upload className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-semibold text-white">Click or drag &amp; drop category banner</span>
                        <span className="text-[10px] text-neutral-400">PNG, JPG, WebP accepted</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditingCategory(false);
                        setCategoryToEdit(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#070d0a] font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>{categoryToEdit ? 'Save Category Changes' : 'Introduce Category'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const assignedVideos = videos.filter((v) => v.category === cat.id);
                return (
                  <div
                    key={cat.id}
                    className="bg-[#0b1510] border border-[#2d5a47]/60 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-emerald-500/50 transition-all"
                  >
                    <div>
                      {/* Category Header Image */}
                      <div className="relative h-40 w-full overflow-hidden bg-black/60">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1510] via-transparent to-black/30" />
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-[11px] font-mono text-emerald-400 font-bold border border-white/10">
                          {assignedVideos.length} {assignedVideos.length === 1 ? 'Video' : 'Videos'}
                        </div>
                        <div className="absolute bottom-3 left-4">
                          <span className="px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/40 text-[10px] text-emerald-300 font-mono">
                            slug: {cat.id}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 space-y-2">
                        <h3 className="text-lg font-bold text-white font-['Montserrat']">
                          {cat.title}
                        </h3>
                        <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-white/5 bg-[#070d0a]/60 flex items-center justify-between gap-2">
                      <button
                        onClick={() => navigateTo('category', { category: cat.id })}
                        className="text-xs text-neutral-400 hover:text-emerald-400 flex items-center gap-1 font-semibold transition-colors"
                        title="View Category on Website"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview Page</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => startEditCategory(cat)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-neutral-200 hover:text-emerald-300 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Revise</span>
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-300 border border-white/10 transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal: Preview Trailer */}
        {previewTrailerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-3xl bg-[#0b1510] border border-[#2d5a47] rounded-3xl overflow-hidden shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Play className="w-4 h-4 text-emerald-400 fill-current" />
                  <span>Trailer Stream Verification</span>
                </div>
                <button
                  onClick={() => setPreviewTrailerModal(null)}
                  className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black">
                <UniversalVideoPlayer
                  source={previewTrailerModal}
                  title="Trailer Verification"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-400 pt-1 font-mono">
                <span className="truncate max-w-md">{previewTrailerModal}</span>
                <button
                  onClick={() => setPreviewTrailerModal(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
