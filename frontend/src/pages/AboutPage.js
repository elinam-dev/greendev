import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  ArrowRight, 
  Target, 
  Eye, 
  Handshake,
  CheckCircle,
  Quotes
} from '@phosphor-icons/react';
import StatsCounter from '../components/shared/StatsCounter';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AboutPage = () => {
  const [stats, setStats] = useState(null);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, teamRes] = await Promise.all([
          axios.get(`${API_URL}/api/stats`),
          axios.get(`${API_URL}/api/team`)
        ]);
        setStats(statsRes.data);
        setTeam(teamRes.data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

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
      <section className="relative py-32 bg-[#064E3B]" data-testid="about-hero">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="overline text-[#D4A373] mb-4 block">About Us</span>
            <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Pioneering Environmental Excellence in Africa
            </h1>
            <p className="text-white/80 text-lg md:text-xl">
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
              <p className="text-gray-600 leading-relaxed mb-6">
                GreenDev Associates International Limited is an associate-based sustainability consultancy registered in Ghana. We specialize in delivering comprehensive environmental and engineering solutions to industries including manufacturing, oil & gas, mining, agriculture, energy, and infrastructure development.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our team comprises experienced environmental scientists, engineers, and industry specialists who bring together technical expertise and practical industry knowledge to deliver solutions that meet both regulatory requirements and business objectives.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We have successfully completed over 500 projects across West Africa, establishing ourselves as a trusted partner for multinational corporations seeking reliable environmental consulting services.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1612408934218-916d7b033df3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwc2NpZW50aXN0JTIwZmllbGQlMjB3b3JrfGVufDB8fHx8MTc3NTgzNTEzOHww&ixlib=rb-4.1.0&q=85"
                alt="Environmental consultant at work"
                className="w-full h-[500px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-[#F9FAFB]" data-testid="vision-mission">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 md:p-12 border border-gray-100"
            >
              <div className="w-14 h-14 bg-[#F0FDF4] flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-[#064E3B]" weight="duotone" />
              </div>
              <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be Africa's most trusted environmental and sustainability consultancy, setting the benchmark for scientific excellence and practical solutions that enable sustainable development across the continent.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 md:p-12 border border-gray-100"
            >
              <div className="w-14 h-14 bg-[#F0FDF4] flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[#064E3B]" weight="duotone" />
              </div>
              <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To deliver innovative, science-based environmental and engineering solutions that help our clients achieve regulatory compliance, operational excellence, and sustainable growth while protecting the environment and communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter stats={stats} />

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
                "At GreenDev Associates, we believe that environmental stewardship and economic development are not mutually exclusive. Our mission is to help organizations navigate the complex landscape of environmental regulations while achieving their business objectives."
              </blockquote>
              <div>
                <p className="font-outfit font-semibold text-gray-900">Dr. Kwame Mensah</p>
                <p className="text-gray-500">Managing Director</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
