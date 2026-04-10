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
      description: 'Comprehensive environmental solutions for manufacturing facilities, ensuring compliance while optimizing operations.',
      services: [
        'Environmental impact assessments for new facilities',
        'Wastewater management and treatment',
        'Air quality monitoring and control',
        'Waste management planning',
        'Environmental permit acquisition',
        'ISO 14001 implementation support'
      ],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800'
    },
    {
      id: 'oil-gas',
      title: 'Oil & Gas',
      icon: Drop,
      description: 'Specialized environmental consulting for upstream, midstream, and downstream oil and gas operations.',
      services: [
        'EIA for exploration and production',
        'Spill prevention and response planning',
        'Decommissioning studies',
        'Environmental monitoring programs',
        'Regulatory compliance audits',
        'Community engagement programs'
      ],
      image: 'https://images.unsplash.com/photo-1518173946687-a4c036bc8e1c?w=800'
    },
    {
      id: 'mining',
      title: 'Mining',
      icon: Mountains,
      description: 'Environmental expertise for mining operations from exploration to closure and rehabilitation.',
      services: [
        'Mining EIA and permitting',
        'Mine closure planning',
        'Biodiversity management',
        'Water management solutions',
        'Tailings management',
        'Community impact assessment'
      ],
      image: 'https://images.unsplash.com/photo-1605891595832-07e36eafdd81?w=800'
    },
    {
      id: 'agriculture',
      title: 'Agriculture',
      icon: Plant,
      description: 'Sustainable agricultural development solutions that balance productivity with environmental stewardship.',
      services: [
        'Agricultural EIA studies',
        'Irrigation system design',
        'Soil conservation planning',
        'Sustainable farming practices',
        'Agro-processing facility assessments',
        'Climate-smart agriculture advisory'
      ],
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800'
    },
    {
      id: 'energy',
      title: 'Energy',
      icon: Lightning,
      description: 'Environmental consulting for conventional and renewable energy projects across West Africa.',
      services: [
        'Power plant EIA and permitting',
        'Renewable energy assessments',
        'Grid infrastructure studies',
        'Environmental monitoring',
        'Carbon footprint analysis',
        'Energy efficiency consulting'
      ],
      image: 'https://images.pexels.com/photos/9800116/pexels-photo-9800116.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'infrastructure',
      title: 'Infrastructure Development',
      icon: Buildings,
      description: 'Integrated environmental and engineering solutions for urban and rural infrastructure projects.',
      services: [
        'Urban development EIA',
        'Transportation infrastructure studies',
        'Water supply and sanitation',
        'Drainage and flood control',
        'Resettlement action planning',
        'Green building consulting'
      ],
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'
    }
  ];

  return (
    <div className="min-h-screen" data-testid="industries-page">
      {/* Hero Section */}
      <section className="relative py-32 bg-[#064E3B]" data-testid="industries-hero">
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
                  <div className="w-full h-full bg-gradient-to-br from-[#064E3B] to-[#4D7C0F] flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <industry.icon className="w-20 h-20 text-white/30" weight="duotone" />
                  </div>
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
                    to="/contact"
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
                  to="/contact"
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
                <div className="h-[400px] bg-gradient-to-br from-[#064E3B] to-[#4D7C0F] flex items-center justify-center">
                  <industry.icon className="w-40 h-40 text-white/20" weight="duotone" />
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
              to="/contact"
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
