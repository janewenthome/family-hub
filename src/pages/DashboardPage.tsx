import { useState, useEffect } from 'react';
import itineraryData from '../data/itinerary.json';
import hotelsData from '../data/hotels.json';
import emergencyData from '../data/emergency.json';
import ticketsData from '../data/tickets.json';

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
      <p className="text-white/60 text-xs mt-3">2026/07/24 CI106 16:25 TPE → NRT</p>
    </div>
  );
}

function HotelQuickView() {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-warm-gray px-1">🏨 住宿安排與預約資訊</h3>
      {hotelsData.map((hotel) => {
        const isCurrent = hotel.dates.includes(today);
        return (
          <div
            key={hotel.id}
            className={`bg-white rounded-2xl p-4 shadow-sm border transition-all ${
              isCurrent
                ? 'border-fuji-blue ring-2 ring-fuji-blue/15'
                : 'border-gray-150/60'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl flex-shrink-0">{hotel.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-dark-navy truncate">{hotel.name}</h4>
                  {isCurrent && (
                    <span className="text-[10px] font-bold bg-fuji-blue text-white px-2 py-0.5 rounded-full shrink-0">
                      今晚入住
                    </span>
                  )}
                </div>
                <p className="text-sm text-warm-gray font-semibold mt-0.5">{hotel.subtitle}</p>
                <p className="text-xs text-warm-gray mt-1 font-semibold">
                  入住天數：Day {hotel.days.join(' & ')} ({hotel.roomType})
                </p>
                <p className="text-[11px] text-warm-gray mt-0.5 font-semibold">
                  ⏰ Check-in: {hotel.checkIn} | Check-out: {hotel.checkOut}
                </p>

                {/* Hotel Details */}
                <div className="mt-2 text-xs text-warm-gray space-y-1.5 border-t border-gray-100 pt-2 font-medium">
                  <p className="text-dark-navy">📍 {hotel.address.ja}</p>
                  {hotel.roomDetail && <p>🛏️ 房型明細：{hotel.roomDetail}</p>}
                  {hotel.reservations.map((res, idx) => (
                    <div key={idx} className="bg-fuji-snow/60 p-2 rounded-xl mt-1 text-dark-navy">
                      <p className="font-bold">🗓️ 預定日期：{res.date.slice(5)}</p>
                      {res.orderId && <p>🔑 訂單編號：{res.orderId}</p>}
                      {res.chargeDate && <p>💳 扣款日期：{res.chargeDate}</p>}
                      {res.note && <p className="text-danger font-bold mt-0.5">⚠️ 提醒：{res.note}</p>}
                    </div>
                  ))}
                  {hotel.tips && hotel.tips.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-[10px] font-bold text-fuji-blue">💡 住宿貼士</p>
                      {hotel.tips.map((tip, idx) => (
                        <p key={idx} className="text-xs text-warm-gray pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-warm-gray">
                          {tip}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-3 border-t border-gray-100 pt-3">
              {hotel.phone && (
                <a
                  href={`tel:${hotel.phone}`}
                  className="flex-1 text-center bg-fuji-ice text-fuji-blue rounded-xl py-2 text-xs font-bold tap-highlight"
                >
                  📞 撥打電話
                </a>
              )}
              <a
                href={hotel.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-forest-light text-forest-green rounded-xl py-2 text-xs font-bold tap-highlight"
              >
                🗺️ 開啟地圖
              </a>
            </div>
          </div>
        );
      })}
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
        const [kawaguchikoRes, tokyoRes] = await Promise.all([
          fetch('https://api.open-meteo.com/v1/forecast?latitude=35.5122&longitude=138.7740&current_weather=true&timezone=Asia/Tokyo'),
          fetch('https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&current_weather=true&timezone=Asia/Tokyo')
        ]);
        const kawaguchikoData = await kawaguchikoRes.json();
        const tokyoData = await tokyoRes.json();

        if (kawaguchikoData?.current_weather && tokyoData?.current_weather) {
          setWeatherData({
            kawaguchiko: {
              temp: Math.round(kawaguchikoData.current_weather.temperature),
              code: kawaguchikoData.current_weather.weathercode,
            },
            tokyo: {
              temp: Math.round(tokyoData.current_weather.temperature),
              code: tokyoData.current_weather.weathercode,
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

function ActionRequiredCard() {
  const pendingActions = ticketsData.filter(t => t.status === 'action-required');

  if (pendingActions.length === 0) return null;

  return (
    <div className="bg-danger-light/50 border border-danger/20 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">⚠️</span>
        <h3 className="text-sm font-bold text-danger">待辦提醒與行動</h3>
      </div>
      <div className="space-y-2">
        {pendingActions.map(action => (
          <div key={action.id} className="bg-white p-3 rounded-xl text-xs space-y-1 border border-danger/10 shadow-sm">
            <div className="flex items-center gap-1.5 font-bold text-dark-navy">
              <span>{action.emoji}</span>
              <span className="truncate">{action.name}</span>
            </div>
            {action.warning && <p className="text-danger font-semibold">{action.warning}</p>}
            {action.pickupInstructions && action.pickupInstructions[0] && (
              <p className="text-warm-gray font-medium">{action.pickupInstructions[0]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TodayHighlights() {
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayDay = itineraryData.days.find(d => d.date === todayStr);

  if (!todayDay) return null;

  const keyEvents = todayDay.events.filter(e => e.important || e.category === 'attraction' || e.category === 'hotel').slice(0, 3);
  const displayEvents = keyEvents.length > 0 ? keyEvents : todayDay.events.slice(0, 2);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-fuji-blue/15">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📅</span>
        <h3 className="text-sm font-bold text-dark-navy">今日行程焦點 ({todayDay.label})</h3>
      </div>
      <div className="space-y-2">
        {displayEvents.map((event, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-xs bg-fuji-snow/40 p-2.5 rounded-xl border border-gray-150/60 shadow-sm">
            <span className="text-xs font-semibold shrink-0 pt-0.5 text-fuji-blue tabular-nums">⏱️ {event.time}</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-dark-navy truncate">{event.title}</p>
              {event.description && <p className="text-[10px] text-warm-gray mt-0.5 truncate">{event.description}</p>}
            </div>
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
      <ActionRequiredCard />
      <TodayHighlights />
      <WeatherSection />
      <HotelQuickView />
      <TripOverview />
      <EmergencySection />
    </div>
  );
}
