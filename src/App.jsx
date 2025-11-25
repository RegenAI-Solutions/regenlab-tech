import React, { useState } from 'react';
import { 
  Menu, X, ChevronRight, Leaf, Cpu, Globe, 
  Play, Users, Mail, MapPin, ExternalLink, 
  BarChart, Sprout, Database, Microscope,
  ArrowLeft, Loader2, CheckCircle
} from 'lucide-react';
import CaliforniaDashboard from './components/CaliforniaDashboard';

// Define IMG
import logoImg from './assets/logo.png';
import californiaImg from './assets/california_dashboard.jpeg';

// --- MULTI-LANGUAGE CONTENT ---
const CONTENT = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      videos: "Videos",
      internship: "Careers",
      contact: "Contact",
      cta: "Get Involved"
    },
    hero: {
      tagline: "EMPOWERING FARMERS • RESTORING PLANET",
      title_prefix: "Democratizing the",
      title_highlight: "Global Carbon Market",
      desc: "We're democratizing the carbon market for smallholder farmers with our revolutionary, low-cost, AI-powered MMRV platform.",
      btn_explore: "Explore Platform",
      btn_mission: "Our Solution"
    },
    highlights: {
      ai_title: "Scientifically-Credible",
      ai_desc: "Built on the DayCent model (Colorado State University), ensuring high-quality carbon credits that meet rigorous registry standards.",
      climate_title: "AI-Powered Automation",
      climate_desc: "Our AI-driven pipelines and Model Context Protocol (MCP) automate the entire MMRV process, enabling unprecedented scale.",
      origin_title: "Drastic Cost Reduction",
      origin_desc: "Leveraging AI agents to reduce MMRV costs by 80%, making carbon markets economically viable for smallholders.",
    },
    about: {
      title: "The RegenAI Advantage",
      lead: "The global carbon market holds immense promise, but high costs and complex science create barriers. RegenAI removes them.",
      vision_title: "Validated by Leading Institutions",
      vision_desc: "We've partnered with The Center for Regenerative Agriculture (CRARS) at California State University, Chico. This collaboration validates our robustness in real-world, academic settings.",
      focus: "A Simple Path to Credits",
      values: "Core Capabilities"
    },
    projects: {
      title: "Projects & Deployments",
      filter_all: "All",
      lead: "Lead",
      status: "Status",
      dev_msg: "Detailed dashboard for this project is under development.",
      check_cali: "Please check the California’s Regen Ag Planner for a live demo."
    },
    videos: { title: "Demo Videos", owner: "Owner" },
    internship: { 
      title: "Join the Revolution",
      join: "Partner with Us",
      desc: "Are you a smallholder farmer, a cooperative, or an investor? Help us fuel a scalable solution to one of the world's most pressing problems.",
      details: "Why Join?",
      apply_title: "Contact for Partnership",
      apply_msg: "Interested in piloting our MMRV Suite? Reach out to:"
    },
    contact: {
      title: "Contact Us",
      get_in_touch: "Unlock New Revenue",
      desc: "Tap into new income streams with verified carbon credits. Let's create a resilient, profitable future.",
      form: { name: "Name", email: "Email", subject: "Subject", msg: "Message", send: "Send Message", sending: "Sending...", success_title: "Message Sent!", success_desc: "Thank you for contacting RegenLab. We will get back to you shortly." }
    },
    footer: {
      desc: "Empowering farmers with low-cost, AI-powered MMRV tools. Validated by science, driven by impact.",
      links: "Quick Links",
      areas: "Technology",
      contact: "Contact",
      rights: "All rights reserved."
    }
  },
  vi: {
    nav: {
      home: "Trang chủ",
      about: "Giới thiệu",
      projects: "Dự án",
      videos: "Video",
      internship: "Hợp tác",
      contact: "Liên hệ",
      cta: "Tham gia ngay"
    },
    hero: {
      tagline: "TRAO QUYỀN NÔNG DÂN • PHỤC HỒI HÀNH TINH",
      title_prefix: "Dân chủ hóa",
      title_highlight: "Thị trường Carbon",
      desc: "Chúng tôi mang thị trường tín chỉ carbon đến với các nông hộ nhỏ bằng nền tảng MMRV ứng dụng AI đột phá với chi phí thấp.",
      btn_explore: "Khám phá Nền tảng",
      btn_mission: "Giải pháp"
    },
    highlights: {
      ai_title: "Khoa học Uy tín (DayCent)",
      ai_desc: "Xây dựng trên mô hình DayCent (ĐH Bang Colorado) phát triển hơn 45 năm, đảm bảo tín chỉ carbon đạt chuẩn quốc tế cao nhất.",
      climate_title: "Tự động hóa bằng AI",
      climate_desc: "Quy trình AI và giao thức MCP tự động hóa toàn bộ việc Đo đạc & Báo cáo (MMRV), mở rộng quy mô chưa từng có.",
      origin_title: "Cắt giảm 80% Chi phí",
      origin_desc: "Sử dụng AI Agents giúp giảm 80% chi phí vận hành, biến thị trường carbon thành cơ hội thực tế cho nông dân nhỏ.",
    },
    about: {
      title: "Lợi thế RegenAI",
      lead: "Thị trường carbon toàn cầu đầy tiềm năng nhưng rào cản chi phí quá lớn. RegenAI sinh ra để phá bỏ những rào cản đó.",
      vision_title: "Kiểm chứng bởi Tổ chức Hàng đầu",
      vision_desc: "Đối tác chiến lược với Trung tâm Nông nghiệp Tái sinh (CRARS) tại ĐH California State, Chico. Công nghệ của chúng tôi đã được kiểm chứng thực tế về độ tin cậy và khả năng mở rộng.",
      focus: "Đường đến Tín chỉ Carbon",
      values: "Năng lực Cốt lõi"
    },
    projects: {
      title: "Dự án & Triển khai",
      filter_all: "Tất cả",
      lead: "Phụ trách",
      status: "Trạng thái",
      dev_msg: "Dashboard chi tiết cho dự án này đang được phát triển.",
      check_cali: "Vui lòng xem demo tại dự án 'California’s Regen Ag Planner'."
    },
    videos: { title: "Video Demo", owner: "Người đăng" },
    internship: { 
      title: "Tham gia Cách mạng Tái sinh",
      join: "Hợp tác cùng RegenLab",
      desc: "Bạn là nông dân, hợp tác xã hay nhà đầu tư tác động? Hãy cùng chúng tôi mở khóa sức mạnh của thị trường carbon.",
      details: "Tại sao chọn RegenAI?",
      apply_title: "Liên hệ Hợp tác",
      apply_msg: "Bạn muốn thử nghiệm bộ công cụ MMRV Suite? Liên hệ ngay:"
    },
    contact: {
      title: "Liên hệ",
      get_in_touch: "Mở khóa Doanh thu mới",
      desc: "Tạo dòng thu nhập bền vững từ tín chỉ carbon đã được xác minh. Xây dựng tương lai thịnh vượng cho cộng đồng.",
      form: { name: "Họ tên", email: "Email", subject: "Chủ đề", msg: "Tin nhắn", send: "Gửi đi", sending: "Đang gửi...", success_title: "Gửi thành công!", success_desc: "Cảm ơn bạn đã liên hệ với RegenLab. Chúng tôi sẽ phản hồi sớm nhất." }
    },
    footer: {
      desc: "Trao quyền cho nông dân với công cụ MMRV AI chi phí thấp. Được kiểm chứng khoa học, thúc đẩy bởi tác động xã hội.",
      links: "Liên kết nhanh",
      areas: "Công nghệ",
      contact: "Thông tin",
      rights: "Bảo lưu mọi quyền."
    }
  }
};

const PROJECTS_DATA = [
  {
    id: 1,
    title: { en: "Vietnam Corn Optimization", vi: "Tối ưu hóa Giống Ngô Việt Nam" },
    owner: "uyen91nct2016@gmail.com",
    image: null,
    category: "Crop Science",
    summary: { en: "Optimizing corn yield using data-driven genetic selection.", vi: "Tối ưu hóa năng suất ngô bằng chọn lọc di truyền dựa trên dữ liệu." },
    status: "Active"
  },
  {
    id: 2,
    title: { en: "California’s Regen Ag Planner", vi: "Quy hoạch Nông nghiệp Tái sinh California" },
    owner: "Trần Văn Tuấn Phong",
    image: californiaImg,
    category: "Software Tool",
    summary: { en: "Digital planner for regenerative transition.", vi: "Công cụ lập kế hoạch kỹ thuật số cho chuyển đổi tái sinh." },
    status: "Active"
  },
  {
    id: 3,
    title: { en: "Indian IGP & Gujarat Analysis", vi: "Phân tích Khu vực IGP & Gujarat Ấn Độ" },
    owner: "thanhnganho0105@gmail.com",
    category: "Regional Analysis",
    summary: { en: "Satellite imagery processing for water efficiency.", vi: "Xử lý ảnh vệ tinh để đánh giá hiệu quả sử dụng nước." },
    status: "Active"
  },
  {
    id: 4,
    title: { en: "Hỏi RegenAI", vi: "Hỏi RegenAI" },
    owner: "Trần Văn Tuấn Phong",
    category: "AI Assistant",
    summary: { en: "LLM-powered chatbot for Vietnamese agriculture.", vi: "Chatbot AI chuyên biệt cho kiến thức nông nghiệp Việt Nam." },
    status: "Beta"
  },
  {
    id: 5,
    title: { en: "Digital Transformation: Quảng Trị", vi: "Chuyển đổi số Nông nghiệp Quảng Trị" },
    owner: "Lab Team",
    category: "Digital Transformation",
    summary: { en: "Blockchain traceability for organic chains.", vi: "Truy xuất nguồn gốc Blockchain cho chuỗi cung ứng hữu cơ." },
    status: "Active"
  },
  {
    id: 6,
    title: { en: "Thang’s Project", vi: "Dự án Nghiên cứu Đất (Thắng)" },
    owner: "dvthang774@gmail.com",
    category: "Research",
    summary: { en: "Advanced soil microbiome analysis.", vi: "Phân tích hệ vi sinh vật đất tiên tiến." },
    status: "Research"
  },
  {
    id: 7,
    title: { en: "VMD0053", vi: "VMD0053 (Carbon)" },
    owner: "uyen91nct2016@gmail.com",
    category: "Carbon Protocol",
    summary: { en: "Verified Carbon Standard methodology.", vi: "Phương pháp luận Tiêu chuẩn Carbon được xác minh." },
    status: "Review"
  },
  {
    id: 8,
    title: { en: "AI-Driven Pest Detection", vi: "Phát hiện Sâu bệnh bằng AI" },
    owner: "Open for Lead",
    category: "AI/Computer Vision",
    summary: { en: "Using drone imagery for early detection.", vi: "Sử dụng hình ảnh drone để phát hiện sớm dịch bệnh." },
    status: "Proposal"
  },
  {
    id: 9,
    title: { en: "Soil Carbon Modeling", vi: "Mô hình hóa Carbon trong Đất" },
    owner: "Open for Lead",
    category: "Climate Modeling",
    summary: { en: "Predictive modeling of sequestration.", vi: "Mô hình dự báo khả năng hấp thụ carbon." },
    status: "Proposal"
  },
  {
    id: 10,
    title: { en: "Rice Stress Analysis", vi: "Phân tích Đa phổ Lúa" },
    owner: "Open for Lead",
    category: "Remote Sensing",
    summary: { en: "Detecting abiotic stress using Sentinel-2.", vi: "Phát hiện căng thẳng phi sinh học bằng dữ liệu Sentinel-2." },
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

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('vi'); 
  const [activeProject, setActiveProject] = useState(null);

  const t = CONTENT[lang];

  const navigate = (pageId) => {
    setCurrentPage(pageId);
    setActiveProject(null);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const toggleLang = () => setLang(prev => prev === 'en' ? 'vi' : 'en');

  // Sub-components (Internal)
  const SectionTitle = ({ children, subtitle }) => (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-bold text-slate-800 font-display">{children}</h2>
      {subtitle && <div className="w-24 h-1 mx-auto mt-4 bg-emerald-600 rounded-full"></div>}
    </div>
  );

  const ProjectCard = ({ project, onClick }) => (
    <div onClick={onClick} className="flex flex-col h-full transition-all duration-300 bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-300 rounded-xl overflow-hidden group cursor-pointer">
      <div className="h-48 bg-slate-100 relative overflow-hidden">
        
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.title.en}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
          </>
        ): (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-slate-800 opacity-90 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute inset-0 flex items-center justify-center text-emerald-100">
              {project.category === 'AI/Computer Vision' || project.category === 'AI Assistant' ? <Cpu size={48} className="opacity-50" /> :
              project.category === 'Software Tool' ? <Database size={48} className="opacity-50" /> :
              <Sprout size={48} className="opacity-50" />}
          </div>
          </>
        )}

        <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded">{project.category}
          {project.category}
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">{project.title[lang]}</h3>
        <p className="text-sm text-slate-600 mb-4 flex-grow">{project.summary[lang]}</p>
        <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-400 truncate max-w-[180px]">{t.projects.lead}: {project.owner}</div>
          <div className={`text-xs px-2 py-1 rounded-full ${project.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{project.status}</div>
        </div>
      </div>
    </div>
  );

  // Page Renderers
  const HomePage = () => (
    <div className="animate-fade-in">
      <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-58197bd47d26?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/20 to-slate-900"></div>
        </div>
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 border border-emerald-400/50 rounded-full bg-emerald-900/30 backdrop-blur-sm text-emerald-300 text-sm font-medium tracking-wide">{t.hero.tagline}</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
            {t.hero.title_prefix} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{t.hero.title_highlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">{t.hero.desc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('projects')} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center gap-2">
              {t.hero.btn_explore} <ChevronRight size={18} />
            </button>
            <button onClick={() => navigate('about')} className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold rounded-lg transition-all border border-white/20">
              {t.hero.btn_mission}
            </button>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 mb-4"><Cpu size={24} /></div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{t.highlights.ai_title}</h3>
              <p className="text-slate-600">{t.highlights.ai_desc}</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 mb-4"><Globe size={24} /></div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{t.highlights.climate_title}</h3>
              <p className="text-slate-600">{t.highlights.climate_desc}</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-emerald-200 transition-colors">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-amber-700 mb-4"><Users size={24} /></div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{t.highlights.origin_title}</h3>
              <p className="text-slate-600">{t.highlights.origin_desc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const ProjectsPage = () => {
    if (activeProject && activeProject.id === 2) {
      // --- Pass lang prop to Dashboard ---
      return (
        <div className="max-w-7xl mx-auto px-6 py-16 animate-fade-in">
          <CaliforniaDashboard onBack={() => setActiveProject(null)} lang={lang} />
        </div>
      );
    }
    if (activeProject) {
      return (
        <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in text-center">
           <button onClick={() => setActiveProject(null)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-emerald-600 mx-auto font-medium"><ArrowLeft size={20} /> {t.back || "Back"}</button>
          <h2 className="text-3xl font-bold mb-4">{activeProject.title[lang]}</h2>
          <div className="bg-slate-100 p-12 rounded-xl">
            <p className="text-slate-500">{t.projects.dev_msg}</p>
            <p className="text-sm text-slate-400 mt-2">{t.projects.check_cali}</p>
          </div>
        </div>
      );
    }
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 animate-fade-in">
        <SectionTitle subtitle>{t.projects.title}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map(project => <ProjectCard key={project.id} project={project} onClick={() => setActiveProject(project)} />)}
        </div>
      </div>
    );
  };

  const AboutPage = () => (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
      <SectionTitle subtitle>{t.about.title}</SectionTitle>
      <div className="prose prose-lg text-slate-600 mx-auto">
        <p className="lead text-xl text-slate-800 font-medium mb-6">{t.about.lead}</p>
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
            <h4 className="text-emerald-800 font-bold text-lg mb-2 flex items-center gap-2"><Microscope size={20}/> {t.about.focus}</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Machine Learning</li>
              <li>Carbon Modeling</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h4 className="text-blue-800 font-bold text-lg mb-2 flex items-center gap-2"><Users size={20}/> {t.about.values}</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Transparency</li>
              <li>Sustainability</li>
              <li>Farmer-First</li>
            </ul>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">{t.about.vision_title}</h3>
        <p className="mb-6">{t.about.vision_desc}</p>
      </div>
    </div>
  );

  const InternshipPage = () => (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
      <SectionTitle subtitle>{t.internship.title}</SectionTitle>
      <div className="bg-gradient-to-br from-emerald-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white mb-12 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-4">{t.internship.join}</h3>
            <p className="text-emerald-100 text-lg mb-6">{t.internship.desc}</p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/10 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-white/20">Full-Stack Dev</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-white/20">Data Science</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-white/20">Agronomy</span>
            </div>
          </div>
          <div className="bg-white/10 p-6 rounded-xl border border-white/10 backdrop-blur-md min-w-[280px]">
            <h4 className="font-bold text-xl mb-4 border-b border-white/20 pb-2">{t.internship.details}</h4>
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
          <p className="text-slate-600 mb-4">Undergraduate or graduate students with a strong background in either computer science or agricultural sciences.</p>
        </div>
        <div>
          <h4 className="text-xl font-bold text-slate-800 mb-4">{t.internship.apply_title}</h4>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-600 mb-4">{t.internship.apply_msg}</p>
            <a href="mailto:menoi1900@gmail.com" className="flex items-center gap-2 text-emerald-600 font-bold hover:underline mb-4"><Mail size={18}/> menoi1900@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => {
    const [status, setStatus] = useState('idle'); 

    const handleSubmit = (e) => {
      e.preventDefault();
      setStatus('submitting');
      
      setTimeout(() => {
        setStatus('success');
      }, 1500);
    };

    return (
      <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
        <SectionTitle subtitle>{t.contact.title}</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div><h3 className="text-xl font-bold text-slate-800 mb-2">{t.contact.get_in_touch}</h3><p className="text-slate-600">{t.contact.desc}</p></div>
            <div className="flex items-start gap-4"><div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 shrink-0"><Mail size={20}/></div><div><h4 className="font-bold text-slate-800">Email</h4><p className="text-slate-600">menoi1900@gmail.com</p></div></div>
          </div>
          
          {status === 'success' ? (
            <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-xl text-center flex flex-col items-center justify-center h-full shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-2xl font-bold text-emerald-800 mb-2">{t.contact.form.success_title}</h4>
              <p className="text-emerald-600">{t.contact.form.success_desc}</p>
              <button onClick={() => setStatus('idle')} className="mt-6 px-6 py-2 bg-white text-emerald-600 font-semibold rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors text-sm">
                Send Another
              </button>
            </div>
          ) : (
            <form className="bg-white p-6 rounded-xl shadow-lg border border-slate-100" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div><label className="block text-sm font-semibold text-slate-700 mb-1">{t.contact.form.name}</label><input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" /></div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-1">{t.contact.form.email}</label><input type="email" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" /></div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-1">{t.contact.form.subject}</label><select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"><option>General Inquiry</option><option>Project Collaboration</option><option>Internship Application</option></select></div>
                <div><label className="block text-sm font-semibold text-slate-700 mb-1">{t.contact.form.msg}</label><textarea required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-32"></textarea></div>
                <button 
                  disabled={status === 'submitting'}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <><Loader2 size={20} className="animate-spin" /> {t.contact.form.sending}</>
                  ) : (
                    t.contact.form.send
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  };

  const VideosPage = () => (
    <div className="max-w-6xl mx-auto px-6 py-16 animate-fade-in">
      <SectionTitle subtitle={t.videos.title} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {VIDEOS.map(video => (
          <div key={video.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="aspect-video bg-slate-900 relative flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform">
                <Play fill="white" className="text-white" size={28} />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{video.title}</h3>
              <p className="text-slate-600 mb-4">{video.description}</p>
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-sm text-slate-500 font-medium">{t.videos.owner}: {video.owner}</span>
                <span className="text-sm text-slate-400">{video.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('home')}>
              <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:bg-emerald-700 transition-colors overflow-hidden">
                <img src={logoImg} alt="Logo" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-900 leading-none">RegenLab</span>
                <span className="text-xs text-emerald-600 font-medium tracking-widest">TECH</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {['home','about','projects','videos','internship','contact'].map(key => (
                <button key={key} onClick={() => navigate(key)} className={`text-sm font-medium transition-colors hover:text-emerald-600 ${currentPage === key ? 'text-emerald-600' : 'text-slate-600'}`}>{t.nav[key]}</button>
              ))}
              <button onClick={toggleLang} className="flex items-center gap-1 px-3 py-1 border border-slate-200 rounded-full text-xs font-bold hover:bg-slate-50 transition-colors">
                <Globe size={14}/> {lang === 'en' ? 'EN' : 'VI'}
              </button>
              <button onClick={() => navigate('contact')} className="px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-emerald-600 transition-colors">{t.nav.cta}</button>
            </div>
            <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><Menu size={24} /></button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'projects' && <ProjectsPage />}
        {currentPage === 'videos' && <VideosPage />}
        {currentPage === 'internship' && <InternshipPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6 text-white justify-center md:justify-start">
                <img src={logoImg} alt="Logo" className="w-6 h-6 object-contain" /> 
                <span className="text-xl font-bold">RegenLab</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{t.footer.desc}</p>
            </div>
            <div><h4 className="text-white font-bold mb-6">{t.footer.links}</h4><ul className="space-y-3 text-sm"><li><button onClick={() => navigate('about')}>{t.nav.about}</button></li><li><button onClick={() => navigate('projects')}>{t.nav.projects}</button></li></ul></div>
            <div><h4 className="text-white font-bold mb-6">{t.footer.areas}</h4><ul className="space-y-3 text-sm"><li>Carbon Modeling</li><li>Remote Sensing</li></ul></div>
            <div><h4 className="text-white font-bold mb-6">{t.footer.contact}</h4><ul className="space-y-3 text-sm text-slate-400"><li>menoi1900@gmail.com</li></ul></div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-xs text-slate-500 text-center">
            &copy; {new Date().getFullYear()} RegenLab Technology. {t.footer.rights}
          </div>
        </div>
      </footer>
    </div>
  );
}