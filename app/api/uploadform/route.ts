import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { InsertData } from "../_services/insert";
import { UploadImage } from "../_services/upload";

export async function POST(request: NextRequest) {
  const formdata: any = await request.formData();
  // const { positionID, storeName, image1, image2 } =
  //   Object.fromEntries(formdata);
  const positionID = formdata.get("positionID");
  const storeName = formdata.get("storeName");
  const image1 = formdata.get("image1");
  const image2 = formdata.get("image2");
  const uuid1 = randomUUID();
  await UploadImage(uuid1, image1);
  const uuid2 = randomUUID();
  await UploadImage(uuid2, image2);
  await InsertData(positionID, storeName, uuid1, uuid2);

  return NextResponse;
}
