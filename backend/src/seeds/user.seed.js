import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  
  {
    email: "emma.thompson@example.com",
    fullName: "Asta",
    password: "123456",
    profilePic: "https://i.pinimg.com/736x/3e/95/11/3e9511cd44e00c221a5141383101205f.jpg",
  },
  {
    email: "james.anderson@example.com",
    fullName: "Ayanakoji",
    password: "123456",
    profilePic: "https://preview.redd.it/genuine-question-what-are-you-going-to-do-the-day-ayanokoji-v0-82515kgqu1bb1.jpg?width=720&format=pjpg&auto=webp&s=2d0965f75902035787ea2313ef574cb68824815c",
  },
  
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};


seedDatabase();