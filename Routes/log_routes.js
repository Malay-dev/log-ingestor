import express from "express";
import {
  create_log,
  filter_logs,
  get_all_logs,
} from "../Controllers/log_controller.js";

const log_router = express.Router();

log_router.get("/", get_all_logs);
log_router.post("/", create_log);
log_router.get("/filter", filter_logs);
log_router.post("/filter", filter_logs);
export default log_router;
