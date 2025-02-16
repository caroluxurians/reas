const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const result = await client
        .db("db")
        .collection("names")
        .insertOne({ first_name: "Blbek", last_name: "Blbšín" });
        console.log(result)

    } finally {
        await client.close();
    }
}

main().catch(console.error);
