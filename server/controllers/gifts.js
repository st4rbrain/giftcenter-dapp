import Gifts from "../models/postGift.js";


export const getGifts = async (req, res) => {
    try {
        const gifts = await Gifts.find().sort({createdAt: -1});
        const topGifts = await Gifts.find().sort({amount: -1, createdAt: -1}).limit(5);
        res.json([gifts, topGifts]);
    } catch(e) {
        res.json({message: e.message});
    }
}

export const postGifts = async (req, res) => {
    const gift = req.body;
    const newGift = new Gifts(gift);
    Gifts.find({id: req.body.id, token: req.body.token}, async (err, docs) => {
        if (!docs.length) {
            try {
                await newGift.save();
                res.json(newGift);
            } catch(e) {
                res.json({message: e.message});
            }
        } else {
            console.log("Already exists");
        }
    })
}

export const getAccountInfo = async(req, res) => {
    const account = req.body.address
    try {
        const sentGifts = await Gifts.find({sender_address: account}).sort({createdAt: -1});
        const receivedGifts = await Gifts.find({recipient_address: account}).sort({createdAt: -1});
        res.json([sentGifts, receivedGifts]);
    } catch(e) {
        res.json({message: e.message});
    }
}

export const setWithdrawnToTrue = async(req, res) => {
    Gifts.find({recipient_address: req.body.recipient, withdrawn: false, token: req.body.token}, async(err, docs) => {
        if(docs.length) {
            try {
                await Gifts.updateMany({recipient_address: req.body.recipient, withdrawn: false, token: req.body.token}, {$set: {withdrawn: true}}, (err, success) => {
                    if (err) console.log(err)
                    else res.json({message: "document updated"});
                })
            } catch(e) {
            }
        } else {
            console.log("Already updated")
        }
    })
    
}
