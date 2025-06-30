import Stripe from "stripe";
import { getDBConnection } from "./db";

export async function CheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}) {
  console.log("Checkout session completed", session);
  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0].price?.id;

  if ("email" in customer && priceId) {
    const { email, name } = customer;
    const sql = await getDBConnection();
    await createOrUpdateUser({
      email: email as string,
      fullName: name as string,
      customerId,
      priceId: priceId as string,
      status: "active",
      sql
    });

    await createPayment({
      session,
      stripe,
      priceId: priceId as string,
      userEmail: email as string,
      sql
    });
  }
}

async function createOrUpdateUser({
  email,
  fullName,
  customerId,
  priceId,
  status,
  sql
}: {
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
  sql:any
}) {
  try {
    
    const user = await sql`select * from user where email=${email}`;
    if (user.length === 0) {
      await sql`insert into user (email, fullName, customerId, priceId, status) values (${email}, ${fullName}, ${customerId}, ${priceId}, ${status})`;
    }
  } catch (err) {
    console.error("Error creating or updating user", err);
  }
}

async function createPayment({
  session,
  stripe,
  priceId,
  userEmail,
  sql
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
  priceId: string;
  userEmail: string;
  sql:any
}) {
  try {
    const { amount_total, id, customer_email, status } = session;
    await sql`insert into user (amount,status,stripe_payment_id, priceId,   user_email ) values (${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail})`;
  } catch (err) {
    console.error("Error in creating payment", err);
  }
}


export async function handleSubscriptionDeleted({
  sessionIdDeleted,
  stripe,
}: {
  sessionIdDeleted: string;
  stripe: Stripe;
}){
    try{
        const subscription = await stripe.subscriptions.retrieve(sessionIdDeleted)
        const sql = await getDBConnection()
        await sql `insert user set status='cancelled' where customer_id=${subscription.customer}`
    }
    catch(err){
        console.error("Error in deleting id", err)
    }
}