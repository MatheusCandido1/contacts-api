const devSwagger = [
  {
    "url": "http://localhost:3000/api/v1",
    "description": "Local Server"
  },
  {
    "url": "https://mycontacts-server.herokuapp.com/api/v1",
    "description": "Production Server"
  }
  
]

const prodSwagger = [
  {
    "url": "https://mycontacts-server.herokuapp.com/api/v1",
    "description": "Production Server"
  }
]

module.exports = {
  "openapi": "3.0.0",
    "info": {
      "title": "MyContacts API",
      "description": "This is a sample server of MyContacts server.",
      "version": "1.0.0"
    },
    "servers": process.env.NODE_ENV == 'dev' ? devSwagger : prodSwagger,
    "tags": {
      "name": "Contacts",
      "description": "All Contact's endpoints"
    },
    "paths": {
      "/contacts": {
        "post": {
          "tags": [
            "Contacts"
          ],
          "summary": "Add a new contact.",
          "operationId": "addContact",
          "requestBody": {
            "description": "Contact object",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "Contact name"
                    },
                    "email": {
                      "type": "string",
                      "description": "Contact email"
                    },
                    "phone": {
                      "type": "string",
                      "description": "Contact phone"
                    },
                    "category_id": {
                      "type": "string",
                      "description": "Category identifier"
                    }
                  }
                }
              }
            }
          }
        },
        "get": {
          "tags": [
            "Contacts"
          ],
          "summary": "Returns a list of contacts.",
          "responses": {
            "200": {
              "description": "A JSON array of contacts",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/Contact"
                    }
                  },
                  "examples": {
                    "sample": {
                      "value": [
                        {
                          "id": "2ee02622-99c4-4f9e-a4d3-97ea77202842",
                          "name": "Matheus Cândido",
                          "email": "matheus@email.com",
                          "phone": 31998722520,
                          "category": {
                            "id": "089ed185-75aa-11ec-be3a-e4a8dff58e7d",
                            "name": "Instagram"
                          }
                        },
                        {
                          "id": "65c0fa25-7418-11ec-9f8b-e4a8dff58e7d",
                          "name": "Isabella Fernandes",
                          "email": "isabela@email.com",
                          "phone": 31985674450,
                          "category": {
                            "id": "52ec162f-7418-11ec-9f8b-e4a8dff58e7d",
                            "name": "WhatsApp"
                          }
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/contacts/{contactId}": {
        "put": {
          "tags": [
            "Contacts"
          ],
          "summary": "Update an existing contact.",
          "operationId": "updateContact",
          "parameters": [
            {
              "name": "contactId",
              "in": "path",
              "description": "Identifier of contact that needs to be updated",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "name": {
                      "type": "string",
                      "description": "Contact name"
                    },
                    "email": {
                      "type": "string",
                      "description": "Contact email"
                    },
                    "phone": {
                      "type": "string",
                      "description": "Contact phone"
                    },
                    "category_id": {
                      "type": "string",
                      "description": "Category identifier"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "202": {
              "description": "Successful operation"
            }
          }
        },
        "delete": {
          "tags": [
            "Contacts"
          ],
          "summary": "Delete an existing contact.",
          "operationId": "deleteContact",
          "parameters": [
            {
              "name": "contactId",
              "in": "path",
              "description": "Identifier of contact that needs to be deleted",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "202": {
              "description": "Successful operation"
            },
            "404": {
              "description": "Contact not found"
            }
          }
        },
        "get": {
          "tags": [
            "Contacts"
          ],
          "summary": "Returns a single contact.",
          "operationId": "getContact",
          "parameters": [
            {
              "name": "contactId",
              "in": "path",
              "description": "Identifier of contact that needs to be returned",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Successful operation"
            },
            "404": {
              "description": "Contact not found"
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "Category": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "Category identifier"
            },
            "name": {
              "type": "string",
              "description": "Category name"
            }
          }
        },
        "Contact": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "Contact identifier"
            },
            "name": {
              "type": "string",
              "description": "Contact name"
            },
            "email": {
              "type": "string",
              "description": "Contact email"
            },
            "phone": {
              "type": "string",
              "description": "Contact phone"
            },
            "category": {
              "$ref": "#/components/schemas/Category"
            }
          }
        }
      }
    }
  }