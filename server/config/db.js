const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = (process.env.MONGODB_URI || "").trim();

if (!uri) {
  throw new Error(
    "MONGODB_URI is not set in server/.env\n" +
    "→ Go to Atlas → your cluster → Connect → Drivers → copy the connection string → paste it as MONGODB_URI=",
  );
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const collections = {
  users: null,
  successStory: null,
  blog: null,
  session: null,
  events: null,
  career: null,
  careerApplications: null,
  documents: null,
  payment: null,
};

const connectWithRetry = async (attempts = 5, baseDelay = 1000) => {
  for (let i = 0; i < attempts; i++) {
    try {
      await client.connect();
      console.log("MongoDB connected successfully");
      return;
    } catch (err) {
      console.error(`MongoDB connection attempt ${i + 1} failed:`, err?.message);
      if (i === attempts - 1) throw err;
      await new Promise((r) => setTimeout(r, baseDelay * Math.pow(2, i)));
    }
  }
};

const connectDB = async () => {
  const dns = require("dns");
  try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  } catch (e) {
    console.warn("Failed to set DNS servers (continuing):", e?.message);
  }

  await connectWithRetry();

  const db = client.db("FineAnswerIreland");
  collections.users              = db.collection("usersCollection");
  collections.successStory       = db.collection("successStory");
  collections.blog               = db.collection("blog");
  collections.session            = db.collection("session");
  collections.events             = db.collection("events");
  collections.career             = db.collection("careerCollection");
  collections.careerApplications = db.collection("careerApplications");
  collections.documents          = db.collection("documentsCollection");
  collections.payment            = db.collection("paymentCollection");
};

module.exports = { client, collections, connectDB };
