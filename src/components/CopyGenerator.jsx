import React, { useState } from 'react';
import { FiCopy, FiCheck, FiHash, FiMessageSquare, FiType, FiMousePointer } from 'react-icons/fi';
import toast from 'react-hot-toast';

const CopyItem = ({ label, content, icon }) => {
  const [copied, setCopied] = useState(false);
  const text = Array.isArray(content) ? content.join(' ') : content;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group bg-gray-50 hover:bg-orange-50/50 rounded-xl p-4 border border-gray-100 hover:border-orange-200 transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-orange-500">{icon}</span>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
        </div>
        <button
          onClick={handleCopy}
          className={`p-1.5 rounded-lg transition-all ${copied ? 'text-green-500 bg-green-50' : 'text-gray-400 hover:text-orange-500 hover:bg-orange-50'}`}
          title={`Copy ${label}`}
        >
          {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
        </button>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{text}</p>
    </div>
  );
};

const CopyGenerator = ({ copy }) => {
  if (!copy) return null;

  const copyAll = () => {
    const all = [copy.headline, copy.caption, copy.hashtags?.join(' '), copy.cta].filter(Boolean).join('\n\n');
    navigator.clipboard.writeText(all);
    toast.success('All copy copied!');
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <FiMessageSquare size={16} className="text-orange-500" /> Generated Copy
        </h3>
        <button onClick={copyAll} className="text-xs text-orange-500 font-semibold hover:text-orange-600 flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition-colors">
          <FiCopy size={12} /> Copy All
        </button>
      </div>

      <div className="p-4 space-y-3">
        {copy.headline && <CopyItem label="Headline" content={copy.headline} icon={<FiType size={14} />} />}
        {copy.caption  && <CopyItem label="Caption"  content={copy.caption}  icon={<FiMessageSquare size={14} />} />}
        {copy.hashtags?.length > 0 && <CopyItem label="Hashtags" content={copy.hashtags} icon={<FiHash size={14} />} />}
        {copy.cta      && <CopyItem label="Call to Action" content={copy.cta} icon={<FiMousePointer size={14} />} />}
      </div>
    </div>
  );
};

export default CopyGenerator;
