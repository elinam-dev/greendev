import manufacturingImg from '../components/image/manufacturing.jpg';
import oilGasImg from '../components/image/oilandgas.jpg';
import builtEnvImg from '../components/image/builtenvironment.jpeg';
import miningImg from '../components/image/miningandmineral.jpg';
import agricultureImg from '../components/image/agriculturalinvestments.jpg';
import energyImg from '../components/image/energy.jpg';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Factory,
  Drop,
  Mountains,
  Plant,
  Lightning,
  Buildings
} from '@phosphor-icons/react';

const IndustriesPage = () => {
  const industries = [
    {
      id: 'manufacturing',
      title: 'Manufacturing',
      icon: Factory,
      image: manufacturingImg,
      description: 'Comprehensive environmental solutions for manufacturing facilities, ensuring compliance while optimizing operations.',
      services: [
        'Environmental impact assessments for new facilities',
        'Wastewater management and treatment',
        'Air quality monitoring and control',
        'Waste management planning',
        'Environmental permit acquisition',
        'Factories Inspectorate permit support'
      ]
    },
    {
      id: 'oil-gas',
      title: 'Oil and Gas (Downstream)',
      icon: Drop,
      image: oilGasImg,
      description: 'Specialized environmental consulting for downstream oil and gas operations across Ghana and West Africa.',
      services: [
        'EIA for downstream oil and gas facilities',
        'Pipeline and tank farm environmental assessments',
        'Spill prevention and response planning',
        'Environmental monitoring programs',
        'Regulatory compliance audits',
        'Community engagement programs'
      ]
    },
    {
      id: 'built-environment',
      title: 'Built Environment',
      icon: Buildings,
      image: builtEnvImg,
      description: 'Integrated environmental solutions for commercial and social infrastructure projects including residential estates, hospitals, and industrial parks.',
      services: [
        'EIA for residential and commercial developments',
        'Wastewater and stormwater management plans',
        'Fire and life safety assessments',
        'Environmental permit acquisition',
        'Annual environmental reporting',
        'Green building advisory'
      ]
    },
    {
      id: 'mining',
      title: 'Mining and Mineral Exploration',
      icon: Mountains,
      image: miningImg,
      description: 'Environmental expertise for mining and mineral exploration operations from prospecting to closure and rehabilitation.',
      services: [
        'Mining EIA and permitting',
        'Environmental monitoring reports',
        'Mine closure planning',
        'Biodiversity management',
        'Water management solutions',
        'Community impact assessment'
      ]
    },
    {
      id: 'agriculture',
      title: 'Agricultural Investments',
      icon: Plant,
      image: agricultureImg,
      description: 'Sustainable agricultural development solutions that balance productivity with environmental stewardship across West Africa.',
      services: [
        'Agricultural EIA studies',
        'Agro-processing facility assessments',
        'Plantation and processing unit ESIA',
        'Soil conservation planning',
        'Sustainable farming practices advisory',
        'Climate-smart agriculture consulting'
      ]
    },
    {
      id: 'energy',
      title: 'Energy',
      icon: Lightning,
      image: energyImg,
      description: 'Environmental consulting for power plants, substations, transmission lines, and renewable energy projects across West Africa.',
      services: [
        'EIA for power plants and substations',
        'Transmission line environmental assessments',
        'Renewable energy project assessments',
        'Grid infrastructure studies',
        'Environmental monitoring programs',
        'Carbon footprint analysis'
      ]
    }
  ];

  return (
    <div className="min-h-screen" data-testid="industries-page">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden" data-testid="industries-hero">
        <img src="/images/industries.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#064E3B]" style={{ opacity: 0.5 }} />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="overline text-[#D4A373] mb-4 block">Industries We Serve</span>
            <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Sector-Specific Environmental Expertise
            </h1>
            <p className="text-white/80 text-lg md:text-xl">
              We bring deep industry knowledge to every project, delivering tailored solutions that address the unique environmental challenges of your sector.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section-padding bg-white" data-testid="industries-grid">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="industry-card group"
                data-testid={`industry-card-${index}`}
              >
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#F0FDF4] flex items-center justify-center">
                      <industry.icon className="w-5 h-5 text-[#064E3B]" weight="duotone" />
                    </div>
                    <h3 className="font-outfit text-xl font-semibold text-gray-900">{industry.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{industry.description}</p>
                  <ul className="space-y-2 mb-6">
                    {industry.services.slice(0, 3).map((service, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                        <span className="w-1.5 h-1.5 bg-[#4D7C0F] rounded-full mt-2 flex-shrink-0" />
                        {service}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/contact?message=I would like to discuss a ${industry.title} project with your team.`}
                    className="inline-flex items-center gap-2 text-[#064E3B] font-medium text-sm group-hover:text-[#4D7C0F] transition-colors"
                  >
                    Discuss Your Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Details */}
      {industries.map((industry, index) => (
        <section
          key={industry.id}
          id={industry.id}
          className={`section-padding ${index % 2 === 0 ? 'bg-[#F9FAFB]' : 'bg-white'}`}
          data-testid={`industry-detail-${industry.id}`}
        >
          <div className="container-custom">
            <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={index % 2 !== 0 ? 'lg:order-2' : ''}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#064E3B] flex items-center justify-center">
                    <industry.icon className="w-6 h-6 text-white" weight="duotone" />
                  </div>
                  <span className="overline">{industry.title}</span>
                </div>
                <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {industry.title} Solutions
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {industry.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {industry.services.map((service, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-[#4D7C0F] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{service}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to={`/contact?message=I would like an industry-specific consultation for ${industry.title}.`}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Get Industry-Specific Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={index % 2 !== 0 ? 'lg:order-1' : ''}
              >
                <div className="h-[400px] overflow-hidden rounded-xl">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 bg-[#064E3B]" data-testid="industries-cta">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-white mb-4">
              Not Sure Which Services You Need?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Our industry experts can help you identify the right environmental solutions for your specific sector and project requirements.
            </p>
            <Link
              to="/contact?message=I am not sure which services I need. I would like to schedule a consultation to discuss my project requirements."
              className="bg-white text-[#064E3B] px-8 py-3 font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              data-testid="industries-contact-btn"
            >
              Schedule a Consultation
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default IndustriesPage;
