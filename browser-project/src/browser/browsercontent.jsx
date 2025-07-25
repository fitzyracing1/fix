// src/components/browser/BrowserContent.jsx
import React from "react";
import PropTypes from "prop-types";

/**
 * Browser content area for rendering webpages.
 * @param {Object} props
 * @param {string} props.url - The URL to display
 * @param {Function} props.onLoad - Handler for when the content loads
 * @param {Function} props.onError - Handler for when the content fails to load
 * @returns {JSX.Element}
 */
function BrowserContent({ url, onLoad, onError }) {
  return (
    <div className="h-full w-full">
      {url ? (
        <iframe
          src={url}
          onLoad={onLoad}
          onError={onError}
          className="w-full h-full border-none"
          title="Browser Content"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      ) : (
        <div className="h-full flex items-center justify-center bg-slate-950 text-white">
          Welcome to the Open-Source Browser! Enter a URL to start browsing.
        </div>
      )}
    </div>
  );
}

BrowserContent.propTypes = {
  url: PropTypes.string.isRequired,
  onLoad: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default BrowserContent;