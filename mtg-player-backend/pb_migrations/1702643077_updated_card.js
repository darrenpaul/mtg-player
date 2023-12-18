/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ztav9tbo676bf2h")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qjbo7xd8",
    "name": "manaCost",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "T",
        "Q",
        "E",
        "PW",
        "CHAOS",
        "A",
        "TK",
        "X",
        "Y",
        "Z",
        "0",
        "½",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "100",
        "1000000",
        "∞",
        "W/U",
        "W/B",
        "B/R",
        "B/G",
        "U/B",
        "U/R",
        "R/G",
        "R/W",
        "G/W",
        "G/U",
        "B/G/P",
        "B/R/P",
        "G/U/P",
        "G/W/P",
        "R/G/P",
        "R/W/P",
        "U/B/P",
        "U/R/P",
        "W/B/P",
        "W/U/P",
        "2/W",
        "2/U",
        "2/B",
        "2/R",
        "2/G",
        "P",
        "W/P",
        "U/P",
        "B/P",
        "R/P",
        "G/P",
        "HW",
        "HR",
        "W",
        "U",
        "B",
        "R",
        "G",
        "C",
        "S"
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
    "name": "manaCost",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "B",
        "G",
        "W",
        "U",
        "R",
        "C",
        "X"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
