import Joi from "joi";



export const registerUserValidation = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    friends: Joi.string().required(),
    location: Joi.string().required(),
});


export const  loginUserValidation = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    
});

export const friendRequestValidation = Joi.object({
    senderId: Joi.string().required(),
    receiverId: Joi.string().required(),
    status: Joi.string().valid('pending', 'accepted', 'rejected').required()
});

