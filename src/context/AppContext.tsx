import React, { createContext, useContext, useState, useEffect } from 'react';
import { Video, VideoCategory, CategoryItem, User, CartItem, Order } from '../types';
import { INITIAL_VIDEOS } from '../data/initialVideos';
import marineWhaleImage from '../assets/images/wildlife_category_marine_1790306759421.jpg';
import forestNatureImage from '../assets/images/nature_category_forest_1790306772375.jpg';
import aiTechImage from '../assets/images/ai_wildlife_technology_1790306783625.jpg';
import {
  db,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from '../lib/firebase';

export const ADMIN_CREDENTIALS = {
  email: 'wccvod@gmail.com',
  password: 'wildlife426##VIDEO',
  name: 'WCC Administrator',
} as const;

export const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: 'wildlife',
    title: 'Wildlife',
    description: 'Discover wildlife stories, apex predators, and rare species from around the world.',
    image: marineWhaleImage,
  },
  {
    id: 'nature',
    title: 'Nature',
    description: 'Explore primeval forests, oceans, mountains and untouched natural environments.',
    image: forestNatureImage,
  },
  {
    id: 'conservation',
    title: 'Conservation',
    description: 'Witness frontline rangers and scientific programs preserving biodiversity.',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'ai-wildlife',
    title: 'AI & Wildlife',
    description: 'Explore the relationship between edge technology, bio-acoustics and conservation.',
    image: aiTechImage,
  },
];

interface AppContextType {
  videos: Video[];
  categories: CategoryItem[];
  currentRoute: string;
  currentVideoSlug: string | null;
  currentCategory: VideoCategory | null;
  searchQuery: string;
  isSearchOpen: boolean;
  isAuthOpen: boolean;
  authMode: 'login' | 'register';
  isCartOpen: boolean;
  currentUser: User | null;
  purchasedVideoIds: string[];
  wishlistIds: string[];
  watchHistory: { videoId: string; viewedAt: number }[];
  cart: CartItem[];
  orders: Order[];
  activeVideoPlayer: Video | null;
  currentFilter: string;
  setVideoFilter: (filter: string) => void;
  // Methods
  navigateTo: (route: string, params?: { slug?: string; category?: VideoCategory; filter?: string }) => void;
  openSearch: () => void;
  closeSearch: () => void;
  setSearchQuery: (query: string) => void;
  openAuth: (mode?: 'login' | 'register') => void;
  closeAuth: () => void;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (video: Video) => void;
  removeFromCart: (videoId: string) => void;
  clearCart: () => void;
  checkoutCart: (paymentMethod: string) => Order;
  directBuyNow: (video: Video) => void;
  isPurchased: (videoId: string) => boolean;
  toggleWishlist: (videoId: string) => void;
  isInWishlist: (videoId: string) => boolean;
  openVideoPlayer: (video: Video) => void;
  closeVideoPlayer: () => void;
  login: (email: string, password?: string, role?: 'subscriber' | 'admin') => { success: boolean; error?: string };
  logout: () => void;
  addOrUpdateVideo: (video: Video) => void;
  deleteVideo: (videoId: string) => void;
  addCategory: (category: CategoryItem) => void;
  updateCategory: (category: CategoryItem) => void;
  deleteCategory: (categoryId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: 'usr-001',
  name: 'Marcus Thorne',
  email: 'marcus.wildlife@example.com',
  role: 'subscriber',
  memberSince: 'March 2026',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load videos from localStorage or initial
  const [videos, setVideos] = useState<Video[]>(() => {
    try {
      const saved = localStorage.getItem('wildearth_videos');
      if (saved) {
        const parsed: Video[] = JSON.parse(saved);
        return parsed.map((v) => {
          const match = INITIAL_VIDEOS.find((iv) => iv.id === v.id);
          return {
            ...v,
            vimeoOttUrl: v.vimeoOttUrl || match?.vimeoOttUrl || `https://vimeo.com/ondemand/${v.slug || 'wildlife'}`,
            trailerUrl: v.trailerUrl || match?.trailerUrl || v.previewUrl || 'https://player.vimeo.com/video/76979871',
            unlockUrl: v.unlockUrl || match?.unlockUrl || v.vimeoOttUrl || `https://vimeo.com/ondemand/${v.slug || 'wildlife'}`,
          };
        });
      }
      return INITIAL_VIDEOS;
    } catch {
      return INITIAL_VIDEOS;
    }
  });

  // Dynamic Categories: Loaded from localStorage or defaults, synced with Firestore
  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('wildearth_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  // Sync categories from Firestore live collection
  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(
        collection(db, 'categories'),
        (snapshot) => {
          if (!snapshot.empty) {
            const remoteCats: CategoryItem[] = [];
            snapshot.forEach((docSnap) => {
              remoteCats.push(docSnap.data() as CategoryItem);
            });
            setCategories(remoteCats);
            try {
              localStorage.setItem('wildearth_categories', JSON.stringify(remoteCats));
            } catch {
              // ignore
            }
          }
        },
        (error) => {
          console.warn('Firestore categories listener info:', error);
        }
      );
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firestore categories init note:', e);
    }
  }, []);

  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [currentVideoSlug, setCurrentVideoSlug] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<VideoCategory | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('wildearth_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.role === 'admin' && parsed.email?.toLowerCase().trim() === ADMIN_CREDENTIALS.email.toLowerCase()) {
          return parsed;
        }
      }
      return null;
    } catch {
      return null;
    }
  });

  // Sync videos from Firebase Firestore collection
  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(
        collection(db, 'videos'),
        (snapshot) => {
          if (!snapshot.empty) {
            const remoteVideos: Video[] = [];
            snapshot.forEach((docSnap) => {
              remoteVideos.push(docSnap.data() as Video);
            });
            setVideos(remoteVideos);
            try {
              localStorage.setItem('wildearth_videos', JSON.stringify(remoteVideos));
            } catch {
              // ignore storage limit
            }
          }
        },
        (error) => {
          console.warn('Firestore live listener info:', error);
        }
      );
      return () => unsubscribe();
    } catch (e) {
      console.warn('Firestore init note:', e);
    }
  }, []);

  const [purchasedVideoIds, setPurchasedVideoIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('wildearth_purchases');
      // Default to having purchased the Serengeti documentary as an example
      return saved ? JSON.parse(saved) : ['vid-01'];
    } catch {
      return ['vid-01'];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('wildearth_wishlist');
      return saved ? JSON.parse(saved) : ['vid-04', 'vid-09'];
    } catch {
      return ['vid-04', 'vid-09'];
    }
  });

  const [watchHistory, setWatchHistory] = useState<{ videoId: string; viewedAt: number }[]>(() => {
    try {
      const saved = localStorage.getItem('wildearth_history');
      return saved ? JSON.parse(saved) : [
        { videoId: 'vid-02', viewedAt: Date.now() - 3600000 * 24 },
        { videoId: 'vid-03', viewedAt: Date.now() - 3600000 * 48 }
      ];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeVideoPlayer, setActiveVideoPlayer] = useState<Video | null>(null);

  // Sync to storage
  useEffect(() => {
    try {
      localStorage.setItem('wildearth_videos', JSON.stringify(videos));
    } catch (e) {
      console.error(e);
    }
  }, [videos]);

  useEffect(() => {
    try {
      localStorage.setItem('wildearth_purchases', JSON.stringify(purchasedVideoIds));
    } catch (e) {
      console.error(e);
    }
  }, [purchasedVideoIds]);

  useEffect(() => {
    try {
      localStorage.setItem('wildearth_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('wildearth_user', JSON.stringify(currentUser));
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const navigateTo = (
    route: string,
    params?: { slug?: string; category?: VideoCategory; filter?: string }
  ) => {
    setCurrentRoute(route);
    if (params?.slug) setCurrentVideoSlug(params.slug);
    if (params?.category) setCurrentCategory(params.category);
    if (params?.filter) {
      setCurrentFilter(params.filter);
    } else if (route !== 'videos') {
      setCurrentFilter('all');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setVideoFilter = (filter: string) => {
    setCurrentFilter(filter);
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };
  const closeAuth = () => setIsAuthOpen(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (video: Video) => {
    if (video.isPremium && !purchasedVideoIds.includes(video.id)) {
      if (!cart.some(item => item.video.id === video.id)) {
        setCart(prev => [...prev, { video, addedAt: Date.now() }]);
      }
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (videoId: string) => {
    setCart(prev => prev.filter(item => item.video.id !== videoId));
  };

  const clearCart = () => setCart([]);

  const isPurchased = (videoId: string): boolean => {
    const video = videos.find(v => v.id === videoId);
    if (!video || !video.isPremium) return true; // Free videos are accessible
    return purchasedVideoIds.includes(videoId);
  };

  const checkoutCart = (paymentMethod: string): Order => {
    const items = cart.map(c => c.video);
    const total = items.reduce((sum, item) => sum + item.price, 0);
    const order: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: 'WE-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString().split('T')[0],
      items,
      total,
      paymentMethod,
      status: 'completed',
    };

    setOrders(prev => [order, ...prev]);
    // Unlock purchased videos
    const newUnlocked = items.map(v => v.id);
    setPurchasedVideoIds(prev => Array.from(new Set([...prev, ...newUnlocked])));
    setCart([]);
    return order;
  };

  const directBuyNow = (video: Video) => {
    if (!cart.some(item => item.video.id === video.id)) {
      setCart([{ video, addedAt: Date.now() }]);
    }
    setIsCartOpen(true);
  };

  const toggleWishlist = (videoId: string) => {
    setWishlistIds(prev =>
      prev.includes(videoId) ? prev.filter(id => id !== videoId) : [...prev, videoId]
    );
  };

  const isInWishlist = (videoId: string) => wishlistIds.includes(videoId);

  const openVideoPlayer = (video: Video) => {
    setActiveVideoPlayer(video);
    setWatchHistory(prev => [
      { videoId: video.id, viewedAt: Date.now() },
      ...prev.filter(item => item.videoId !== video.id)
    ]);
  };

  const closeVideoPlayer = () => setActiveVideoPlayer(null);

  const login = (
    email: string,
    password?: string,
    _requestedRole?: 'subscriber' | 'admin'
  ): { success: boolean; error?: string } => {
    const cleanEmail = email.trim();
    const isTargetAdmin = cleanEmail.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase();

    // Strictly enforce admin-only login
    if (!isTargetAdmin) {
      return {
        success: false,
        error: `Access restricted: Only the authorized administrator (${ADMIN_CREDENTIALS.email}) can log in.`,
      };
    }

    if (password !== ADMIN_CREDENTIALS.password) {
      return {
        success: false,
        error: 'Invalid administrator password. Access restricted to authorized personnel.',
      };
    }

    // Authenticate with Firebase Auth asynchronously
    signInWithEmailAndPassword(auth, cleanEmail, password || '').catch((authErr) => {
      // If user does not exist in Firebase Auth yet, provision them
      if (authErr?.code === 'auth/user-not-found' || authErr?.code === 'auth/invalid-credential') {
        createUserWithEmailAndPassword(auth, cleanEmail, password || '').catch((createErr) => {
          console.warn('Firebase user provision notice:', createErr);
        });
      }
    });

    const adminUser: User = {
      id: 'usr-admin-wcc',
      name: ADMIN_CREDENTIALS.name,
      email: ADMIN_CREDENTIALS.email,
      role: 'admin',
      memberSince: 'September 2026',
    };
    setCurrentUser(adminUser);
    try {
      localStorage.setItem('wildearth_user', JSON.stringify(adminUser));
    } catch {
      // ignore
    }
    setIsAuthOpen(false);
    return { success: true };
  };

  const logout = () => {
    try {
      signOut(auth).catch(() => {});
    } catch {
      // ignore
    }
    setCurrentUser(null);
    try {
      localStorage.removeItem('wildearth_user');
    } catch {
      // ignore
    }
  };

  const addOrUpdateVideo = (video: Video) => {
    // 1. Update in-memory state
    setVideos(prev => {
      const exists = prev.some(v => v.id === video.id);
      const updated = exists ? prev.map(v => (v.id === video.id ? video : v)) : [video, ...prev];
      try {
        localStorage.setItem('wildearth_videos', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    // 2. Persist to Firestore
    try {
      setDoc(doc(db, 'videos', video.id), video, { merge: true }).catch((err) => {
        console.warn('Firestore write warning:', err);
      });
    } catch (e) {
      console.warn('Firestore sync note:', e);
    }
  };

  const deleteVideo = (videoId: string) => {
    // 1. Update in-memory state
    setVideos(prev => {
      const updated = prev.filter(v => v.id !== videoId);
      try {
        localStorage.setItem('wildearth_videos', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    // 2. Remove from Firestore
    try {
      deleteDoc(doc(db, 'videos', videoId)).catch((err) => {
        console.warn('Firestore delete warning:', err);
      });
    } catch (e) {
      console.warn('Firestore sync note:', e);
    }
  };

  const addCategory = (category: CategoryItem) => {
    setCategories((prev) => {
      const exists = prev.some((c) => c.id === category.id);
      const updated = exists ? prev.map((c) => (c.id === category.id ? category : c)) : [...prev, category];
      try {
        localStorage.setItem('wildearth_categories', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    try {
      setDoc(doc(db, 'categories', category.id), category, { merge: true }).catch((err) => {
        console.warn('Firestore category write warning:', err);
      });
    } catch (e) {
      console.warn('Firestore category write note:', e);
    }
  };

  const updateCategory = (category: CategoryItem) => {
    addCategory(category);
  };

  const deleteCategory = (categoryId: string) => {
    setCategories((prev) => {
      const updated = prev.filter((c) => c.id !== categoryId);
      try {
        localStorage.setItem('wildearth_categories', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    try {
      deleteDoc(doc(db, 'categories', categoryId)).catch((err) => {
        console.warn('Firestore category delete warning:', err);
      });
    } catch (e) {
      console.warn('Firestore category delete note:', e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        videos,
        categories,
        currentRoute,
        currentVideoSlug,
        currentCategory,
        searchQuery,
        isSearchOpen,
        isAuthOpen,
        authMode,
        isCartOpen,
        currentUser,
        purchasedVideoIds,
        wishlistIds,
        watchHistory,
        cart,
        orders,
        activeVideoPlayer,
        currentFilter,
        setVideoFilter,
        navigateTo,
        openSearch,
        closeSearch,
        setSearchQuery,
        openAuth,
        closeAuth,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        clearCart,
        checkoutCart,
        directBuyNow,
        isPurchased,
        toggleWishlist,
        isInWishlist,
        openVideoPlayer,
        closeVideoPlayer,
        login,
        logout,
        addOrUpdateVideo,
        deleteVideo,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
