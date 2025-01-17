import { approveOrder } from "./approveOrder";
import { buyProduct } from "./buyProduct";
import { getOrder } from "./getOrder";
import { myOrdersFilter } from "./myOrdersFilter";
import { payOrder } from "./payOrder";

export const OrderService = {
    buyProduct,
    approveOrder,
    myOrdersFilter,
    getOrder,
    payOrder
}
