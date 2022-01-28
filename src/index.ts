import { CONFIG } from "./config/config";
import { WebsocketClient } from "bybit-api";
import { GoogleSheet } from "./sheet/sheet";

const API_KEY = CONFIG.LIVE_API_KEY;
const PRIVATE_KEY = CONFIG.LIVE_API_SECRET;
const PAIR_SYMBOL = "BTCUSD";
const wsConfig = {
  key: API_KEY,
  secret: PRIVATE_KEY,
  livenet: true,
  pongTimeout: 10000,
  reconnectTimeout: 500,
};

const ws = new WebsocketClient(wsConfig);
const gs = new GoogleSheet();
const Main = async () => {
  await gs
    .setup()
    .then((res) => {
      console.log("Google sheet has been setup");
    })
    .catch((err) => {
      console.log("Error:", err);
    });

  // and/or subscribe to individual topics on demand
  ws.subscribe(`trade.${PAIR_SYMBOL}`);

  // Listen to events coming from websockets. This is the primary data source
  let prev_timestamp = 0;
  ws.on("update", async (update: any) => {
    const data = update.data[update.data.length - 1];
    // let Btcprice = data.price;
    // price.push(Btcprice);

    let timestamp = data.trade_time_ms;
    let diff = timestamp - prev_timestamp;
    if (diff > 3_000) {
      gs.updateCell(data.price);
      prev_timestamp = timestamp;
      console.log("data", timestamp, { diff });
    }
  });
};
Main();
