import React, { useState } from 'react';
import { 
  Database, Layers, Map as MapIcon, MessageSquare, 
  ArrowRight, CheckCircle2, Clock, DollarSign, 
  TrendingUp, Sprout, FileText, Cpu, Server,
  ArrowLeft, Activity, Globe, ArrowDown, Bot, FileJson
} from 'lucide-react';

// --- TRANSLATIONS (Nội dung Đa ngôn ngữ) ---
const QT_TEXT = {
  en: {
    back: "Back to Projects",
    title: "WebGIS Platform & Organic Knowledge DB",
    subtitle: "Content 4: Synthesizing scientific research into actionable applications",
    
    // Architecture Diagram Text
    diag_foundation: "Data Foundation",
    diag_c1: "Content 1: Data Collection (Soil, Water, Climate)",
    diag_c2: "Content 2: ML Analysis",
    diag_c3: "Content 3: GIS Database",
    diag_analysis: "Deep Analysis & Product Creation",
    diag_41: "Task 4.1: DayCent Calibration & Simulation",
    diag_db: "Product: Ag Knowledge DB (Carbon, Yield)",
    diag_42: "Task 4.2: WebGIS Dev",
    diag_43: "Task 4.3: AI Chatbot",
    diag_final_group: "Final Product",
    diag_final: "Integrated WebGIS & AI Platform",

    // Architecture
    arch_title: "System Architecture & Data Flow",
    input_layer: "Data Foundation (Content 1-3)",
    input_desc: "Raw Data, GIS Maps, Soil Health",
    core_layer: "Core Analysis (DayCent Model)",
    core_desc: "Cal/Val, Scenario Simulation, Carbon Quantification",
    output_layer: "Application Layer (WebGIS + AI)",
    output_desc: "Visual Dashboard, Advisory Chatbot",
    
    // DayCent Simulation
    sim_title: "DayCent 'What-if' Simulation",
    sim_desc: "Scenario: Transitioning from Inorganic to Organic Fertilizer (10 Years)",
    y_axis: "Soil Organic Carbon (tC/ha)",
    scenario_a: "Conventional (Inorganic)",
    scenario_b: "Organic (Manure/Compost)",
    insight: "DayCent predicts a 18.5% increase in soil carbon storage, unlocking potential carbon credit revenue.",

    // Modules
    mod_db: "Knowledge DB",
    mod_db_desc: "Structured simulation results for 5 key crops",
    mod_gis: "WebGIS Platform",
    mod_gis_desc: "Interactive map & land suitability lookup",
    mod_ai: "AI Consultant",
    mod_ai_desc: "RAG-based Chatbot for instant Q&A",

    // Timeline
    roadmap_title: "Implementation Roadmap (10 Months)",
    phase1: "Phase 1: Platform & Sim",
    phase1_desc: "DayCent Cal/Val, DB Design",
    phase2: "Phase 2: Development",
    phase2_desc: "WebGIS UI/UX, Backend",
    phase3: "Phase 3: Integration",
    phase3_desc: "AI Chatbot, Testing, Training",

    // Cost
    cost_title: "Sustainability & Efficiency",
    cost_desc: "Estimated Maintenance Cost (2 Years)",
    hosting: "Hosting",
    api: "AI/LLM API",
    domain: "Domain/Misc",
    total: "TOTAL / 2 YEARS",
    low_cost_msg: "Decoupling heavy simulation from the web app ensures ultra-low operating costs."
  },
  vi: {
    back: "Quay lại Danh sách",
    title: "Nền tảng WebGIS & CSDL Tri thức Nông nghiệp",
    subtitle: "Nội dung 4: Tổng hợp nghiên cứu khoa học thành sản phẩm ứng dụng",
    
    // Architecture Diagram Text
    diag_foundation: "Nền tảng Dữ liệu",
    diag_c1: "Nội dung 1: Thu thập Dữ liệu (Đất, Nước, Khí hậu)",
    diag_c2: "Nội dung 2: Phân tích Học máy",
    diag_c3: "Nội dung 3: Xây dựng CSDL GIS (Bản đồ số)",
    diag_analysis: "Phân tích Chuyên sâu & Tạo sản phẩm",
    diag_41: "Công việc 4.1: Hiệu chỉnh & Mô phỏng DayCent",
    diag_db: "Sản phẩm: CSDL Tri thức Nông nghiệp",
    diag_42: "Công việc 4.2: Phát triển WebGIS",
    diag_43: "Công việc 4.3: Xây dựng AI Chatbot",
    diag_final_group: "Sản phẩm Cuối cùng",
    diag_final: "Nền tảng WebGIS & AI Tư vấn Tích hợp",

    // Architecture
    arch_title: "Kiến trúc Hệ thống & Luồng Dữ liệu",
    input_layer: "Tầng Nền tảng (Nội dung 1-3)",
    input_desc: "Dữ liệu thô, Bản đồ GIS, Sức khỏe đất",
    core_layer: "Tầng Phân tích (Mô hình DayCent)",
    core_desc: "Hiệu chỉnh, Mô phỏng Kịch bản, Lượng hóa Carbon",
    output_layer: "Tầng Ứng dụng (WebGIS + AI)",
    output_desc: "Bản đồ trực quan, Chatbot tư vấn",
    
    // DayCent Simulation
    sim_title: "Mô phỏng Kịch bản DayCent",
    sim_desc: "Kịch bản: Chuyển đổi từ Phân bón Vô cơ sang Hữu cơ (10 Năm)",
    y_axis: "Carbon Hữu cơ trong Đất (tC/ha)",
    scenario_a: "Canh tác Vô cơ",
    scenario_b: "Canh tác Hữu cơ", 
    insight: "DayCent dự báo lượng Carbon trong đất tăng 18.5%, mở ra cơ hội doanh thu từ tín chỉ Carbon.",

    // Modules
    mod_db: "CSDL Tri thức",
    mod_db_desc: "Kết quả mô phỏng cấu trúc cho 5 loại cây",
    mod_gis: "Nền tảng WebGIS",
    mod_gis_desc: "Bản đồ tương tác & Tra cứu thích nghi",
    mod_ai: "Trợ lý ảo AI",
    mod_ai_desc: "Chatbot RAG trả lời thắc mắc kỹ thuật",

    // Timeline
    roadmap_title: "Lộ trình Thực hiện (10 Tháng)",
    phase1: "Giai đoạn 1: Nền tảng",
    phase1_desc: "Hiệu chỉnh DayCent, Thiết kế CSDL",
    phase2: "Giai đoạn 2: Phát triển",
    phase2_desc: "Giao diện WebGIS, Lập trình Backend",
    phase3: "Giai đoạn 3: Hoàn thiện",
    phase3_desc: "Tích hợp AI, Kiểm thử, Tập huấn",

    // Cost
    cost_title: "Tính Bền vững & Hiệu quả",
    cost_desc: "Ước tính Chi phí Duy trì (2 Năm)",
    hosting: "Hosting (Máy chủ)",
    api: "API AI (LLM)",
    domain: "Tên miền/Khác",
    total: "TỔNG CỘNG / 2 NĂM",
    low_cost_msg: "Tách biệt tác vụ mô phỏng nặng khỏi Web App giúp giảm tối đa chi phí vận hành."
  }
};

// --- MOCK DATA (Dữ liệu giả lập cho biểu đồ) ---
const SIMULATION_DATA = [
  { year: 1, conventional: 40.0, organic: 40.2 },
  { year: 2, conventional: 39.8, organic: 40.8 },
  { year: 3, conventional: 39.5, organic: 41.5 },
  { year: 4, conventional: 39.2, organic: 42.3 },
  { year: 5, conventional: 39.0, organic: 43.1 },
  { year: 6, conventional: 38.8, organic: 44.0 },
  { year: 7, conventional: 38.5, organic: 45.2 },
  { year: 8, conventional: 38.3, organic: 46.1 },
  { year: 9, conventional: 38.0, organic: 47.0 },
  { year: 10, conventional: 37.8, organic: 48.5 }, // Organic tăng trưởng tốt hơn
];

// --- CHART COMPONENT (Fixed Layout) ---
const SimulationChart = ({ t }) => {
  const width = 700; // Tăng chiều rộng tổng thể
  const height = 300;
  const paddingLeft = 60; // Tăng lề trái cho trục Y
  const paddingRight = 150; // Tăng mạnh lề phải cho nhãn kịch bản
  const paddingTop = 40;
  const paddingBottom = 40;
  
  const maxVal = 50;
  const minVal = 35;

  // Tính toán vùng vẽ khả dụng
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const getX = (i) => paddingLeft + (i / (SIMULATION_DATA.length - 1)) * chartWidth;
  const getY = (val) => paddingTop + chartHeight - ((val - minVal) / (maxVal - minVal)) * chartHeight;

  const pathConv = SIMULATION_DATA.map((d, i) => `${i===0?'M':'L'} ${getX(i)} ${getY(d.conventional)}`).join(' ');
  const pathOrg = SIMULATION_DATA.map((d, i) => `${i===0?'M':'L'} ${getX(i)} ${getY(d.organic)}`).join(' ');

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px]"> {/* Đảm bảo không bị co nhỏ quá mức */}
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          {/* Grid lines */}
          <line x1={paddingLeft} y1={height-paddingBottom} x2={width-paddingRight} y2={height-paddingBottom} stroke="#e2e8f0" strokeWidth="1" />
          <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={height-paddingBottom} stroke="#e2e8f0" strokeWidth="1" />
          
          {/* Line Conventional (Grey) */}
          <path d={pathConv} fill="none" stroke="#94a3b8" strokeWidth="3" />
          
          {/* Line Organic (Green) */}
          <path d={pathOrg} fill="none" stroke="#10b981" strokeWidth="3" />

          {/* Data Points */}
          {SIMULATION_DATA.map((d, i) => (
            <g key={i}>
              <circle cx={getX(i)} cy={getY(d.conventional)} r="4" fill="#64748b" />
              <circle cx={getX(i)} cy={getY(d.organic)} r="5" fill="#059669" />
            </g>
          ))}

          {/* Labels (Right Side - Fixed Position) */}
          <text x={width-paddingRight + 10} y={getY(SIMULATION_DATA[9].conventional)} fill="#64748b" fontSize="13" dy="4" fontWeight="bold">{t.scenario_a}</text>
          <text x={width-paddingRight + 10} y={getY(SIMULATION_DATA[9].organic)} fill="#059669" fontSize="13" dy="4" fontWeight="bold">{t.scenario_b}</text>
          
          {/* Y-Axis Label (Rotated) */}
          <text x={15} y={height/2} transform={`rotate(-90 15,${height/2})`} fontSize="12" fill="#64748b" textAnchor="middle">{t.y_axis}</text>
          
          {/* X-Axis Labels (Years) */}
          {SIMULATION_DATA.map((d, i) => (
             <text key={i} x={getX(i)} y={height-paddingBottom+20} fontSize="10" fill="#94a3b8" textAnchor="middle">Year {d.year}</text>
          ))}
        </svg>
      </div>
    </div>
  );
};

// --- ARCHITECTURE DIAGRAM COMPONENT (REDESIGNED: CLEAN STACK) ---
const ArchitectureDiagram = ({ t }) => {
  
  const boxStyle = "bg-white border border-slate-200 p-3 md:p-4 rounded-lg shadow-sm flex flex-col items-center text-center z-10 w-full md:w-64 transition-transform hover:scale-105";
  const arrowStyle = "text-slate-300 my-2";

  return (
    <div className="flex flex-col items-center w-full space-y-4 py-4">
      
      {/* PHASE 1: FOUNDATION */}
      <div className="w-full bg-blue-50/50 border border-blue-200 rounded-2xl p-6 md:p-8 relative">
         <div className="absolute -top-3 left-4 md:left-8 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide shadow-sm">
            {t.diag_foundation}
         </div>
         <div className="flex flex-col items-center gap-4">
            {/* Content 1 */}
            <div className={boxStyle}>
               <Layers className="text-blue-600 mb-2" size={24}/>
               <span className="text-sm font-bold text-slate-700">{t.diag_c1}</span>
            </div>
            <ArrowDown className={arrowStyle} />
            {/* Content 2 */}
            <div className={boxStyle}>
               <Cpu className="text-indigo-600 mb-2" size={24}/>
               <span className="text-sm font-bold text-slate-700">{t.diag_c2}</span>
            </div>
            <ArrowDown className={arrowStyle} />
            {/* Content 3 */}
            <div className={boxStyle}>
                <MapIcon className="text-purple-600 mb-2" size={24}/>
                <span className="text-sm font-bold text-slate-700">{t.diag_c3}</span>
            </div>
         </div>
      </div>

      <ArrowDown size={32} className="text-slate-300" />

      {/* PHASE 2: ANALYSIS & PRODUCT */}
      <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 relative flex flex-col items-center">
         <div className="absolute -top-3 left-4 md:left-8 bg-slate-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide shadow-sm">
            {t.diag_analysis}
         </div>
         
         {/* 4.1 DayCent - Diamond Shape */}
         <div className="relative flex items-center justify-center w-56 h-56 mb-4 mt-4">
            <div className="absolute inset-0 bg-white border-2 border-emerald-400 rotate-45 rounded-3xl shadow-md"></div>
            <div className="relative z-10 flex flex-col items-center text-center p-4">
               <Activity className="text-emerald-600 mb-2" size={32}/>
               <span className="font-bold text-emerald-800 text-sm leading-tight">{t.diag_41}</span>
            </div>
         </div>

         <ArrowDown className={arrowStyle} />

         {/* Knowledge DB */}
         <div className="bg-white border-2 border-slate-300 p-4 rounded-xl shadow-sm w-full md:w-80 text-center mb-8">
            <Database className="mx-auto text-slate-500 mb-2" size={24}/>
            <span className="font-bold text-slate-700 text-sm">{t.diag_db}</span>
         </div>

         {/* Split branches */}
         <div className="flex flex-col md:flex-row gap-6 w-full justify-center max-w-2xl">
            <div className="flex-1 flex flex-col items-center">
               <div className={boxStyle + " border-t-4 border-t-purple-400 h-full justify-start"}>
                  <Globe className="text-purple-600 mb-2" size={24}/>
                  <span className="text-sm font-bold text-slate-700">{t.diag_42}</span>
               </div>
            </div>
            <div className="flex-1 flex flex-col items-center">
               <div className={boxStyle + " border-t-4 border-t-amber-400 h-full justify-start"}>
                  <Bot className="text-amber-600 mb-2" size={24}/>
                  <span className="text-sm font-bold text-slate-700">{t.diag_43}</span>
               </div>
            </div>
         </div>
      </div>

      <ArrowDown size={32} className="text-slate-300" />

      {/* PHASE 3: FINAL PRODUCT */}
      <div className="w-full bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-300 rounded-2xl p-6 text-center shadow-lg">
          <div className="text-emerald-800 font-bold text-xs uppercase tracking-widest mb-3 opacity-80">{t.diag_final_group}</div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
             <Sprout className="text-emerald-600" size={36} />
             <span className="text-xl font-bold text-emerald-900">{t.diag_final}</span>
          </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const QuangTriDashboard = ({ onBack, lang = 'vi' }) => {
  const t = QT_TEXT[lang] || QT_TEXT.vi;

  return (
    <div className="animate-fade-in space-y-8 font-sans text-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium transition-colors">
          <ArrowLeft size={20} /> {t.back}
        </button>
        <div className="text-right hidden md:block">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">Project ID: QT-05</span>
        </div>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-200">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.title}</h1>
          <p className="text-slate-500 text-lg">{t.subtitle}</p>
        </div>

        {/* 1. System Architecture */}
        <section className="mb-16">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-l-4 border-emerald-500 pl-3 uppercase tracking-wide">
            <Activity size={20} className="text-emerald-500"/> {t.arch_title}
          </h3>
          <ArchitectureDiagram t={t} />
        </section>

        {/* 2. DayCent Simulation */}
        <section className="mb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-inner">
            <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Sprout size={18} className="text-emerald-600"/> {t.sim_title}
            </h4>
            <p className="text-sm text-slate-500 mb-6 italic">{t.sim_desc}</p>
            {/* Render Chart with fixed layout */}
            <SimulationChart t={t} />
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-emerald-100 shadow-sm flex flex-col h-full">
            <div className="mb-6 bg-emerald-50 p-4 rounded-lg border border-emerald-100">
              <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2"><TrendingUp size={16}/> Key Insight</h4>
              <p className="text-sm text-emerald-700 leading-relaxed">{t.insight}</p>
            </div>
            
            <div className="space-y-3 flex-1">
              <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <Database className="text-blue-500 shrink-0 mt-1" size={18}/>
                <div>
                  <div className="text-xs font-bold text-slate-700">{t.mod_db}</div>
                  <div className="text-[10px] text-slate-500">{t.mod_db_desc}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <MapIcon className="text-purple-500 shrink-0 mt-1" size={18}/>
                <div>
                  <div className="text-xs font-bold text-slate-700">{t.mod_gis}</div>
                  <div className="text-[10px] text-slate-500">{t.mod_gis_desc}</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <MessageSquare className="text-amber-500 shrink-0 mt-1" size={18}/>
                <div>
                  <div className="text-xs font-bold text-slate-700">{t.mod_ai}</div>
                  <div className="text-[10px] text-slate-500">{t.mod_ai_desc}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Roadmap & Cost */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Roadmap */}
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-l-4 border-blue-500 pl-3 uppercase tracking-wide">
              <Clock size={20} className="text-blue-500"/> {t.roadmap_title}
            </h3>
            <div className="space-y-4 relative">
              {/* Vertical Line */}
              <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-200 -z-10"></div>
              
              {[
                { step: "1", title: t.phase1, desc: t.phase1_desc, color: "bg-blue-100 text-blue-700 border-blue-200" },
                { step: "2", title: t.phase2, desc: t.phase2_desc, color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
                { step: "3", title: t.phase3, desc: t.phase3_desc, color: "bg-purple-100 text-purple-700 border-purple-200" },
              ].map((p, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border ${p.color} shadow-sm`}>{p.step}</div>
                  <div>
                    <div className="font-bold text-sm text-slate-800">{p.title}</div>
                    <div className="text-xs text-slate-500">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cost Analysis */}
          <section>
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-l-4 border-amber-500 pl-3 uppercase tracking-wide">
              <DollarSign size={20} className="text-amber-500"/> {t.cost_title}
            </h3>
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h4 className="text-sm font-semibold text-slate-600 mb-4 flex items-center gap-2"><FileText size={16}/> {t.cost_desc}</h4>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm p-2 bg-white rounded border border-slate-100">
                  <span className="text-slate-600 flex items-center gap-2"><Server size={14} className="text-slate-400"/> {t.hosting}</span>
                  <span className="font-mono font-bold text-slate-800">$600 - $1,200</span>
                </div>
                <div className="flex justify-between text-sm p-2 bg-white rounded border border-slate-100">
                  <span className="text-slate-600 flex items-center gap-2"><Cpu size={14} className="text-slate-400"/> {t.api}</span>
                  <span className="font-mono font-bold text-slate-800">$240 - $480</span>
                </div>
                <div className="flex justify-between text-sm p-2 bg-white rounded border border-slate-100">
                  <span className="text-slate-600 flex items-center gap-2"><Globe size={14} className="text-slate-400"/> {t.domain}</span>
                  <span className="font-mono font-bold text-slate-800">~$1,030</span>
                </div>
                <div className="h-px bg-slate-200 my-2"></div>
                <div className="flex justify-between text-base px-2">
                  <span className="font-bold text-slate-800">{t.total}</span>
                  <span className="font-mono font-bold text-emerald-600 text-lg">$1,870 - $2,710</span>
                </div>
              </div>
              <div className="text-xs text-emerald-700 bg-emerald-50 p-3 rounded border border-emerald-100 italic flex gap-2">
                <CheckCircle2 size={14} className="shrink-0 mt-0.5"/>
                {t.low_cost_msg}
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default QuangTriDashboard;