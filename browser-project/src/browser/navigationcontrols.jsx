// src/components/browser/NavigationControls.jsx
import React from "react";
import PropTypes from "prop-types";
import { ArrowLeft, ArrowRight, RefreshCw, Home, Settings } from "lucide-react"; // Example icons from lucide-react

/**
 * Navigation controls for the browser (back, forward, refresh, home, settings).
 * @param {Object} props
 * @param {Function} props.onBack - Handler for navigating back
 * @param {Function} props.onForward - Handler for navigating forward
 * @param {Function} props.onRefresh - Handler for refreshing the page
 * @param {Function} props.onHome - Handler for navigating to the home page
 * @param {boolean} props.canGoBack - Whether back navigation is available
 * @param {boolean} props.canGoForward - Whether forward navigation is available
 * @param {Function} props.onToggleSettings - Handler for toggling the settings panel
 * @returns {JSX.Element}
 */
function NavigationControls({
  onBack,
  onForward,
  onRefresh,
  onHome,
  canGoBack,
  canGoForward,
  onToggleSettings,
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onBack}
        disabled={!canGoBack}
        className={`p-2 rounded-full ${
          canGoBack
            ? "text-cyan-400 hover:bg-cyan-500/20"
            : "text-gray-500 cursor-not-allowed"
        }`}
        title="Back"
      >
        <ArrowLeft size={20} />
      </button>
      <button
        onClick={onForward}
        disabled={!canGoForward}
        className={`p-2 rounded-full ${
          canGoForward
            ? "text-cyan-400 hover:bg-cyan-500/20"
            : "text-gray-500 cursor-not-allowed"
        }`}
        title="Forward"
      >
        <ArrowRight size={20} />
      </button>
      <button
        onClick={onRefresh}
        className="p-2 rounded-full text-cyan-400 hover:bg-cyan-500/20"
        title="Refresh"
      >
        <RefreshCw size={20} />
      </button>
      <button
        onClick={onHome}
        className="p-2 rounded-full text-cyan-400 hover:bg-cyan-500/20"
        title="Home"
      >
        <Home size={20} />
      </button>
      <button
        onClick={onToggleSettings}
        className="p-2 rounded-full text-cyan-400 hover:bg-cyan-500/20"
        title="Settings"
      >
        <Settings size={20} />
      </button>
    </div>
  );
}

NavigationControls.propTypes = {
  onBack: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onHome: PropTypes.func.isRequired,
  canGoBack: PropTypes.bool.isRequired,
  canGoForward: PropTypes.bool.isRequired,
  onToggleSettings: PropTypes.func.isRequired,
};

export default NavigationControls;