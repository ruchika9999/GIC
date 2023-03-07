const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case 400:
      res.json({ title: "Validation failed", message: err.message });
    case 404:
      res.json({ title: "Not Found", message: err.message });
    case 401:
      res.json({ title: "Unauthorized", message: err.message });
    case 403:
      res.json({ title: "Forbidden", message: err.message });
    case 500:
      res.json({ title: "Server Error", message: err.message });
    default:
      console.log("NO ERROR");
      break;
  }
};

module.exports = { errorHandler };
