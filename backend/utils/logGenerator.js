import Log from "../models/logModel.js";

const levels = ["INFO", "WARN", "ERROR"];
const services = ["auth", "payments", "notifications"];

const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateLog = () => {
  const log = new Log({
    level: getRandomElement(levels),
    service: getRandomElement(services),
    message: "Sample logs message",
  });
  return log.save();
};

const startGeneratingLogs = () => {
  setInterval(() => generateLog(), 1000);
};

export default startGeneratingLogs;
