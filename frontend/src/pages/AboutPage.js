import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Target, 
  Eye, 
  CheckCircle,
  Quotes
} from '@phosphor-icons/react';
import StatsCounter from '../components/shared/StatsCounter';

const STATS = { years_experience: 10, projects_delivered: 100, industries_served: 50, expert_consultants: 11 };

const TEAM_PREVIEW = [
  { id: '1', name: 'Edward Kojo Anagbo', role: 'Managing Director', expertise: 'Environmental Sustainability Practitioner' },
  { id: '2', name: 'Isaac Simpson', role: 'Senior Consultant', expertise: 'Health and Safety Specialist' },
  { id: '3', name: 'Emmanuel Okoh Agyemang', role: 'Associate Consultant', expertise: 'Hydrologist' },
  { id: '4', name: 'Dr. Elvis Nyarko', role: 'Senior Consultant', expertise: 'Marine Ecology' },
];

const AboutPage = () => {
  const stats = STATS;
  const team = TEAM_PREVIEW;

  const values = [
    {
      title: 'Scientific Rigor',
      description: 'We apply the highest standards of scientific methodology in all our assessments and studies.'
    },
    {
      title: 'Integrity',
      description: 'We maintain unwavering honesty and transparency in all our client relationships.'
    },
    {
      title: 'Innovation',
      description: 'We continuously adopt cutting-edge technologies and methodologies to deliver superior results.'
    },
    {
      title: 'Sustainability',
      description: 'We are committed to solutions that balance economic development with environmental stewardship.'
    }
  ];

  const approach = [
    'Comprehensive stakeholder engagement',
    'Data-driven analysis and recommendations',
    'Regulatory compliance expertise',
    'Practical and implementable solutions',
    'Continuous project support',
    'Knowledge transfer and capacity building'
  ];

  return (
    <div className="min-h-screen" data-testid="about-page">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden" data-testid="about-hero">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800" />
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="overline text-amber-400 mb-4 block">About Us</span>
            <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Pioneering Environmental Excellence in Africa
            </h1>
            <p className="text-emerald-100 text-lg md:text-xl">
              GreenDev Associates International Limited is a premier environmental and sustainability consultancy, delivering world-class solutions across Ghana and West Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-padding bg-white" data-testid="company-overview">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="overline mb-4 block">Company Overview</span>
              <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                GreenDev Associates International Limited is an associate-based sustainability consultancy and project management firm duly registered in Ghana.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                The company was established to provide companies with wholesome solutions that enhance their environmental performance and ensure reduction of pollution footprints.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Our focus is to provide a range of sustainability services that helps companies understand their potential environmental and socio-economic impacts and additionally provide support services to enable companies mitigate impacts so they are compliant with relevant legislation.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We can take care of your biggest concerns – environmental management systems and permits, waste management, health and safety concerns, social responsibility and community approval, while you concentrate on increasing your profitability and position among your competitors.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={require('../components/image/greendev.jpg')}
                alt="GreenDev Associates"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-white" data-testid="vision-mission">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="overline text-emerald-600 mb-4 block">What Drives Us</span>
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900">Our Vision & Mission</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative bg-[#F0FDF4] border border-emerald-100 rounded-2xl p-10"
            >
              <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Eye className="w-8 h-8 text-white" weight="fill" />
              </div>
              <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To be acclaimed as a <span className="text-emerald-700 font-semibold">resourceful, responsive and reliable</span> sustainability solutions provider in the sub-region.
              </p>
              <div className="mt-8 pt-6 border-t border-emerald-100">
                <p className="text-emerald-600 text-sm">Shaping a sustainable future for West Africa</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative bg-[#F0FDF4] border border-emerald-100 rounded-2xl p-10"
            >
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Target className="w-8 h-8 text-white" weight="fill" />
              </div>
              <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                To provide <span className="text-emerald-700 font-semibold">professional and practicable guidance</span> for companies to ensure sustainable development at all stages of the project cycle.
              </p>
              <div className="mt-8 pt-6 border-t border-emerald-100">
                <p className="text-emerald-600 text-sm">Guiding every project from inception to completion</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter stats={stats} />

      {/* Our Approach */}
      <section className="section-padding bg-[#F9FAFB]" data-testid="our-approach">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="overline mb-4 block">Our Approach</span>
              <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                How We Work
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our project methodology is built on a foundation of scientific rigor, stakeholder engagement, and practical implementation. We work collaboratively with our clients to understand their unique challenges and deliver tailored solutions.
              </p>
              <div className="space-y-4">
                {approach.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-6 h-6 text-[#4D7C0F]" weight="fill" />
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-[#064E3B] p-8 md:p-12">
              <h3 className="font-outfit text-2xl font-bold text-white mb-6">Our Core Values</h3>
              <div className="space-y-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h4 className="font-outfit font-semibold text-[#D4A373] mb-1">{value.title}</h4>
                    <p className="text-white/70 text-sm">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Message */}
      <section className="section-padding bg-white" data-testid="leadership-message">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Quotes className="w-16 h-16 text-[#D4A373] mx-auto mb-8" weight="fill" />
              <blockquote className="font-outfit text-2xl md:text-3xl text-gray-900 leading-relaxed mb-8">
                "At GreenDev Associates, we understand project objectives thoroughly, visit sites for baseline data collection, and interact with all stakeholders including regulatory bodies, affected persons, project owners, and end-users. We conduct extensive research and practice a systematic quality control strategy to deliver professional and practicable guidance."
              </blockquote>
              <div>
                <p className="font-outfit font-semibold text-gray-900">Edward Kojo Anagbo</p>
                <p className="text-gray-500">Managing Director, Environmental Sustainability Practitioner</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team Preview */}
      {team.length > 0 && (
        <section className="section-padding bg-white" data-testid="team-preview">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="overline mb-4 block">Leadership</span>
              <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our leadership team brings together decades of experience in environmental consulting, engineering, and project management.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="team-card group"
                  data-testid={`team-member-${index}`}
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    {member.image_url ? (
                      <img
                        src={member.image_url}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#064E3B] to-[#4D7C0F] flex items-center justify-center">
                        <span className="font-outfit text-5xl font-bold text-white/20">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="font-outfit font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-[#4D7C0F] text-sm mb-2">{member.role}</p>
                    <p className="text-gray-500 text-sm">{member.expertise}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/team"
                className="btn-secondary inline-flex items-center gap-2"
              >
                View Full Team
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-[#064E3B]" data-testid="about-cta">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-white mb-4">
              Partner With Us
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Discover how GreenDev Associates can help you achieve your environmental and sustainability goals.
            </p>
            <Link
              to="/contact"
              className="bg-white text-[#064E3B] px-8 py-3 font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              data-testid="about-contact-btn"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
