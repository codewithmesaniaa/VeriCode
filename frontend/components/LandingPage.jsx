import React from "react";
import { motion } from "motion/react";
import { Code2, ShieldAlert, Cpu, Sparkles, Zap, Bug, ArrowRight } from "lucide-react";

export default function LandingPage({ onLaunchWorkspace }) {
  const features = [
    {
      icon: <Bug className="w-6 h-6 text-red-400" />,
      title: "Bug & Edge-Case Detection",
      description: "Instantly point out logical errors, unsafe memory actions, recursive stack overflows, and hidden coding bugs before compilers even execution runs."
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-amber-400" />,
      title: "Security Flaw Auditing",
      description: "Detect SQL Injection hazards, unvalidated inputs, hardcoded secret passwords, and stack overflow vulnerabilities in standard patterns (OWASP-aligned)."
    },
    {
      icon: <Cpu className="w-6 h-6 text-emerald-400" />,
      title: "Performance Optimizations",
      description: "Identify suboptimal runtime execution loops (O(N^2) nesting), wasteful memory leak pointers, and high-complexity memory overheads in real-time."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
      title: "Elegant AI Refactoring",
      description: "Receive a beautiful, rewritten, modular, and optimized version of your source code conforming with top-tier clean engineering guidelines."
    }
  ];

  return (
    <div className="relative text-[#e2e8f0] min-h-screen z-10 font-sans bg-[#050807]">
      {/* Decorative Radial Aurora Glow in the Dark Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none rounded-full bg-emerald-600/5 blur-[130px]" />
      
      {/* Hero Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl"
        >
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 bg-[#0e2119] border border-emerald-900/30 px-4 py-2 rounded-full text-xs font-semibold text-emerald-400 tracking-wide mb-8 shadow-inner">
            <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Next-Generation Static Analysis with Gemini</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-emerald-100 to-slate-400 mb-6 drop-shadow-sm">
            Elevate Your Code Quality. <span className="text-emerald-400 font-sans font-black">Smarter.</span>
          </h1>

          {/* Description */}
          <p className="text-stone-400 text-base sm:text-lg font-normal leading-relaxed mb-10 max-w-2xl mx-auto font-sans">
            CodeSense AI is a recruiter-friendly static code evaluation suite powered by Gemini models. Paste your source code, uncover critical vulnerabilities, and explore beautiful, production-ready refactors in seconds.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button
              id="launch-workspace-cta"
              onClick={onLaunchWorkspace}
              className="group relative w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-emerald-950/40 cursor-pointer overflow-hidden active:scale-[0.98]"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-5 h-5 text-slate-950 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href="#learn-more-section"
              className="w-full sm:w-auto text-center px-8 py-4 bg-[#0e2119] border border-emerald-900/30 hover:bg-[#122c21] text-emerald-300 font-semibold rounded-lg transition-all duration-200 active:scale-[0.98]"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        {/* Tech Badges & Interactive Dashboard preview mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-4xl border border-[#11241e] rounded-2xl bg-[#0a1410] backdrop-blur-md overflow-hidden p-3 shadow-2xl relative mb-24 cursor-pointer hover:border-emerald-550/20 transition-all duration-500"
          onClick={onLaunchWorkspace}
        >
          {/* Header Controls Mock */}
          <div className="flex items-center justify-between border-b border-[#11241e] pb-3 px-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 block" />
            </div>
            <div className="text-emerald-650/50 text-xs font-mono">codesense_review_workspace.jsx</div>
            <div className="w-12" />
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#060a08] p-4 border border-[#11241e] rounded-lg text-left h-48 font-mono text-xs text-stone-400 select-none overflow-hidden relative">
              <div className="text-emerald-400">// Select a language and Paste Code</div>
              <div className="text-stone-500">1: <span className="text-red-450">function</span> calculate(x) &#123;</div>
              <div className="text-stone-500">2:   <span className="text-emerald-400">let</span> result = x * recursive_leak(x);</div>
              <div className="text-stone-500">3:   <span className="text-yellow-450">return</span> result;</div>
              <div className="text-stone-500">4: &#125;</div>
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#060a08] to-transparent pointer-events-none" />
            </div>
            <div className="bg-[#0e2119] p-4 border border-emerald-900/40 rounded-lg text-left h-48 select-none flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-emerald-500/70 uppercase tracking-widest text-[9px] font-mono">CodeScore</div>
                  <div className="text-3xl font-bold font-mono text-emerald-400 mt-1">94%</div>
                </div>
                <div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-md text-[10px] font-semibold">Excellent Stability</div>
              </div>
              <div className="border-t border-emerald-900/25 pt-3">
                <span className="text-xs text-stone-400 font-sans">Gemini successfully analyzed and refactored with 0 critical crash hazards detected!</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Grid Section */}
        <div id="learn-more-section" className="w-full max-w-6xl text-center scroll-mt-24">
          <div className="mb-14">
            <h2 className="text-3xl font-bold text-slate-100 mb-4">Enterprise Analysis, Simplified</h2>
            <p className="text-stone-400 max-w-xl mx-auto text-sm sm:text-base">
              Why wait for pull request comments? Receive elite mentoring and instant architectural optimizations with multi-lingual parsing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-[#0a1410] border border-[#11241e] rounded-xl hover:bg-[#0e2119]/50 hover:border-emerald-500/20 transition-all duration-305"
              >
                <div className="mb-4 bg-[#060a08] p-3 rounded-lg w-max flex items-center justify-center border border-[#11241e] shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-emerald-355 font-bold mb-2 font-sans text-base">{feature.title}</h3>
                <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-sans">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recruiter Trust Footnote */}
        <div className="mt-32 border-t border-[#11241e] w-full pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between text-stone-500 text-xs">
          <div>CodeSense AI - Built for Recruiter Review (JavaScript & Google GenAI)</div>
          <div className="mt-2 sm:mt-0 font-mono text-[10px] bg-[#060a08] border border-[#11241e] px-3 py-1.5 rounded-md text-emerald-400">
            Stack: Node, Express, Vite, React, Monaco, Tailwind
          </div>
        </div>
      </div>
    </div>
  );
}
