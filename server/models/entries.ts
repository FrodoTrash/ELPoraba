import mongoose from "mongoose";

const schema: mongoose.Schema = new mongoose.Schema(
  {
    lowCost: {
      type: Number,
      require: true
    },
    highCost: {
      type: Number,
      require: true
    },
    temp: {
      type: Number,
      require: true
    },
    counter: {
      type: Number,
      require: true
    },
    published: {
      type: Date,
      require: true
    },
    lowDifference: {
      type: Number,
    },
    highDifference: {
      type: Number,
    },
    solarGrown: {
      type: Number,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Entries', schema)