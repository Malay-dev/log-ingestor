import LogSchema from "../Schema/log_schema.js";

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
    console.log(req);
    const log = await LogSchema.create(log_data);
    res.status(200).json({
      status: "success",
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
