
import React, { useContext } from 'react';
import { CloseIcon } from './icons';
import { AdminContext } from '../App';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  fontSize: 'sm' | 'base' | 'lg';
  setFontSize: (size: 'sm' | 'base' | 'lg') => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, fontSize, setFontSize, notificationsEnabled, setNotificationsEnabled }) => {
  const adminContext = useContext(AdminContext);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
          <CloseIcon className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-green-800 mb-6">Settings</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Font Size</h3>
            <div className="flex space-x-2">
              {(['sm', 'base', 'lg'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`px-4 py-2 rounded-md transition ${fontSize === size ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-green-100'}`}
                >
                  {size === 'sm' ? 'Small' : size === 'base' ? 'Medium' : 'Large'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Notifications</h3>
            <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
              <span className="text-gray-800">"Wali of the Day" Notification</span>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-14 h-8 rounded-full flex items-center transition-colors duration-300 ${notificationsEnabled ? 'bg-green-600' : 'bg-gray-300'}`}
              >
                <span
                  className={`inline-block w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${notificationsEnabled ? 'translate-x-7' : 'translate-x-1'}`}
                />
              </button>
            </div>
          </div>
          
          <div className="border-t pt-4">
             <h3 className="text-lg font-semibold text-gray-700 mb-2">Admin Area</h3>
              {adminContext?.isAdmin ? (
                <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                    <p className="text-green-800">You are logged in as admin.</p>
                    <button onClick={adminContext.logout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                        Logout
                    </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                    <p className="text-gray-800">Access content management.</p>
                    <button onClick={adminContext?.openLoginModal} className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition">
                        Admin Login
                    </button>
                </div>
              )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
