import { useState } from 'react';
import emergencyData from '../../data/emergency.json';

export default function SosFab() {
  const [open, setOpen] = useState(false);
  const data = emergencyData;

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 z-40 w-12 h-12 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg transition-all border border-red-500/20"
        aria-label="緊急聯絡 SOS"
      >
        <span className="text-xl animate-pulse">🚨</span>
      </button>

      {/* Emergency Overlay Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-slide-up flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-150 flex justify-between items-center bg-red-50">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚨</span>
                <h3 className="font-bold text-red-700">緊急聯絡 SOS</h3>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold p-1"
              >
                &times;
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-4 space-y-4 overflow-y-auto flex-1">
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-warm-gray px-1 uppercase tracking-wider">緊急報警 / 急救（點擊直接撥打）</p>
                <a
                  href={`tel:${data.police.number}`}
                  className="flex items-center gap-3 p-3 bg-red-50 hover:bg-red-100/70 border border-red-100 rounded-2xl tap-highlight active:scale-[0.98]"
                >
                  <span className="text-2xl">{data.police.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-red-700">{data.police.name}</p>
                    <p className="text-xs text-red-600">撥打 110 (免費)</p>
                  </div>
                  <span className="text-base font-bold bg-red-600 text-white px-3 py-1 rounded-full shrink-0">
                    {data.police.number}
                  </span>
                </a>
                <a
                  href={`tel:${data.ambulance.number}`}
                  className="flex items-center gap-3 p-3 bg-red-50 hover:bg-red-100/70 border border-red-100 rounded-2xl tap-highlight active:scale-[0.98]"
                >
                  <span className="text-2xl">{data.ambulance.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-red-700">{data.ambulance.name}</p>
                    <p className="text-xs text-red-600">撥打 119 (免費)</p>
                  </div>
                  <span className="text-base font-bold bg-red-600 text-white px-3 py-1 rounded-full shrink-0">
                    {data.ambulance.number}
                  </span>
                </a>
              </div>

              {/* Embassy */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-warm-gray px-1 uppercase tracking-wider">駐日外交代表（點擊直接撥打）</p>
                <a
                  href={`tel:${data.embassy.emergencyNumber}`}
                  className="flex items-center gap-3 p-3 bg-fuji-ice hover:bg-fuji-ice/80 border border-fuji-blue/10 rounded-2xl tap-highlight active:scale-[0.98]"
                >
                  <span className="text-2xl">{data.embassy.emoji}</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-dark-navy">{data.embassy.name}</p>
                    <p className="text-[10px] text-danger font-bold">🚨 24小時緊急聯絡專線</p>
                  </div>
                  <span className="text-[11px] font-bold bg-fuji-blue text-white px-2.5 py-1 rounded-lg shrink-0">
                    撥打專線
                  </span>
                </a>
              </div>

              {/* Hotels */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-warm-gray px-1 uppercase tracking-wider">飯店緊急電話</p>
                <div className="bg-fuji-snow/40 border border-gray-150 rounded-2xl p-3 space-y-2.5">
                  {data.hotels.map((hotel, i) => {
                    const phone = hotel.name === "日本橋阿克薩斯" ? "+81-3-5640-8066" : hotel.phone;
                    return (
                      <div key={i} className="flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span>{hotel.emoji}</span>
                          <span className="font-bold text-dark-navy truncate">{hotel.name}</span>
                        </div>
                        {phone ? (
                          <a
                            href={`tel:${phone}`}
                            className="bg-white border border-gray-200 px-2.5 py-1 rounded-lg text-fuji-blue font-bold shadow-sm tap-highlight"
                          >
                            📞 撥打
                          </a>
                        ) : (
                          <span className="text-warm-gray font-medium">無電話</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Insurance */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-warm-gray px-1 uppercase tracking-wider">旅遊保險與緊急救援</p>
                <div className="space-y-2">
                  {/* Fubon Emergency Hotline Action Link */}
                  <a
                    href="tel:+886-2-25636292"
                    className="flex items-center gap-3 p-3 bg-red-50 hover:bg-red-100/70 border border-red-100 rounded-2xl tap-highlight active:scale-[0.98] text-xs"
                  >
                    <span className="text-2xl shrink-0">🛡️</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-red-700">富邦產物海外緊急救援專線</p>
                      <p className="text-[10px] text-red-600 leading-normal">點擊撥打：+886-2-25636292</p>
                    </div>
                    <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded-md shrink-0">
                      撥打
                    </span>
                  </a>

                  {data.insurance.map((ins, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-fuji-snow/40 border border-gray-150 rounded-2xl text-xs">
                      <span className="text-lg shrink-0">{ins.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-dark-navy truncate">{ins.name}</p>
                        <p className="text-[10px] text-warm-gray leading-normal mt-0.5">{ins.type}</p>
                        <p className="text-[10px] text-warm-gray leading-normal font-semibold text-fuji-blue mt-0.5">{ins.coverage}</p>
                        <p className="text-[10px] text-danger font-semibold mt-0.5">{ins.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Japanese Translation Card for Hotels */}
              <div className="bg-amber-50 border border-amber-250 rounded-2xl p-3.5 text-xs space-y-2">
                <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                  <span>🇯🇵</span>
                  <span>日文緊急求助卡 (請出示給日本飯店人員)</span>
                </div>
                <p className="text-[11px] text-amber-900 leading-relaxed font-semibold bg-white p-3 rounded-xl border border-amber-100 font-mono">
                  緊急事態が発生したため、台湾の保険会社へ連絡する必要があります。下記の番号へ電話したいのですが、お手伝いいだたけないでしょうか。
                  <br />
                  <span className="text-red-700 font-bold block mt-1">富邦產險 / Fubon Insurance: +886-2-25636292</span>
                </p>
                <p className="text-[9px] text-warm-gray leading-normal">
                  （翻譯意指：因為發生緊急狀況，我需要聯絡台灣的保險公司，能否協助我撥打這個電話？）
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
