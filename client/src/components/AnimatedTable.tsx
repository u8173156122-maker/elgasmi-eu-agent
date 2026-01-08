import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTableProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

interface AnimatedRowProps {
  children: ReactNode;
  index?: number;
  className?: string;
}

interface AnimatedCellProps {
  children: ReactNode;
  className?: string;
}

// Animation pour conteneur de tableau/grille
export function AnimatedTable({ children, className = "", delay = 0 }: AnimatedTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animation pour ligne de tableau avec stagger
export function AnimatedRow({ children, index = 0, className = "" }: AnimatedRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animation pour cellule avec effet de compteur
export function AnimatedCell({ children, className = "" }: AnimatedCellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animation pour grille de cartes
export function AnimatedGrid({ children, className = "" }: AnimatedTableProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animation pour carte individuelle
export function AnimatedCard({ children, className = "" }: AnimatedTableProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animation pour metriques/resultats
export function AnimatedMetric({ children, className = "", delay = 0 }: AnimatedTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animation fade-in simple
export function FadeIn({ children, className = "", delay = 0 }: AnimatedTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animation slide-up
export function SlideUp({ children, className = "", delay = 0 }: AnimatedTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
