import Prisma from "../../src/infra/db/prisma";
import { decBalance } from "../../src/services/balance/decBalance";

const correcoes = [
    {
        "id": 4758,
        "name": "Andres galán gragera",
        "email": "agalangrajera@gmail.com",
        "login": "capricornio58",
        "pontos_pago": "695,00",
        "pontos_correcao": "605,00",
        "saldo": "-850,08",
        "desconto_no_saldo": "-9,00",
        "total": "-859,08",
        "lado": "direita"
    },
    {
        "id": 5017,
        "name": "Alejandro Oscar Buenahora Moral",
        "email": "alexbhinternacional@gmail.com",
        "login": "alexbh",
        "pontos_pago": "2.800,00",
        "pontos_correcao": "1.405,00",
        "saldo": "9,36",
        "desconto_no_saldo": "-139,50",
        "total": "-130,14",
        "lado": "direita"
    },
    {
        "id": 5003,
        "name": "ENELIO CARVAJAL REYES",
        "email": "eneliocarbajal@yahoo.es",
        "login": "hierbas66",
        "pontos_pago": "540,00",
        "pontos_correcao": "120,00",
        "saldo": "1,29",
        "desconto_no_saldo": "-42,00",
        "total": "-40,71",
        "lado": "direita"
    },
    {
        "id": 7005,
        "name": "MELISSA GONZALEZ",
        "email": "mimigc08@gmail.com",
        "login": "mimigc08",
        "pontos_pago": "510,00",
        "pontos_correcao": "75,00",
        "saldo": "11,63",
        "desconto_no_saldo": "-43,50",
        "total": "-31,88",
        "lado": "direita"
    },
    {
        "id": 5042,
        "name": "Franco Alejandro Buenahora Gorro",
        "email": "franbh1live@gmail.com",
        "login": "franbh",
        "pontos_pago": "305,00",
        "pontos_correcao": "105,00",
        "saldo": "0,88",
        "desconto_no_saldo": "-20,00",
        "total": "-19,12",
        "lado": "direita"
    },
    {
        "id": 5036,
        "name": "Enelio Alejandro Carvajal Ruiz",
        "email": "trustinvestingenelio94@gmail.com",
        "login": "delfin94",
        "pontos_pago": "240,00",
        "pontos_correcao": "45,00",
        "saldo": "2,93",
        "desconto_no_saldo": "-19,50",
        "total": "-16,57",
        "lado": "direita"
    },
    {
        "id": 6974,
        "name": "Denis Jiron",
        "email": "jiron1864@gmail.com",
        "login": "djiron",
        "pontos_pago": "205,00",
        "pontos_correcao": "15,00",
        "saldo": "8,86",
        "desconto_no_saldo": "-19,00",
        "total": "-10,14",
        "lado": "direita"
    },
    {
        "id": 7100,
        "name": "Aracelis Flores",
        "email": "stefvic0919@gmail.com",
        "login": "shely08",
        "pontos_pago": "75,00",
        "pontos_correcao": "30,00",
        "saldo": "1,29",
        "desconto_no_saldo": "-4,50",
        "total": "-3,22",
        "lado": "direita"
    },
    {
        "id": 4417,
        "name": "Mayelyn Alemán Oses",
        "email": "mayelynaleman@gmail.com",
        "login": "mao",
        "pontos_pago": "2.530,00",
        "pontos_correcao": "2.485,00",
        "saldo": "1,36",
        "desconto_no_saldo": "-4,50",
        "total": "-3,14",
        "lado": "esquerda"
    },
    {
        "id": 5256,
        "name": "Leticia Lina Sanchez  Alvarez",
        "email": "leticiasa230956@gmail.com",
        "login": "leticiasa",
        "pontos_pago": "75,00",
        "pontos_correcao": "30,00",
        "saldo": "2,00",
        "desconto_no_saldo": "-4,50",
        "total": "-2,50",
        "lado": "direita"
    },
    {
        "id": 2282,
        "name": "ROSA VIRGINIA GóMEZ DE SALAZAR",
        "email": "virginiagomezromero@yahoo.es",
        "login": "Rosago",
        "pontos_pago": "405,00",
        "pontos_correcao": "30,00",
        "saldo": "36,77",
        "desconto_no_saldo": "-37,50",
        "total": "-0,73",
        "lado": "direita"
    },
    {
        "id": 7027,
        "name": "Magali Alicia Seferlis Rubino",
        "email": "mseferlis@hotmail.com",
        "login": "maggy29",
        "pontos_pago": "105,00",
        "pontos_correcao": "60,00",
        "saldo": "4,03",
        "desconto_no_saldo": "-4,50",
        "total": "-0,47",
        "lado": "esquerda"
    },
    {
        "id": 5095,
        "name": "odalys carvajal reyes",
        "email": "odalystrustinvesting@gmail.com",
        "login": "odalys64",
        "pontos_pago": "105,00",
        "pontos_correcao": "15,00",
        "saldo": "9,40",
        "desconto_no_saldo": "-9,00",
        "total": "0,40",
        "lado": "direita"
    },
    {
        "id": 5204,
        "name": "Mijail Martínez Hernández",
        "email": "mijailmh82@gmail.com",
        "login": "mijailmh",
        "pontos_pago": "375,00",
        "pontos_correcao": "75,00",
        "saldo": "30,44",
        "desconto_no_saldo": "-30,00",
        "total": "0,44",
        "lado": "direita"
    },
    {
        "id": 5108,
        "name": "hector antonio benavides lopez",
        "email": "cubanplayer5@gmail.com",
        "login": "hector63",
        "pontos_pago": "90,00",
        "pontos_correcao": "45,00",
        "saldo": "5,87",
        "desconto_no_saldo": "-4,50",
        "total": "1,37",
        "lado": "direita"
    },
    {
        "id": 6821,
        "name": "Hihn  Liliana  Maria",
        "email": "hihnliliana@gmail.com",
        "login": "liliana26",
        "pontos_pago": "30,00",
        "pontos_correcao": "15,00",
        "saldo": "3,07",
        "desconto_no_saldo": "-1,50",
        "total": "1,57",
        "lado": "direita"
    },
    {
        "id": 5013,
        "name": "MARISOL PEREZ INOJOSA",
        "email": "manuysol83@gmail.com",
        "login": "caoba3",
        "pontos_pago": "105,00",
        "pontos_correcao": "15,00",
        "saldo": "12,25",
        "desconto_no_saldo": "-9,00",
        "total": "3,25",
        "lado": "direita"
    },
    {
        "id": 4633,
        "name": "YAMIR PADRON CORRALES",
        "email": "padronyamir22@gmail.com",
        "login": "yamirsky",
        "pontos_pago": "150,00",
        "pontos_correcao": "15,00",
        "saldo": "17,11",
        "desconto_no_saldo": "-13,50",
        "total": "3,61",
        "lado": "direita"
    },
    {
        "id": 6796,
        "name": "Dayanis  Serrano Ferrales",
        "email": "dayanis.sf89@gmail.com",
        "login": "dayanis.sf89",
        "pontos_pago": "60,00",
        "pontos_correcao": "15,00",
        "saldo": "8,15",
        "desconto_no_saldo": "-4,50",
        "total": "3,65",
        "lado": "direita"
    },
    {
        "id": 2423,
        "name": "HELDA CALVO PADRóN",
        "email": "calvohelda1976@gmail.com",
        "login": "Heldac",
        "pontos_pago": "150,00",
        "pontos_correcao": "15,00",
        "saldo": "17,24",
        "desconto_no_saldo": "-13,50",
        "total": "3,74",
        "lado": "direita"
    },
    {
        "id": 7130,
        "name": "Ramiro Gifi",
        "email": "rama-rikotero@hotmail.com",
        "login": "rg2024",
        "pontos_pago": "380,00",
        "pontos_correcao": "15,00",
        "saldo": "40,48",
        "desconto_no_saldo": "-36,50",
        "total": "3,98",
        "lado": "direita"
    },
    {
        "id": 4536,
        "name": "Paulo Roberto",
        "email": "pauloibiraaguas@gmail.com",
        "login": "pauloibira",
        "pontos_pago": "45,00",
        "pontos_correcao": "15,00",
        "saldo": "7,61",
        "desconto_no_saldo": "-3,00",
        "total": "4,61",
        "lado": "direita"
    },
    {
        "id": 2487,
        "name": "CAROLINA DEL PIANI",
        "email": "carolinavinadelpiani@gmail.com",
        "login": "Carolina",
        "pontos_pago": "120,00",
        "pontos_correcao": "15,00",
        "saldo": "15,36",
        "desconto_no_saldo": "-10,50",
        "total": "4,86",
        "lado": "direita"
    },
    {
        "id": 7041,
        "name": "Xiomara Esther Seferlis",
        "email": "xseferlis85@hotmail.com",
        "login": "xiomy0210",
        "pontos_pago": "30,00",
        "pontos_correcao": "15,00",
        "saldo": "7,47",
        "desconto_no_saldo": "-1,50",
        "total": "5,97",
        "lado": "direita"
    },
    {
        "id": 2949,
        "name": "DAYANA RUIZ",
        "email": "dayanaruiz.1602@gmail.com",
        "login": "Dayaruiz16",
        "pontos_pago": "75,00",
        "pontos_correcao": "15,00",
        "saldo": "12,25",
        "desconto_no_saldo": "-6,00",
        "total": "6,25",
        "lado": "direita"
    },
    {
        "id": 6355,
        "name": "Noslen Vigó López",
        "email": "noslenvigolopez@gmail.com",
        "login": "nkvigo",
        "pontos_pago": "395,00",
        "pontos_correcao": "60,00",
        "saldo": "39,84",
        "desconto_no_saldo": "-33,50",
        "total": "6,34",
        "lado": "direita"
    },
    {
        "id": 4149,
        "name": "HORACIO LOPEZ",
        "email": "ramirogiffi@gmail.com",
        "login": "HoracioLopez",
        "pontos_pago": "575,00",
        "pontos_correcao": "60,00",
        "saldo": "58,13",
        "desconto_no_saldo": "-51,50",
        "total": "6,63",
        "lado": "direita"
    },
    {
        "id": 1983,
        "name": "FRANKLIN JESUS GRANADO HERNANDEZ",
        "email": "franklingranado@hotmail.com",
        "login": "master",
        "pontos_pago": "180,00",
        "pontos_correcao": "30,00",
        "saldo": "23,40",
        "desconto_no_saldo": "-15,00",
        "total": "8,40",
        "lado": "direita"
    },
    {
        "id": 4777,
        "name": "Mileidy Sanchez Perez",
        "email": "danimily@yahoo.es",
        "login": "milly77",
        "pontos_pago": "505,00",
        "pontos_correcao": "60,00",
        "saldo": "53,67",
        "desconto_no_saldo": "-44,50",
        "total": "9,17",
        "lado": "direita"
    },
    {
        "id": 5228,
        "name": "Yanisleidy Acosta Mesa",
        "email": "yanitaacosta88@gmail.com",
        "login": "yanita",
        "pontos_pago": "560,00",
        "pontos_correcao": "60,00",
        "saldo": "59,94",
        "desconto_no_saldo": "-50,00",
        "total": "9,94",
        "lado": "direita"
    },
    {
        "id": 5516,
        "name": "Gladys Rodriguez Perez",
        "email": "gladytarp@gmail.com",
        "login": "gladysrp",
        "pontos_pago": "45,00",
        "pontos_correcao": "15,00",
        "saldo": "13,46",
        "desconto_no_saldo": "-3,00",
        "total": "10,46",
        "lado": "direita"
    },
    {
        "id": 5043,
        "name": "Pablo Camellon Carballoso",
        "email": "pablocamellon@gmail.com",
        "login": "pablocc",
        "pontos_pago": "315,00",
        "pontos_correcao": "105,00",
        "saldo": "32,06",
        "desconto_no_saldo": "-21,00",
        "total": "11,06",
        "lado": "direita"
    },
    {
        "id": 4570,
        "name": "Luisa Moreira",
        "email": "luisa.moreira2013@gmail.com",
        "login": "luisar",
        "pontos_pago": "75,00",
        "pontos_correcao": "45,00",
        "saldo": "14,86",
        "desconto_no_saldo": "-3,00",
        "total": "11,86",
        "lado": "direita"
    },
    {
        "id": 5192,
        "name": "Dairo Blanco Guevara",
        "email": "dairobg@gmail.com",
        "login": "dairobg",
        "pontos_pago": "890,00",
        "pontos_correcao": "120,00",
        "saldo": "89,02",
        "desconto_no_saldo": "-77,00",
        "total": "12,02",
        "lado": "direita"
    },
    {
        "id": 7384,
        "name": "Mirielys Avila Leyva",
        "email": "mirielysal87@gmail.com",
        "login": "mirielysal87",
        "pontos_pago": "120,00",
        "pontos_correcao": "30,00",
        "saldo": "21,88",
        "desconto_no_saldo": "-9,00",
        "total": "12,88",
        "lado": "direita"
    },
    {
        "id": 4620,
        "name": "Patrycja",
        "email": "patrycjairminarosa@gmail.com",
        "login": "patrycja_irmina",
        "pontos_pago": "60,00",
        "pontos_correcao": "30,00",
        "saldo": "24,89",
        "desconto_no_saldo": "-3,00",
        "total": "21,89",
        "lado": "direita"
    },
    {
        "id": 3041,
        "name": "ANDIEL RODRIGUEZ VILLAR",
        "email": "andielrodrigues205@gmail.com",
        "login": "AndiCoD",
        "pontos_pago": "30,00",
        "pontos_correcao": "15,00",
        "saldo": "27,00",
        "desconto_no_saldo": "-1,50",
        "total": "25,50",
        "lado": "direita"
    },
    {
        "id": 4615,
        "name": "Marek Kwasniak",
        "email": "emkwa1@gmail.com",
        "login": "emkwa",
        "pontos_pago": "825,00",
        "pontos_correcao": "150,00",
        "saldo": "94,39",
        "desconto_no_saldo": "-67,50",
        "total": "26,89",
        "lado": "direita"
    },
    {
        "id": 5019,
        "name": "Pieter Maurice Lieven Renard",
        "email": "foxkeluna86@gmail.com",
        "login": "pieterke",
        "pontos_pago": "495,00",
        "pontos_correcao": "260,00",
        "saldo": "54,05",
        "desconto_no_saldo": "-23,50",
        "total": "30,55",
        "lado": "direita"
    },
    {
        "id": 5208,
        "name": "MARISOL MAMANI LAZARTE",
        "email": "evangelistaandresgalan@gmail.com",
        "login": "mminversiones",
        "pontos_pago": "30,00",
        "pontos_correcao": "15,00",
        "saldo": "36,32",
        "desconto_no_saldo": "-1,50",
        "total": "34,82",
        "lado": "direita"
    },
    {
        "id": 6234,
        "name": "Mirosław Wantoch Rekowski",
        "email": "biznesowemoje@gmail.com",
        "login": "sonik",
        "pontos_pago": "90,00",
        "pontos_correcao": "45,00",
        "saldo": "48,17",
        "desconto_no_saldo": "-4,50",
        "total": "43,67",
        "lado": "direita"
    },
    {
        "id": 5143,
        "name": "Marisol Durand Abregu",
        "email": "infinitabundancia.a@gmail.com",
        "login": "albaluz",
        "pontos_pago": "590,00",
        "pontos_correcao": "500,00",
        "saldo": "72,30",
        "desconto_no_saldo": "-9,00",
        "total": "63,30",
        "lado": "esquerda"
    },
    {
        "id": 2339,
        "name": "OCTAVIO MOREIRA",
        "email": "8tavio1963@gmail.com",
        "login": "8vio63",
        "pontos_pago": "240,00",
        "pontos_correcao": "15,00",
        "saldo": "96,40",
        "desconto_no_saldo": "-22,50",
        "total": "73,90",
        "lado": "direita"
    },
    {
        "id": 2369,
        "name": "JOAN MICHEL ZERQUERA MORALES",
        "email": "joanmichelzequera@gmail.com",
        "login": "Comando",
        "pontos_pago": "670,00",
        "pontos_correcao": "15,00",
        "saldo": "169,00",
        "desconto_no_saldo": "-65,50",
        "total": "103,50",
        "lado": "direita"
    },
    {
        "id": 4542,
        "name": "Lazaro Gallardo",
        "email": "lazarogallardo1964@gmail.com",
        "login": "maylac",
        "pontos_pago": "1.145,00",
        "pontos_correcao": "160,00",
        "saldo": "211,64",
        "desconto_no_saldo": "-98,50",
        "total": "113,14",
        "lado": "direita"
    },
    {
        "id": 2009,
        "name": "MARíA ROSA LIENDO",
        "email": "bittrade.maria@gmail.com",
        "login": "florrosa1",
        "pontos_pago": "695,00",
        "pontos_correcao": "545,00",
        "saldo": "198,36",
        "desconto_no_saldo": "-15,00",
        "total": "183,36",
        "lado": "direita"
    },
    {
        "id": 2565,
        "name": "LUIS ALBERTO BAHIA",
        "email": "bahialuisalberto@gmail.com",
        "login": "LuisBahia",
        "pontos_pago": "630,00",
        "pontos_correcao": "375,00",
        "saldo": "210,20",
        "desconto_no_saldo": "-25,50",
        "total": "184,70",
        "lado": "direita"
    },
    {
        "id": 1980,
        "name": "CHRISTOPHER DE AGRELA",
        "email": "cryptodas2021@gmail.com",
        "login": "Cryptodas",
        "pontos_pago": "7.360,00",
        "pontos_correcao": "1.925,00",
        "saldo": "819,70",
        "desconto_no_saldo": "-543,50",
        "total": "276,20",
        "lado": "direita"
    },
    {
        "id": 1974,
        "name": "EDUARDO DUARTE GALVãO",
        "email": "eduardoduartegalvao@gmail.com",
        "login": "eduleao",
        "pontos_pago": "2.940,00",
        "pontos_correcao": "165,00",
        "saldo": "675,62",
        "desconto_no_saldo": "-277,50",
        "total": "398,12",
        "lado": "direita"
    },
    {
        "id": 1998,
        "name": "RAFAEL FEDERICO DE LA PUENTE",
        "email": "raffa.delapuente@gmail.com",
        "login": "registro",
        "pontos_pago": "6.915,00",
        "pontos_correcao": "1.130,00",
        "saldo": "2.739,53",
        "desconto_no_saldo": "-578,50",
        "total": "2.161,03",
        "lado": "direita"
    },
    {
        "id": 4601,
        "name": "Daniel",
        "email": "danieljuliatimm@me.com",
        "login": "julia_timm",
        "pontos_pago": "2.510,00",
        "pontos_correcao": "1.795,00",
        "saldo": "2.854,41",
        "desconto_no_saldo": "-71,50",
        "total": "2.782,91",
        "lado": "direita"
    },
    {
        "id": 1973,
        "name": "FABIANO LORITE",
        "email": "fabianolorite@gmail.com",
        "login": "Fabiano",
        "pontos_pago": "34.495,00",
        "pontos_correcao": "10.625,00",
        "saldo": "37.690,27",
        "desconto_no_saldo": "-2.387,00",
        "total": "35.303,27",
        "lado": "direita"
    }
]

async function arrumar() {

    let negativo = []


    await Prisma.$transaction(async (Prisma) => {  
        await Prisma.$queryRaw`DELETE FROM balance_history WHERE name = 'Corrección binario'`
        for (const correcao of correcoes) {
            const diference = parseFloat(correcao.desconto_no_saldo.replace('.', '').replace(',', '.')) * -1

            const history =  await decBalance({
                name: "Corrección binario"
                , wallet: "MAIN"
                , user_id: correcao.id
                , amount: diference
                , ref_type: 'correcion'
                , ref_id: 0
                , extra_info: correcao
            }, Prisma, true)

            console.log("D", diference)
            
        }

    }, {
        timeout: 1000000,
        maxWait: 1000000
    } )
  
}

arrumar()