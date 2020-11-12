const Logger = function (site) {
  this.site = site;
};

Logger.prototype.green = function success(message) {
  console.log(
    "\x1b[32m",
    `[${this.site}] [${new Date().toISOString()}] ${message}`
  );
};

Logger.prototype.red = function error(message) {
  console.log(
    "\x1b[31m",
    `[${this.site}] [${new Date().toISOString()}] ${message}`
  );
};

Logger.prototype.blue = function info(message) {
  console.log(
    "\x1b[34m",
    `[${this.site}] [${new Date().toISOString()}] ${message}`
  );
};

Logger.prototype.yellow = function warn(message) {
  console.log(
    "\x1b[33m",
    `[${this.site}] [${new Date().toISOString()}] ${message}`
  );
};

module.exports = (site) => {
  return new Logger(site);
};
