const {z}=require('zod');

const loginSchema=z.object({
    email:z
    .string({required_error:"email is required"}).trim()
    .email({message:"invalid email address"})
    .min(3,{message:"email must be of atleast 3 characters"})
    .max(255,{message:"email must not be moreb than 255 characters"}),

    password:z
    .string({required_error:"password is required"}).trim()
    
    .min(7,{message:"password must be of atleast 6 character"})
    .max(1024,{message:"password can't be greater than 1024 characters"}),


})

const signupSchema=loginSchema.extend({
    username:z
    .string({required_error:"name is required"}).trim()
   
    .min(3,{message:"name must be of atleast 3 characters"})
    .max(255,{message:"name must not be moreb than 255 characters"}),

    email:z
    .string({required_error:"email is required"}).trim()
    .email({message:"invalid email address"})
    .min(3,{message:"email must be of atleast 3 characters"})
    .max(255,{message:"email must not be moreb than 255 characters"}),

    phone:z
    .string({required_error:"phone is required"}).trim().min(10,{message:"phone must be of atleast 10 characters"})
    .max(20,{message:"phone must not be more than 20 characters"}),

    password:z
    .string({required_error:"password is required"}).trim()
    
    .min(7,{message:"password must be of atleast 6 character"})
    .max(1024,{message:"password can't be greater than 1024 characters"}),

   
});

module.exports={signupSchema,loginSchema};