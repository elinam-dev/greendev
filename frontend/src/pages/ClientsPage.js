import pumaImg from '../components/image/puma.jpeg';
import devtracoImg from '../components/image/devtraco.jpeg';
import enclaveImg from '../components/image/enclave.jpeg';
import acfImg from '../components/image/acf.jpeg';
import ferroImg from '../components/image/ferro.jpeg';
import vesterImg from '../components/image/vestermills.jpeg';
import iwcImg from '../components/image/international_warehousing.jpeg';
import mbsImg from '../components/image/mbs.jpeg';
import atlanticImg from '../components/image/atlantic.jpeg';
import yantaiImg from '../components/image/yantai.jpeg';
import ampcImg from '../components/image/ampc.jpeg';
import reroyImg from '../components/image/reroy.jpeg';
import westernRodImg from '../components/image/western_rod.jpeg';
import ayaanImg from '../components/image/ayaan.jpeg';
import sentuoImg from '../components/image/sentuo.jpg';
import lmiImg from '../components/image/lmi.jpg';
import saharaImg from '../components/image/sahara.jpg';
import ghanaGasImg from '../components/image/ghana gas.jpg';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

const clientList = [
  { name: 'Sentuo Oil Refinery', initial: 'SO', industry: 'Oil & Gas', logo: sentuoImg },
  { name: 'LMI Holdings', initial: 'LM', industry: 'Built Environment', logo: lmiImg },
  { name: 'Sahara Petroleum Warehouse', initial: 'SP', industry: 'Oil & Gas', logo: saharaImg },
  { name: 'Ghana Gas', initial: 'GG', industry: 'Energy', logo: ghanaGasImg },
  { name: 'Puma Energy Ghana Limited', initial: 'PE', industry: 'Oil & Gas', logo: pumaImg },
  { name: 'Devtraco Limited', initial: 'DT', industry: 'Built Environment', logo: devtracoImg },
  { name: 'Enclave Power Company', initial: 'EP', industry: 'Energy', logo: enclaveImg },
  { name: 'Africa Cement Factory Limited', initial: 'AC', industry: 'Manufacturing', logo: acfImg },
  { name: 'Ghana Steels Limited', initial: 'GS', industry: 'Manufacturing', logo: null },
  { name: 'Ferro Fabrik Limited', initial: 'FF', industry: 'Manufacturing', logo: ferroImg },
  { name: 'Vester Oil Mills Limited', initial: 'VO', industry: 'Agriculture', logo: vesterImg },
  { name: 'International Warehouse Company', initial: 'IW', industry: 'Logistics', logo: iwcImg },
  { name: 'M. Barbisotti and Sons Limited', initial: 'MB', industry: 'Logistics', logo: mbsImg },
  { name: 'Atlantic Quarry Limited', initial: 'AQ', industry: 'Mining', logo: atlanticImg },
  { name: 'Yantai Chemicals Limited', initial: 'YC', industry: 'Manufacturing', logo: yantaiImg },
  { name: 'AMPC International Health Consultants', initial: 'AI', industry: 'Health Services', logo: ampcImg },
  { name: 'Reroy Cables Limited', initial: 'RC', industry: 'Manufacturing', logo: reroyImg },
  { name: 'Western Rod and Wire Limited', initial: 'WR', industry: 'Manufacturing', logo: westernRodImg },
  { name: 'Ayaan Global Ghana Limited', initial: 'AG', industry: 'Manufacturing', logo: ayaanImg },
];

const industryLinks = {
  'Manufacturing': '/industries#manufacturing',
  'Oil & Gas': '/industries#oil-gas',
  'Built Environment': '/industries#built-environment',
  'Mining': '/industries#mining',
  'Agriculture': '/industries#agriculture',
  'Energy': '/industries#energy',
  'Logistics': '/industries',
  'Health Services': '/industries',
};

const industries = [...new Set(clientList.map(c => c.industry))];

const ClientsPage = () => {
  const clients = clientList;

  return (
    <div className="min-h-screen" data-testid="clients-page">
      {/* Hero Section */}
      <section className="relative py-32 bg-[#064E3B]" data-testid="clients-hero">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="overline text-amber-400 mb-4 block">Our Clients</span>
            <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Trusted by Industry Leaders
            </h1>
            <p className="text-emerald-100 text-lg md:text-xl">
              We're proud to partner with leading organizations across various industries in Ghana and West Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Client Logos Grid */}
      <section className="section-padding bg-white" data-testid="clients-grid">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-outfit text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Our Partners & Clients
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From multinational corporations to government agencies, we've earned the trust of organizations seeking excellence in environmental consulting.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {clients.map((client, index) => (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center hover:bg-emerald-600 group transition-colors duration-300 min-h-[180px]"
                  data-testid={`client-card-${index}`}
                >
                  {client.logo ? (
                    <div className="w-full h-24 flex items-center justify-center mb-4">
                      <img 
                        src={client.logo} 
                        alt={client.name}
                        className="max-w-full max-h-full object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors shadow-sm">
                      <span className="font-outfit text-2xl font-bold text-emerald-600 group-hover:text-white transition-colors">
                        {client.initial}
                      </span>
                    </div>
                  )}
                  <p className="text-gray-700 font-medium text-center group-hover:text-white transition-colors text-sm">
                    {client.name}
                  </p>
                  <span className="text-gray-400 text-xs mt-1 group-hover:text-emerald-200 transition-colors">
                    {client.industry}
                  </span>
                </motion.div>
              ))}
            </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="section-padding section-light-green" data-testid="industries-served">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="overline mb-4 block">Industries We Serve</span>
            <h2 className="font-outfit text-2xl md:text-3xl font-bold text-gray-900">
              Diverse Sector Experience
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={industry}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={industryLinks[industry] || '/industries'}
                  className="block bg-white px-6 py-3 border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                >
                  {industry}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Highlight */}
      <section className="section-padding relative overflow-hidden" data-testid="client-testimonial">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700" />
        <div className="absolute inset-0 hero-pattern opacity-20" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <blockquote className="font-outfit text-2xl md:text-3xl text-white leading-relaxed mb-8">
                "GreenDev Associates has been instrumental in helping us achieve our environmental compliance objectives. Their expertise and professionalism are unmatched."
              </blockquote>
              <div>
                <p className="font-outfit font-semibold text-amber-400">Operations Manager</p>
                <p className="text-emerald-200">Leading Energy Company</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white" data-testid="clients-cta">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Join Our Client List?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Discover how GreenDev Associates can help your organization achieve its environmental and sustainability goals.
            </p>
            <Link
              to="/contact?message=I would like to become a client of GreenDev Associates."
              className="btn-primary inline-flex items-center gap-2"
              data-testid="clients-contact-btn"
            >
              Become a Client
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ClientsPage;
