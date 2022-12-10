db = db.getSiblingDB("cs546_final_project");
db.dropDatabase();
db.users.insertOne({
  "firstName": "Jhonny",
  "lastName": "Sins",
  "name": "Jhonny Sins",
  "username": "youcantseeme",
  "password": "$2b$10$qLdIcUnY3vUu6sr4F4WKmux7RUWVRHSoWTryhJaSSVhl/SzzGbqey"
});

db.matches.insertOne({
  "name": "Match name",
  "startTime": 13434311,
  "endTime": 13434311,
  "duration": 90,
  "comments": [
    {
      "time": 342308923,
      "text": "Player 1 scored a goal!"
    },
    {
      "time": 342308923,
      "text": "Player 2 have passed to player 1"
    }
  ],
  "highlights": {
    "main": "Team1 won",
    "playerofthematch": {
      "name": "player1name",
      "comments": "sdjhdfsjldf"
    },
    "captain1": {
      "name": "player1name",
      "comments": "sdjhdfsjldf"
    },
    "captain2": {
      "name": "player1name",
      "comments": "sdjhdfsjldf"
    },
    "extra": "Just exxtra comments"
  },
  "team1": {
    "name": "team1",
    "goals": {
      "total": 2,
      "details": [
        {
          "time": 2432423432,
          "scorer": "player1name"
        },
        {
          "time": 2432423432,
          "scorer": "player2name"
        }
      ]
    },
    "stats": {
      "shots": 0,
      "shotsontarget": 0,
      "fouls": 0,
      "passes": 0,
      "yellowcards": 0,
      "redcards": 0,
      "offsides": 0,
      "corners": 0
    },
    "players": [
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
      "player11name"
    ]
  },
  "team2": {
    "name": "team2",
    "goals": {
      "total": 2,
      "details": [
        {
          "time": 2432423432,
          "scorer": "player1name"
        },
        {
          "time": 2432423432,
          "scorer": "player2name"
        }
      ]
    },
    "stats": {
      "shots": 0,
      "shotsontarget": 0,
      "fouls": 0,
      "passes": 0,
      "yellowcards": 0,
      "redcards": 0,
      "offsides": 0,
      "corners": 0
    },
    "players": [
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
      "player11name"
    ]
  }
});