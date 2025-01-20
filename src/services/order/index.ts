import { approveOrder } from "./approveOrder";
import { buyProduct } from "./buyProduct";
import { getOrder } from "./getOrder";
import { myOrderItemsFilter } from "./myOrderItemsFilter";
import { myOrdersFilter } from "./myOrdersFilter";
import { payOrder } from "./payOrder";

export const OrderService = {
    buyProduct,
    approveOrder,
    myOrdersFilter,
    myOrderItemsFilter,
    getOrder,
    payOrder
}
