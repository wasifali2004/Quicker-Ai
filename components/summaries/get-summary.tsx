import { getDBConnection } from "@/lib/db";

export async function getSummaryById(id: string) {
  try {
    const sql = await getDBConnection();
    const result = await sql`
      SELECT
        id,
        title,
        created_at,
        updated_at,
        status,
        summary_text,
        file_name,
        original_file_url,
        CASE
          WHEN TRIM(summary_text) = '' OR summary_text IS NULL THEN 0
          ELSE LENGTH(TRIM(summary_text)) - LENGTH(REPLACE(TRIM(summary_text), ' ', '')) + 1
        END AS word_count
      FROM pdf_summaries
      WHERE id = ${id}
    `;

    if (!result || result.length === 0) {
      console.log("No summary found for id:", id);
      return null;
    }

    return result[0];
  } catch (err) {
    console.error("Error fetching summary by id:", id, err);
    return null;
  }
}
