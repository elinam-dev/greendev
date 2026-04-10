import { Link } from 'react-router-dom';
import { 
  Leaf, 
  MapPin, 
  Phone, 
  Envelope, 
  LinkedinLogo, 
  TwitterLogo, 
  FacebookLogo 
} from '@phosphor-icons/react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Projects', path: '/projects' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    { name: 'Environmental Impact Assessment', path: '/services#environmental' },
    { name: 'Social Impact Assessment', path: '/services#environmental' },
    { name: 'Environmental Audits', path: '/services#environmental' },
    { name: 'Water & Sanitation', path: '/services#engineering' },
    { name: 'CSR Development', path: '/services#advisory' },
  ];

  return (
    <footer className="footer-dark" data-testid="main-footer">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white/10 rounded-sm flex items-center justify-center">
                <Leaf className="w-6 h-6 text-[#D4A373]" weight="duotone" />
              </div>
              <div>
                <span className="font-outfit font-bold text-lg text-white">GreenDev</span>
                <span className="font-outfit text-xs text-white/60 block -mt-1">Associates International</span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Leading sustainable solutions for environmental and engineering excellence across Africa.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="LinkedIn">
                <LinkedinLogo className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Twitter">
                <TwitterLogo className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Facebook">
                <FacebookLogo className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-outfit font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-white/70 hover:text-[#D4A373] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-outfit font-semibold text-white mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path} 
                    className="text-white/70 hover:text-[#D4A373] transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-outfit font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4A373] flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm">
                  Zees Plaza, 6th Street,<br />
                  Dawhenya, Tema Comm 25,<br />
                  Ghana
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D4A373]" />
                <div className="text-white/70 text-sm space-y-1">
                  <a href="tel:+233266984364" className="block hover:text-[#D4A373]">
                    +233 (0) 266 984 364
                  </a>
                  <a href="tel:+233247197014" className="block hover:text-[#D4A373]">
                    +233 (0) 247 197 014
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Envelope className="w-5 h-5 text-[#D4A373]" />
                <a href="mailto:greendev.associates@gmail.com" className="text-white/70 hover:text-[#D4A373] text-sm">
                  greendev.associates@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {currentYear} GreenDev Associates International Limited. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-white/50 hover:text-white/70 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/50 hover:text-white/70 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
