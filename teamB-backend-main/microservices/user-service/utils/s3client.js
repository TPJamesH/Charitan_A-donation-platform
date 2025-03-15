const { S3Client, GetObjectCommand, HeadObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

const s3Client = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const getObjectPresignUrl = async (key) => {

  // Check if the key exists
  const headCommand = new HeadObjectCommand({
    Bucket: process.env.BUCKETNAME,
    Key: key,
  });


  const command = new GetObjectCommand({
    Bucket: process.env.BUCKETNAME,
    Key: key,
  });

  try {

    await s3Client.send(headCommand); // check if key exist
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return url;
  } catch (error) {
    console.log("can't generate URL")
    return "";
  }

}
module.exports = { s3Client, getObjectPresignUrl };