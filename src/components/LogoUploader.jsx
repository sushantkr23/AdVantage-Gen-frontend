import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const LogoUploader = ({ onLogoUpload }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      onLogoUpload(file);
      setPreview(URL.createObjectURL(file));
    }
  }, [onLogoUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Brand Logo <span className="text-gray-400">(optional)</span>
      </label>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-400'
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="flex items-center gap-3">
            <img src={preview} alt="Logo preview" className="h-12 w-12 object-contain rounded" />
            <p className="text-sm text-gray-600">Logo uploaded. Click to change.</p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            {isDragActive ? 'Drop logo here...' : 'Drag & drop logo or click to upload'}
          </p>
        )}
      </div>
    </div>
  );
};

export default LogoUploader;
