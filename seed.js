db = db.getSiblingDB("cs546b_group42");
db.dropDatabase();
db.users.insertOne({
  _id: ObjectId("5f9f1b9b9b9b9b9b9b9b9b9b"),
  firstName: "Patrick",
  lastName: "Hill",
  name: "Patrick Hills",
  username: "patrickhill",
  password: "$2b$10$5lJPBdFwIWopdMNW10rzg.cs1U8uI1zqFqeQrviyjCu9TtmXHJ28m",
});

db.matches.insertOne({
  _id: ObjectId("5f9f1b9b9b9b9b9b9b9b9b9c"),
  name: "Match name",
  userId: "5f9f1b9b9b9b9b9b9b9b9b9b",
  startTime: 13434311,
  endTime: 13434311,
  duration: 90,
  commentary: [
    {
      time: "Sun Dec 18 2022 19:51:13 GMT-0500",
      comment: "Player 1 scored a goal!",
    },
    {
      time: "Sun Dec 18 2022 19:51:13 GMT-0500",
      comment: "Player 2 have passed to player 1",
    },
  ],
  highlights: ["Highlight video url"],
  team1: {
    name: "team1",
    stats: {
      goals: 2,
      shots: 0,
      shotsontarget: 0,
      fouls: 0,
      passes: 0,
      yellowcards: 0,
      redcards: 0,
      offsides: 0,
      corners: 0,
    },
    players: [
      "player1name",
      "player2name",
      "player3name",
      "player4name",
      "player5name",
      "player6name",
      "player7name",
      "player8name",
      "player9name",
      "player10name",
      "player11name",
    ],
  },
  team2: {
    name: "team2",
    stats: {
      goals: 2,
      shots: 0,
      shotsontarget: 0,
      fouls: 0,
      passes: 0,
      yellowcards: 0,
      redcards: 0,
      offsides: 0,
      corners: 0,
    },
    players: [
      "player1name",
      "player2name",
      "player3name",
      "player4name",
      "player5name",
      "player6name",
      "player7name",
      "player8name",
      "player9name",
      "player10name",
      "player11name",
    ],
  },
});
