import firstLevelBinary from './seeders/firstLevelBinary.seed'
import secondLevelBinary from './seeders/secondLevelBinary.seed'
import startSeed from './seeders/start.seed'

(async () => {

    await startSeed()
    await firstLevelBinary()
    // await secondLevelBinary()


})()