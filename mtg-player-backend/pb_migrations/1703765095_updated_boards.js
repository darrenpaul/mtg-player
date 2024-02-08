/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7yham9822sf1f5o")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dszlmvpv",
    "name": "players",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7yham9822sf1f5o")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dszlmvpv",
    "name": "board",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
