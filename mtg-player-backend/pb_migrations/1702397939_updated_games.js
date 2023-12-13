/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("20lp7gnttqck4pt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1ay6wa76",
    "name": "board",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("20lp7gnttqck4pt")

  // remove
  collection.schema.removeField("1ay6wa76")

  return dao.saveCollection(collection)
})
