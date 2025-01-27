import mongoose from "mongoose";

// Define the User Schema
const PartnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    mobile: { type: Number, unique: true, required: true },
    scheme: { type: String, required: true },
    regno: { type: Number, required: false },
    password: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpireTime: { type: Date },
    verificationToken: { type: String },
    verificationTokenExpireTime: { type: Date },
    isVerified: { type: Boolean, default: false },
  },
  {
    collection: "partner-data", // Specify the collection name
  }
);

// Create the model using the schema
const PartnerModel = mongoose.model("partnerData", PartnerSchema);

// Correct the export syntax
export default PartnerModel;
