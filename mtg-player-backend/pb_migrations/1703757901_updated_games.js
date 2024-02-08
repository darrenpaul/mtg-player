/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("20lp7gnttqck4pt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uihypgzq",
    "name": "players",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("20lp7gnttqck4pt")

  // remove
  collection.schema.removeField("uihypgzq")

  return dao.saveCollection(collection)
})
