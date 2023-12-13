/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("locl3jyn3p803wz")

  collection.listRule = "@request.auth.id = userId"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("locl3jyn3p803wz")

  collection.listRule = ""

  return dao.saveCollection(collection)
})
