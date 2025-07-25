// src/components/browser/TabBar.jsx
import React from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

/**
 * Tab bar for managing multiple tabs.
 * @param {Object} props
 * @param {Array} props.tabs - List of tab objects { id, url, title, isLoading }
 * @param {number} props.activeTabId - ID of the active tab
 * @param {Function} props.onTabSelect - Handler for selecting a tab
 * @param {Function} props.onTabClose - Handler for closing a tab
 * @param {Function} props.onNewTab - Handler for creating a new tab
 * @returns {JSX.Element}
 */
function TabBar({ tabs, activeTabId, onTabSelect, onTabClose, onNewTab }) {
  return (
    <div className="flex items-center bg-slate-900 p-1 border-b border-cyan-500/20">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`flex items-center px-4 py-2 mr-1 rounded-t cursor-pointer ${
            tab.id === activeTabId
              ? "bg-slate-800 text-cyan-400"
              : "bg-slate-900 text-gray-400 hover:bg-slate-800"
          }`}
          onClick={() => onTabSelect(tab.id)}
        >
          <span className="truncate max-w-[150px]">{tab.title}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab.id);
            }}
            className="ml-2 text-gray-400 hover:text-red-400"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <button
        onClick={onNewTab}
        className="ml-2 p-2 text-cyan-400 hover:bg-cyan-500/20 rounded"
        title="New Tab"
      >
        +
      </button>
    </div>
  );
}

TabBar.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string,
      title: PropTypes.string.isRequired,
      isLoading: PropTypes.bool.isRequired,
    })
  ).isRequired,
  activeTabId: PropTypes.number.isRequired,
  onTabSelect: PropTypes.func.isRequired,
  onTabClose: PropTypes.func.isRequired,
  onNewTab: PropTypes.func.isRequired,
};

export default TabBar;