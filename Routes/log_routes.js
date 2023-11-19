import express from "express";
import { create_log, get_all_logs } from "../Controllers/log_controller.js";

const log_router = express.Router();

log_router.get("/", get_all_logs);
log_router.post("/", create_log);

export default log_router;
