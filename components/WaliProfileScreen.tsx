import React, { useState, useRef, useEffect } from 'react';
import { Wali } from '../types';
import { BackIcon, HeartIcon, ShareIcon, MapPinIcon, PlayIcon, StopIcon, LoadingSpinner } from './icons';
import { GoogleGenAI, Modality } from "@google/genai";

// --- Audio Helper Functions ---
// From base64 to Uint8Array
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// From raw PCM (as Uint8Array) to AudioBuffer
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}


interface WaliProfileScreenProps {
  wali: Wali;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-green-800 mb-4 pb-2 border-b-2 border-green-200">{title}</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed font-serif">
            {children}
        </div>
    </div>
);


const WaliProfileScreen: React.FC<WaliProfileScreenProps> = ({ wali, onBack, isFavorite, onToggleFavorite }) => {
  const [audioState, setAudioState] = useState<'idle' | 'generating' | 'playing'>('idle');
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const handleShare = async () => {
    const shareData = {
      title: `${wali.name} - TRUE LOVE`,
      text: `Learn about ${wali.name} (${wali.title}): ${wali.teachings[0]}`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        alert('Share functionality is not supported on this browser.');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };
  
  const handleAudio = async () => {
    if (audioState === 'playing' && audioSourceRef.current) {
        audioSourceRef.current.stop();
        // onended will handle state change
        return;
    }

    if (audioState === 'idle') {
        setAudioState('generating');
        try {
            if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
                // FIX: Cast window to `any` to allow for `webkitAudioContext` in older browsers without TypeScript errors.
                audioCtxRef.current = new ((window as any).AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            }
            const audioCtx = audioCtxRef.current;
            
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: [{ parts: [{ text: `Read the following biography of ${wali.name}. ${wali.biography}` }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: 'Kore' },
                        },
                    },
                },
            });

            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (!base64Audio) {
                throw new Error("No audio data received from API.");
            }

            const audioBytes = decode(base64Audio);
            const audioBuffer = await decodeAudioData(audioBytes, audioCtx, 24000, 1);
            
            const source = audioCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioCtx.destination);
            source.start();
            
            source.onended = () => {
                setAudioState('idle');
                if (audioSourceRef.current) {
                    audioSourceRef.current.disconnect();
                }
                audioSourceRef.current = null;
            };

            audioSourceRef.current = source;
            setAudioState('playing');

        } catch (error) {
            console.error("Failed to generate or play audio:", error);
            alert("Sorry, could not play the audio at this time.");
            setAudioState('idle');
        }
    }
  };

  // Clean up audio on component unmount
  useEffect(() => {
    return () => {
        if (audioSourceRef.current) {
            audioSourceRef.current.stop();
            audioSourceRef.current.disconnect();
        }
        if(audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
            audioCtxRef.current.close();
        }
    }
  }, []);
  
  const renderAudioButtonContent = () => {
    switch(audioState) {
        case 'generating':
            return <><LoadingSpinner className="w-6 h-6" /><span>Generating...</span></>;
        case 'playing':
            return <><StopIcon className="w-6 h-6" /><span>Stop Playback</span></>;
        case 'idle':
        default:
            return <><PlayIcon className="w-6 h-6" /><span>Listen to Biography</span></>;
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <header className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-green-700 font-semibold hover:underline">
          <BackIcon className="w-5 h-5" />
          <span>Back to List</span>
        </button>
        <div className="flex items-center gap-4">
          <button onClick={() => onToggleFavorite(wali.id)} className={`text-gray-500 hover:text-red-500 transition ${isFavorite ? 'text-red-500' : ''}`}>
            <HeartIcon className="w-7 h-7" filled={isFavorite} />
          </button>
          <button onClick={handleShare} className="text-gray-500 hover:text-blue-500 transition">
            <ShareIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      <div className="text-center py-6 bg-gradient-to-br from-green-700 to-green-900 text-white rounded-xl shadow-xl">
        <h1 className="text-4xl font-serif font-bold">{wali.name} <span className="font-sans text-2xl">{wali.honorifics}</span></h1>
        <p className="text-2xl text-amber-300 mt-1">{wali.title}</p>
        <div className="flex justify-center gap-4 mt-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">{wali.region}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">{wali.tariqa}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">{wali.century}</span>
        </div>
      </div>
      
      <div className="space-y-6">
        <Section title="Biography">
          <p>{wali.biography}</p>
        </Section>
        
        <Section title="Teachings & Quotes">
          <ul className="space-y-4">
            {wali.teachings.map((quote, index) => (
              <li key={index} className="border-l-4 border-amber-400 pl-4 italic">
                "{quote}"
              </li>
            ))}
          </ul>
        </Section>
        
        <Section title="Stories & Karamat">
          {wali.stories.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-800 font-sans">{item.title}</h3>
              <p className="mt-1">{item.story}</p>
            </div>
          ))}
        </Section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-green-800 mb-4 pb-2 border-b-2 border-green-200">Maqam (Shrine)</h2>
                <div className="flex items-center gap-3">
                    <MapPinIcon className="w-6 h-6 text-green-600" />
                    <div>
                        <p className="font-semibold text-gray-800">{wali.maqamLocation}</p>
                        <a href={wali.maqamGmapsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            View on Map
                        </a>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold text-green-800 mb-4">Audio Library</h2>
                <button 
                  onClick={handleAudio}
                  disabled={audioState === 'generating'}
                  className="flex items-center gap-3 bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition shadow-lg disabled:bg-green-400 disabled:cursor-not-allowed w-56 justify-center"
                >
                    {renderAudioButtonContent()}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default WaliProfileScreen;