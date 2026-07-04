import { useState, useEffect } from 'react';
import itineraryData from '../data/itinerary.json';
import hotelsData from '../data/hotels.json';
import emergencyData from '../data/emergency.json';

const TRIP_START = new Date('2026-07-24T16:25:00+08:00');

function useCountdown() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = TRIP_START.getTime() - now.getTime();
  if (diff <= 0) {
    // During or after trip — show current day
    const tripStart = new Date('2026-07-24');
    const dayIndex = Math.floor((now.getTime() - tripStart.getTime()) / 86400000);
    return { started: true, dayNumber: Math.min(Math.max(dayIndex + 1, 1), 9) };
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { started: false, days, hours, minutes, seconds };
}

function getTodayHotel() {
  const today = new Date().toISOString().slice(0, 10);
  return hotelsData.find(h => h.dates.includes(today));
}

function CountdownSection() {
  const cd = useCountdown();

  if (cd.started) {
    return (
      <div className="gradient-fuji rounded-2xl p-6 text-white text-center">
        <div className="text-4xl mb-2">🗻</div>
        <h2 className="text-xl font-bold">Day {cd.dayNumber}</h2>
        <p className="text-white/80 text-sm mt-1">旅途進行中！</p>
      </div>
    );
  }

  return (
    <div className="gradient-fuji rounded-2xl p-6 text-white text-center">
      <div className="text-4xl mb-2">✈️</div>
      <h2 className="text-lg font-bold mb-4">距離出發還有</h2>
      <div className="flex justify-center gap-3">
        {[
          { val: cd.days, label: '天' },
          { val: cd.hours, label: '時' },
          { val: cd.minutes, label: '分' },
          { val: cd.seconds, label: '秒' },
        ].map(item => (
          <div key={item.label} className="bg-white/15 rounded-xl px-3 py-2 min-w-[56px]">
            <div className="text-2xl font-bold tabular-nums">{item.val}</div>
            <div className="text-xs text-white/70">{item.label}</div>
          </div>
        ))}
      </div>
      <p className="text-white/60 text-xs mt-3">2026/07/24 CI101 16:25 TPE → NRT</p>
    </div>
  );
}

function HotelQuickView() {
  const hotel = getTodayHotel();
  if (!hotel) {
    // Show next hotel
    const nextHotel = hotelsData[0];
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-warm-gray mb-2">🏨 住宿資訊</h3>
        <div className="flex items-start gap-3">
          <span className="text-3xl">{nextHotel.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-base">{nextHotel.name}</p>
            <p className="text-sm text-warm-gray">{nextHotel.subtitle}</p>
            <p className="text-xs text-warm-gray mt-1">Day {nextHotel.days.join(' & ')}</p>
          </div>
        </div>
        {nextHotel.phone && (
          <a href={`tel:${nextHotel.phone}`} className="mt-3 block w-full text-center bg-fuji-ice text-fuji-blue rounded-xl py-2.5 text-sm font-semibold tap-highlight">
            📞 撥打電話
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-warm-gray mb-2">🏨 今晚住這裡</h3>
      <div className="flex items-start gap-3">
        <span className="text-3xl">{hotel.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-base">{hotel.name}</p>
          <p className="text-sm text-warm-gray">{hotel.subtitle}</p>
          <p className="text-xs text-warm-gray mt-1">{hotel.roomType}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        {hotel.phone && (
          <a href={`tel:${hotel.phone}`} className="flex-1 text-center bg-fuji-ice text-fuji-blue rounded-xl py-2.5 text-sm font-semibold tap-highlight">
            📞 電話
          </a>
        )}
        <a href={hotel.mapUrl} target="_blank" rel="noopener" className="flex-1 text-center bg-forest-light text-forest-green rounded-xl py-2.5 text-sm font-semibold tap-highlight">
          🗺️ 導航
        </a>
      </div>
    </div>
  );
}

function EmergencySection() {
  const [open, setOpen] = useState(false);
  const data = emergencyData;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full p-4 flex items-center justify-between tap-highlight">
        <h3 className="text-sm font-semibold text-warm-gray">🚨 緊急聯絡</h3>
        <span className={`text-warm-gray transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-2">
          <a href={`tel:${data.police.number}`} className="flex items-center gap-3 p-3 bg-danger-light rounded-xl tap-highlight">
            <span className="text-xl">{data.police.emoji}</span>
            <div className="flex-1"><p className="font-semibold text-sm">{data.police.name}</p></div>
            <span className="text-danger font-bold">{data.police.number}</span>
          </a>
          <a href={`tel:${data.ambulance.number}`} className="flex items-center gap-3 p-3 bg-danger-light rounded-xl tap-highlight">
            <span className="text-xl">{data.ambulance.emoji}</span>
            <div className="flex-1"><p className="font-semibold text-sm">{data.ambulance.name}</p></div>
            <span className="text-danger font-bold">{data.ambulance.number}</span>
          </a>
          <a href={`tel:${data.embassy.number}`} className="flex items-center gap-3 p-3 bg-fuji-ice rounded-xl tap-highlight">
            <span className="text-xl">{data.embassy.emoji}</span>
            <div className="flex-1">
              <p className="font-semibold text-sm">{data.embassy.name}</p>
              <p className="text-xs text-warm-gray">緊急：{data.embassy.emergencyNumber}</p>
            </div>
          </a>
          {data.insurance.map((ins, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-fuji-snow rounded-xl">
              <span className="text-xl">{ins.emoji}</span>
              <div className="flex-1">
                <p className="font-semibold text-sm">{ins.name}</p>
                <p className="text-xs text-warm-gray">{ins.type}</p>
                <p className="text-xs text-warm-gray">{ins.note}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WeatherSection() {
  const [weatherData, setWeatherData] = useState<{
    kawaguchiko: { temp: number; code: number } | null;
    tokyo: { temp: number; code: number } | null;
  }>({ kawaguchiko: null, tokyo: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=35.5122,35.6895&longitude=138.7740,139.6917&current_weather=true&timezone=Asia/Tokyo'
        );
        const data = await res.json();
        if (data && data.length === 2) {
          setWeatherData({
            kawaguchiko: {
              temp: Math.round(data[0].current_weather.temperature),
              code: data[0].current_weather.weathercode,
            },
            tokyo: {
              temp: Math.round(data[1].current_weather.temperature),
              code: data[1].current_weather.weathercode,
            },
          });
        }
      } catch (err) {
        console.error('Failed to fetch weather:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  const getWeatherEmoji = (code: number) => {
    if (code === 0) return '☀️ 晴天';
    if (code <= 3) return '🌤️ 多雲';
    if (code === 45 || code === 48) return '🌫️ 濃霧';
    if (code <= 55) return '🌧️ 細雨';
    if (code <= 65) return '🌧️ 雨天';
    if (code <= 75) return '❄️ 下雪';
    if (code <= 82) return '🌦️ 陣雨';
    return '⛈️ 雷雨';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-12 bg-gray-100 rounded-xl"></div>
          <div className="h-12 bg-gray-100 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-warm-gray mb-3">🌤️ 雙城天氣</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-fuji-snow/40 p-3 rounded-xl border border-gray-50">
          <p className="text-xs text-warm-gray font-semibold">河口湖</p>
          {weatherData.kawaguchiko ? (
            <div className="flex items-center justify-between mt-1">
              <span className="text-xl font-bold text-dark-navy tabular-nums">
                {weatherData.kawaguchiko.temp}°C
              </span>
              <span className="text-xs font-medium text-dark-navy">
                {getWeatherEmoji(weatherData.kawaguchiko.code)}
              </span>
            </div>
          ) : (
            <p className="text-xs text-warm-gray mt-1">讀取失敗</p>
          )}
        </div>

        <div className="bg-fuji-snow/40 p-3 rounded-xl border border-gray-50">
          <p className="text-xs text-warm-gray font-semibold">東京</p>
          {weatherData.tokyo ? (
            <div className="flex items-center justify-between mt-1">
              <span className="text-xl font-bold text-dark-navy tabular-nums">
                {weatherData.tokyo.temp}°C
              </span>
              <span className="text-xs font-medium text-dark-navy">
                {getWeatherEmoji(weatherData.tokyo.code)}
              </span>
            </div>
          ) : (
            <p className="text-xs text-warm-gray mt-1">讀取失敗</p>
          )}
        </div>
      </div>
    </div>
  );
}

function TripOverview() {
  const days = itineraryData.days;
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-warm-gray mb-3">📍 行程速覽</h3>
      <div className="space-y-2">
        {days.map(day => (
          <div key={day.dayNumber} className="flex items-center gap-3 text-sm">
            <span className="text-lg">{day.emoji}</span>
            <span className="text-warm-gray min-w-[48px] font-semibold">{day.label}</span>
            <span className="font-semibold text-dark-navy flex-1 truncate">{day.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="px-4 pt-6 pb-24 space-y-4 max-w-lg mx-auto">
      <header className="text-center mb-2">
        <h1 className="text-xl font-black text-dark-navy">🗻 Family Hub</h1>
        <p className="text-xs text-warm-gray font-semibold mt-0.5">2026 仲夏親子富士山大探險</p>
      </header>
      <CountdownSection />
      <WeatherSection />
      <HotelQuickView />
      <TripOverview />
      <EmergencySection />
    </div>
  );
}
