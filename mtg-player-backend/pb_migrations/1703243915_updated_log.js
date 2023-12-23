/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dbwao1t8c3vqj52")

  collection.name = "game_log"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dbwao1t8c3vqj52")

  collection.name = "log"

  return dao.saveCollection(collection)
})
