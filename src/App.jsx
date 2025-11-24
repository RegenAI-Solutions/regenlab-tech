import React, { useState } from 'react';
import { 
  Menu, X, ChevronRight, Leaf, Cpu, Globe, 
  Play, Users, Mail, MapPin, ExternalLink, 
  BarChart, Sprout, Database, Microscope 
} from 'lucide-react';

// --- DATA & CONFIGURATION ---

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About the Lab' },
  { id: 'projects', label: 'Projects' },
  { id: 'videos', label: 'Demo Videos' },
  { id: 'internship', label: 'Internships' },
  { id: 'contact', label: 'Contact' },
];

const PROJECTS = [
  // Existing Projects
  {
    id: 1,
    title: "Vietnam Corn Optimization",
    owner: "uyen91nct2016@gmail.com",
    category: "Crop Science",
    summary: "Optimizing corn yield and resilience in Vietnamese micro-climates using data-driven genetic selection.",
    methods: "Genetic algorithms, field trials, soil sensors.",
    outputs: "High-yield hybrid recommendations map.",
    status: "Active"
  },
  {
    id: 2,
    title: "California’s Regen Ag Planner",
    owner: "Trần Văn Tuấn Phong",
    category: "Software Tool",
    summary: "A comprehensive digital planner for farmers in California to transition toward regenerative practices.",
    methods: "Full-stack development, USDA data integration.",
    outputs: "Web-based planning dashboard.",
    status: "Active"
  },
  {
    id: 3,
    title: "Indian IGP & Gujarat Analysis",
    owner: "thanhnganho0105@gmail.com",
    category: "Regional Analysis",
    summary: "Large-scale analysis of the Indo-Gangetic Plain and Gujarat regions for water usage efficiency.",
    methods: "Satellite imagery processing, hydrological modeling.",
    outputs: "Regional water sustainability report.",
    status: "Active"
  },
  {
    id: 4,
    title: "Hỏi RegenAI",
    owner: "Trần Văn Tuấn Phong",
    category: "AI Assistant",
    summary: "An LLM-powered chatbot specifically trained on Vietnamese regenerative agriculture knowledge.",
    methods: "RAG (Retrieval-Augmented Generation), NLP.",
    outputs: "Public-facing AI conversational agent.",
    status: "Beta"
  },
  {
    id: 5,
    title: "Digital Transformation: Quảng Trị",
    owner: "Lab Team",
    category: "Digital Transformation",
    summary: "Digitizing organic agriculture supply chains in Quảng Trị to ensure transparent origin and process tracking.",
    methods: "Blockchain traceability, IoT monitoring.",
    outputs: "Verified organic certification platform.",
    status: "Active"
  },
  {
    id: 6,
    title: "Thang’s Project",
    owner: "dvthang774@gmail.com",
    category: "Research",
    summary: "Advanced soil microbiome analysis for indigenous crop varieties.",
    methods: "Metagenomics, lab sampling.",
    outputs: "Soil health index framework.",
    status: "Research"
  },
  {
    id: 7,
    title: "VMD0053",
    owner: "uyen91nct2016@gmail.com",
    category: "Carbon Protocol",
    summary: "Implementation of Verified Carbon Standard methodology for wetland restoration.",
    methods: "Carbon flux measurement, remote sensing.",
    outputs: "Carbon credit verification documentation.",
    status: "Review"
  },
  // New Potential Projects
  {
    id: 8,
    title: "AI-Driven Pest Detection",
    owner: "Open for Lead",
    category: "AI/Computer Vision",
    summary: "Using drone imagery and computer vision to identify pest outbreaks before they spread.",
    methods: "CNNs, Drone Mapping, Edge Computing.",
    outputs: "Real-time alert mobile application.",
    status: "Proposal"
  },
  {
    id: 9,
    title: "Soil Carbon Sequestration Modeling",
    owner: "Open for Lead",
    category: "Climate Modeling",
    summary: "Predictive modeling of soil carbon storage capabilities across different cover cropping strategies.",
    methods: "Machine Learning, RothC model adaptation.",
    outputs: "Predictive carbon sequestration heatmap.",
    status: "Proposal"
  },
  {
    id: 10,
    title: "Multispectral Rice Stress Analysis",
    owner: "Open for Lead",
    category: "Remote Sensing",
    summary: "Detecting abiotic stress in rice paddies using Sentinel-2 and PlanetScope data.",
    methods: "NDVI/NDRE analysis, Time-series forecasting.",
    outputs: "Stress detection algorithm API.",
    status: "Proposal"
  }
];

const VIDEOS = [
  {
    id: 1,
    title: "Regen Ag Planner Demo v1.0",
    owner: "Trần Văn Tuấn Phong",
    description: "A walkthrough of the California planning tool, demonstrating the soil health overlay and crop rotation features.",
    date: "Oct 2024"
  },
  {
    id: 2,
    title: "Hỏi RegenAI: Context Awareness",
    owner: "Trần Văn Tuấn Phong",
    description: "Testing the AI's ability to answer complex questions regarding pest control in tropical climates.",
    date: "Nov 2024"
  }
];

// --- COMPONENTS ---

const SectionTitle = ({ children, subtitle }) => (
  <div className="mb-10 text-center">
    <h2 className="text-3xl font-bold text-slate-800 font-display">{children}</h2>
    {subtitle && <div className="w-24 h-1 mx-auto mt-4 bg-emerald-600 rounded-full"></div>}
  </div>
);

const ProjectCard = ({ project }) => (
  <div className="flex flex-col h-full transition-all duration-300 bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-300 rounded-xl overflow-hidden group">
    <div className="h-32 bg-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-slate-800 opacity-90 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute inset-0 flex items-center justify-center text-emerald-100">
        {project.category === 'AI/Computer Vision' || project.category === 'AI Assistant' ? <Cpu size={48} className="opacity-50" /> :
         project.category === 'Software Tool' ? <Database size={48} className="opacity-50" /> :
         <Sprout size={48} className="opacity-50" />}
      </div>
      <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded">
        {project.category}
      </span>
    </div>
    
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-slate-600 mb-4 flex-grow">{project.summary}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-start text-xs text-slate-500">
          <span className="font-semibold w-16 shrink-0">Methods:</span>
          <span>{project.methods}</span>
        </div>
        <div className="flex items-start text-xs text-slate-500">
          <span className="font-semibold w-16 shrink-0">Outputs:</span>
          <span>{project.outputs}</span>
        </div>
      </div>

      <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
        <div className="text-xs text-slate-400 truncate max-w-[180px]">
          Lead: {project.owner}
        </div>
        <div className={`text-xs px-2 py-1 rounded-full ${project.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
          {project.status}
        </div>
      </div>
    </div>
  </div>
);

// --- PAGES ---

const HomePage = ({ navigate }) => (
  <div className="animate-fade-in">
    {/* Hero Section */}
    <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-58197bd47d26?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/20 to-slate-900"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl px-6 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 border border-emerald-400/50 rounded-full bg-emerald-900/30 backdrop-blur-sm text-emerald-300 text-sm font-medium tracking-wide">
          RESEARCH • TECHNOLOGY • REGENERATION
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
          Cultivating the Future of <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Vietnamese Agriculture
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          RegenLab applies artificial intelligence, remote sensing, and data science 
          to build transparent, resilient, and climate-smart agricultural systems.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => navigate('projects')}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center gap-2"
          >
            Explore Projects <ChevronRight size={18} />
          </button>
          <button 
            onClick={() => navigate('about')}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold rounded-lg transition-all border border-white/20"
          >
            Our Mission
          </button>
        </div>
      </div>
    </section>

    {/* Highlights */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 mb-4">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">AI-Driven Insights</h3>
            <p className="text-slate-600">Using LLMs and Computer Vision to diagnose crop health and optimize inputs for Vietnamese micro-climates.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 mb-4">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Climate Resilience</h3>
            <p className="text-slate-600">Developing tools specifically for adaptation to climate change, focusing on carbon modeling and water efficiency.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-700 mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Transparent Origins</h3>
            <p className="text-slate-600">Building trust through transparent data. We believe in proving the safety and origin of clean produce.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const AboutPage = () => (
  <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
    <SectionTitle subtitle>About RegenLab</SectionTitle>
    <div className="prose prose-lg text-slate-600 mx-auto">
      <p className="lead text-xl text-slate-800 font-medium mb-6">
        RegenLab is a pioneering research laboratory dedicated to the intersection of advanced technology and regenerative agriculture in Vietnam.
      </p>
      <p className="mb-6">
        Founded on the belief that the future of farming lies in the intelligent application of data, we bridge the gap between traditional ecological farming and modern computer science.
      </p>
      
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
          <h4 className="text-emerald-800 font-bold text-lg mb-2 flex items-center gap-2">
            <Microscope size={20}/> Research Focus
          </h4>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Machine Learning for crop disease detection</li>
            <li>Carbon sequestration modeling</li>
            <li>Supply chain transparency & digital traceability</li>
          </ul>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h4 className="text-blue-800 font-bold text-lg mb-2 flex items-center gap-2">
            <Users size={20}/> Core Values
          </h4>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Scientific Rigor</li>
            <li>Ecological Integrity</li>
            <li>Data Transparency</li>
            <li>Farmer-First Design</li>
          </ul>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Vision for Vietnam</h3>
      <p className="mb-6">
        We envision a Vietnamese agricultural sector where every crop's journey is transparent, every input is optimized for safety, and farmers are empowered by the same technologies used in Silicon Valley. By focusing on safety certifications and transparent production processes, we aim to rebuild consumer trust in clean vegetables.
      </p>
    </div>
  </div>
);

const ProjectsPage = () => (
  <div className="max-w-7xl mx-auto px-6 py-16 animate-fade-in">
    <SectionTitle subtitle>Research & Projects</SectionTitle>
    <div className="flex flex-wrap gap-4 justify-center mb-12">
       {/* Filter UI Placeholder */}
       {['All', 'AI/Tech', 'Crop Science', 'Climate', 'Digital'].map(filter => (
         <button key={filter} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === 'All' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
           {filter}
         </button>
       ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {PROJECTS.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  </div>
);

const VideosPage = () => (
  <div className="max-w-6xl mx-auto px-6 py-16 animate-fade-in">
    <SectionTitle subtitle>Demo Videos</SectionTitle>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {VIDEOS.map(video => (
        <div key={video.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Video Placeholder */}
          <div className="aspect-video bg-slate-900 relative flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform">
              <Play fill="white" className="text-white" size={28} />
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/60 text-white text-xs px-2 py-1 inline-block rounded">
                Demo Preview
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{video.title}</h3>
            <p className="text-slate-600 mb-4">{video.description}</p>
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-sm text-slate-500 font-medium">Owner: {video.owner}</span>
              <span className="text-sm text-slate-400">{video.date}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const InternshipPage = () => (
  <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
    <SectionTitle subtitle>Internship Program</SectionTitle>
    
    <div className="bg-gradient-to-br from-emerald-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white mb-12 shadow-xl">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h3 className="text-3xl font-bold mb-4">Join the Lab</h3>
          <p className="text-emerald-100 text-lg mb-6">
            We offer 3–12 month internship opportunities for students and researchers passionate about AgTech, AI, and Sustainability.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-white/10 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-white/20">Full-Stack Dev</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-white/20">Data Science</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-white/20">Agronomy</span>
          </div>
        </div>
        <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-md min-w-[280px]">
          <h4 className="font-bold text-xl mb-4 border-b border-white/20 pb-2">Program Details</h4>
          <ul className="space-y-3 text-sm text-emerald-50">
            <li className="flex items-center gap-2"><Leaf size={16}/> Real-world project impact</li>
            <li className="flex items-center gap-2"><Users size={16}/> Mentorship from senior engineers</li>
            <li className="flex items-center gap-2"><BarChart size={16}/> Research publication support</li>
            <li className="flex items-center gap-2"><MapPin size={16}/> Remote & On-site (Vietnam)</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h4 className="text-xl font-bold text-slate-800 mb-4">Who we are looking for</h4>
        <p className="text-slate-600 mb-4">
          Undergraduate or graduate students with a strong background in either computer science or agricultural sciences. You must be self-driven, curious, and ready to tackle unstructured problems.
        </p>
        <p className="text-slate-600">
          We value transparency and scientific rigor. You will be expected to document your work thoroughly and contribute to the lab's open knowledge base.
        </p>
      </div>
      <div>
        <h4 className="text-xl font-bold text-slate-800 mb-4">How to Apply</h4>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <p className="text-sm text-slate-600 mb-4">Send your CV, transcript, and a brief cover letter outlining your interest in regenerative agriculture to:</p>
          <a href="mailto:careers@regenlab.tech" className="flex items-center gap-2 text-emerald-600 font-bold hover:underline mb-4">
            <Mail size={18}/> careers@regenlab.tech
          </a>
          <p className="text-xs text-slate-500 italic">Please include "Internship Application - [Your Name]" in the subject line.</p>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
    <SectionTitle subtitle>Contact Us</SectionTitle>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Get in touch</h3>
          <p className="text-slate-600">
            Whether you are a farmer looking for tech solutions, a researcher looking to collaborate, or a student interested in our lab, we'd love to hear from you.
          </p>
        </div>
        
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 shrink-0">
            <Mail size={20}/>
          </div>
          <div>
            <h4 className="font-bold text-slate-800">Email</h4>
            <p className="text-slate-600">info@regenlab.tech</p>
            <p className="text-slate-600">partnerships@regenlab.tech</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 shrink-0">
            <MapPin size={20}/>
          </div>
          <div>
            <h4 className="font-bold text-slate-800">Lab Location</h4>
            <p className="text-slate-600">Hi-Tech Agriculture Park</p>
            <p className="text-slate-600">Ho Chi Minh City / Da Nang, Vietnam</p>
          </div>
        </div>
      </div>

      <form className="bg-white p-6 rounded-xl shadow-lg border border-slate-100" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
            <input type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Dr. Nguyen Van A" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Subject</label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all">
              <option>General Inquiry</option>
              <option>Project Collaboration</option>
              <option>Internship Application</option>
              <option>Media/Press</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
            <textarea className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all h-32" placeholder="How can we help?"></textarea>
          </div>
          <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors shadow-md">
            Send Message
          </button>
        </div>
      </form>
    </div>
  </div>
);

// --- MAIN LAYOUT ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage navigate={navigate} />;
      case 'about': return <AboutPage />;
      case 'projects': return <ProjectsPage />;
      case 'videos': return <VideosPage />;
      case 'internship': return <InternshipPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer group" 
              onClick={() => navigate('home')}
            >
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:bg-emerald-700 transition-colors">
                <Leaf size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-900 leading-none">RegenLab</span>
                <span className="text-xs text-emerald-600 font-medium tracking-widest">TECH</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(link => (
                <button
                  key={link.id}
                  onClick={() => navigate(link.id)}
                  className={`text-sm font-medium transition-colors hover:text-emerald-600 ${currentPage === link.id ? 'text-emerald-600' : 'text-slate-600'}`}
                >
                  {link.label}
                </button>
              ))}
              <button 
                onClick={() => navigate('contact')}
                className="px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-emerald-600 transition-colors"
              >
                Get Involved
              </button>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl">
            <div className="flex flex-col p-4 space-y-4">
              {NAV_LINKS.map(link => (
                <button
                  key={link.id}
                  onClick={() => navigate(link.id)}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-medium ${currentPage === link.id ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6 text-white">
                <Leaf size={24} className="text-emerald-400" />
                <span className="text-xl font-bold">RegenLab</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Applying advanced AI and remote sensing technologies to regenerate agriculture in Vietnam. 
                Building trust through transparent data.
              </p>
              <div className="flex gap-4">
                {/* Social Placeholders */}
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer"><ExternalLink size={14}/></div>
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer"><Mail size={14}/></div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => navigate('about')} className="hover:text-emerald-400 transition-colors">Our Mission</button></li>
                <li><button onClick={() => navigate('projects')} className="hover:text-emerald-400 transition-colors">Research Projects</button></li>
                <li><button onClick={() => navigate('internship')} className="hover:text-emerald-400 transition-colors">Careers & Internships</button></li>
                <li><button onClick={() => navigate('contact')} className="hover:text-emerald-400 transition-colors">Contact Support</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Research Areas</h4>
              <ul className="space-y-3 text-sm">
                <li><span className="text-slate-400">Carbon Modeling</span></li>
                <li><span className="text-slate-400">Remote Sensing (GIS)</span></li>
                <li><span className="text-slate-400">Crop Genetics</span></li>
                <li><span className="text-slate-400">Traceability Blockchain</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-1 text-emerald-500"/>
                  <span>Hi-Tech Agriculture Park,<br/>Vietnam</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-emerald-500"/>
                  <span>info@regenlab.tech</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} RegenLab Technology. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span className="hover:text-emerald-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-emerald-400 cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}