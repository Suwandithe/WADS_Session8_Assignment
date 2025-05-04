import express from "express";
import { getAllTodo, addTodo, updateTodo, deleteTodo, getTodo } from "../controllers/todo.js";
import { verifyToken } from "../utils/middleware.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: Todo
 *     description: Todo list related operations
 */

/**
 * @openapi
 * /todo:
 *   get:
 *     tags:
 *       - Todo
 *     summary: Get all todo list from database (auth required)
 *     responses:
 *       '200':
 *         description: Success
 *       '403':
 *         description: Requested resource is forbidden
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.get("/", verifyToken, getAllTodo);

/**
 * @openapi
 * /todo:
 *   post:
 *     tags:
 *       - Todo
 *     summary: Add a new todo list
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Doing Japanese exercise
 *               description:
 *                 type: string
 *                 example: learn basic kanji and basic grammar in conversation
 *     responses:
 *       '200':
 *         description: Todo added successfully
 *       '400':
 *         description: Bad request
 *       '403':
 *         description: Forbidden
 *       '500':
 *         description: Internal server error
 */
router.post("/", verifyToken, addTodo);

// router.get("/:id", verifyToken, getTodo);

/**
 * @openapi
 * /todo/{id}:
 *   put:
 *     tags:
 *       - Todo
 *     summary: Update a todo item
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Todo updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal server error
 */
router.put("/:id", verifyToken, updateTodo);

/**
 * @openapi
 * /todo/{id}:
 *   delete:
 *     tags:
 *       - Todo
 *     summary: Delete a todo item
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Todo deleted successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/:id", verifyToken, deleteTodo);

export default router;
