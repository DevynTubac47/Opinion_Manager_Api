import { Router } from "express";
import { createdPublicationValidator, deletePublicationValidator, updatePublicationValidator } from "../middlewares/publication.validators.js";
import { addPublication, deletePublication, getPublication, updatePublication } from "./publication.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Publications
 *   description: API for managing publications
 */

/**
 * @swagger
 * /publications:
 *   post:
 *     summary: Create a new publication
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Publication'
 *     responses:
 *       200:
 *         description: The publication was successfully created
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Error publishing
 */
router.post("/addPublication", createdPublicationValidator, addPublication);

/**
 * @swagger
 * /publications:
 *   get:
 *     summary: Get a list of publications
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Limit the number of results
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Skip the first n results
 *     responses:
 *       200:
 *         description: A list of publications
 *       500:
 *         description: Error getting list of publications
 */
router.get("/", getPublication);

/**
 * @swagger
 * /publications/{uid}:
 *   put:
 *     summary: Update a publication
 *     tags: [Publications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The publication id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Publication'
 *     responses:
 *       200:
 *         description: The publication was successfully updated
 *       400:
 *         description: Bad request
 *       404:
 *         description: Publication not found
 *       500:
 *         description: Error updating publication
 */
router.put("/updatePublication/:uid", updatePublicationValidator, updatePublication);

/**
 * @swagger
 * /publications/{uid}:
 *   delete:
 *     summary: Delete a publication
 *     tags: [Publications]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The publication id
 *     responses:
 *       200:
 *         description: The publication was successfully deleted
 *       404:
 *         description: Publication not found
 *       500:
 *         description: Error deleting publication
 */
router.delete("/deletePublication/:uid", deletePublicationValidator, deletePublication);

export default router;