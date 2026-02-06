import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);
