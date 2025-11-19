import { error } from "console";
import React, { useRef, useState } from "react";

interface AvatarUploadProps {
  value?: File | null;
  onChange?: (file: File | null) => void;
  initialImage?: string; // for existing avatar URL (e.g., from DB)
  error?: string[];
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  value,
  onChange,
  initialImage,
  error,
}) => {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange?.(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Avatar Preview */}
      <div className="relative w-24 h-24">
        {preview ? (
          <img
            src={preview}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm border">
            No Avatar
          </div>
        )}
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0 text-xs hover:bg-red-600 w-5 h-5"
            title="Remove avatar"
          >
            ✕
          </button>
        )}
      </div>
      <div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {preview ? "Change Avatar" : "Upload Avatar"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {error && error.length > 0 && (
        <div className="text-red-600 text-sm mt-1">
          {error.map((errMsg, index) => (
            <p key={index}>{errMsg}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
