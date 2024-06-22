const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
  jobTitle: String,
  companyName: String,
  minPrice: String,
  maxPrice: String,
  salaryType: String,
  jobLocation: String,
  postingDate: Date,
  experienceLevel: String,
  requiredSkills: [String],
  companyLogo: String,
  employmentType: String,
  description: String,
  postedBy: String
});

const JobPost = mongoose.model('JobPost', jobPostSchema);

module.exports = JobPost;
