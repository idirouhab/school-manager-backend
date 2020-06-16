import LoginController from "../controllers/login.controller";
import express from "express";
const router = express.Router();

export default function loginRouter(app) {
    router.post("/", LoginController.create);

    router.get("/confirmation/:token", LoginController.confirmation);

    router.get("/", LoginController.findOne);

    app.use("/login", router);
}
