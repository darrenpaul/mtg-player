/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yhp5a6zcd2bmp6l")

  collection.name = "keyword"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("yhp5a6zcd2bmp6l")

  collection.name = "keywords"

  return dao.saveCollection(collection)
})
