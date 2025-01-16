import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Minha API',
    description: 'Descrição da API usando Express e TypeScript 111',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  components: {
    "schemas": {
      "MainModel": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "name": {
            "type": "string",
            "example": "Teste"
          },
          "direct_bonus": {
            "type": "boolean",
            "example": false
          },
          "direct_bonus_yield": {
            "type": "number",
            "format": "float",
            "example": 0
          },
          "direct_bonus_levels": {
            "type": "integer",
            "example": 0
          },
          "unilevel_bonus": {
            "type": "boolean",
            "example": false
          },
          "unilevel_bonus_yield": {
            "type": "number",
            "format": "float",
            "example": 0
          },
          "unilevel_bonus_levels": {
            "type": "integer",
            "example": 0
          },
          "residual_bonus": {
            "type": "boolean",
            "example": false
          },
          "residual_bonus_yield": {
            "type": "number",
            "format": "float",
            "example": 0
          },
          "residual_bonus_levels": {
            "type": "integer",
            "example": 0
          },
          "binary_bonus": {
            "type": "boolean",
            "example": false
          },
          "binary_bonus_yield": {
            "type": "number",
            "format": "float",
            "example": 0
          },
          "binary_bonus_point_percent": {
            "type": "number",
            "format": "float",
            "example": 0
          },
          "binary_bonus_levels": {
            "type": "integer",
            "example": 0
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "example": "2025-01-15T00:27:34.646Z"
          },
          "updated_at": {
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "example": null
          },
          "direct_bonus_items": {
            "type": "array",
            "items": {
              "type": "object"
            }
          },
          "unilever_bonus_items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/BonusItem"
            }
          },
          "residual_bonus_items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/BonusItem"
            }
          },
          "binary_bonus_items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/BonusItem"
            }
          }
        },
        "required": [
          "id",
          "name",
          "direct_bonus",
          "unilevel_bonus",
          "residual_bonus",
          "binary_bonus"
        ]
      },
      "BonusItem": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "example": 1
          },
          "type": {
            "type": "string",
            "enum": ["UNILEVEL", "RESIDUAL", "BINARY"],
            "example": "UNILEVEL"
          },
          "category_id": {
            "type": "integer",
            "example": 1
          },
          "max_value": {
            "type": "number",
            "format": "float",
            "example": 25
          },
          "level_values": {
            "type": "array",
            "items": {
              "type": "number",
              "format": "float"
            },
            "example": [3, 1, 0.5]
          },
          "created_at": {
            "type": "string",
            "format": "date-time",
            "example": "2025-01-15T00:28:33.137Z"
          },
          "updated_at": {
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "example": null
          }
        },
        "required": [
          "id",
          "type",
          "category_id",
          "max_value",
          "level_values"
        ]
      }
    }
  }
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = ['./src/routes/index.ts', './src/presentations/controllers/auth/login.controller.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc)