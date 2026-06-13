import React, { useState } from "react";
import LandingPage from "./components/LandingPage.jsx";
import Workspace from "./components/Workspace.jsx";

/**
 * CodeSense AI App Root Manager
 * Handles responsive view toggling between professional marketing landing and analysis workspace.
 */
export default function App() {
  const [currentView, setCurrentView] = useState("landing");

  return (
    <div className="font-sans antialiased text-stone-100 min-h-screen bg-[#050807] relative overflow-x-hidden selection:bg-emerald-500/30 selection:text-white">
      {/* Dynamic layout viewing render */}
      {currentView === "landing" ? (
        <LandingPage onLaunchWorkspace={() => setCurrentView("workspace")} />
      ) : (
        <Workspace onBackToHome={() => setCurrentView("landing")} />
      )}
    </div>
  );
}
