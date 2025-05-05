import React, { useState } from "react";

const tags = ["All", "Nature", "Art", "Tech", "Food", "Fashion"];

const dummyPosts = [
  {
    id: 1,
    image: "images/image1.jpg",
    tags: ["Nature", "Art"],
    caption: "Sunset in the woods",
  },
  {
    id: 2,
    image: "images/image2.jpg",
    tags: ["Tech"],
    caption: "New blockchain gadget",
  },
  {
    id: 3,
    image: "images/image3.jpg",
    tags: ["Food", "Fashion"],
    caption: "Tasty meal in style",
  },
];

const Explore = () => {
  const [activeTag, setActiveTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = dummyPosts.filter((post) => {
    const tagMatch = activeTag === "All" || post.tags.includes(activeTag);
    const searchMatch = post.caption
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return tagMatch && searchMatch;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6 mb-10">
      {/* Controls */}
      <div className="sticky top-0 z-20 bg-white dark:bg-gray-900 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Tag Dropdown */}
          <select
            value={activeTag}
            onChange={(e) => setActiveTag(e.target.value)}
            className="p-2 border rounded-md dark:bg-gray-800 dark:text-white w-full sm:w-auto"
          >
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by caption..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-md w-full flex-1 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <p className="font-medium">{post.caption}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Tags: {post.tags.map((t) => `#${t}`).join(", ")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 col-span-full">
            No posts found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Explore;
