import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { InsertData } from "../_services/insert";
import { UploadImage } from "../_services/upload";

export async function POST(request: NextRequest) {
  const formdata: any = await request.formData();
  const { positionID, storeName, image1, image2 } =
    Object.fromEntries(formdata);
  const uuid1 = randomUUID();
  const upload = UploadImage(uuid1, image1);
  const uuid2 = randomUUID();
  const upload2 = UploadImage(uuid2, image2);
  const insert = InsertData(positionID, storeName, uuid1, uuid2);
  console.log(upload);
  console.log(upload2);
  console.log(insert);
  return NextResponse;
}
