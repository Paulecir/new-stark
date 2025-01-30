import Prisma from "@/infra/db/prisma";

export default class Sessions {
  static sessions = {}

  static async get(key) {
    if (this.sessions[key]) {
      return this.sessions[key]
    }

    const session = await Prisma.userSession.findFirst({
      where: {
        access_token: key
      },
    })

    if (!session) return null

    const user = await Prisma.user.findFirst({
      where: {
        id: session.user_id
      }
    })

    if (!user) return null

    const sess = {
      session,
      user
    }

    this.sessions[key] = sess

    return this.sessions[key]; // descomentar para ficar o cache
  }

  static async set(key, user) {

    let sess = await this.get(key)

    if (!sess) {
      const session = await Prisma.userSession.create({
        data: {
          access_token: key,
          user_id: user.id,
          status: user.status,
          latitude: user.latitude,
          longitude: user.longitude
        }
      })

      sess = {
        session,
        user
      }
    }

    this.sessions[key] = Object.assign(
      {},
      this.sessions[key] || {},
      sess
    )
    return this.sessions[key]
  }
}
