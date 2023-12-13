import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import http from "http";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import resolvers from "../resolvers.js";
import typeDefs from "../typeDefs.js";
import dotenv from "dotenv";
import mqtt from "mqtt";
import { Server } from "socket.io";

dotenv.config();

const app = express();

const httpServer = http.createServer(app);

// Creating a websocket server
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Creating an apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Database connection setup
mongoose.Promise = global.Promise;

const connection = mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
});

connection
  .then((db) => console.log("DB connected"))
  .catch((err) => {
    console.log(err);
  });

// Connect to MQTT broker

let mqttOptions = {
  host: process.env.MQTT_HOST,
  port: process.env.MQTT_PORT,
  protocol: process.env.MQTT_PROTOCOL,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
};

const mqttClient = mqtt.connect(mqttOptions);

// Subscribe to the "initiateTx" topic
mqttClient.on("connect", () => {
  mqttClient.subscribe("initiateTx");
  console.log("Connected to MQTT broker");
});

await server.start();

// Runs when a frontend is loaded
io.on("connection", (socket) => {
  console.log("New client connected");
});

// Handle incoming MQTT messages from the device
mqttClient.on("message", (topic, message) => {
  if (topic === "initiateTx") {
    let { tag, amount, collector } = JSON.parse(message.toString());

    resolvers.Mutation.transact(null, { tag, amount, collector }).then(
      (doc) => {
        if (doc?.type == "success") {
          console.log("Emitted event : refresh");
          io.emit("refresh", doc?.data?.tag);
        }

        // Listen on device on topic "callback" for transaction status
        mqttClient.publish("callback", JSON.stringify(doc));
      }
    );
  }
});

// Server middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(expressMiddleware(server));

export default httpServer;
