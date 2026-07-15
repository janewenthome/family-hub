import { useState } from 'react';
import insuranceData from '../data/insurance.json';

/* ──────────── 公開資訊：台灣家人可見 ──────────── */

function PublicEmergencyContacts() {
  const guide = insuranceData.taiwanFamilyGuide;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🇹🇼</span>
          <h3 className="text-sm font-bold text-dark-navy">{guide.title}</h3>
        </div>
        <p className="text-xs text-warm-gray leading-relaxed font-medium">{guide.description}</p>

        {/* 緊急電話快速撥打 */}
        <div className="space-y-2">
          <a
            href="tel:+886-2-25636292"
            className="flex items-center gap-3 p-3 bg-red-50 hover:bg-red-100/70 border border-red-100 rounded-2xl tap-highlight active:scale-[0.98] text-xs"
          >
            <span className="text-2xl shrink-0">🛡️</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-red-700">富邦產險 海外緊急救援專線</p>
              <p className="text-[10px] text-red-600 leading-normal">24H 全球緊急救援 (含醫療轉送)</p>
            </div>
            <span className="text-[10px] font-bold bg-red-600 text-white px-2.5 py-1 rounded-lg shrink-0">
              📞 撥打
            </span>
          </a>

          <a
            href="tel:+886-2-82535932"
            className="flex items-center gap-3 p-3 bg-rose-50 hover:bg-rose-100/70 border border-rose-100 rounded-2xl tap-highlight active:scale-[0.98] text-xs"
          >
            <span className="text-2xl shrink-0">🌸</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-rose-700">新安東京 海外緊急救援專線</p>
              <p className="text-[10px] text-rose-600 leading-normal">海外急難救助 +886-2-8253-5932</p>
            </div>
            <span className="text-[10px] font-bold bg-rose-600 text-white px-2.5 py-1 rounded-lg shrink-0">
              📞 撥打
            </span>
          </a>

          <a
            href="tel:0800-050-119"
            className="flex items-center gap-3 p-3 bg-rose-50/60 hover:bg-rose-100/50 border border-rose-100/60 rounded-2xl tap-highlight active:scale-[0.98] text-xs"
          >
            <span className="text-2xl shrink-0">🌸</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-rose-700">新安東京 客服及申訴專線</p>
              <p className="text-[10px] text-rose-600 leading-normal">國內免費客服 0800-050-119</p>
            </div>
            <span className="text-[10px] font-bold bg-rose-600 text-white px-2.5 py-1 rounded-lg shrink-0">
              📞 撥打
            </span>
          </a>

          <a
            href="tel:+886-2-25773814"
            className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100/70 border border-blue-100 rounded-2xl tap-highlight active:scale-[0.98] text-xs"
          >
            <span className="text-2xl shrink-0">💳</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-blue-700">新光產物 (台新不便險) 客服專線</p>
              <p className="text-[10px] text-blue-600 leading-normal">不便險理賠申報 +886-2-2577-3814</p>
            </div>
            <span className="text-[10px] font-bold bg-blue-600 text-white px-2.5 py-1 rounded-lg shrink-0">
              📞 撥打
            </span>
          </a>

          <a
            href="tel:+886-2-25075335"
            className="flex items-center gap-3 p-3 bg-blue-50/60 hover:bg-blue-100/50 border border-blue-100/60 rounded-2xl tap-highlight active:scale-[0.98] text-xs"
          >
            <span className="text-2xl shrink-0">💳</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-blue-700">新光產物 旅平險客服專線</p>
              <p className="text-[10px] text-blue-600 leading-normal">旅平險理賠申報 +886-2-2507-5335</p>
            </div>
            <span className="text-[10px] font-bold bg-blue-600 text-white px-2.5 py-1 rounded-lg shrink-0">
              📞 撥打
            </span>
          </a>

          <a
            href="https://tokiomarinenichido.jp/zh-hant/china2/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-100 rounded-2xl tap-highlight active:scale-[0.98] text-xs"
          >
            <span className="text-2xl shrink-0">🇯🇵</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-emerald-700">東京海上日動 線上投保與服務</p>
              <p className="text-[10px] text-emerald-600 leading-normal">訪日旅客專屬 1,000 萬醫療實支 (入境日本後線上投保)</p>
            </div>
            <span className="text-[10px] font-bold bg-emerald-600 text-white px-2.5 py-1 rounded-lg shrink-0">
              🌐 前往投保
            </span>
          </a>
        </div>

        {/* 關鍵報案資訊 */}
        <div className="bg-fuji-snow/60 p-3 rounded-xl border border-gray-150 space-y-2">
          <p className="text-[11px] font-bold text-danger">☎️ 請告知客服以下關鍵資訊：</p>
          {guide.detailsToReport.map((detail: string, idx: number) => (
            <p key={idx} className="text-[10px] text-dark-navy font-semibold leading-relaxed">
              • {detail}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function PublicCoordinationStrategy() {
  const strategies = insuranceData.coordinationStrategy;
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full p-4 flex items-center justify-between tap-highlight">
        <div className="flex items-center gap-2">
          <span className="text-lg">💡</span>
          <h3 className="text-sm font-bold text-dark-navy">{strategies.title}</h3>
        </div>
        <span className={`text-warm-gray text-sm transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-2">
          {strategies.strategies.map((strat: { title: string; desc: string }, idx: number) => (
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
      )}
    </div>
  );
}

function PublicClaimsGuide() {
  const claims = insuranceData.claimsGuide;
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full p-4 flex items-center justify-between tap-highlight">
        <div className="flex items-center gap-2">
          <span className="text-lg">📋</span>
          <h3 className="text-sm font-bold text-dark-navy">{claims.title}</h3>
        </div>
        <span className={`text-warm-gray text-sm transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-2">
          {claims.categories.map((cat: { type: string; docs: string[] }, idx: number) => (
            <div key={idx} className="bg-fuji-snow/40 border border-gray-150 rounded-xl p-3 text-xs">
              <p className="font-bold text-dark-navy mb-1.5">{cat.type}</p>
              <ul className="space-y-1 list-disc list-inside text-[11px] text-warm-gray pl-1 leading-relaxed">
                {cat.docs.map((doc: string, i: number) => (
                  <li key={i} className="marker:text-fuji-blue font-medium">{doc}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PublicCoverageSummary() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-lg">🛡️</span>
        <h3 className="text-sm font-bold text-dark-navy">保障額度速覽</h3>
      </div>

      {/* 富邦 */}
      <div className="bg-fuji-ice/40 border border-fuji-blue/10 rounded-xl p-3 text-xs space-y-1.5">
        <p className="font-bold text-fuji-blue flex items-center gap-1">🛡️ 富邦公教旅平卡專案</p>
        <p className="text-warm-gray font-medium">保障期間：2026/07/24 ~ 08/04 (11天)</p>
        <div className="grid grid-cols-2 gap-1.5 mt-2">
          {[
            { label: '旅平險 (身故/失能)', val: '200萬' },
            { label: '意外+突發疾病醫療', val: '各20萬' },
            { label: '班機延誤 (定額)', val: '每4h/5千' },
            { label: '行李延誤 (定額)', val: '6千/次' },
            { label: '旅程取消 (實支)', val: '6萬' },
            { label: '緊急救援費用', val: '50萬' },
          ].map((item, i) => (
            <div key={i} className="bg-white/80 rounded-lg p-2 border border-fuji-blue/5">
              <p className="text-[10px] text-warm-gray">{item.label}</p>
              <p className="font-bold text-dark-navy">{item.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 新安東京 */}
      <div className="bg-rose-50/40 border border-rose-100/30 rounded-xl p-3 text-xs space-y-1.5">
        <p className="font-bold text-rose-700 flex items-center gap-1">🌸 新安東京平安御守專案</p>
        <p className="text-warm-gray font-medium">保障期間：2026/07/24 ~ 08/03 (10天)</p>
        <div className="grid grid-cols-2 gap-1.5 mt-2">
          {[
            { label: '旅平險 (身故/失能)', val: '最高200萬' },
            { label: '傷害醫療 (實支)', val: '最高20萬' },
            { label: '班機延誤 (定額累進)', val: '每4h/6千' },
            { label: '行李延誤/損失', val: '各6,000元' },
            { label: '旅程取消/更改', val: '各1萬/人' },
            { label: '個人責任險', val: '最高60萬' },
          ].map((item, i) => (
            <div key={i} className="bg-white/80 rounded-lg p-2 border border-rose-100/10">
              <p className="text-[10px] text-warm-gray">{item.label}</p>
              <p className="font-bold text-dark-navy">{item.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 東京海上日動 */}
      <div className="bg-emerald-50/40 border border-emerald-100/30 rounded-xl p-3 text-xs space-y-1.5">
        <p className="font-bold text-emerald-700 flex items-center gap-1">🇯🇵 東京海上日動 OMOTENASHI</p>
        <p className="text-warm-gray font-medium">保障期間：2026/07/25 ~ 08/01 (8天) | 入境後首晚線上投保</p>
        <div className="grid grid-cols-2 gap-1.5 mt-2">
          {[
            { label: '疾病/意外醫療實支', val: '1,000萬日圓/人' },
            { label: '無涉卡現金就醫', val: '免現場墊付費用' },
            { label: '預計總保費', val: '16,300 JPY/5人' },
            { label: '單人保費', val: '3,260 JPY/8天' },
            { label: '24H中文電話翻譯', val: '中文即時醫療翻譯' },
            { label: '護照/信用卡遺失', val: '協助救援服務' },
          ].map((item, i) => (
            <div key={i} className="bg-white/80 rounded-lg p-2 border border-emerald-100/10">
              <p className="text-[10px] text-warm-gray">{item.label}</p>
              <p className="font-bold text-dark-navy">{item.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 台新 */}
      <div className="bg-blue-50/40 border border-blue-100/40 rounded-xl p-3 text-xs space-y-1.5">
        <p className="font-bold text-blue-700 flex items-center gap-1">💳 台新 Richart 信用卡 (新光產物承保)</p>
        <p className="text-warm-gray font-medium">持卡人、配偶及未滿25歲未婚子女同行享有保障</p>
        <div className="grid grid-cols-2 gap-1.5 mt-2">
          {[
            { label: '公共運輸意外', val: '最高3,000萬' },
            { label: '海外全程意外', val: '最高500萬' },
            { label: '班機延誤 (實支)', val: '全家上限2萬' },
            { label: '行李遺失 (實支)', val: '全家上限8萬' },
            { label: '行程縮短 (實支)', val: '全家上限3萬' },
            { label: '旅行文件重置', val: '全家上限5千' },
          ].map((item, i) => (
            <div key={i} className="bg-white/80 rounded-lg p-2 border border-blue-50">
              <p className="text-[10px] text-warm-gray">{item.label}</p>
              <p className="font-bold text-dark-navy">{item.val}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────── 私密資訊：密碼保護 ──────────── */

function PrivatePinLock({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const CORRECT_PIN = '520';

  const handleDigit = (d: string) => {
    const next = pin + d;
    setPin(next);
    setError(false);
  };

  const handleDelete = () => {
    setPin(p => p.slice(0, -1));
    setError(false);
  };

  const handleSubmit = () => {
    if (pin === CORRECT_PIN) {
      sessionStorage.setItem('insurance-private-unlocked', 'true');
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => { setPin(''); setError(false); }, 800);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 flex flex-col items-center">
        <span className="text-4xl mb-3">🔐</span>
        <h3 className="font-bold text-lg text-dark-navy mb-1">個人保單極密資料</h3>
        <p className="text-[11px] text-warm-gray mb-4 text-center leading-normal">
          此處包含護照號碼、身分證字號等完整個資<br />請輸入密碼解鎖查閱
        </p>

        {/* Password display */}
        <div className={`w-full mb-4 px-4 py-3 bg-fuji-snow border rounded-xl text-center font-mono text-lg tracking-widest transition-all ${
          error ? 'border-red-400 bg-red-50 text-red-500 animate-shake' : 'border-gray-200 text-dark-navy'
        }`}>
          {pin ? '•'.repeat(pin.length) : <span className="text-warm-gray/40">輸入密碼</span>}
        </div>

        {/* Keyboard */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-[260px] mb-4">
          {['1','2','3','4','5','6','7','8','9','0','⌫',''].map((key, idx) => (
            <button
              key={key || `empty-${idx}`}
              disabled={key === ''}
              onClick={() => key === '⌫' ? handleDelete() : key && handleDigit(key)}
              className={`h-12 rounded-xl text-lg font-bold transition-all tap-highlight ${
                key === ''
                  ? 'invisible'
                  : key === '⌫'
                    ? 'bg-gray-100 text-warm-gray hover:bg-gray-200'
                    : 'bg-fuji-snow text-dark-navy hover:bg-fuji-ice active:bg-fuji-blue active:text-white'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={pin.length === 0}
          className="w-full max-w-[260px] py-3 rounded-xl bg-fuji-blue text-white font-bold text-sm transition-all tap-highlight disabled:opacity-40 disabled:cursor-not-allowed hover:bg-fuji-deep"
        >
          解鎖查閱
        </button>

        {error && (
          <p className="text-danger text-xs font-semibold mt-2 animate-pulse">❌ 密碼錯誤，請重新輸入</p>
        )}
      </div>
    </div>
  );
}

function PrivateMemberDetail() {
  const [expandedMember, setExpandedMember] = useState<string | null>(null);
  const [policyTab, setPolicyTab] = useState<'fubon' | 'shinan' | 'tokio' | 'taishin'>('fubon');

  return (
    <div className="space-y-3">
      <div className="bg-fuji-ice/50 border border-fuji-blue/10 rounded-2xl p-4">
        <h3 className="text-sm font-bold text-dark-navy mb-1 flex items-center gap-1.5">
          <span>🔓</span> 家族保單個人明細 (已解鎖)
        </h3>
        <p className="text-[11px] text-warm-gray leading-normal">
          包含護照號碼、身分證字號、保單號碼、保障內容等完整資訊，供就醫或理賠時快速核對。
        </p>
      </div>

      {insuranceData.members.map(m => {
        const isOpen = expandedMember === m.id;
        return (
          <div key={m.id} className="bg-white rounded-2xl shadow-sm border border-gray-150/40 overflow-hidden">
            <button
              onClick={() => {
                setExpandedMember(isOpen ? null : m.id);
                setPolicyTab('fubon');
              }}
              className="w-full p-4 flex items-center justify-between text-left tap-highlight"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl shrink-0">👤</span>
                <div>
                  <h4 className="font-bold text-base text-dark-navy">
                    {m.nameZhFull} <span className="text-xs text-warm-gray font-normal">({m.nameEn})</span>
                  </h4>
                  <p className="text-[11px] text-warm-gray font-medium mt-0.5 leading-snug">
                    保費 {m.premium} • {m.period}
                  </p>
                </div>
              </div>
              <span className={`text-warm-gray text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 border-t border-gray-100/60 pt-3.5 space-y-3 bg-fuji-snow/20 text-xs">
                {/* Personal info table */}
                <div className="bg-white rounded-xl p-3 border border-gray-150/60 space-y-2">
                  {[
                    { label: '身分證字號', value: m.idNumber, mono: true },
                    { label: '護照號碼', value: m.passport, mono: true },
                    { label: '出生日期', value: m.birthDate },
                    { label: '投保方案', value: m.plan, highlight: true },
                    { label: '保單號碼', value: m.policyNumber, mono: true },
                    { label: '保障期間', value: m.period },
                    { label: '保費金額', value: `${m.premium}` },
                  ].map((row, i) => (
                    <div key={i} className={`flex justify-between ${i < 6 ? 'border-b border-gray-100 pb-1.5' : ''}`}>
                      <span className="text-warm-gray font-semibold">{row.label}</span>
                      <span className={`font-bold text-right leading-tight max-w-[65%] ${
                        row.highlight ? 'text-fuji-blue' : 'text-dark-navy'
                      } ${row.mono ? 'font-mono' : ''}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tabs for Fubon vs Shinan vs Tokio vs Taishin */}
                <div className="flex gap-1.5 p-0.5 bg-gray-100 rounded-lg">
                  <button
                    onClick={() => setPolicyTab('fubon')}
                    className={`flex-1 py-1.5 text-center text-[10px] font-bold rounded-md transition-all ${
                      policyTab === 'fubon'
                        ? 'bg-white text-fuji-blue shadow-sm'
                        : 'text-warm-gray'
                    }`}
                  >
                    🛡️ 富邦
                  </button>
                  <button
                    onClick={() => setPolicyTab('shinan')}
                    className={`flex-1 py-1.5 text-center text-[10px] font-bold rounded-md transition-all ${
                      policyTab === 'shinan'
                        ? 'bg-white text-fuji-blue shadow-sm'
                        : 'text-warm-gray'
                    }`}
                  >
                    🌸 新安
                  </button>
                  <button
                    onClick={() => setPolicyTab('tokio')}
                    className={`flex-1 py-1.5 text-center text-[10px] font-bold rounded-md transition-all ${
                      policyTab === 'tokio'
                        ? 'bg-white text-fuji-blue shadow-sm'
                        : 'text-warm-gray'
                    }`}
                  >
                    🇯🇵 東京
                  </button>
                  <button
                    onClick={() => setPolicyTab('taishin')}
                    className={`flex-1 py-1.5 text-center text-[10px] font-bold rounded-md transition-all ${
                      policyTab === 'taishin'
                        ? 'bg-white text-fuji-blue shadow-sm'
                        : 'text-warm-gray'
                    }`}
                  >
                    💳 台新
                  </button>
                </div>

                {/* Coverage details */}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold text-warm-gray px-1 uppercase tracking-wider">
                    {policyTab === 'fubon' 
                      ? '🛡️ 富邦承保內容明細' 
                      : policyTab === 'shinan' 
                        ? '🌸 新安東京承保內容明細' 
                        : policyTab === 'tokio'
                          ? '🇯🇵 東京海上日動承保內容明細'
                          : '💳 台新/新光承保內容明細'}
                  </p>
                  <div className="bg-white rounded-xl p-3 border border-gray-150/60 space-y-1.5">
                    {policyTab === 'fubon' ? (
                      m.coverages.map((cov, idx) => (
                        <p key={idx} className="text-dark-navy font-semibold flex items-start gap-1.5 leading-relaxed">
                          <span className="text-fuji-blue font-bold">•</span>
                          <span>{cov}</span>
                        </p>
                      ))
                    ) : policyTab === 'shinan' ? (
                      m.shinanCoverages && m.shinanCoverages.length > 0 ? (
                        m.shinanCoverages.map((cov, idx) => (
                          <p key={idx} className="text-dark-navy font-semibold flex items-start gap-1.5 leading-relaxed">
                            <span className="text-rose-600 font-bold">•</span>
                            <span>{cov}</span>
                          </p>
                        ))
                      ) : (
                        <p className="text-warm-gray font-medium text-center py-2">⚠️ 此成員未加保新安東京產險</p>
                      )
                    ) : policyTab === 'tokio' ? (
                      m.tokioCoverages && m.tokioCoverages.length > 0 ? (
                        m.tokioCoverages.map((cov, idx) => (
                          <p key={idx} className="text-dark-navy font-semibold flex items-start gap-1.5 leading-relaxed">
                            <span className="text-emerald-600 font-bold">•</span>
                            <span>{cov}</span>
                          </p>
                        ))
                      ) : (
                        <p className="text-warm-gray font-medium text-center py-2">⚠️ 此成員未加保東京海上日動產險</p>
                      )
                    ) : (
                      m.creditCardCoverages.map((cov, idx) => (
                        <p key={idx} className="text-dark-navy font-semibold flex items-start gap-1.5 leading-relaxed">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{cov}</span>
                        </p>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ──────────── 保險頁面主體 ──────────── */

interface InsurancePageProps {
  lang: 'zh' | 'ja';
}

export default function InsurancePage({ lang }: InsurancePageProps) {
  const [privateUnlocked, setPrivateUnlocked] = useState(
    () => sessionStorage.getItem('insurance-private-unlocked') === 'true'
  );
  const [activeSection, setActiveSection] = useState<'public' | 'private'>('public');

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-24">
      <h1 className="text-xl font-bold mb-1">
        {lang === 'zh' ? '🛡️ 旅遊保險戰情室' : '🛡️ 旅行保険センター'}
      </h1>
      <p className="text-xs text-warm-gray font-medium mb-4">
        {lang === 'zh' ? '富邦旅平險 + 台新信用卡不便險 雙險保障' : '富邦旅行保険 + 台新カード保険'}
      </p>

      {/* Section Switcher */}
      <div className="flex bg-fuji-ice/60 p-1 rounded-2xl mb-5">
        <button
          onClick={() => setActiveSection('public')}
          className={`flex-1 py-2.5 text-center text-xs font-bold rounded-xl transition-all tap-highlight ${
            activeSection === 'public' ? 'bg-white text-fuji-blue shadow-sm' : 'text-warm-gray'
          }`}
        >
          {lang === 'zh' ? '🇹🇼 公開資訊 (家人可見)' : '🇹🇼 公開情報'}
        </button>
        <button
          onClick={() => setActiveSection('private')}
          className={`flex-1 py-2.5 text-center text-xs font-bold rounded-xl transition-all tap-highlight ${
            activeSection === 'private' ? 'bg-white text-fuji-blue shadow-sm' : 'text-warm-gray'
          }`}
        >
          {lang === 'zh' ? '🔐 個人明細 (需密碼)' : '🔐 個人詳細'}
        </button>
      </div>

      {activeSection === 'public' ? (
        <div className="space-y-4">
          <PublicEmergencyContacts />
          <PublicCoverageSummary />
          <PublicCoordinationStrategy />
          <PublicClaimsGuide />
        </div>
      ) : (
        privateUnlocked ? (
          <PrivateMemberDetail />
        ) : (
          <PrivatePinLock onUnlock={() => setPrivateUnlocked(true)} />
        )
      )}
    </div>
  );
}
