import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  MapPin, 
  Phone, 
  Envelope, 
  Clock,
  PaperPlaneRight,
  CheckCircle
} from '@phosphor-icons/react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const services = [
    'Environmental Impact Assessment',
    'Social Impact Assessment',
    'Environmental Audit',
    'Permit Acquisition',
    'Water & Sanitation Engineering',
    'CSR Development',
    'Feasibility Study',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (value) => {
    setFormData(prev => ({ ...prev, service: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await axios.post(`${API_URL}/api/contact`, formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      });
    } catch (err) {
      setError('Failed to submit. Please try again.');
      console.error('Contact form error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" data-testid="contact-page">
      {/* Hero Section */}
      <section className="relative py-32 bg-[#064E3B]" data-testid="contact-hero">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="overline text-[#D4A373] mb-4 block">Contact Us</span>
            <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Let's Discuss Your Project
            </h1>
            <p className="text-white/80 text-lg md:text-xl">
              Get in touch with our team to discuss how we can help you achieve your environmental and sustainability goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white" data-testid="contact-form-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-outfit text-2xl font-bold text-gray-900 mb-8">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F0FDF4] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#064E3B]" weight="duotone" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-semibold text-gray-900 mb-1">Office Address</h4>
                    <p className="text-gray-600 text-sm">
                      Zees Plaza, 6th Street,<br />
                      Dawhenya, Tema Comm 25,<br />
                      Ghana
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F0FDF4] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#064E3B]" weight="duotone" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-semibold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600 text-sm">
                      <a href="tel:+233000000000" className="hover:text-[#064E3B]">
                        +233 (0) 000 000 000
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F0FDF4] flex items-center justify-center flex-shrink-0">
                    <Envelope className="w-6 h-6 text-[#064E3B]" weight="duotone" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600 text-sm">
                      <a href="mailto:info@greendevassociates.net" className="hover:text-[#064E3B]">
                        info@greendevassociates.net
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F0FDF4] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#064E3B]" weight="duotone" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-semibold text-gray-900 mb-1">Business Hours</h4>
                    <p className="text-gray-600 text-sm">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#F9FAFB] p-8 md:p-12">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                    data-testid="contact-success"
                  >
                    <div className="w-20 h-20 bg-[#F0FDF4] flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-[#4D7C0F]" weight="fill" />
                    </div>
                    <h3 className="font-outfit text-2xl font-bold text-gray-900 mb-2">
                      Thank You!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Your message has been received. Our team will get back to you within 24-48 hours.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-[#064E3B] text-[#064E3B] hover:bg-[#064E3B] hover:text-white"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="font-outfit text-2xl font-bold text-gray-900 mb-2">
                      Request a Consultation
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Fill out the form below and our team will get back to you shortly.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full"
                            placeholder="Your full name"
                            data-testid="contact-name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full"
                            placeholder="your.email@company.com"
                            data-testid="contact-email"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <Input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full"
                            placeholder="+233 000 000 000"
                            data-testid="contact-phone"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Name
                          </label>
                          <Input
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full"
                            placeholder="Your company name"
                            data-testid="contact-company"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Service of Interest
                        </label>
                        <Select value={formData.service} onValueChange={handleServiceChange}>
                          <SelectTrigger className="w-full" data-testid="contact-service">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="w-full min-h-[150px]"
                          placeholder="Tell us about your project and how we can help..."
                          data-testid="contact-message"
                        />
                      </div>

                      {error && (
                        <p className="text-red-500 text-sm" data-testid="contact-error">
                          {error}
                        </p>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
                        data-testid="contact-submit"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <PaperPlaneRight className="w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] bg-gray-200" data-testid="contact-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.3671898854!2d0.0458!3d5.6835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwNDEnMDAuNiJOIDDCsDAyJzQ0LjkiRQ!5e0!3m2!1sen!2sgh!4v1600000000000!5m2!1sen!2sgh"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="GreenDev Associates Location"
        />
      </section>
    </div>
  );
};

export default ContactPage;
