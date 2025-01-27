import connectDB from "../DB/connectDB.js";
import partnerModel from "../DB/model/partner_model.js";
import bcrypt from "bcryptjs";
import { generateVerificationCode } from "../util/genCode.js";

let partnerServices = {};

partnerServices.addPartner = async (newPartner) => {
  try {
    await connectDB(); //Conecting to DB
    const partner = await partnerModel.findOne({
      $or: [{ email: newPartner.email }, { mobile: newPartner.mobile }],
    });
    if (partner) {
      return { success: false, message: "Partner already exists" };
    } else {
      const hashedPassword = await bcrypt.hash(newPartner.password, 10); // encrypting the password
      const otptoken = generateVerificationCode();
      const newPartnerData = {
        ...newPartner,
        password: hashedPassword,
        verificationToken: otptoken,
        verificationTokenExpireTime: Date.now() + 24 * 60 * 60 * 1000, //- 24 hours
      };
      const createPartner = new partnerModel(newPartnerData);
      const savedPartner = await createPartner.save();
      return {
        success: true,
        message: "Partner created successfully",
        data: { ...savedPartner.toObject(), password: "XXXX-XXXX" },
      };
    }
  } catch (error) {
    console.error("Error in Creating Partner", error);
    return {
      success: false,
      message: "Error in creating Partner",
      error: error.message,
    };
  }
};

partnerServices.authPartner = async (verifyPartner) => {
  try {
    await connectDB();
    const partner = await partnerModel.findOne({ email: verifyPartner.email });
    if (!partner) {
      return { success: false, message: "Invalid Credentials" };
    } else {
      const isMatch = await bcrypt.compare(
        verifyPartner.password,
        partner.password
      );
      if (!isMatch) {
        return { success: false, message: "Password Mismatch" };
      }
      return {
        success: true,
        message: "Authentication successful",
        data: { ...partner.toObject(), password: "XXXX-XXXX" },
      };
    }
  } catch (error) {
    console.error("Error in Authenticating Partner", error);
    return {
      success: false,
      message: "Error in authenticating Partner",
      error: error.message,
    };
  }
};

partnerServices.logoutPartner = async (partnerData) => {
  try {
    await connectDB();
    const partner = await partner
      .findOne({ email: partnerData.email })
      .select("email");
    if (!partner) {
      return { success: false, message: "Invalid Partner" };
    }
    return { success: true, message: "Logout successful" };
  }
  catch (error) {
    console.error("Error in Logging out Partner", error);
    return {
      success: false,
      message: "Error in logging out Partner",
      error: error.message,
    };
  }
}

export default partnerServices;
