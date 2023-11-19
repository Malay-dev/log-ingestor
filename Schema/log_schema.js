import mongoose from "mongoose";

const LogModel = new mongoose.Schema({
  level: {
    type: String,
  },
  message: {
    type: String,
  },
  resourceId: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  traceId: {
    type: String,
  },
  spanId: {
    type: String,
  },
  commit: {
    type: String,
  },
  metadata: {
    parentResourceId: {},
  },
});
LogModel.index({ timestamp: 1 });
const LogSchema = mongoose.model("Log", LogModel);

export default LogSchema;
