const Koa = require("koa");
const { koaBody } = require("koa-body");
const Router = require("koa-router");
const { MongoClient } = require("mongodb");
const serve = require("koa-static");
const mount = require("koa-mount");
const cors = require("@koa/cors");

const uri = "mongodb://db:27017";
const client = new MongoClient(uri);

const app = new Koa();

app.use(
  cors({
    origin: ["http://localhost:5173"], // for frontend dev
  })
);

app.use(koaBody());

const router = new Router();

router.get("/", (ctx, next) => {
  ctx.redirect("/chci-nabidku");
  next();
});

router.get("/leads", async (ctx, next) => {
  let result;
  try {
    await client.connect();
    result = await client.db("db").collection("leads").find().toArray();
  } finally {
    await client.close();
  }
  ctx.body = result;
  next();
});

router.put("/lead", async (ctx, next) => {
  if (
    !ctx.request.body ||
    !ctx.request.body.estateType ||
    !ctx.request.body.region ||
    !ctx.request.body.district ||
    !ctx.request.body.fullName ||
    !ctx.request.body.phone ||
    !ctx.request.body.email
  ) {
    ctx.response.status = 400;
    ctx.body = "Please enter the data";
  } else {
    try {
      await client.connect();
      const result = await client.db("db").collection("leads").insertOne({
        estateType: ctx.request.body.estateType,
        region: ctx.request.body.region,
        district: ctx.request.body.district,
        fullName: ctx.request.body.fullName,
        phone: ctx.request.body.phone,
        email: ctx.request.body.email,
      });
    } finally {
      await client.close();
      ctx.response.status = 201;
      ctx.body = `New lead added`;
    }
  }
  next();
});

app.use(mount("/chci-nabidku", serve("./dist")));
app.use(router.routes());

app.listen(3000);
