import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/ui/BottomNav';
import SosFab from './components/ui/SosFab';
import DashboardPage from './pages/DashboardPage';
import ItineraryPage from './pages/ItineraryPage';
import TicketsPage from './pages/TicketsPage';
import PackingPage from './pages/PackingPage';

export default function App() {
  const [lang, setLang] = useState<'zh' | 'ja'>(() => {
    return (localStorage.getItem('family-hub-lang') as 'zh' | 'ja') || 'zh';
  });

  const handleSetLang = (newLang: 'zh' | 'ja') => {
    setLang(newLang);
    localStorage.setItem('family-hub-lang', newLang);
  };

  return (
    <div className="flex flex-col min-h-dvh">
      {/* Floating Language Switcher */}
      <button
        onClick={() => handleSetLang(lang === 'zh' ? 'ja' : 'zh')}
        className="fixed top-4 right-4 z-40 glass border border-dark-navy/10 px-3 py-1.5 rounded-full text-xs font-bold shadow-md tap-highlight active:scale-95 text-dark-navy flex items-center gap-1.5"
      >
        <span>🌐</span>
        <span>{lang === 'zh' ? '🇯🇵 日本語表示' : '🇹🇼 繁體中文'}</span>
      </button>

      <main className="flex-1 pb-20 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardPage lang={lang} />} />
          <Route path="/itinerary" element={<ItineraryPage lang={lang} />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/packing" element={<PackingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <SosFab lang={lang} />
      <BottomNav lang={lang} />
    </div>
  );
}
