import { NextRequest, NextResponse } from "next/server";
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

// Create an SQS service object
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

export async function POST(request: NextRequest) {
  const formdata: any = await request.formData();
  var params = {
    MessageBody: formdata,
    QueueUrl: "https://sqs.ap-south-1.amazonaws.com/013701902245/uploadform"
  };

  // const { positionID, storeName, image1, image2 } =
  //   Object.fromEntries(formdata);
  // const uuid1 = randomUUID();
  // const uuid2 = randomUUID();
  sqs.sendMessage(params, function (err: any, data: any) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.QueueUrls);
    }
  });

  return NextResponse;
}
