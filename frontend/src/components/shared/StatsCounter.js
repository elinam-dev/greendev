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
      value: stats?.years_experience || 9, 
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
      value: stats?.industries_served || 6, 
      suffix: '', 
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
    <section className="bg-[#064E3B] py-16" data-testid="stats-section">
      <div className="container-custom" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {defaultStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
              data-testid={`stat-item-${index}`}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 rounded-sm mb-4">
                <stat.icon className="w-7 h-7 text-[#D4A373]" weight="duotone" />
              </div>
              <div className="stat-number text-white">
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
              <p className="text-white/70 text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
