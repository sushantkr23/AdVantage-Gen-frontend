import React from 'react';
import { FiDownload, FiMaximize2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ImagePreview = ({ imageUrl, platform = 'Instagram' }) => {
  const handleDownload = async () => {
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `campaign-${platform.toLowerCase()}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
      toast.success('Image downloaded!');
    } catch {
      toast.error('Download failed');
    }
  };

  if (!imageUrl) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-gray-200 aspect-square flex items-center justify-center">
        <p className="text-gray-400 text-sm">Generated image will appear here</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
      <div className="relative group">
        <img src={imageUrl} alt="Generated campaign" className="w-full object-cover" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button
            onClick={handleDownload}
            className="bg-white text-gray-800 px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-orange-500 hover:text-white transition-colors shadow-lg"
          >
            <FiDownload size={15} /> Download
          </button>
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-gray-800 p-2.5 rounded-xl hover:bg-orange-500 hover:text-white transition-colors shadow-lg"
            title="View full size"
          >
            <FiMaximize2 size={15} />
          </a>
        </div>
      </div>

      <div className="px-4 py-3 flex items-center justify-between bg-gray-50 border-t border-gray-100">
        <span className="text-xs font-medium text-gray-500">Optimized for {platform}</span>
        <button
          onClick={handleDownload}
          className="text-xs text-orange-500 font-semibold hover:text-orange-600 flex items-center gap-1"
        >
          <FiDownload size={12} /> Save
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
