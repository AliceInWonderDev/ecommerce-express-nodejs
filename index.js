const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.static("static"));

const data = [
  {
    id: 1,
    category: "wood",
    img: "http://localhost:3020/images/wood.jpg",
    children: [
      {
        id: 1,
        name: "Wood Decoration",
        img: "http://localhost:3020/images/categoriesChildren/woodDeco.jpg",
      },
      {
        id: 2,
        name: "Wood Decoration",
        img: "http://localhost:3020/images/categoriesChildren/woodDeco2.jpg",
      },
    ],
  },
  {
    id: 2,
    category: "plastic",
    img: "http://localhost:3020/images/plastic.jpg",
    children: [
      {
        name: "plastic Decoration",
        img: "http://localhost:3020/images/categoriesChildren/plasticDeco.jpg",
      },
      {
        name: "plastic Decoration",
        img: "http://localhost:3020/images/categoriesChildren/plasticDeco2.jpg",
      },
    ],
  },
  {
    id: 3,
    category: "metal",
    img: "http://localhost:3020/images/metal.jpg",
    children: [
      {
        name: "metal Decoration",
        img: "http://localhost:3020/images/categoriesChildren/metalDeco.jpg",
      },
      {
        name: "metal Decoration",
        img: "http://localhost:3020/images/categoriesChildren/mimbreDeco2.jpg",
      },
    ],
  },
  {
    id: 4,
    category: "mimbre",
    img: "http://localhost:3020/images/mimbre.jpg",
    children: [
      {
        name: "mimbre Decoration",
        img: "http://localhost:3020/images/categoriesChildren/mimbreDeco.jpg",
      },
      {
        name: "mimbre Decoration",
        img: "http://localhost:3020/images/categoriesChildren/mimbreDeco2.jpg",
      },
    ],
  },
];
//REQ: is the request body and carries information about the request
//RES is the response body and is used to handle response functions like .render() to render templates, .json() to return json data, and .send() to send strings
app.get("/categories", (req, res) => {
  res.json(data);
});

app.get("/categories/:id", (req, res) => {
  res.json(data.filter((item) => item.id === +req.params.id)[0].children);
});

app.listen(3020, () => {
  console.log("Server running on port 3020");
});
