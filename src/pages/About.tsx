import { motion } from 'framer-motion';
import { Shield, Code2, Terminal } from 'lucide-react';

export function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Encabezado */}
      <h1 className="text-4xl font-bold text-cyber-secondary glow-text mb-8">Acerca de</h1>

      {/* Tarjeta introductoria */}
      <div className="bg-cyber-card/80 border border-cyber-border rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-3">Sobre CYBER-BLOG</h2>
        <p className="text-cyber-text/80">
          En CYBER-BLOG compartimos noticias relevantes del mundo de la ciberseguridad, writeups prácticos 
          para reto-máquinas de plataformas como HackTheBox y TryHackMe, y análisis de herramientas que todo pentester 
          debe conocer. Nuestro objetivo es ofrecer tutoriales claros para practicar en entornos controlados, ideas para mitigación 
          de incidentes y recursos que aceleran tu aprendizaje. Ideal para estudiantes, cazadores de bugs y profesionales que quieren mantenerse actualizados y afinar habilidades con ejemplos reales y reproducibles.
        </p>
      </div>

      {/* Grid de áreas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Seguridad */}
        <div className="group bg-cyber-card/80 border border-cyber-border rounded-lg p-8 hover:border-cyber-primary transition-all">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-cyber-primary" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Seguridad</h3>
          <p className="text-cyber-text/80">Análisis profundo de vulnerabilidades y técnicas de protección</p>
        </div>

        {/* Desarrollo */}
        <div className="group bg-cyber-card/80 border border-cyber-border rounded-lg p-8 hover:border-cyber-primary transition-all">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="h-8 w-8 text-cyber-primary" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Desarrollo</h3>
          <p className="text-cyber-text/80">Código seguro y mejores prácticas en desarrollo</p>
        </div>

        {/* Hacking Ético */}
        <div className="group bg-cyber-card/80 border border-cyber-border rounded-lg p-8 hover:border-cyber-primary transition-all">
          <div className="flex items-center gap-3 mb-4">
            <Terminal className="h-8 w-8 text-cyber-primary" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Hacking Ético</h3>
          <p className="text-cyber-text/80">Técnicas y metodologías de pentesting profesional</p>
        </div>
      </div>
    </motion.div>
  );
}