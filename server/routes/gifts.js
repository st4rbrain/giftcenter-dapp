import express from 'express';
import { getGifts } from '../controllers/gifts.js';
import { postGifts } from '../controllers/gifts.js';
import { getAccountInfo } from '../controllers/gifts.js';
import { setWithdrawnToTrue } from '../controllers/gifts.js';


const router = express.Router();

router.get('/getGifts', getGifts);
router.post('/postGifts', postGifts);
router.post('/accountInfo', getAccountInfo);
router.post('/withdrawn', setWithdrawnToTrue);

export default router;