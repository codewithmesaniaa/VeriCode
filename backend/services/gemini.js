import { GoogleGenAI, Type } from "@google/genai";

let aiClient = null;

function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please set your Gemini API key in the Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

/**
 * Analyzes the provided source code for a specific programming language.
 * Uses gemini-3.5-flash to return a structured code review JSON response.
 * 
 * @param {string} language - The programming language of the code (javascript, python, java, cpp, c)
 * @param {string} code - The source code to review
 * @returns {Promise<Object>} Structured review objects matching the user requirements
 */
export async function analyzeCode(language, code) {
  if (!code || !code.trim()) {
    throw new Error("Source code cannot be empty.");
  }

  const ai = getGeminiClient();

  // Create a structured, detailed prompt for the AI review
  const prompt = `You are an expert principal software engineer and static analysis security tool.
Analyze the following source code written in the "${language}" programming language.

Your task is to conduct a highly professional, detailed, industry-standard code review.
Provide direct, actionable findings covering structure, syntax, performance bottlenecks, vulnerability risks, standard conventions, and design patterns.

Original Source Code:
\`\`\`${language}
${code}
\`\`\`

Strict Response Schema guidelines:
- "overallScore": Integer between 0 and 100 representing general code excellence.
- "codeQuality": A rigorous, multi-paragraph written feedback on the code quality, readability, complexity, and architecture.
- "bugs": A detailed array of actual syntax errors, runtime risks, crash scenarios, or logic issues found in the code.
- "performance": A detailed array of execution slowdowns, heavy space complexity operations, memory leaks, or scaling issues.
- "security": A detailed array of OWASP risks, code injection concerns, thread safety, unvalidated inputs, or credentials leaks.
- "bestPractices": A detailed array of clean code principles, better API call alternates, styled formatting, or standard idiom violations.
- "refactoredCode": A complete, syntax-accurate, fully rewritten refactored version of the code implementing all of your recommendations. Keep comments inside the refactored code to explain critical fixes.

Return of JAVASCRIPT OBJECT represented strictly as a JSON response.`;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      overallScore: {
        type: Type.INTEGER,
        description: "An overall score out of 100 rating code excellence.",
      },
      codeQuality: {
        type: Type.STRING,
        description: "Comprehensive 2-3 paragraph professional text analyzing readability, layout, complexity, and design.",
      },
      bugs: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Array of actual logic flaws or crash hazards. Return empty if none.",
      },
      performance: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Array of performance bottlenecks, wasteful loops, or resource leaks. Return empty if none.",
      },
      security: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Array of code injection dangers, buffer risks, or unvalidated inputs. Return empty if none.",
      },
      bestPractices: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Array of industry standard style conventions or formatting improvements. Return empty if none.",
      },
      refactoredCode: {
        type: Type.STRING,
        description: "The complete, syntactically correct, and beautifully refactored version of the code.",
      },
    },
    required: [
      "overallScore",
      "codeQuality",
      "bugs",
      "performance",
      "security",
      "bestPractices",
      "refactoredCode",
    ],
  };

  try {
    console.log("Initiating static code analysis using gemini-2.5-flash...");
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.1, // Low temperature for high precision code reviews
      },
    });

    const parsedData = JSON.parse(response.text.trim());
    return parsedData;
  } catch (error) {
    console.warn("Primary model gemini-2.5-flash failed or was unavailable. Retrying with gemini-3.1-flash-lite...", error.message);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
          temperature: 0.1,
        },
      });

      const parsedData = JSON.parse(response.text.trim());
      return parsedData;
    } catch (fallbackError) {
      console.error("Both primary and fallback Gemini reviews failed:", fallbackError);
      throw new Error(`AI Review failed: ${fallbackError.message}`);
    }
  }
}
