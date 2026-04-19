const { S3Client } = require("@aws-sdk/client-s3");

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

if (!region || !accessKeyId || !secretAccessKey) {
  console.warn(
    "[S3] Warning: AWS credentials not fully configured. " +
    "Set AWS_REGION, AWS_ACCESS_KEY_ID, and AWS_SECRET_ACCESS_KEY in server/.env",
  );
}

const s3Client = new S3Client({
  region: region || "eu-west-1",
  credentials:
    accessKeyId && secretAccessKey
      ? { accessKeyId, secretAccessKey }
      : undefined, // falls back to IAM role / env defaults
});

const S3_BUCKET = process.env.AWS_BUCKET_NAME || process.env.AWS_S3_BUCKET || "";

module.exports = { s3Client, S3_BUCKET };
