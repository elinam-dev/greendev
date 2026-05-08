import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Leaf,
  Certificate,
  Handshake,
  CheckCircle,
  ArrowUpRight
} from '@phosphor-icons/react';

const ALL_SERVICES = [
  {
    id: 'eia',
    category: 'Environmental & Social Assessments',
    categoryColor: 'bg-emerald-600',
    icon: Leaf,
    title: 'Environmental Impact Assessments (EIA)',
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
    id: 'sia',
    category: 'Environmental & Social Assessments',
    categoryColor: 'bg-emerald-600',
    icon: Leaf,
    title: 'Social Impact Assessments (SIA)',
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
    id: 'permits',
    category: 'Permits, Licenses & CSR',
    categoryColor: 'bg-amber-500',
    icon: Certificate,
    title: 'Support Services for Acquisition of Permits and Licenses',
    description: 'Expert guidance through the permitting process for environmental permits, fire permits, and factories inspectorate permits.',
    details: [
      'EPA Ghana environmental permit applications',
      'Fire permit acquisition support',
      'Factories Inspectorate permit support',
      'Environmental permit renewals',
      'Regulatory liaison services',
      'Post-permit compliance support'
    ]
  },
  {
    id: 'csr',
    category: 'Permits, Licenses & CSR',
    categoryColor: 'bg-amber-500',
    icon: Certificate,
    title: 'Development and Evaluation of CSR Programs',
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
    id: 'training',
    category: 'Advisory & Capacity Building',
    categoryColor: 'bg-blue-600',
    icon: Handshake,
    title: 'Training and Capacity Building',
    description: 'Customized training programs to enhance environmental and technical capabilities within organizations.',
    details: [
      'Environmental awareness training',
      'EIA/SIA methodology training',
      'Environmental management systems',
      'Health, Safety and Environment (HSE)',
      'Regulatory compliance training',
      'Technical skills development'
    ]
  },
  {
    id: 'feasibility',
    category: 'Advisory & Capacity Building',
    categoryColor: 'bg-blue-600',
    icon: Handshake,
    title: 'Project Feasibility Studies',
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
    id: 'siting',
    category: 'Advisory & Capacity Building',
    categoryColor: 'bg-blue-600',
    icon: Handshake,
    title: 'Siting Analysis for Commercial and Industrial Projects',
    description: 'Comprehensive site evaluation to identify optimal locations for commercial and industrial developments.',
    details: [
      'Environmental suitability assessment',
      'Land use compatibility analysis',
      'Infrastructure availability review',
      'Regulatory zoning compliance',
      'Risk and hazard mapping',
      'Site comparison and recommendation'
    ]
  },
  {
    id: 'earth-engineering',
    category: 'Advisory & Capacity Building',
    categoryColor: 'bg-blue-600',
    icon: Handshake,
    title: 'Earth Engineering',
    description: 'Specialized environmental research, laboratory testing, and data-driven monitoring services through our subsidiary GreenDev Environmental Research Services (GERS).',
    details: [
      'Baseline environmental studies and site characterisation',
      'Ambient air quality monitoring and analysis',
      'Wastewater and effluent sampling and analysis',
      'Soil and groundwater sampling and characterisation',
      'GIS mapping and spatial data analysis',
      'Annual Environmental Reports (AER) preparation'
    ],
    link: '/subsidiary'
  }
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen" data-testid="services-page">

      {/* Hero */}
      <section className="relative py-32 overflow-hidden" data-testid="services-hero">
        <img src="/images/service.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-emerald-900" style={{ opacity: 0.5 }} />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="overline text-amber-400 mb-4 block">Our Services</span>
            <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Comprehensive Sustainability Solutions
            </h1>
            <p className="text-emerald-100 text-lg md:text-xl">
              From environmental assessments to capacity building, we provide end-to-end solutions that ensure regulatory compliance and sustainable development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Environmental & Social Assessments', color: 'bg-emerald-600' },
              { label: 'Permits, Licenses & CSR', color: 'bg-amber-500' },
              { label: 'Advisory & Capacity Building', color: 'bg-blue-600' },
            ].map((cat) => (
              <span key={cat.label} className={`${cat.color} text-white text-sm font-medium px-4 py-2 rounded-full`}>
                {cat.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-[#F9FAFB]" data-testid="services-grid">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {ALL_SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
                data-testid={`service-card-${index}`}
              >
                {/* Card Top Bar */}
                <div className={`${service.categoryColor} h-2 w-full`} />

                <div className="p-8 flex flex-col flex-1">
                  {/* Category Tag */}
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                    {service.category}
                  </span>

                  {/* Title */}
                  <h3 className="font-outfit text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2 mb-8 flex-1">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" weight="fill" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to={service.link || `/contact?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-sm group-hover:text-amber-500 transition-colors mt-auto"
                  >
                    {service.link ? 'Learn More' : 'Get a Consultation'}
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-[#064E3B]" data-testid="process-section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="overline text-amber-400 mb-4 block">Our Process</span>
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-white">How We Work</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-white/10" />
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
                className="text-center relative"
              >
                <div className="w-20 h-20 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="font-outfit text-2xl font-bold text-amber-400">{phase.step}</span>
                </div>
                <h3 className="font-outfit text-xl font-semibold text-white mb-3">{phase.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white" data-testid="services-cta">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="font-outfit text-3xl md:text-4xl font-bold text-white mb-4">
                Need a Tailored Solution?
              </h2>
              <p className="text-emerald-100 max-w-2xl mx-auto mb-8 text-lg">
                Our team is ready to discuss your specific requirements and develop a customized approach for your project.
              </p>
              <Link
                to="/contact?message=I would like to request a consultation for a tailored sustainability solution."
                className="bg-white text-emerald-700 px-8 py-4 font-bold rounded-xl hover:bg-amber-400 hover:text-white transition-all inline-flex items-center gap-2 shadow-lg"
                data-testid="services-contact-btn"
              >
                Request a Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
