const User = require('../models/auth-model');
const Contact=require('../models/contact-model')
const JobPost=require('../models/createpost-model')
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, { password: 0 });
        console.log(users);
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "no user found" })
        }
        else {

            res.status(200).json(users)
        }
    } catch (error) {
        next(error)
    }

};
//single user logic
const getUserById=async(req,res,next)=>{
    try {
        const id=req.params.id;
       const data= await User.findOne({_id:id},{password:0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}

//user admin update logic
const updateUserById=async(req,res)=>{
try {
    const id=req.params.id;
    const updateUserData=req.body;
    const updatedData=await User.updateOne({_id:id},{
        $set:updateUserData,
    });
    console.log(updatedData);
    return res.status(200).json( updatedData);
   

} catch (error) {
    next(error);
}
}




//user delete logic
const deleteUserById=async(req,res)=>{
try {
    const id=req.params.id;
    await User.deleteOne({_id:id})
    return res.status(200).json({message:"user deleted successfully"})
    
} catch (error) {
    next(error)
    
}
}

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: "no contacts found" })
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);

    }
}
//admin-contacts delete logic
const deleteContactById=async(req,res)=>{
try {
    const id=req.params.id;
    await Contact.deleteOne({_id:id})
    return res.status(200).json({message:"Contact deleted successfully"})
    
} catch (error) {
    next(error)
    
}
};

const getAllJobPosts = async (req, res) => {
    try {
      const jobPosts = await JobPost.find({});
      res.status(200).json(jobPosts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update a job post
  const updateJobPost = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedJobPost = await JobPost.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedJobPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a job post
  const deleteJobPost = async (req, res) => {
    const { id } = req.params;
    try {
      await JobPost.findByIdAndDelete(id);
      res.status(200).json({ message: "Job post deleted successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const searchJobPosts = async (req, res) => {
    const { searchText } = req.query;
    const { id } = req.params;
    
    try {
      if (id) {
        // If ID is provided, retrieve job post by ID
        const jobPostById = await JobPost.findById(id);
        if (!jobPostById) {
          return res.status(404).json({ message: "Job post not found" });
        }
        return res.status(200).json(jobPostById);
      } else if (searchText) {
        // If searchText is provided, search for job posts by text
        const jobPostsByText = await JobPost.find({ $text: { $search: searchText } });
        if (!jobPostsByText || jobPostsByText.length === 0) {
          return res.status(404).json({ message: "No job posts found matching the search criteria" });
        }
        return res.status(200).json(jobPostsByText);
      } else {
        return res.status(400).json({ message: "Invalid request. Please provide either searchText or id." });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
//admin-contacts delete logic


module.exports = { getAllUsers,deleteUserById,getUserById,updateUserById,getAllContacts,deleteContactById,getAllJobPosts,updateJobPost,deleteJobPost,searchJobPosts}