import partnerServices from "../../services/partnerServices.js";
import generateTokenandSetCookie from "../../util/genJWT.js";
import genOTP from "../../util/genOTP.js";

let partner_controller = {};

partner_controller.addPartner = async (req, res, next) => {
  try {
    const partnerData = req.body;
    const result = await partnerServices.addPartner(partnerData);
    console.log("AddPartner_Result:", result);
    if (result.success) {
      console.log("AddPartner_Success");
      try {
        const otp_response = await genOTP(
          partnerData.email,
          result.data.verificationToken
        );
        return res.status(201).json({
          success: true,
          message: result.message,
          otp_sent: otp_response.success,
        });
      } catch (otpError) {
        console.error("OTP_Send_Error:", otpError);
        return res.status(201).json({
          success: true,
          message: result.message,
          otp_sent: false,
        });
      }
    } else {
      console.log("AddPartner_exist");
      return res.status(409).json({ success: false, message: result.message });
    }
  } catch (err) {
    console.log("AddPartner_Failure", err);
    return res
      .status(500)
      .json({ success: false, message: "Registration Failed" });
  }
};

partner_controller.authPartner = async (req, res, next) => {
  try {
    const partnerData = req.body;
    const result = await partnerServices.authPartner(partnerData);

    if (result.success) {
      console.log("AuthPartner_Success");
      const token = generateTokenandSetCookie(res, result.data)._id;
      return res
        .status(200)
        .json({ success: true, message: result.message, token });
    } else {
      console.log("AuthPartner_Failure");
      return res.status(401).json({ success: false, message: result.message });
    }
  } catch (err) {
    console.log("AuthPartner_Failure", err);
    return res
      .status(500)
      .json({ success: false, message: "Authentication Failed" });
  }
};

partner_controller.logoutPartner = async (req, res, next) => {
  try {
    const partnerData = req.body;
    const result = await partnerServices.logoutPartner(partnerData);

    if (result.success) {
      console.log("Logout_Success");
      return res.status(200).json({ success: true, message: result.message });
    } else {
      console.log("Logout_Failure");
      return res.status(401).json({ success: false, message: result.message });
    }
  } catch (err) {
    console.log("Logout_Failure");
    return res.status(500).json({ success: false, message: "Logout Failed" });
  }
};

export default partner_controller;
