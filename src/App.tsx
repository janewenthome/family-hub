import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/ui/BottomNav';
import DashboardPage from './pages/DashboardPage';
import ItineraryPage from './pages/ItineraryPage';
import TicketsPage from './pages/TicketsPage';
import PackingPage from './pages/PackingPage';

const PIN = '0000';
const AUTH_KEY = 'family-hub-auth';

function PinLock({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleDigit = (d: string) => {
    if (pin.length >= 4) return;
    const next = pin + d;
    setPin(next);
    setError(false);
    if (next.length === 4) {
      if (next === PIN) {
        localStorage.setItem(AUTH_KEY, 'true');
        onUnlock();
      } else {
        setError(true);
        setTimeout(() => { setPin(''); setError(false); }, 600);
      }
    }
  };

  const handleDelete = () => {
    setPin(p => p.slice(0, -1));
    setError(false);
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gradient-fuji px-6">
      <div className="text-5xl mb-3">🗻</div>
      <h1 className="text-white text-2xl font-bold mb-1">Family Hub</h1>
      <p className="text-white/70 text-sm mb-8">輸入密碼進入戰情室</p>

      {/* PIN dots */}
      <div className="flex gap-4 mb-8">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full transition-all duration-200 ${
              error
                ? 'bg-red-400 animate-shake'
                : i < pin.length
                  ? 'bg-white scale-110'
                  : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Numpad */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-[280px]">
        {['1','2','3','4','5','6','7','8','9','','0','⌫'].map(key => (
          <button
            key={key || 'empty'}
            disabled={key === ''}
            onClick={() => key === '⌫' ? handleDelete() : key && handleDigit(key)}
            className={`h-16 rounded-2xl text-2xl font-semibold transition-all tap-highlight ${
              key === ''
                ? 'invisible'
                : 'bg-white/15 text-white hover:bg-white/25 active:bg-white/30'
            }`}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(() => localStorage.getItem(AUTH_KEY) === 'true');

  useEffect(() => {
    // Check auth on focus (e.g., returning from another tab)
    const check = () => setAuthed(localStorage.getItem(AUTH_KEY) === 'true');
    window.addEventListener('focus', check);
    return () => window.removeEventListener('focus', check);
  }, []);

  if (!authed) {
    return <PinLock onUnlock={() => setAuthed(true)} />;
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 pb-20 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/packing" element={<PackingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}
