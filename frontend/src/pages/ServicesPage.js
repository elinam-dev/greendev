import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Leaf, 
  Users,
  FileSearch,
  Certificate,
  Drop,
  HardHat,
  Mountains,
  Handshake,
  ChartLineUp,
  GraduationCap
} from '@phosphor-icons/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const ServicesPage = () => {
  const serviceCategories = [
    {
      id: 'environmental',
      title: 'Environmental Services',
      description: 'Comprehensive environmental assessment and compliance solutions to ensure your projects meet regulatory requirements.',
      icon: Leaf,
      services: [
        {
          title: 'Environmental Impact Assessment (EIA)',
          description: 'Comprehensive assessment of potential environmental effects of proposed projects, including baseline studies, impact prediction, and mitigation measures.',
          details: [
            'Scoping and terms of reference development',
            'Baseline environmental studies',
            'Impact identification and analysis',
            'Mitigation measures and monitoring plans',
            'Environmental Management Plans (EMP)',
            'Public consultation and stakeholder engagement'
          ]
        },
        {
          title: 'Social Impact Assessment (SIA)',
          description: 'Evaluation of social consequences of development projects, ensuring community needs are addressed and social risks mitigated.',
          details: [
            'Socio-economic baseline surveys',
            'Stakeholder mapping and analysis',
            'Community health impact assessment',
            'Resettlement action planning',
            'Livelihood restoration programs',
            'Community development frameworks'
          ]
        },
        {
          title: 'Environmental Audits',
          description: 'Systematic evaluation of environmental performance and compliance with regulations, permits, and best practices.',
          details: [
            'Compliance audits against EPA requirements',
            'Environmental management system audits',
            'Due diligence assessments',
            'Contamination assessment',
            'Corrective action recommendations',
            'Audit report preparation'
          ]
        },
        {
          title: 'Permit Acquisition Support',
          description: 'Expert guidance through the environmental permitting process, ensuring timely approvals for your projects.',
          details: [
            'EPA Ghana permit applications',
            'Environmental permit renewals',
            'Permit compliance monitoring',
            'Regulatory liaison services',
            'Documentation preparation',
            'Post-permit compliance support'
          ]
        }
      ]
    },
    {
      id: 'engineering',
      title: 'Engineering Services',
      description: 'Technical engineering solutions for water, sanitation, and infrastructure development projects.',
      icon: HardHat,
      services: [
        {
          title: 'Water & Sanitation Engineering',
          description: 'Design and implementation of water supply and sanitation systems for communities and industrial facilities.',
          details: [
            'Water supply system design',
            'Wastewater treatment solutions',
            'Stormwater management systems',
            'Water quality monitoring programs',
            'WASH facility design',
            'Water resource assessments'
          ]
        },
        {
          title: 'Drainage Studies',
          description: 'Comprehensive drainage analysis and design for urban and industrial developments.',
          details: [
            'Hydrological assessments',
            'Flood risk analysis',
            'Drainage system design',
            'Erosion control measures',
            'Climate resilience planning',
            'Drainage master planning'
          ]
        },
        {
          title: 'Geotechnical Investigations',
          description: 'Subsurface investigations to support engineering design and construction planning.',
          details: [
            'Soil sampling and testing',
            'Foundation design recommendations',
            'Slope stability analysis',
            'Ground improvement solutions',
            'Construction material testing',
            'Geotechnical reporting'
          ]
        }
      ]
    },
    {
      id: 'advisory',
      title: 'Advisory Services',
      description: 'Strategic consulting services to help organizations achieve their sustainability and development goals.',
      icon: Handshake,
      services: [
        {
          title: 'CSR Program Development',
          description: 'Design and implementation of corporate social responsibility programs aligned with business objectives and community needs.',
          details: [
            'CSR strategy development',
            'Community needs assessment',
            'Program design and planning',
            'Implementation support',
            'Impact measurement frameworks',
            'Reporting and communication'
          ]
        },
        {
          title: 'Feasibility Studies',
          description: 'Technical and economic assessment of project viability to inform investment decisions.',
          details: [
            'Pre-feasibility assessments',
            'Technical feasibility analysis',
            'Economic and financial analysis',
            'Risk assessment and mitigation',
            'Alternatives analysis',
            'Investment recommendations'
          ]
        },
        {
          title: 'Capacity Building Training',
          description: 'Customized training programs to enhance environmental and technical capabilities within organizations.',
          details: [
            'Environmental awareness training',
            'EIA/SIA methodology training',
            'Environmental management systems',
            'Health, safety, and environment (HSE)',
            'Regulatory compliance training',
            'Technical skills development'
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen" data-testid="services-page">
      {/* Hero Section */}
      <section className="relative py-32 bg-[#064E3B]" data-testid="services-hero">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="overline text-[#D4A373] mb-4 block">Our Services</span>
            <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Comprehensive Environmental & Engineering Solutions
            </h1>
            <p className="text-white/80 text-lg md:text-xl">
              From environmental assessments to engineering design, we provide end-to-end solutions that ensure regulatory compliance and sustainable development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-white" data-testid="services-overview">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {serviceCategories.map((category, index) => (
              <motion.a
                key={category.id}
                href={`#${category.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="service-card group text-center"
                data-testid={`service-category-${index}`}
              >
                <div className="w-16 h-16 bg-[#F0FDF4] flex items-center justify-center mx-auto mb-6 group-hover:bg-[#064E3B] transition-colors">
                  <category.icon className="w-8 h-8 text-[#064E3B] group-hover:text-white transition-colors" weight="duotone" />
                </div>
                <h3 className="font-outfit text-xl font-semibold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      {serviceCategories.map((category, catIndex) => (
        <section
          key={category.id}
          id={category.id}
          className={`section-padding ${catIndex % 2 === 0 ? 'bg-[#F9FAFB]' : 'bg-white'}`}
          data-testid={`service-section-${category.id}`}
        >
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-12"
            >
              <div className="w-14 h-14 bg-[#064E3B] flex items-center justify-center">
                <category.icon className="w-7 h-7 text-white" weight="duotone" />
              </div>
              <div>
                <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900">{category.title}</h2>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {category.services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white border border-gray-100 p-6"
                  data-testid={`service-item-${catIndex}-${index}`}
                >
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-none">
                      <AccordionTrigger className="hover:no-underline py-0">
                        <div className="text-left">
                          <h3 className="font-outfit text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                          <p className="text-gray-600 text-sm font-normal">{service.description}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <ul className="space-y-2">
                          {service.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                              <span className="w-1.5 h-1.5 bg-[#4D7C0F] rounded-full mt-2 flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Process Section */}
      <section className="section-padding bg-[#064E3B]" data-testid="process-section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="overline text-[#D4A373] mb-4 block">Our Process</span>
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-white mb-4">
              How We Work
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'Initial discussion to understand your project requirements and objectives.' },
              { step: '02', title: 'Assessment', description: 'Comprehensive analysis of your project scope and regulatory requirements.' },
              { step: '03', title: 'Implementation', description: 'Execution of the agreed work plan with regular progress updates.' },
              { step: '04', title: 'Delivery', description: 'Final deliverables with ongoing support for implementation.' }
            ].map((phase, index) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <span className="font-outfit text-5xl font-bold text-white/10">{phase.step}</span>
                <h3 className="font-outfit text-xl font-semibold text-white mt-2 mb-2">{phase.title}</h3>
                <p className="text-white/70 text-sm">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white" data-testid="services-cta">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Need a Tailored Solution?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Our team is ready to discuss your specific requirements and develop a customized approach for your project.
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center gap-2"
              data-testid="services-contact-btn"
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

export default ServicesPage;
