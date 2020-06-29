const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//port 27017 is only db
mongoose.connect("mongodb://localhost:27017/commerce?authSource=admin", {
  useNewUrlParser: true,
  user: "commerce",
  pass: "commerce2020",
  useUnifiedTopology: true,
  keepAlive: true,
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.findByEmail = async function (email) {
  const user = await this.findOne({
    email,
  });

  if (!user) {
    console.log("user doesn't exist");
    return null;
  }
  return user;
};

const User = mongoose.model("User", userSchema);

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
        name: "Plastic Decoration",
        img: "http://localhost:3020/images/categoriesChildren/plasticDeco.jpg",
      },
      {
        name: "Plastic Decoration",
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
        name: "Metal Decoration",
        img: "http://localhost:3020/images/categoriesChildren/metalDeco.jpg",
      },
      {
        name: "Metal Decoration",
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
        name: "Mimbre Decoration",
        img: "http://localhost:3020/images/categoriesChildren/mimbreDeco.jpg",
      },
      {
        name: "Mimbre Decoration",
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

app.post("/users", async (req, res) => {
  const { first_name, last_name, email, password, confirm_password } = req.body;

  if (!first_name || !last_name || !email || !password || !confirm_password) {
    return res.status(400).json({
      message: "fields cannot be blank",
    });
  }

  const uniqueEmailData = await User.findByEmail(email);

  if (uniqueEmailData) {
    return res.status(200).json(uniqueEmailData);
  }

  const usersData = await User.create({
    firstName: first_name,
    lastName: last_name,
    email: email,
    password: password,
    confirmPassword: confirm_password,
  });

  res.status(201).json(usersData);
});

app.listen(3020, () => {
  console.log("Server running on port 3020");
});
