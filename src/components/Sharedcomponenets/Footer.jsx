import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-sky-950 text-white py-10 mt-30">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold mb-4">JobSite</h2>
          <p className="text-sm text-gray-400">
            Connecting talent with opportunity. Explore jobs, internships, and more.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#">Home</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Internships</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#">Post a Job</a></li>
            <li><a href="#">Hire Talent</a></li>
            <li><a href="#">Career Advice</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500"><Facebook size={20} /></a>
            <a href="#" className="hover:text-blue-400"><Twitter size={20} /></a>
            <a href="#" className="hover:text-pink-500"><Instagram size={20} /></a>
            <a href="#" className="hover:text-blue-700"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 text-center pt-4 text-sm text-gray-500">
        © {new Date().getFullYear()} JobSite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
