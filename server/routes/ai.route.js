import express from "express";
import {
  getRoadmap,
  chatAssistant,
  generateDescription,
  generateQuiz,
} from "../controllers/ai.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// All AI routes require authentication
router.post("/roadmap", isAuthenticated, getRoadmap);
router.post("/chat", isAuthenticated, chatAssistant);
router.post("/generate-description", isAuthenticated, generateDescription);
router.post("/generate-quiz", isAuthenticated, generateQuiz);

export default router;

