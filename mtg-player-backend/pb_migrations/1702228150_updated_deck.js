/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("locl3jyn3p803wz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vlmj73v0",
    "name": "userId",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("locl3jyn3p803wz")

  // remove
  collection.schema.removeField("vlmj73v0")

  return dao.saveCollection(collection)
})
