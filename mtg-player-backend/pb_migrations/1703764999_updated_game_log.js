/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dbwao1t8c3vqj52")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zvi9oy1m",
    "name": "game",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "20lp7gnttqck4pt",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dbwao1t8c3vqj52")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zvi9oy1m",
    "name": "game",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "20lp7gnttqck4pt",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
