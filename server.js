const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const Person = require("./models/person");
const MenuItem = require("./models/MenuItem");

app.get("/", function (req, res) {
  res.send("Hello World this is mr first api to say");
});

app.post("/person", async (req, res) => {
  try {
    const data = req.body; // Ashuming request boday contains the person data
    //Create a new person document using the mongoose model
    const newPerson = new Person(data);
    // Save the new person to the database
    const response = await newPerson.save();
    console.log("Data saved successfully");
    res.status(200).json({ success: "Data saved sucessfully", response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/person", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched successfully");
    res.status(200).json({ success: "Data fetched sucessfully", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/menuitems", async (req, res) => {
  try {
    const data = req.body;

    const menuItem = new MenuItem(data);

    const response = await menuItem.save();
    console.log("menu save sucess");
    res
      .status(200)
      .json({ message: "Menu Item saved sucessfully", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/menuitems", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched sucess");
    res.status(200).json({ message: "Sucess", data: data });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

// below is the obsilited code
// const data = req.body; // Ashuming request boday contains the person data

// //Create a new person document using the mongoose model
// const newPerson = new Person(data);

// //below is the old method you should directly send data to params like above
// // newPerson.name = data.name;
// // newPerson.work = data.work;
// // newPerson.mobile = data.mobile;
// // newPerson.email = data.email;
// // newPerson.salary = data.salary;
// // newPerson.age = data.age;
// // newPerson.address = data.address;

// // Save the new person to the database
// newPerson.save((error, savedPerson) => {
//   if (error) {
//     console.log("Error Saving Person");
//     res.status(500).json({ error: "Internal server error" });
//   } else {
//     console.log("Data Saved Successfully");
//     res
//       .status(200)
//       .json({ sucess: "Data saved successfully", data: savedPerson });
//   }
// });
