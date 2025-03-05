import { makeCommission } from "../../src/services/commission/makeCommission"

async function arrumar() {

    for (let i = 0; i < 20; i++) {
        console.log("I", i)
        await makeCommission()
    }
    
}

arrumar()