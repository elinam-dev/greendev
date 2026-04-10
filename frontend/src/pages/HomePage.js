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
  Quotes
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
      description: 'Comprehensive EIA studies ensuring regulatory compliance and sustainable development.',
      link: '/services#environmental'
    },
    {
      icon: HardHat,
      title: 'Engineering Solutions',
      description: 'Water, sanitation, and geotechnical engineering services for infrastructure projects.',
      link: '/services#engineering'
    },
    {
      icon: Lightbulb,
      title: 'Advisory Services',
      description: 'CSR development, feasibility studies, and capacity building training programs.',
      link: '/services#advisory'
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Regulatory Expertise',
      description: 'Deep understanding of Ghana EPA and international environmental standards.'
    },
    {
      icon: ChartLineUp,
      title: 'Proven Track Record',
      description: 'Over 500 successful projects across multiple industries in West Africa.'
    },
    {
      icon: Handshake,
      title: 'Client Partnership',
      description: 'Collaborative approach ensuring projects meet both regulatory and business objectives.'
    }
  ];

  const clientLogos = [
    { name: 'Puma Energy', initial: 'PE' },
    { name: 'Devtraco', initial: 'DT' },
    { name: 'Kasapreko', initial: 'KP' },
    { name: 'Enclave Power', initial: 'EP' },
    { name: 'Africa Cement', initial: 'AC' },
  ];

  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section className="hero-section bg-gray-900" data-testid="hero-section">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.pexels.com/photos/9800116/pexels-photo-9800116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')` 
          }}
        />
        <div className="hero-overlay absolute inset-0" />
        
        <div className="container-custom relative z-10 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <span className="overline text-[#D4A373] mb-4 block">
              Ghana's Premier Environmental Consultancy
            </span>
            <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Leading Sustainable Solutions for Environmental and Engineering Excellence
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8">
              Delivering expert environmental consulting, engineering solutions, and advisory services to multinational corporations across Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="btn-primary inline-flex items-center justify-center gap-2 group"
                data-testid="hero-cta-consultation"
              >
                Request Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-[#064E3B] inline-flex items-center justify-center gap-2"
                data-testid="hero-cta-services"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter */}
      <StatsCounter stats={stats} />

      {/* About Preview */}
      <section className="section-padding bg-white" data-testid="about-preview-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="overline mb-4 block">About GreenDev Associates</span>
              <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Your Trusted Partner in Environmental Excellence
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                GreenDev Associates International Limited is an associate-based sustainability consultancy registered in Ghana, delivering comprehensive environmental and engineering solutions to industries across Africa.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                With over 15 years of combined expertise, our team of environmental scientists, engineers, and industry specialists provides scientifically rigorous and commercially practical solutions that help our clients achieve their sustainability goals while maintaining regulatory compliance.
              </p>
              <Link
                to="/about"
                className="btn-secondary inline-flex items-center gap-2 group"
                data-testid="about-learn-more"
              >
                Learn More About Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1612408934218-916d7b033df3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudGFsJTIwc2NpZW50aXN0JTIwZmllbGQlMjB3b3JrfGVufDB8fHx8MTc3NTgzNTEzOHww&ixlib=rb-4.1.0&q=85"
                alt="Environmental consultant at work"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#064E3B] text-white p-6 max-w-xs hidden md:block">
                <p className="font-outfit text-3xl font-bold mb-1">15+</p>
                <p className="text-white/80 text-sm">Years of Excellence in Environmental Consulting</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-[#F9FAFB]" data-testid="services-section">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="overline mb-4 block">Our Services</span>
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Environmental & Engineering Solutions
            </h2>
            <p className="text-gray-600">
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
                className="service-card group"
                data-testid={`service-card-${index}`}
              >
                <div className="w-14 h-14 bg-[#F0FDF4] flex items-center justify-center mb-6 group-hover:bg-[#064E3B] transition-colors">
                  <service.icon className="w-7 h-7 text-[#064E3B] group-hover:text-white transition-colors" weight="duotone" />
                </div>
                <h3 className="font-outfit text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-[#064E3B] font-medium group-hover:text-[#4D7C0F] transition-colors"
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
              className="btn-primary inline-flex items-center gap-2"
              data-testid="services-view-all"
            >
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white" data-testid="why-choose-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="overline mb-4 block">Why Choose GreenDev</span>
              <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Trusted by Industry Leaders Across Africa
              </h2>
              <div className="space-y-6">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4"
                    data-testid={`why-choose-item-${index}`}
                  >
                    <div className="w-12 h-12 bg-[#F0FDF4] flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-[#064E3B]" weight="duotone" />
                    </div>
                    <div>
                      <h4 className="font-outfit font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1766839500277-b6c3a43c14e5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHN1c3RhaW5hYmxlJTIwZW5lcmd5JTIwYmFja2dyb3VuZHxlbnwwfHx8fDE3NzU4MzUxNDl8MA&ixlib=rb-4.1.0&q=85"
                alt="Sustainable energy"
                className="w-full h-64 object-cover"
              />
              <img
                src="https://images.pexels.com/photos/9800116/pexels-photo-9800116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Wind turbines"
                className="w-full h-64 object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding bg-[#F9FAFB]" data-testid="projects-section">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <span className="overline mb-4 block">Our Work</span>
              <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-900">
                Featured Projects
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
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="project-card group"
                data-testid={`project-card-${index}`}
              >
                <div className="h-48 bg-gradient-to-br from-[#064E3B] to-[#4D7C0F] flex items-center justify-center">
                  <span className="font-outfit text-4xl font-bold text-white/20">
                    {project.client_name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-[#4D7C0F] uppercase tracking-wider">
                    {project.industry}
                  </span>
                  <h3 className="font-outfit text-lg font-semibold text-gray-900 mt-2 mb-2">
                    {project.client_name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {project.summary}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 bg-white" data-testid="clients-section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="overline mb-4 block">Our Clients</span>
            <h2 className="font-outfit text-2xl md:text-3xl font-bold text-gray-900">
              Trusted by Leading Organizations
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {clientLogos.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-32 h-20 bg-gray-100 flex items-center justify-center group hover:bg-[#064E3B] transition-colors"
                data-testid={`client-logo-${index}`}
              >
                <span className="font-outfit text-2xl font-bold text-gray-400 group-hover:text-white transition-colors">
                  {client.initial}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-[#F0FDF4]" data-testid="testimonials-section">
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
                    <div className="testimonial-card bg-white p-8 md:p-12 text-center">
                      <Quotes className="w-12 h-12 text-[#D4A373] mx-auto mb-6" weight="fill" />
                      <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
                        "{testimonial.content}"
                      </p>
                      <div>
                        <p className="font-outfit font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-gray-500 text-sm">
                          {testimonial.role}, {testimonial.company}
                        </p>
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

      {/* CTA Section */}
      <section className="py-20 bg-[#064E3B]" data-testid="cta-section">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-outfit text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Partner with Ghana's leading environmental consultancy for your next project. Let's discuss how we can help you achieve your sustainability goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-[#064E3B] px-8 py-3 font-medium hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
                data-testid="cta-contact"
              >
                Contact Us Today
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="border border-white text-white px-8 py-3 font-medium hover:bg-white/10 transition-colors"
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
