import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function InsertData(
  positionID: any,
  storeName: any,
  uuid1: any,
  uuid2: any
) {
  const { data } = await supabase.from("store_audits").insert({
    position_id: positionID,
    store_name: storeName,
    image1_id: uuid1,
    image2_id: uuid2
  });
  return data;
}
