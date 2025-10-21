import React, { useState, useMemo, createContext, useContext, useEffect } from 'react';
import { awliyaData as initialAwliyaData } from './data/awliya';
import { useFavorites } from './hooks/useFavorites';
import { getIslamicDateString } from './utils/date';
import HomeScreen from './components/HomeScreen';
import AwliyaListScreen from './components/AwliyaListScreen';
import WaliProfileScreen from './components/WaliProfileScreen';
import FavoritesScreen from './components/FavoritesScreen';
import SettingsModal from './components/SettingsModal';
import AdminScreen from './components/AdminScreen';
import AdminLoginModal from './components/AdminLoginModal';
import { HomeIcon, LibraryIcon, HeartIcon, SettingsIcon } from './components/icons';
import { AdminIcon } from './components/icons';
import { Wali } from './types';

type View = 'home' | 'list' | 'profile' | 'favorites' | 'admin';
type FontSize = 'sm' | 'base' | 'lg';

interface AppState {
  view: View;
  selectedWaliId: number | null;
  searchQuery: string;
}

// --- CONTEXTS ---
interface SettingsContextType {
  fontSize: FontSize;
}
export const SettingsContext = createContext<SettingsContextType>({ fontSize: 'base' });

interface AdminContextType {
  isAdmin: boolean;
  openLoginModal: () => void;
  logout: () => void;
}
export const AdminContext = createContext<AdminContextType | null>(null);

// --- HOOKS ---
const usePersistentState = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error(`Error reading from localStorage key “${key}”:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error writing to localStorage key “${key}”:`, error);
    }
  }, [key, state]);

  return [state, setState];
};

// --- APP COMPONENT ---
const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    view: 'home',
    selectedWaliId: null,
    searchQuery: '',
  });

  const [favoriteIds, toggleFavorite] = useFavorites();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>('base');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Admin and Data Management
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('isAdmin') === 'true');
  const [allAwliya, setAllAwliya] = usePersistentState<Wali[]>('awliyaData', initialAwliyaData);
  const [featuredAwliyaIds, setFeaturedAwliyaIds] = usePersistentState<number[]>('featuredAwliyaIds', [1, 2, 3]);

  const handleLoginAttempt = (password: string) => {
    if (password === "loversofgod") {
      sessionStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      alert("Login successful!");
      setIsLoginModalOpen(false);
      setIsSettingsOpen(false);
      navigate('admin');
    } else {
      alert("Incorrect password.");
    }
  };

  const logout = () => {
    sessionStorage.removeItem('isAdmin');
    setIsAdmin(false);
    alert("You have been logged out.");
    setIsSettingsOpen(false);
    navigate('home');
  };

  const navigate = (view: View, waliId: number | null = null, query: string = '') => {
    setAppState({ view, selectedWaliId: waliId, searchQuery: query });
    window.scrollTo(0, 0);
  };
  
  const handleAddWali = (newWaliData: Omit<Wali, 'id'>) => {
    setAllAwliya(prev => {
      const newId = prev.length > 0 ? Math.max(...prev.map(w => w.id)) + 1 : 1;
      const newWali: Wali = { ...newWaliData, id: newId };
      return [...prev, newWali];
    });
  };

  const selectedWali = useMemo(() => {
    if (appState.view === 'profile' && appState.selectedWaliId !== null) {
      return allAwliya.find(w => w.id === appState.selectedWaliId) || null;
    }
    return null;
  }, [appState.view, appState.selectedWaliId, allAwliya]);

  const favoriteAwliya = useMemo(() => {
    return allAwliya.filter(wali => favoriteIds.includes(wali.id));
  }, [favoriteIds, allAwliya]);
  
  const todaysRemembrance = useMemo(() => {
    if (!allAwliya || allAwliya.length === 0) {
      return { wali: null, isAnniversary: false };
    }
    const todayIslamic = getIslamicDateString();
    const anniversaryWali = allAwliya.find(w => w.deathDate === todayIslamic);

    if (anniversaryWali) {
      return { wali: anniversaryWali, isAnniversary: true };
    }
    
    // Fallback logic if no anniversary today
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const fallbackWali = allAwliya[dayOfYear % allAwliya.length];
    return { wali: fallbackWali, isAnniversary: false };
  }, [allAwliya]);


  const featuredAwliya = useMemo(() => {
     return featuredAwliyaIds.map(id => allAwliya.find(w => w.id === id)).filter((w): w is Wali => w !== undefined);
  }, [allAwliya, featuredAwliyaIds]);


  const renderContent = () => {
    switch (appState.view) {
      case 'home':
        return <HomeScreen 
            onSearch={(query) => navigate('list', null, query)}
            onSelectWali={(id) => navigate('profile', id)}
            todaysRemembrance={todaysRemembrance.wali}
            isAnniversary={todaysRemembrance.isAnniversary}
            featuredAwliya={featuredAwliya}
        />;
      case 'list':
        return <AwliyaListScreen 
            awliya={allAwliya}
            onSelectWali={(id) => navigate('profile', id)}
            initialSearchQuery={appState.searchQuery}
        />;
      case 'profile':
        if (selectedWali) {
          return <WaliProfileScreen
            wali={selectedWali}
            onBack={() => navigate('list')}
            isFavorite={favoriteIds.includes(selectedWali.id)}
            onToggleFavorite={toggleFavorite}
          />;
        }
        return null;
       case 'favorites':
        return <FavoritesScreen 
            favoriteAwliya={favoriteAwliya}
            onSelectWali={(id) => navigate('profile', id)}
        />;
       case 'admin':
         if (isAdmin) {
            return <AdminScreen 
              allAwliya={allAwliya}
              featuredIds={featuredAwliyaIds}
              onAddWali={handleAddWali}
              onSetFeatured={setFeaturedAwliyaIds}
            />;
         }
        return null; // or redirect to home
      default:
        return <HomeScreen onSearch={(query) => navigate('list', null, query)} onSelectWali={(id) => navigate('profile', id)} todaysRemembrance={todaysRemembrance.wali} isAnniversary={todaysRemembrance.isAnniversary} featuredAwliya={featuredAwliya} />;
    }
  };
  
  const fontSizeClass = { sm: 'text-sm', base: 'text-base', lg: 'text-lg' }[fontSize];

  return (
    <AdminContext.Provider value={{ isAdmin, openLoginModal: () => setIsLoginModalOpen(true), logout }}>
      <SettingsContext.Provider value={{ fontSize }}>
          <div className={`min-h-screen flex flex-col font-sans ${fontSizeClass}`}>
          <main className="flex-grow pb-20">
              {renderContent()}
          </main>
          
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-t-lg z-10">
              <div className="flex justify-around max-w-3xl mx-auto">
              <NavItem icon={<HomeIcon className="w-6 h-6" />} label="Home" isActive={appState.view === 'home'} onClick={() => navigate('home')} />
              <NavItem icon={<LibraryIcon className="w-6 h-6" />} label="Library" isActive={appState.view === 'list'} onClick={() => navigate('list')} />
              <NavItem icon={<HeartIcon className="w-6 h-6" />} label="Favorites" isActive={appState.view === 'favorites'} onClick={() => navigate('favorites')} />
              {isAdmin && <NavItem icon={<AdminIcon className="w-6 h-6" />} label="Admin" isActive={appState.view === 'admin'} onClick={() => navigate('admin')} />}
              <NavItem icon={<SettingsIcon className="w-6 h-6" />} label="Settings" isActive={isSettingsOpen} onClick={() => setIsSettingsOpen(true)} />
              </div>
          </nav>
          
          <SettingsModal 
              isOpen={isSettingsOpen}
              onClose={() => setIsSettingsOpen(false)}
              fontSize={fontSize}
              setFontSize={setFontSize}
              notificationsEnabled={notificationsEnabled}
              setNotificationsEnabled={setNotificationsEnabled}
          />

          <AdminLoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onLoginAttempt={handleLoginAttempt}
          />
          </div>
      </SettingsContext.Provider>
    </AdminContext.Provider>
  );
};

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`relative flex flex-col items-center justify-center p-3 w-24 transition-colors duration-200 ${isActive ? 'text-green-700' : 'text-gray-500 hover:text-green-600'}`}>
        {icon}
        <span className="text-xs mt-1">{label}</span>
        {isActive && <div className="absolute bottom-0 w-10 h-1 bg-green-700 rounded-t-full"></div>}
    </button>
);

export default App;