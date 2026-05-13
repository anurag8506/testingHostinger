const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://anuragatul2002_db_user:FEXlOUHPr3PehWpL@cluster.88f9coe.mongodb.net/campaigngenesis")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const profileSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    profession: String,
    city: String,
    bio: String,
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

app.post("/api/profile", async (req, res) => {
  try {
    const profile = new Profile(req.body);

    await profile.save();

    res.status(201).json({
      success: true,
      message: "Profile saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

app.get("/api/profile", async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });

    res.json(profiles);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching profiles",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});