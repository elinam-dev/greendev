import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Drop,
  Mountains,
  TreeEvergreen,
  Wrench,
  ChartLineUp,
  ShieldCheck
} from '@phosphor-icons/react';

const EARTH_ENGINEERING_SERVICES = [
  { icon: Mountains, title: 'Soil Stability & Geotechnical Engineering', description: 'Analysis and design solutions for soil behavior, foundation stability, and subsurface conditions.' },
  { icon: Drop, title: 'Water & Drainage Management', description: 'Designing drainage systems that prevent flooding and manage stormwater effectively.' },
  { icon: TreeEvergreen, title: 'Land Restoration & Erosion Control', description: 'Restoring degraded lands and implementing erosion control measures for long-term resilience.' },
  { icon: Globe, title: 'Environmental Impact Assessments', description: 'Site analysis and environmental assessments to minimize development impact on natural systems.' },
  { icon: Wrench, title: 'Sustainable Construction Techniques', description: 'Implementation of eco-friendly materials and smarter construction methods.' },
  { icon: ShieldCheck, title: 'Climate Adaptation & Hazard Mitigation', description: 'Strengthening infrastructure against natural hazards like landslides, storms, and rising water levels.' },
];

const SubsidiaryPage = () => {
  return (
    <div className="min-h-screen" data-testid="subsidiary-page">

      {/* Hero */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900" />
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="overline text-amber-400 mb-4 block">Our Subsidiary</span>
            <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Earth Engineering
            </h1>
            <p className="text-emerald-100 text-lg md:text-xl leading-relaxed">
              The science and practice of designing, managing, and improving the interaction between human activities and the natural environment.
            </p>
            <Link
              to="/contact"
              className="btn-accent inline-flex items-center gap-2 mt-8 group"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What is Earth Engineering */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="overline mb-4 block">What We Do</span>
              <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Engineering in Harmony with the Earth
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Earth Engineering combines elements of <span className="text-emerald-700 font-semibold">environmental engineering</span>, <span className="text-emerald-700 font-semibold">geotechnical engineering</span>, and <span className="text-emerald-700 font-semibold">ecological science</span> to address critical challenges such as soil stability, erosion control, water management, waste treatment, and land restoration.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                By understanding the structure and behavior of the earth's surface and subsurface, our engineers develop solutions that minimize environmental impact and promote long-term resilience.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                For organizations and communities, investing in earth engineering means building responsibly — ensuring safer structures, healthier ecosystems, and a balanced relationship between development and the environment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {[
                'Soil stability and foundation analysis',
                'Erosion control and land restoration',
                'Flood prevention and drainage design',
                'Pollution management and waste treatment',
                'Climate adaptation and hazard mitigation',
                'GIS mapping and remote sensing',
                'Eco-friendly construction materials',
                'Sustainable infrastructure development'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-[#F0FDF4] rounded-xl px-5 py-4">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" weight="fill" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Role in Global Challenges */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900" />
        <div className="absolute inset-0 hero-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <span className="overline text-amber-400 mb-4 block">Our Impact</span>
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-white mb-4">
              Tackling Global Environmental Challenges
            </h2>
            <p className="text-emerald-100 text-lg max-w-3xl mx-auto">
              Modern earth engineering plays a vital role in ensuring that development does not come at the expense of nature.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Flood Prevention',
                description: 'Designing drainage systems and water management infrastructure that protect communities from flooding and stormwater damage.'
              },
              {
                title: 'Land Restoration',
                description: 'Restoring degraded and contaminated lands to healthy, productive ecosystems through proven engineering and ecological techniques.'
              },
              {
                title: 'Climate Resilience',
                description: 'Strengthening infrastructure against natural hazards including landslides, storms, and rising water levels driven by climate change.'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
              >
                <h3 className="font-outfit text-xl font-bold text-amber-400 mb-4">{item.title}</h3>
                <p className="text-emerald-100 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-[#F9FAFB]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="overline mb-4 block">What We Offer</span>
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Earth Engineering Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From site analysis to sustainable construction, we provide comprehensive earth engineering solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EARTH_ENGINEERING_SERVICES.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <service.icon className="w-7 h-7 text-white" weight="duotone" />
                </div>
                <h3 className="font-outfit text-lg font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="overline mb-4 block">Technology & Innovation</span>
              <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Smarter Solutions Through Technology
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-12">
                In practice, earth engineering involves site analysis, soil testing, environmental impact assessments, and the implementation of sustainable construction techniques. We leverage cutting-edge technologies to create smarter, more efficient solutions.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['GIS Mapping', 'Remote Sensing', 'Eco-Friendly Materials', 'Soil Testing'].map((tech, i) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-[#F0FDF4] border border-emerald-100 rounded-xl p-6 text-center"
                  >
                    <ChartLineUp className="w-8 h-8 text-emerald-600 mx-auto mb-3" weight="duotone" />
                    <p className="font-outfit font-semibold text-gray-900 text-sm">{tech}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
              Build Responsibly with Earth Engineering
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Partner with us to develop sustainable infrastructure that protects the environment while enabling growth.
            </p>
            <Link
              to="/contact"
              className="bg-white text-[#064E3B] px-8 py-4 font-bold rounded-xl hover:bg-amber-400 hover:text-white transition-all inline-flex items-center gap-2 shadow-lg"
            >
              Discuss Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SubsidiaryPage;
