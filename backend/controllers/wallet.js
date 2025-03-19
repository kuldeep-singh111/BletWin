const dotenv = require('dotenv');
const paypal = require('@paypal/checkout-server-sdk');
const User = require('../models/user.js');
const WithdrawalRequest = require('../models/WithdrawalRequest.js');

dotenv.config();

// PayPal SDK Environment Configuration

const environment = new paypal.core.LiveEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);


// GET: Fetch Wallet Data
const WalletPage = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId, 'wallet');

        if (!user) {
            return res.status(404).json({ success: false, message: 'Wallet not found.' });
        }

        res.status(200).json({ success: true, wallet: user.wallet });
    } catch (error) {
        console.error('Error fetching wallet data:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};


// POST: Create PayPal Adding Funds

const AddFunds = async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user.id;

        //  Validate Amount
        if (!amount || isNaN(amount) || amount < 10) {
            return res.status(400).json({ success: false, message: "Minimum deposit amount is $10." });
        }

        //  Create PayPal Order Request
        const order = new paypal.orders.OrdersCreateRequest();
        order.requestBody({
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: amount.toFixed(2),
                    },
                },
            ],
            application_context: {
                return_url: `http://localhost:3000/wallet?status=success`,
                cancel_url: `http://localhost:3000/wallet?status=cancel`,
                user_action: "PAY_NOW",
                shipping_preference: "NO_SHIPPING",
            },
        });

        //  Execute PayPal Order
        const response = await client.execute(order);

        if (!response || !response.result || !response.result.links) {
            return res.status(500).json({ success: false, message: "Failed to create PayPal order. Try again later." });
        }

        //  Extract Approval URL
        const approvalUrl = response.result.links.find((link) => link.rel === "approve")?.href;
        if (!approvalUrl) {
            return res.status(500).json({ success: false, message: "Approval URL not found. Try again later." });
        }

        //  Send Success Response with Approval URL
        res.status(200).json({ success: true, approvalUrl, orderId: response.result.id });

    } catch (error) {
        console.error("Error creating PayPal order:", error);
        res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
    }
};


// Handle PayPal Payment Success
const AddFundssSuccess = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { token } = req.query;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User not authenticated." });
        }

        if (!token) {
            return res.status(400).json({ success: false, message: "Invalid payment data." });
        }

        // Capture Payment
        const captureRequest = new paypal.orders.OrdersCaptureRequest(token);
        captureRequest.requestBody({});
        const captureResponse = await client.execute(captureRequest);

        // Verify if Payment was Completed
        if (!captureResponse.result || captureResponse.result.status !== "COMPLETED") {
            return res.status(400).json({ success: false, message: "Payment not completed." });
        }


        // Extract Payment Amount
        const amount = parseFloat(captureResponse.result.purchase_units[0].payments.captures[0].amount.value);

        // Update User Wallet 
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $inc: { 'wallet.depositAmount': amount, 'wallet.totalMoney': amount } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Send Response
        res.status(200).json({ success: true, message: "Payment successful, funds added!", wallet: updatedUser.wallet });

    } catch (error) {
        if (error.statusCode === 422 && error.message.includes("ORDER_ALREADY_CAPTURED")) {
            return res.status(400).json({ success: false, message: "Payment already captured." });
        }
        console.error("Error completing PayPal payment:", error);
        res.status(500).json({ success: false, message: "Error processing payment. Please try again." });
    }
};




// POST: Withdraw Funds
const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const Withdrawal = async (req, res) => {
    try {
        const { amount, paypalID, age } = req.body;
        const userId = req.user.id;
        console.log(age);

        //  Validate Withdrawal Amount
        if (!Number.isFinite(amount) || amount < 50) {
            return res.status(400).json({ success: false, message: 'Invalid withdrawal amount. Minimum withdrawal amount is $50' });
        }
        if (amount > 10000) {
            return res.status(400).json({ message: 'Maximum withdrawal amount is $10,000.' });
        }
        if (!isValidEmail(paypalID)) {
            return res.status(400).json({ success: false, message: 'Invalid PayPal email.' });
        }

        //  Fetch User Wallet
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        //  Check Available Balance
        if (user.wallet.withdrawableAmount + user.wallet.winningAmount < amount) {
            return res.status(400).json({ success: false, message: 'Insufficient funds for withdrawal.' });
        }

        //  Deduct Funds in Correct Order (Winning Amount First)
        let remainingAmount = amount;
        let updateFields = {};

        if (user.wallet.winningAmount >= remainingAmount) {
            updateFields['wallet.winningAmount'] = -remainingAmount;
            remainingAmount = 0;
        } else {
            remainingAmount -= user.wallet.winningAmount;
            updateFields['wallet.winningAmount'] = -user.wallet.winningAmount;
        }

        if (remainingAmount > 0) {
            updateFields['wallet.withdrawableAmount'] = -remainingAmount;
        }

        updateFields['wallet.totalMoney'] = -amount;

        //  Make PayPal Payout Request (Before Deducting Money)
        const payoutRequest = new paypal.payouts.PayoutsPostRequest();
        payoutRequest.requestBody({
            sender_batch_header: { email_subject: 'Payout from our platform' },
            items: [{ recipient_type: 'EMAIL', amount: { value: amount.toFixed(2), currency: 'USD' }, receiver: paypalID }],
        });

        const payoutResponse = await client.execute(payoutRequest);

        //  If PayPal Payout is Successful, Deduct Funds
        if (payoutResponse && payoutResponse.statusCode === 201) {
            await User.findByIdAndUpdate(userId, { $inc: updateFields });

            //  Store Withdrawal Request
            await WithdrawalRequest.create({ userId, requestedAmount: amount, paypalID, age, status: 'Completed' });

            return res.status(200).json({ success: true, message: 'Withdrawal successful! Funds will be transferred shortly.' });
        } else {
            return res.status(500).json({ success: false, message: 'Payout failed. Try again later.' });
        }

    } catch (error) {
        console.error('Error processing withdrawal:', error);
        return res.status(500).json({ success: false, message: 'Error processing withdrawal. Please try again.' });
    }
};

module.exports = { WalletPage, AddFunds, AddFundssSuccess, Withdrawal };
