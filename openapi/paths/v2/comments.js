const j2s = require( "joi-to-swagger" );
const CommentsController = require( "../../../lib/controllers/v2/comments_controller" );
const commentsCreateSchema = require( "../../schema/request/comments_create" );

module.exports = sendWrapper => {
  async function POST( req, res ) {
    const results = await CommentsController.create( req );
    sendWrapper( req, res, null, results );
  }

  POST.apiDoc = {
    tags: ["Comments"],
    summary: "Create a comment",
    security: [{
      userJwtRequired: []
    }],
    requestBody: {
      content: {
        "application/json": {
          schema: j2s( commentsCreateSchema ).swagger
        }
      }
    },
    responses: {
      200: {
        description: "A list of comments",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ResultsComments"
            }
          }
        }
      }
    }
  };

  return {
    POST
  };
};
