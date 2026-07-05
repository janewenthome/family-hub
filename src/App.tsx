import { Routes, Route, Navigate } from 'react-router-dom';
import BottomNav from './components/ui/BottomNav';
import SosFab from './components/ui/SosFab';
import DashboardPage from './pages/DashboardPage';
import ItineraryPage from './pages/ItineraryPage';
import TicketsPage from './pages/TicketsPage';
import PackingPage from './pages/PackingPage';

export default function App() {
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
      <SosFab />
      <BottomNav />
    </div>
  );
}
