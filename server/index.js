const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const redis = require("redis");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const { Pool } = require("pg");
const config = require("./config");

const pgClient = new Pool({
  host: config.pgHost,
  port: config.pgPort,
  user: config.pgUser,
  password: config.pgPassword,
  database: config.pgDatabase,
});

pgClient.on("error", () => console.log("Lost PG connection"));

pgClient.query("CREATE TABLE IF NOT EXISTS todos (work VARCHAR(256))")
  .catch(error => console.log(error));


const redisClient = redis.createClient({
  host: config.redisHost,
  port: config.redisPort,
  retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

app.get("/todos", async (req, res) => {
  const rs = await pgClient.query("Select * from todos");

  res.send(rs.rows);
})

app.post("/todos", async (req, res) => {
  const { work } = req.body;
  await pgClient.query("INSERT INTO todos(work) VALUES($1)", [work]);

  res.send({ success: true });
})

app.listen(80, err => console.log("Listening on port 80"));