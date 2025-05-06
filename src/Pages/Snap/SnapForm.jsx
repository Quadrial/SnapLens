// import React, { useState, useRef, useEffect, useCallback } from "react";
// import Webcam from "react-webcam";
// import { FaCamera, FaTimes, FaRedo, FaCheck, FaPlus } from "react-icons/fa";

// const predefinedTags = ["Nature", "Art", "Tech", "Food", "Fashion"];

// const videoConstraints = {
//   facingMode: "user",
//   width: { ideal: 1280 },
//   height: { ideal: 720 },
// };

// export default function SnapForm() {
//   // Form state
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [customTag, setCustomTag] = useState("");
//   const [postText, setPostText] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [mintCount, setMintCount] = useState(1);

//   // Camera state
//   const [image, setImage] = useState(null);
//   const [showCamera, setShowCamera] = useState(false);
//   const [hasPermission, setHasPermission] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const webcamRef = useRef(null);
//   const dropdownRef = useRef(null);

//   // Check device type and permissions
//   useEffect(() => {
//     setIsMobile(window.innerWidth < 768);

//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Update your camera permission useEffect hook
//   useEffect(() => {
//     if (showCamera) {
//       const checkPermissions = async () => {
//         try {
//           // Modern browsers support permissions API
//           if (navigator.permissions) {
//             const permission = await navigator.permissions.query({
//               name: "camera",
//             });
//             if (permission.state === "denied") {
//               setHasPermission(false);
//               return;
//             }
//           }

//           // Directly request camera access
//           const stream = await navigator.mediaDevices.getUserMedia({
//             video: true,
//           });
//           setHasPermission(true);
//           stream.getTracks().forEach((track) => track.stop());
//         } catch (err) {
//           setHasPermission(false);
//           console.error("Camera access error:", err);
//         }
//       };

//       checkPermissions();
//     }
//   }, [showCamera]);

//   // Camera functions
//   const capture = useCallback(() => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImage(imageSrc);
//     setShowCamera(false);
//   }, [webcamRef]);

//   const handleRetake = () => {
//     setImage(null);
//     setShowCamera(true);
//   };

//   // Tag functions
//   const handleTagToggle = (tag) => {
//     setSelectedTags((prev) =>
//       prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
//     );
//   };

//   const handleAddCustomTag = () => {
//     const trimmed = customTag.trim();
//     if (trimmed && !selectedTags.includes(trimmed)) {
//       setSelectedTags((prev) => [...prev, trimmed]);
//       setCustomTag("");
//     }
//   };

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Replace your permission denied message with this
//   if (hasPermission === false) {
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
//         <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md">
//           <h3 className="font-bold text-lg mb-4">Camera Access Required</h3>
//           <p className="mb-4">
//             {isMobile ? (
//               <>
//                 To enable camera access:
//                 <ol className="list-decimal pl-5 mt-2 space-y-1">
//                   <li>Tap the lock icon in your browser's address bar</li>
//                   <li>Select "Site settings"</li>
//                   <li>Change "Camera" to "Allow"</li>
//                   <li>Refresh the page</li>
//                 </ol>
//               </>
//             ) : (
//               "Please allow camera access in your browser settings to use this feature."
//             )}
//           </p>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setShowCamera(false)}
//               className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded"
//             >
//               Cancel
//             </button>
//             {isMobile && (
//               <button
//                 onClick={() => window.location.reload()}
//                 className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
//               >
//                 I've Enabled It
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 w-full max-w-2xl mx-auto mb-8">
//       <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-white">
//         Snap & Post
//       </h2>

//       {/* Camera Preview */}
//       <div className="mb-4">
//         {image ? (
//           <div className="relative">
//             <img
//               src={image}
//               alt="Captured"
//               className="w-full h-64 object-cover rounded border border-gray-300 dark:border-gray-600"
//             />
//             <button
//               onClick={handleRetake}
//               className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//             >
//               <FaRedo />
//             </button>
//           </div>
//         ) : (
//           <button
//             onClick={() => setShowCamera(true)}
//             className="w-full bg-gray-200 dark:bg-gray-700 h-64 rounded flex flex-col items-center justify-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
//           >
//             <FaCamera className="text-4xl text-gray-500 dark:text-gray-400" />
//             <span className="text-gray-700 dark:text-gray-300">
//               Click to take a photo
//             </span>
//           </button>
//         )}
//       </div>

//       {/* Camera Modal */}
//       {showCamera && (
//         <div
//           className={`fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center ${
//             isMobile ? "p-0" : "p-4"
//           }`}
//         >
//           <div
//             className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden ${
//               isMobile ? "w-full h-full rounded-none" : "w-full max-w-2xl"
//             }`}
//           >
//             <div className="flex justify-between items-center p-4 border-b">
//               <h3 className="font-bold text-lg">Take a Snap</h3>
//               <button
//                 onClick={() => setShowCamera(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>

//             <div
//               className={`relative ${
//                 isMobile ? "h-[calc(100vh-120px)]" : "h-96"
//               }`}
//             >
//               <Webcam
//                 audio={false}
//                 ref={webcamRef}
//                 screenshotFormat="image/jpeg"
//                 videoConstraints={videoConstraints}
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               <div className="absolute bottom-4 left-0 right-0 flex justify-center">
//                 <button
//                   onClick={capture}
//                   className="bg-white dark:bg-gray-700 p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
//                 >
//                   <FaCamera
//                     size={24}
//                     className="text-gray-800 dark:text-white"
//                   />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Mint Count */}
//       <div className="mb-4">
//         <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
//           Number of NFTs to mint (max 5):
//         </label>
//         <input
//           type="number"
//           min={1}
//           max={5}
//           value={mintCount}
//           onChange={(e) =>
//             setMintCount(
//               Math.min(5, Math.max(1, parseInt(e.target.value) || 1))
//             )
//           }
//           className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
//         />
//       </div>

//       {/* Post Text */}
//       <div className="mb-4">
//         <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
//           Short Description:
//         </label>
//         <textarea
//           rows={3}
//           value={postText}
//           onChange={(e) => setPostText(e.target.value)}
//           className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
//           placeholder="Describe your snap..."
//         />
//       </div>

//       {/* Custom Dropdown Tag Selector */}
//       <div className="mb-4 relative" ref={dropdownRef}>
//         <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
//           Select Tags:
//         </label>
//         <div
//           onClick={() => setDropdownOpen((prev) => !prev)}
//           className="cursor-pointer p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
//         >
//           {selectedTags.length > 0 ? selectedTags.join(", ") : "Select tags..."}
//         </div>

//         {dropdownOpen && (
//           <div className="absolute mt-2 w-full z-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow max-h-48 overflow-y-auto">
//             {predefinedTags.map((tag) => (
//               <label
//                 key={tag}
//                 className="flex items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   checked={selectedTags.includes(tag)}
//                   onChange={() => handleTagToggle(tag)}
//                   className="mr-2"
//                 />
//                 #{tag}
//               </label>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Add Custom Tag */}
//       <div className="mb-4 flex flex-col sm:flex-row gap-2">
//         <input
//           type="text"
//           placeholder="Add custom tag"
//           value={customTag}
//           onChange={(e) => setCustomTag(e.target.value)}
//           className="flex-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
//         />
//         <button
//           type="button"
//           onClick={handleAddCustomTag}
//           className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition flex items-center gap-2 justify-center"
//         >
//           <FaPlus /> Add
//         </button>
//       </div>

//       {/* Submit */}
//       <button
//         disabled={!image}
//         className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full transition flex items-center justify-center gap-2 ${
//           !image ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//       >
//         <FaCheck /> Snap & Mint
//       </button>
//     </div>
//   );
// }

import React, { useState, useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import {
  FaCamera,
  FaTimes,
  FaRedo,
  FaCheck,
  FaPlus,
  FaSyncAlt,
} from "react-icons/fa";

const predefinedTags = ["Nature", "Art", "Tech", "Food", "Fashion"];

export default function SnapForm() {
  // Form state
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTag, setCustomTag] = useState("");
  const [postText, setPostText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mintCount, setMintCount] = useState(1);

  // Camera state
  const [image, setImage] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [facingMode, setFacingMode] = useState("environment"); // default to back camera
  const webcamRef = useRef(null);
  const dropdownRef = useRef(null);

  const videoConstraints = {
    facingMode: { exact: facingMode },
    width: { ideal: 1280 },
    height: { ideal: 720 },
  };

  // Device type detection
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Camera permission check
  useEffect(() => {
    if (showCamera) {
      const checkPermissions = async () => {
        try {
          if (navigator.permissions) {
            const permission = await navigator.permissions.query({
              name: "camera",
            });
            if (permission.state === "denied") {
              setHasPermission(false);
              return;
            }
          }
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode },
          });
          setHasPermission(true);
          stream.getTracks().forEach((track) => track.stop());
        } catch (err) {
          setHasPermission(false);
          console.error("Camera access error:", err);
        }
      };
      checkPermissions();
    }
  }, [showCamera, facingMode]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setShowCamera(false);
  }, []);

  const handleRetake = () => {
    setImage(null);
    setShowCamera(true);
  };

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (hasPermission === false) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md">
          <h3 className="font-bold text-lg mb-4">Camera Access Required</h3>
          <p className="mb-4">
            {isMobile ? (
              <>
                To enable camera access:
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Tap the lock icon in your browser's address bar</li>
                  <li>Select "Site settings"</li>
                  <li>Change "Camera" to "Allow"</li>
                  <li>Refresh the page</li>
                </ol>
              </>
            ) : (
              "Please allow camera access in your browser settings to use this feature."
            )}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCamera(false)}
              className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
            {isMobile && (
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                I've Enabled It
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6 w-full max-w-2xl mx-auto mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Snap & Post
      </h2>

      <div className="mb-4">
        {image ? (
          <div className="relative">
            <img
              src={image}
              alt="Captured"
              className="w-full h-64 object-cover rounded border border-gray-300 dark:border-gray-600"
            />
            <button
              onClick={handleRetake}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full"
            >
              <FaRedo />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowCamera(true)}
            className="w-full bg-gray-200 dark:bg-gray-700 h-64 rounded flex flex-col items-center justify-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <FaCamera className="text-4xl text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-gray-300">
              Click to take a photo
            </span>
          </button>
        )}
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center ${
            isMobile ? "p-0" : "p-4"
          }`}
        >
          <div
            className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden ${
              isMobile ? "w-full h-full rounded-none" : "w-full max-w-2xl"
            }`}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-lg">Take a Snap</h3>
              <button
                onClick={() => setShowCamera(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div
              className={`relative ${
                isMobile ? "h-[calc(100vh-120px)]" : "h-96"
              }`}
            >
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Toggle Facing Mode */}
              <button
                onClick={() =>
                  setFacingMode((prev) =>
                    prev === "user" ? "environment" : "user"
                  )
                }
                className="absolute top-4 right-4 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-full shadow"
                title="Switch Camera"
              >
                <FaSyncAlt />
              </button>

              {/* Capture Button */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <button
                  onClick={capture}
                  className="bg-white dark:bg-gray-700 p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <FaCamera
                    size={24}
                    className="text-gray-800 dark:text-white"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mint Count */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Number of NFTs to mint (max 5):
        </label>
        <input
          type="number"
          min={1}
          max={5}
          value={mintCount}
          onChange={(e) =>
            setMintCount(
              Math.min(5, Math.max(1, parseInt(e.target.value) || 1))
            )
          }
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
          placeholder="Describe your snap..."
        />
      </div>

      {/* Tag Selector */}
      <div className="mb-4 relative" ref={dropdownRef}>
        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
          Select Tags:
        </label>
        <div
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="cursor-pointer p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        >
          {selectedTags.length > 0 ? selectedTags.join(", ") : "Select tags..."}
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
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition flex items-center gap-2 justify-center"
        >
          <FaPlus /> Add
        </button>
      </div>

      {/* Submit Button */}
      <button
        disabled={!image}
        className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full transition flex items-center justify-center gap-2 ${
          !image ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <FaCheck /> Snap & Mint
      </button>
    </div>
  );
}
