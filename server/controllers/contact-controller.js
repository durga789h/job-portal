const Contact=require('../models/contact-model')

const contactForm=async(req,res)=>{
try {
    const response=req.body;
    await Contact.create(response);
    console.log(response)
    return res.status(200).json({message:"message send sucessfully"})
    
} catch (error) {
    return res.status(500).json({message:"message not delivered sucessfully"})
}

}
module.exports=contactForm;