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
  await supabase.storage.from("storeaudits").upload(uuid1, image1, {
    cacheControl: "3600",
    upsert: false,
    contentType: "image/jpeg"
  });
  const uuid2 = randomUUID();
  await supabase.storage.from("storeaudits").upload(uuid2, image2, {
    cacheControl: "3600",
    upsert: false,
    contentType: "image/jpeg"
  });
  await supabase.from("store_audits").insert({
    position_id: positionID,
    store_name: storeName,
    image1_id: uuid1,
    image2_id: uuid2
  });

  return NextResponse;
}
