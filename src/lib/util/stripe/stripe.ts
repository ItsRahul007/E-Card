import Stripe from 'stripe';

export const serverSideStripe = new Stripe(process.env.STRIPE_SERVER_SECRET_KEY!);
export const clientSideStripe = new Stripe(process.env.STRIPE_CLIENT_SECRET_KEY!);

