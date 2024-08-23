var express = require("express");
var router = express.Router();
const { Sequelize, DataTypes, Model } = require("sequelize");

// Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:')
// Example for sqlite

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

// class User extends Model {
//   static classLevelMethod() {
//     return "foo";
//   }
//   instanceLevelMethod() {
//     return "bar";
//   }
//   getFullname() {
//     return [this.firstname, this.lastname].join(" ");
//   }
// }

// User.init(
//   {
//     // Model attributes are defined here
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       // allowNull defaults to true
//     },
//   },
//   {
//     // Other model options go here
//     sequelize, // We need to pass the connection instance
//     modelName: "User", // We need to choose the model name
//   }
// );

// router.get("/", async function (req, res) {
//   await User.sync();
//   console.log("The table for the User model was just (re)created!");
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//     res.send("ok");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//     res.send("error");
//   }
//   console.log(User.classLevelMethod()); // 'foo'
//   const user = User.build({ firstname: "Jane", lastname: "Doe" });
//   console.log(user.instanceLevelMethod()); // 'bar'
//   console.log(user.getFullname()); // 'Jane Doe'
// });

const User = sequelize.define("user", {
  name: DataTypes.TEXT,
  favoriteColor: {
    type: DataTypes.TEXT,
    defaultValue: "green",
  },
  age: DataTypes.INTEGER,
  cash: DataTypes.INTEGER,
});

router.get("/", async function (req, res) {
  await sequelize.sync({ force: true });
  const jane = User.build({ name: "Jane" });
  console.log(jane instanceof User); // true
  console.log(jane.name); // "Jane"
  await jane.save();
  console.log("Jane was saved to the database!");

  //or alternatively:
  //const jane = await User.create({ name: 'Jane' });
  console.log(jane.toJSON()); // This is good!
  jane.set({
    name: "Ada",
    favoriteColor: "blue",
  });
  await jane.save();

  console.log(jane.name); // "Jane"
  console.log(jane.favoriteColor); // "green"
  jane.name = "Jane II";
  jane.favoriteColor = "blue";
  await jane.save({ fields: ["name"] });
  console.log(jane.name); // "Jane II"
  console.log(jane.favoriteColor); // "blue"
  // The above printed blue because the local object has it set to blue, but
  // in the database it is still "green":
  await jane.reload();
  console.log(jane.name); // "Jane II"
  console.log(jane.favoriteColor); // "green"

  await jane.destroy();
  await User.create({ name: "Jane", age: 100 });
  await jane.increment("age", { by: 2 });
  // Note: to increment by 1 you can omit the `by` option and just do `user.increment('age')`

  // Now this entry was removed from the database
  // Find all users
  const users = await User.findAll();
  console.log(users.every((user) => user instanceof User)); // true
  console.log("All users:", JSON.stringify(users, null, 2));
  //const captains = await Captain.bulkCreate([{ name: 'Jack Sparrow' }, { name: 'Davy Jones' }]);
  res.send("ok");
});

module.exports = router;
