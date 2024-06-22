const JobPost = require('../models/createpost-model');


// Create a new job post
exports.createJobPost = async (req, res) => {
  try {
    const newJobPost = new JobPost(req.body);
    await newJobPost.save();
    res.status(201).json(newJobPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports. getAllJobPosts = async (req, res) => {
  try {
    const jobPosts = await JobPost.find({});
    res.status(200).json(jobPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get all job posts
