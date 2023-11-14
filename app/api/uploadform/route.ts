import { createClient } from '@supabase/supabase-js';
import { NextAPIRequest, NextAPIResponse } from 'next/server';
// import formidable, { File } from 'formidable-serverless';
// import sharp from 'sharp';


const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!


const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextAPIRequest, response: NextAPIResponse) {
    const form = await request.formData()
    // const form_value = form.getAll("positionID")
    return form
}


// SUPABASE
// const { data, error } = await supabase
//   .storage
//   .from('storeaudits')
//   .upload(positionID + "/" , image_actual, {
//     cacheControl: '3600',
//     upsert: false
//   })


    
