import { approveOrder } from "./approveOrder";
import { reproveOrder } from "./reproveOrder";
import { buyProduct } from "./buyProduct";
import { checkAllPaymentPlisio, checkPaymentPlisio } from "./checkPaymentPlision";
import { getOrder } from "./getOrder";
import { myOrderItemsFilter } from "./myOrderItemsFilter";
import { myOrdersFilter } from "./myOrdersFilter";
import { ordersFilter } from "./ordersFilter";
import { payOrder } from "./payOrder";

export const OrderService = {
    buyProduct,
    approveOrder,
    reproveOrder,
    myOrdersFilter,
    ordersFilter,
    myOrderItemsFilter,
    getOrder,
    payOrder,
    checkPaymentPlisio,
    checkAllPaymentPlisio
}
