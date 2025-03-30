import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white pt-5 pb-2 ">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">DIGI shop</h2>
          <p className="text-white mt-2">Bringing innovation to your fingertips.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-gray-300 transition">
            <Facebook className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-gray-300 transition">
            <Twitter className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-gray-300 transition">
            <Instagram className="w-6 h-6" />
          </a>
          <a href="#" className="hover:text-gray-300 transition">
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-3 pt-2 text-center text-sm text-white">
        &copy; {new Date().getFullYear()} BrandName. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
