const Koa = require("koa");
const { koaBody } = require("koa-body");
const Router = require("koa-router");
const { MongoClient } = require("mongodb");
const serve = require("koa-static");
const mount = require("koa-mount");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

const app = new Koa();

app.use(koaBody());

const router = new Router();

let items = [
  { id: 100, iname: "Quartz Analog Wrist Watch", price: "US $4.99" },
  { id: 101, iname: "Leather Peep Pump Heels", price: "US $33.56" },
  { id: 102, iname: "Apple iPod", price: "US $219.99" },
  { id: 103, iname: "Prince Phantom 97P Tennnis Racket", price: "US $50.00" },
];

router.get("/", (ctx, next) => {
  ctx.body = items;
  next();
});

router.get("/mongo", async (ctx, next) => {
  let result;
  try {
    await client.connect();
    result = await client.db("db").collection("names").find().toArray();
    console.log(result);
  } finally {
    await client.close();
  }
  console.log("res", result);
  ctx.body = result;
  next();
});

router.post("/add", (ctx, next) => {
  if (
    !ctx.request.body.id ||
    !ctx.request.body.iname ||
    !ctx.request.body.price
  ) {
    ctx.response.status = 400;
    ctx.body = "Please enter the data";
  } else {
    let newItem = items.push({
      id: ctx.request.body.id,
      iname: ctx.request.body.iname,
      price: ctx.request.body.price,
    });
    ctx.response.status = 201;
    ctx.body = `New item = added with id: ${ctx.request.body.id} & item name: ${ctx.request.body.iname}`;
  }
  next();
});

app.use(mount("/form", serve("../frontend/dist")));
app.use(router.routes());

app.listen(3000);
