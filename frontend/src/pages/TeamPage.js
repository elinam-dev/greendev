import teamBg from '../image/team.jpg';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, LinkedinLogo, Envelope } from '@phosphor-icons/react';

const TEAM = [
  { id: '1', name: 'Edward Kojo Anagbo', role: 'Managing Director', expertise: 'Environmental Sustainability Practitioner', order: 1 },
  { id: '2', name: 'Emmanuel Okoh Agyemang', role: 'Partner/Principal Consultant', expertise: 'Sanitation Engineering Specialist', order: 2 },
  { id: '3', name: 'Dr. Elvis Nyarko', role: 'Senior Consultant', expertise: 'Marine Ecology', order: 3 },
  { id: '4', name: 'Steven Albert Tsike Kwadwo', role: 'Senior Consultant', expertise: 'Ecologist', order: 4 },
  { id: '5', name: 'Isaac Simpson', role: 'Senior Consultant', expertise: 'Health and Safety Specialist', order: 5 },
  { id: '6', name: 'Delali Gamor', role: 'Associate Consultant', expertise: 'Coastal Zone Management Specialist', order: 6 },
  { id: '7', name: 'Jalel Moujaled', role: 'Associate Consultant', expertise: 'Renewable Energy Specialist', order: 7 },
  { id: '8', name: 'Nathaniel Sackey', role: 'Associate Consultant', expertise: 'Environmental Geology Expert', order: 8 },
  { id: '9', name: 'Isaac Edem Bibah', role: 'Project Manager', expertise: 'Stakeholder Engagement Practitioner', order: 9 },
  { id: '10', name: 'Nana Yaw Wiafe', role: 'Lab Technician', expertise: 'Air Quality, Wastewater and Noise Monitoring Specialist', order: 10 },
  { id: '11', name: 'Florence Amponsah', role: 'Research Assistant', expertise: 'Research and Data Collection', order: 11 },
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
      <div className="w-full h-full bg-gradient-to-br from-[#064E3B] to-[#4D7C0F] flex items-center justify-center">
        <span className="font-outfit text-5xl font-bold text-white/20">
          {member.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
    </div>
    <div className="p-6 bg-white border border-gray-100 border-t-0">
      <h3 className="font-outfit text-lg font-semibold text-gray-900">{member.name}</h3>
      <p className="text-[#4D7C0F] text-sm font-medium mb-1">{member.role}</p>
      <p className="text-gray-500 text-sm mb-4">{member.expertise}</p>
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
        <img src={teamBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#064E3B]" style={{ opacity: 0.75 }} />
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
          {/* Leadership Team */}
          <div className="mb-16">
            <h2 className="font-outfit text-2xl font-bold text-gray-900 mb-8 text-center">Leadership Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.filter(m => m.order <= 2).map((member, index) => (
                <TeamCard key={member.id} member={member} index={index} testId={`team-leader-${index}`} />
              ))}
            </div>
          </div>

          {/* Consultants & Staff */}
          <div>
            <h2 className="font-outfit text-2xl font-bold text-gray-900 mb-8 text-center">Consultants & Staff</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.filter(m => m.order > 2).map((member, index) => (
                <TeamCard key={member.id} member={member} index={index} testId={`team-consultant-${index}`} />
              ))}
            </div>
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
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
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
              to="/contact"
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
