import { useEffect, useState, useRef } from 'react';
import CountUp from 'react-countup';
import { motion, useInView } from 'framer-motion';
import { CalendarCheck, Buildings, Factory, Users } from '@phosphor-icons/react';

const StatsCounter = ({ stats }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const defaultStats = [
    { 
      icon: CalendarCheck, 
      value: stats?.years_experience || 10, 
      suffix: '+', 
      label: 'Years of Experience' 
    },
    { 
      icon: Buildings, 
      value: stats?.projects_delivered || 100, 
      suffix: '+', 
      label: 'Projects Delivered' 
    },
    { 
      icon: Factory, 
      value: stats?.industries_served || 50, 
      suffix: '+', 
      label: 'Industries Served' 
    },
    { 
      icon: Users, 
      value: stats?.expert_consultants || 11, 
      suffix: '+', 
      label: 'Expert Consultants' 
    },
  ];

  return (
    <section className="stats-section py-20 relative" data-testid="stats-section">
      <div className="container-custom relative z-10" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {defaultStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="stat-item bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              data-testid={`stat-item-${index}`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-500 rounded-xl mb-5 shadow-lg">
                <stat.icon className="w-8 h-8 text-white" weight="fill" />
              </div>
              <div className="stat-number">
                {hasAnimated ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix}
                    separator=","
                  />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </div>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
