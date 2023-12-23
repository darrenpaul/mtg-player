/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("20lp7gnttqck4pt")

  collection.listRule = "@request.auth.username ~ players"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("20lp7gnttqck4pt")

  collection.listRule = "players ~ @request.auth.username"

  return dao.saveCollection(collection)
})
