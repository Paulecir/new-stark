import dotenv from "dotenv"
import moment from "moment-timezone";

dotenv.config()

moment.tz.setDefault("America/Sao_Paulo")

;(async () => {
  const server = await (await import("@/app")).default

  const port = process.env.PORT || 5050
  server.listen(port || 5050, () => {
    console.info(`Server running at http://localhost:${port}`)
  })
})()
