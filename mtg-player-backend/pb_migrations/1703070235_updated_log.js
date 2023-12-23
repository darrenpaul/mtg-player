/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dbwao1t8c3vqj52")

  // remove
  collection.schema.removeField("ezpgnjtd")

  // remove
  collection.schema.removeField("4e8xt4v3")

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dbwao1t8c3vqj52")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ezpgnjtd",
    "name": "user",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4e8xt4v3",
    "name": "action",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("9q0tpuok")

  return dao.saveCollection(collection)
})
