import mongoose from "mongoose"

const {DATABASE_URL} = process.env

export const connect = async () => {
  return await mongoose
    .connect(DATABASE_URL as string)
    .catch(err => console.log(err))
}