# GreenDev Associates Corporate Website - PRD

## Original Problem Statement
Redesign and rebuild the corporate website for GreenDev Associates International Limited, a Ghana-based environmental and sustainability consulting firm. Create a modern, premium, professional, internationally credible corporate website.

## User Personas
1. **Potential Clients** - Multinational corporations seeking environmental consulting services
2. **Industry Partners** - Organizations looking for collaboration opportunities
3. **Regulators** - EPA Ghana and other regulatory bodies reviewing company credentials
4. **Admin Users** - GreenDev staff managing website content

## Core Requirements (Static)
- Premium corporate aesthetic with deep green + earth-tone branding
- Responsive design for all devices
- Fast-loading pages
- SEO-optimized structure
- Admin panel for content management
- Contact form with database storage and email notifications

## What's Been Implemented (2026-04-10)
### Frontend
- **Homepage**: Hero section with CTAs, animated stats counter, services grid, featured projects, client logos, testimonials carousel, CTA section
- **About Page**: Company overview, vision/mission, leadership message, approach section, team preview
- **Services Page**: Environmental, Engineering, and Advisory services with expandable accordion details
- **Industries Page**: 6 industry cards (Manufacturing, Oil & Gas, Mining, Agriculture, Energy, Infrastructure)
- **Projects Page**: Dynamic project grid with industry filter
- **Team Page**: Leadership and consultant profiles from database
- **Clients Page**: Client logo grid
- **Contact Page**: Contact form with validation, office info, Google Maps embed
- **Admin Panel**: Full CRUD for projects, team members, testimonials, contact submissions

### Backend
- FastAPI with MongoDB
- JWT authentication for admin panel
- Contact form submissions with email notifications (Resend API)
- CRUD APIs for all content types
- Seeded initial data for projects, team, clients, testimonials

## Architecture
- **Frontend**: React 19, Tailwind CSS, Framer Motion, Phosphor Icons, Shadcn/UI
- **Backend**: FastAPI, Motor (async MongoDB), PyJWT, bcrypt
- **Database**: MongoDB (test_database)
- **Fonts**: Outfit (headings), IBM Plex Sans (body)
- **Colors**: Primary Green #064E3B, Sage #4D7C0F, Earth Sand #D4A373

## Prioritized Backlog

### P0 (Critical) - DONE
- [x] Homepage with all sections
- [x] Navigation and routing
- [x] All public pages
- [x] Contact form functionality
- [x] Admin authentication
- [x] Admin CRUD operations

### P1 (Important)
- [ ] Configure Resend API key for email notifications
- [ ] Add real client logos (currently using initials)
- [ ] Add real team member photos
- [ ] SEO meta tags for all pages

### P2 (Nice to Have)
- [ ] Blog/News section
- [ ] Newsletter subscription
- [ ] Live chat integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

## Admin Credentials
- Email: admin@greendevassociates.net
- Password: GreenDev2024!

## Next Tasks
1. Add Resend API key to enable contact form email notifications
2. Upload actual client logos and team photos
3. Add more detailed project case studies
4. Implement blog/news section
