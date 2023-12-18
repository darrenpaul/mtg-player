/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4v2y6cwlvwo9v05")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cbfrrg8c",
    "name": "cardId",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ztav9tbo676bf2h",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4v2y6cwlvwo9v05")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cbfrrg8c",
    "name": "cardId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ztav9tbo676bf2h",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
