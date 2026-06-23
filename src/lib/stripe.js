import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const SUBSCRIPTION_PRICE_ID= {
    'collector_pro' : 'price_1TlZ6eDFUIoNE1xGbg86h7vX',
    'collector_premium' : 'price_1TlaKpDFUIoNE1xGD3eWei6b',
}