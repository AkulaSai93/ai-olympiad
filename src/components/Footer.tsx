import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const footerBg = '/images/footer-bg.png';
const upgradLogo = '/images/upgrad-logo.png';

const SOCIALS = [
  { Icon: Facebook, label: 'Facebook', href: '#' },
  { Icon: Instagram, label: 'Instagram', href: '#' },
  { Icon: Linkedin, label: 'LinkedIn', href: '#' },
  { Icon: Twitter, label: 'X (Twitter)', href: '#' },
];

const LEGAL_LINKS = ['Terms & Conditions', 'Privacy Policy', 'Contact'];

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full overflow-hidden min-h-[420px] sm:min-h-[500px] lg:min-h-[599px]">
      <img
        src={footerBg}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative w-full px-6 sm:px-10 lg:px-[120px] pt-12 sm:pt-16 lg:pt-[74px] pb-8 sm:pb-10 flex flex-col gap-10 sm:gap-12 lg:gap-[50px] items-center">
        <div className="flex flex-col gap-6 sm:gap-7 items-center">
          <img
            src={upgradLogo}
            alt="upGrad School of Technology"
            loading="lazy"
            decoding="async"
            className="h-10 sm:h-12 lg:h-[51.25px] w-auto"
          />

          <div className="flex gap-4 sm:gap-6 items-center">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex items-center justify-center bg-[#e7000b] rounded size-8 sm:size-9 lg:size-10 hover:bg-red-700 transition-colors"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 items-start w-full">
          <div className="w-full h-px bg-[#0a0a0b]/15" />

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-between w-full">
            <p className="font-grotesque font-medium text-sm sm:text-base lg:text-xl text-[#0a0a0b] text-center sm:text-left">
              © 2025 Techiora Labs Private Limited. All rights reserved.
            </p>

            <div className="flex gap-3 sm:gap-3 items-center">
              {LEGAL_LINKS.map((link, i) => (
                <React.Fragment key={link}>
                  {i > 0 && <span className="w-px h-4 sm:h-5 bg-[#0a0a0b]/30" />}
                  <a
                    href="#"
                    className="font-grotesque font-medium text-sm sm:text-base lg:text-xl text-[#0a0a0b] hover:text-[#e7000b] whitespace-nowrap transition-colors"
                  >
                    {link}
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
