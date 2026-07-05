import { useState } from 'react';
import { usePackingStore } from '../store/packingStore';
import packingData from '../data/packing.json';

export default function PackingPage() {
  const { checkedItems, toggleItem, resetAll, getProgress, getTotalProgress } = usePackingStore();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    // Expand the first category (Documents) by default
    return { documents: true };
  });

  const categories = packingData.categories;
  const { checked: totalChecked, total: totalItems } = getTotalProgress(categories);
  const totalPercent = totalItems > 0 ? Math.round((totalChecked / totalItems) * 100) : 0;

  const handleReset = () => {
    if (window.confirm('確定要重置所有勾選狀態嗎？')) {
      resetAll();
    }
  };

  const toggleCategory = (id: string) => {
    setExpandedCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const allExpanded = categories.every(cat => expandedCategories[cat.id]);
  const handleToggleAll = () => {
    if (allExpanded) {
      setExpandedCategories({});
    } else {
      const next: Record<string, boolean> = {};
      categories.forEach(cat => { next[cat.id] = true; });
      setExpandedCategories(next);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-24">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">🧳 動態行李清單</h1>
          <p className="text-xs text-warm-gray mt-0.5">勾選狀態會自動儲存在手機中</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleToggleAll}
            className="text-xs font-semibold text-fuji-blue bg-fuji-ice px-3 py-2 rounded-xl transition-all tap-highlight"
          >
            {allExpanded ? '收合全部' : '展開全部'}
          </button>
          {totalChecked > 0 && (
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-danger bg-danger-light px-3 py-2 rounded-xl transition-all tap-highlight"
            >
              🔄 重置
            </button>
          )}
        </div>
      </header>

      {/* Overall Progress Dashboard */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 border border-white/20">
        <div className="flex items-center gap-5">
          {/* Circular/Semi-circular status */}
          <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-fuji-ice">
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="28"
                className="stroke-gray-200"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                className="stroke-fuji-blue transition-all duration-300"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 28}
                strokeDashoffset={2 * Math.PI * 28 * (1 - totalPercent / 100)}
              />
            </svg>
            <span className="text-sm font-black text-fuji-blue tabular-nums">{totalPercent}%</span>
          </div>

          <div className="flex-1">
            <p className="text-sm font-bold text-dark-navy">打包總進度</p>
            <p className="text-xs text-warm-gray mt-1">
              已完成 <span className="font-bold text-fuji-blue tabular-nums">{totalChecked}</span> / {totalItems} 件物品
            </p>
            {totalPercent === 100 ? (
              <p className="text-xs text-forest-green font-semibold mt-1">🎉 太棒了！全部行李已準備完畢！</p>
            ) : (
              <p className="text-xs text-warm-gray mt-1">出發前請再次核對證件與藥品</p>
            )}
          </div>
        </div>
      </div>

      {/* Category Folders */}
      <div className="space-y-3">
        {categories.map((category) => {
          const { checked, total } = getProgress(category.id, category.items);
          const percent = total > 0 ? Math.round((checked / total) * 100) : 0;
          const isOpen = !!expandedCategories[category.id];

          return (
            <div key={category.id} className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all">
              {/* Category Header Button */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full p-4 text-left flex items-center justify-between tap-highlight"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-2xl flex-shrink-0">{category.emoji}</span>
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center justify-between mb-1 pr-2">
                      <span className="font-bold text-base text-dark-navy">{category.name}</span>
                      <span className="text-xs text-warm-gray font-semibold tabular-nums">
                        {checked}/{total}
                      </span>
                    </div>
                    {/* Category micro progress bar */}
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-fuji-blue transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
                <span className={`text-warm-gray text-xs ml-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {/* Category Items List */}
              {isOpen && (
                <div className="px-4 pb-4 border-t border-gray-100/50 pt-2 bg-fuji-snow/20">
                  <div className="divide-y divide-gray-100">
                    {category.items.map((item) => {
                      const isChecked = !!checkedItems[item.id];
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className="flex items-center gap-3 py-3 text-left cursor-pointer active:bg-gray-50/50 transition-colors"
                        >
                          {/* Custom Checkbox */}
                          <div
                            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                              isChecked
                                ? 'bg-fuji-blue border-fuji-blue text-white'
                                : item.critical
                                  ? 'border-danger bg-danger-light/30'
                                  : 'border-gray-300 bg-white'
                            }`}
                          >
                            {isChecked && (
                              <svg
                                className="w-4 h-4 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                              </svg>
                            )}
                          </div>

                          <div className="flex-1">
                            <span
                              className={`text-base font-medium transition-all ${
                                isChecked ? 'line-through text-warm-gray-light' : 'text-dark-navy'
                              }`}
                            >
                              {item.text}
                            </span>
                            {item.critical && !isChecked && (
                              <span className="inline-block text-[10px] font-bold text-danger bg-danger-light px-1.5 py-0.5 rounded ml-2">
                                必備
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
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
