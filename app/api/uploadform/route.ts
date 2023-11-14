import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';
import { randomUUID } from 'crypto';

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
    
    const array = []
    const form = await request.formData()
    for (const [key,val] of form.entries()){
        
        if (key == 'positionID') {
            array.push(String(val))
        }        
        if (key == 'storeName') {
            array.push(String(val))
        }  
        
        
        if (key == 'image1' || key == 'image2') {
            const uuid = randomUUID()    
            
            const {data} = await supabase
            .storage
            .from('storeaudits')
            .upload(uuid , val, {
                cacheControl: '3600',
                upsert: false
            })
            array.push(data)
            
        }
        
    }
    const { error } = await supabase.from('store_audits').insert({ position_id: array[0], store_name: array[1], image1_id: array[2], image2_id: array[3] })
    console.log(error)
}




    
