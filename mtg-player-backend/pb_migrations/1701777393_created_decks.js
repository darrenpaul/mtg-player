/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "locl3jyn3p803wz",
    "created": "2023-12-05 11:56:33.525Z",
    "updated": "2023-12-05 11:56:33.525Z",
    "name": "decks",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ludosbw1",
        "name": "name",
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
  const collection = dao.findCollectionByNameOrId("locl3jyn3p803wz");

  return dao.deleteCollection(collection);
})
