import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/', label: '首頁', emoji: '🏠' },
  { to: '/itinerary', label: '行程', emoji: '📅' },
  { to: '/tickets', label: '票券', emoji: '🎟️' },
  { to: '/packing', label: '行李', emoji: '🧳' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/20 safe-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {tabs.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] rounded-xl px-3 py-1 transition-all tap-highlight ${
                isActive
                  ? 'text-fuji-blue scale-105'
                  : 'text-warm-gray hover:text-dark-navy'
              }`
            }
          >
            <span className="text-xl leading-none">{tab.emoji}</span>
            <span className="text-[11px] font-medium leading-none">{tab.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
