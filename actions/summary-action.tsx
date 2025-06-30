'use server'

import { getDBConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";


export const DeleteSummaryAction = async (summaryId:string) => {
    try{
        const user = await currentUser()
        const userId = user?.id;
        const sql = await getDBConnection()
        const result = await sql`delete from pdf_summaries where id=${summaryId} and user_id=${userId} returning id`;

        if(result.length > 0) {
            revalidatePath('/dashboard')
            return {
                success:true
            }
        }
        return false
    }
    catch(err) {
        console.log("Error in deleting summary", err)
        return{
            success:false
        }
    }
}