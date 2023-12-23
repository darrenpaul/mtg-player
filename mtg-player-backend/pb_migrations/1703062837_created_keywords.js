/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "yhp5a6zcd2bmp6l",
    "created": "2023-12-20 09:00:37.132Z",
    "updated": "2023-12-20 09:00:37.132Z",
    "name": "keywords",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "48chbemq",
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
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("yhp5a6zcd2bmp6l");

  return dao.deleteCollection(collection);
})
