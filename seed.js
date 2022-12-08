db = db.getSiblingDB("cs546_final_project");
db.dropDatabase();
db.users.insertOne({
  "firstName": "Jhonny",
  "lastName": "Sins",
  "name": "Jhonny Sins",
  "username": "youcantseeme",
  "password": "$2b$10$qLdIcUnY3vUu6sr4F4WKmux7RUWVRHSoWTryhJaSSVhl/SzzGbqey"
});
