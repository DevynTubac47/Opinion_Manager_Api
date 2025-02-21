import rateLimit from "express-rate-limit";

/**
 * @swagger
 * components:
 *   schemas:
 *     RateLimit:
 *       type: object
 *       properties:
 *         windowMs:
 *           type: integer
 *           description: Time window in milliseconds
 *         max:
 *           type: integer
 *           description: Maximum number of requests allowed in the time window
 * 
 * @swagger
 * tags:
 *   name: Rate Limiting
 *   description: API for rate limiting
 */

/**
 * Rate limiting middleware to limit repeated requests to public APIs.
 * 
 * @swagger
 * /rate-limit:
 *   get:
 *     summary: Apply rate limiting to requests
 *     tags: [Rate Limiting]
 *     responses:
 *       200:
 *         description: Rate limiting applied successfully
 *       429:
 *         description: Too many requests
 */
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
})

export default apiLimiter