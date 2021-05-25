
const {ObjectId} = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const sleep = (ms) => {
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

let client;
async function getClient() {
    const url = "";
    if (client) return client;
    client = await MongoClient.connect(url).then(client_ => {
        return client_;
    });
    return client;
}

let db;
async function getDb() {
    const dbName = "";
    if (db) return db;
    const client = await getClient();
    db = client.db(dbName);
    return db;
}

async function main() {
    try {
        const client = await getClient();
        const db = await getDb();

        await client.withSession(async (session) => {
            await session.withTransaction(async () => {
                await db.collection("Test").insertOne(
                    {
                        nickname: "ethan",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {session}
                );
                throw "errrrrrr";
                // await sleep(10000);
            });
        });
    } finally {
        if (client) await client.close();
    }
}

main().catch(console.error);
