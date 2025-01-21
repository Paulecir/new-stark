import { createWallet } from "./createWallet";
import { filterWallet } from "./filterWallet";
import { getWalletById } from "./getWalletById";
import { updateWallet } from "./updateWallet";

export const WalletService = {
    createWallet,
    updateWallet,
    filterWallet,
    getWalletById
}
