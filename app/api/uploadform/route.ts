import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { InsertData } from "../services/insert";
import { UploadImage } from "../services/upload";

export async function POST(request: NextRequest) {
  const allowedOrigin = request.headers.get("options");

  try {
    const formdata: any = await request.formData();
    const { positionID, storeName, image1, image2 } =
      Object.fromEntries(formdata);
    const uuid1 = randomUUID();
    const upload = await UploadImage(uuid1, image1);
    const uuid2 = randomUUID();
    const upload2 = await UploadImage(uuid2, image2);
    const insert = await InsertData(positionID, storeName, uuid1, uuid2);
    console.log(upload);
    console.log(upload2);
    console.log(insert);
  } catch (e: any) {
    // <-- note `e` has explicit `unknown` type
    e.message; // errors
    if (typeof e === "string") {
      e.toUpperCase(); // works, `e` narrowed to string
    } else if (e instanceof Error) {
      e.message; // works, `e` narrowed to Error
    }
    // ... handle other error types
  }

  const response = new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin || "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
      "Access-Control-Max-Age": "86400"
    }
  });

  return response;
}
