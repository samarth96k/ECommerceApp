import ai from "../config/gemini.js";
import redis from "../config/redis.js";

const REVIEW_SUMMARY_TTL =
    parseInt(process.env.REDIS_SUMMARY_TTL) || 18000;

const generateReviewSummary = async (product) => {
const start = Date.now();//to be dleted
    const cacheKey = `review_summary:${product._id}`;

    const cachedSummary = await redis.get(cacheKey);
console.log("Redis GET:", Date.now() - start, "ms");// to be deleted
    if (cachedSummary) {
        console.log("Review Summary -> Redis Cache");
        return cachedSummary;
    }

    console.log("Review Summary -> Gemini API");

    const reviews = product.reviews
        .map(
            (review) =>
                `Rating: ${review.rating}/5
Review: ${review.review}`
        )
        .join("\n\n");
const promptStart = Date.now();// to be deleted
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
//to be delete
console.log("Prompt Build:", Date.now() - promptStart, "ms");
const geminiStart = Date.now();// to be deleted
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt
    });
console.log("Gemini:", Date.now() - geminiStart, "ms");
//to be deleted
    const summary = response.text.trim();
//to be deleted 
const redisSetStart = Date.now();
    await redis.set(
        cacheKey,
        summary,
        {
            ex: REVIEW_SUMMARY_TTL
        }
    );

console.log("Redis SET:", Date.now() - redisSetStart, "ms");
//to be deleted both of them
console.log("Total:", Date.now() - start, "ms");

    return summary;

};

export default generateReviewSummary;