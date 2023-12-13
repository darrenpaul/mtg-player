/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ztav9tbo676bf2h")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qjbo7xd8",
    "name": "mana_cost",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "B",
        "G",
        "W"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ztav9tbo676bf2h")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qjbo7xd8",
    "name": "mana_cost",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "B",
        "G"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
