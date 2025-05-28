'use client';

import { useEffect, useState } from 'react';
import LogoWrapper from './LogoWrapper'; 

export default function Header() {
  const [header, setHeader] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
  if (isMobileMenuOpen) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
}, [isMobileMenuOpen]);

  useEffect(() => {
    const fetchHeader = async () => {
      const res = await fetch('/api/getHeader');
      const data = await res.json();
      setHeader(data.header);
    };

    fetchHeader();
  }, []);

  if (!header) return null;

  const navigationArray = Object.entries(header)
    .filter(([key]) => key.startsWith('navigation'))
    .map(([_, value], index) => ({
      href: `#section-${index}`,
      label: value,
    }));

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };



  return (
    <header className="z-50 p-4 flex justify-between items-center h-auto absolute top-0 left-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
 <LogoWrapper logoUrl="crystal.logo.png" />

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-white focus:outline-none w-[60px] h-[auto]"
        >
          {isMobileMenuOpen ? (
            <svg
              className="fill-current w-full h-full"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-full h-full fill-current"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <nav
          className={`hidden lg:flex space-x-4 text-sm md:text-base font-medium text-white`}
        >
          {navigationArray.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="hover:bg-[#B8860B] py-2 px-4 rounded-md transition duration-300 text-xl"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* WhatsApp Button */}
        <div className="hidden lg:block">
          <a
            id='whatsapp'
            href={header.bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 font-[--font-playfair]"
          >
            WhatsApp
          </a>
        </div>
      </div>

{isMobileMenuOpen && (
  <>
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      onClick={toggleMobileMenu}
    />


    <div
      className={`fixed top-0 right-0 w-full h-full bg-[#b1777f] z-50 flex flex-col transform transition-transform duration-300 ease-in-out md:hidden`}
      style={{ transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)' }}
    >
      <div className="flex items-center justify-between p-4">

        <LogoWrapper logoUrl="crystal.logo.png" />

        <button
          onClick={toggleMobileMenu}
          className="text-white w-[40px] h-[40px]"
          aria-label="Close mobile menu"
        >
          <svg className="w-full h-full fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <nav className="mt-4 flex flex-col items-center space-y-6 text-white px-6">
        {navigationArray.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            className="block py-2 px-6 hover:bg-[#B8860B] rounded-md transition duration-300 w-full text-center text-xl"
            onClick={toggleMobileMenu}
          >
            {item.label}
          </a>
        ))}

        {header.bookingLink && (
          <a
            href={header.bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-300 w-full text-center text-xl"
            onClick={toggleMobileMenu}
          >
            WhatsApp
          </a>
        )}
      </nav>
    </div>
  </>
)}


    </header>
  );
}