import { Router } from "express"

import { expressRouteAdapter } from "@/presentations/adapters/expressRouterAdapter"
import { loginController } from "@/presentations/controllers/auth/login.controller"
import { registerController } from "@/presentations/controllers/users/register.controller"

const router = Router()

router.post("/signin",
  expressRouteAdapter(loginController)
  /* 
    #swagger.tags = ['User']
    #swagger.summary = 'Realiza o login do usuário'
    #swagger.description = 'Endpoint para autenticar o usuário e retornar um token JWT.'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Login de usuário.',
        schema: {
            username: 'johndoe',
            password: '123456'
        }
    }
    #swagger.responses[200] = {
        description: 'Get a specific user.',
        schema: {
            token: '****',
        }
    } 
    #swagger.responses[401] = {
        description: 'Credenciais inválidas',
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        message: { type: "string", example: "USER_NOT_FOUND" },
                        error: {
                            type: "object",
                            properties: {
                                email: { type: "string", example: "USER_NOT_FOUND" }
                            }
                        }
                    }
                }
            }
        }
    }
  */
)

router.post("/signup",
  expressRouteAdapter(registerController)
  /* 
    #swagger.tags = ['User']
    #swagger.summary = 'Realiza o cadastro do usuário'
    #swagger.description = 'Endpoint para cadastrar o usuário.'
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Add new user.',
        schema: {
          "login": "johndoe",
          "name": "John Doe",
          "sponsor_login": "master",
          "email": "johndoe@gmail.com",
          "phone": "+5599999999999",
          "country_code": "55",
          "country_name": "Brasil",
          "password": "123456789"
        }
    }
    #swagger.responses[200] = {
        description: 'Get a specific user.',
        schema: {
            "status": "success",
            "status_code": 201,
            "message": "Usuário registrado com sucesso",
            "data": {
                "id": 2,
                "name": "John Doe",
                "login": "johndoe",
                "email": "johndoe@gmail.com",
                "phone": "+5599999999999",
                "profile": "user",
                "country_code": "55",
                "country_name": "Brasil",
                "sponsor_id": 1,
            }
        }
    } 
    #swagger.responses[401] = {
        description: 'Credenciais inválidas',
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        message: { type: "string", example: "USER_NOT_FOUND" },
                        error: {
                            type: "object",
                            properties: {
                                email: { type: "string", example: "USER_NOT_FOUND" }
                            }
                        }
                    }
                }
            }
        }
    }
  */
)

router.post("/logout",
  // #swagger.summary = 'Invalidar token do usuário'
  // #swagger.description = 'Cadastro'
  // #swagger.tags = ['Auth']
  (req, res) => { res.json({}) }
)

router.post("/reset-password",
  // #swagger.summary = 'Resetar senha do usuário'
  // #swagger.description = 'Usuário'
  // #swagger.tags = ['Auth']
  (req, res) => { res.json({}) }
)

router.post("/send-email-reset-password",
  // #swagger.summary = 'Enviar email de reset de senha do usuário'
  // #swagger.description = 'Usuário'
  // #swagger.tags = ['Auth']
  (req, res) => { res.json({}) }
)

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

export default router;