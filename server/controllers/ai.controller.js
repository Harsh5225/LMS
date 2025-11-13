import {
  getLearningRoadmap,
  chatWithAI,
  generateCourseDescription,
  generateQuizQuestions,
} from "../utils/geminiAI.js";

/**
 * Get AI-powered learning roadmap for a topic
 */
export const getRoadmap = async (req, res) => {
  try {
    const { topic, currentLevel, enrolledCourses } = req.body;

    if (!topic || topic.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Please provide a topic",
      });
    }

    const roadmap = await getLearningRoadmap(
      topic.trim(),
      currentLevel || "beginner",
      enrolledCourses || []
    );

    return res.status(200).json({
      success: true,
      data: roadmap,
    });
  } catch (error) {
    console.error("Roadmap Error:", error);
    return res.status(503).json({
      success: false,
      message: error.message || "AI service is temporarily unavailable",
    });
  }
};


/**
 * Chat with AI learning assistant
 */
export const chatAssistant = async (req, res) => {
  try {
    const { message, courseContext } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Please provide a message",
      });
    }

    const response = await chatWithAI(message, courseContext);

    return res.status(200).json({
      success: true,
      data: { response },
    });
  } catch (error) {
    console.error("Chat Assistant Error:", error);
    return res.status(503).json({
      success: false,
      message: "AI service currently overloaded. Try again later.",
    });
  }
};


/**
 * Generate course description using AI
 */
export const generateDescription = async (req, res) => {
  try {
    const { courseTitle, category, courseLevel } = req.body;

    if (!courseTitle || !category) {
      return res.status(400).json({
        success: false,
        message: "Course title and category are required",
      });
    }

    const description = await generateCourseDescription(
      courseTitle,
      category,
      courseLevel || "beginner"
    );

    return res.status(200).json({
      success: true,
      data: description,
    });
  } catch (error) {
    console.error("Generate Description Error:", error);
    return res.status(503).json({
      success: false,
      message: "AI service unavailable. Try again later.",
    });
  }
};


/**
 * Generate quiz questions
 */
export const generateQuiz = async (req, res) => {
  try {
    const { topic, difficulty, numQuestions } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required",
      });
    }

    const questions = await generateQuizQuestions(
      topic,
      difficulty || "intermediate",
      numQuestions || 5
    );

    return res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error("Generate Quiz Error:", error);
    return res.status(503).json({
      success: false,
      message: "AI service unavailable. Try again later.",
    });
  }
};
