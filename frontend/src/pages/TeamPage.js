import edwardImg from '../team/Edward.jpg';
import augustaImg from '../team/augusta.jpg';
import adrianaImg from '../team/adriana.jpg';
import jacintaImg from '../team/jacinta.jpg';
import isaacImg from '../team/Isaac.jpg';
import godsonImg from '../team/Godson.jpg';
import joshuaImg from '../team/Joshua.jpg';
import oliverImg from '../team/Oliver.jpg';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, LinkedinLogo, Envelope } from '@phosphor-icons/react';

const TEAM = [
  { id: '6', name: 'Edward Kojo Anagbo', role: 'Managing Director', expertise: 'Environmental Sustainability Practitioner', image_url: edwardImg, order: 1 },
  { id: '12', name: 'Isaac Bibah', role: 'Operations Manager', expertise: 'Operations & Project Coordination', image_url: isaacImg, order: 2 },
  { id: '2', name: 'Joshua Dakorah', role: 'Fields Manager', expertise: 'Quality Expert', image_url: joshuaImg, order: 3 },
  { id: '3', name: 'Jacinta Gbadegbe', role: 'Business Development & Client Relations', expertise: 'Business', image_url: jacintaImg, order: 4 },
  { id: '4', name: 'Augusta Gyinae', role: 'Consultant', expertise: 'Environmental Consulting', image_url: augustaImg, order: 5 },
  { id: '14', name: 'David A. Osamu', role: 'Consultant', expertise: 'Environmental Consulting', image_url: null, order: 6 },
  { id: '5', name: 'Oliver Gator', role: 'Environmental Quality Analyst', expertise: null, image_url: oliverImg, order: 7 },
  { id: '13', name: 'Adriana Parker-Benin', role: 'Admin', expertise: 'Administration', image_url: adrianaImg, order: 7 },
  { id: '11', name: 'Godson Amanie', role: 'Transport and Logistics Officer', expertise: 'Transport and Logistics', image_url: godsonImg, order: 8 },
  { id: '7', name: 'Emmanuel Okoh Agyemang', role: 'Associate Consultant', expertise: 'Hydrologist', image_url: null, order: 9 },
  { id: '8', name: 'Dr. Elvis Nyarko', role: 'Associate Consultant', expertise: 'Marine Ecology', image_url: null, order: 10 },
  { id: '9', name: 'Steven Albert Tsike Kwadwo', role: 'Associate Consultant', expertise: 'Ecologist', image_url: null, order: 11 },
  { id: '10', name: 'Delali Gamor', role: 'Associate Consultant', expertise: 'Coastal Zone Management Specialist', image_url: null, order: 12 },
];

const TeamCard = ({ member, index, testId }) => (
  <motion.div
    key={member.id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="team-card group"
    data-testid={testId}
  >
    <div className="aspect-square bg-gray-100 overflow-hidden">
      {member.image_url ? (
        <img src={member.image_url} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#064E3B] to-[#4D7C0F] flex items-center justify-center">
          <span className="font-outfit text-5xl font-bold text-white/20">
            {member.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
      )}
    </div>
    <div className="p-6 bg-white border border-gray-100 border-t-0">
      <h3 className="font-outfit text-lg font-semibold text-gray-900">{member.name}</h3>
      <p className="text-[#4D7C0F] text-sm font-medium mb-1">{member.role}</p>
      {member.expertise && <p className="text-gray-500 text-sm mb-4">{member.expertise}</p>}
      <div className="flex items-center gap-3">
        <a href="#" className="w-8 h-8 bg-gray-100 flex items-center justify-center hover:bg-[#064E3B] group/icon transition-colors">
          <LinkedinLogo className="w-4 h-4 text-gray-500 group-hover/icon:text-white transition-colors" />
        </a>
        <a href="#" className="w-8 h-8 bg-gray-100 flex items-center justify-center hover:bg-[#064E3B] group/icon transition-colors">
          <Envelope className="w-4 h-4 text-gray-500 group-hover/icon:text-white transition-colors" />
        </a>
      </div>
    </div>
  </motion.div>
);

const TeamPage = () => {
  const team = TEAM;

  return (
    <div className="min-h-screen" data-testid="team-page">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden" data-testid="team-hero">
        <img src="/images/team.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#064E3B]" style={{ opacity: 0.5 }} />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="overline text-[#D4A373] mb-4 block">Our Team</span>
            <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Meet the Experts Behind GreenDev
            </h1>
            <p className="text-white/80 text-lg md:text-xl">
              Our team of experienced environmental scientists, engineers, and consultants brings decades of combined expertise to every project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-padding bg-white" data-testid="team-grid">
        <div className="container-custom">
          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <TeamCard key={member.id} member={member} index={index} testId={`team-member-${index}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="section-padding bg-[#F9FAFB]" data-testid="join-team">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="overline mb-4 block">Careers</span>
              <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join Our Team</h2>
              <p className="text-gray-600 mb-8">
                We're always looking for talented environmental professionals and engineers to join our growing team. If you're passionate about sustainability and making a positive impact, we'd love to hear from you.
              </p>
              <Link to="/contact?message=I would like to get in touch with your team of experts." className="btn-primary inline-flex items-center gap-2">
                View Open Positions
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#064E3B]" data-testid="team-cta">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-white mb-4">Work With Our Experts</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Let our experienced team help you navigate your environmental and engineering challenges.
            </p>
            <Link
              to="/contact?message=I would like to work with your team of experts on my project."
              className="bg-white text-[#064E3B] px-8 py-3 font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              data-testid="team-contact-btn"
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

export default TeamPage;
