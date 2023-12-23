/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "dbwao1t8c3vqj52",
    "created": "2023-12-20 10:51:51.738Z",
    "updated": "2023-12-20 10:51:51.738Z",
    "name": "log",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zvi9oy1m",
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
  const collection = dao.findCollectionByNameOrId("dbwao1t8c3vqj52");

  return dao.deleteCollection(collection);
})
