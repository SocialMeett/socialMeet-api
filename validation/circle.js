import Joi from "joi";  

export const joinCircleValidator = Joi.object({
    name: Joi.string().required(),
    inviteCode: Joi.string().required()

});