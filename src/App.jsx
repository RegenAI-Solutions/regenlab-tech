import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useParams, useLocation, Navigate, Outlet } from 'react-router-dom';
import {
  Menu, ChevronRight, Leaf, Cpu, Globe,
  Play, Users, Mail, MapPin,
  BarChart, Sprout, Database, Microscope,
  ArrowLeft, Loader2, CheckCircle, Clock, Send
} from 'lucide-react';

// Dashboard for Projects
import { DASHBOARD_COMPONENTS } from './config/dashboardMapping';

// IMG
import logoImg from './assets/logo.png';

import CONTENT from './data/content';
import PROJECTS_DATA from './data/projects';
import VIDEOS from './data/videos';

// --- SUB-COMPONENTS ---
import AboutPage from './components/AboutPage';

// --- HELPERS ---
const useAppLang = () => {
  const { lang: urlLang } = useParams();
  // Valid languages are 'vn' and 'en' in URL, map 'vn' -> 'vi' for content
  if (urlLang === 'en') return 'en';
  return 'vi';
};

const SectionTitle = ({ children, subtitle }) => (
  <div className="mb-10 text-center">
    <h2 className="text-3xl font-bold text-slate-800 font-display">{children}</h2>
    {subtitle && <div className="w-24 h-1 mx-auto mt-4 bg-emerald-600 rounded-full"></div>}
  </div>
);

const ProjectCard = ({ project, onClick, lang }) => (
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
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-slate-800 opacity-90 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute inset-0 flex items-center justify-center text-emerald-100">
            {project.category === 'AI/Computer Vision' || project.category === 'AI Assistant' ? <Cpu size={48} className="opacity-50" /> :
              project.category === 'Software Tool' ? <Database size={48} className="opacity-50" /> :
                <Sprout size={48} className="opacity-50" />}
          </div>
        </>
      )}
      <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2 py-1 rounded">
        {project.category}
      </span>
    </div>

    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">{project.title[lang]}</h3>
      <p className="text-sm text-slate-600 mb-4 flex-grow">{project.summary[lang]}</p>
      <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
        <div className="text-xs text-slate-400 truncate max-w-[180px]">{CONTENT[lang].projects.lead}: {project.owner}</div>
        <div className={`text-xs px-2 py-1 rounded-full ${project.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{project.status}</div>
      </div>
    </div>
  </div>
);

// --- NAVIGATION COMPONENT ---
function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang: urlLang } = useParams(); // 'vn' or 'en'
  const lang = useAppLang(); // 'vi' or 'en'

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = CONTENT[lang];

  const navItems = [
    { key: 'about', path: '/' },
    { key: 'projects', path: '/projects' },
    { key: 'partners', path: '/partners' },
    { key: 'careers', path: '/careers' },
    { key: 'contact', path: '/contact' }
  ];

  const toggleLang = () => {
    // Switch between /vn and /en
    const currentUrlPrefix = urlLang || 'vn';
    const newUrlPrefix = currentUrlPrefix === 'en' ? 'vn' : 'en';

    // Replace the first segment
    const currentPath = location.pathname;
    // Assuming structure matches /:lang/... 
    // We regex replace the start
    const newPath = currentPath.replace(/^\/(vn|en|vi)/, `/${newUrlPrefix}`);
    navigate(newPath);
  };

  const currentPrefix = `/${urlLang || 'vn'}`;

  const handleNavigate = (path) => {
    // path is key like '/' or '/projects'
    // append to prefix
    let targetPath = path;
    if (path === '/') targetPath = `${currentPrefix}`;
    else if (path.startsWith('/')) targetPath = `${currentPrefix}${path}`;
    else targetPath = `${currentPrefix}/${path}`;

    navigate(targetPath);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleNavigate('/')}>
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:bg-emerald-700 transition-colors overflow-hidden">
              <img src={logoImg} alt="Logo" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 leading-none">RegenLab</span>
              <span className="text-xs text-emerald-600 font-medium tracking-widest">TECH</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(({ key, path, isScroll }) => (
              <span
                key={key}
                onClick={() => {
                  handleNavigate(path);
                  if (isScroll) {
                    setTimeout(() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }
                }}
                className="text-sm font-medium transition-colors hover:text-emerald-600 text-slate-600 cursor-pointer"
              >
                {t.nav[key]}
              </span>
            ))}
            <a href="/app/" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">{t.nav.portal}</a>
            <button onClick={toggleLang} className="flex items-center gap-1 px-3 py-1 border border-slate-200 rounded-full text-xs font-bold hover:bg-slate-50 transition-colors">
              <Globe size={14} /> {lang === 'en' ? 'EN' : 'VI'}
            </button>
            <button onClick={() => handleNavigate('/contact')} className="px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-emerald-600 transition-colors">{t.nav.cta}</button>
          </div>
          <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><Menu size={24} /></button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-1 border-t border-slate-100 pt-2">
            {navItems.map(({ key, path }) => (
              <span key={key} onClick={() => handleNavigate(path)} className="px-2 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 cursor-pointer">{t.nav[key]}</span>
            ))}
            <a href="/app/" className="px-2 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600">{t.nav.portal}</a>
            <div className="flex items-center gap-3 mt-2 px-2">
              <button onClick={toggleLang} className="flex items-center gap-1 px-3 py-1 border border-slate-200 rounded-full text-xs font-bold hover:bg-slate-50"><Globe size={14} /> {lang === 'en' ? 'EN' : 'VI'}</button>
              <button onClick={() => handleNavigate('/contact')} className="px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-emerald-600 transition-colors">{t.nav.cta}</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// --- FOOTER COMPONENT ---
function Footer() {
  const navigate = useNavigate();
  const lang = useAppLang();
  const { lang: urlLang } = useParams();
  const t = CONTENT[lang];

  const currentPrefix = `/${urlLang || 'vn'}`;
  const handleNav = (path) => {
    let targetPath = path;
    if (path === '/') targetPath = `${currentPrefix}`;
    else if (path.startsWith('/')) targetPath = `${currentPrefix}${path}`;
    else targetPath = `${currentPrefix}/${path}`;
    navigate(targetPath);
    window.scrollTo(0, 0);
  }

  return (
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
          <div><h4 className="text-white font-bold mb-6">{t.footer.links}</h4><ul className="space-y-3 text-sm"><li><button onClick={() => handleNav('/')} className="hover:text-emerald-400 transition-colors">{t.nav.about}</button></li><li><button onClick={() => handleNav('/projects')} className="hover:text-emerald-400 transition-colors">{t.nav.projects}</button></li><li><button onClick={() => handleNav('/partners')} className="hover:text-emerald-400 transition-colors">{t.nav.partners}</button></li><li><button onClick={() => handleNav('/careers')} className="hover:text-emerald-400 transition-colors">{t.nav.careers}</button></li><li><a href="/app/" className="hover:text-emerald-400 transition-colors">{t.nav.portal}</a></li></ul></div>
          <div><h4 className="text-white font-bold mb-6">{t.footer.areas}</h4><ul className="space-y-3 text-sm">{t.footer.area_items.map((a, i) => (<li key={i}>{a}</li>))}</ul></div>
          <div><h4 className="text-white font-bold mb-6">{t.footer.contact}</h4><ul className="space-y-3 text-sm text-slate-400"><li>info@regenlab.tech</li></ul></div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-xs text-slate-500 text-center">
          &copy; {new Date().getFullYear()} RegenLab. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}

// --- PAGE COMPONENTS ---
function HomePage() {
  // Redirect to show AboutPage content
  const lang = useAppLang();
  return <AboutPage lang={lang} showHero={true} />;
}

function ProjectsPage() {
  const navigate = useNavigate();
  const { projectSlug, lang: urlLang } = useParams();
  const lang = useAppLang();
  const t = CONTENT[lang];

  const currentPrefix = `/${urlLang || 'vn'}`;

  const activeProject = projectSlug ? PROJECTS_DATA.find(p => p.slug === projectSlug) : null;

  // Case 1: Show dashboard if project has one configured
  if (activeProject && activeProject.dashboardComponent) {
    const DashboardComponent = DASHBOARD_COMPONENTS[activeProject.dashboardComponent];
    if (DashboardComponent) {
      return (
        <div className="max-w-7xl mx-auto px-6 py-16 animate-fade-in">
          <DashboardComponent onBack={() => navigate(`${currentPrefix}/projects`)} lang={lang} />
        </div>
      );
    }
  }

  // Case 2: Show placeholder for projects without dashboard
  if (activeProject) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in text-center">
        <button onClick={() => navigate(`${currentPrefix}/projects`)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-emerald-600 mx-auto font-medium"><ArrowLeft size={20} /> {t.back || "Back"}</button>
        <h2 className="text-3xl font-bold mb-4">{activeProject.title[lang]}</h2>
        <div className="bg-slate-100 p-12 rounded-xl">
          <p className="text-slate-500">{t.projects.dev_msg}</p>
          <p className="text-sm text-slate-400 mt-2">{t.projects.check_cali}</p>
        </div>
      </div>
    );
  }

  // Case 3: Show list of all projects
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 animate-fade-in">
      <SectionTitle subtitle>{t.projects.title}</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS_DATA.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            lang={lang}
            onClick={() => navigate(`${currentPrefix}/projects/${project.slug}`)}
          />
        ))}
      </div>
    </div>
  );
}

function PartnersPage() {
  const lang = useAppLang();
  const p = CONTENT[lang].partners;

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 animate-fade-in">
      <SectionTitle subtitle>{p.title}</SectionTitle>
      <div className="bg-gradient-to-br from-emerald-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white mb-12 shadow-xl">
        <h3 className="text-3xl font-bold mb-4">{p.join}</h3>
        <p className="text-emerald-100 text-lg">{p.desc}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-xl font-bold text-slate-800 mb-4">{p.details}</h4>
          <ul className="space-y-3">
            {p.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-600"><CheckCircle size={18} className="text-emerald-600 mt-0.5 shrink-0" /> {b}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold text-slate-800 mb-4">{p.who_title}</h4>
          <p className="text-slate-600 mb-6">{p.who_desc}</p>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-800 mb-2">{p.apply_title}</h5>
            <p className="text-sm text-slate-600 mb-3">{p.apply_msg}</p>
            <a href="mailto:info@regenlab.tech" className="flex items-center gap-2 text-emerald-600 font-bold hover:underline"><Mail size={18} /> info@regenlab.tech</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function CareersPage() {
  const lang = useAppLang();
  const c = CONTENT[lang].careers;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 animate-fade-in">
      <SectionTitle subtitle>{c.title}</SectionTitle>
      <div className="bg-gradient-to-br from-emerald-900 to-slate-800 rounded-2xl p-8 md:p-12 text-white mb-12 shadow-xl">
        <h3 className="text-3xl font-bold mb-4">{c.intro_title}</h3>
        <p className="text-emerald-100 text-lg">{c.intro}</p>
      </div>

      <div className="mb-12">
        <h4 className="text-2xl font-bold text-slate-800 mb-3">{c.internship_title}</h4>
        <p className="text-slate-600 mb-5 max-w-3xl">{c.internship_desc}</p>
        <div className="flex flex-wrap gap-3">
          {c.internship_tags.map((tag, i) => (
            <span key={i} className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-sm font-medium">{tag}</span>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h4 className="text-2xl font-bold text-slate-800 mb-1">{c.roles_title}</h4>
        <p className="text-sm text-slate-400 mb-6">{c.roles_note}</p>
        <div className="space-y-4">
          {c.roles.map((role, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <h5 className="text-lg font-bold text-slate-900">{role.title}</h5>
                <p className="text-sm text-slate-600 mt-1">{role.desc}</p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-1 shrink-0">
                <span className="text-xs font-bold uppercase tracking-wide text-emerald-700 bg-emerald-50 px-2 py-1 rounded">{role.type}</span>
                <span className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={12} /> {role.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 max-w-2xl">
        <h5 className="font-bold text-slate-800 mb-2">{c.apply_title}</h5>
        <p className="text-sm text-slate-600 mb-3">{c.apply_msg}</p>
        <a href="mailto:info@regenlab.tech" className="flex items-center gap-2 text-emerald-600 font-bold hover:underline"><Mail size={18} /> info@regenlab.tech</a>
      </div>
    </div>
  );
}

function ContactPage() {
  const lang = useAppLang();
  const [status, setStatus] = useState('idle');
  const t = CONTENT[lang];

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');

    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 animate-fade-in">
      <SectionTitle subtitle>{t.contact.title}</SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{t.contact.get_in_touch}</h3>
            <p className="text-slate-600">{t.contact.desc}</p>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 shrink-0">
              <MapPin size={22} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1">{t.contact.office_title}</h4>
              <p className="text-slate-600 text-sm leading-relaxed">{t.contact.office_address}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 shrink-0">
              <Mail size={22} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1">{t.contact.email_title}</h4>
              <p className="text-slate-600">{t.contact.email_address}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 shrink-0">
              <Clock size={22} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1">{t.contact.hours_title}</h4>
              <p className="text-slate-600">{t.contact.hours_desc}</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        {status === 'success' ? (
          <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-xl text-center flex flex-col items-center justify-center h-full shadow-sm">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
              <CheckCircle size={32} />
            </div>
            <h4 className="text-2xl font-bold text-emerald-800 mb-2">{t.contact.form.success_title}</h4>
            <p className="text-emerald-600 mb-6">{t.contact.form.success_desc}</p>
            <button
              onClick={() => setStatus('idle')}
              className="px-6 py-2 bg-white text-emerald-600 font-semibold rounded-lg border border-emerald-200 hover:bg-emerald-50 transition-colors text-sm"
            >
              {t.contact.form.send_another}
            </button>
          </div>
        ) : (
          <form className="bg-white p-6 rounded-xl shadow-lg border border-slate-100" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">{t.contact.form.name}</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder={t.contact.form.name_placeholder}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">{t.contact.form.email}</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">{t.contact.form.subject}</label>
                <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                  <option>{t.contact.form.subject_general}</option>
                  <option>{t.contact.form.subject_collaboration}</option>
                  <option>{t.contact.form.subject_internship}</option>
                  <option>{t.contact.form.subject_training}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">{t.contact.form.msg}</label>
                <textarea
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none h-32 resize-none"
                  placeholder={t.contact.form.msg_placeholder}
                ></textarea>
              </div>

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
}

function VideosPage() {
  const lang = useAppLang();
  const t = CONTENT[lang];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 animate-fade-in">
      <SectionTitle subtitle>{t.videos.title}</SectionTitle>
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
}

// --- APP & LAYOUT ---

function AppLayout() {
  const navigate = useNavigate();
  const { lang } = useParams();

  // Validate Lang in Layout
  useEffect(() => {
    if (lang !== 'vn' && lang !== 'en') {
      navigate('/vn', { replace: true });
    }
  }, [lang, navigate]);

  if (lang !== 'vn' && lang !== 'en') return null;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/vn" replace />} />
        <Route path="/:lang" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<Navigate to="" replace />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:projectSlug" element={<ProjectsPage />} />
          {/* <Route path="videos" element={<VideosPage />} /> */}
          <Route path="partners" element={<PartnersPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="internship" element={<Navigate to="../careers" replace />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/vn" replace />} />
      </Routes>
    </HashRouter>
  );
}
