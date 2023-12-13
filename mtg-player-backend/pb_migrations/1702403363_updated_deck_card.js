/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4v2y6cwlvwo9v05")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "t5ajcqzo",
    "name": "tag",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "commander"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4v2y6cwlvwo9v05")

  // remove
  collection.schema.removeField("t5ajcqzo")

  return dao.saveCollection(collection)
})
