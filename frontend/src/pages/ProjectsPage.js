import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Funnel } from '@phosphor-icons/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const ALL_PROJECTS = [
  { id: '1', client_name: 'Puma Energy Ghana Limited / Blue Ocean Investments Limited', project_type: 'Environmental Impact Assessment', location: 'Tema, Ghana', summary: 'EIA for Proposed Dual 3.2km LPG/Fuel Underground Pipeline Project connecting Tema Oil Refinery and Kpone Marine Services Limited in Tema Heavy Industrial Area.', year: 2016, industry: 'Oil & Gas', featured: true },
  { id: '2', client_name: 'Puma Energy Ghana Limited', project_type: 'Environmental Management Plan', location: 'Tema Free Zones, Ghana', summary: 'Preparation of EMP for 15 million litre aviation fuel tank farm at Tema Free Zones.', year: 2017, industry: 'Oil & Gas', featured: true },
  { id: '3', client_name: 'Enclave Power Company', project_type: 'Environmental & Social Impact Assessment', location: 'Greater Accra, Ghana', summary: 'ESIA for a 396 MVA Power Substation for the 2000-acre Dawa Industrial City project in the Greater Accra Region.', year: 2017, industry: 'Energy', featured: true },
  { id: '4', client_name: 'Devtraco Limited', project_type: 'Environmental Management Plan & Annual Environmental Report', location: 'Tema Community 25, Ghana', summary: 'Annual Environmental Report and Wastewater/StormWater Management Action Plan for 203-acre Devtraco Courts Residential Estate & Housing Project.', year: 2017, industry: 'Built Environment', featured: true },
  { id: '5', client_name: 'Devtraco Limited', project_type: 'Comprehensive Waste Management Plan', location: 'Prampram, Ghana', summary: 'Comprehensive Waste Management Plan for 5000-Homes Devtraco Woodlands project on a 1000-acre land.', year: 2018, industry: 'Built Environment', featured: true },
  { id: '6', client_name: 'Africa Cement Factory Limited', project_type: 'Environmental Impact Assessment', location: 'Tema Free Zones, Ghana', summary: 'EIA for proposed Cement Grinding station at Tema Free Zones Enclave.', year: 2019, industry: 'Manufacturing', featured: true },
  { id: '7', client_name: 'Kasapreko Company Limited', project_type: 'Environmental Management Plan', location: 'Spintex, Accra, Ghana', summary: 'Preparation of EMP to renew permit for alcoholic beverage, non-alcoholic beverage and bottled water plant.', year: 2020, industry: 'Manufacturing', featured: false },
  { id: '8', client_name: 'AMPC International Health Consultants / New Crystal Health Services', project_type: 'Environmental & Social Impact Assessment', location: 'Ghana', summary: 'ESIA and Life and Fire Safety services for expansion of 2 hospitals and construction of 2 new hospitals.', year: 2020, industry: 'Built Environment', featured: false },
  { id: '9', client_name: 'Yantai Chemicals Limited', project_type: 'Environmental and Social Impact Assessment', location: 'Lorlorvor, Ghana', summary: 'ESIA for proposed caustic soda manufacturing plant.', year: 2019, industry: 'Manufacturing', featured: false },
  { id: '10', client_name: 'Green Cross Burkina Faso / Amya Agro Plus', project_type: 'Environmental & Social Impact Assessment', location: 'Burkina Faso', summary: 'ESIA Report for multi-cassava plantation and processing unit.', year: 2018, industry: 'Agriculture', featured: false },
  { id: '11', client_name: 'Octoglow Ghana Limited / Murphy Homes Limited', project_type: 'Environmental & Social Impact Assessment', location: 'Tema Community 21, Ghana', summary: 'ESIA including liaison services for acquisition of environmental permit for the proposed 125-acre Avilla Gardens estate project.', year: 2017, industry: 'Built Environment', featured: false },
  { id: '12', client_name: 'Ferro Fabrik Limited', project_type: 'Environmental & Social Impact Assessment', location: 'Tema Free Zones, Ghana', summary: 'ESIA for proposed Iron Rod Manufacturing Facility in Tema Free Zones Enclave.', year: 2018, industry: 'Manufacturing', featured: false },
  { id: '13', client_name: 'Vester Oil Mills Limited', project_type: 'Environmental Management Plan', location: 'Ashanti Region, Ghana', summary: 'EMP for soya oil processing plant and Vegetable Oil Extraction factory.', year: 2019, industry: 'Agriculture', featured: false },
  { id: '14', client_name: 'Ghana Steels Limited', project_type: 'Environmental Management Plan', location: 'Kpone, Ghana', summary: 'EMP to renew permit for steel products and plastic recycling factories.', year: 2020, industry: 'Manufacturing', featured: false },
  { id: '15', client_name: 'Atlantic Quarry Limited', project_type: 'Environmental Management Plan & Monitoring', location: 'Huapase, Ghana', summary: 'EMP and Environmental Monitoring Report for quarry operations.', year: 2019, industry: 'Mining', featured: false },
];

const ProjectsPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const industries = ['Manufacturing', 'Oil & Gas', 'Mining', 'Agriculture', 'Energy', 'Built Environment'];

  const filteredProjects = useMemo(() => {
    if (selectedIndustry === 'all') return ALL_PROJECTS;
    return ALL_PROJECTS.filter(p => p.industry === selectedIndustry);
  }, [selectedIndustry]);

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
                {industries.map((industry) => (
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
