import React, { useState, useRef } from "react";

const predefinedTags = ["Nature", "Art", "Tech", "Food", "Fashion"];

export default function SnapForm() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTag, setCustomTag] = useState("");
  const [postText, setPostText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleAddCustomTag = () => {
    const trimmed = customTag.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      setSelectedTags((prev) => [...prev, trimmed]);
      setCustomTag("");
    }
  };

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 w-full max-w-2xl mx-auto mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Snap & Post
      </h2>

      {/* Camera Preview */}
      <div className="bg-gray-200 dark:bg-gray-700 h-10 rounded flex items-center justify-center mb-4">
        <span className="text-gray-500 dark:text-gray-400">
          Camera preview here
        </span>
      </div>

      {/* Mint Count */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Number of NFTs to mint (max 5):
        </label>
        <input
          type="number"
          min={1}
          max={5}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
      </div>

      {/* Post Text */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Short Description:
        </label>
        <textarea
          rows={3}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
        />
      </div>

      {/* Custom Dropdown Tag Selector */}
      <div className="mb-4 relative" ref={dropdownRef}>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Select Tags:
        </label>
        <div
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="cursor-pointer p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        >
          {selectedTags.length > 0
            ? selectedTags.join(", ")
            : "Select tags..."}
        </div>

        {dropdownOpen && (
          <div className="absolute mt-2 w-full z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow max-h-48 overflow-y-auto">
            {predefinedTags.map((tag) => (
              <label
                key={tag}
                className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleTagToggle(tag)}
                  className="mr-2"
                />
                #{tag}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Add Custom Tag */}
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Add custom tag"
          value={customTag}
          onChange={(e) => setCustomTag(e.target.value)}
          className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
        <button
          type="button"
          onClick={handleAddCustomTag}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {/* Submit */}
      <button
        disabled
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full transition disabled:opacity-50"
      >
        Snap & Mint (disabled)
      </button>
    </div>
  );
}
