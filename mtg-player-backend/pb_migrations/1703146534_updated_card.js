/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ztav9tbo676bf2h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lhdpnc2x",
    "name": "cardFaces",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ztav9tbo676bf2h")

  // remove
  collection.schema.removeField("lhdpnc2x")

  return dao.saveCollection(collection)
})
