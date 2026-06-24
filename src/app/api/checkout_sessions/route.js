import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe, SUBSCRIPTION_PRICE_ID } from '../../../lib/stripe'
import { getUserSession } from '@/lib/core/session'

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const formData = await request.formData()
    const subscriptionId = formData.get('subscription_id')
    const priceId = SUBSCRIPTION_PRICE_ID[subscriptionId];

    const user = await getUserSession();

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      metadata: {subscriptionId},
      success_url: `${origin}/dashboard/buyer/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}