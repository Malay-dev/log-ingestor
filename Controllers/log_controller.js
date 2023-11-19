import LogSchema from "../Schema/log_schema.js";
import { publish_to_queue, get_channel } from "../Utility/message_queue.js";

const get_all_logs = async (req, res, next) => {
  try {
    const logs = await LogSchema.find();
    res.status(200).json({
      status: "success",
      result: logs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};

const create_log = async (req, res, next) => {
  try {
    const log_data = req?.body;
    const log = publish_to_queue(log_data, get_channel);
    res.status(200).json({
      status: "success",
      message: "Log entry published to queue",
      result: log,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: error,
    });
  }
};

export { create_log, get_all_logs };
