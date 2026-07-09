import ai from "../config/gemini.js";
import redis from "../config/redis.js";
import logger from "../utils/logger.js";

const REVIEW_SUMMARY_TTL =
    parseInt(process.env.REDIS_SUMMARY_TTL) || 18000;

const generateReviewSummary = async (product) => {

    const totalStart = performance.now();

    const cacheKey = `review_summary:${product._id}`;

    // ---------------- CACHE LOOKUP ----------------

    const redisGetStart = performance.now();

    const cachedSummary = await redis.get(cacheKey);

    const redisGetTime =
        performance.now() - redisGetStart;

    if (cachedSummary) {

        logger.info({
            event: "review_summary_cache_hit",
            redisGetMs: redisGetTime.toFixed(2),
            totalMs: (performance.now() - totalStart).toFixed(2)
        });

        return cachedSummary;
    }

    logger.info({
        event: "review_summary_cache_miss",
        redisGetMs: redisGetTime.toFixed(2)
    });

    // ---------------- BUILD PROMPT ----------------

    const reviews = product.reviews
        .map(
            review =>
                `Rating: ${review.rating}/5\nReview: ${review.review}`
        )
        .join("\n\n");

    const prompt = `
You are an AI shopping assistant helping customers understand products before purchasing.

Product Details:
Name: ${product.name}
Category: ${product.category}
Subcategory: ${product.subcategory}
Color: ${product.color || "Not Specified"}
Price: ₹${product.price}
Description: ${product.description}

Customer Reviews:
${reviews}

Task:
Generate a concise review summary.

Instructions:
Instructions:
- Write only ONE paragraph.
- Maximum 120 words.
- The tone should not be like that of a judge, rather like a true salesman truly reflecting real reviews.
- Mention the overall customer sentiment.
- Highlight the most commonly praised aspects.
- Mention the most common complaints only if customers have actually reported them.
- If there are no common complaints, do not invent any.
- If there are fewer than three reviews, mention that the summary is based on limited customer feedback.
- If a review contains personal names or identifying information, do not repeat them in the summary.
- Do not use bullet points.
- Do not use headings.
- Do not mention the number of reviews.
- Do not say "Based on the reviews" or similar phrases.
- Write naturally as if helping a customer quickly understand the product.
- Use ONLY the information provided above.uickly understand the product.
- Use ONLY the information provided above.
`;

    // ---------------- GEMINI ----------------

    const geminiStart = performance.now();

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt
    });

    const geminiTime =
        performance.now() - geminiStart;

    const summary = response.text.trim();

    // ---------------- REDIS STORE ----------------

    const redisSetStart = performance.now();

    await redis.set(
        cacheKey,
        summary,
        {
            ex: REVIEW_SUMMARY_TTL
        }
    );

    const redisSetTime =
        performance.now() - redisSetStart;

    logger.info({
        event: "review_summary_generated",
        geminiMs: geminiTime.toFixed(2),
        redisSetMs: redisSetTime.toFixed(2),
        totalMs: (performance.now() - totalStart).toFixed(2)
    });

    return summary;

};

export default generateReviewSummary;


