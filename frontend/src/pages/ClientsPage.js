import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight } from '@phosphor-icons/react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real clients from company profile
  const clientList = [
    { name: 'Puma Energy Ghana Limited', initial: 'PE', industry: 'Oil & Gas' },
    { name: 'Devtraco Limited', initial: 'DT', industry: 'Built Environment' },
    { name: 'Enclave Power Company', initial: 'EP', industry: 'Energy' },
    { name: 'Kasapreko Company Limited', initial: 'KC', industry: 'Manufacturing' },
    { name: 'Africa Cement Factory Limited', initial: 'AC', industry: 'Manufacturing' },
    { name: 'Ghana Steels Limited', initial: 'GS', industry: 'Manufacturing' },
    { name: 'Ferro Fabrik Limited', initial: 'FF', industry: 'Manufacturing' },
    { name: 'Vester Oil Mills Limited', initial: 'VO', industry: 'Agriculture' },
    { name: 'Ayaan Global Ghana Limited', initial: 'AG', industry: 'Manufacturing' },
    { name: 'Reroy Cables Limited', initial: 'RC', industry: 'Manufacturing' },
    { name: 'Western Rod and Wire Limited', initial: 'WR', industry: 'Manufacturing' },
    { name: 'AMPC International Health Consultants', initial: 'AI', industry: 'Health Services' },
    { name: 'Yantai Chemicals Limited', initial: 'YC', industry: 'Manufacturing' },
    { name: 'Atlantic Quarry Limited', initial: 'AQ', industry: 'Mining' },
    { name: 'M. Barbisotti and Sons Limited', initial: 'MB', industry: 'Logistics' },
    { name: 'International Warehouse Company', initial: 'IW', industry: 'Logistics' },
  ];

  useEffect(() => {
    setClients(clientList);
    setLoading(false);
  }, []);

  const industries = [...new Set(clientList.map(c => c.industry))];

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
            <span className="overline text-[#D4A373] mb-4 block">Our Clients</span>
            <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Trusted by Industry Leaders
            </h1>
            <p className="text-white/80 text-lg md:text-xl">
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

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="spinner" />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {clients.map((client, index) => (
                <motion.div
                  key={client.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-gray-50 p-8 flex flex-col items-center justify-center hover:bg-[#064E3B] group transition-colors duration-300"
                  data-testid={`client-card-${index}`}
                >
                  <div className="w-20 h-20 bg-white flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                    <span className="font-outfit text-2xl font-bold text-[#064E3B] group-hover:text-white transition-colors">
                      {client.initial}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium text-center group-hover:text-white transition-colors text-sm">
                    {client.name}
                  </p>
                  <span className="text-gray-400 text-xs mt-1 group-hover:text-white/60 transition-colors">
                    {client.industry}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Industries Served */}
      <section className="section-padding bg-[#F9FAFB]" data-testid="industries-served">
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
                className="bg-white px-6 py-3 border border-gray-200 hover:border-[#064E3B] hover:bg-[#064E3B] hover:text-white transition-colors"
              >
                {industry}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Highlight */}
      <section className="section-padding bg-[#064E3B]" data-testid="client-testimonial">
        <div className="container-custom">
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
                <p className="font-outfit font-semibold text-[#D4A373]">Operations Manager</p>
                <p className="text-white/70">Leading Energy Company</p>
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
              to="/contact"
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
