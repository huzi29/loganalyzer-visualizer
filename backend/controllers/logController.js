import Log from "../models/logModel.js";

const getLogs = async (req, res) => {
  const { level, service, start, end, limit = 20, cursor } = req.query;

  const filter = {};
  if (level) filter.level = level;
  if (service) filter.service = service;
  if (start || end) {
    filter.timestamp = {};
    if (start) filter.timestamp.$gte = new Date(start);
    if (end) filter.timestamp.$lte = new Date(end);
  }
  if (cursor) filter._id = { $lt: cursor };

  const logs = await Log.find(filter)
    .sort({ _id: -1 })
    .limit(parseInt(limit));

  res.json({
    data: logs,
    nextCursor: logs.length ? logs[logs.length - 1]._id : null,
  });
};

const getStats = async (req, res) => {
  const seconds = parseInt(req.query.seconds) || 60;
  const since = new Date(Date.now() - seconds * 1000);

  const logs = await Log.find({ createdAt: { $gte: since } });

  const levelCounts = logs.reduce((acc, log) => {
    acc[log.level] = (acc[log.level] || 0) + 1;
    return acc;
  }, {});

  const total = logs.length;
  const avgLogsPerSec = total / seconds;
  const errorRate = total > 0 ? (levelCounts.ERROR || 0) / total : 0;

  res.json({ levelCounts, avgLogsPerSec, errorRate });
};

export { getLogs, getStats };
