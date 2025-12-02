import React, { useState } from 'react';
import { 
  Layers, Database, Activity, BarChart2, 
  Map as MapIcon, FileText, Settings, 
  ArrowRight, CheckCircle, AlertTriangle,
  Cpu, Trees, ScanLine, ArrowLeft, Globe, Download,
  Satellite, MonitorPlay, Eye
} from 'lucide-react';

import canopyGif from '../assets/dashboards/canopy_3d.gif';


// --- 1. TRANSLATIONS ---
const CANOPY_TEXT = {
  en: {
    back: "Back to Projects",
    title: "Tree Canopy Height Modeling",
    subtitle: "3D Forest Structure Analysis using LiDAR & Machine Learning",
    
    // Metrics
    metric_points: "LiDAR Returns",
    metric_acc: "Test Accuracy",
    metric_area: "Area Covered",
    metric_classes: "Height Classes",
    metric_location: "Rochester, MN",

    // Workflow
    flow_title: "Methodology Pipeline",
    step1: "LiDAR Processing",
    step1_desc: "Raw .laz to CHM",
    step1_details: ["Read Laz/Las", "Remove Outliers", "Generate DSM/DEM", "Calculate CHM"],
    step2: "Spectral Analysis",
    step2_desc: "Satellite Integration",
    step2_details: ["Sentinel-2 (Optical)", "Sentinel-1 (SAR)", "Calculate VIs (NDVI)"],
    step3: "Machine Learning",
    step3_desc: "Model Training",
    step3_details: ["Extract Training Data", "Random Forest Classifier", "Hyperparameter Tuning"],
    step4: "Deployment",
    step4_desc: "Prediction & Viz",
    step4_details: ["Predict on GEE", "Interactive Maps", "Export GeoTIFF"],

    // Charts
    feat_title: "Feature Importance",
    feat_subtitle: "Top Predictors",
    feat_analysis_title: "Analysis:",
    feat_analysis_1: "NDVI (45%) is the dominant predictor, indicating strong correlation between vegetation health and height.",
    feat_analysis_2: "SWIR bands (B11, B12) play a crucial role in structural differentiation.",
    
    conf_title: "Model Performance (Confusion Matrix)",
    conf_actual: "Actual",
    conf_pred: "Predicted",
    conf_note_title: "Note on Low Canopy Classes (0-5m)",
    conf_note_desc: "The model shows lower accuracy for classes 1 (0-2m) and 2 (2-5m). This is likely due to the 10m resolution of Sentinel imagery missing smaller shrub/sapling details. Recommendation: Integrate high-res drone data.",

    // 3D Viewer
    viz_title: "3D LiDAR Visualization",
    viz_processing: "Rendering Point Cloud...",
    viz_points: "18M / 18M Points"
  },
  vi: {
    back: "Quay lại Danh sách",
    title: "Mô hình hóa Chiều cao Tán rừng",
    subtitle: "Phân tích Cấu trúc Rừng 3D sử dụng LiDAR & Học máy",
    
    // Metrics
    metric_points: "Điểm LiDAR",
    metric_acc: "Độ chính xác (Test)",
    metric_area: "Diện tích phủ",
    metric_classes: "Lớp độ cao",
    metric_location: "Rochester, MN",

    // Workflow
    flow_title: "Quy trình Phương pháp luận",
    step1: "Xử lý LiDAR",
    step1_desc: "Dữ liệu thô .laz sang CHM",
    step1_details: ["Đọc Laz/Las", "Loại bỏ nhiễu", "Tạo DSM/DEM", "Tính toán CHM"],
    step2: "Phân tích Phổ",
    step2_desc: "Tích hợp Vệ tinh",
    step2_details: ["Sentinel-2 (Quang học)", "Sentinel-1 (SAR)", "Tính chỉ số (NDVI)"],
    step3: "Học máy (ML)",
    step3_desc: "Huấn luyện Mô hình",
    step3_details: ["Trích xuất mẫu", "Random Forest Classifier", "Tinh chỉnh tham số"],
    step4: "Triển khai",
    step4_desc: "Dự báo & Trực quan",
    step4_details: ["Dự báo trên GEE", "Bản đồ tương tác", "Xuất GeoTIFF"],

    // Charts
    feat_title: "Mức độ Quan trọng của Biến",
    feat_subtitle: "Các biến dự báo hàng đầu",
    feat_analysis_title: "Phân tích:",
    feat_analysis_1: "NDVI (45%) là chỉ số quan trọng nhất, phản ánh mối liên hệ mạnh mẽ giữa sức khỏe thực vật và chiều cao.",
    feat_analysis_2: "Các kênh SWIR (B11, B12) đóng vai trò quan trọng thứ hai trong việc phân tách cấu trúc.",
    
    conf_title: "Hiệu suất Mô hình (Ma trận Nhầm lẫn)",
    conf_actual: "Thực tế",
    conf_pred: "Dự báo",
    conf_note_title: "Lưu ý về các lớp thấp (0-5m)",
    conf_note_desc: "Mô hình có độ chính xác thấp hơn ở lớp 1 (0-2m) và 2 (2-5m). Nguyên nhân có thể do độ phân giải 10m của Sentinel chưa đủ để bắt chi tiết bụi rậm/cây non. Khuyến nghị: Tích hợp dữ liệu Drone độ phân giải cao.",

    // 3D Viewer
    viz_title: "Mô phỏng LiDAR 3D",
    viz_processing: "Đang tải Đám mây điểm...",
    viz_points: "18 Triệu / 18 Triệu Điểm"
  }
};

// --- 2. MOCK DATA ---
const METRICS = {
  train_acc: 0.89,
  test_acc: 0.74,
  points: "18,257,366",
  area: "25 ha",
  classes: ["Ground", "0-2m", "2-5m", "5-15m", "15-30m"]
};

const FEATURE_IMPORTANCE = [
  { name: "B1 (Coastal)", val: 0.15 },
  { name: "B11 (SWIR)", val: 0.35 },
  { name: "B12 (SWIR)", val: 0.32 },
  { name: "B5 (Red Edge)", val: 0.28 },
  { name: "NDVI", val: 0.45 },
  { name: "VV (SAR)", val: 0.12 }
];

const CONFUSION_MATRIX = [
  [50, 4, 0, 0, 2], // Ground
  [5, 40, 1, 0, 5], // 0-2m
  [0, 2, 30, 9, 0], // 2-5m
  [0, 0, 2, 20, 10], // 5-15m
  [1, 0, 0, 2, 51]  // 15-30m
];

// --- 3. SUB-COMPONENTS ---

const MetricCard = ({ label, value, icon: Icon, subtext }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between hover:shadow-md transition-all">
    <div>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{label}</p>
      <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
      {subtext && <p className="text-[10px] text-slate-400 mt-1">{subtext}</p>}
    </div>
    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
      <Icon size={20} />
    </div>
  </div>
);

// NEW DESIGN: PIPELINE STEP COMPONENT (Vertical)
const PipelineStep = ({ number, title, desc, details, icon: Icon, colorClass, bgClass, borderClass }) => (
  <div className="relative pl-14 pb-10 last:pb-0 group">
    {/* Connector Line */}
    <div className="absolute left-6 top-10 bottom-0 w-0.5 bg-slate-200 group-last:hidden"></div>
    
    {/* Icon Circle */}
    <div className={`absolute left-0 top-0 w-12 h-12 rounded-xl flex items-center justify-center border-2 bg-white z-10 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md ${borderClass} ${colorClass}`}>
      <Icon size={20} />
    </div>

    {/* Content Card */}
    <div className={`p-4 rounded-xl border bg-white shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:translate-x-1 ${borderClass}`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className={`font-bold text-sm uppercase tracking-wider ${colorClass}`}>{title}</h4>
        <span className="text-[10px] font-bold text-slate-300">0{number}</span>
      </div>
      <p className="text-xs text-slate-600 mb-3 font-medium">{desc}</p>
      
      {/* Detail Badges */}
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

const FeatureChart = () => (
  <div className="space-y-3">
    {FEATURE_IMPORTANCE.sort((a,b) => b.val - a.val).map((f, i) => (
      <div key={i} className="flex items-center text-xs group">
        <span className="w-20 text-slate-600 font-mono truncate group-hover:text-emerald-700 transition-colors">{f.name}</span>
        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden mx-2">
          <div 
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out" 
            style={{ width: `${f.val * 100}%` }}
          ></div>
        </div>
        <span className="w-8 text-right font-bold text-slate-700">{(f.val * 100).toFixed(0)}%</span>
      </div>
    ))}
  </div>
);

// --- 4. MAIN COMPONENT ---
const CanopyDashboard = ({ onBack, lang = 'vi' }) => {
  // Chuyển đổi ngôn ngữ
  const t = CANOPY_TEXT[lang] || CANOPY_TEXT.vi;

  return (
    <div className="animate-fade-in space-y-8 font-sans text-slate-800">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium transition-colors">
          <ArrowLeft size={20} /> {t.back}
        </button>
         <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200">
          Project: CHM-LiDAR
         </span>
      </div>

      {/* Title Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.title}</h1>
            <p className="text-slate-500 leading-relaxed mb-8 text-lg">{t.subtitle}</p>
            
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <MetricCard label={t.metric_points} value={METRICS.points} icon={Database} subtext="LiDAR Returns" />
              <MetricCard label={t.metric_acc} value={`${(METRICS.test_acc * 100).toFixed(0)}%`} icon={Activity} subtext="Validation Set" />
              <MetricCard label={t.metric_area} value={METRICS.area} icon={MapIcon} subtext={t.metric_location} />
              <MetricCard label={t.metric_classes} value={METRICS.classes.length} icon={Layers} subtext="Height Categories" />
            </div>
          </div>

          {/* 3D Visualizer */}
          <div className="w-full md:w-1/2 aspect-video bg-slate-900 rounded-xl overflow-hidden relative shadow-lg border border-slate-800 group">
            <img 
              src={canopyGif} 
              alt="3D LiDAR Point Cloud" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="bg-black/60 px-4 py-2 rounded-full text-white text-sm font-bold backdrop-blur-sm border border-white/20 flex items-center gap-2">
                 <ScanLine size={16} className="animate-pulse text-emerald-400"/> {t.viz_title}
               </div>
            </div>
             <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-2/3 animate-progress"></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>{t.viz_processing}</span>
                <span>{t.viz_points}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT COLUMN: METHODOLOGY (Redesigned Vertical) --- */}
        <div className="lg:col-span-1">
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200 h-full sticky top-6">
            <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-3 text-lg border-b pb-4 border-slate-200">
              <div className="p-2 bg-slate-800 rounded-lg text-white shadow-sm"><Settings size={18}/></div>
              {t.flow_title}
            </h3>
            
            <div className="flex flex-col">
              {/* Step 1: LiDAR */}
              <PipelineStep 
                number="1" 
                title={t.step1} 
                desc={t.step1_desc} 
                details={t.step1_details}
                icon={Database}
                colorClass="text-emerald-600"
                borderClass="border-emerald-200"
                bgClass="bg-emerald-50"
              />
              {/* Step 2: Spectral */}
              <PipelineStep 
                number="2" 
                title={t.step2} 
                desc={t.step2_desc} 
                details={t.step2_details}
                icon={Satellite}
                colorClass="text-blue-600"
                borderClass="border-blue-200"
                bgClass="bg-blue-50"
              />
              {/* Step 3: ML */}
              <PipelineStep 
                number="3" 
                title={t.step3} 
                desc={t.step3_desc} 
                details={t.step3_details}
                icon={Cpu}
                colorClass="text-purple-600"
                borderClass="border-purple-200"
                bgClass="bg-purple-50"
              />
              {/* Step 4: Output */}
               <PipelineStep 
                number="4" 
                title={t.step4} 
                desc={t.step4_desc} 
                details={t.step4_details}
                icon={MapIcon}
                colorClass="text-amber-600"
                borderClass="border-amber-200"
                bgClass="bg-amber-50"
              />
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: RESULTS & ANALYSIS --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Feature Importance Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                <BarChart2 size={22} className="text-blue-500"/> {t.feat_title}
              </h3>
              <span className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold border border-blue-100">{t.feat_subtitle}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FeatureChart />
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-xs text-slate-600 h-full flex flex-col justify-center">
                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm"><FileText size={16}/> {t.feat_analysis_title}</h4>
                <ul className="space-y-3 list-disc pl-4 leading-relaxed">
                  <li><strong className="text-emerald-600">{t.feat_analysis_1}</strong></li>
                  <li>{t.feat_analysis_2}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Confusion Matrix Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50">
                <Cpu size={22} className="text-purple-500"/> 
                <h3 className="font-bold text-slate-800 text-lg">{t.conf_title}</h3>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-center">
                 <thead>
                   <tr className="text-xs font-bold text-slate-500 border-b-2 border-slate-100">
                     <th className="p-3 text-left bg-slate-50 rounded-tl-lg">{t.conf_actual} \ {t.conf_pred}</th>
                     <th className="p-3 bg-emerald-50 text-emerald-700 border-r border-white">Ground</th>
                     <th className="p-3 bg-emerald-50 text-emerald-700 border-r border-white">0-2m</th>
                     <th className="p-3 bg-emerald-50 text-emerald-700 border-r border-white">2-5m</th>
                     <th className="p-3 bg-emerald-50 text-emerald-700 border-r border-white">5-15m</th>
                     <th className="p-3 bg-emerald-50 text-emerald-700 rounded-tr-lg">15-30m</th>
                   </tr>
                 </thead>
                 <tbody>
                   {CONFUSION_MATRIX.map((row, i) => (
                     <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                       <td className="p-3 font-bold text-slate-700 text-left border-r border-slate-100 bg-slate-50 group-hover:bg-slate-100 transition-colors">{METRICS.classes[i]}</td>
                       {row.map((cell, j) => (
                         <td key={j} className={`p-3 transition-all duration-300 ${i === j ? 'bg-emerald-100 font-bold text-emerald-800 ring-inset ring-1 ring-emerald-200' : 'text-slate-400'}`}>
                           {cell}
                         </td>
                       ))}
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
             
             <div className="mt-6 flex gap-4 items-start bg-amber-50 p-4 rounded-xl border border-amber-100">
               <div className="p-2 bg-white rounded-full shadow-sm text-amber-500 border border-amber-100 shrink-0">
                  <AlertTriangle size={18}/>
               </div>
               <div>
                 <h4 className="text-sm font-bold text-amber-800 mb-1">{t.conf_note_title}</h4>
                 <p className="text-xs text-amber-700 leading-relaxed opacity-90">{t.conf_note_desc}</p>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CanopyDashboard;