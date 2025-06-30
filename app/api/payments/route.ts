import { NextRequest, NextResponse } from "next/server";

// Temporary placeholder - replace with actual payment logic when ready
export const POST = async (req: NextRequest) => {
  return NextResponse.json({ message: "Payment Process is Disable for now" }, { status: 501 });
};

// Commented out payment logic for future implementation
// import { CheckoutSessionCompleted, handleSubscriptionDeleted } from "@/lib/payment";
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
// export const POST = async (req: NextRequest) => {
//   const payload = await req.text(); 
//   const sig = req.headers.get("stripe-signature");
//   const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(payload, sig!, endPointSecret);
//     switch (event.type) {
//       case "checkout.session.completed":
//         console.log("Checkout session completed");
//         const sessionId = event.data.object.id;
//         console.log("✅ Checkout session completed:", sessionId);
//         const session = await stripe.checkout.sessions.retrieve(sessionId,{expand:['line_items']})
//         CheckoutSessionCompleted({session, stripe}) 
//         break;
//         case "customer.subscription.deleted":
//             console.log("Customer subscription deleted");
//             const subscription = event.data.object;
//             const sessionIdDeleted = event.data.object.id;
//             console.log(subscription)
//             handleSubscriptionDeleted({sessionIdDeleted, stripe})
//       default:
//         console.log(` Unhandled event type: ${event.type}`);
//     }
//   } catch (err) {
//     console.error(" Error in Stripe webhook:", err);
//     return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 });
//   }
//   return NextResponse.json({ received: true });
// };