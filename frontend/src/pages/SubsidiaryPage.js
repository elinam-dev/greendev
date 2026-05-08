import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Flask, Microscope, ChartBar,
  MapPin, Phone, Envelope, Buildings, Drop, Mountains, Plant, Lightning, Factory
} from '@phosphor-icons/react';

const SERVICES = [
  {
    id: 'research',
    title: 'Environmental Research & Studies',
    icon: Microscope,
    items: [
      'Baseline environmental studies and site characterisation',
      'Environmental literature reviews and technical research reports',
      'Ecological surveys and biodiversity assessments',
      'Climate change vulnerability and adaptation studies',
      'Greenhouse gas (GHG) emissions assessments',
    ]
  },
  {
    id: 'lab',
    title: 'Laboratory & Field Testing',
    icon: Flask,
    items: [
      'Ambient air quality monitoring and analysis',
      'Noise level measurement and assessment',
      'Wastewater and effluent sampling and analysis',
      'Soil and groundwater sampling and characterisation',
      'Water quality testing for industrial and domestic use',
    ]
  },
  {
    id: 'data',
    title: 'Data Analysis & Monitoring',
    icon: ChartBar,
    items: [
      'Environmental data collection, processing and interpretation',
      'Environmental quality monitoring and reporting',
      'Preparation of Annual Environmental Reports (AER)',
      'Environmental monitoring plans and compliance tracking',
      'GIS mapping and spatial data analysis',
    ]
  },
];

const INDUSTRIES = [
  { label: 'Manufacturing & Industry', icon: Factory },
  { label: 'Oil & Gas', icon: Drop },
  { label: 'Mining & Minerals', icon: Mountains },
  { label: 'Built Environment', icon: Buildings },
  { label: 'Energy & Power', icon: Lightning },
  { label: 'Agriculture & Food', icon: Plant },
];

const WHY_GERS = [
  'Backed by the expertise and track record of GreenDev Associates International Limited',
  'Multidisciplinary team of environmental scientists, engineers and field technicians',
  'Rigorous quality control and data integrity standards',
  'Cost-effective, timely and professional service delivery',
  'Strong understanding of Ghana EPA regulations and West African environmental standards',
];

const SubsidiaryPage = () => {
  return (
    <div className="min-h-screen" data-testid="subsidiary-page">

      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900" />
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="overline text-amber-400 mb-4 block">A Subsidiary of GreenDev Associates International Limited</span>
            <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              GreenDev Environmental Research Services
            </h1>
            <p className="text-amber-300 font-semibold text-lg mb-4">Environmental Research & Laboratory Services</p>
            <p className="text-emerald-100 text-lg md:text-xl leading-relaxed">
              Specialized environmental research, laboratory testing, and data-driven monitoring services to industries, institutions, and government agencies.
            </p>
            <Link
              to="/contact?message=I would like to enquire about GreenDev Environmental Research Services (GERS)."
              className="btn-accent inline-flex items-center gap-2 mt-8 group"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <span className="overline mb-4 block">About Us</span>
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              GreenDev Environmental Research Services (GERS) is a subsidiary of GreenDev Associates International Limited, a duly registered sustainability consultancy firm in Ghana. GERS was established to provide specialized environmental research, laboratory testing, and data-driven monitoring services to industries, institutions, and government agencies.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              Building on the parent company's strong foundation in environmental and sustainability consulting, GERS focuses on generating accurate, science-based data to support environmental management decisions, regulatory compliance, and sustainable development outcomes.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#F0FDF4] rounded-2xl p-8 border border-emerald-100">
                <h3 className="font-outfit text-xl font-bold text-emerald-800 mb-3">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be the leading environmental research and laboratory services provider in West Africa, recognised for scientific excellence and innovative solutions.
                </p>
              </div>
              <div className="bg-[#F0FDF4] rounded-2xl p-8 border border-emerald-100">
                <h3 className="font-outfit text-xl font-bold text-emerald-800 mb-3">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To deliver reliable, high-quality environmental research and field testing services that empower clients to make informed decisions for sustainable operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-[#F9FAFB]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="overline mb-4 block">Our Services</span>
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900">
              What We Offer
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <service.icon className="w-7 h-7 text-white" weight="duotone" />
                </div>
                <h3 className="font-outfit text-lg font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">
                  {service.title}
                </h3>
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" weight="fill" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="overline mb-4 block">Industries We Serve</span>
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sectors We Support
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our research and laboratory services support a broad range of sectors.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {INDUSTRIES.map((industry, index) => (
              <motion.div
                key={industry.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-[#F0FDF4] border border-emerald-100 rounded-xl p-6 text-center hover:bg-emerald-600 hover:border-emerald-600 group transition-all duration-300"
              >
                <industry.icon className="w-8 h-8 text-emerald-600 group-hover:text-white mx-auto mb-3 transition-colors" weight="duotone" />
                <p className="font-outfit font-semibold text-gray-800 group-hover:text-white text-sm transition-colors">{industry.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why GERS */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900" />
        <div className="absolute inset-0 hero-pattern opacity-10" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="overline text-amber-400 mb-4 block">Why Choose GERS</span>
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-white">
              Why Choose GERS
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {WHY_GERS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4"
              >
                <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" weight="fill" />
                <p className="text-emerald-100">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="overline mb-4 block">Contact Us</span>
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900">Get In Touch with GERS</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 bg-[#F0FDF4] flex items-center justify-center rounded-xl">
                <MapPin className="w-6 h-6 text-[#064E3B]" weight="duotone" />
              </div>
              <h4 className="font-outfit font-semibold text-gray-900">Address</h4>
              <p className="text-gray-600 text-sm">Zees Plaza, 6th Street, Dawhenya,<br />Tema Comm 25 — Dawhenya Stretch</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 bg-[#F0FDF4] flex items-center justify-center rounded-xl">
                <Envelope className="w-6 h-6 text-[#064E3B]" weight="duotone" />
              </div>
              <h4 className="font-outfit font-semibold text-gray-900">Email</h4>
              <a href="mailto:greendev.associates@gmail.com" className="text-emerald-600 hover:text-amber-500 text-sm transition-colors">
                greendev.associates@gmail.com
              </a>
            </div>
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 bg-[#F0FDF4] flex items-center justify-center rounded-xl">
                <Phone className="w-6 h-6 text-[#064E3B]" weight="duotone" />
              </div>
              <h4 className="font-outfit font-semibold text-gray-900">Phone</h4>
              <div className="text-gray-600 text-sm space-y-1">
                <a href="tel:+233266984364" className="block hover:text-emerald-600">+233 (0) 266 984 364</a>
                <a href="tel:+233247197014" className="block hover:text-emerald-600">+233 (0) 247 197 014</a>
                <a href="tel:+233558600571" className="block hover:text-emerald-600">+233 (0) 558 600 571</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#064E3B]">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Work with GERS?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Partner with us for reliable, science-based environmental research and laboratory services.
            </p>
            <Link
              to="/contact?message=I would like to enquire about GreenDev Environmental Research Services (GERS)."
              className="bg-white text-[#064E3B] px-8 py-4 font-bold rounded-xl hover:bg-amber-400 hover:text-white transition-all inline-flex items-center gap-2 shadow-lg"
            >
              Request a Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SubsidiaryPage;
