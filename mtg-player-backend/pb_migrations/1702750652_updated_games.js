/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("20lp7gnttqck4pt")

  collection.listRule = "@request.auth.id = host"
  collection.updateRule = "@request.auth.id = host"
  collection.deleteRule = "@request.auth.id = host"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ljioorpf",
    "name": "host",
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
  const collection = dao.findCollectionByNameOrId("20lp7gnttqck4pt")

  collection.listRule = "@request.auth.id = hostId"
  collection.updateRule = "@request.auth.id = hostId"
  collection.deleteRule = "@request.auth.id = hostId"

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ljioorpf",
    "name": "hostId",
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
})
