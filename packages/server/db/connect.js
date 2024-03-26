import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: "ShopcoApp",
    });
    console.log("Mongo DB is connected");
  } catch (error) {
    console.log(error);
  }
};
