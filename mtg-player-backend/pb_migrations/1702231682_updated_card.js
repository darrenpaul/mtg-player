/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ztav9tbo676bf2h")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5zqwdyvs",
    "name": "keywords",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Strive",
        "Equip",
        "Haste",
        "Trample",
        "Cycling",
        "Amass",
        "Flashback",
        "First strike",
        "Enchant",
        "Hexproof",
        "Proliferate",
        "Partner",
        "Flash",
        "Scry",
        "Menace",
        "Flying",
        "Morbid",
        "Deathtouch",
        "Ravenous",
        "Heavy Power Hammer",
        "Miracle"
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
    "id": "5zqwdyvs",
    "name": "keywords",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "Strive",
        "Equip",
        "Haste",
        "Trample",
        "Cycling",
        "Amass",
        "Flashback",
        "First strike",
        "Enchant",
        "Hexproof",
        "Proliferate"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
