import mongoose from "mongoose";
import { Nitro } from 'nitropack';

export default async ( _nitroApp: Nitro ) => {
  const config = useRuntimeConfig();

  mongoose.set('strictQuery', false)
  mongoose
    .connect(config.MONGO_URI)
    .then(() => console.log('connected to DB'))
    .catch((e) => console.log("cannot connect to DB\n" + e))
}