import dotenv from "dotenv";
import colors from "colors";
import fetch from "node-fetch";
import connectDB from "./config/db.js";
import Product from "./models/product.js";
import User from "./models/user.js";
import users from "./data/users.js";

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    // 1️⃣ Fetch products from EscuelaJS API
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const apiProducts = await response.json();

    // 2️⃣ Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    // 3️⃣ Insert users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    // 4️⃣ Map API data to our schema
    const sampleProducts = apiProducts.map((item) => ({
      externalId: item.id,
      user: adminUser,
      title: item.title,
      price: item.price,
      description: item.description,
      category: {
        id: item.category?.id || null,
        name: item.category?.name || "",
        image: item.category?.image || "",
      },
      images: item.images || [],
      countInStock: 50,
      rating: 0,
      numReviews: 0,
      isActive: true,
    }));

    // 5️⃣ Insert products
    await Product.insertMany(sampleProducts);

    console.log("✅ Data seeded successfully from EscuelaJS API!".green.bold);
    process.exit();
  } catch (error) {
    console.error(`❌ Error while seeding data: ${error.message}`.red.bold);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log("🧹 All Data Deleted!".yellow.bold);
    process.exit();
  } catch (error) {
    console.error(`❌ Error deleting data: ${error.message}`.red.bold);
    process.exit(1);
  }
};

// Run with: node backend/Seed.js  or  node backend/Seed.js -d
if (process.argv[2] === "-d") {
  deleteData();
} else {
  seedData();
}
