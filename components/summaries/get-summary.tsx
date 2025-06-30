import { getDBConnection } from "@/lib/db";

export async function getSummaryById(id: string) {
  try {
    const sql = await getDBConnection();
    const result = await sql`SELECT 
  created_at, 
  updated_at, 
  status,
  summary_text, 
  file_name, 
  CASE 
    WHEN TRIM(summary_text) = '' OR summary_text IS NULL THEN 0
    ELSE LENGTH(TRIM(summary_text)) - LENGTH(REPLACE(TRIM(summary_text), ' ', '')) + 1
  END as word_count 
FROM pdf_summaries 
WHERE id = ${id}`;
    if (!result) {
      console.log("Error in fetching the summary data");
    }
    return result[0];
  } catch (err) {
    console.error("Error fetching the summary", id);
    return null;
  }
}
