import React, { useState } from 'react';
import { 
  ArrowLeft, MapPin, Database, Activity, 
  BarChart2, Settings, TrendingDown, Sprout, 
  Droplets, Layers, ChevronRight, AlertCircle,
  ThermometerSun, Wind, CheckCircle2,
  Globe, FileText, Cpu, Satellite, PieChart,
  ScanLine
} from 'lucide-react';

// --- 1. TRANSLATIONS (Dựa trên PDF "Vietnam corn.pdf") ---
const VN_CORN_TEXT = {
  en: {
    back: "Back to Projects",
    title: "Vietnam Corn Sustainability Optimization Project",
    subtitle: "A large-scale DayCent-based modeling framework using 320 geospatial sample points and 8 management scenarios per point (2,560 simulations) to assess soil organic carbon (SOC), crop yield, and greenhouse gas (GHG) emissions across Vietnam’s major maize-growing regions for sustainable agricultural optimization.",
    
    // Metrics
    metric_sites: "Sample Points",
    metric_regions: "Ecological Regions",
    metric_scenarios: "Scenarios/Site",
    metric_period: "Simulation Period",
    metric_location: "Vietnam",

    // Workflow
    flow_title: "Research Framework",
    step1: "Data Acquisition",
    step1_desc: "Soil & Weather API",
    step1_details: ["320 Points", "Soil FastAPI", "Weather API"],
    step2: "Scenario Design",
    step2_desc: "Management Matrix",
    step2_details: ["8 Scenarios", "Tillage (CT/RT)", "Fertilization"],
    step3: "Simulation",
    step3_desc: "DayCent Model",
    step3_details: ["Input JSONs", "Batch Processing", "1983-2024"],
    step4: "Analysis",
    step4_desc: "Delta Calculation",
    step4_details: ["SOC Change", "Yield", "GHG Emissions"],
    step5: "Decision Support",
    step5_desc: "Recommendations",
    step5_details: ["Regional Maps", "Optimization"],

    // Charts
    chart_ghg_title: "GHG Emissions by Region",
    chart_ghg_subtitle: "Comparison of N2O, CO2, and CH4",
    chart_contrib_title: "GHG Sources",
    chart_contrib_subtitle: "Contribution by gas type",
    
    res_insight: "Direct N2O emissions account for 75.1% of total GHG, indicating that nitrogen fertilizer management is the most critical factor for mitigation.",
    
    viz_title: "Interactive Map",
    viz_processing: "Rendering Map...",
    viz_points: "320 Simulation Points"
  },
  vi: {
    back: "Quay lại Danh sách",
    title: "Dự án Tối ưu hóa Bền vững Canh tác Ngô Việt Nam",
    subtitle: "Khuôn khổ mô hình hóa quy mô lớn dựa trên DayCent với 320 điểm mẫu địa lý và 8 kịch bản canh tác cho mỗi điểm (2.560 mô phỏng), nhằm đánh giá Carbon hữu cơ đất (SOC), năng suất và phát thải khí nhà kính (GHG) trên các vùng trồng ngô trọng điểm của Việt Nam, phục vụ tối ưu hóa nông nghiệp bền vững.",
    
    // Metrics
    metric_sites: "Điểm Mẫu",
    metric_regions: "Vùng Sinh thái",
    metric_scenarios: "Kịch bản/Điểm",
    metric_period: "Giai đoạn Mô phỏng",
    metric_location: "Việt Nam",

    // Workflow
    flow_title: "Khung Nghiên cứu",
    step1: "Thu thập Dữ liệu",
    step1_desc: "API Đất & Thời tiết",
    step1_details: ["320 Điểm", "Soil FastAPI", "Weather API"],
    step2: "Thiết kế Kịch bản",
    step2_desc: "Ma trận Quản lý",
    step2_details: ["8 Kịch bản", "Làm đất (CT/RT)", "Phân bón"],
    step3: "Mô phỏng",
    step3_desc: "Mô hình DayCent",
    step3_details: ["Input JSONs", "Xử lý hàng loạt", "1983-2024"],
    step4: "Phân tích",
    step4_desc: "Tính toán Delta",
    step4_details: ["Thay đổi SOC", "Năng suất", "Phát thải GHG"],
    step5: "Hỗ trợ Quyết định",
    step5_desc: "Khuyến nghị",
    step5_details: ["Bản đồ Vùng", "Tối ưu hóa"],

    // Charts
    chart_ghg_title: "Phát thải GHG theo Vùng",
    chart_ghg_subtitle: "So sánh N2O, CO2 và CH4",
    chart_contrib_title: "Nguồn phát thải GHG",
    chart_contrib_subtitle: "Tỷ trọng theo loại khí",
    
    res_insight: "Phát thải N2O trực tiếp chiếm 75.1% tổng lượng GHG, cho thấy quản lý phân đạm là yếu tố then chốt nhất để giảm thiểu tác động môi trường.",
    
    viz_title: "Bản đồ Tương tác",
    viz_processing: "Đang tải bản đồ...",
    viz_points: "320 Điểm Mô phỏng"
  }
};

// --- 2. MOCK DATA ---
const VN_METRICS = {
  sites: "320",
  regions: "8",
  scenarios: "8",
  period: "1983-2024"
};

// Data for Regional Chart
const REGIONAL_GHG_DATA = [
  { region: {en: "Mekong Delta", vi: "ĐBSCL"}, n2o: 7.2, co2: 0.8, color: "bg-red-500" },
  { region: {en: "Red River Delta", vi: "ĐBSH"}, n2o: 6.9, co2: 0.9, color: "bg-purple-500" },
  { region: {en: "Southeast", vi: "Đông Nam Bộ"}, n2o: 7.9, co2: 0.5, color: "bg-emerald-500" },
  { region: {en: "South Central", vi: "Nam Trung Bộ"}, n2o: 6.8, co2: 0.7, color: "bg-orange-400" },
  { region: {en: "North Central", vi: "Bắc Trung Bộ"}, n2o: 6.6, co2: 0.8, color: "bg-blue-500" },
];

// Data for Donut Chart
const GHG_CONTRIBUTION = [
  { label: "Direct N2O", val: 75.1, color: "bg-purple-400" },
  { label: "Indirect N2O (leached)", val: 12.6, color: "bg-blue-400" },
  { label: "Indirect N2O (vol)", val: 5.7, color: "bg-red-400" },
  { label: "CO2", val: 5.0, color: "bg-teal-400" },
  { label: "CH4", val: 1.6, color: "bg-yellow-400" }
];

// --- 3. SUB-COMPONENTS ---

const MetricCard = ({ label, value, icon: Icon, subtext, colorClass }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between hover:shadow-md transition-all">
    <div>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{label}</p>
      <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
      {subtext && <p className="text-[10px] text-slate-400 mt-1">{subtext}</p>}
    </div>
    <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}>
      <Icon size={20} className={colorClass.replace('bg-', 'text-')} />
    </div>
  </div>
);

const PipelineStep = ({ number, title, desc, details, icon: Icon, colorClass, bgClass, borderClass }) => (
  <div className="relative pl-14 pb-10 last:pb-0 group">
    <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-slate-200 group-last:hidden"></div>
    <div className={`absolute left-0 top-0 w-12 h-12 rounded-xl flex items-center justify-center border-2 bg-white z-10 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md ${borderClass} ${colorClass}`}>
      <Icon size={20} />
    </div>
    <div className={`p-4 rounded-xl border bg-white shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:translate-x-1 ${borderClass}`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className={`font-bold text-sm uppercase tracking-wider ${colorClass}`}>{title}</h4>
        <span className="text-[10px] font-bold text-slate-300">0{number}</span>
      </div>
      <p className="text-xs text-slate-600 mb-3 font-medium">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {details.map((d, i) => (
          <span key={i} className={`text-[10px] px-2 py-1 rounded-md border font-medium ${bgClass} ${colorClass} border-transparent bg-opacity-10`}>
            {d}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const RegionalChart = ({ data, lang }) => (
  <div className="space-y-4">
    {data.map((d, i) => (
      <div key={i} className="group">
        <div className="flex justify-between text-xs mb-1">
          <span className="font-bold text-slate-700 w-24 truncate" title={d.region[lang]}>{d.region[lang]}</span>
          <div className="flex gap-3 font-mono text-[10px] text-slate-500">
            <span className="flex items-center gap-1"><div className={`w-1.5 h-1.5 rounded-full ${d.color}`}></div> N2O: {d.n2o}</span>
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> CO2: {d.co2}</span>
          </div>
        </div>
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex relative">
          <div 
            className={`h-full ${d.color} opacity-80 group-hover:opacity-100 transition-all duration-1000 ease-out`} 
            style={{ width: `${(d.n2o / 10) * 100}%` }}
          ></div>
          <div 
            className="h-full bg-slate-400 opacity-60 group-hover:opacity-80 transition-all duration-1000 ease-out" 
            style={{ width: `${(d.co2 / 10) * 100}%` }}
          ></div>
        </div>
      </div>
    ))}
    <div className="flex justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100 mt-2 font-mono">
      <span>0</span>
      <span>5</span>
      <span>10 Mg CO2e/ha</span>
    </div>
  </div>
);

const ContributionDonut = ({ data }) => {
  // Simple CSS conic gradient for donut chart
  // Note: In a real app with Tailwind JIT, we can't dynamic construct 'bg-[color]' classes easily for the gradient string.
  // We use inline styles with hardcoded hex values that match the Tailwind classes used in mock data.
  const colors = {
    "bg-purple-400": "#c084fc",
    "bg-blue-400": "#60a5fa",
    "bg-red-400": "#f87171",
    "bg-teal-400": "#2dd4bf",
    "bg-yellow-400": "#facc15"
  };

  let currentDeg = 0;
  const gradientParts = data.map(d => {
    const deg = (d.val / 100) * 360;
    const hex = colors[d.color] || "#cbd5e1";
    const segment = `${hex} ${currentDeg}deg ${currentDeg + deg}deg`;
    currentDeg += deg;
    return segment;
  });

  return (
    <div className="flex flex-col items-center">
      <div 
        className="w-40 h-40 rounded-full relative mb-6 shadow-sm border-4 border-slate-50"
        style={{ background: `conic-gradient(${gradientParts.join(', ')})` }}
      >
        <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
          <span className="text-3xl font-bold text-slate-800">100%</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Total GHG</span>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-x-2 gap-y-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2 text-xs p-1 rounded hover:bg-slate-50 transition-colors">
            <div className={`w-2.5 h-2.5 rounded-full ${d.color} shrink-0`}></div>
            <span className="text-slate-600 flex-1 truncate">{d.label}</span>
            <span className="font-bold text-slate-800 font-mono">{d.val}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 4. MAIN DASHBOARD ---
const VietnamCornDashboard = ({ onBack, lang = 'vi' }) => {
  const t = VN_CORN_TEXT[lang] || VN_CORN_TEXT.vi;

  return (
    <div className="animate-fade-in space-y-8 font-sans text-slate-800 pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium transition-colors">
          <ArrowLeft size={20} /> {t.back}
        </button>
      </div>

      {/* --- HERO SECTION (Metrics + Vertical Map) --- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          
          {/* Left: Metrics & Intro */}
          <div className="flex-1 flex flex-col justify-between space-y-6">
            {/* Title Section */}
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-3 leading-tight">{t.title}</h1>
              <p className="text-slate-600 text-base leading-relaxed text-justify">{t.subtitle}</p>
            </div>

            {/* Metrics - Vertical Stack */}
            <div className="space-y-4">
              <MetricCard label={t.metric_sites} value={VN_METRICS.sites} icon={MapPin} colorClass="bg-red-500 text-red-500" />
              <MetricCard label={t.metric_regions} value={VN_METRICS.regions} icon={Globe} colorClass="bg-blue-500 text-blue-500" />
              <MetricCard label={t.metric_scenarios} value={VN_METRICS.scenarios} icon={Layers} colorClass="bg-emerald-500 text-emerald-500" />
              <MetricCard label={t.metric_period} value="41 Yrs" icon={Activity} colorClass="bg-purple-500 text-purple-500" />
            </div>

            {/* Additional Info */}
            <div className="p-5 bg-amber-50 rounded-xl border border-amber-100">
               <div className="flex items-start gap-3">
                 <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                   <Sprout className="text-amber-600" size={20} />
                 </div>
                 <div>
                   <h3 className="font-bold text-slate-800 text-sm mb-1">Regional Coverage</h3>
                   <p className="text-xs text-slate-600 leading-relaxed">
                     Analysis spans from Northern highlands to Mekong Delta, covering major corn-producing provinces
                   </p>
                 </div>
               </div>
            </div>
          </div>

          {/* Right: Vertical Map Container */}
          {/* Changed from aspect-video to a taller fixed height or aspect ratio suitable for Vietnam's shape */}
          <div className="w-full md:w-[550px] h-[700px] bg-slate-100 rounded-xl overflow-hidden relative shadow-lg border border-slate-200 group shrink-0">
            <iframe 
              src={`${import.meta.env.BASE_URL}vietnam_map.html`}
              title="Vietnam Corn GHG Map"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

        </div>
      </div>

      {/* --- CONTENT GRID: WORKFLOW & ANALYSIS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: WORKFLOW (Vertical Pipeline) */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200 h-full sticky top-6">
            <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-3 text-lg border-b pb-4 border-slate-200">
              <div className="p-2 bg-slate-800 rounded-lg text-white shadow-sm"><Settings size={18}/></div>
              {t.flow_title}
            </h3>
            
            <div className="flex flex-col">
              <PipelineStep number="1" title={t.step1} desc={t.step1_desc} details={t.step1_details} icon={Database} colorClass="text-emerald-600" borderClass="border-emerald-200" bgClass="bg-emerald-50"/>
              <PipelineStep number="2" title={t.step2} desc={t.step2_desc} details={t.step2_details} icon={Layers} colorClass="text-blue-600" borderClass="border-blue-200" bgClass="bg-blue-50"/>
              <PipelineStep number="3" title={t.step3} desc={t.step3_desc} details={t.step3_details} icon={Cpu} colorClass="text-purple-600" borderClass="border-purple-200" bgClass="bg-purple-50"/>
              <PipelineStep number="4" title={t.step4} desc={t.step4_desc} details={t.step4_details} icon={BarChart2} colorClass="text-amber-600" borderClass="border-amber-200" bgClass="bg-amber-50"/>
              <PipelineStep number="5" title={t.step5} desc={t.step5_desc} details={t.step5_details} icon={FileText} colorClass="text-red-600" borderClass="border-red-200" bgClass="bg-red-50"/>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ANALYSIS & CHARTS */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Card 1: Regional Comparison */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                <BarChart2 size={22} className="text-blue-500"/> {t.chart_ghg_title}
              </h3>
              <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold border border-blue-100">{t.chart_ghg_subtitle}</span>
            </div>
            <RegionalChart data={REGIONAL_GHG_DATA} lang={lang} />
          </div>

          {/* Card 2: Contribution Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             
             {/* Donut Chart */}
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                    <PieChart size={22} className="text-purple-500"/> 
                    <h3 className="font-bold text-slate-800 text-lg">{t.chart_contrib_title}</h3>
                </div>
                <ContributionDonut data={GHG_CONTRIBUTION} />
             </div>

             {/* Key Insight Card */}
             <div className="flex flex-col gap-4">
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 h-full flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                    <div className="relative z-10">
                      <div className="p-2 bg-white rounded-full shadow-sm text-purple-600 border border-purple-100 w-fit mb-4">
                          <CheckCircle2 size={24}/>
                      </div>
                      <h4 className="text-lg font-bold text-purple-900 mb-2">Key Finding</h4>
                      <p className="text-sm text-purple-800 leading-relaxed opacity-90 font-medium">
                        {t.res_insight}
                      </p>
                    </div>
                </div>
                
                {/* Info block */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3 text-xs text-slate-500">
                   <AlertCircle size={16} className="shrink-0"/>
                   <span>Simulations assume optimized crop rotations for each ecological region.</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VietnamCornDashboard;