import React, { useState } from 'react';
import { 
  ArrowLeft, Layers, Database, Activity, 
  BarChart2, Settings, TrendingUp, Sprout, 
  Droplets, ChevronRight, AlertCircle,
  ThermometerSun, Wind, Map as MapIcon,
  FileText, Cpu, Globe, Grid, Maximize2, CheckCircle2
} from 'lucide-react';

// --- 1. TRANSLATIONS (Dựa trên mô tả dự án Huế) ---
const HUE_TEXT = {
  en: {
    back: "Back to Projects",
    title: "Thua Thien Hue Soil Carbon Dynamics",
    subtitle: "Spatio-temporal SOC Modeling using DayCent & Geostatistics",
    
    // Workflow Steps
    flow_input: "Input Normalization",
    flow_daycent: "DayCent Simulation",
    flow_kriging: "Kriging Interpolation",
    flow_viz: "GIS Visualization",

    // Map Controls
    map_layer_soc: "Soil Organic Carbon (SOC)",
    map_layer_change: "Carbon Change Rate",
    map_layer_uncert: "Interpolation Uncertainty",
    
    // Analysis
    metric_avg_soc: "Avg. SOC Stock",
    metric_seq_rate: "Sequestration Rate",
    metric_accuracy: "Kriging RMSE",
    
    // Insights
    insight_title: "Key Findings",
    insight_1: "Converting degraded land to Acacia forest increases SOC by 12% over 5 years.",
    insight_2: "Low-lying coastal areas show slower carbon accumulation due to salinity constraints.",
    
    // Tech Specs
    tech_model: "Model: DayCent (Century derived)",
    tech_method: "Method: Ordinary Kriging",
    
    viz_title: "Carbon Distribution Map",
    viz_loading: "Loading GIS Layers..."
  },
  vi: {
    back: "Quay lại Danh sách",
    title: "Nghiên cứu Động thái Carbon Đất Thừa Thiên Huế",
    subtitle: "Mô hình hóa SOC theo không gian & thời gian sử dụng DayCent & Địa thống kê",
    
    // Workflow Steps
    flow_input: "Chuẩn hóa Đầu vào",
    flow_daycent: "Mô phỏng DayCent",
    flow_kriging: "Nội suy Kriging",
    flow_viz: "Trực quan hóa GIS",

    // Map Controls
    map_layer_soc: "Carbon Hữu cơ Đất (SOC)",
    map_layer_change: "Tốc độ Thay đổi Carbon",
    map_layer_uncert: "Độ lệch Nội suy",
    
    // Analysis
    metric_avg_soc: "Trữ lượng SOC TB",
    metric_seq_rate: "Tốc độ Tích lũy",
    metric_accuracy: "Sai số Kriging (RMSE)",
    
    // Insights
    insight_title: "Phát hiện Chính",
    insight_1: "Chuyển đổi đất suy thoái sang rừng Keo tăng SOC thêm 12% sau 5 năm.",
    insight_2: "Khu vực ven biển thấp trũng tích lũy carbon chậm hơn do hạn chế mặn.",
    
    // Tech Specs
    tech_model: "Mô hình: DayCent (gốc Century)",
    tech_method: "Phương pháp: Ordinary Kriging",
    
    viz_title: "Bản đồ Phân bố Carbon",
    viz_loading: "Đang tải lớp bản đồ GIS..."
  }
};

// --- 2. MOCK DATA ---
const SOC_TREND_DATA = [
  { year: 2015, val: 45 },
  { year: 2016, val: 46 },
  { year: 2017, val: 47.5 },
  { year: 2018, val: 48.2 },
  { year: 2019, val: 50.1 },
  { year: 2020, val: 52.3 },
  { year: 2021, val: 53.8 },
  { year: 2022, val: 55.0 },
  { year: 2023, val: 56.5 },
];

const SCENARIO_COMPARISON = [
  { name: {en: "Baseline", vi: "Hiện trạng"}, val: 56.5, color: "bg-slate-400" },
  { name: {en: "Afforestation", vi: "Trồng rừng"}, val: 68.2, color: "bg-emerald-500" }, // Higher carbon
  { name: {en: "Intensive Ag", vi: "Thâm canh"}, val: 42.1, color: "bg-amber-500" }, // Lower carbon
];

// --- 3. SUB-COMPONENTS ---

// Horizontal Process Flow
const ProcessFlow = ({ t }) => {
  const steps = [
    { id: 1, title: t.flow_input, icon: Database, color: "text-blue-600", bg: "bg-blue-50" },
    { id: 2, title: t.flow_daycent, icon: Cpu, color: "text-amber-600", bg: "bg-amber-50" },
    { id: 3, title: t.flow_kriging, icon: Grid, color: "text-purple-600", bg: "bg-purple-50" },
    { id: 4, title: t.flow_viz, icon: MapIcon, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-100 via-purple-100 to-emerald-100"></div>
      
      {steps.map((step, idx) => (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center text-center z-10 p-2 min-w-[120px]">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step.bg} ${step.color} shadow-sm border border-white`}>
              <step.icon size={20} />
            </div>
            <span className="text-xs font-bold text-slate-700">{step.title}</span>
          </div>
          {idx < steps.length - 1 && (
            <div className="hidden md:block flex-1 h-0.5 bg-slate-200 relative mx-2">
              <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-slate-200 rotate-45"></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Mini Line Chart
const TrendChart = ({ data }) => {
  const maxVal = Math.max(...data.map(d => d.val)) * 1.1;
  const minVal = Math.min(...data.map(d => d.val)) * 0.9;
  
  return (
    <div className="h-32 flex items-end justify-between gap-1 mt-4 px-2">
      {data.map((d, i) => {
        const height = ((d.val - minVal) / (maxVal - minVal)) * 100;
        return (
          <div key={i} className="flex flex-col items-center gap-1 flex-1 group">
            <div 
              className="w-full bg-amber-800/60 rounded-t-sm hover:bg-amber-700 transition-all relative"
              style={{ height: `${height}%` }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                {d.val} tC/ha
              </div>
            </div>
            <span className="text-[9px] text-slate-400">{d.year}</span>
          </div>
        )
      })}
    </div>
  );
};

// --- 4. MAIN DASHBOARD ---
const HueSoilDashboard = ({ onBack, lang = 'vi' }) => {
  const t = HUE_TEXT[lang] || HUE_TEXT.vi;
  const [activeLayer, setActiveLayer] = useState('soc');

  return (
    <div className="animate-fade-in space-y-6 font-sans text-slate-800 pb-20">
      
      {/* Header Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-amber-700 font-medium transition-colors">
            <ArrowLeft size={20} /> {t.back}
          </button>
        </div>
      </div>

      {/* Top: Process Flow (Horizontal) */}
      <ProcessFlow t={t} />

      {/* Middle: Main Content Area (Map Center) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Control Panel (1/4) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Layer Selector */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <Layers size={16} /> GIS Layers
            </h3>
            <div className="space-y-2">
              {[
                { id: 'soc', label: t.map_layer_soc, color: 'border-amber-500' },
                { id: 'change', label: t.map_layer_change, color: 'border-emerald-500' },
                { id: 'uncert', label: t.map_layer_uncert, color: 'border-slate-400' }
              ].map(layer => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all border-l-4 ${
                    activeLayer === layer.id 
                      ? `${layer.color} bg-slate-50 text-slate-900 shadow-sm` 
                      : 'border-transparent text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {layer.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider">{t.metric_avg_soc}</span>
              <div className="text-2xl font-bold text-amber-700">56.5 <span className="text-sm font-normal text-slate-500">tC/ha</span></div>
            </div>
            <div className="w-full h-px bg-slate-100"></div>
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider">{t.metric_seq_rate}</span>
              <div className="text-2xl font-bold text-emerald-600">+1.2 <span className="text-sm font-normal text-slate-500">tC/ha/yr</span></div>
            </div>
            <div className="w-full h-px bg-slate-100"></div>
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider">{t.metric_accuracy}</span>
              <div className="text-2xl font-bold text-slate-700">0.45</div>
            </div>
          </div>
        </div>

        {/* Center Map (2/4) */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg h-[500px] relative overflow-hidden group">
            {/* IFRAME PLACEHOLDER FOR MAP */}
            <iframe 
              src={`${import.meta.env.BASE_URL}carbon_timeline_map.html`}
              title="Hue Soil SOC Map"
              className="w-full h-full border-0 opacity-90 group-hover:opacity-100 transition-opacity"
              loading="lazy"
            />
            
            {/* Map Overlay Controls */}
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur text-white px-3 py-1.5 rounded-md border border-slate-700 text-xs font-mono">
              Mode: {activeLayer.toUpperCase()}
            </div>
            <div className="absolute bottom-4 right-4 text-[10px] text-slate-400 bg-black/50 px-2 py-1 rounded">
              {t.viz_loading}
            </div>
            
            {/* Zoom Hint */}
            <div className="absolute bottom-4 left-4 p-2 bg-slate-700 rounded-lg text-slate-300 hover:bg-slate-600 cursor-pointer">
              <Maximize2 size={16} />
            </div>
          </div>
        </div>

        {/* Right Analytics Panel (1/4) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Carbon Trend */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <TrendingUp size={16} className="text-amber-600"/> SOC Trend (2020-2024)
            </h3>
            <TrendChart data={SOC_TREND_DATA} />
          </div>

          {/* Scenario Comparison */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <BarChart2 size={16} className="text-emerald-600"/> Scenario Analysis
            </h3>
            <div className="space-y-3">
              {SCENARIO_COMPARISON.map((scen, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-600">{scen.name[lang]}</span>
                    <span className="font-bold text-slate-800">{scen.val}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${scen.color}`} 
                      style={{ width: `${(scen.val / 80) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Spec Pill */}
          <div className="bg-slate-100 p-3 rounded-lg border border-slate-200 text-[10px] text-slate-500 font-mono space-y-1">
            <div className="flex items-center gap-2"><Cpu size={10}/> {t.tech_model}</div>
            <div className="flex items-center gap-2"><Grid size={10}/> {t.tech_method}</div>
          </div>

        </div>
      </div>

      {/* Bottom Insights */}
      <div className="bg-amber-50 border border-amber-100 p-6 rounded-xl flex flex-col md:flex-row gap-6 items-start">
        <div className="p-3 bg-white rounded-full shadow-sm text-amber-600 border border-amber-100 shrink-0">
          <FileText size={24} />
        </div>
        <div>
          <h3 className="font-bold text-amber-900 mb-2 text-lg">{t.insight_title}</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-amber-800">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 opacity-70"/> {t.insight_1}
            </li>
            <li className="flex items-start gap-2 text-sm text-amber-800">
              <AlertCircle size={16} className="mt-0.5 shrink-0 opacity-70"/> {t.insight_2}
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default HueSoilDashboard;