/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "7yham9822sf1f5o",
    "created": "2023-12-28 11:52:31.342Z",
    "updated": "2023-12-28 11:52:31.342Z",
    "name": "boards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vagzjzrv",
        "name": "game",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "20lp7gnttqck4pt",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "dszlmvpv",
        "name": "board",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("7yham9822sf1f5o");

  return dao.deleteCollection(collection);
})
