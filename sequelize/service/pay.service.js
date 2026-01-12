const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_KEY);

class PayService {
    static async createPayIntent(amount) {
        return await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'php',
            payment_method_types: ['card'],
        });
    }
}

module.exports = PayService;