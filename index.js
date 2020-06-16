var express = require("express");
var app = express();
//REQ: is the request body and carries information about the request
//RES is the response body and is used to handle response functions like .render() to render templates, .json() to return json data, and .send() to send strings
app.get("/hello", (rec, res) => {
  res.json([
    { id: 0, category: "wood" },
    { id: 1, category: "plastic" },
    { id: 2, category: "metal" },
    { id: 3, category: "mimbre" },
  ]);
});
app.listen(3020, () => {
  console.log("Server running on port 3020");
});
