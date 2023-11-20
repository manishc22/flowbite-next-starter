import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function UploadImage(uuid: any, imagefile: any) {
  const { data } = await supabase.storage
    .from("storeaudits")
    .upload(uuid, imagefile, {
      cacheControl: "3600",
      upsert: false,
      contentType: "image/jpeg"
    });
  return data;
}
