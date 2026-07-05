import { useState, useMemo } from 'react';
import itineraryDataRaw from '../data/itinerary.json';
import { ItineraryDay, ItineraryEvent } from '../types';

const itineraryData = itineraryDataRaw as unknown as { tripStart: string; tripEnd: string; days: ItineraryDay[] };

const ICON_MAP: Record<string, string> = {
  plane: '✈️', train: '🚆', bus: '🚌', car: '🚗', taxi: '🚕', ship: '🚢',
  walk: '🚶', hotel: '🏨', food: '🍽️', ticket: '🎫', museum: '🏛️', park: '🌳',
  shopping: '🛒', bath: '♨️', camera: '📸', fireworks: '🎆', shrine: '⛩️',
  star: '⭐', warning: '⚠️', luggage: '🧳', clock: '⏰', phone: '📱', gift: '🎁',
};

const CATEGORY_COLORS: Record<string, string> = {
  transport: 'border-l-fuji-blue bg-fuji-ice/50',
  attraction: 'border-l-sunset-orange bg-sunset-light/50',
  food: 'border-l-forest-green bg-forest-light/50',
  hotel: 'border-l-purple-500 bg-purple-50',
  shopping: 'border-l-pink-400 bg-pink-50',
  task: 'border-l-warm-gray bg-gray-50',
  free: 'border-l-cyan-400 bg-cyan-50',
};

function TimelineEvent({ event }: { event: ItineraryEvent }) {
  const [expanded, setExpanded] = useState(false);
  const colorClass = CATEGORY_COLORS[event.category] || 'border-l-gray-300 bg-gray-50';

  return (
    <div className="flex gap-3 items-start">
      {/* Time column */}
      <div className="min-w-[52px] text-right pt-3">
        <span className="text-sm font-semibold text-dark-navy tabular-nums">{event.time}</span>
        {event.endTime && (
          <p className="text-[10px] text-warm-gray">~{event.endTime}</p>
        )}
      </div>

      {/* Timeline dot + line */}
      <div className="flex flex-col items-center pt-3.5 flex-shrink-0">
        <div className={`w-3 h-3 rounded-full ${event.important ? 'bg-sunset-orange ring-2 ring-sunset-orange/30' : 'bg-fuji-blue'}`} />
        <div className="w-0.5 flex-grow bg-gray-200 mt-1 min-h-[40px]" />
      </div>

      {/* Event card */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex-1 border-l-4 rounded-xl p-3 mb-2 text-left tap-highlight transition-all ${colorClass}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm leading-snug flex items-center gap-1.5">
              <span className="text-base shrink-0">{ICON_MAP[event.icon] || '📍'}</span>
              <span>{event.title}</span>
            </h4>
            {event.description && (
              <p className="text-xs text-warm-gray mt-0.5">{event.description}</p>
            )}
          </div>
          
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {(event.mapUrl || (event.mapUrls && event.mapUrls.length > 0)) && (
              <a
                href={event.mapUrl || event.mapUrls?.[0]?.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 text-xs bg-white/95 border border-gray-200 rounded-lg hover:bg-fuji-blue hover:text-white transition-colors shadow-sm tap-highlight flex items-center justify-center"
                title="導航至此處"
              >
                🗺️
              </a>
            )}
            {(event.important || event.warning) && (
              <span className="text-xs">
                {event.warning ? '⚠️' : '🔴'}
              </span>
            )}
          </div>
        </div>

        {expanded && (
          <div className="mt-3 space-y-2 border-t border-gray-200/50 pt-3">
            {event.kidFocus && (
              <div className="bg-sakura-light rounded-lg p-2">
                <p className="text-xs font-semibold text-sakura-pink">🧒 小朋友重點</p>
                <p className="text-sm mt-1">{event.kidFocus}</p>
              </div>
            )}
            {event.warning && (
              <div className="bg-danger-light rounded-lg p-2">
                <p className="text-xs font-semibold text-danger">⚠️ 注意</p>
                <p className="text-sm mt-1">{event.warning}</p>
              </div>
            )}
            {event.backup && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5">
                <p className="text-xs font-semibold text-amber-700">🔄 備案計畫 ({event.backup.condition})</p>
                <p className="text-xs mt-1 text-amber-800 font-medium leading-relaxed">{event.backup.plan}</p>
              </div>
            )}
            {event.tips && event.tips.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-semibold text-warm-gray">💡 攻略</p>
                {event.tips.map((tip: string, i: number) => (
                  <p key={i} className="text-xs text-warm-gray pl-4">• {tip}</p>
                ))}
              </div>
            )}
            {event.adultNotes && event.adultNotes.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-semibold text-warm-gray">📋 大人筆記</p>
                {event.adultNotes.map((note: string, i: number) => (
                  <p key={i} className="text-xs text-warm-gray pl-4">• {note}</p>
                ))}
              </div>
            )}
            {event.mapUrls && event.mapUrls.length > 0 && (
              <div className="bg-fuji-snow/70 rounded-xl p-2 mt-2 space-y-1">
                <p className="text-[10px] font-bold text-dark-navy mb-1.5">📍 景點定位連結：</p>
                <div className="flex flex-wrap gap-2">
                  {event.mapUrls.map((m, idx) => (
                    <a
                      key={idx}
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-fuji-blue font-bold shadow-sm tap-highlight"
                    >
                      🗺️ {m.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </button>
    </div>
  );
}

export default function ItineraryPage() {
  const days = itineraryData.days;
  
  // Auto-select today's day, or default to Day 1
  const todayStr = new Date().toISOString().slice(0, 10);
  const defaultIndex = useMemo(() => {
    const idx = days.findIndex(d => d.date === todayStr);
    return idx >= 0 ? idx : 0;
  }, [todayStr]);
  
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const day = days[selectedIndex];

  return (
    <div className="max-w-lg mx-auto">
      {/* Day selector - horizontal scroll */}
      <div className="sticky top-0 z-10 bg-fuji-snow/95 backdrop-blur-sm pt-4 pb-2 px-4">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {days.map((d, i) => {
            const isToday = d.date === todayStr;
            const isSelected = i === selectedIndex;
            return (
              <button
                key={d.date}
                onClick={() => setSelectedIndex(i)}
                className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl min-w-[56px] transition-all tap-highlight ${
                  isSelected
                    ? 'bg-fuji-blue text-white shadow-md'
                    : isToday
                      ? 'bg-fuji-ice text-fuji-blue ring-2 ring-fuji-blue/30'
                      : 'bg-white text-dark-navy'
                }`}
              >
                <span className="text-lg leading-none">{d.emoji}</span>
                <span className="text-[10px] font-semibold mt-1">Day {d.dayNumber}</span>
                <span className="text-[10px] opacity-70">{d.date.slice(5)}</span>
              </button>
            );
          })}
          <div className="w-8 flex-shrink-0" />
        </div>
      </div>

      {/* Day header */}
      <div className="px-4 pt-2 pb-3">
        <h2 className="text-xl font-bold">{day.emoji} {day.title}</h2>
        <p className="text-sm text-warm-gray">{day.location}</p>
        {day.meetup && (
          <div className="mt-2 bg-sakura-light rounded-xl px-3 py-2">
            <p className="text-sm text-sakura-pink font-semibold">🤝 {day.meetup}</p>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="px-2 pb-6">
        {day.events.map((event, i) => (
          <TimelineEvent key={`${day.date}-${i}`} event={event} />
        ))}
      </div>
    </div>
  );
}
