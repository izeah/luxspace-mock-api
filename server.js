const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.post("/api/v1/checkout", (req, res, next) => {
  const { completeName, emailAddress, address, phoneNumber, courier, payment } =
    req.body;

  const resp = {
    success: false,
    msg: "",
    data: null,
  };

  try {
    if (!completeName || completeName == "") {
      resp.msg = ["completeName is empty"];
      return res.status(400).json(resp);
    }
    if (
      !emailAddress ||
      typeof emailAddress !== "string" ||
      emailAddress == "" ||
      !emailAddress
        .toLowerCase()
        .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      resp.msg = ["emailAddress is empty or invalid format"];
      return res.status(400).json(resp);
    }
    if (!address || address == "") {
      resp.msg = ["address is empty"];
      return res.status(400).json(resp);
    }
    if (
      !phoneNumber ||
      typeof phoneNumber !== "string" ||
      phoneNumber == "" ||
      phoneNumber.toLowerCase().match(/^08\d\S{9,13}$/)
    ) {
      resp.msg = ["phoneNumber is empty or invalid format"];
      return res.status(400).json(resp);
    }
    if (!courier || typeof courier !== "number" || courier <= 0) {
      resp.msg = ["courier must be filled by number"];
      return res.status(400).json(resp);
    }
    if (!payment || typeof payment !== "number" || payment <= 0) {
      resp.msg = ["payment must be filled by number"];
      return res.status(400).json(resp);
    }

    resp.success = true;
    resp.msg = "Request Successfully Proceed";
    return res.status(201).json(resp);
  } catch (error) {
    resp.msg = "Something goes wrong";
    return res.status(500).json(resp);
  }
});

// Add this before server.use(router)
server.use(
  jsonServer.rewriter({
    "/api/v1/*": "/$1",
  })
);
server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running on port 3000");
});

// Export the Server API
module.exports = server;
