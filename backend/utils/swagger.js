import swaggerJsDoc from "swagger-jsdoc";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *   schemas:
 *      User:
 *         type: object
 *         required:
 *            - name
 *            - email
 *            - password
 *         properties:
 *            _id:
 *               type: object
 *               properties:
 *                  $oid:
 *                     type: string
 *                     description: Unique identifier for the user
 *            name:
 *               type: string
 *               description: Full name of the user
 *            email:
 *               type: string
 *               description: Email address of the user
 *            password:
 *               type: string
 *               description: Hashed password of the user
 *         example:
 *            _id:
 *               $oid: "uniqueKeyUser"
 *            name: "suwandi"
 *            email: "suwandisuwandithe03@gmail.com"
 *            password: "securePassword123"
 *            address: "Jakarta, Indonesia"
 *            phone_number: "089262317312"
 *      Todo:
 *         type: object
 *         required:
 *            - title
 *            - description
 *         properties:
 *            _id:
 *               type: object
 *               properties:
 *                  $oid:
 *                     type: string
 *                     description: Unique identifier for the todo list
 *            title:
 *               type: string
 *               description: Title of the todo list
 *            description:
 *               type: string
 *               description: Description of the todo list
 *         example:
 *            _id:
 *               $oid: "uniqueKeyUser"
 *            title: "Review Mid Exam"
 *            description: "this is the description of the todo list"
*/

const swaggerSpec = swaggerJsDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Todo List Management API",
            version: "1.0.0",
            description: "API for managing todo list, including user authentication and todo list management.",
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Development server',
            },
        ],
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: [
        path.join(__dirname, '..', 'routes', '*.js'),
        path.join(__dirname, '..', 'routes', '*.ts'),
        path.join(__dirname, 'swagger.js'),
        path.join(__dirname, 'swagger.ts'),
    ],
});

export default swaggerSpec;