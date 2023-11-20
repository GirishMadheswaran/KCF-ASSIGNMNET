const express = require("express");
const PORT = 8080;
const path = require("path");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

let postData = [
  {
    id: "2cc192ec-b863-4453-9c96-6aac716d58fa",
    name: "Antonia",
    email: "antonia@gmail.com",
    age: "15",
    salary: "10k",
    description: "This is Antonia profile",
    image: "/images/images5.jpg",
  },
  {
    id: "3cc192ec-b863-4453-9c96-6aac716d58fa",
    name: "Beatriz",
    email: "beatriz@gmail.com",
    age: "25",
    salary: "20k",
    description: "This is Beatriz profile",
    image: "/images/images6.jpg",
  },
  {
    id: "4cc192ec-b863-4453-9c96-6aac716d58fa",
    name: "Brayden",
    email: "brayden@gmail.com",
    age: "35",
    salary: "30k",
    description: "This is Brayden profil",
    image: "/images/images7.jpg",
  },
  {
    id: "5cc192ec-b863-4453-9c96-6aac716d58fa",
    name: "Hugo",
    email: "hugo@gmail.com",
    age: "45",
    salary: "40k",
    description: "This is Hugo profile",
    image: "/images/image4.jpg",
  },
];

app.get("/get", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(postData);
});

app.get("/get/:itemId", (req, res) => {
  const itemId = req.params.itemId;
  const item = postData.find((item) => item.id === itemId);

  if (item) {
    if (item.image) {
      const cleanImagePath = item.image.replace(/\/images\//g, "/images/");
      const imageUrl = cleanImagePath.startsWith("http://")
        ? cleanImagePath
        : `http://localhost:8080${cleanImagePath}`;
      item.image = imageUrl;
    } else {
      item.image = null;
    }
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.post("/post", (req, res) => {
  // console.log('received Data:::::::', req.body);
  const newData = req.body;
  newData.id = uuidv4();
  postData.push(newData);

  res.send("Data posted successfully!");
});

app.listen(PORT, () => console.log("server is runnning"));
