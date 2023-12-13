/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "4v2y6cwlvwo9v05",
    "created": "2023-12-05 12:04:05.417Z",
    "updated": "2023-12-05 12:04:05.417Z",
    "name": "deck_cards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "nmo8tbjo",
        "name": "deck",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "locl3jyn3p803wz",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "eudrxl4r",
        "name": "card",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "ztav9tbo676bf2h",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
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
  const collection = dao.findCollectionByNameOrId("4v2y6cwlvwo9v05");

  return dao.deleteCollection(collection);
})
