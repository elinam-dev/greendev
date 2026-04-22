import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Funnel } from '@phosphor-icons/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const ALL_PROJECTS = [
  { id: '1', client_name: 'Puma Energy Ghana Limited / Blue Ocean Investments Limited', project_type: 'Environmental Impact Assessment', location: 'Tema, Ghana', summary: 'EIA for Proposed Dual 3.2km LPG/Fuel Underground Pipeline Project to connect Tema Oil Refinery and Kpone Marine Services Limited in Tema Heavy Industrial Area.', year: 2016, industry: 'Oil & Gas', featured: true, contact: 'Edward Debrah, Retail Growth Specialist' },
  { id: '2', client_name: 'Puma Energy Ghana Limited / Blue Ocean Investments Limited', project_type: 'Annual Environmental Report & Environmental Management Plan', location: 'Accra / Tema Free Zones, Ghana', summary: 'Preparation of Annual Environmental Report for Aviation Fuel Tank Farm at Accra Airport Area and EMP for 15 million litre aviation fuel tank farm at Tema Free Zones.', year: 2017, industry: 'Oil & Gas', featured: true, contact: 'Edward Debrah, Retail Growth Specialist' },
  { id: '3', client_name: 'Enclave Power Company', project_type: 'Environmental & Social Impact Assessment', location: 'Greater Accra, Ghana', summary: 'ESIA for a 396 MVA Power Substation for the 2000-acre Dawa Industrial City project in the Greater Accra Region.', year: 2017, industry: 'Energy', featured: true, contact: 'Lord Otoo, Project Engineer' },
  { id: '4', client_name: 'Enclave Power Company', project_type: 'Environmental Management Plan', location: 'Dawa, Ghana', summary: 'Environmental Management Plan to renew permit for Dawa Substation (Bulk Supply Point).', year: 2020, industry: 'Energy', featured: false, contact: 'Frank Yirenkyi, HSE Manager' },
  { id: '5', client_name: 'Devtraco Limited', project_type: 'Environmental Management Plan & Annual Environmental Report', location: 'Tema Community 25, Ghana', summary: 'Preparation of Annual Environmental Report and Wastewater and StormWater Management Action Plan for 203-acre Devtraco Courts Residential Estate & Housing Project.', year: 2017, industry: 'Built Environment', featured: true, contact: 'Chuka Ajekwu, General Manager' },
  { id: '6', client_name: 'Devtraco Limited', project_type: 'Environmental Management Plan & Annual Environmental Report', location: 'Tema Community 25, Ghana', summary: 'Preparation of Environmental Management Plan and Annual Environmental Report for Devtraco Courts.', year: 2019, industry: 'Built Environment', featured: false, contact: 'Kenneth Ofori, Administrative Manager' },
  { id: '7', client_name: 'Devtraco Limited', project_type: 'Comprehensive Waste Management Plan', location: 'Prampram, Ghana', summary: 'Preparation of Comprehensive Waste Management Plan & Guideline for 5000-Homes project christened Devtraco Woodlands on a 1000-acre land at Prampram.', year: 2018, industry: 'Built Environment', featured: true, contact: 'Lawrence Asante, Business Dev. Manager' },
  { id: '8', client_name: 'Devtraco Plus Limited', project_type: 'Preliminary Environmental Report & Waste Management Plan', location: 'Roman Ridge, Accra', summary: 'Preparation of Preliminary Environmental Report, Comprehensive Waste Management Plan and Guideline for 10-storey mixed use Project christened NoVA at Roman Ridge, Accra.', year: 2018, industry: 'Built Environment', featured: false, contact: 'Lawrence Asante, Business Dev. Manager' },
  { id: '9', client_name: 'Devtraco Plus Limited', project_type: 'Environmental Assessment & Permit Acquisition', location: 'Lashibi / Cantonments, Ghana', summary: 'Environmental Assessment and permit acquisition for Multi-Family Housing Project at Lashibi, 4-Storey Mixed Use Project in West Cantonments, and Waste Management Plan for East Cantonments Village project.', year: 2017, industry: 'Built Environment', featured: false, contact: 'Lawrence Asante, Business Dev. Manager' },
  { id: '10', client_name: 'Africa Cement Factory Limited', project_type: 'Environmental Impact Assessment', location: 'Tema Free Zones, Ghana', summary: 'EIA for proposed Cement Grinding station at Tema Free Zones Enclave.', year: 2019, industry: 'Manufacturing', featured: true, contact: 'Ahmed Dodo, Project Architect' },
  { id: '11', client_name: 'AMPC International Health Consultants / New Crystal Health Services', project_type: 'Environmental & Social Impact Assessment', location: 'Ghana', summary: 'ESIA and Life and Fire Safety services for expansion of 2 hospitals and construction of 2 new hospitals to obtain environmental permits and fire permits.', year: 2020, industry: 'Built Environment', featured: false, contact: 'Kwame Akwaboah, Lead Project Engineer' },
  { id: '12', client_name: 'Ghana Steels Limited', project_type: 'Environmental Management Plan', location: 'Kpone, Ghana', summary: 'Preparation of Environmental Management Plan to renew permit for steel products and plastic recycling factories at Kpone.', year: 2020, industry: 'Manufacturing', featured: false, contact: 'Harish Chandra, Operations Manager' },
  { id: '13', client_name: 'Three Dreamer Company Limited', project_type: 'Environmental Management Plan', location: 'Tema Free Zones, Ghana', summary: 'Preparation of Environmental Management Plan to renew permit for T-Roll processing plant at Tema Free Zones.', year: 2020, industry: 'Manufacturing', featured: false, contact: 'Eric Oppong, HSE Officer' },
  { id: '14', client_name: 'Ayaan Global Ghana Limited', project_type: 'Environmental Management Plan', location: 'Tema Free Zones, Ghana', summary: 'Preparation of Environmental Management Plan to renew permit for aluminum ingot processing plant at Tema Free Zones.', year: 2020, industry: 'Manufacturing', featured: false, contact: 'Rupesh Kumar, Director' },
  { id: '15', client_name: 'Kasapreko Company Limited', project_type: 'Environmental Management Plan', location: 'Spintex, Accra, Ghana', summary: 'Preparation of Environmental Management Plan to renew permit for alcoholic beverage, non-alcoholic beverage and bottled water plant at Spintex.', year: 2020, industry: 'Manufacturing', featured: false, contact: 'Nana Agyeiwaa Boakye, Group HSE Manager' },
  { id: '16', client_name: 'Western Rod and Wire Limited', project_type: 'Environmental Management Plan', location: 'Kpone Industrial Area, Ghana', summary: 'Preparation of Environmental Management Plan to renew permit for metal cables and ingot plant at Kpone Industrial Area.', year: 2020, industry: 'Manufacturing', featured: false, contact: 'Shirley Asafoa, Quality Assurance Manager' },
  { id: '17', client_name: 'Reroy Cables Limited', project_type: 'Environmental Management Plan', location: 'Tema Industrial Area, Ghana', summary: 'Preparation of Environmental Management Plan to renew permit for aluminium and copper cables at Tema Industrial Area.', year: 2020, industry: 'Manufacturing', featured: false, contact: 'Seth Offer, Plant Manager' },
  { id: '18', client_name: 'New Star Poly Products Limited', project_type: 'Environmental Management Plan', location: 'Tema Community 25, Ghana', summary: 'Preparation of Environmental Management Plan to renew permit for plastic products manufacturing plant at Tema Community 25.', year: 2020, industry: 'Manufacturing', featured: false, contact: 'Karan Chimmani, Director' },
  { id: '19', client_name: 'Success Aluminium Limited', project_type: 'Environmental Management Plan', location: 'Tema Free Zones, Ghana', summary: 'Preparation of Environmental Management Plan to renew permit for aluminum utensils plant at Tema Free Zones Enclave.', year: 2020, industry: 'Manufacturing', featured: false, contact: 'Akesh Patel, Purchase Manager' },
  { id: '20', client_name: 'Yantai Chemicals Limited', project_type: 'Environmental and Social Impact Assessment', location: 'Lorlorvor, Ghana', summary: 'ESIA for proposed caustic soda manufacturing plant at Lorlorvor.', year: 2019, industry: 'Manufacturing', featured: false, contact: 'Emmanuel Adjei-Boye, Managing Director' },
  { id: '21', client_name: 'Vester Oil Mills Limited', project_type: 'Environmental Management Plan', location: 'Ashanti Region, Ghana', summary: 'Preparation of EMP for soya oil processing plant at Deduako and EMP & AER for Vegetable Oil Extraction factory at Abountem in the Bosomtwe District.', year: 2019, industry: 'Agriculture', featured: false, contact: 'Kwasi Nyamekye, Managing Director' },
  { id: '22', client_name: 'Atlantic Quarry Limited', project_type: 'Environmental Management Plan & Monitoring Report', location: 'Huapase, Ghana', summary: 'Preparation of Environmental Management Plan and Environmental Monitoring Report for Huapase-based Quarry.', year: 2019, industry: 'Mining', featured: false, contact: 'Frank Yirenky, HSE Supervisor' },
  { id: '23', client_name: 'Ussuya Ghana Limited', project_type: 'Environmental Management Plan & Monitoring Report', location: 'Shai Hills / Kwapia, Ghana', summary: 'EMP and Environmental Monitoring Report for Shai Hills-based Quarry, Kwapia-based Quarry, and Waste Management Plan for proposed Clinic at Tema Community 12.', year: 2019, industry: 'Mining', featured: false, contact: 'Anas Yakubu, Operations Manager' },
  { id: '24', client_name: 'Cheshire Quarry Limited', project_type: 'Environmental Management Plan & Monitoring Report', location: 'Shai Hills, Ghana', summary: 'Preparation of Environmental Management Plan, Annual Environmental Report and Environmental Monitoring Report for Shai Hills-based Quarry.', year: 2019, industry: 'Mining', featured: false, contact: 'Augustus Mensah, General Manager' },
  { id: '25', client_name: 'Green Cross Burkina Faso / Amya Agro Plus', project_type: 'Environmental & Social Impact Assessment', location: 'Burkina Faso', summary: 'Partner Associate for preparation of ESIA Report for multi-cassava plantation and processing unit.', year: 2018, industry: 'Agriculture', featured: false, contact: 'Andre Batiano, Director (AMYA)' },
  { id: '26', client_name: 'Ferro Fabrik Limited', project_type: 'Environmental & Social Impact Assessment', location: 'Tema Free Zones, Ghana', summary: 'Preparation of ESIA for proposed Iron Rod Manufacturing Facility in Tema Free Zones Enclave and Annual Environmental Report for Iron Rod Smelting factory at Tema Heavy Industrial Area.', year: 2018, industry: 'Manufacturing', featured: false, contact: 'Abraham Gaisie, General Manager' },
  { id: '27', client_name: 'International Warehouse Company', project_type: 'Annual Environmental Report', location: 'Tema Free Zones, Ghana', summary: 'Preparation of Annual Environmental Report & liaison services to renew permits for Montreal Street Warehouse (24,500 sqm) & Mega Warehouse (92,000 sqm) in Tema Free Zones Enclave.', year: 2018, industry: 'Built Environment', featured: false, contact: 'Raphael Kpeli, Commercial Manager' },
  { id: '28', client_name: 'M. Barbisotti and Sons Limited', project_type: 'Annual Environmental Report', location: 'Tema, Ghana', summary: 'Preparation of Annual Environmental Report for Tema Community 4 based warehouse and office facility and Tema Motorway Industrial Area facility.', year: 2018, industry: 'Built Environment', featured: false, contact: 'Federico Barbisotti, Director' },
  { id: '29', client_name: 'Octoglow Ghana Limited / Murphy Homes Limited', project_type: 'Environmental & Social Impact Assessment', location: 'Tema Community 21, Ghana', summary: 'ESIA including liaison services for acquisition of environmental permit for the proposed 125-acre Avilla Gardens estate project in Tema Community 21.', year: 2017, industry: 'Built Environment', featured: false, contact: 'Fred Baah, Business Manager' },
  { id: '30', client_name: 'Weave Ghana Limited', project_type: 'Environmental Media Monitoring', location: 'Spintex, Tema, Ghana', summary: 'Environmental Media Monitoring and Reporting for Ambient Air Quality, Noise Level and Effluent sampling & Analysis for synthetic hair manufacturing factory at Spintex.', year: 2017, industry: 'Manufacturing', featured: false, contact: 'Emmanuel Opong, Human Resource Dept.' },
  { id: '31', client_name: 'Camelot Ghana Limited', project_type: 'Environmental Monitoring & Reporting', location: 'Osu-La Road, Ghana', summary: 'Monitoring and Reporting of Ambient Air Quality, Noise and Effluent Analysis for printing facility located at Osu-La Road.', year: 2018, industry: 'Manufacturing', featured: false, contact: 'Nancy Obeng, Compliance Officer' },
  { id: '32', client_name: 'Badu Kaakyire', project_type: 'Preliminary Environmental Report', location: 'Pantang, Ghana', summary: 'Preparation of Preliminary Environmental Report for proposed construction of five units of 4-storey apartments and shopping centre at Pantang.', year: 2019, industry: 'Built Environment', featured: false, contact: 'Badu Kaakyire, Developer' },
  { id: '33', client_name: 'Platinum Seal Limited / Core Construction Limited', project_type: 'Preliminary Environmental Report', location: 'Kpone, Ghana', summary: 'Preparation of Preliminary Environmental Report and liaison services to obtain EPA permit for Asphalt Plant located at Kpone.', year: 2017, industry: 'Manufacturing', featured: false, contact: 'Frank Lartey, Managing Director' },
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
      <section className="relative py-32 overflow-hidden" data-testid="projects-hero">
        <img src="/images/projects.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#064E3B]" style={{ opacity: 0.5 }} />
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
                    {project.contact && (
                      <p className="text-xs text-gray-400 mt-2 pt-2 border-t border-gray-50">Contact: {project.contact}</p>
                    )}
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
