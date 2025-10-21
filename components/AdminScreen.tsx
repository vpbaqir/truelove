import React, { useState } from 'react';
import { Wali, Region, Century, Tariqa } from '../types';

interface AdminScreenProps {
  allAwliya: Wali[];
  featuredIds: number[];
  onAddWali: (wali: Omit<Wali, 'id'>) => void;
  onSetFeatured: (ids: number[]) => void;
}

const initialFormState: Omit<Wali, 'id'> = {
  name: '', title: '', honorifics: 'R.A.', biography: '',
  teachings: [''], stories: [{ title: '', story: '' }],
  maqamLocation: '', maqamGmapsUrl: '',
  region: Region.SOUTH_ASIA, century: Century.C7_HIJRI, tariqa: Tariqa.NONE,
  deathDate: '',
};

const AdminScreen: React.FC<AdminScreenProps> = ({ allAwliya, featuredIds, onAddWali, onSetFeatured }) => {
  const [activeTab, setActiveTab] = useState('manage');
  const [formState, setFormState] = useState(initialFormState);

  const [managedFeatured, setManagedFeatured] = useState<Set<number>>(new Set(featuredIds));

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  // --- Teachings Handlers ---
  const handleTeachingChange = (index: number, value: string) => {
    setFormState(prev => ({
        ...prev,
        teachings: prev.teachings.map((t, i) => i === index ? value : t)
    }));
  };

  const addTeaching = () => {
    setFormState(prev => ({ ...prev, teachings: [...prev.teachings, ''] }));
  };

  const removeTeaching = (index: number) => {
    setFormState(prev => {
        if (prev.teachings.length <= 1) return prev;
        return { ...prev, teachings: prev.teachings.filter((_, i) => i !== index) };
    });
  };

  // --- Stories Handlers ---
  const handleStoryChange = (index: number, part: 'title' | 'story', value: string) => {
    setFormState(prev => ({
        ...prev,
        stories: prev.stories.map((s, i) => i === index ? { ...s, [part]: value } : s)
    }));
  };
  
  const addStory = () => {
    setFormState(prev => ({ ...prev, stories: [...prev.stories, { title: '', story: '' }] }));
  };
  
  const removeStory = (index: number) => {
    setFormState(prev => {
        if (prev.stories.length <= 1) return prev;
        return { ...prev, stories: prev.stories.filter((_, i) => i !== index) };
    });
  };


  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddWali(formState);
    alert(`${formState.name} has been added!`);
    setFormState(initialFormState);
    setActiveTab('manage');
  };
  
  const handleFeaturedChange = (id: number) => {
    setManagedFeatured(prev => {
        const newSet = new Set(prev);
        if(newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        return newSet;
    })
  }
  
  const handleSaveManagement = () => {
    onSetFeatured(Array.from(managedFeatured));
    alert('Home page settings saved!');
  }
  
  const commonInputClass = "w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-50 transition-shadow shadow-sm";
  const commonLabelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Admin Panel</h1>
      <div className="flex justify-center border-b mb-6">
          <button onClick={() => setActiveTab('manage')} className={`px-6 py-3 text-lg font-semibold ${activeTab === 'manage' ? 'border-b-4 border-green-700 text-green-700' : 'text-gray-500'}`} title="Set the Wali of the Day and Featured Awliya for the home screen.">Manage Home</button>
          <button onClick={() => setActiveTab('add')} className={`px-6 py-3 text-lg font-semibold ${activeTab === 'add' ? 'border-b-4 border-green-700 text-green-700' : 'text-gray-500'}`} title="Add a new saint's biography, teachings, and stories to the library.">Add New Saint</button>
      </div>

      {activeTab === 'manage' && (
        <div className="max-w-3xl mx-auto space-y-8 bg-white p-6 rounded-lg shadow-md">
             <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Set Featured Awliya</h2>
                <p className="text-sm text-gray-600 mb-4">Select which saints appear in the "Featured Awliya" section on the home page.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto p-2 border rounded-md">
                    {allAwliya.map(wali => (
                        <label key={wali.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" checked={managedFeatured.has(wali.id)} onChange={() => handleFeaturedChange(wali.id)} className="h-5 w-5 rounded text-green-600 focus:ring-green-500"/>
                            <span>{wali.name}</span>
                        </label>
                    ))}
                </div>
            </div>
            <button onClick={handleSaveManagement} className="w-full bg-green-700 text-white font-bold py-3 rounded-lg hover:bg-green-800 transition">Save Home Page Settings</button>
        </div>
      )}

      {activeTab === 'add' && (
        <form onSubmit={handleFormSubmit} className="max-w-3xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Add a New Saint</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className={commonLabelClass}>Name</label>
                    <input id="name" type="text" name="name" value={formState.name} onChange={handleFormChange} className={commonInputClass} required placeholder="e.g., Abdul Qadir Gilani" />
                </div>
                <div>
                    <label htmlFor="title" className={commonLabelClass}>Title</label>
                    <input id="title" type="text" name="title" value={formState.title} onChange={handleFormChange} className={commonInputClass} placeholder="e.g., Sultan-ul-Awliya" />
                </div>
                <div>
                    <label htmlFor="honorifics" className={commonLabelClass}>Honorifics</label>
                    <select id="honorifics" name="honorifics" value={formState.honorifics} onChange={handleFormChange} className={commonInputClass}>
                        <option value="R.A.">R.A.</option>
                        <option value="Q.S.A.">Q.S.A.</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="deathDate" className={commonLabelClass}>Death Date (Urs)</label>
                    <input id="deathDate" type="text" name="deathDate" value={formState.deathDate} onChange={handleFormChange} className={commonInputClass} placeholder="e.g., Rabi al-Thani 11" />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="maqamLocation" className={commonLabelClass}>Maqam Location</label>
                    <input id="maqamLocation" type="text" name="maqamLocation" value={formState.maqamLocation} onChange={handleFormChange} className={commonInputClass} placeholder="e.g., Baghdad, Iraq" />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="maqamGmapsUrl" className={commonLabelClass}>Google Maps URL</label>
                    <input id="maqamGmapsUrl" type="text" name="maqamGmapsUrl" value={formState.maqamGmapsUrl} onChange={handleFormChange} className={commonInputClass} placeholder="https://www.google.com/maps/search/?api=1&query=..." />
                </div>
                <div>
                    <label htmlFor="region" className={commonLabelClass}>Region</label>
                    <select id="region" name="region" value={formState.region} onChange={handleFormChange} className={commonInputClass}>
                        {Object.values(Region).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="century" className={commonLabelClass}>Century</label>
                    <select id="century" name="century" value={formState.century} onChange={handleFormChange} className={commonInputClass}>
                        {Object.values(Century).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="tariqa" className={commonLabelClass}>Tariqa</label>
                    <select id="tariqa" name="tariqa" value={formState.tariqa} onChange={handleFormChange} className={commonInputClass}>
                        {Object.values(Tariqa).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor="biography" className={commonLabelClass}>Biography</label>
                <textarea id="biography" name="biography" value={formState.biography} onChange={handleFormChange} className={commonInputClass} rows={5} required placeholder="Enter a detailed biography of the saint..."></textarea>
            </div>
            
            <fieldset className="border border-gray-200 p-4 rounded-lg">
                <legend className="text-sm font-medium text-gray-800 px-2">Teachings</legend>
                <div className="space-y-3">
                    {formState.teachings.map((teaching, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <textarea value={teaching} onChange={(e) => handleTeachingChange(index, e.target.value)} className={`${commonInputClass} flex-grow`} rows={2} placeholder={`Teaching #${index + 1}`}/>
                            <button type="button" onClick={() => removeTeaching(index)} className="flex-shrink-0 bg-red-100 text-red-700 h-10 w-10 rounded-full flex items-center justify-center hover:bg-red-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed" disabled={formState.teachings.length <= 1}>
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" /></svg>
                            </button>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={addTeaching} className="mt-3 text-sm font-semibold text-green-600 hover:text-green-800 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    Add Teaching
                </button>
            </fieldset>

            <fieldset className="border border-gray-200 p-4 rounded-lg">
                <legend className="text-sm font-medium text-gray-800 px-2">Stories</legend>
                 <div className="space-y-4">
                    {formState.stories.map((story, index) => (
                        <div key={index} className="p-2 border-b last:border-b-0 space-y-2">
                            <input type="text" value={story.title} onChange={(e) => handleStoryChange(index, 'title', e.target.value)} placeholder={`Story #${index + 1} Title`} className={commonInputClass} />
                            <textarea value={story.story} onChange={(e) => handleStoryChange(index, 'story', e.target.value)} placeholder="Narrate the story here..." className={commonInputClass} rows={3}/>
                            <button type="button" onClick={() => removeStory(index)} className="text-xs font-semibold text-red-600 hover:text-red-800 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center gap-1" disabled={formState.stories.length <= 1}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                Remove Story
                            </button>
                        </div>
                    ))}
                </div>
                 <button type="button" onClick={addStory} className="mt-3 text-sm font-semibold text-green-600 hover:text-green-800 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    Add Story
                 </button>
            </fieldset>

            <button type="submit" className="w-full bg-green-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-800 transition-all text-lg shadow-md hover:shadow-lg">
                Add Saint to Library
            </button>
        </form>
      )}
    </div>
  );
};

export default AdminScreen;