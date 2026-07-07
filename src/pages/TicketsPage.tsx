import { useState } from 'react';
import ticketsData from '../data/tickets.json';
import insuranceData from '../data/insurance.json';

const STATUS_BADGE: Record<string, { text: string; class: string }> = {
  confirmed: { text: '✅ 已確認', class: 'bg-forest-light text-forest-green' },
  pending: { text: '📋 待確認', class: 'bg-sunset-light text-sunset-orange' },
  'action-required': { text: '⚠️ 需行動', class: 'bg-danger-light text-danger' },
};

const CATEGORY_TABS = [
  { key: 'all', label: '全部' },
  { key: 'transport', label: '🚆 交通' },
  { key: 'attraction', label: '🎫 景點' },
];

interface TicketCardProps {
  ticket: (typeof ticketsData)[0];
  onViewImage: (src: string, title: string) => void;
  onViewGuide: () => void;
}

function TicketCard({ ticket, onViewImage, onViewGuide }: TicketCardProps) {
  const [expanded, setExpanded] = useState(false);
  const badge = STATUS_BADGE[ticket.status] || STATUS_BADGE.pending;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 text-left tap-highlight">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{ticket.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-base truncate text-dark-navy">{ticket.name}</h3>
              {ticket.important && <span className="text-xs">🔴</span>}
            </div>
            <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${badge.class}`}>
              {badge.text}
            </span>
            {ticket.dates && (
              <p className="text-xs text-warm-gray mt-1 font-medium">
                Day {ticket.useDays.join(', ')} • {ticket.dates[0]?.slice(5)}
              </p>
            )}
          </div>
          <span className={`text-warm-gray text-sm transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</span>
        </div>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-100/50 pt-3">
          {/* Details */}
          {ticket.details && (
            <div className="space-y-1 bg-fuji-snow/30 p-3 rounded-xl">
              {Object.entries(ticket.details).map(([key, val]) => val && (
                <div key={key} className="flex gap-2 text-sm">
                  <span className="text-warm-gray min-w-[70px] text-xs font-semibold">{key}</span>
                  <span className="font-semibold text-dark-navy">{String(val)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Warning */}
          {ticket.warning && (
            <div className="bg-danger-light rounded-xl p-3">
              <p className="text-sm text-danger font-semibold">⚠️ {ticket.warning}</p>
            </div>
          )}

          {/* Pickup instructions */}
          {ticket.pickupInstructions && ticket.pickupInstructions.length > 0 && (
            <div className="bg-fuji-ice rounded-xl p-3">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-semibold text-fuji-blue">📋 取票/使用說明</p>
                {(ticket.id === 'fuji-excursion' || ticket.id === 'kaiji') && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewGuide();
                    }}
                    className="text-xs bg-fuji-blue text-white px-2 py-1 rounded-md font-bold tap-highlight"
                  >
                    📖 步驟圖解
                  </button>
                )}
              </div>
              <ol className="space-y-1">
                {ticket.pickupInstructions.map((inst, i) => (
                  <li key={i} className="text-xs text-dark-navy flex gap-2">
                    <span className="text-warm-gray font-bold">{i + 1}.</span>
                    <span className="font-medium">{inst}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Ticket image preview */}
          {ticket.ticketImage && (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
              <button
                onClick={() => onViewImage(ticket.ticketImage!, ticket.name)}
                className="block w-full focus:outline-none"
              >
                <img
                  src={ticket.ticketImage}
                  alt={ticket.name}
                  className="max-h-48 rounded-lg mx-auto shadow-sm hover:opacity-90 transition-opacity"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <p className="text-xs text-fuji-blue font-semibold mt-2">🔍 點擊放大顯示（過閘專用）</p>
              </button>
            </div>
          )}

          {/* Map link */}
          {ticket.mapUrl && (
            <a href={ticket.mapUrl} target="_blank" rel="noopener noreferrer"
              className="block w-full text-center bg-forest-green text-white rounded-xl py-2.5 text-sm font-semibold tap-highlight shadow-sm">
              🗺️ 開啟 Google Maps
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function TicketPinLock({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleDigit = (d: string) => {
    if (pin.length >= 3) return;
    const next = pin + d;
    setPin(next);
    setError(false);
    if (next.length === 3) {
      if (next === '520') {
        sessionStorage.setItem('tickets-unlocked', 'true');
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
    <div className="flex flex-col items-center justify-center py-12 px-6 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-[280px] mx-auto mt-16">
      <span className="text-4xl mb-3">🔒</span>
      <h2 className="font-bold text-lg text-dark-navy mb-1 text-center">解鎖票券中心</h2>
      <p className="text-[11px] text-warm-gray mb-6 text-center leading-normal">此頁面包含個人車票與 QR Code 敏感資訊，請輸入解鎖密碼</p>

      {/* PIN dots */}
      <div className="flex gap-4 mb-8">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
              error
                ? 'bg-red-400'
                : i < pin.length
                  ? 'bg-fuji-blue scale-110'
                  : 'bg-fuji-ice border border-gray-250'
            }`}
          />
        ))}
      </div>

      {/* Numpad */}
      <div className="grid grid-cols-3 gap-3.5 w-full">
        {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((key, idx) => (
          <button
            key={key || `empty-${idx}`}
            disabled={key === ''}
            onClick={() => key === '⌫' ? handleDelete() : key && handleDigit(key)}
            className={`h-14 rounded-2xl text-xl font-bold transition-all tap-highlight ${
              key === ''
                ? 'invisible'
                : 'bg-fuji-snow text-dark-navy hover:bg-fuji-ice active:bg-fuji-blue active:text-white'
            }`}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}

function InsuranceMembersDetail() {
  const [expandedMember, setExpandedMember] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="bg-fuji-ice/50 border border-fuji-blue/10 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-dark-navy mb-1 flex items-center gap-1.5">
          <span>🔒</span> 家族極密保單資料 (已解鎖)
        </h3>
        <p className="text-[11px] text-warm-gray leading-normal">
          此處包含護照號碼與身分證字號等個人極密資訊，供就醫、登機或緊急事故時快速核對查閱。
        </p>
      </div>

      <div className="space-y-3">
        {insuranceData.members.map(m => {
          const isOpen = expandedMember === m.id;
          return (
            <div key={m.id} className="bg-white rounded-2xl shadow-sm border border-gray-150/40 overflow-hidden">
              <button
                onClick={() => setExpandedMember(isOpen ? null : m.id)}
                className="w-full p-4 flex items-center justify-between text-left tap-highlight"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl shrink-0">👤</span>
                  <div>
                    <h4 className="font-bold text-base text-dark-navy">
                      {m.nameZhFull} <span className="text-xs text-warm-gray font-normal">({m.nameEn})</span>
                    </h4>
                    <p className="text-[11px] text-warm-gray font-medium mt-0.5">
                      保單：{m.policyNumber}
                    </p>
                  </div>
                </div>
                <span className={`text-warm-gray text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 border-t border-gray-100/60 pt-3.5 space-y-3 bg-fuji-snow/20 text-xs">
                  {/* Personal info table */}
                  <div className="bg-white rounded-xl p-3 border border-gray-150/60 space-y-2">
                    <div className="flex justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-warm-gray font-semibold">身分證字號</span>
                      <span className="font-bold text-dark-navy font-mono">{m.idNumber}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-warm-gray font-semibold">護照號碼</span>
                      <span className="font-bold text-dark-navy font-mono">{m.passport}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-warm-gray font-semibold">出生日期</span>
                      <span className="font-bold text-dark-navy">{m.birthDate}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-1.5">
                      <span className="text-warm-gray font-semibold">投保方案</span>
                      <span className="font-bold text-fuji-blue">{m.plan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-warm-gray font-semibold">保費金額</span>
                      <span className="font-bold text-dark-navy">{m.premium} 元</span>
                    </div>
                  </div>

                  {/* Coverage details */}
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold text-warm-gray px-1 uppercase tracking-wider">🛡️ 本人承保內容明細</p>
                    <div className="bg-white rounded-xl p-3 border border-gray-150/60 space-y-1.5">
                      {m.coverages.map((cov, idx) => (
                        <p key={idx} className="text-dark-navy font-semibold flex items-start gap-1.5">
                          <span className="text-fuji-blue font-bold">•</span>
                          <span>{cov}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TicketsPage() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('tickets-unlocked') === 'true');
  const [subTab, setSubTab] = useState<'tickets' | 'insurance'>('tickets');
  const [tab, setTab] = useState('all');
  const [modalImage, setModalImage] = useState<{ src: string; title: string } | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [guideIndex, setGuideIndex] = useState(0);

  const filtered = tab === 'all' ? ticketsData : ticketsData.filter(t => t.category === tab);

  const guideImages = [
    { src: '/tickets/guide-1.jpg', desc: '1. 到達車站尋找指定售票機（有 "えきねっと" 標誌）' },
    { src: '/tickets/guide-2.jpg', desc: '2. 螢幕右上角選繁中，選「領取車票」→「JR東京列車預訂」→「QR碼或取票碼」' },
    { src: '/tickets/guide-3.jpg', desc: '3. 掃描下方 QR Code 或輸入受取代碼領取實體票' }
  ];

  if (!unlocked) {
    return <TicketPinLock onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-24">
      <h1 className="text-xl font-bold mb-4">🎟️ 票券與保單中心</h1>

      {/* SubTab switcher */}
      <div className="flex bg-fuji-ice/60 p-1 rounded-2xl mb-5">
        <button
          onClick={() => setSubTab('tickets')}
          className={`flex-1 py-2.5 text-center text-xs font-bold rounded-xl transition-all tap-highlight ${
            subTab === 'tickets' ? 'bg-white text-fuji-blue shadow-sm' : 'text-warm-gray'
          }`}
        >
          🎫 乘車景點票券
        </button>
        <button
          onClick={() => setSubTab('insurance')}
          className={`flex-1 py-2.5 text-center text-xs font-bold rounded-xl transition-all tap-highlight ${
            subTab === 'insurance' ? 'bg-white text-fuji-blue shadow-sm' : 'text-warm-gray'
          }`}
        >
          🛡️ 家族保單明細
        </button>
      </div>

      {subTab === 'tickets' ? (
        <>
          {/* Category tabs */}
          <div className="flex gap-2 mb-4">
            {CATEGORY_TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all tap-highlight ${
                  tab === t.key ? 'bg-fuji-blue text-white' : 'bg-white text-dark-navy border border-gray-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Ticket list */}
          <div className="space-y-3">
            {filtered.map(ticket => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onViewImage={(src, title) => setModalImage({ src, title })}
                onViewGuide={() => {
                  setGuideIndex(0);
                  setShowGuide(true);
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <InsuranceMembersDetail />
      )}

      {/* Full screen QR Code / Barcode Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-between p-6"
          onClick={() => setModalImage(null)}
        >
          {/* Header */}
          <div className="w-full flex justify-between items-center text-white pt-safe">
            <h3 className="font-bold text-lg">{modalImage.title}</h3>
            <button className="text-2xl font-semibold p-2">&times;</button>
          </div>

          {/* QR Container - White background for scanning */}
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full aspect-square flex items-center justify-center shadow-2xl">
            <img
              src={modalImage.src}
              alt={modalImage.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Footer guidance */}
          <div className="text-center pb-safe">
            <p className="text-white/80 text-sm font-semibold mb-1">請將此 QR Code 靠近售票機掃描器</p>
            <p className="text-white/60 text-xs">建議調高螢幕亮度</p>
          </div>
        </div>
      )}

      {/* Pickup Vending Machine Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-150 flex justify-between items-center">
              <h3 className="font-bold text-dark-navy">JR 上野站取票教學</h3>
              <button
                onClick={() => setShowGuide(false)}
                className="text-warm-gray text-xl p-1"
              >
                &times;
              </button>
            </div>

            {/* Modal Content - Carousel */}
            <div className="p-4 flex-1 flex flex-col justify-center">
              <img
                src={guideImages[guideIndex].src}
                alt={`Guide Step ${guideIndex + 1}`}
                className="max-h-80 w-full object-contain rounded-xl mb-4 bg-gray-50"
              />
              <p className="text-sm font-semibold text-dark-navy text-center mb-4 min-h-[40px]">
                {guideImages[guideIndex].desc}
              </p>

              {/* Navigation dots */}
              <div className="flex justify-center gap-2 mb-4">
                {guideImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setGuideIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      guideIndex === idx ? 'bg-fuji-blue w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex gap-3">
                <button
                  disabled={guideIndex === 0}
                  onClick={() => setGuideIndex(prev => prev - 1)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-warm-gray disabled:opacity-40 tap-highlight"
                >
                  上一步
                </button>
                {guideIndex < guideImages.length - 1 ? (
                  <button
                    onClick={() => setGuideIndex(prev => prev + 1)}
                    className="flex-1 py-2.5 rounded-xl bg-fuji-blue text-white text-sm font-bold tap-highlight"
                  >
                    下一步
                  </button>
                ) : (
                  <button
                    onClick={() => setShowGuide(false)}
                    className="flex-1 py-2.5 rounded-xl bg-forest-green text-white text-sm font-bold tap-highlight"
                  >
                    完成
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
