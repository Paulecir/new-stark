import { PrismaClient, Prisma as PrismaDefault } from '@prisma/client';


(BigInt.prototype as any).toJSON = function () {
  return Number(this)
};
(PrismaDefault.Decimal.prototype as any).toJSON = function () {
  return Number(this)
};

// Função para "sanitizar" a senha (por exemplo, esconder a senha real)
const sanitize = (password: string) => {
  // Exemplo de sanitização, pode ser modificado conforme necessário
  return password ? '********' : null;
};
// Criação do cliente Prisma com singleton
const Prisma = new PrismaClient()
.$extends({
  query: {
    user: {
      async update({ args, query, operation }: any) {
        if (args.select?.sponsor) {
          if (args.select?.sponsor === true) {
            args.select.sponsor = { omit: { password: true } }
          } else if (!args.select?.sponsor?.select?.password) {
            args.select.sponsor.omit = { password: true }
          }
        }

        if (args.include?.sponsor) {
          if (args.include?.sponsor === true) {
            args.include.sponsor = { omit: { password: true } }
          } else if (!args.include?.sponsor?.select?.password) {
            args.include.sponsor.omit = { password: true }
          }
        }

        const [result] = await Prisma.$transaction([query(args)]) // wrap the query in a batch transaction, and destructure the result to return an array
        return result // return the first result found in the array
      },
      async create({ args, query, operation }: any) {
        if (!args.select?.password) {
          args.omit = { password: true }
        }

        if (args.select?.sponsor) {
          if (args.select?.sponsor === true) {
            args.select.sponsor = { omit: { password: true } }
          } else if (!args.select?.sponsor?.select?.password) {
            args.select.sponsor.omit = { password: true }
          }
        }

        if (args.include?.sponsor) {
          if (args.include?.sponsor === true) {
            args.include.sponsor = { omit: { password: true } }
          } else if (!args.include?.sponsor?.select?.password) {
            args.include.sponsor.omit = { password: true }
          }
        }


        const [result] = await Prisma.$transaction([query(args)]) // wrap the query in a batch transaction, and destructure the result to return an array
        return result // return the first result found in the array
      },
      async updateMany({ args, query, operation }: any) {

        if (args.select?.sponsor) {
          if (args.select?.sponsor === true) {
            args.select.sponsor = { omit: { password: true } }
          } else if (!args.select?.sponsor?.select?.password) {
            args.select.sponsor.omit = { password: true }
          }
        }

        if (args.include?.sponsor) {
          if (args.include?.sponsor === true) {
            args.include.sponsor = { omit: { password: true } }
          } else if (!args.include?.sponsor?.select?.password) {
            args.include.sponsor.omit = { password: true }
          }
        }


        const [result] = await Prisma.$transaction([query(args)]) // wrap the query in a batch transaction, and destructure the result to return an array
        return result // return the first result found in the array
      },
      async findUnique({ args, query, operation }: any) {
        if (!args.select?.password) {
          args.omit = { password: true }
        }

        if (args.select?.sponsor) {
          if (args.select?.sponsor === true) {
            args.select.sponsor = { omit: { password: true } }
          } else if (!args.select?.sponsor?.select?.password) {
            args.select.sponsor.omit = { password: true }
          }
        }

        if (args.include?.sponsor) {
          if (args.include?.sponsor === true) {
            args.include.sponsor = { omit: { password: true } }
          } else if (!args.include?.sponsor?.select?.password) {
            args.include.sponsor.omit = { password: true }
          }
        }


        const [result] = await Prisma.$transaction([query(args)]) // wrap the query in a batch transaction, and destructure the result to return an array
        return result // return the first result found in the array
      },
      async findFirst({ args, query, operation }: any) {
        if (!args.select?.password) {
          args.omit = { password: true }
        }

        if (args.select?.sponsor) {
          if (args.select?.sponsor === true) {
            args.select.sponsor = { omit: { password: true } }
          } else if (!args.select?.sponsor?.select?.password) {
            args.select.sponsor.omit = { password: true }
          }
        }

        if (args.include?.sponsor) {
          if (args.include?.sponsor === true) {
            args.include.sponsor = { omit: { password: true } }
          } else if (!args.include?.sponsor?.select?.password) {
            args.include.sponsor.omit = { password: true }
          }
        }

        const [result] = await Prisma.$transaction([query(args)]) // wrap the query in a batch transaction, and destructure the result to return an array
        return result // return the first result found in the array
      },

      async findMany({ args, query, operation }: any) {
        if (!args.select) {
          args.omit = { password: true }
        }

        if (args.select?.sponsor) {
          if (args.select?.sponsor === true) {
            args.select.sponsor = { omit: { password: true } }
          } else if (!args.select?.sponsor?.select?.password) {
            args.select.sponsor.omit = { password: true }
          }
        }

        if (args.include?.sponsor) {
          if (args.include?.sponsor === true) {
            args.include.sponsor = { omit: { password: true } }
          } else if (!args.include?.sponsor?.select?.password) {
            args.include.sponsor.omit = { password: true }
          }
        }

        const [result] = await Prisma.$transaction([query(args)]) // wrap the query in a batch transaction, and destructure the result to return an array
        return result // return the first result found in the array
      },
    }
  },

});




// .$extends({

//   result: {

//     $allModels: {
//       excludePassword: {
//         compute(model, params) {
//           // Verifica se o modelo é 'User' e se a senha não foi explicitamente solicitada
//           if (params?.model === 'User' && params?.args?.select?.password !== true) {
//             delete model.password; // Exclui o campo 'password' do resultado
//           }
//           return model; // Retorna o modelo após modificação
//         },
//       },
//     },
//   },
// });

export default Prisma;