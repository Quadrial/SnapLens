import React, { useState } from "react";

const dummyPosts = [
  {
    id: 1,
    image: "images/image1.jpg",
    wallet: "0xA1...B2C3",
    created_at: "2 mins ago",
  },
  {
    id: 2,
    image: "images/image2.jpg",
    wallet: "0xD4...E5F6",
    created_at: "10 mins ago",
  },
];

const dummyRequests = [
  {
    id: 1,
    user: "0xUser1",
    message: "Please accept my snap request!",
  },
  {
    id: 2,
    user: "0xUser2",
    message: "Wanna mint something together?",
  },
];

export default function Feed() {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 mb-20">
      {/* Tab Buttons */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-900 px-4 sm:px-6 md:px-0 pt-4 pb-2 shadow-sm">
        <div className="flex justify-center md:justify-start gap-6">
          <button
            onClick={() => setActiveTab("feed")}
            className={`text-sm sm:text-base font-semibold border-b-2 transition-all duration-300 ${
              activeTab === "feed"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-500"
            }`}
          >
            Live Feed
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`text-sm sm:text-base font-semibold border-b-2 transition-all duration-300 ${
              activeTab === "requests"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 dark:text-gray-300 hover:text-blue-500"
            }`}
          >
            Requests
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === "feed" ? (
        dummyPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mt-10"
          >
            <img
              src={post.image}
              alt="Post"
              className="w-full h-64 object-cover"
            />
            <div className="p-4 flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Posted by: {post.wallet}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {post.created_at}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="space-y-4">
          {dummyRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <p className="text-gray-800 dark:text-white font-medium">
                {req.user}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{req.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
