import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';
import { randomUUID } from 'crypto';

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
    var positionID = ''
    const form = await request.formData()
    for (const [key,val] of form.entries()){
        
        if (key == 'positionID') {
            var positionID = String(val)
        }        
        
        const uuid = randomUUID()
        if (key == 'image1' || key == 'image2') {
            const uuid_final = uuid + positionID            
            
            
            const {data, error} = await supabase
            .storage
            .from('storeaudits')
            .upload(uuid_final , val, {
                cacheControl: '3600',
                upsert: false
            })
            
        }
        
    }
    
}




    
