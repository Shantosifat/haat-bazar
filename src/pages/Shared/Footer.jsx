import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-100 text-gray-700 py-8 mt-10 border-t">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo & Website Name */}
        <div className="flex items-center space-x-2">
          <span className="text-3xl">🥦</span>
          <span className="text-xl font-bold text-green-700">কাঁচাবাজার</span>
        </div>

        {/* Contact Details */}
        <div>
          <h4 className="font-semibold mb-2">Contact Us</h4>
          <p>
            Email:{" "}
            <a
              href="mailto:support@kanchabazaar.com"
              className="text-blue-600 hover:underline"
            >
              support@kanchabazaar.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a
              href="tel:+880123456789"
              className="text-blue-600 hover:underline"
            >
              +880 1234 56789
            </a>
          </p>
        </div>

        {/* Links: Terms & Socials */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li>
              <a href="/terms" className="hover:underline text-blue-600">
                📃 Terms & Conditions
              </a>
            </li>
            <li className="flex space-x-4 mt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5 text-blue-600 hover:text-blue-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12a10 10 0 10-11.5 9.87v-6.99H8v-2.88h2.5V9.4c0-2.48 1.48-3.85 3.74-3.85 1.08 0 2.21.2 2.21.2v2.43h-1.25c-1.24 0-1.63.77-1.63 1.56v1.87H17l-.4 2.88h-2.35v6.99A10 10 0 0022 12z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5 text-blue-400 hover:text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.14 9.14 0 01-2.88 1.1A4.52 4.52 0 0011.46 6a12.94 12.94 0 01-9.39-4.75 4.49 4.49 0 001.4 6A4.41 4.41 0 012 6.77v.06a4.51 4.51 0 003.6 4.42 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.21 3.13A9.05 9.05 0 012 19.54a12.79 12.79 0 006.95 2.04c8.34 0 12.9-6.92 12.9-12.92 0-.2 0-.42-.02-.63A9.22 9.22 0 0023 3z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 text-pink-500 hover:text-pink-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm8 1a1 1 0 100 2 1 1 0 000-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} কাঁচাবাজার. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
