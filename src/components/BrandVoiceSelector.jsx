import React from 'react';

const voices = [
  { value: 'Witty',         emoji: '😄', desc: 'Clever & playful',      color: 'from-yellow-400 to-orange-400' },
  { value: 'Professional',  emoji: '💼', desc: 'Formal & polished',     color: 'from-blue-400 to-indigo-500' },
  { value: 'Urgent',        emoji: '⚡', desc: 'FOMO & action-driven',  color: 'from-red-400 to-rose-500' },
  { value: 'Inspirational', emoji: '✨', desc: 'Uplifting & visionary', color: 'from-violet-400 to-purple-500' },
];

const BrandVoiceSelector = ({ value, onChange }) => (
  <div>
    <label className="label">Brand Voice</label>
    <div className="grid grid-cols-2 gap-2">
      {voices.map((v) => (
        <button
          key={v.value}
          type="button"
          onClick={() => onChange(v.value)}
          className={`relative p-3 rounded-xl border-2 text-left transition-all duration-200 overflow-hidden ${
            value === v.value
              ? 'border-orange-500 bg-orange-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/40'
          }`}
        >
          {value === v.value && (
            <div className={`absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl ${v.color} opacity-20 rounded-bl-2xl`} />
          )}
          <span className="text-xl block mb-1">{v.emoji}</span>
          <p className={`text-xs font-bold ${value === v.value ? 'text-orange-700' : 'text-gray-800'}`}>{v.value}</p>
          <p className="text-xs text-gray-400 mt-0.5">{v.desc}</p>
        </button>
      ))}
    </div>
  </div>
);

export default BrandVoiceSelector;
