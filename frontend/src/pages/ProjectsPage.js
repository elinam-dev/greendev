import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, MapPin, Calendar, Funnel } from '@phosphor-icons/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const industries = [
    'All Industries',
    'Manufacturing',
    'Oil & Gas',
    'Mining',
    'Agriculture',
    'Energy',
    'Infrastructure Development'
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/projects`);
        setProjects(response.data);
        setFilteredProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedIndustry === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.industry === selectedIndustry));
    }
  }, [selectedIndustry, projects]);

  return (
    <div className="min-h-screen" data-testid="projects-page">
      {/* Hero Section */}
      <section className="relative py-32 bg-[#064E3B]" data-testid="projects-hero">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="overline text-[#D4A373] mb-4 block">Our Work</span>
            <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Projects & Case Studies
            </h1>
            <p className="text-white/80 text-lg md:text-xl">
              Explore our portfolio of successful environmental and engineering projects delivered across West Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-[#F9FAFB] border-b border-gray-200" data-testid="projects-filter">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Funnel className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 font-medium">Filter by Industry:</span>
            </div>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-[250px]" data-testid="industry-filter">
                <SelectValue placeholder="Select Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                {industries.slice(1).map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-white" data-testid="projects-grid">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="spinner" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">No projects found for the selected industry.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="project-card group"
                  data-testid={`project-card-${index}`}
                >
                  <div className="h-48 bg-gradient-to-br from-[#064E3B] to-[#4D7C0F] flex items-center justify-center relative overflow-hidden">
                    <span className="font-outfit text-6xl font-bold text-white/10">
                      {project.client_name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </span>
                    {project.featured && (
                      <span className="absolute top-4 right-4 bg-[#D4A373] text-white text-xs px-3 py-1 font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-[#4D7C0F] uppercase tracking-wider">
                      {project.industry}
                    </span>
                    <h3 className="font-outfit text-xl font-semibold text-gray-900 mt-2 mb-2">
                      {project.client_name}
                    </h3>
                    <p className="text-[#064E3B] font-medium text-sm mb-3">
                      {project.project_type}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {project.summary}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#064E3B]" data-testid="projects-stats">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Projects Completed' },
              { value: '6', label: 'Industries Served' },
              { value: '100%', label: 'Client Satisfaction' },
              { value: '15+', label: 'Countries' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <p className="font-outfit text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-white" data-testid="projects-cta">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Have a Similar Project?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Let us bring our expertise to your next environmental or engineering project.
            </p>
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center gap-2"
              data-testid="projects-contact-btn"
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

export default ProjectsPage;
