import mongoose from 'mongoose';

const postSchema = mongoose.Schema({

    id: {
        type: Number,
        required: true
    },
    sender_address: {
        type: String,
        required: true,
    },
    recipient_address: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true
    },
    withdrawn: {
        type: Boolean,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    txHash: {
        type: String,
        required: true
    }
});

const Gifts = mongoose.model("gifts", postSchema);

export default Gifts;