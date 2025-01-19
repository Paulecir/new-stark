import { addBalance } from "../balance/addBalance"
import { approveOrder } from "../order/approveOrder"
import { buyProduct } from "../order/buyProduct"
import { payOrder } from "../order/payOrder"

export const run = async (user) => {
    await addBalance({
        name: "Initial Balance"
        , wallet: "MAIN"
        , user_id: user.id
        , amount: 10
        , ref_type: 'user'
        , ref_id: user.id
        , extra_info: {
        }
    })

    const order = await buyProduct({ items: [{ id: 1, quantity: 1 }] }, user)
    await payOrder({ method: "BALANCE", order_id: order.order_id }, user)
}