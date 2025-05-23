import "./App.css";
import React from "react";
import AppRoutes from "./Routes/AppRoutes";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div className="px-5 md:px-20 lg:px-30 h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex gap-5 h-full">
        {/* Persistent Sidebar */}
        <Sidebar />
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto -ml-5 md:ml-0 lg:ml-0">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}
