import { Link } from 'react-router-dom';
import { MapPin, Phone, Envelope } from '@phosphor-icons/react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Our Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Projects', path: '/projects' },
    { name: 'Team', path: '/team' },
    { name: 'Subsidiary', path: '/subsidiary' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    { name: 'Environmental Impact Assessment', path: '/services' },
    { name: 'Social Impact Assessment', path: '/services' },
    { name: 'Permits & Licenses', path: '/services' },
    { name: 'CSR Development', path: '/services' },
    { name: 'Capacity Building', path: '/services' },
    { name: 'Earth Engineering', path: '/subsidiary' },
  ];

  return (
    <footer className="footer-dark relative overflow-hidden" data-testid="main-footer">
      <div className="absolute inset-0 hero-pattern opacity-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="container-custom py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src="/images/logo.jpg" alt="GreenDev Associates" className="h-12 w-auto" />
              <div>
                <span className="font-outfit font-bold text-xl text-white">GreenDev</span>
                <span className="font-outfit text-xs text-emerald-300 block -mt-1">Associates International</span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Leading sustainable solutions for environmental and engineering excellence across Africa.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-outfit font-bold text-white mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-emerald-200 hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-outfit font-bold text-white mb-6 text-lg">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    to={service.path} 
                    className="text-emerald-200 hover:text-amber-400 transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-outfit font-bold text-white mb-6 text-lg">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/1H5eaytKuupV6yv16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-200 text-sm hover:text-amber-400 transition-colors"
                >
                  Zees Plaza, 6th Street,<br />
                  Dawhenya, Tema Comm 25,<br />
                  Ghana
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400" />
                <div className="text-emerald-200 text-sm space-y-1">
                  <a href="tel:+233247197014" className="block hover:text-amber-400">
                    +233 (0) 247 197 014
                  </a>
                  <a href="tel:+233266984364" className="block hover:text-amber-400">
                    +233 (0) 266 984 364
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Envelope className="w-5 h-5 text-amber-400" />
                <a href="mailto:greendev.associates@gmail.com" className="text-emerald-200 hover:text-amber-400 text-sm">
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
