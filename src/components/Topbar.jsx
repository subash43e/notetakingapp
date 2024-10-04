import { useState } from "react";

const Topbar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [storageType, setStorageType] = useState("local"); // 'local' or 'cloud'
  const [isGridLayout, setIsGridLayout] = useState(true); // Add this line

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const toggleStorageType = () => {
    setStorageType(storageType === "local" ? "cloud" : "local");
  };

  const handleLogout = () => {
    // Implement logout functionality
    console.log("Logging out...");
  };

  const handleDeleteAccount = () => {
    // Implement delete account functionality
    console.log("Deleting account...");
  };

  const toggleLayout = () => {
    setIsGridLayout(!isGridLayout);
  };

  return (
    <header className="bg-gray-800 text-white px-4 py-2 relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Note taking</div>
        <div className="flex-1 flex justify-center items-center">
          <form className="mr-4 w-1/3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 rounded bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </form>
        </div>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <button onClick={toggleSettings} className="hover:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </li>
            <li>
              <button onClick={toggleLayout} className="hover:text-gray-300">
                {isGridLayout ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </li>
            <li>
              <button className="hover:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
            </li>
            {/* Other icons... */}
          </ul>
        </nav>
      </div>
      {isSettingsOpen && (
        <div className="absolute right-4 mt-2 w-64 bg-white rounded-lg shadow-xl z-10">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Storage Type</span>
                <button
                  onClick={toggleStorageType}
                  className={`px-3 py-1 rounded ${
                    storageType === "local"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {storageType === "local" ? "Local" : "Cloud"}
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full bg-gray-200 text-red-500 py-2 rounded hover:bg-gray-300 transition duration-300"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Topbar;
