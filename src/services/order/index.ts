import { approveOrder } from "./approveOrder";
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
    myOrdersFilter,
    ordersFilter,
    myOrderItemsFilter,
    getOrder,
    payOrder,
    checkPaymentPlisio,
    checkAllPaymentPlisio
}
