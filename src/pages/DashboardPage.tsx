import { useState, useEffect } from 'react';
import itineraryData from '../data/itinerary.json';
import hotelsData from '../data/hotels.json';
import emergencyData from '../data/emergency.json';
import ticketsData from '../data/tickets.json';
import insuranceData from '../data/insurance.json';
import itineraryDataJa from '../data/itinerary_ja.json';

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

function CountdownSection({ lang }: { lang: 'zh' | 'ja' }) {
  const cd = useCountdown();

  if (cd.started) {
    return (
      <div className="gradient-fuji rounded-2xl p-6 text-white text-center">
        <div className="text-4xl mb-2">🗻</div>
        <h2 className="text-xl font-bold">Day {cd.dayNumber}</h2>
        <p className="text-white/80 text-sm mt-1">{lang === 'zh' ? '旅途進行中！' : '旅行中です！'}</p>
      </div>
    );
  }

  return (
    <div className="gradient-fuji rounded-2xl p-6 text-white text-center">
      <div className="text-4xl mb-2">✈️</div>
      <h2 className="text-lg font-bold mb-4">{lang === 'zh' ? '距離出發還有' : '日本出発まであと'}</h2>
      <div className="flex justify-center gap-3">
        {[
          { val: cd.days, label: lang === 'zh' ? '天' : '日' },
          { val: cd.hours, label: lang === 'zh' ? '時' : '時間' },
          { val: cd.minutes, label: lang === 'zh' ? '分' : '分' },
          { val: cd.seconds, label: lang === 'zh' ? '秒' : '秒' },
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

function HotelQuickView({ lang, unlocked }: { lang: 'zh' | 'ja'; unlocked: boolean }) {
  const today = new Date().toISOString().slice(0, 10);

  const translateSubtitle = (sub: string) => {
    if (sub === '飛機旁邊的家') return '空港すぐ近くの快適ホテル';
    if (sub === '城市裡的魔術房') return '都会の便利なコンドミニアム';
    if (sub === '富士山下的巨無霸別墅') return '富士山麓のプライベート一棟貸し別荘';
    return sub;
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-warm-gray px-1">
        {lang === 'zh' ? '🏨 住宿安排與預約資訊' : '🏨 宿泊先ホテル'}
      </h3>
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
                  <h4 className="font-bold text-base text-dark-navy truncate">
                    {lang === 'zh' ? hotel.name : (hotel.nameJa || hotel.name)}
                  </h4>
                  {isCurrent && (
                    <span className="text-[10px] font-bold bg-fuji-blue text-white px-2 py-0.5 rounded-full shrink-0">
                      {lang === 'zh' ? '今晚入住' : '今夜宿泊'}
                    </span>
                  )}
                </div>
                <p className="text-sm text-warm-gray font-semibold mt-0.5">
                  {lang === 'zh' ? hotel.subtitle : translateSubtitle(hotel.subtitle)}
                </p>
                <p className="text-xs text-warm-gray mt-1 font-semibold">
                  {lang === 'zh'
                    ? `入住天數：Day ${hotel.days.join(' & ')} (${hotel.roomType})`
                    : `宿泊日：Day ${hotel.days.join(' & ')} (${hotel.roomType})`}
                </p>
                <p className="text-[11px] text-warm-gray mt-0.5 font-semibold">
                  ⏰ Check-in: {hotel.checkIn} | Check-out: {hotel.checkOut}
                </p>

                {/* Hotel Details */}
                <div className="mt-2 text-xs text-warm-gray space-y-1.5 border-t border-gray-100 pt-2 font-medium">
                  <p className="text-dark-navy">📍 {hotel.address.ja}</p>
                  {/* Reservations - Show in Chinese mode only if unlocked */}
                  {lang === 'zh' && (
                    unlocked ? (
                      <>
                        {hotel.roomDetail && <p>🛏️ 房型明細：{hotel.roomDetail}</p>}
                        {hotel.reservations.map((res, idx) => (
                          <div key={idx} className="bg-fuji-snow/60 p-2 rounded-xl mt-1 text-dark-navy">
                            <p className="font-bold">🗓️ 預定日期：{res.date.slice(5)}</p>
                            {res.orderId && <p>🔑 訂單編號：{res.orderId}</p>}
                            {res.chargeDate && <p>💳 扣款日期：{res.chargeDate}</p>}
                            {res.note && <p className="text-danger font-bold mt-0.5">⚠️ 提醒：{res.note}</p>}
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="bg-fuji-ice/50 border border-fuji-blue/10 rounded-xl p-2 text-[10px] text-warm-gray mt-1 flex items-center gap-1.5 font-semibold">
                        <span>🔒</span>
                        <span>訂單編號已隱藏 (解鎖票券專區即可檢視)</span>
                      </div>
                    )
                  )}
                  {hotel.tips && hotel.tips.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-[10px] font-bold text-fuji-blue">
                        {lang === 'zh' ? '💡 住宿貼士' : '💡 ホテルメモ'}
                      </p>
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
                  {lang === 'zh' ? '📞 撥打電話' : '📞 電話をかける'}
                </a>
              )}
              <a
                href={hotel.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-forest-light text-forest-green rounded-xl py-2 text-xs font-bold tap-highlight"
              >
                {lang === 'zh' ? '🗺️ 開啟地圖' : '🗺️ 地図で開く'}
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

function WeatherSection({ lang }: { lang: 'zh' | 'ja' }) {
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
    if (code === 0) return lang === 'zh' ? '☀️ 晴天' : '☀️ 晴れ';
    if (code <= 3) return lang === 'zh' ? '🌤️ 多雲' : '🌤️ 曇り';
    if (code === 45 || code === 48) return lang === 'zh' ? '🌫️ 濃霧' : '🌫️ 霧';
    if (code <= 55) return lang === 'zh' ? '🌧️ 細雨' : '🌧️ 小雨';
    if (code <= 65) return lang === 'zh' ? '🌧️ 雨天' : '🌧️ 雨';
    if (code <= 75) return lang === 'zh' ? '❄️ 下雪' : '❄️ 雪';
    if (code <= 82) return lang === 'zh' ? '🌦️ 陣雨' : '🌦️ にわか雨';
    return lang === 'zh' ? '⛈️ 雷雨' : '⛈️ 雷雨';
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
      <h3 className="text-sm font-semibold text-warm-gray mb-3">{lang === 'zh' ? '🌤️ 雙城天氣' : '🌤️ お天気'}</h3>
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
            <p className="text-xs text-warm-gray mt-1">{lang === 'zh' ? '讀取失敗' : '取得失敗'}</p>
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
            <p className="text-xs text-warm-gray mt-1">{lang === 'zh' ? '讀取失敗' : '取得失敗'}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function TripOverview({ lang }: { lang: 'zh' | 'ja' }) {
  const currentItinerary = lang === 'ja' ? itineraryDataJa : itineraryData;
  const days = currentItinerary.days;
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold text-warm-gray mb-3">
        {lang === 'zh' ? '📍 行程速覽' : '📍 スケジュール概要'}
      </h3>
      <div className="space-y-2">
        {days.map(day => (
          <div key={day.dayNumber} className="flex items-center gap-3 text-sm">
            <span className="text-lg">{day.emoji}</span>
            <span className="text-warm-gray min-w-[48px] font-bold">{day.label}</span>
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

function TodayHighlights({ lang }: { lang: 'zh' | 'ja' }) {
  const currentItinerary = lang === 'ja' ? itineraryDataJa : itineraryData;
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayDay = currentItinerary.days.find(d => d.date === todayStr);

  if (!todayDay) return null;

  const keyEvents = todayDay.events.filter(e => e.important || e.category === 'attraction' || e.category === 'hotel').slice(0, 3);
  const displayEvents = keyEvents.length > 0 ? keyEvents : todayDay.events.slice(0, 2);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-fuji-blue/15">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📅</span>
        <h3 className="text-sm font-bold text-dark-navy">
          {lang === 'zh' ? `今日行程焦點 (${todayDay.label})` : `本日の見どころ (${todayDay.label})`}
        </h3>
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

function InsurancePublicView() {
  const guide = insuranceData.taiwanFamilyGuide;
  const claims = insuranceData.claimsGuide;
  const strategies = (insuranceData as any).coordinationStrategy;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">🛡️</span>
        <h3 className="text-sm font-bold text-dark-navy">旅平險與信用卡不便險戰情</h3>
      </div>

      {/* Guide for Taiwan Family */}
      <div className="bg-fuji-ice/50 border border-fuji-blue/10 rounded-xl p-3 text-xs space-y-2">
        <p className="font-bold text-dark-navy flex items-center gap-1">
          <span>🇹🇼</span> {guide.title}
        </p>
        <p className="text-[11px] text-warm-gray leading-normal">{guide.description}</p>
        <div className="bg-white p-2.5 rounded-lg border border-gray-150 space-y-1.5 bg-opacity-70">
          <p className="text-[11px] font-semibold text-danger">☎️ 客服/海外專線：{guide.hotline}</p>
          {guide.detailsToReport.map((detail, idx) => (
            <p key={idx} className="text-[10px] text-dark-navy font-semibold leading-relaxed">
              • {detail}
            </p>
          ))}
        </div>
      </div>

      {/* Double Insurance Coordination Strategy */}
      {strategies && (
        <div className="space-y-2">
          <p className="text-[11px] font-bold text-warm-gray px-1 uppercase tracking-wider">{strategies.title}</p>
          <div className="space-y-2">
            {strategies.strategies.map((strat: any, idx: number) => (
              <div key={idx} className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 text-xs">
                <p className="font-bold text-amber-900 mb-1 flex items-center gap-1">
                  <span>✨</span> {strat.title}
                </p>
                <p className="text-[11px] text-warm-gray leading-relaxed whitespace-pre-wrap font-medium">
                  {strat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Claims Guide */}
      <div className="space-y-2">
        <p className="text-[11px] font-bold text-warm-gray px-1 uppercase tracking-wider">{claims.title}</p>
        <div className="grid grid-cols-1 gap-2">
          {claims.categories.map((cat, idx) => (
            <div key={idx} className="bg-fuji-snow/40 border border-gray-150 rounded-xl p-2.5 text-xs">
              <p className="font-bold text-dark-navy mb-1.5">{cat.type}</p>
              <ul className="space-y-1 list-disc list-inside text-[11px] text-warm-gray pl-1 leading-relaxed">
                {cat.docs.map((doc, i) => (
                  <li key={i} className="marker:text-fuji-blue font-medium">{doc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface DashboardPageProps {
  lang: 'zh' | 'ja';
}

export default function DashboardPage({ lang }: DashboardPageProps) {
  const unlocked = sessionStorage.getItem('tickets-unlocked') === 'true';

  return (
    <div className="px-4 pt-6 pb-24 space-y-4 max-w-lg mx-auto">
      <header className="text-center mb-2">
        <h1 className="text-xl font-black text-dark-navy">
          {lang === 'zh' ? '🗻 Family Hub' : '🗻 富士山ファミリー旅行戦情室'}
        </h1>
        <p className="text-xs text-warm-gray font-semibold mt-0.5">
          {lang === 'zh' ? '2026 仲夏親子富士山大探險' : '2026年 仲夏ファミリー富士山アドベンチャー'}
        </p>
      </header>
      <CountdownSection lang={lang} />
      {lang === 'zh' && unlocked && <ActionRequiredCard />}
      <TodayHighlights lang={lang} />
      <WeatherSection lang={lang} />
      <HotelQuickView lang={lang} unlocked={unlocked} />
      <TripOverview lang={lang} />
      {lang === 'zh' && <InsurancePublicView />}
      {lang === 'zh' && <EmergencySection />}
    </div>
  );
}
