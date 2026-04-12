import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  ArrowRight, 
  Leaf, 
  Drop, 
  HardHat, 
  Lightbulb,
  Shield,
  ChartLineUp,
  Handshake,
  Quotes,
  CheckCircle,
  Star
} from '@phosphor-icons/react';
import StatsCounter from '../components/shared/StatsCounter';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const HomePage = () => {
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, projectsRes, testimonialsRes] = await Promise.all([
          axios.get(`${API_URL}/api/stats`),
          axios.get(`${API_URL}/api/projects?featured=true`),
          axios.get(`${API_URL}/api/testimonials`)
        ]);
        setStats(statsRes.data);
        setProjects(projectsRes.data);
        setTestimonials(testimonialsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const services = [
    {
      icon: Leaf,
      title: 'Environmental Impact Assessment',
      description: 'Comprehensive EIA studies ensuring regulatory compliance and sustainable development for all project types.',
      link: '/services#environmental'
    },
    {
      icon: HardHat,
      title: 'Engineering Solutions',
      description: 'Water, sanitation, and geotechnical engineering services for infrastructure and industrial projects.',
      link: '/services#engineering'
    },
    {
      icon: Lightbulb,
      title: 'Advisory Services',
      description: 'CSR development, feasibility studies, and professional capacity building programs.',
      link: '/services#advisory'
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'EPA Ghana Certified',
      description: 'Deep expertise in Ghana EPA regulations and international environmental standards.'
    },
    {
      icon: ChartLineUp,
      title: '100+ Projects Delivered',
      description: 'Proven track record across manufacturing, oil & gas, mining, and infrastructure sectors.'
    },
    {
      icon: Handshake,
      title: 'Client-Focused Approach',
      description: 'We work collaboratively, ensuring projects meet regulatory and business objectives.'
    },
    {
      icon: Star,
      title: 'Expert Team',
      description: '11+ specialists including ecologists, engineers, and sustainability practitioners.'
    }
  ];

  const clientLogos = [
    { name: 'Puma Energy', initial: 'PE', logo: null },
    { name: 'Devtraco', initial: 'DT', logo: null },
    { name: 'Kasapreko', initial: 'KC', logo: null },
    { name: 'Enclave Power', initial: 'EP', logo: null },
    { 
      name: 'AMPC Health', 
      initial: 'AI', 
      logo: 'https://customer-assets.emergentagent.com/job_sustainability-hub-52/artifacts/ktdv8xhh_Screenshot_12-4-2026_3324_www.bing.com.jpeg'
    },
    { 
      name: 'Int\'l Warehouse', 
      initial: 'IW', 
      logo: 'https://customer-assets.emergentagent.com/job_sustainability-hub-52/artifacts/g2z6mzb2_Screenshot_12-4-2026_4510_www.bing.com.jpeg'
    },
  ];

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section - Vibrant and High Contrast */}
      <section className="hero-section relative overflow-hidden" data-testid="hero-section">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.pexels.com/photos/9800116/pexels-photo-9800116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')` 
          }}
        />
        
        {/* Gradient Overlay - Better contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 via-emerald-800/90 to-emerald-900/70" />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 hero-pattern opacity-30" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10 pt-32 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm border border-amber-500/30 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-amber-300 text-sm font-semibold">Ghana's Premier Environmental Consultancy</span>
              </div>
              
              <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Leading Sustainable Solutions for{' '}
                <span className="text-amber-400">Environmental Excellence</span>
              </h1>
              
              <p className="text-emerald-100 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
                Delivering professional environmental consulting, engineering solutions, and advisory services to multinational corporations across Ghana and West Africa since 2016.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="btn-accent inline-flex items-center justify-center gap-2 group"
                  data-testid="hero-cta-consultation"
                >
                  Request Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/services"
                  className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 font-semibold rounded-lg hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
                  data-testid="hero-cta-services"
                >
                  Explore Services
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center gap-6 mt-10 pt-10 border-t border-white/20">
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-400">9+</p>
                  <p className="text-emerald-200 text-sm">Years Experience</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-400">100+</p>
                  <p className="text-emerald-200 text-sm">Projects Delivered</p>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-amber-400">6</p>
                  <p className="text-emerald-200 text-sm">Industries Served</p>
                </div>
              </div>
            </motion.div>
            
            {/* Hero Image/Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-2xl blur-2xl opacity-30" />
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                  <div className="space-y-6">
                    {[
                      'Environmental Impact Assessment',
                      'Social Impact Assessment', 
                      'Permit Acquisition Support',
                      'Water & Sanitation Engineering',
                      'CSR Program Development'
                    ].map((service, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/30 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-emerald-300" weight="fill" />
                        </div>
                        <span className="text-white font-medium">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <StatsCounter stats={stats} />

      {/* About Preview - Cream Background */}
      <section className="section-padding section-cream relative overflow-hidden" data-testid="about-preview-section">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600 to-amber-500 rounded-2xl blur-xl opacity-20" />
              <img
                src="https://images.unsplash.com/photo-1612408934218-916d7b033df3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwc2NpZW50aXN0JTIwZmllbGQlMjB3b3JrfGVufDB8fHx8MTc3NTgzNTEzOHww&ixlib=rb-4.1.0&q=85"
                alt="Environmental consultant at work"
                className="relative w-full h-[450px] object-cover rounded-2xl shadow-2xl"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-8 -right-8 bg-white rounded-xl p-6 shadow-2xl max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Leaf className="w-7 h-7 text-white" weight="fill" />
                  </div>
                  <div>
                    <p className="font-outfit text-2xl font-bold text-gray-900">Since 2016</p>
                    <p className="text-gray-500 text-sm">Trusted by Industry Leaders</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="overline mb-4 block">About GreenDev Associates</span>
              <h2 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Your Trusted Partner in{' '}
                <span className="text-gradient">Sustainability</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                GreenDev Associates International Limited is a Ghanaian sustainability consultancy providing professional and practicable guidance for companies to ensure sustainable development at all stages of the project cycle.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our team of 11+ specialists includes environmental scientists, sanitation engineers, marine ecologists, and health & safety experts delivering world-class solutions across manufacturing, oil & gas, mining, and infrastructure sectors.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {['EPA Ghana Certified', 'ISO Compliant', 'Multinational Clients', 'West Africa Coverage'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" weight="fill" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              
              <Link
                to="/about"
                className="btn-primary inline-flex items-center gap-2 group"
                data-testid="about-learn-more"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - White with accent borders */}
      <section className="section-padding section-light" data-testid="services-section">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="overline mb-4 block">Our Services</span>
            <h2 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Environmental & Engineering{' '}
              <span className="text-gradient">Solutions</span>
            </h2>
            <p className="text-gray-600 text-lg">
              From environmental assessments to engineering design, we provide end-to-end solutions for sustainable development.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="service-card group rounded-xl"
                data-testid={`service-card-${index}`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <service.icon className="w-8 h-8 text-white" weight="duotone" />
                </div>
                <h3 className="font-outfit text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:text-amber-500 transition-colors"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="btn-secondary inline-flex items-center gap-2"
              data-testid="services-view-all"
            >
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Light Green */}
      <section className="section-padding section-light-green" data-testid="why-choose-section">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="overline mb-4 block">Why Choose GreenDev</span>
            <h2 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Trusted by{' '}
              <span className="text-gradient-gold">Industry Leaders</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 text-center group"
                data-testid={`why-choose-item-${index}`}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <item.icon className="w-8 h-8 text-white" weight="fill" />
                </div>
                <h4 className="font-outfit font-bold text-gray-900 mb-2 text-lg">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects - Gray Background */}
      <section className="section-padding section-gray" data-testid="projects-section">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <span className="overline mb-4 block">Our Work</span>
              <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900">
                Featured <span className="text-gradient">Projects</span>
              </h2>
            </div>
            <Link
              to="/projects"
              className="btn-secondary mt-4 md:mt-0 inline-flex items-center gap-2"
              data-testid="projects-view-all"
            >
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="project-card group rounded-xl overflow-hidden"
                data-testid={`project-card-${index}`}
              >
                <div className="h-48 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent)]" />
                  <span className="font-outfit text-5xl font-bold text-white/20">
                    {project.client_name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                  {project.featured && (
                    <span className="absolute top-4 right-4 badge-featured rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <span className="badge-industry">
                    {project.industry}
                  </span>
                  <h3 className="font-outfit text-lg font-bold text-gray-900 mt-3 mb-2">
                    {project.client_name}
                  </h3>
                  <p className="text-emerald-600 font-medium text-sm mb-3">
                    {project.project_type}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.summary}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <span>{project.location}</span>
                    <span className="font-semibold">{project.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos - White */}
      <section className="py-20 section-light" data-testid="clients-section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="overline mb-4 block">Our Clients</span>
            <h2 className="font-outfit text-2xl md:text-3xl font-bold text-gray-900">
              Trusted by Leading Organizations
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            {clientLogos.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-32 h-32 md:w-40 md:h-40 bg-gray-50 rounded-xl flex items-center justify-center group hover:bg-emerald-600 transition-all duration-300 shadow-sm hover:shadow-xl p-4"
                data-testid={`client-logo-${index}`}
              >
                {client.logo ? (
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    className="max-w-full max-h-full object-contain group-hover:brightness-0 group-hover:invert transition-all duration-300"
                  />
                ) : (
                  <span className="font-outfit text-2xl md:text-3xl font-bold text-gray-400 group-hover:text-white transition-colors">
                    {client.initial}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/clients" className="text-emerald-600 font-semibold hover:text-amber-500 transition-colors inline-flex items-center gap-2">
              View All Clients
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - Cream */}
      {testimonials.length > 0 && (
        <section className="section-padding section-cream" data-testid="testimonials-section">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="overline mb-4 block">Client Testimonials</span>
              <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900">
                What Our Clients Say
              </h2>
            </div>

            <Carousel className="max-w-4xl mx-auto">
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={testimonial.id}>
                    <div className="testimonial-card shadow-xl mx-4">
                      <div className="relative z-10">
                        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 italic">
                          "{testimonial.content}"
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-outfit font-bold text-gray-900">{testimonial.name}</p>
                            <p className="text-gray-500 text-sm">
                              {testimonial.role}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </section>
      )}

      {/* CTA Section - Vibrant Gradient */}
      <section className="py-24 relative overflow-hidden" data-testid="cta-section">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700" />
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-outfit text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Partner with Ghana's leading environmental consultancy for your next project. Let's discuss how we can help you achieve your sustainability goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-accent inline-flex items-center justify-center gap-2"
                data-testid="cta-contact"
              >
                Contact Us Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 font-semibold rounded-lg hover:bg-white/20 transition-all"
              >
                Explore Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
