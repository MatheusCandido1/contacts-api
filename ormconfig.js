module.exports = {
  "type": "mysql",
  "url": process.env.CLEARDB_DATABASE_URL,
  "logging": true,
  "migrationsTableName": "migrations",
  "migrations": [
    process.env.APP_ENV === 'dev' ? "src/database/migrations/*.ts" : "dist/database/migrations/*.js"
  ],
  "entities": [
    process.env.APP_ENV === 'dev' ? "src/models/*.ts" : "dist/models/*.js"
  ],
  "cli": {
      "migrationsDir": "src/database/migrations",
      "entitiesDir": "src/models"
  }
}