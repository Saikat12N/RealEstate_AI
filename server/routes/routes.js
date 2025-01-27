import express from "express";
import partner_controller from "../controllers/partnerControllers/partner_controllers.js";


const routers = express.Router();


routers.post("/login", partner_controller.authPartner);
routers.post("/signup", partner_controller.addPartner);
routers.post("/logout", partner_controller.logoutPartner);

export default routers;
