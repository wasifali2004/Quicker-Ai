
"use server";
import { neon } from "@neondatabase/serverless";

export async function getDBConnection() {
    if(!process.env.DATABASE_URL) {
        throw new Error("Neon Database URL is not defined")
    }
    
    console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
    console.log("DATABASE_URL format:", process.env.DATABASE_URL?.substring(0, 20) + "...");
    
    const sql = neon(process.env.DATABASE_URL);
    
    try {
        await sql`SELECT 1 as test`;
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
    
    return sql;
}