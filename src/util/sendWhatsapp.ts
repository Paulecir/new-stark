import axios from "axios"

export const sendWhatsappText = ({ message, number }: any) => {
    axios.post('https://evolution-evolution.833zws.easypanel.host/message/sendText/mandamsg',
        {
            "number": number,
            "options": {
                "delay": 1200,
                "presence": "composing",
                "linkPreview": false
            },
            "textMessage": {
                "text": message
            },
        },
        {
            headers: {
                apikey: 'mx1lrcik5bswlzhzf6ii1'
            }
        }).then(res => {
            // console.log("R", res)
        }).catch(err => {
            // console.log("E", err)
        })
}