// src/components/browser/BookmarkBar.jsx
import React from "react";
import PropTypes from "prop-types";

/**
 * Bookmark bar for managing and navigating bookmarks.
 * @param {Object} props
 * @param {string} props.currentUrl - The current URL
 * @param {string} props.currentTitle - The current page title
 * @param {Function} props.onNavigate - Handler for navigating to a bookmark
 * @returns {JSX.Element}
 */
function BookmarkBar({ currentUrl, currentTitle, onNavigate }) {
  // Mock bookmarks (replace with persistent storage in production)
  const [bookmarks, setBookmarks] = React.useState([
    { url: "https://www.google.com", title: "Google" },
    { url: "https://github.com", title: "GitHub" },
  ]);

  /**
   * Adds the current page to bookmarks.
   */
  const handleAddBookmark = () => {
    if (currentUrl && !bookmarks.some((b) => b.url === currentUrl)) {
      setBookmarks([...bookmarks, { url: currentUrl, title: currentTitle }]);
    }
  };

  return (
    <div className="flex items-center gap-2 px-4 py-1 bg-slate-900 border-t border-cyan-500/20">
      {bookmarks.map((bookmark, index) => (
        <button
          key={index}
          onClick={() => onNavigate(bookmark.url)}
          className="text-cyan-400 hover:bg-cyan-500/20 px-2 py-1 rounded"
        >
          {bookmark.title}
        </button>
      ))}
      <button
        onClick={handleAddBookmark}
        className="text-cyan-400 hover:bg-cyan-500/20 px-2 py-1 rounded"
        title="Add Bookmark"
      >
        + Bookmark
      </button>
    </div>
  );
}

BookmarkBar.propTypes = {
  currentUrl: PropTypes.string.isRequired,
  currentTitle: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default BookmarkBar;// src/components/browser/BrowserContent.jsx
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