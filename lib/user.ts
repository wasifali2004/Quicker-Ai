import { plans } from "@/components/home/pricing-section";
import { getDBConnection } from "./db";
import { User } from "@clerk/nextjs/server";

export async function getPriceID(email: string) {
  const sql = await getDBConnection();
  const result = await sql`select price_id from users where email = ${email} and status='active'`;
  return result?.[0]?.price_id || null;   
}

export async function getUserUploadCounts(userId: string) {
  const sql = await getDBConnection();
  try {
    const [result] = await sql`select count(*) as count from pdf_summaries where user_id=${userId}`;
    return result?.count || 0;
  } catch (err) {
    console.error("Error in getting summaries count", err);
    return 0;
  }
}

export async function hasReachedLimits(userId: string) {
  const uploadCount = await getUserUploadCounts(userId);
  const priceId = await getPriceID(userId);
  const isPro = plans.find((plan) => plan.priceId === priceId)?.id === "pro";
  const uploadLimit: number = isPro ? 1000 : 5;

  return { hasReachedLimits: uploadCount >= uploadLimit, uploadLimit };
}


export async function hasActivePlan(email: string) {
  const sql = await getDBConnection();
  const result = await sql`select price_id, status from users where email = ${email} and status='active' and price_id is not null`;
  return result && result.length > 0;   
}


export async function getSubscriptionStatue(user:User) {
  const subscription = await hasActivePlan(user.emailAddresses[0].emailAddress);

  return subscription;
}