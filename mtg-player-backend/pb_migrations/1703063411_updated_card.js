/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ztav9tbo676bf2h")

  // remove
  collection.schema.removeField("5zqwdyvs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "blhyelmu",
    "name": "keywords",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "yhp5a6zcd2bmp6l",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ztav9tbo676bf2h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5zqwdyvs",
    "name": "keywords",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 251,
      "values": [
        "Living weapon",
        "Jump-start",
        "Commander ninjutsu",
        "Legendary landwalk",
        "Nonbasic landwalk",
        "Totem armor",
        "Megamorph",
        "Haunt",
        "Forecast",
        "Graft",
        "Fortify",
        "Frenzy",
        "Gravestorm",
        "Hideaway",
        "Level Up",
        "Infect",
        "Reach",
        "Rampage",
        "Phasing",
        "Multikicker",
        "Morph",
        "Provoke",
        "Modular",
        "Ninjutsu",
        "Replicate",
        "Recover",
        "Poisonous",
        "Prowl",
        "Reinforce",
        "Persist",
        "Retrace",
        "Rebound",
        "Miracle",
        "Overload",
        "Outlast",
        "Prowess",
        "Renown",
        "Myriad",
        "Shroud",
        "Trample",
        "Vigilance",
        "Shadow",
        "Storm",
        "Soulshift",
        "Splice",
        "Transmute",
        "Ripple",
        "Suspend",
        "Vanishing",
        "Transfigure",
        "Wither",
        "Undying",
        "Soulbond",
        "Unleash",
        "Ascend",
        "Assist",
        "Afterlife",
        "Companion",
        "Fabricate",
        "Embalm",
        "Escape",
        "Fuse",
        "Menace",
        "Ingest",
        "Melee",
        "Improvise",
        "Mentor",
        "Partner",
        "Mutate",
        "Tribute",
        "Surge",
        "Skulk",
        "Undaunted",
        "Riot",
        "Spectacle",
        "Forestwalk",
        "Islandwalk",
        "Mountainwalk",
        "Double strike",
        "Cumulative upkeep",
        "First strike",
        "Scavenge",
        "Encore",
        "Deathtouch",
        "Defender",
        "Amplify",
        "Affinity",
        "Bushido",
        "Convoke",
        "Bloodthirst",
        "Absorb",
        "Aura Swap",
        "Changeling",
        "Conspire",
        "Cascade",
        "Annihilator",
        "Battle Cry",
        "Cipher",
        "Bestow",
        "Dash",
        "Awaken",
        "Crew",
        "Aftermath",
        "Afflict",
        "Flanking",
        "Foretell",
        "Fading",
        "Fear",
        "Eternalize",
        "Entwine",
        "Epic",
        "Dredge",
        "Delve",
        "Evoke",
        "Exalted",
        "Evolve",
        "Extort",
        "Dethrone",
        "Exploit",
        "Devoid",
        "Emerge",
        "Escalate",
        "Flying",
        "Haste",
        "Hexproof",
        "Indestructible",
        "Intimidate",
        "Lifelink",
        "Horsemanship",
        "Kicker",
        "Madness",
        "Swampwalk",
        "Desertwalk",
        "Craft",
        "Plainswalk",
        "Split second",
        "Augment",
        "Double agenda",
        "Reconfigure",
        "Ward",
        "Partner with",
        "Daybound",
        "Nightbound",
        "Decayed",
        "Disturb",
        "Squad",
        "Enlist",
        "Read Ahead",
        "Ravenous",
        "Blitz",
        "Offering",
        "Living metal",
        "Backup",
        "Banding",
        "Hidden agenda",
        "For Mirrodin!",
        "Friends forever",
        "Casualty",
        "Protection",
        "Compleated",
        "Devour",
        "Enchant",
        "Flash",
        "Boast",
        "Landwalk",
        "Demonstrate",
        "Sunburst",
        "Flashback",
        "Cycling",
        "Equip",
        "Buyback",
        "Hexproof from",
        "More Than Meets the Eye",
        "Cleave",
        "Champion",
        "Specialize",
        "Training",
        "Prototype",
        "Toxic",
        "Unearth",
        "Intensity",
        "Plainscycling",
        "Swampcycling",
        "Typecycling",
        "Wizardcycling",
        "Mountaincycling",
        "Basic landcycling",
        "Islandcycling",
        "Forestcycling",
        "Slivercycling",
        "Landcycling",
        "Bargain",
        "Choose a background",
        "Echo",
        "Doctor's companion",
        "Activate",
        "Attach",
        "Cast",
        "Counter",
        "Create",
        "Destroy",
        "Discard",
        "Double",
        "Exchange",
        "Exile",
        "Adapt",
        "Support",
        "Seek",
        "Play",
        "Regenerate",
        "Reveal",
        "Sacrifice",
        "Shuffle",
        "Tap",
        "Untap",
        "Vote",
        "Goad",
        "Transform",
        "Surveil",
        "Planeswalk",
        "Mill",
        "Learn",
        "Connive",
        "Venture into the dungeon",
        "Exert",
        "Open an Attraction",
        "Food",
        "Discover",
        "Abandon",
        "Explore",
        "Treasure",
        "Roll to Visit Your Attractions",
        "Set in motion",
        "Fateseal",
        "Manifest",
        "Populate",
        "Detain",
        "Investigate",
        "Monstrosity",
        "Clash",
        "Scry",
        "Incubate",
        "Proliferate",
        "Meld",
        "Convert",
        "Fight",
        "Bolster",
        "Assemble",
        "Conjure",
        "Amass",
        "Role token",
        "Strive",
        "Heavy Power Hammer",
        "Morbid",
        "Coven",
        "Landfall"
      ]
    }
  }))

  // remove
  collection.schema.removeField("blhyelmu")

  return dao.saveCollection(collection)
})