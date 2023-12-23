/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ztav9tbo676bf2h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fcokq5lw",
    "name": "layout",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "normal",
        "transform",
        "dfc",
        "adventure"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ztav9tbo676bf2h")

  // remove
  collection.schema.removeField("fcokq5lw")

  return dao.saveCollection(collection)
})
