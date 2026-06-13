import express from "express";
import { analyzeCode } from "./services/gemini.js";

const router = express.Router();

// Force parsing of JSON payloads
router.use(express.json({ limit: "2mb" }));

/**
 * POST /api/review
 * 
 * Analyzes the posted code by routing it to the Gemini review agent service.
 */
router.post("/review", async (req, res) => {
  const { language, code } = req.body;

  // Validation: Empty code submission
  if (!code || typeof code !== "string" || !code.trim()) {
    return res.status(400).json({
      error: "Empty Code Submission",
      message: "You must provide some source code inside the editor before initiating an analysis."
    });
  }

  // Validation: Missing language
  if (!language || typeof language !== "string" || !language.trim()) {
    return res.status(400).json({
      error: "Missing Language",
      message: "Please select a valid programming language."
    });
  }

  // Double check supported languages boundary
  const supportedLanguages = ["java", "python", "javascript", "cpp", "c"];
  const normalizedLang = language.toLowerCase().trim();
  if (!supportedLanguages.includes(normalizedLang)) {
    return res.status(400).json({
      error: "Unsupported Language",
      message: `Selected language "${language}" is not supported. Please select Java, Python, JavaScript, C++, or C.`
    });
  }

  try {
    // Call our server-side Gemini wrapper
    const analysisResult = await analyzeCode(normalizedLang, code);
    
    // Return structured review JSON
    return res.json(analysisResult);
  } catch (error) {
    console.error("API Review route handler error:", error);
    
    // Graceful error reporting to the user (contains visual info, API configuration state etc.)
    return res.status(500).json({
      error: "Analysis Failed",
      message: error.message || "Something went wrong while communicating with the AI service. Please confirm your GEMINI_API_KEY is properly set in the Secrets modal."
    });
  }
});

export default router;
