import * as yup from 'yup'

export const schema = yup.object().shape({
   
        description: yup.string()
        .nullable(),

        user_id: yup.number(),

        released_by_id: yup.number(),

        amount: yup.number(),

    

});