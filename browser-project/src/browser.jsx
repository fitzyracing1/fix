// Browser.jsx
import React, { useState, useCallback } from "react";
import { BrowsingHistory } from "@/entities/BrowsingHistory"; // Assumes a database/model for history
import NavigationControls from "../components/browser/NavigationControls";
import AddressBar from "../components/browser/AddressBar";
import TabBar from "../components/browser/TabBar";
import BookmarkBar from "../components/browser/BookmarkBar";
import BrowserContent from "../components/browser/BrowserContent";
import SettingsPanel from "../components/browser/SettingsPanel";
import { motion } from "framer-motion";

// Default home page URL
const DEFAULT_HOME_URL = "https://www.google.com";
const DEFAULT_TAB = { id: 1, url: "", title: "New Tab", isLoading: false };

/**
 * Main Browser component for an open-source web browser.
 * Manages tabs, navigation, history, and settings with reset functionality.
 * @returns {JSX.Element} The browser UI
 */
export default function Browser() {
  const [tabs, setTabs] = useState([DEFAULT_TAB]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const currentUrl = activeTab?.url || "";
  const currentTitle = activeTab?.title || "New Tab";

  /**
   * Updates the active tab with provided properties.
   * @param {Object} updates - Properties to update (url, title, isLoading)
   */
  const updateActiveTab = useCallback(
    (updates) => {
      setTabs((prev) =>
        prev.map((tab) =>
          tab.id === activeTabId ? { ...tab, ...updates } : tab
        )
      );
    },
    [activeTabId]
  );

  /**
   * Adds a URL to the browsing history database.
   * @param {string} url - The URL to add
   * @param {string} title - The title of the page
   */
  const addToHistory = async (url, title) => {
    try {
      const existing = await BrowsingHistory.filter({ url });
      if (existing.length > 0) {
        await BrowsingHistory.update(existing[0].id, {
          visit_count: existing[0].visit_count + 1,
          last_visited: new Date().toISOString(),
          title: title || existing[0].title,
        });
      } else {
        await BrowsingHistory.create({
          url,
          title: title || url,
          visit_count: 1,
          last_visited: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error adding to history:", error);
    }
  };

  /**
   * Navigates to a new URL and updates history.
   * @param {string} url - The URL to navigate to
   */
  const handleNavigate = useCallback(
    (url) => {
      if (!url) return;

      updateActiveTab({ url, isLoading: true });
      setHistory((prev) => [...prev, url]);
      setHistoryIndex((prev) => prev + 1);

      const title = new URL(url).hostname || url;
      updateActiveTab({ title });
      addToHistory(url, title);
    },
    [updateActiveTab]
  );

  /**
   * Navigates back in history.
   */
  const handleBack = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const url = history[newIndex];
      setHistoryIndex(newIndex);
      updateActiveTab({ url });
    }
  }, [history, historyIndex, updateActiveTab]);

  /**
   * Navigates forward in history.
   */
  const handleForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const url = history[newIndex];
      setHistoryIndex(newIndex);
      updateActiveTab({ url });
    }
  }, [history, historyIndex, updateActiveTab]);

  /**
   * Refreshes the current page.
   */
  const handleRefresh = useCallback(() => {
    if (currentUrl) {
      updateActiveTab({ isLoading: true });
      updateActiveTab({
        url: currentUrl + (currentUrl.includes("?") ? "&" : "?") + "_t=" + Date.now(),
      });
    }
  }, [currentUrl, updateActiveTab]);

  /**
   * Navigates to the home page.
   */
  const handleHome = useCallback(() => {
    handleNavigate(DEFAULT_HOME_URL);
  }, [handleNavigate]);

  /**
   * Opens a new tab.
   */
  const handleNewTab = useCallback(() => {
    const newTabId = Math.max(...tabs.map((t) => t.id)) + 1;
    const newTab = { id: newTabId, url: "", title: "New Tab", isLoading: false };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTabId);
  }, [tabs]);

  /**
   * Closes a tab and switches to another if necessary.
   * @param {number} tabId - The ID of the tab to close
   */
  const handleTabClose = useCallback(
    (tabId) => {
      if (tabs.length === 1) return;

      setTabs((prev) => prev.filter((tab) => tab.id !== tabId));

      if (tabId === activeTabId) {
        const remainingTabs = tabs.filter((tab) => tab.id !== tabId);
        if (remainingTabs.length > 0) {
          setActiveTabId(remainingTabs[0].id);
        }
      }
    },
    [tabs, activeTabId]
  );

  /**
   * Handles content load completion.
   */
  const handleContentLoad = useCallback(() => {
    updateActiveTab({ isLoading: false });
  }, [updateActiveTab]);

  /**
   * Resets the browser to its initial state (clears tabs and history).
   */
  const handleReset = useCallback(() => {
    setTabs([DEFAULT_TAB]);
    setActiveTabId(1);
    setHistory([]);
    setHistoryIndex(-1);
    setIsSettingsOpen(false);
    // Note: Does not clear persistent BrowsingHistory database
  }, []);

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      {/* Settings Panel with Reset Option */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onReset={handleReset}
      />

      {/* Browser Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-cyan-500/20 cyber-glass"
      >
        <TabBar
          tabs={tabs}
          activeTabId={activeTabId}
          onTabSelect={setActiveTabId}
          onTabClose={handleTabClose}
          onNewTab={handleNewTab}
        />
        <div className="flex items-center gap-4 px-4 py-3">
          <NavigationControls
            onBack={handleBack}
            onForward={handleForward}
            onRefresh={handleRefresh}
            onHome={handleHome}
            canGoBack={historyIndex > 0}
            canGoForward={historyIndex < history.length - 1}
            onToggleSettings={() => setIsSettingsOpen(true)}
          />
          <AddressBar
            currentUrl={currentUrl}
            onNavigate={handleNavigate}
            isSecure={currentUrl.startsWith("https://")}
          />
        </div>
        <BookmarkBar
          currentUrl={currentUrl}
          currentTitle={currentTitle}
          onNavigate={handleNavigate}
        />
      </motion.div>

      {/* Browser Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 overflow-hidden"
      >
        <BrowserContent
          url={currentUrl}
          onLoad={handleContentLoad}
          onError={() => updateActiveTab({ isLoading: false })}
        />
      </motion.div>
    </div>
  );
}