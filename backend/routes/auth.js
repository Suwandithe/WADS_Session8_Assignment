import express from "express";
import { login, register, logout, verifyEmail } from "../controllers/auth.js";


const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: User
 *     description: User related operations
 */

/**
 * @openapi
 * /user/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Sign up a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Suwandi"
 *               email:
 *                 type: string
 *                 example: "suwandisuwandithe03@gmail.com"
 *               password:
 *                 type: string
 *                 example: "Password123"
 *     responses:
 *       '200':
 *         description: New user registration successfully
 *       '403':
 *         description: Requested resource is forbidden
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

router.post("/register", register )

/**
 * @openapi
 * /user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: Sign in user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "suwandisuwandithe03@gmail.com"
 *               password:
 *                 type: string
 *                 example: "Password123"
 *     responses:
 *       '200':
 *         description: Sign in successfully
 *       '403':
 *         description: Requested resource is forbidden
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post("/login", login)

/**
 * @openapi
 * /user/logout:
 *   post:
 *     tags:
 *       - User
 *     summary: Sign out user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *     responses:
 *       '200':
 *         description: Sign out successfully
 *       '403':
 *         description: Requested resource is forbidden
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post("/logout", logout)


/**
 * @openapi
 * /user/verifyEmail:
 *   post:
 *     tags:
 *       - User
 *     summary: verify user email 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "467876"
 *     responses:
 *       '200':
 *         description: verified successfully
 *       '403':
 *         description: Requested resource is forbidden
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post("/verifyEmail", verifyEmail )
export default router;
