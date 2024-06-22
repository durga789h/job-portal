const express = require('express');
const router = express.Router();
const jobPostController = require('../controllers/jobPostController');

// Route for creating a new job post
router.post('/job-posts', jobPostController.createJobPost);
router.get('/job-posts', jobPostController.getAllJobPosts);


// Route for getting all job posts



module.exports = router;
