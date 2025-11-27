import React, { useState } from 'react';
import { 
  ArrowLeft, MapPin, Database, Activity, 
  BarChart2, Settings, TrendingDown, Sprout, 
  Droplets, Layers, ChevronRight, AlertCircle,
  ThermometerSun, Wind, CheckCircle2,
  Globe, FileText, Cpu, Satellite
} from 'lucide-react';

// --- 1. TRANSLATIONS ---
const GUJ_TEXT = {
  en: {
    back: "Back to Projects",
    title: "Gujarat Cropping Systems Analysis",
    subtitle: "DayCent Calibration & GHG Mitigation Potential (Cotton, Groundnut, Wheat)",
    
    // Metrics
    metric_sites: "Simulation Sites",
    metric_scenarios: "Mgmt Scenarios",
    metric_reduction: "Max Reduction",
    metric_accuracy: "Model Fit (R²)",
    metric_location: "Gujarat, India",

    // Workflow
    flow_title: "Analysis Pipeline",
    step1: "Data Input",
    step1_desc: "Soil & Weather Data",
    step1_details: ["SoilGrids", "NASA Power", "43 Sites"],
    step2: "Sensitivity Analysis",
    step2_desc: "Identify Key Parameters",
    step2_details: ["prdx (Potential)", "ppdf (Temp)", "Crop Specific"],
    step3: "Calibration",
    step3_desc: "Adjust Model Params",
    step3_details: ["Minimize MSE", "Correct Bias", "Temp Response"],
    step4: "Validation",
    step4_desc: "Uncertainty Check",
    step4_details: ["Posterior Dist.", "Prediction Interval"],
    step5: "Simulation",
    step5_desc: "Run Scenarios",
    step5_details: ["2020-2030", "32 Combinations", "GHG Quantification"],

    // Charts
    sens_title: "Parameter Sensitivity",
    sens_subtitle: "Top Drivers of Yield",
    sens_desc: "Cotton is highly sensitive to Temperature (ppdf), while Wheat & Groundnut depend on Potential Production (prdx).",
    
    calib_title: "Calibration Performance",
    calib_cotton: "Cotton (Temp Adjusted)",
    calib_wheat: "Wheat (Biomass Adjusted)",
    calib_groundnut: "Groundnut (Bias Corrected)",
    status_pre: "Pre-Cal",
    status_post: "Post-Cal",

    res_title: "GHG Emission Reductions",
    res_insight: "Residue Incorporation shows the highest mitigation potential (-1.51 Mg CO2e/ha), significantly outperforming other strategies.",
    chart_y: "Mg CO2e/ha (Negative = Reduction)",
    
    viz_title: "Simulation Map",
    viz_processing: "Loading 43 sites...",
    viz_points: "Spatial Random Sampling"
  },
  vi: {
    back: "Quay lại Danh sách",
    title: "Phân tích Hệ thống Canh tác Gujarat",
    subtitle: "Hiệu chỉnh DayCent & Tiềm năng Giảm phát thải (Bông, Lạc, Lúa mì)",
    
    // Metrics
    metric_sites: "Điểm Mô phỏng",
    metric_scenarios: "Kịch bản Quản lý",
    metric_reduction: "Giảm tối đa",
    metric_accuracy: "Độ phù hợp (R²)",
    metric_location: "Gujarat, Ấn Độ",

    // Workflow
    flow_title: "Quy trình Phân tích",
    step1: "Dữ liệu đầu vào",
    step1_desc: "Dữ liệu Đất & Thời tiết",
    step1_details: ["SoilGrids", "NASA Power", "43 Điểm"],
    step2: "Phân tích Độ nhạy",
    step2_desc: "Xác định Tham số chính",
    step2_details: ["prdx (Tiềm năng)", "ppdf (Nhiệt độ)", "Theo cây trồng"],
    step3: "Hiệu chỉnh",
    step3_desc: "Điều chỉnh Mô hình",
    step3_details: ["Tối thiểu MSE", "Khử sai số", "Phản ứng nhiệt"],
    step4: "Kiểm định",
    step4_desc: "Kiểm tra độ tin cậy",
    step4_details: ["Phân phối hậu nghiệm", "Khoảng dự báo"],
    step5: "Mô phỏng",
    step5_desc: "Chạy Kịch bản",
    step5_details: ["2020-2030", "32 Tổ hợp", "Lượng hóa GHG"],

    // Charts
    sens_title: "Độ nhạy Tham số",
    sens_subtitle: "Yếu tố quyết định năng suất",
    sens_desc: "Bông nhạy cảm nhất với Nhiệt độ (ppdf), trong khi Lúa mì & Lạc phụ thuộc vào Tiềm năng sản xuất (prdx).",
    
    calib_title: "Hiệu suất Hiệu chỉnh",
    calib_cotton: "Bông (Chỉnh nhiệt độ)",
    calib_wheat: "Lúa mì (Chỉnh sinh khối)",
    calib_groundnut: "Lạc (Khử ước tính cao)",
    status_pre: "Trước HC",
    status_post: "Sau HC",

    res_title: "Giảm phát thải GHG",
    res_insight: "Xử lý tàn dư (Residue Inc) cho thấy tiềm năng giảm phát thải cao nhất (-1.51 Mg CO2e/ha), vượt trội so với các chiến lược khác.",
    chart_y: "Mg CO2e/ha (Âm = Giảm)",
    
    viz_title: "Bản đồ Mô phỏng",
    viz_processing: "Đang tải 43 điểm...",
    viz_points: "Lấy mẫu ngẫu nhiên không gian"
  }
};

// --- 2. MOCK DATA ---
const GUJ_METRICS = {
  sites: "43",
  scenarios: "32",
  reduction: "-1.51", // Mg CO2e/ha
  accuracy: "0.85"
};

const SENSITIVITY_DATA = {
  cotton: [
    { param: "ppdf(2) - Max Temp", val: 6.5, highlight: true },
    { param: "prdx(1) - Potential", val: 4.0, highlight: false },
    { param: "ppdf(1) - Opt Temp", val: 4.0, highlight: true },
    { param: "ppdf(3) - Curve Shape", val: 1.8, highlight: false },
  ],
  wheat: [
    { param: "prdx(1) - Potential", val: 170, highlight: true },
    { param: "ppdf(2) - Max Temp", val: 100, highlight: false },
    { param: "ppdf(3) - Curve Shape", val: 90, highlight: false },
  ]
};

const REDUCTION_DATA = [
  { id: 'residue', label: {en: "Residue Inc.", vi: "Xử lý Tàn dư"}, val: -1.51, color: "bg-emerald-500", icon: Sprout },
  { id: 'cotton', label: {en: "Cotton Rotation", vi: "Luân canh Bông"}, val: -0.96, color: "bg-blue-500", icon: Layers },
  { id: 'cover', label: {en: "No Cover Crop", vi: "Không che phủ"}, val: -0.83, color: "bg-slate-500", icon: Wind }, 
  { id: 'drip', label: {en: "Drip Irrigation", vi: "Tưới nhỏ giọt"}, val: -0.76, color: "bg-cyan-500", icon: Droplets },
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

// Vertical Pipeline Step (Styled like Canopy Dashboard)
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

// Sensitivity Chart Component
const SensitivityChart = ({ data, color }) => (
  <div className="space-y-3">
    {data.map((d, i) => (
      <div key={i} className="group">
        <div className="flex justify-between text-xs mb-1">
          <span className={d.highlight ? "font-bold text-slate-800" : "text-slate-500"}>{d.param}</span>
          <span className="font-mono text-slate-400">{d.val}</span>
        </div>
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${d.highlight ? color : 'bg-slate-300'}`} 
            style={{ width: `${(d.val / (data[0].val * 1.1)) * 100}%` }}
          ></div>
        </div>
      </div>
    ))}
  </div>
);

// Calibration Scatter Plot (Mini)
const CalibrationScatter = ({ type, isFixed, t }) => {
  const points = Array.from({ length: 15 }).map((_, i) => {
    const x = 300 + i * 20;
    let y = x; 
    const noise = (Math.random() - 0.5) * 60;
    if (!isFixed) {
      if (type === 'cotton') y = x * 0.75 + noise;
      if (type === 'wheat') y = x * 0.85 + noise; 
      if (type === 'groundnut') y = x * 1.35 + noise; 
    } else {
      y = x + noise * 0.3;
    }
    return { x, y };
  });

  return (
    <div className="relative w-full aspect-square bg-slate-50 rounded-lg border border-slate-200 overflow-hidden group">
      <div className="absolute inset-0 m-4 border-b border-l border-slate-300 z-10"></div>
      <svg className="w-full h-full p-4" viewBox="0 0 700 700">
        <line x1="0" y1="700" x2="700" y2="0" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5,5" />
        {points.map((p, i) => (
          <circle key={i} cx={(p.x - 250) * 1.5} cy={700 - (p.y - 250) * 1.5} r="10" className={`${isFixed ? 'fill-emerald-500' : 'fill-amber-500'} opacity-70 group-hover:opacity-100 transition-opacity`} />
        ))}
      </svg>
      <div className="absolute bottom-1 right-2 text-[8px] text-slate-400 font-bold uppercase">{t.axis_obs}</div>
      <div className="absolute top-2 left-1 text-[8px] text-slate-400 font-bold uppercase">{t.axis_sim}</div>
    </div>
  );
};

// --- 4. MAIN DASHBOARD ---
const GujaratDashboard = ({ onBack, lang = 'vi' }) => {
  const t = GUJ_TEXT[lang] || GUJ_TEXT.vi;

  return (
    <div className="animate-fade-in space-y-8 font-sans text-slate-800 pb-20">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium transition-colors">
          <ArrowLeft size={20} /> {t.back}
        </button>
      </div>

      {/* Title & Stats Section (Matches Canopy Layout) */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.title}</h1>
            <p className="text-slate-500 leading-relaxed mb-8 text-lg">{t.subtitle}</p>
            
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <MetricCard label={t.metric_sites} value={GUJ_METRICS.sites} icon={MapPin} colorClass="bg-red-500 text-red-500" />
              <MetricCard label={t.metric_scenarios} value={GUJ_METRICS.scenarios} icon={Layers} colorClass="bg-blue-500 text-blue-500" />
              <MetricCard label={t.metric_reduction} value={GUJ_METRICS.reduction} icon={TrendingDown} colorClass="bg-emerald-500 text-emerald-500" />
              <MetricCard label={t.metric_accuracy} value={GUJ_METRICS.accuracy} icon={Activity} colorClass="bg-purple-500 text-purple-500" />
            </div>
          </div>

          {/* Visualizer (Map) - Interactive HTML Map */}
          <div className="w-full md:w-1/2 aspect-video bg-slate-100 rounded-xl overflow-hidden relative shadow-lg border border-slate-200">
            {/* Interactive HTML Map */}
            <iframe
              src={`${import.meta.env.BASE_URL}map_ghg_gujarat.html`}
              className="w-full h-full border-0"
              title="Gujarat GHG Emission Map"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: WORKFLOW (Vertical) --- */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200 h-full sticky top-6">
            <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-3 text-lg border-b pb-4 border-slate-200">
              <div className="p-2 bg-slate-800 rounded-lg text-white shadow-sm"><Settings size={18}/></div>
              {t.flow_title}
            </h3>
            
            <div className="flex flex-col">
              <PipelineStep number="1" title={t.step1} desc={t.step1_desc} details={t.step1_details} icon={Database} colorClass="text-emerald-600" borderClass="border-emerald-200" bgClass="bg-emerald-50"/>
              <PipelineStep number="2" title={t.step2} desc={t.step2_desc} details={t.step2_details} icon={BarChart2} colorClass="text-blue-600" borderClass="border-blue-200" bgClass="bg-blue-50"/>
              <PipelineStep number="3" title={t.step3} desc={t.step3_desc} details={t.step3_details} icon={CheckCircle2} colorClass="text-purple-600" borderClass="border-purple-200" bgClass="bg-purple-50"/>
              <PipelineStep number="4" title={t.step4} desc={t.step4_desc} details={t.step4_details} icon={Activity} colorClass="text-amber-600" borderClass="border-amber-200" bgClass="bg-amber-50"/>
              <PipelineStep number="5" title={t.step5} desc={t.step5_desc} details={t.step5_details} icon={Cpu} colorClass="text-red-600" borderClass="border-red-200" bgClass="bg-red-50"/>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: ANALYSIS --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Card 1: Sensitivity Analysis */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                <BarChart2 size={22} className="text-blue-500"/> {t.sens_title}
              </h3>
              <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold border border-blue-100">{t.sens_subtitle}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase mb-3">Cotton (Bông)</div>
                <SensitivityChart data={SENSITIVITY_DATA.cotton} color="bg-red-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase mb-3">Wheat (Lúa mì)</div>
                <SensitivityChart data={SENSITIVITY_DATA.wheat} color="bg-emerald-400" />
              </div>
            </div>
            <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 italic border border-slate-100">
              {t.sens_desc}
            </div>
          </div>

          {/* Card 2: Calibration Results */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <Activity size={22} className="text-purple-500"/> 
                <h3 className="font-bold text-slate-800 text-lg">{t.calib_title}</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cotton */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>{t.calib_cotton}</span>
                    <span className="text-red-500">RMSE: 12.4</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><CalibrationScatter type="cotton" isFixed={false} t={t}/><div className="text-center text-[10px] text-slate-400 mt-1">{t.status_pre}</div></div>
                    <div><CalibrationScatter type="cotton" isFixed={true} t={t}/><div className="text-center text-[10px] text-emerald-600 mt-1 font-bold">{t.status_post}</div></div>
                  </div>
                </div>
                {/* Wheat */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>{t.calib_wheat}</span>
                    <span className="text-red-500">RMSE: 15.1</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><CalibrationScatter type="wheat" isFixed={false} t={t}/><div className="text-center text-[10px] text-slate-400 mt-1">{t.status_pre}</div></div>
                    <div><CalibrationScatter type="wheat" isFixed={true} t={t}/><div className="text-center text-[10px] text-emerald-600 mt-1 font-bold">{t.status_post}</div></div>
                  </div>
                </div>
                {/* Groundnut */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>{t.calib_groundnut}</span>
                    <span className="text-red-500">RMSE: 18.2</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div><CalibrationScatter type="groundnut" isFixed={false} t={t}/><div className="text-center text-[10px] text-slate-400 mt-1">{t.status_pre}</div></div>
                    <div><CalibrationScatter type="groundnut" isFixed={true} t={t}/><div className="text-center text-[10px] text-emerald-600 mt-1 font-bold">{t.status_post}</div></div>
                  </div>
                </div>
             </div>
          </div>

          {/* Card 3: GHG Reduction Results */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <TrendingDown size={22} className="text-emerald-500"/> 
                <h3 className="font-bold text-slate-800 text-lg">{t.res_title}</h3>
             </div>
             
             <div className="space-y-4">
                {REDUCTION_DATA.map((item) => (
                  <div key={item.id} className="group">
                    <div className="flex justify-between text-sm mb-1">
                      <div className="flex items-center gap-2">
                        <item.icon size={16} className="text-slate-400 group-hover:text-emerald-600 transition-colors"/>
                        <span className="font-bold text-slate-700">{item.label[lang]}</span>
                      </div>
                      <span className="font-mono font-bold text-slate-800">{item.val}</span>
                    </div>
                    {/* Custom Bar Chart for Negative Values */}
                    <div className="h-8 w-full bg-slate-50 rounded-lg overflow-hidden relative border border-slate-100">
                      {/* Zero Axis Line (at 80% width) */}
                      <div className="absolute top-0 bottom-0 left-[80%] w-0.5 bg-slate-300 z-10 border-dashed border-l"></div>
                      
                      {/* Bar (Values are negative, so growing from right to left) */}
                      <div 
                        className={`absolute top-1 bottom-1 right-[20%] rounded-l-md ${item.color} opacity-80 hover:opacity-100 transition-all duration-500`}
                        style={{ width: `${Math.abs(item.val / 2) * 100}%` }} // Scale factor roughly 2
                      >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* X-Axis Labels */}
                <div className="flex justify-between text-[10px] text-slate-400 px-1 pt-1 font-mono">
                  <span>-2.0</span>
                  <span className="pl-8">-1.0</span>
                  <span>0 (Baseline)</span>
                </div>
             </div>
             
             <div className="mt-6 flex gap-4 items-start bg-emerald-50 p-4 rounded-xl border border-emerald-100">
               <div className="p-2 bg-white rounded-full shadow-sm text-emerald-500 border border-emerald-100 shrink-0">
                  <CheckCircle2 size={18}/>
               </div>
               <div>
                 <h4 className="text-sm font-bold text-emerald-800 mb-1">Key Insight</h4>
                 <p className="text-xs text-emerald-700 leading-relaxed opacity-90">{t.res_insight}</p>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GujaratDashboard;