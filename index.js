const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.static("static"));
//REQ: is the request body and carries information about the request
//RES is the response body and is used to handle response functions like .render() to render templates, .json() to return json data, and .send() to send strings
app.get("/hello", (rec, res) => {
  res.json([
    {
      id: 0,
      category: "wood",
      img: "http://localhost:3020/images/wood.jpg",
    },
    {
      id: 1,
      category: "plastic",
      img: "http://localhost:3020/images/plastic.jpg",
    },
    {
      id: 2,
      category: "metal",
      img: "http://localhost:3020/images/metal.jpg",
    },
    {
      id: 3,
      category: "mimbre",
      img: "http://localhost:3020/images/mimbre.jpg",
    },
  ]);
});
app.listen(3020, () => {
  console.log("Server running on port 3020");
});
