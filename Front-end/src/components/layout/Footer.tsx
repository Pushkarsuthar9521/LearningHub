import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Twitter, Instagram, Facebook, Github as GitHub } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">LearnHub</span>
            </div>
            <p className="text-gray-400 text-sm">
              An AI-powered platform for interactive learning through blogs and quizzes.
              Expand your knowledge and test your understanding in one place.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <GitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          {/* Blog Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Blog</h3>
            <ul className="space-y-2">
              <li><Link to="/blog/latest" className="text-gray-400 hover:text-white transition-colors">Latest Articles</Link></li>
              <li><Link to="/blog/popular" className="text-gray-400 hover:text-white transition-colors">Popular Posts</Link></li>
              <li><Link to="/blog/categories" className="text-gray-400 hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/blog/authors" className="text-gray-400 hover:text-white transition-colors">Authors</Link></li>
            </ul>
          </div>

          {/* Quiz Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quizzes</h3>
            <ul className="space-y-2">
              <li><Link to="/quizzes/featured" className="text-gray-400 hover:text-white transition-colors">Featured Quizzes</Link></li>
              <li><Link to="/quizzes/popular" className="text-gray-400 hover:text-white transition-colors">Most Popular</Link></li>
              <li><Link to="/quizzes/categories" className="text-gray-400 hover:text-white transition-colors">Browse by Category</Link></li>
              <li><Link to="/quizzes/create" className="text-gray-400 hover:text-white transition-colors">Create a Quiz</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} LearnHub. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <ul className="flex space-x-6">
              <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</Link></li>
              <li><Link to="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;