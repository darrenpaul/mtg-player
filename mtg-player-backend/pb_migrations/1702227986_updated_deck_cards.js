/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4v2y6cwlvwo9v05")

  // remove
  collection.schema.removeField("nmo8tbjo")

  // remove
  collection.schema.removeField("eudrxl4r")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q6liu0aq",
    "name": "deckId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "locl3jyn3p803wz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
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
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4v2y6cwlvwo9v05")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nmo8tbjo",
    "name": "deck",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "locl3jyn3p803wz",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eudrxl4r",
    "name": "card",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ztav9tbo676bf2h",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("q6liu0aq")

  // remove
  collection.schema.removeField("cbfrrg8c")

  return dao.saveCollection(collection)
})
