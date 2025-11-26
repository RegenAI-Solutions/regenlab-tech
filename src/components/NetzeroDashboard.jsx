import React, { useState } from 'react';
import { 
  MapPin, Database, Cpu, CheckCircle2, 
  Clock, DollarSign, Users, Sprout, 
  BarChart3, PieChart, ArrowRight, ArrowLeft,
  Layers, ShieldCheck, Globe, Zap, Leaf,
  CloudRain, Sun, Mountain, Droplets
} from 'lucide-react';

// --- TRANSLATIONS ---
const NZ_TEXT = {
  en: {
    back: "Back to Projects",
    title: "National MMRV Framework Pilot",
    subtitle: "Building a scalable, high-integrity carbon project for Vietnam (18 Months)",
    
    // Stats
    stat_fields: "Fields",
    stat_zones: "Eco-Zones",
    stat_cost: "Cost/Ha",
    stat_share: "Farmer Share",

    // Geographic Scope
    geo_title: "Geographic Scope",
    geo_desc: "Strategically distributed across 4 key agro-ecological zones to ensure national applicability.",
    zone_mekong: "Mekong Delta",
    zone_mekong_desc: "Rice Bowl of Vietnam. Focus on Methane reduction.",
    zone_mekong_tech: "Tech: AWD + Straw Mgmt",
    zone_central: "Central Coast",
    zone_central_desc: "Sandy soils, harsh climate. Focus on Soil Health.",
    zone_central_tech: "Tech: Organic Amendment",
    zone_highlands: "Central Highlands",
    zone_highlands_desc: "Perennial hub. Focus on Carbon Sequestration.",
    zone_highlands_tech: "Tech: Intercropping",
    zone_redriver: "Red River Delta",
    zone_redriver_desc: "Diverse winter crops. Focus on Rotation models.",
    zone_redriver_tech: "Tech: Crop Rotation",

    // Tech Stack
    tech_title: "Hybrid Intelligence Stack",
    tech_step1: "Data Ingestion",
    tech_step1_desc: "Voiceara (LLM) processes logbooks, audio & surveys.",
    tech_step2: "Core Modeling",
    tech_step2_desc: "DayCent-AI simulates GHG & SOC daily.",
    tech_step3: "Calibration",
    tech_step3_desc: "PEST optimizes parameters (VMD0053).",
    tech_step4: "Verification",
    tech_step4_desc: "Automated reports for VVB audit.",

    // Economics
    eco_title: "Economic Impact & Viability",
    cost_chart_title: "MMRV Cost Comparison ($/ha)",
    trad_cost: "Traditional",
    regen_cost: "RegenAI",
    revenue_title: "Revenue Distribution",
    rev_farmer: "Farmers (60%)",
    rev_partner: "Partners (15%)",
    rev_regen: "RegenAI (25%)",

    // Timeline
    time_title: "Project Roadmap (18 Months)",
    phase1: "Phase 1: Foundation",
    phase1_desc: "Mobilization, Sampling Design, VVB Consult #1",
    phase2: "Phase 2: Execution",
    phase2_desc: "Baseline Surveys, Soil Sampling, Data Ingestion",
    phase3: "Phase 3: Automation",
    phase3_desc: "Model Calibration, Remote Sensing, VVB Consult #2",
    phase4: "Phase 4: Scale",
    phase4_desc: "Commercialization, PDD Submission, Investor Model"
  },
  vi: {
    back: "Quay lại Danh sách",
    title: "Khung MMRV Quốc gia (Thí điểm)",
    subtitle: "Xây dựng dự án tín chỉ carbon quy mô lớn, minh bạch cho Việt Nam (18 Tháng)",
    
    // Stats
    stat_fields: "Cánh đồng",
    stat_zones: "Vùng Sinh thái",
    stat_cost: "Chi phí/Ha",
    stat_share: "Phần Nông dân",

    // Geographic Scope
    geo_title: "Phạm vi Địa lý & Kỹ thuật",
    geo_desc: "Phân bố chiến lược trên 4 vùng sinh thái trọng điểm để đại diện cho nền nông nghiệp Việt Nam.",
    zone_mekong: "ĐBSCL (Miền Nam)",
    zone_mekong_desc: "Vựa lúa quốc gia. Tập trung giảm phát thải khí nhà kính (CH4).",
    zone_mekong_tech: "Kỹ thuật: Tưới ướt khô xen kẽ (AWD)",
    zone_central: "Duyên hải Miền Trung",
    zone_central_desc: "Đất cát, khí hậu khắc nghiệt. Tập trung cải tạo đất.",
    zone_central_tech: "Kỹ thuật: Bón phân hữu cơ & Che phủ",
    zone_highlands: "Tây Nguyên",
    zone_highlands_desc: "Thủ phủ cây công nghiệp. Tập trung tích lũy Carbon trong đất.",
    zone_highlands_tech: "Kỹ thuật: Trồng xen & Giảm làm đất",
    zone_redriver: "ĐBSH (Miền Bắc)",
    zone_redriver_desc: "Đa dạng cây vụ đông. Thử nghiệm tính bền vững của mô hình.",
    zone_redriver_tech: "Kỹ thuật: Luân canh lúa - màu",

    // Tech Stack
    tech_title: "Hệ thống Công nghệ Lai (Hybrid)",
    tech_step1: "Thu thập Dữ liệu",
    tech_step1_desc: "Voiceara (LLM) xử lý nhật ký, ghi âm & khảo sát.",
    tech_step2: "Mô hình Cốt lõi",
    tech_step2_desc: "DayCent-AI mô phỏng GHG & SOC hàng ngày.",
    tech_step3: "Hiệu chỉnh",
    tech_step3_desc: "PEST tối ưu hóa tham số (chuẩn VMD0053).",
    tech_step4: "Thẩm định",
    tech_step4_desc: "Tự động xuất báo cáo cho VVB.",

    // Economics
    eco_title: "Tác động Kinh tế & Khả thi",
    cost_chart_title: "So sánh Chi phí MMRV ($/ha)",
    trad_cost: "Truyền thống",
    regen_cost: "RegenAI",
    revenue_title: "Phân chia Doanh thu",
    rev_farmer: "Nông dân (60%)",
    rev_partner: "Đối tác (15%)",
    rev_regen: "RegenAI (25%)",

    // Timeline
    time_title: "Lộ trình Dự án (18 Tháng)",
    phase1: "GĐ 1: Nền móng",
    phase1_desc: "Huy động, Thiết kế mẫu, Tham vấn VVB #1",
    phase2: "GĐ 2: Thực thi",
    phase2_desc: "Khảo sát nền, Lấy mẫu đất, Nạp dữ liệu",
    phase3: "GĐ 3: Tự động hóa",
    phase3_desc: "Hiệu chỉnh mô hình, Viễn thám, Tham vấn VVB #2",
    phase4: "GĐ 4: Thương mại",
    phase4_desc: "Thương mại hóa, Nộp hồ sơ PDD, Gọi vốn"
  }
};

// --- SUB-COMPONENTS ---

// 1. Scope Map (REDESIGNED: Card Grid Layout)
const ScopeMap = ({ t }) => {
  const zones = [
    { 
      id: 'redriver', 
      name: t.zone_redriver, 
      desc: t.zone_redriver_desc, 
      tech: t.zone_redriver_tech,
      color: 'border-red-500', 
      bg: 'bg-red-50',
      text: 'text-red-700',
      icon: CloudRain 
    },
    { 
      id: 'central', 
      name: t.zone_central, 
      desc: t.zone_central_desc, 
      tech: t.zone_central_tech,
      color: 'border-yellow-500', 
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      icon: Sun 
    },
    { 
      id: 'highlands', 
      name: t.zone_highlands, 
      desc: t.zone_highlands_desc, 
      tech: t.zone_highlands_tech,
      color: 'border-emerald-500', 
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      icon: Mountain 
    },
    { 
      id: 'mekong', 
      name: t.zone_mekong, 
      desc: t.zone_mekong_desc, 
      tech: t.zone_mekong_tech,
      color: 'border-blue-500', 
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      icon: Droplets 
    }
  ];

  return (
    <div className="space-y-8">
      {/* Zone Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {zones.map((z) => (
          <div key={z.id} className={`relative p-5 rounded-xl border-t-4 shadow-sm bg-white flex flex-col h-full transition-all hover:-translate-y-1 hover:shadow-md ${z.color}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${z.bg} ${z.text}`}>
              <z.icon size={24} />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-2 min-h-[40px]">{z.name}</h4>
            <p className="text-xs text-slate-500 mb-4 flex-grow leading-relaxed">{z.desc}</p>
            <div className={`pt-3 border-t border-slate-100 mt-auto text-[11px] font-bold uppercase tracking-wide ${z.text}`}>
               {z.tech}
            </div>
          </div>
        ))}
      </div>

      {/* Aggregated Stats (Rice vs Upland) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Rice Paddies */}
         <div className="bg-blue-50 p-5 rounded-xl border border-blue-200 flex items-center justify-between">
            <div>
               <h4 className="font-bold text-blue-900 mb-1 flex items-center gap-2"><Sprout size={20}/> Rice Paddies (VM0051)</h4>
               <p className="text-xs text-blue-700">Target: Methane Reduction</p>
            </div>
            <div className="text-right">
               <span className="text-3xl font-bold text-blue-800">~200</span>
               <span className="text-[10px] block text-blue-600 font-medium uppercase tracking-wide">Fields</span>
            </div>
         </div>

         {/* Upland Crops */}
         <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 flex items-center justify-between">
            <div>
               <h4 className="font-bold text-emerald-900 mb-1 flex items-center gap-2"><Leaf size={20}/> Upland Crops (VM0042)</h4>
               <p className="text-xs text-emerald-700">Target: Soil Carbon Sequestration</p>
            </div>
            <div className="text-right">
               <span className="text-3xl font-bold text-emerald-800">~400</span>
               <span className="text-[10px] block text-emerald-600 font-medium uppercase tracking-wide">Fields</span>
            </div>
         </div>
      </div>
    </div>
  );
};

// 2. Tech Stack Diagram
const TechStackDiagram = ({ t }) => {
  const Step = ({ icon: Icon, title, desc, color }) => (
    <div className="flex-1 flex flex-col items-center text-center p-3 bg-white rounded-lg border border-slate-100 shadow-sm z-10 min-w-[140px]">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${color}`}>
        <Icon size={20} />
      </div>
      <div className="font-bold text-xs text-slate-800">{title}</div>
      <div className="text-[10px] text-slate-500 mt-1">{desc}</div>
    </div>
  );

  return (
    <div className="relative bg-slate-50 p-6 rounded-xl border border-slate-200">
       {/* Connector Line */}
       <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-300 -z-0 hidden md:block"></div>
       
       <div className="flex flex-col md:flex-row gap-6 justify-between items-stretch md:items-center">
          <Step icon={Users} title={t.tech_step1} desc={t.tech_step1_desc} color="bg-blue-100 text-blue-600" />
          <ArrowRight className="hidden md:block text-slate-400" />
          <Step icon={Cpu} title={t.tech_step2} desc={t.tech_step2_desc} color="bg-emerald-100 text-emerald-600" />
          <ArrowRight className="hidden md:block text-slate-400" />
          <Step icon={Zap} title={t.tech_step3} desc={t.tech_step3_desc} color="bg-amber-100 text-amber-600" />
          <ArrowRight className="hidden md:block text-slate-400" />
          <Step icon={ShieldCheck} title={t.tech_step4} desc={t.tech_step4_desc} color="bg-purple-100 text-purple-600" />
       </div>
    </div>
  );
};

// 3. Economics & Impact
const EconomicsView = ({ t }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Cost Comparison Chart */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><BarChart3 size={18} className="text-emerald-600"/> {t.cost_chart_title}</h4>
        <div className="flex items-end justify-around h-40 pb-2 border-b border-slate-100">
          <div className="w-20 flex flex-col items-center gap-2 group">
             <span className="text-sm font-bold text-slate-400">$25.0</span>
             <div className="w-full bg-slate-300 rounded-t-lg h-32 relative group-hover:bg-slate-400 transition-colors"></div>
             <span className="text-xs font-medium text-slate-600">{t.trad_cost}</span>
          </div>
          <div className="w-20 flex flex-col items-center gap-2 group">
             <span className="text-lg font-bold text-emerald-600">$4.8</span>
             <div className="w-full bg-emerald-500 rounded-t-lg h-8 relative group-hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-200"></div>
             <span className="text-xs font-bold text-emerald-700">{t.regen_cost}</span>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-emerald-600 bg-emerald-50 py-2 rounded font-medium">
           ~80% Cost Reduction via AI Automation
        </div>
      </div>

      {/* Revenue Share Pie */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2"><PieChart size={18} className="text-blue-600"/> {t.revenue_title}</h4>
        <div className="flex items-center gap-6">
          {/* CSS Pie Chart Representation */}
          <div className="w-32 h-32 rounded-full border-8 border-white shadow-lg relative" 
               style={{ background: 'conic-gradient(#059669 0% 60%, #3b82f6 60% 85%, #f59e0b 85% 100%)' }}>
             <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-slate-800">100%</span>
                  <span className="text-[9px] text-slate-400 uppercase">Value</span>
               </div>
             </div>
          </div>
          
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              <span className="text-xs font-bold text-slate-700">{t.rev_farmer}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs font-medium text-slate-600">{t.rev_regen}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span className="text-xs font-medium text-slate-600">{t.rev_partner}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD ---
const NetzeroDashboard = ({ onBack, lang = 'en' }) => {
  const t = NZ_TEXT[lang] || NZ_TEXT.en;

  return (
    <div className="animate-fade-in space-y-8 font-sans text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium transition-colors">
          <ArrowLeft size={20} /> {t.back}
        </button>
        <div className="flex gap-3">
           <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold border border-blue-200">Verra VM0042/VM0051</span>
           <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">Pilot Phase</span>
        </div>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200">
        <div className="mb-10 border-b border-slate-100 pb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.title}</h1>
          <p className="text-slate-500 text-lg">{t.subtitle}</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
           {[
             { label: t.stat_fields, val: "600+", icon: Sprout, color: "text-emerald-600", bg: "bg-emerald-50" },
             { label: t.stat_zones, val: "4", icon: Globe, color: "text-blue-600", bg: "bg-blue-50" },
             { label: t.stat_cost, val: "< $5", icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
             { label: t.stat_share, val: "60%", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
           ].map((s, i) => (
             <div key={i} className={`p-4 rounded-xl border border-slate-100 flex items-center gap-4 ${s.bg}`}>
                <div className={`p-2 bg-white rounded-lg shadow-sm ${s.color}`}><s.icon size={20}/></div>
                <div>
                   <div className="text-2xl font-bold text-slate-800">{s.val}</div>
                   <div className="text-xs text-slate-500 uppercase tracking-wide font-semibold">{s.label}</div>
                </div>
             </div>
           ))}
        </div>

        {/* 1. Geographic Scope (REDESIGNED) */}
        <section className="mb-16">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-l-4 border-blue-500 pl-3 uppercase tracking-wide">
            <Globe size={20} className="text-blue-500"/> {t.geo_title}
          </h3>
          <p className="text-sm text-slate-500 mb-6">{t.geo_desc}</p>
          <ScopeMap t={t} />
        </section>

        {/* 2. Technology Stack */}
        <section className="mb-16">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-3 uppercase tracking-wide">
            <Cpu size={20} className="text-emerald-500"/> {t.tech_title}
          </h3>
          <TechStackDiagram t={t} />
        </section>

        {/* 3. Timeline */}
        <section className="mb-16">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-l-4 border-purple-500 pl-3 uppercase tracking-wide">
            <Clock size={20} className="text-purple-500"/> {t.time_title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {[
               { p: "1", t: t.phase1, d: t.phase1_desc },
               { p: "2", t: t.phase2, d: t.phase2_desc },
               { p: "3", t: t.phase3, d: t.phase3_desc },
               { p: "4", t: t.phase4, d: t.phase4_desc },
             ].map((item, i) => (
               <div key={i} className="relative p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md border-2 border-white">{item.p}</div>
                  <div className="font-bold text-sm text-slate-800 mb-1">{item.t}</div>
                  <div className="text-xs text-slate-500 leading-snug">{item.d}</div>
               </div>
             ))}
          </div>
        </section>

        {/* 4. Economics */}
        <section>
           <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-l-4 border-amber-500 pl-3 uppercase tracking-wide">
            <DollarSign size={20} className="text-amber-500"/> {t.eco_title}
          </h3>
          <EconomicsView t={t} />
        </section>

      </div>
    </div>
  );
};

export default NetzeroDashboard;