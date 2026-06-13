import React, { useState } from "react";
import { 
  Award, ShieldAlert, Cpu, CheckCircle2, Copy, Check, Info, AlertOctagon, Terminal, FileCode2, Zap, AlertTriangle 
} from "lucide-react";
import Editor from "@monaco-editor/react";

export default function ResultsPanel({ review, isLoading }) {
  const [copied, setCopied] = useState(false);

  // If loading, render an exquisite interactive waiting placeholder
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full min-h-[500px] text-center bg-[#060a08]/45 border border-[#11241e] rounded-2xl">
        <div className="relative mb-8">
          <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <div className="absolute inset-x-0 inset-y-0 m-auto w-8 h-8 flex items-center justify-center">
            <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-100 mb-2 font-sans">Analyzing Your Source Code...</h3>
        <p className="text-stone-400 text-sm max-w-sm font-sans">
          Gemini is parsing syntax, detecting security concerns, locating logic flows, and creating a refactored version of your script.
        </p>
        <div className="mt-8 flex flex-col gap-2 max-w-xs w-full text-xs font-mono text-stone-500 bg-[#060a08] p-3 rounded-lg border border-[#11241e]">
          <div className="flex items-center justify-between text-emerald-400">
            <span>● Analyzing code AST...</span>
            <span className="animate-pulse">Active</span>
          </div>
          <div className="flex items-center justify-between">
            <span>● Running security audits...</span>
            <span>Pending</span>
          </div>
          <div className="flex items-center justify-between">
            <span>● Rebuilding cleaner architecture...</span>
            <span>Pending</span>
          </div>
        </div>
      </div>
    );
  }

  // Handle empty state
  if (!review) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full min-h-[500px] text-center bg-[#060a08]/20 border border-dashed border-[#11241e] rounded-2xl select-none">
        <div className="bg-[#0e2119] p-4 rounded-xl border border-emerald-900/30 mb-4 shadow-sm">
          <FileCode2 className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold text-slate-200 mb-2 font-sans">Workspace Diagnostic Dashboard</h3>
        <p className="text-stone-450 text-xs sm:text-sm max-w-sm leading-relaxed px-4 font-sans">
          Choose your programming language, load a buggy template or paste your original source code, and click <span className="text-emerald-405 font-bold text-emerald-400">"Analyze Code"</span> to initiate deep AI audits.
        </p>
      </div>
    );
  }

  const { overallScore, codeQuality, bugs, performance, security, bestPractices, refactoredCode } = review;

  const bugsCount = bugs ? bugs.length : 0;
  const securityCount = security ? security.length : 0;
  const optimizationCount = (performance ? performance.length : 0) + (bestPractices ? bestPractices.length : 0);

  const copyToClipboard = () => {
    if (!refactoredCode) return;
    navigator.clipboard.writeText(refactoredCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-slate-205 animate-fade-in font-sans">
      
      {/* Dynamic Overall Score Block Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Score Gauge Card */}
        <div className="bg-[#0e2119] p-4 rounded-xl border border-emerald-900/35 flex flex-col items-center justify-center">
          <span className="text-xs text-emerald-400/80 uppercase mb-3 font-extrabold tracking-wider font-mono">Overall Score</span>
          <div className="relative flex items-center justify-center">
            {/* SVG circle meter matching template spec */}
            <svg className="w-20 h-20 transform -rotate-90">
              <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-[#060a08]" />
              <circle 
                cx="40" 
                cy="40" 
                r="34" 
                stroke="currentColor" 
                strokeWidth="6" 
                fill="transparent" 
                strokeDasharray="213" 
                strokeDashoffset={213 * (1 - overallScore / 100)} 
                className={overallScore >= 90 ? "text-emerald-500" : overallScore >= 75 ? "text-amber-500" : "text-red-500"} 
              />
            </svg>
            <span className="absolute text-xl font-bold font-mono text-slate-100">{overallScore}</span>
          </div>
        </div>

        {/* Dynamic Critical Insights Meter Card */}
        <div className="bg-[#0e2119] p-4 rounded-xl border border-emerald-900/35 flex flex-col justify-center space-y-2.5">
          <span className="text-xs text-emerald-400/80 uppercase font-extrabold tracking-wide font-mono">Critical Insights</span>
          
          <div className="flex items-center gap-2 text-red-400 text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-red-50 block animate-pulse" />
            <span>{bugsCount} Bug{bugsCount !== 1 ? "s" : ""} Found</span>
          </div>
          
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block" />
            <span>{securityCount} Security Risk{securityCount !== 1 ? "s" : ""}</span>
          </div>
          
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" />
            <span>{optimizationCount} Optimizations</span>
          </div>
        </div>

      </div>

      {/* Analysis Sections conforming with rounded capsule badges */}
      <div className="space-y-6 pb-8 text-left">
        
        {/* Code Quality Block */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-mono uppercase tracking-wider">
            <span className="w-1.5 h-4 bg-emerald-500 rounded-full shrink-0"></span>
            Code Quality & Structure
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-[#0e2119]/40 border border-[#11241e] p-4 rounded-xl font-sans">
            {codeQuality}
          </p>
        </div>

        {/* Security Vulnerabilities */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#fca5a5] flex items-center gap-2 font-mono uppercase tracking-wider">
            <span className="w-1.5 h-4 bg-red-500 rounded-full shrink-0"></span>
            Security Review
          </h3>
          {security && security.length > 0 ? (
            <div className="p-4 bg-red-950/20 border border-red-900/50 rounded-xl space-y-2">
              {security.map((item, index) => (
                <p key={index} className="text-xs text-red-200 font-medium list-item ml-3 leading-relaxed font-sans">
                  {item}
                </p>
              ))}
            </div>
          ) : (
            <div className="p-3 bg-emerald-950/10 border border-emerald-900/40 rounded-xl">
              <p className="text-xs text-emerald-400 font-medium font-sans">No system access hazards, buffer exploits, or key leaks detected.</p>
            </div>
          )}
        </div>

        {/* Bugs Audits */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#fcd34d] flex items-center gap-2 font-mono uppercase tracking-wider">
            <span className="w-1.5 h-4 bg-amber-500 rounded-full shrink-0"></span>
            Defects & Logic Flaws
          </h3>
          {bugs && bugs.length > 0 ? (
            <div className="p-4 bg-[#0e2119]/30 border border-[#11241e] rounded-xl space-y-2.5 text-xs text-stone-300 leading-relaxed font-sans">
              {bugs.map((item, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-amber-550 mr-1 select-none font-bold">●</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-stone-400 italic px-4 font-sans">Zero syntax defects or logical blocks detected.</p>
          )}
        </div>

        {/* Performance Recommendations */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-[#93c5fd] flex items-center gap-2 font-mono uppercase tracking-wider">
            <span className="w-1.5 h-4 bg-blue-500 rounded-full shrink-0"></span>
            Performance Suggestions
          </h3>
          {performance && performance.length > 0 ? (
            <ul className="text-xs sm:text-sm text-stone-300 list-disc pl-5 space-y-2 bg-[#0e2119]/20 border border-[#11241e] p-4 rounded-xl font-sans">
              {performance.map((item, i) => (
                <li key={i} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-stone-400 italic px-4 font-sans">Optimal memory structures & standard loops identified.</p>
          )}
        </div>

        {/* Best practices layout */}
        {bestPractices && bestPractices.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#6ee7b7] flex items-center gap-2 font-mono uppercase tracking-wider">
              <span className="w-1.5 h-4 bg-emerald-500 rounded-full shrink-0"></span>
              Style & Best Practices
            </h3>
            <ul className="text-xs sm:text-sm text-stone-300 list-disc pl-5 space-y-2 bg-[#0e2119]/20 border border-[#11241e] p-4 rounded-xl font-sans">
              {bestPractices.map((item, i) => (
                <li key={i} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Refactored Preview */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-mono uppercase tracking-wider">
              <span className="w-1.5 h-4 bg-emerald-500 rounded-full shrink-0"></span>
              Refactored Blueprint
            </h3>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-[#0e2119] hover:bg-[#122c21] border border-emerald-900/30 text-emerald-305 text-xs font-mono rounded cursor-pointer transition-colors active:scale-95 text-emerald-400"
            >
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>

          <div className="h-[300px] border border-[#11241e] rounded-lg overflow-hidden relative shadow-inner">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={refactoredCode || "// No refactored code output available."}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 12,
                fontFamily: "var(--font-mono, 'JetBrains Mono', Courier, monospace)",
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                cursorBlinking: "solid",
                folding: true,
                theme: "vs-dark",
                padding: { top: 12, bottom: 12 }
              }}
            />
          </div>
        </div>

      </div>

    </div>
  );
}
