import { motion } from 'framer-motion';

export function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold text-cyber-secondary glow-text mb-8">Acerca de</h1>

      <div className="bg-cyber-card/80 border border-cyber-border rounded-lg p-8 mb-8 glow-border">
        <h2 className="text-2xl font-bold text-white mb-3">🛡️ Sobre CYBER-BLOG</h2>
        <p className="text-cyber-text/80 leading-relaxed">
          CYBER-BLOG es un espacio independiente orientado al aprendizaje práctico, la experimentación y la documentación técnica
          en el ámbito de la ciberseguridad ofensiva y defensiva. El objetivo principal es convertir el conocimiento en habilidad real,
          mediante contenidos claros, reproducibles y alineados con escenarios del mundo real.
        </p>

        <div className="mt-6 space-y-3">
          <h3 className="text-xl font-semibold text-cyber-primary glow-text">En el blog encontrarás:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-cyber-text/80">📰 Noticias y tendencias relevantes del sector de la ciberseguridad</li>
            <li className="text-cyber-text/80">🧪 Writeups técnicos de reto-máquinas (Hack The Box, TryHackMe, INE)</li>
            <li className="text-cyber-text/80">🛠️ Análisis profundos de herramientas utilizadas en pentesting y bug bounty</li>
          </ul>
        </div>

        <div className="mt-6 space-y-3">
          <p className="text-cyber-text/80 leading-relaxed">
            El enfoque es 100% práctico y reproducible, diseñado para entrenar exclusivamente en entornos controlados y laboratorios locales,
            promoviendo siempre el uso ético y responsable de las técnicas ofensivas. Cada publicación busca ir más allá de la teoría para explicar:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-cyber-text/80">El cómo se explota una vulnerabilidad</li>
            <li className="text-cyber-text/80">El por qué ocurre</li>
            <li className="text-cyber-text/80">El impacto real en un entorno productivo</li>
            <li className="text-cyber-text/80">Las medidas de mitigación, hardening y mejora de la postura de seguridad</li>
          </ul>
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="text-xl font-semibold text-cyber-primary glow-text">CYBER-BLOG está dirigido a:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-cyber-text/80">🎓 Estudiantes de ciberseguridad</li>
            <li className="text-cyber-text/80">🐞 Bug bounty hunters</li>
            <li className="text-cyber-text/80">🧑‍💻 Pentesters junior y profesionales</li>
            <li className="text-cyber-text/80">🔐 Personas que desean mantenerse actualizadas y afinar sus habilidades técnicas</li>
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-cyber-text/80 leading-relaxed">
            Si buscas ejemplos reales, explicaciones directas y un aprendizaje continuo basado en la práctica,
            CYBER-BLOG es tu laboratorio.
          </p>
        </div>
      </div>

      <div className="bg-cyber-card/80 border border-cyber-border rounded-lg p-8 mb-8 glow-border">
        <h2 className="text-2xl font-bold text-white mb-3">👤 ¿Quién está detrás de CYBER-BLOG?</h2>
        <p className="text-cyber-text/80 leading-relaxed">
          CYBER-BLOG es mantenido por <span className="text-cyber-primary glow-text font-semibold">Zuk4r1</span>, estudiante de ciberseguridad y hacking ético,
          enfocado en el pentesting práctico, la explotación de vulnerabilidades y la automatización de auditorías.
        </p>
        <p className="text-cyber-text/80 leading-relaxed mt-3">
          Zuk4r1 utiliza este blog como un repositorio vivo de aprendizaje, donde documenta laboratorios, técnicas reales,
          errores comunes y soluciones efectivas, tanto para reforzar su propio crecimiento profesional como para aportar valor a la comunidad.
        </p>

        <div className="mt-6 space-y-3">
          <h3 className="text-xl font-semibold text-cyber-primary glow-text">Su enfoque se centra en:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-cyber-text/80">⚙️ Hacking avanzado y explotación controlada</li>
            <li className="text-cyber-text/80">🛠️ Desarrollo de herramientas propias para pentesting y bug bounty</li>
            <li className="text-cyber-text/80">🎯 Preparación de certificaciones ofensivas como eJPT y el camino hacia OSCP</li>
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-cyber-text/80 leading-relaxed">
            CYBER-BLOG no es solo un blog, es un entorno de entrenamiento continuo para pensar como atacante y defender como profesional.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
