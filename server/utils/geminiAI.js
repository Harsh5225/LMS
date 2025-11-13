import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Ultra-Robust Safe GenerateContent with Retry Logic
 * Handles:
 * - 503 overloaded
 * - service unavailable
 * - GoogleGenerativeAIFetchError
 * - random network breaks
 */
async function safeGenerate(model, prompt, maxAttempts = 3) {
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const result = await model.generateContent(prompt);
      return await result.response.text();

    } catch (error) {
      attempts++;

      const errString = error.toString().toLowerCase();
      const msg = error.message?.toLowerCase() || "";

      const isOverloaded =
        error.status === 503 ||
        error.statusText === "Service Unavailable" ||
        msg.includes("503") ||
        msg.includes("service unavailable") ||
        msg.includes("overloaded") ||
        errString.includes("503") ||
        errString.includes("service unavailable") ||
        errString.includes("overloaded");

      if (isOverloaded) {
        console.log(`⚠️ Gemini overloaded. Retry ${attempts}/${maxAttempts}`);
        await new Promise(res => setTimeout(res, attempts * 1200)); // exponential wait
        continue;
      }

      console.error("❌ Unexpected Gemini AI error:", error);
      throw error;
    }
  }

  throw new Error("Gemini AI is overloaded. Please try again later.");
}


/**
 * Generate learning roadmap
 */
export const getLearningRoadmap = async (topic, currentLevel = "beginner", enrolledCourses = []) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    

    const enrolledCoursesText =
      enrolledCourses.length > 0
        ? enrolledCourses.map(c => c.courseTitle || c).join(", ")
        : "No courses yet";

    const prompt = `
    Create a complete learning roadmap for "${topic}".
    Starting level: ${currentLevel}
    Already completed: ${enrolledCoursesText}

    Format the response as:
    {
      "topic": "",
      "overview": "",
      "estimatedDuration": "",
      "phases": [
        {
          "phaseNumber": 1,
          "phaseName": "",
          "duration": "",
          "description": "",
          "topics": [],
          "resources": [],
          "milestone": ""
        }
      ],
      "prerequisites": [],
      "nextSteps": ""
    }
    Return ONLY valid JSON.
    `;

    const text = await safeGenerate(model, prompt);

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : text);

  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw new Error("Failed to generate learning roadmap");
  }
};


/**
 * Chat AI Assistant
 */
export const chatWithAI = async (message, courseContext = null) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are a helpful AI tutor.
    ${courseContext ? `Context: ${courseContext}` : ""}
    Student's message: ${message}
    Keep the response helpful and under 200 words.
    `;

    const text = await safeGenerate(model, prompt);
    return text;

  } catch (error) {
    console.error("Gemini AI Chat Error:", error);
    throw new Error("Failed to get AI response");
  }
};


/**
 * Generate Course Description
 */
export const generateCourseDescription = async (courseTitle, category, courseLevel) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Create a course description.
    
    Title: ${courseTitle}
    Category: ${category}
    Level: ${courseLevel}

    Format JSON:
    {
      "description": "",
      "objectives": [],
      "targetAudience": ""
    }
    Return ONLY valid JSON.
    `;

    const text = await safeGenerate(model, prompt);

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : text);

  } catch (error) {
    console.error("Gemini AI Description Error:", error);
    throw new Error("Failed to generate course description");
  }
};


/**
 * Generate Quiz Questions
 */
export const generateQuizQuestions = async (topic, difficulty = "intermediate", numQuestions = 5) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Generate ${numQuestions} quiz questions for "${topic}" at ${difficulty} difficulty.
    MUST return a valid JSON array:
    [
      {
        "question": "",
        "options": [],
        "correctAnswer": 0,
        "explanation": ""
      }
    ]
    `;

    const text = await safeGenerate(model, prompt);

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : text);

  } catch (error) {
    console.error("Gemini AI Quiz Error:", error);
    throw new Error("Failed to generate quiz questions");
  }
};
