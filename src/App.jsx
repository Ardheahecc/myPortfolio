import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import {
  Sun, Moon, Home, User, Briefcase, Code,
  ChevronDown, ExternalLink, Terminal, Download,
  Mail, Award, Monitor, Database, Layout, Server, Cpu,
  X, GraduationCap, MapPin, FileCode2, Paintbrush, Loader2
} from 'lucide-react';

// --- CUSTOM ICONS ---
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path></svg>
);
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

// --- MOCK DATA ---
const skills = [
  { name: 'HTML', icon: <FileCode2 className="w-8 h-8" />, desc: 'Bahasa markup standar untuk membuat halaman web. Saya sangat menguasai struktur semantik HTML5.' },
  { name: 'CSS', icon: <Paintbrush className="w-8 h-8" />, desc: 'Digunakan untuk mengatur tata letak dan desain visual web. Berpengalaman dengan Flexbox, Grid, dan animasi kustom.' },
  { name: 'PHP', icon: <Server className="w-8 h-8" />, desc: 'Bahasa skrip sisi server yang tangguh, sering digunakan untuk pengembangan web dinamis dan aplikasi enterprise.' },
  { name: 'Laravel', icon: <Layout className="w-8 h-8" />, desc: 'Framework web PHP yang elegan dan ekspresif. Saya menggunakannya untuk membangun arsitektur backend yang scalable dan aman.' },
  { name: 'Python', icon: <Terminal className="w-8 h-8" />, desc: 'Bahasa pemrograman serbaguna. Saya memanfaatkannya untuk analisis data, otomatisasi, dan pengembangan sistem back-end.' },
  { name: 'C', icon: <Code className="w-8 h-8" />, desc: 'Bahasa pemrograman tingkat rendah yang memberikan pemahaman mendalam tentang manajemen memori dan struktur data.' },
  { name: 'C++', icon: <Code className="w-8 h-8" />, desc: 'Bahasa berorientasi objek yang powerful, ideal untuk pengembangan sistem dengan performa dan kecepatan tinggi.' },
  { name: 'Pascal', icon: <Terminal className="w-8 h-8" />, desc: 'Bahasa pemrograman terstruktur yang menjadi fondasi awal saya dalam memahami konsep dasar logika dan algoritma.' },
  { name: 'Figma', icon: <Layout className="w-8 h-8" />, desc: 'Alat desain antarmuka kolaboratif utama saya untuk merancang UI/UX yang intuitif, prototipe, dan wireframing.' },
  { name: 'Canva', icon: <Monitor className="w-8 h-8" />, desc: 'Platform desain grafis serbaguna yang saya gunakan untuk mempercepat pembuatan aset visual dan presentasi yang menarik.' },
];

const education = [
  {
    year: 'Lulus dalam 3 Tahun 10 Bulan',
    role: 'Program Studi Sistem Informasi',
    faculty: 'Fakultas Sains dan Teknologi',
    company: 'Universitas Islam Negeri Raden Intan Lampung',
    desc: 'Menyelesaikan studi dengan pemahaman mendalam tentang arsitektur sistem, analisis data, manajemen basis data, dan integrasi teknologi untuk memecahkan permasalahan bisnis dan organisasi.',
    logo: '/logoKampus.png'
  }
];

const internships = [
  {
    year: '23 September - 22 November 2024',
    role: 'Intern - Divisi Household Consumer',
    company: 'Telkomsel Smart Office Branch Lampung',
    desc: 'Berpartisipasi aktif dalam kegiatan divisi Household Consumer, menganalisa kebutuhan layanan telekomunikasi pelanggan perumahan.',
    logo: '/intern/intern-telkomsel/logo-telkomsel.png',
    assets: [
      { type: 'certificate', src: '/intern/intern-telkomsel/Internship-Telkomsel Branch lampung-Surat Keterangan Selesai Magang.png', title: 'Sertifikat Magang Telkomsel' },
      { type: 'photo', src: '/intern/intern-telkomsel/1752807787643.jpg', title: 'Dokumentasi Magang Telkomsel' }
    ]
  },
  {
    year: '14 Juli - 22 September 2025',
    role: 'Intern - Divisi Persandian dan Statistik',
    company: 'Dinas Komunikasi Informatika dan Statistik Prov. Lampung',
    desc: 'Membantu pengelolaan data persandian dan statistik. Berperan dalam penyusunan laporan serta penerapan protokol keamanan informasi.',
    logo: '/intern/intern-diskominfotik/logo-diskominfotik.jpg',
    assets: [
      { type: 'certificate', src: '/intern/intern-diskominfotik/Internship-DISKOMINFOTIK Provinsi Lampung-Sertifikat Magang.png', title: 'Sertifikat Magang Diskominfotik' },
      { type: 'photo', src: '/intern/intern-diskominfotik/IMG-20250912-WA0012.jpg', title: 'Dokumentasi Magang Diskominfotik' }
    ]
  }
];

// Github projects fetched automatically

const certifications = [
  {
    title: 'HTML Class Certificate',
    issuer: 'Codepolitan',
    img: '/certificate/Codepolitan-HTML Class Certificate.png'
  },
  {
    title: 'CSS Class Certificate',
    issuer: 'Codepolitan',
    img: '/certificate/Codepolitan-CSS Class Certificate.png'
  },
  {
    title: 'Data Science Webinar',
    issuer: 'Skillworks',
    img: '/certificate/Skillworks-Data Science Webinar- Certificate of Participation.png'
  },
  {
    title: 'Cyber Security Webinar',
    issuer: 'Skillworks',
    img: '/certificate/Skillworks-Cyber Security Webinar- Certificate of Participation.png'
  },
];

// --- COMPONENTS ---

// 1. Custom Magnetic Cursor
const MagneticCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (['A', 'BUTTON', 'INPUT'].includes(e.target.tagName) || e.target.closest('button') || e.target.closest('a') || e.target.closest('.magnetic-hover')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-brand-neon rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: mousePos.x - 8,
          y: mousePos.y - 8,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-brand-neon rounded-full pointer-events-none z-[9998] mix-blend-difference opacity-50 hidden md:block"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, mass: 0.5 }}
      />
    </>
  );
};

// 2. HUD Navigation (Moved to bottom right)
const HUDNavigation = ({ darkMode, setDarkMode }) => {
  return (
    <motion.nav
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring' }}
      className="fixed bottom-4 left-0 right-0 mx-auto md:left-auto md:bottom-6 md:right-6 md:mx-0 z-50 glass rounded-full md:rounded-2xl px-2 py-3 md:p-3 flex flex-row md:flex-col items-center justify-evenly md:justify-start gap-1 md:gap-4 shadow-2xl w-[92%] sm:w-[380px] md:w-auto"
    >
      <a href="#home" className="p-2 hover:text-brand-neon hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all" title="Beranda"><Home className="w-5 h-5" /></a>
      <a href="#about" className="p-2 hover:text-brand-neon hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all" title="Profil"><User className="w-5 h-5" /></a>
      <a href="#education" className="p-2 hover:text-brand-neon hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all" title="Pendidikan & Magang"><GraduationCap className="w-5 h-5" /></a>
      <a href="#projects" className="p-2 hover:text-brand-neon hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all" title="Portofolio"><Code className="w-5 h-5" /></a>
      <div className="w-px h-6 md:w-6 md:h-px bg-slate-300 dark:bg-slate-700"></div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 hover:text-brand-neon hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
        aria-label="Toggle Dark Mode"
        title="Mode Terang/Gelap"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </motion.nav>
  );
};

// 3. Reusable Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="glass-card !bg-white dark:!bg-slate-900 relative w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:text-brand-neon transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </motion.div>
    </div>
  );
};

// 4. Hero Section (LinkedIn Style Profile)
const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-8 md:pt-16 pb-24 md:pb-12 px-4 overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-neon/40 via-transparent to-transparent blur-3xl"></div>

      <div className="z-10 w-full max-w-[95%] lg:max-w-7xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="glass-card overflow-hidden bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl"
        >
          {/* Banner */}
          <div className="h-40 md:h-56 relative overflow-hidden bg-slate-200 dark:bg-slate-800">
            <img src="/fotoSampul.webp" alt="Sampul" className="w-full h-full object-cover object-[75%_center] md:object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>

          {/* Profile Section */}
          <div className="px-6 md:px-10 pb-10 relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end -mt-20 md:-mt-24 mb-6">
              <div className="relative mb-4 md:mb-0">
                {/* Avatar */}
                <div className="w-36 h-36 md:w-48 md:h-48 rounded-full border-4 md:border-8 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-xl overflow-hidden relative z-10">
                  <img src="/fotoProfil.webp" alt="Muhammad Riski Ardhea" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">
              <div>
                <h1 className="text-[1.35rem] sm:text-2xl md:text-4xl font-bold mb-1 text-slate-900 dark:text-white whitespace-nowrap">Muhammad Riski Ardhea</h1>
                <p className="text-sm md:text-xl text-slate-600 dark:text-slate-300 mb-3 flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                  <span>Information System Specialist</span>
                  <span className="hidden md:inline">|</span>
                  <span>Tech Enthusiast</span>
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-0">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Lampung, Indonesia</span>
                  <span className="hidden md:inline">•</span>
                  <a href="mailto:riskiardhea09@gmail.com" className="hover:text-brand-neon transition-colors">riskiardhea09@gmail.com</a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full lg:w-auto">
                <a href="/CV.pdf" download className="w-full sm:w-auto justify-center px-6 py-2.5 rounded-full border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors shadow-sm text-sm md:text-base flex items-center gap-2">
                  <Download className="w-4 h-4" /> Download CV
                </a>
                <a href="#about" className="w-full sm:w-auto text-center justify-center px-8 py-2.5 rounded-full bg-brand-light hover:bg-brand-neon text-white font-medium transition-colors shadow-md text-sm md:text-base">
                  Lihat profil
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 z-10 text-slate-400"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
};

// 5. About & Skills
const About = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-xl md:text-4xl font-bold mb-6 text-glow">Profil Saya</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg">
            <p className="mb-4">
              Selamat datang! Saya adalah seorang lulusan Sistem Informasi yang antusias mengeksplorasi dunia teknologi. Saya memiliki minat besar dalam merancang sistem yang skalabel, mengembangkan aplikasi, dan menciptakan solusi teknologi yang berpusat pada pengalaman pengguna.
            </p>
          </div>

          <div className="bg-white/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-slate-200">
              Hobi & Gaya Hidup
            </h3>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-brand-neon shrink-0"></div>
                <span><strong>Eksplorasi Teknologi:</strong> Selalu antusias mempelajari framework, bahasa pemrograman, dan alat baru di dunia IT.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-brand-neon shrink-0"></div>
                <span><strong>Desain Visual:</strong> Menikmati proses kreatif dalam merancang UI/UX dan mengulik estetika antarmuka.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-brand-neon shrink-0"></div>
                <span><strong>Problem Solving:</strong> Merasa tertantang saat memecahkan bug atau mencari algoritma paling efisien untuk sebuah sistem.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 w-2 h-2 rounded-full bg-brand-neon shrink-0"></div>
                <span><strong>Membaca & Belajar:</strong> Rutin membaca artikel teknologi dan dokumentasi untuk memperluas wawasan arsitektur perangkat lunak.</span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-xl md:text-4xl font-bold mb-6 text-glow">Teknologi & Keahlian</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Klik pada teknologi untuk melihat detail penguasaan saya.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setSelectedSkill(skill)}
                className="magnetic-hover glass-card p-5 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-brand-neon hover:neon-glow text-center transition-all bg-white dark:bg-slate-900"
              >
                <div className="text-brand-light dark:text-brand-neon p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  {skill.icon}
                </div>
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Skill Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <Modal isOpen={!!selectedSkill} onClose={() => setSelectedSkill(null)}>
            <div className="p-8 text-center max-w-sm mx-auto">
              <div className="w-24 h-24 mx-auto bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-brand-neon mb-6 shadow-inner border border-slate-100 dark:border-slate-700">
                {selectedSkill.icon}
              </div>
              <h3 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">{selectedSkill.name}</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                {selectedSkill.desc}
              </p>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

// 6. Education & Internship History
const EducationAndInternship = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);

  return (
    <section id="education" className="py-24 px-6 md:px-12 max-w-4xl mx-auto relative">
      <h2 className="text-xl md:text-4xl font-bold mb-16 text-left md:text-center text-glow">Riwayat Pendidikan</h2>
      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-6 md:ml-12 mb-20">
        {education.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 pl-10 md:pl-12 relative"
          >
            {/* Timeline Node Logo */}
            <div className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-slate-900 -left-[25px] md:-left-[29px] top-0 border-4 border-surface-light dark:border-surface-dark flex items-center justify-center shadow-lg overflow-hidden z-10">
              <img src={item.logo} alt="Logo Kampus" className="w-10 md:w-13 h-auto object-cover" />
            </div>

            <div className="glass-card p-5 md:p-8 ml-0 md:ml-2 bg-white/60 dark:bg-slate-900/40 hover:border-brand-neon/50 transition-colors">
              <span className="inline-block px-3 py-1.5 rounded-full bg-brand-neon/10 text-brand-light dark:text-brand-neon text-xs md:text-sm font-bold mb-4 border border-brand-neon/20">{item.year}</span>
              <h3 className="text-xl md:text-3xl font-bold mb-2 text-slate-900 dark:text-white">{item.company}</h3>
              <h4 className="text-base md:text-xl font-semibold text-brand-light dark:text-brand-dark mb-1">{item.role}</h4>
              <h5 className="text-sm md:text-base text-slate-500 dark:text-slate-400 mb-4">{item.faculty}</h5>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className="text-xl md:text-4xl font-bold mb-16 text-left md:text-center text-glow mt-16">Riwayat Internship</h2>
      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-6 md:ml-12">
        {internships.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-12 pl-10 md:pl-12 relative"
          >
            <div className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full bg-white dark:bg-slate-900 -left-[25px] md:-left-[29px] top-0 border-4 border-surface-light dark:border-surface-dark flex items-center justify-center shadow-lg overflow-hidden z-10 p-1">
              <img src={item.logo} alt="Logo Perusahaan" className="w-full h-full object-contain rounded-full" />
            </div>

            <div className="glass-card p-5 md:p-8 ml-0 md:ml-2 bg-white/60 dark:bg-slate-900/40 hover:border-brand-neon/50 transition-colors">
              <span className="inline-block px-3 py-1.5 rounded-full bg-brand-neon/10 text-brand-light dark:text-brand-neon text-xs md:text-sm font-bold mb-4 border border-brand-neon/20">{item.year}</span>
              <h3 className="text-xl md:text-3xl font-bold mb-2 text-slate-900 dark:text-white">{item.company}</h3>
              <h4 className="text-base md:text-xl font-semibold text-brand-light dark:text-brand-dark mb-4">{item.role}</h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-6">{item.desc}</p>

              {item.assets && (
                <div className="flex flex-wrap gap-4">
                  {item.assets.map((asset, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedAsset(asset)}
                      className="px-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4 text-brand-neon" />
                      {asset.type === 'certificate' ? 'Lihat Sertifikat' : 'Lihat Dokumentasi'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Asset Modal */}
      <AnimatePresence>
        {selectedAsset && (
          <Modal isOpen={!!selectedAsset} onClose={() => setSelectedAsset(null)}>
            <div className="p-2">
              <img src={selectedAsset.src} alt={selectedAsset.title} className="w-full h-auto max-h-[70vh] object-contain rounded-lg" />
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{selectedAsset.title}</h3>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

// 7. Portfolio & Certifications
const ProjectCard = ({ project, index }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover="hover"
      className="glass-card group overflow-hidden bg-white dark:bg-slate-900 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
        {imageError ? (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-neon/20 via-transparent to-transparent blur-xl"></div>
            <Code className="w-16 h-16 text-brand-neon opacity-80 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10" />
          </div>
        ) : (
          <motion.img
            variants={{ hover: { scale: 1.1 } }}
            transition={{ duration: 0.4 }}
            src={`https://raw.githubusercontent.com/Ardheahecc/${project.originalName}/main/cover.png`}
            alt={project.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-20 pointer-events-none"></div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">{project.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {project.tech.map(t => (
            <span key={t} className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-300 capitalize">{t}</span>
          ))}
        </div>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand-light dark:text-brand-neon hover:underline text-sm font-medium w-fit">
          Lihat Proyek <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [githubProjects, setGithubProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Ardheahecc/repos?sort=updated&per_page=15');
        const data = await response.json();

        const filtered = data
          .filter(repo => !repo.fork && repo.name !== 'Ardheahecc')
          .slice(0, 6)
          .map(repo => {
            return {
              originalName: repo.name,
              title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              desc: repo.description || 'Tidak ada deskripsi tersedia',
              tech: repo.topics?.length ? repo.topics : (repo.language ? [repo.language] : ['Code']),
              link: repo.html_url
            };
          });

        setGithubProjects(filtered);
      } catch (error) {
        console.error("Error fetching github repos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <h2 className="text-xl md:text-4xl font-bold mb-16 text-left md:text-center text-glow">Proyek Portofolio</h2>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card bg-white dark:bg-slate-900 overflow-hidden flex flex-col h-[400px] animate-pulse">
              <div className="h-48 bg-slate-200 dark:bg-slate-800 shrink-0"></div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6 mb-6"></div>
                <div className="flex gap-2 mb-6 mt-auto">
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-16"></div>
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-20"></div>
                </div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24 mt-auto"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {githubProjects.map((project, i) => (
            <ProjectCard key={project.originalName} project={project} index={i} />
          ))}
        </div>
      )}

      {/* Certifications */}
      <div>
        <h3 className="text-xl md:text-4xl font-bold mb-10 text-left md:text-center text-glow">Sertifikasi</h3>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-10 -mt-6">Klik gambar sertifikat untuk memperbesar.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedCert(cert)}
              className="magnetic-hover glass-card overflow-hidden cursor-pointer group bg-white dark:bg-slate-900 shadow-lg hover:shadow-brand-neon/20 transition-all"
            >
              <div className="h-48 md:h-56 overflow-hidden relative">
                <img src={cert.img} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-5 text-center border-t border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-lg mb-1 text-slate-800 dark:text-slate-200">{cert.title}</h4>
                <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
                  <Award className="w-4 h-4" /> {cert.issuer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certification Modal */}
      <AnimatePresence>
        {selectedCert && (
          <Modal isOpen={!!selectedCert} onClose={() => setSelectedCert(null)}>
            <div className="p-2">
              <img src={selectedCert.img} alt={selectedCert.title} className="w-full h-auto max-h-[70vh] object-contain rounded-lg" />
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">{selectedCert.title}</h3>
                <p className="text-slate-500 text-lg">{selectedCert.issuer}</p>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

// 8. CLI Terminal Easter Egg
const TerminalEasterEgg = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    'Selamat datang di Terminal Visioner. Ketik "help" untuk memulai.'
  ]);
  const inputRef = useRef(null);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let response = '';

      switch (cmd) {
        case 'help':
          response = 'Perintah tersedia: help, skills, contact, clear, sudo';
          break;
        case 'skills':
          response = skills.map(s => s.name).join(', ');
          break;
        case 'contact':
          response = 'Email: riskiardhea09@gmail.com | LinkedIn: /in/riski-ardhea-4796462ba';
          break;
        case 'clear':
          setOutput([]);
          setInput('');
          return;
        case 'sudo':
          response = 'Akses ditolak: Insiden ini akan dilaporkan.';
          break;
        case '':
          response = '';
          break;
        default:
          response = `Perintah tidak ditemukan: ${cmd}`;
      }

      setOutput([...output, `> ${input}`, response].filter(Boolean));
      setInput('');
      setTimeout(() => {
        if (inputRef.current) inputRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <section className="py-12 px-6 md:px-12 max-w-3xl mx-auto">
      <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl font-mono text-sm">
        <div className="bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-slate-400 ml-4 text-xs font-semibold tracking-wider">guest@riski-ardhea:~</span>
        </div>
        <div className="p-5 h-64 overflow-y-auto text-green-400">
          {output.map((line, i) => (
            <div key={i} className="mb-1.5">{line}</div>
          ))}
          <div className="flex items-center mt-3">
            <span className="mr-2 text-brand-neon">{'>'}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="bg-transparent border-none outline-none flex-1 text-green-400"
              spellCheck="false"
              autoComplete="off"
            />
          </div>
          <div ref={inputRef}></div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="border-t border-slate-200 dark:border-slate-800 py-12 text-center mt-12 pb-32 md:pb-12 bg-white dark:bg-background-dark">
    <div className="flex justify-center gap-6 mb-8">
      <a href="mailto:riskiardhea09@gmail.com" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full hover:text-brand-neon hover:neon-glow transition-all hover:-translate-y-1" title="Email"><Mail className="w-5 h-5" /></a>
      <a href="https://id.linkedin.com/in/riski-ardhea-4796462ba" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full hover:text-brand-neon hover:neon-glow transition-all hover:-translate-y-1" title="LinkedIn"><LinkedinIcon /></a>
      <a href="https://github.com/Ardheahecc" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full hover:text-brand-neon hover:neon-glow transition-all hover:-translate-y-1" title="GitHub"><GithubIcon /></a>
      <a href="https://www.instagram.com/ardhea_9?igsi=bnJIcWV1OHY0XRI" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full hover:text-brand-neon hover:neon-glow transition-all hover:-translate-y-1" title="Instagram"><InstagramIcon /></a>
    </div>
    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
      © {new Date().getFullYear()} Muhammad Riski Ardhea. Built with React & Framer Motion.
    </p>
  </footer>
);

// --- MAIN APP COMPONENT ---
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-surface-light text-slate-900 dark:bg-background-dark dark:text-white font-sans selection:bg-brand-neon/30 overflow-x-hidden transition-colors duration-300">
      <MagneticCursor />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-light to-brand-neon z-[150] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <HUDNavigation darkMode={darkMode} setDarkMode={setDarkMode} />

      <main>
        <Hero />
        <About />
        <EducationAndInternship />
        <Portfolio />
        <TerminalEasterEgg />
      </main>

      <Footer />
    </div>
  );
}
