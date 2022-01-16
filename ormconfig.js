module.exports = {
  "type": "mysql",
  "url": process.env.CLEARDB_DATABASE_URL,
  "logging": true,
  "migrationsTableName": "migrations",
  "migrations": [
      "dist/database/migrations/*.js"
  ],
  "entities": [
      "dist/models/*.js"
  ],
  "cli": {
      "migrationsDir": "src/database/migrations",
      "entitiesDir": "src/models"
  }
}