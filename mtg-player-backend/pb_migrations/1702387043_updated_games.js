/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("20lp7gnttqck4pt")

  // remove
  collection.schema.removeField("wqginiou")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cbmrajpz",
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
  const collection = dao.findCollectionByNameOrId("20lp7gnttqck4pt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wqginiou",
    "name": "players",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("cbmrajpz")

  return dao.saveCollection(collection)
})
