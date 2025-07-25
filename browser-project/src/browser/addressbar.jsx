// src/components/browser/AddressBar.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Lock } from "lucide-react";

/**
 * Address bar for entering and displaying the current URL.
 * @param {Object} props
 * @param {string} props.currentUrl - The current URL
 * @param {Function} props.onNavigate - Handler for navigating to a new URL
 * @param {boolean} props.isSecure - Whether the URL uses HTTPS
 * @returns {JSX.Element}
 */
function AddressBar({ currentUrl, onNavigate, isSecure }) {
  const [inputUrl, setInputUrl] = useState(currentUrl);

  // Sync input with currentUrl
  React.useEffect(() => {
    setInputUrl(currentUrl);
  }, [currentUrl]);

  /**
   * Handles form submission for navigation.
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    let url = inputUrl.trim();
    if (!url) return;

    // Add https:// if no protocol is specified
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = `https://${url}`;
    }
    onNavigate(url);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex items-center">
      <div className="relative w-full">
        {isSecure && (
          <Lock
            size={16}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green-400"
          />
        )}
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter URL or search..."
          className={`w-full p-2 pl-8 rounded bg-slate-700 text-white border ${
            isSecure ? "border-green-500/50" : "border-gray-500/50"
          } focus:outline-none focus:border-cyan-500`}
        />
      </div>
    </form>
  );
}

AddressBar.propTypes = {
  currentUrl: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  isSecure: PropTypes.bool.isRequired,
};

export default AddressBar;