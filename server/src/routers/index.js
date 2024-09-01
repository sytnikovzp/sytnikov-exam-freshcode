const { Router } = require('express');
// ============================
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const contestRouter = require('./contestRouter');
const paymentRouter = require('./paymentRouter');
const chatRouter = require('./chatRouter');

const router = new Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/contest', contestRouter);
router.use('/payment', paymentRouter);
router.use('/chat', chatRouter);

module.exports = router;
