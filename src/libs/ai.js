import OpenAi from 'openai';
import { config } from 'dotenv';
import AppError from '../utils/appError.js';
import { buildPrompt } from '../utils/build-promt.js';

config();





const generatePlan = async (profile, next) => {
    const normalizeProfile = {
        goal: profile.goal || 'bulk',
        experience: profile.experience || 'intermediate',
        days_per_week: profile.daysPerWeek || profile.days_per_week || 3,
        session_length: profile.sessionLength || profile.session_length || 60,
        equipment: profile.equipment || 'full_gym',
        preferred_split: profile.preferredSplit || profile.preferred_split || 'ai_decide',
        injuries: profile.injuries || 'none',
    };

    const apiKey = process.env.OPEN_AI_API;
    if (!apiKey) {
        return next(new AppError('OPEN_AI_API is missing in .env', 400, 'Error'));
    }

    const openAi = new OpenAi({
        apiKey,
        baseURL: "https://openrouter.ai/api/v1",
        defaultHeaders: {
            'HTTP-Referer': 'http://localhost:8080',
        },
    });

    const prompt = await buildPrompt(normalizeProfile);
    try {
        const compeletion = await openAi.chat.completions.create({
            model: "openrouter/free",
            messages: [
                {
                    role: "system",
                    content: `You are a professional fitness coach.Generate personalized workout plans based on the user's profile. Adapt every recommendation to their goals, experience, available equipment, workout frequency, session length, and injuries. Follow the requested output format exactly and provide only the requested content.`
                },
                {
                    role: "user",
                    content: prompt
                },

            ],
            temperature: 0.7,
            response_format: { type: "json_object" }
        });
        const content = compeletion.choices[0].message.content;

        if (!content) {
            console.log('[AI] no response ==>', JSON.stringify(content));

            return next(new AppError('[AI] no response', 400, "Failed"));

        }
        const planData = JSON.parse(content);

        return planData
    } catch (error) {
        console.log(error);
        return next(new AppError('Failed to parse workout plan. The AI response was malformed, please try again.', 502, 'Bad Gateway'));
    }
}

export default generatePlan