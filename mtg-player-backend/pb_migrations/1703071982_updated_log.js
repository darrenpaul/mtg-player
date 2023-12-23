/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dbwao1t8c3vqj52")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9q0tpuok",
    "name": "activity",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dbwao1t8c3vqj52")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9q0tpuok",
    "name": "actions",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
