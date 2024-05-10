import React from 'react';
import { LinkedFooterPages, TFooterSocialLinks, footerPageLinks, footerSocialLinks } from '@/data/Links/footerLinks';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='w-full h-full bg-black py-10 divide-y-2 text-white flex flex-col gap-10 px-8'>
      <div className="page-links flex sm:flex-row flex-col gap-10 w-full justify-between sm:px-72">
        {footerPageLinks?.map(({ title, links }: LinkedFooterPages) => (
          <div key={title} className=''>
            <h4 className='text-white text-lg font-semibold'>{title}</h4>
            <ul className='mt-6'>
              {links.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className='text-white text-sm'>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex sm:justify-center justify-normal pt-10">CITIES TODO</div>

      <div className="flex flex-col sm:justify-center justify-normal sm:items-center items-start pt-10 gap-4">
        <h2>LOGO TODO</h2>
        <span>Description TODO</span>

        <ul className="flex gap-4 sm:justify-center justify-start ">
          {footerSocialLinks.map(({ Icon, href }: TFooterSocialLinks) => (
            <li>
              <Link href={href}>
                <Icon className='text-white w-5 h-5' />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center items-center pt-10">
        <span>Copyright © 2024 Realestate TODO</span>
      </div>
    </footer>
  );
};

export default Footer;
