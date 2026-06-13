import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { 
  Terminal, Sparkles, Play, Code, ArrowLeft, RefreshCw, Layers, Layout, HelpCircle, Key, Cpu, Zap, LucideSmile
} from "lucide-react";
import ResultsPanel from "./ResultsPanel.jsx";

// Standard buggy/non-optimized mock templates for languages to explore immediately in 1-click
const LANGUAGE_TEMPLATES = {
  javascript: `// Inefficient loops, memory leak variables, and loose comparison bugs
function checkActiveSubscriptions(users) {
  let activeUsers = [];
  
  // HIGH RISK: potential memory leak with global variables
  leakMemoryObject = {};

  for (var i = 0; i < users.length; i++) {
    // Loose equality bug (should be ===)
    if (users[i].status == "active" && users[i].payments == "done") {
      activeUsers.push(users[i]);
    }
  }

  // Double nested loops - poor performance O(N^2) complexity
  for (let u1 of activeUsers) {
    for (let u2 of activeUsers) {
      if (u1.id != u2.id) {
        if (u1.tier === u2.tier) {
          console.log("Found matching account tiers for: " + u1.name + " and " + u2.name);
        }
      }
    }
  }

  return activeUsers;
}`,

  python: `# Potential sqlite vulnerability and dictionary lookup errors
import sqlite3

def find_user_accounts(database_path, search_term):
    conn = sqlite3.connect(database_path)
    cursor = conn.cursor()
    
    # CRITICAL SECURITY RISK: SQL Injection vulnerability 
    vulnerable_query = "SELECT * FROM client_accounts WHERE username = '" + search_term + "'"
    cursor.execute(vulnerable_query)
    
    # BUG: fetchall() might return empty list. Indexing index [0] acts as a crash risk
    rows = cursor.fetchall()
    principal_user = rows[0]
    
    # Slow operation inside nested loop
    for user_row in rows:
        # Repeating file writes on each entry
        with open("log_access.txt", "a") as login_file:
            login_file.write("Queried username details\\n")
            
    return principal_user`,

  java: `import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class UserManager {
    // BUG: Hardcoded secret keys inside class files (Security risk)
    private static final String SYSTEM_KEY = "admin_root_token_9x882_supersecret";

    public void syncUserSession(String userId, String rawData) {
        try {
            // Buffer vulnerability risk or recursive loops
            int valueCount = Integer.parseInt(rawData);
            int loopResult = calculateExponentialFactor(valueCount);
            
            // Hardcoded DB login strings inside standard logs
            System.out.println("Connecting user " + userId + " utilizing key " + SYSTEM_KEY);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Inefficient stack recursion. Risk of StackOverflow runtime errors
    private int calculateExponentialFactor(int order) {
        if (order <= 1) return order;
        return calculateExponentialFactor(order - 1) + calculateExponentialFactor(order - 2);
    }
}`,

  cpp: `#include <iostream>
#include <string>

// Unallocated space writes, standard memory leaks, and pointer bugs
void processMemoryBuffer() {
    // Allocated pointer heap space (never deleted!)
    int* dataPointer = new int[10];

    // BUFFER OVERFLOW BUG: writing outside allocated index size of 10!
    for (int i = 0; i < 20; ++i) {
        dataPointer[i] = i * 250; 
    }

    for (int i = 0; i < 15; ++i) {
        std::cout << "Factor: " << dataPointer[i] << " ";
    }
    
    // Memory leak: delete[] dataPointer is totally missing!
}`,

  c: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// Dangerous buffer reading using gets and unsafe strings
void authorizeAdminOverride() {
    char keyBuffer[12];
    printf("Please input system access token:\\n");
    
    // DEFECT / VULNERABILITY: Use of dangerous gets function allows stack smash hacks!
    gets(keyBuffer);
    
    if (strcmp(keyBuffer, "root_bypass_dev") == 0) {
        printf("Override Granted! Booting terminal.\\n");
    }
}

int main() {
    authorizeAdminOverride();
    return 0;
}`
};

export default function Workspace({ onBackToHome }) {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(LANGUAGE_TEMPLATES.javascript);
  const [reviewResult, setReviewResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  // Load appropriate default template when language selector changes
  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    setCode(LANGUAGE_TEMPLATES[selectedLang] || "");
    setErrorText("");
  };

  const handleEditorChange = (value) => {
    setCode(value || "");
  };

  const runCodeAnalysis = async () => {
    if (!code || !code.trim()) {
      setErrorText("The source editor contains no code. Please paste some code or click 'Reset Template' first.");
      return;
    }

    setLoading(true);
    setErrorText("");
    setReviewResult(null);

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language, code }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || "Failed to analyze code. Please verify server endpoints.");
      }

      setReviewResult(data);
    } catch (err) {
      console.error("Analysis request failed:", err);
      setErrorText(err.message || "Unable to establish network handshake with CodeSense static analysis services.");
    } finally {
      setLoading(false);
    }
  };

  const resetTemplateCode = () => {
    setCode(LANGUAGE_TEMPLATES[language] || "");
    setReviewResult(null);
    setErrorText("");
  };

  // Dynamic theme class definitions
  const rootBgClass = "bg-[#050807] text-[#e2e8f0]";

  return (
    <div className={`min-h-screen pb-0 flex flex-col z-10 font-sans transition-colors duration-500 ${rootBgClass}`}>
      
      {/* Workspace Header Navigation in Cyber Emerald Theme */}
      <nav className="h-16 flex items-center justify-between px-6 border-b border-[#11241e] bg-[#0a1410] shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="p-1 px-2.5 bg-[#0e2119] hover:bg-[#122c21] border border-emerald-900/30 rounded text-emerald-400 hover:text-emerald-100 transition-all duration-200 active:scale-95 cursor-pointer text-xs font-mono flex items-center justify-center gap-1"
            title="Return to Home Dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home</span>
          </button>
          
          <div className="h-6 w-px bg-[#11241e]" />
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center font-bold text-slate-950 tracking-widest text-sm shadow-md shadow-emerald-950/30">C</div>
            <h1 className="text-xl font-bold tracking-tight text-slate-100">
              CodeSense <span className="text-emerald-400 font-sans">AI</span>
            </h1>
            <span className="hidden sm:inline-block text-[9px] uppercase tracking-wider font-extrabold font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              v2.0
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Custom Select Box styled to match design guidelines perfectly */}
          <div className="flex items-center gap-2 bg-[#0e2119] px-3 py-1.5 rounded-md border border-emerald-900/30">
            <span className="text-xs text-emerald-500/80 uppercase font-bold tracking-wider font-mono hidden sm:inline">Language</span>
            <select
              id="language-selector"
              value={language}
              onChange={handleLanguageChange}
              disabled={loading}
              className="bg-transparent text-emerald-300 text-xs sm:text-sm font-semibold outline-none border-none cursor-pointer focus:ring-0"
            >
              <option value="javascript" className="bg-[#0a1410]">JavaScript</option>
              <option value="python" className="bg-[#0a1410]">Python</option>
              <option value="java" className="bg-[#0a1410]">Java</option>
              <option value="cpp" className="bg-[#0a1410]">C++</option>
              <option value="c" className="bg-[#0a1410]">C (ANSI)</option>
            </select>
          </div>

          {/* Header Action Button */}
          <button
            id="analyze-button"
            onClick={runCodeAnalysis}
            disabled={loading}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded-md font-bold text-xs sm:text-sm transition-all focus:ring-2 focus:ring-emerald-550/40 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 active:scale-95 shadow-md"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#050807]" />
                <span>Analyzing AST...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-emerald-950" />
                <span>Analyze Code</span>
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Main Grid Wrapper */}
      <div className="max-w-7xl mx-auto px-6 mt-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
          
          {/* Left Editor Frame */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0a1410] border border-[#11241e] shadow-md">
              <div className="text-left">
                <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Input Source Code</h3>
                <p className="text-xs text-stone-500 font-sans mt-0.5">Paste complex, nested, or buggy routines that you want to review.</p>
              </div>

              <button
                id="reset-template-button"
                onClick={resetTemplateCode}
                disabled={loading}
                className="px-3.5 py-1.5 bg-[#0e2119] hover:bg-[#122c21] border border-emerald-900/30 text-emerald-300 hover:text-emerald-100 rounded-md transition-colors text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer max-w-max self-start sm:self-auto active:scale-95"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Template</span>
              </button>
            </div>

            {/* Monaco Container framed with #060a08 class bg */}
            <div className="border border-[#11241e] rounded-xl overflow-hidden bg-[#060a08] shadow-xl relative">
              <div className="flex items-center justify-between px-4 py-2 bg-[#0e2119]/50 border-b border-[#11241e]">
                <span className="text-xs font-mono text-emerald-400/70">
                  main.{language === "cpp" ? "cpp" : language === "javascript" ? "js" : language === "python" ? "py" : language === "java" ? "java" : "c"}
                </span>
                <span className="text-[10px] text-stone-500 uppercase font-mono tracking-wider">Source Code Container</span>
              </div>

              <div className="h-[550px] overflow-hidden relative shadow-inner">
                <Editor
                  height="100%"
                  language={language}
                  value={code}
                  onChange={handleEditorChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    fontFamily: "var(--font-mono, 'JetBrains Mono', Courier, monospace)",
                    lineNumbers: "on",
                    roundedSelection: true,
                    scrollBeyondLastLine: false,
                    readOnly: loading,
                    cursorBlinking: "smooth",
                    automaticLayout: true,
                    padding: { top: 12, bottom: 12 }
                  }}
                />
              </div>
            </div>

            {errorText && (
              <div className="p-4 bg-red-955/20 border border-red-900/50 rounded-lg text-red-200 flex flex-col gap-1 text-xs sm:text-sm animate-scale-up">
                <span className="font-bold font-mono tracking-wide uppercase text-red-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-450 animate-ping" />
                  API Handshake Exception
                </span>
                <span>{errorText}</span>
              </div>
            )}
          </div>

          {/* Right Results Frame styled with #0a1410 backdrop bg */}
          <div className="bg-[#0a1410] border border-[#11241e] p-6 rounded-2xl min-h-[625px] shadow-lg">
            <ResultsPanel 
              review={reviewResult} 
              isLoading={loading} 
            />
          </div>

        </div>
      </div>

      {/* Footer Status Bar complying with style sheet */}
      <footer className="h-8 bg-[#0a1410] border-t border-[#11241e] px-6 flex items-center justify-between text-[10px] text-stone-500 uppercase font-medium mt-auto shrink-0 z-10">
        <div className="flex gap-4">
          <span>Status: <span className="text-emerald-450 font-bold">{loading ? "Processing..." : "Ready"}</span></span>
          <span className="hidden sm:inline">AI Model: <span className="text-emerald-400 font-bold">Gemini 2.5 Flash</span></span>
        </div>
        <div className="flex gap-4">
          <span>UTF-8</span>
          <span>Spaces: 2</span>
        </div>
      </footer>

    </div>
  );
}
