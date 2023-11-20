import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  const formdata: any = await request.formData();
  const { positionID, storeName, image1, image2 } =
    Object.fromEntries(formdata);
  const uuid1 = randomUUID();
  new Promise(() => UploadImage(uuid1, image1));
  const uuid2 = randomUUID();
  new Promise(() => UploadImage(uuid2, image2));
  new Promise(() => InsertData(positionID, storeName, uuid1, uuid2));

  return NextResponse;
}

async function UploadImage(uuid: any, imagefile: any) {
  await supabase.storage.from("storeaudits").upload(uuid, imagefile, {
    cacheControl: "3600",
    upsert: false,
    contentType: "image/jpeg"
  });
}

async function InsertData(
  positionID: any,
  storeName: any,
  uuid1: any,
  uuid2: any
) {
  await supabase.from("store_audits").insert({
    position_id: positionID,
    store_name: storeName,
    image1_id: uuid1,
    image2_id: uuid2
  });
}
