import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe, SUBSCRIPTION_PRICE_ID } from '../../../lib/stripe'
import { getUserSession } from '@/lib/core/session'

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const formData = await request.formData()
   const artworkId = formData.get("artworkId");
const title = formData.get("title");
const price = formData.get("price");
    

    const user = await getUserSession();
    console.log(user);
    

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price_data: {
            currency: "usd",
            unit_amount: Number(price) * 100,
            product_data: {
                name: title,
            }

          },
          quantity: 1,
        },
      ],
      mode: 'payment',
       metadata: {
    artworkId,
    buyerId: user.id,
    buyerEmail: user.email,
    buyerName: user.name,
    title,
    price,
  },
      success_url: `${origin}/dashboard/buyer/purchase-history/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}