'use client';

import { useEffect, useState } from 'react';
import { useLoading } from '../contex/LoadingContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

import '@fortawesome/fontawesome-svg-core/styles.css'; // Важно для стилей Font Awesome
import { config } from '@fortawesome/fontawesome-svg-core';
import LogoWrapper from './LogoWrapper'; 
config.autoAddCss = false;

export default function Footer() {
  const [footer, setFooter] = useState(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    fetch('/api/footer')
      .then((res) => res.json())
      .then((data) => setFooter(data.footer))
      .finally(() => setLoading(false));
  }, []);

  if (!footer) {
  return <div>Загрузка...</div>;
}

  const social = footer.social || {};


  return (
<footer className="text-black py-8">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center md:justify-between gap-6">


    <div className="text-center flex flex-col gap-2 w-full md:w-[30%] order-1 md:order-none">
      <p className="text-lg">
        <FontAwesomeIcon icon={faPhone} className="mr-2 text-white" /><a href={`tel:${footer.phone}`} className="text-[#073891] hover:underline">{footer.phone}</a>
      </p>
      <p className="text-sm text-white">{footer.address}</p>
    </div>

    {footer.logoUrl && (
      <div className="order-2 md:order-none">
        {LogoWrapper({ logoUrl: footer.logoUrl })}
      </div>
    )}


    {footer.links?.length > 0 && (
      <div className="flex justify-center space-x-4 mb-6 order-4 md:order-none">
        {footer.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            className="text-sm text-blue-400 hover:underline"
          >
            {link.label}
          </a>
        ))}
      </div>
    )}

    <div className="flex justify-around w-full md:w-[30%] order-3 md:order-none">
      {social.instagram && (
        <a
          href={social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:opacity-75 w-[50px] h-[50px]"
        >
          <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '50px' }} />
        </a>
      )}
      {social.tiktok && (
        <a
          href={social.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:opacity-75 w-[50px] h-[50px]"
        >
          <FontAwesomeIcon icon={faTiktok} style={{ fontSize: '50px' }} />
        </a>
      )}
      {social.whatsapp && (
        <a
          href={social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:opacity-75 w-[50px] h-[50px]"
        >
          <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: '50px' }} />
        </a>
      )}
    </div>
  </div>
</footer>
  );
}