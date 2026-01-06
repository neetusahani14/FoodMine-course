import {Router} from 'express';
import expressAsyncHandler from 'express-async-handler';
import { HTTP_STATUS} from '../constants/http_status';
import { OrderModel } from '../models/order.model';
import { OrderStatusEnum } from '../constants/order_status';
import {auth} from '../middlewares/auth.mid';

const router =Router();
router.use(auth)

router.post('/create',
    expressAsyncHandler(async(req:any, res:any)=>
    {
        const requestOrder = req.body;

        if(requestOrder.items.length <= 0){
            res.status(HTTP_STATUS.UNAUTHORIZED).send('Cart is Empty!');
            return;
        }

        await OrderModel.deleteOne({
            user: req.user._id,
            status: OrderStatusEnum.NEW
        });
        const newOrder = new OrderModel({...requestOrder, user:req.user._id});
        await newOrder.save();
        res.send(newOrder);
    })
)

router.get('/newOrderForCurrentUser', async(req:any, res:any)=>
{
    const newOrder = await getNewOrderForCurrentUser(req);
    if(newOrder) res.send(newOrder);
    else res.status(HTTP_STATUS.NOT_FOUND).send('No New Order Found');
})

router.post('/pay',
    expressAsyncHandler(async(req:any, res:any)=>
    {
        const {paymentId} = req.body;
        const order = await getNewOrderForCurrentUser(req);
        if(!order){
            res.status(HTTP_STATUS.NOT_FOUND).send('No New Order Found');
            return;
        }

        order.paymentId = paymentId;
        order.status = OrderStatusEnum.PAYED;
        await order.save();
        res.send(order._id);
    }))

router.get('/track/:id',
    expressAsyncHandler(async(req:any, res:any)=>
    {
        const order = await OrderModel.findById(req.params.id);      
        res.send(order);
    }))
    
export default router;

async function getNewOrderForCurrentUser(req:any) {
    return await OrderModel.findOne({ user:req.user._id, status:OrderStatusEnum.NEW });
    
}

