import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import {
    Users, Target, Globe, Award, BookOpen, Sprout,
    ArrowRight, MapPin, Plane, Factory, Flag, Code, Link2, ExternalLink,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CONTENT from '../data/content';
import nguyenMinhHieuImg from '../assets/members/nguyen_minh_hieu.png';
import nguyenHuuTrungImg from '../assets/members/nguyen_huu_trung.jpg';

const SectionTitle = ({ children, subtitle, light = false }) => (
    <div className="mb-12 text-center">
        <h2 className={`text-3xl md:text-4xl font-bold font-display ${light ? 'text-white' : 'text-slate-900'}`}>{children}</h2>
        {subtitle && <div className="w-24 h-1.5 mx-auto mt-6 bg-emerald-500 rounded-full"></div>}
    </div>
);

const getIconComponent = (iconName) => {
    const icons = {
        seedling: Sprout,
        plane: Plane,
        industry: Factory,
        flag: Flag
    };
    return icons[iconName] || Sprout;
};

const getColorClasses = (color) => {
    const colors = {
        green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-600' },
        blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-600' },
        purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-600' },
        yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', border: 'border-yellow-600' },
        teal: { bg: 'bg-teal-100', text: 'text-teal-600', border: 'border-teal-600' },
        orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-600' },
        pink: { bg: 'bg-pink-100', text: 'text-pink-600', border: 'border-pink-600' },
        gray: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-600' }
    };
    return colors[color] || colors.green;
};

const ProjectCard = ({ project }) => {
    const isInternal = project.url && project.url.startsWith('/');
    const cardClasses = `${project.highlight ? 'bg-gradient-to-br from-emerald-600 to-emerald-800 text-white' : 'bg-gray-50 hover:bg-white'} rounded-xl p-6 hover:shadow-lg transition border ${project.highlight ? '' : 'border-gray-100 group'} flex-shrink-0 snap-center flex flex-col`;
    const cardStyle = { minWidth: '300px', width: '300px' };

    const CardContent = () => (
        <>
            <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{project.flag}</div>
                {project.highlight && <div className="text-yellow-400">⭐</div>}
                {project.url && !isInternal && !project.highlight && <ExternalLink size={18} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />}
                {project.url && !isInternal && project.highlight && <ExternalLink size={18} className="text-white/70 group-hover:text-white transition-colors" />}
                {project.url && isInternal && <ArrowRight size={18} className="text-slate-400 group-hover:text-emerald-600 transition-colors" />}
            </div>
            <h3 className={`font-bold text-lg mb-2 ${project.highlight ? 'text-white' : 'text-slate-900 group-hover:text-emerald-600 transition-colors'}`}>{project.country}</h3>
            <p className={`text-sm ${project.highlight ? 'text-white/90' : 'text-slate-600'} flex-grow`}>{project.desc}</p>
        </>
    );

    if (project.url) {
        if (isInternal) {
            return (
                <Link to={project.url} className={`${cardClasses} block cursor-pointer`} style={cardStyle}>
                    <CardContent />
                </Link>
            );
        }
        return (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className={`${cardClasses} block cursor-pointer`} style={cardStyle}>
                <CardContent />
            </a>
        );
    }

    return (
        <div className={cardClasses} style={cardStyle}>
            <CardContent />
        </div>
    );
};

const useInfiniteCarousel = (items, itemWidth, autoPlayInterval = 2500) => {
    const containerRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    // Create extended items (6 sets)
    const extendedItems = useMemo(() => [
        ...items, ...items, ...items, ...items, ...items, ...items
    ], [items]);

    const scroll = useCallback((direction) => {
        const container = containerRef.current;
        if (container) {
            if (direction === 'left') {
                container.scrollBy({ left: -itemWidth, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: itemWidth, behavior: 'smooth' });
            }
        }
    }, [itemWidth]);

    // Initial positioning & Infinite Loop Logic
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const singleSetWidth = itemWidth * items.length;

        // Initial positioning
        if (container.scrollLeft === 0) {
            container.scrollLeft = singleSetWidth * 2;
        }

        const handleScroll = () => {
            const scrollLeft = container.scrollLeft;
            const totalWidth = container.scrollWidth;

            if (scrollLeft < singleSetWidth) {
                container.scrollLeft = scrollLeft + singleSetWidth * 2;
            } else if (scrollLeft > totalWidth - singleSetWidth * 2) {
                container.scrollLeft = scrollLeft - singleSetWidth * 2;
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [items, itemWidth]);

    // Auto-play Logic
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused) {
                scroll('right');
            }
        }, autoPlayInterval);

        return () => clearInterval(interval);
    }, [isPaused, scroll, autoPlayInterval]);

    return { containerRef, extendedItems, scroll, setIsPaused };
};

export default function AboutPage({ lang, showHero = true }) {
    const t = CONTENT[lang].about;

    // Projects Carousel Logic
    const {
        containerRef: projectsContainerRef,
        extendedItems: extendedProjectItems,
        scroll: scrollProjects,
        setIsPaused: setIsProjectsPaused
    } = useInfiniteCarousel(t.projects.items, 324); // 300px card + 24px gap

    // Team Carousel Logic
    const {
        containerRef: teamContainerRef,
        extendedItems: extendedTeamItems,
        scroll: scrollTeam,
        setIsPaused: setIsTeamPaused
    } = useInfiniteCarousel(t.team.members, 304); // 280px card + 24px gap

    return (
        <div id="about-section" className="animate-fade-in">
            {/* 1. HERO SECTION */}
            {showHero && (
                <section className="relative py-24 md:py-32 overflow-hidden bg-slate-900 text-white">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-58197bd47d26?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900"></div>

                    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                        <div className="inline-block px-4 py-1.5 mb-6 border border-emerald-500/30 rounded-full bg-emerald-900/20 backdrop-blur-sm text-emerald-400 text-sm font-semibold tracking-[0.2em] uppercase">
                            {t.title}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">
                            {t.lead} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-sky-400">{t.lead_highlight}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                            {t.sub_lead}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => document.getElementById('story').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-white text-emerald-600 font-bold rounded-full hover:bg-gray-100 transition-all shadow-lg">
                                {t.cta_journey}
                            </button>
                            <button onClick={() => document.getElementById('leadership').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all">
                                {t.cta_team}
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* 2. THE PROBLEM - 3 Column Layout */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <SectionTitle subtitle>{t.problem.title}</SectionTitle>
                    <p className="text-center text-slate-600 max-w-3xl mx-auto mb-12 text-lg leading-relaxed">
                        {t.problem.desc}
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 items-center">
                        {/* Ag Expert */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-amber-500 text-center hover:-translate-y-2 transition duration-300">
                            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-600">
                                <Sprout size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t.problem.ag_expert_title}</h3>
                            <p className="text-slate-600">{t.problem.ag_expert_desc}</p>
                        </div>

                        {/* Bridge */}
                        <div className="text-center md:py-0 py-8">
                            <div className="text-gray-300 text-6xl mb-2"><Link2 size={64} className="mx-auto rotate-90 md:rotate-0" /></div>
                            <p className="font-medium text-red-500 italic mb-4">"Khoảng cách ngôn ngữ"</p>
                            <div className="mt-8">
                                <ArrowRight size={24} className="text-emerald-600 mx-auto mb-2 animate-bounce md:hidden" />
                                <p className="text-emerald-600 font-bold">{t.problem.bridge_text}</p>
                            </div>
                        </div>

                        {/* Tech Expert */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-blue-500 text-center hover:-translate-y-2 transition duration-300">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                                <Code size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t.problem.tech_expert_title}</h3>
                            <p className="text-slate-600">{t.problem.tech_expert_desc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. OUR STORY - 4 Steps Timeline */}
            <section id="story" className="py-20 bg-white relative">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">Hành trình</span>
                        <h2 className="text-4xl font-bold text-slate-900 mt-2">{t.story.subtitle}</h2>
                        <p className="text-slate-600 mt-4 max-w-2xl mx-auto">{t.story.desc}</p>
                    </div>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-emerald-200 -translate-x-1/2 hidden md:block"></div>
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-200 -translate-x-1/2 md:hidden"></div>

                        <div className="space-y-12">
                            {t.story.steps.map((step, index) => {
                                const IconComponent = getIconComponent(step.icon);
                                const iconColors = ['bg-emerald-500', 'bg-blue-500', 'bg-amber-500', 'bg-red-600'];

                                return (
                                    <div key={index} className={`relative flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                        {/* Timeline Dot */}
                                        <div className={`absolute left-4 md:left-1/2 w-10 h-10 ${iconColors[index]} rounded-full border-4 border-white shadow-xl -translate-x-1/2 z-10 flex items-center justify-center text-white`}>
                                            <IconComponent size={20} />
                                        </div>

                                        {/* Content */}
                                        <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                                            <div className={`bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                                {/* Arrow for desktop */}
                                                <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-b border-l border-slate-100 transform rotate-45 ${index % 2 === 0 ? '-left-2' : '-right-2 border-r border-t border-b-0 border-l-0'}`}></div>

                                                <h3 className="text-xl font-bold text-slate-900 mb-1">{step.title}</h3>
                                                <p className="text-slate-500 text-sm mb-3">{step.subtitle}</p>
                                                <p className="text-slate-700 leading-relaxed">{step.desc}</p>
                                            </div>
                                        </div>

                                        {/* Empty space for the other side */}
                                        <div className="w-full md:w-1/2 hidden md:block"></div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. OUR MISSION - Image-based cards */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">{t.mission.subtitle}</span>
                        <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-6">{t.mission.title}</h2>
                        <p className="text-slate-600 max-w-3xl mx-auto">{t.mission.desc}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Pillar 1 */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group min-h-[400px]">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
                            <img src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1740&auto=format&fit=crop" alt="Students" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-emerald-600 p-2 rounded-lg text-white"><Users size={24} /></div>
                                    <h3 className="text-2xl font-bold text-white">{t.mission.pillar1_title}</h3>
                                </div>
                                <p className="text-gray-200 leading-relaxed">{t.mission.pillar1_desc}</p>
                            </div>
                        </div>

                        {/* Pillar 2 */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group min-h-[400px]">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
                            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1744&auto=format&fit=crop" alt="Technology" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-blue-600 p-2 rounded-lg text-white"><Globe size={24} /></div>
                                    <h3 className="text-2xl font-bold text-white">{t.mission.pillar2_title}</h3>
                                </div>
                                <p className="text-gray-200 leading-relaxed">{t.mission.pillar2_desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. LEADERSHIP - Horizontal cards */}
            <section id="leadership" className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-600/10 skew-x-12 transform translate-x-20"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <SectionTitle subtitle light>{t.leadership.title}</SectionTitle>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Prof Hieu */}
                        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col md:flex-row gap-8 items-center hover:bg-slate-750 transition">
                            <div className="w-32 h-32 md:w-40 md:h-40 shrink-0">
                                <img src={nguyenMinhHieuImg} alt="GS.TS Nguyễn Minh Hiếu" className="w-full h-full rounded-full object-cover border-4 border-emerald-500 shadow-xl" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{t.leadership.hieu.name}</h3>
                                <p className="text-emerald-400 font-medium mb-4">{t.leadership.hieu.role}</p>
                                <p className="text-gray-300 text-sm leading-relaxed">{t.leadership.hieu.bio}</p>
                            </div>
                        </div>

                        {/* Dr Trung */}
                        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col md:flex-row gap-8 items-center hover:bg-slate-750 transition">
                            <div className="w-32 h-32 md:w-40 md:h-40 shrink-0">
                                <img src={nguyenHuuTrungImg} alt="GS. TS Nguyễn Hữu Trung" className="w-full h-full rounded-full object-cover border-4 border-blue-500 shadow-xl" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{t.leadership.trung.name}</h3>
                                <p className="text-blue-400 font-medium mb-4">{t.leadership.trung.role}</p>
                                <p className="text-gray-300 text-sm leading-relaxed">{t.leadership.trung.bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. CORE TEAM - Real profiles */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.team.title}</h2>
                        <p className="text-slate-600">{t.team.subtitle}</p>
                    </div>

                    <div className="relative group px-4 md:px-12">
                        {/* Navigation Buttons */}
                        <button
                            onClick={() => scrollTeam('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full shadow-lg text-slate-600 hover:text-emerald-600 hover:bg-white transition-all hidden md:flex"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            onClick={() => scrollTeam('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full shadow-lg text-slate-600 hover:text-emerald-600 hover:bg-white transition-all hidden md:flex"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Carousel Container */}
                        <div
                            ref={teamContainerRef}
                            className="flex overflow-x-auto gap-6 py-16 px-4 snap-x snap-mandatory scrollbar-hide" // Increased py to accommodate overflowing avatar
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            onMouseEnter={() => setIsTeamPaused(true)}
                            onMouseLeave={() => setIsTeamPaused(false)}
                        >
                            {extendedTeamItems.map((member, index) => {
                                const colors = getColorClasses(member.color);
                                const memberImg = member.image;

                                return (
                                    <div key={`${index}`} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition min-w-[280px] w-[280px] flex-shrink-0 snap-center flex flex-col border border-slate-100 relative mt-6">
                                        {/* Avatar */}
                                        <div className={`absolute -top-10 -right-4 w-24 h-24 rounded-full border-2 ${colors.border} shadow-lg overflow-hidden bg-gray-200`}>
                                            {memberImg ? (
                                                <img
                                                    src={memberImg}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className={`w-full h-full flex items-center justify-center ${colors.bg} ${colors.text} text-2xl font-bold`}>
                                                    {member.name.split(' ').pop()[0]}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-8"> {/* Spacer for avatar */}
                                            <h3 className="font-bold text-lg mb-1 pr-8">{member.name}</h3>
                                            <p className={`text-xs ${colors.text} font-bold uppercase mb-4`}>{member.role}</p>
                                            <p className="text-sm text-slate-600 leading-relaxed flex-grow">{member.bio}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. GLOBAL PROJECTS - NEW SECTION */}
            <section className="py-20 bg-white border-t">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.projects.title}</h2>
                        <p className="text-slate-600">{t.projects.subtitle}</p>
                    </div>

                    <div className="relative group px-4 md:px-12">
                        {/* Navigation Buttons */}
                        <button
                            onClick={() => scrollProjects('left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full shadow-lg text-slate-600 hover:text-emerald-600 hover:bg-white transition-all hidden md:flex"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <button
                            onClick={() => scrollProjects('right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full shadow-lg text-slate-600 hover:text-emerald-600 hover:bg-white transition-all hidden md:flex"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Carousel Container */}
                        <div
                            ref={projectsContainerRef}
                            className="flex overflow-x-auto gap-6 py-4 px-2 snap-x snap-mandatory scrollbar-hide"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            onMouseEnter={() => setIsProjectsPaused(true)}
                            onMouseLeave={() => setIsProjectsPaused(false)}
                        >
                            {extendedProjectItems.map((project, index) => (
                                <ProjectCard key={`${index}`} project={project} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
