/**
 * @swagger
 * tags:
 *  name: Post
 *  description: Post Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreatePost:
 *              type: object
 *              required:
 *                  -   title
 *                  -   content
 *                  -   category
 *                  -   coordinate
 *              properties:
 *
 *                  title:
 *                      type: string
 *                  content:
 *                      type: string
 *                  category:
 *                      type: string
 *                  province:
 *                      type: string
 *                  city:
 *                      type: string
 *                  district:
 *                      type: string
 *                  address:
 *                      type: string
 *                  coordinate:
 *                      type: array
 *                      items:
 *                          type: number
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 */
/**
 * @swagger
 * /post/create:
 *  get:
 *      summary: get all options of post
 *      tags:
 *          -   Post
 *      parameters:
 *          -   in: query
 *              name: slug
 *              schema:
 *               type: string
 *      responses:
 *          200:
 *              description: successfully
 */
