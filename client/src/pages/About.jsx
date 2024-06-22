import React from 'react';
const jobPortalImage = 'https://www.perceptionsystem.com/wp-content/uploads/2021/02/700_368-1-1.png'; // Import the website image

const About = () => {
    return (
        <div className="about-page p-8 md:p-16"> {/* Added padding for better spacing */}
            <h1 className="text-3xl font-bold mb-4">About Our Job Portal</h1> {/* Adjusted heading size */}
            <p className="mb-4">Welcome to our job portal, where opportunities meet aspirations. Our platform is designed to connect talented individuals with exciting career prospects across various industries.</p>
            <p className="mb-4">At [Your Job Portal Name], we understand the importance of finding the right job. Whether you're a seasoned professional looking for a career change or a recent graduate eager to kickstart your journey, we've got you covered.</p>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2> {/* Adjusted heading size */}
            <p className="mb-4">Our mission is to simplify the job search process by providing a user-friendly platform that empowers both job seekers and employers. We strive to bridge the gap between talent and opportunity, making it easier for companies to find top-notch candidates and for individuals to discover their dream jobs.</p>
            <h2 className="text-2xl font-bold mb-4">What Sets Us Apart</h2> {/* Adjusted heading size */}
            <p className="mb-4">With a focus on innovation and user experience, we offer features that set us apart from other job portals:</p>
            <ul className="mb-4">
                <li>Advanced search filters to narrow down job listings based on your preferences.</li>
                <li>Personalized recommendations based on your skills, experience, and interests.</li>
                <li>Interactive job alerts to keep you updated on new opportunities.</li>
                <li>Easy-to-use interface for both job seekers and employers.</li>
                <li>Dedicated support to assist you throughout your job search journey.</li>
            </ul>
            <h2 className="text-2xl font-bold mb-4">Join Us Today</h2> {/* Adjusted heading size */}
            <p className="mb-8">Whether you're looking to hire top talent or embark on a new career path, we invite you to join our community. Sign up now and unlock a world of possibilities!</p>
            <img src={jobPortalImage} alt="Job Portal Website" className="w-full max-w-xl mx-auto mb-8" /> {/* Added the website image */}
        </div>
    );
}

export default About;
