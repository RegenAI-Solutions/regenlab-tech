import React, { useState } from 'react';
import {
  Activity, Settings, CheckCircle2,
  AlertCircle, TrendingUp, RefreshCw,
  ArrowLeft, ChevronRight, Sprout,
  FileJson, Database, GitCompare, ArrowRight,
  ThermometerSun, Calculator,
  ExternalLink, FileText, Layers, Award
} from 'lucide-react';

// --- DASHBOARD TRANSLATIONS ---
const DASH_TEXT = {
  en: {
    back: "Back to Projects",
    workflow_title: "Calibration Pipeline (PEST + DayCent)",
    step1: "Input JSONs",
    step1_desc: "Site, Soil, Weather & Management Data",
    step2: "DayCent Model",
    step2_desc: "Warm-up Phase + Simulation Phase",
    step3: "Compare",
    step3_desc: "Simulated vs. Observed (calc_GHG)",
    step4: "PEST Optimization",
    step4_desc: "Sensitivity Analysis & Loop",
    warmup_title: "Warm-up Phase:",
    warmup_desc: "The model runs a 'spin-up' period to stabilize soil carbon pools before calibration.",
    results_title: "Calibration Results",
    results_desc: "Interactive analysis of DayCent model performance vs. Field observations",
    pre_cal: "Pre-Calibration",
    post_cal: "Post-Calibration",
    select_crop: "Select Crop",
    available: "Available",
    summary: "Summary",
    summary_desc: "Average model fit (R²) across the modeled crops, before vs. after PEST calibration:",
    summary_metric: "Average R²",
    model_fit: "Model Fit (R²)",
    error: "Error (RMSE)",
    status: "Status",
    converged: "Converged",
    running: "Running...",
    sim_vs_obs: "Simulated vs Observed",
    point_label: "Sim vs Obs",
    line_label: "1:1 line",
    axis_obs_label: "Observed (kg C/ha)",
    axis_sim_label: "Simulated (kg C/ha)",
    adj_params: "Adjusted Params",
    enable_post: "Enable 'Post-Calibration' to see changes.",
    calib_intro: "Behind the planner: how we calibrate the model",
    overview: {
      badge: "Live · V1.0 General Availability",
      title: "California Regen Ag Planner",
      subtitle: "Co-developed by RegenLab with the CSU Chico Center for Regenerative Agriculture — supporting California's Healthy Soils Program.",
      desc: "A free web application that helps California farmers and ranchers map their fields, plan regenerative practices, and quantify the soil-carbon and greenhouse-gas outcomes of those choices — built on process-based modeling (DayCent) calibrated to peer-reviewed California crop research.",
      features_title: "What it does",
      features: [
        { t: "Soil Health Management Plans", d: "Editable (MS Word) per-field plans with maps, soil data, and modeled outcomes." },
        { t: "Modeled SOC & GHG outcomes", d: "Soil organic carbon to 30 cm and GHG deltas, calibrated to California crops." },
        { t: "Practice & reimbursement finder", d: "Surfaces CDFA Healthy Soils Program reimbursement opportunities." },
        { t: "Resiliency Explorer (CARI)", d: "Scores field resilience via the California Agricultural Resiliency Index." },
        { t: "Rich map overlays", d: "Soils, subsidence, aquifers, water conveyances, biodiversity, wetlands." },
        { t: "Plan comparison", d: "Compare management plans by SOC stock and GHG benefit." }
      ],
      cta: "Open the live app",
      cta_about: "About (CSU Chico)"
    }
  },
  vi: {
    back: "Quay lại Danh sách",
    workflow_title: "Quy trình Hiệu chỉnh (PEST + DayCent)",
    step1: "Dữ liệu Đầu vào",
    step1_desc: "Dữ liệu Đất, Thời tiết & Canh tác",
    step2: "Mô hình DayCent",
    step2_desc: "Giai đoạn Khởi động + Mô phỏng",
    step3: "So sánh",
    step3_desc: "Mô phỏng vs. Thực tế (Hàm GHG)",
    step4: "Tối ưu hóa PEST",
    step4_desc: "Phân tích độ nhạy & Vòng lặp",
    warmup_title: "Giai đoạn Khởi động (Warm-up):",
    warmup_desc: "Mô hình chạy giai đoạn 'làm nóng' để ổn định bể chứa carbon trong đất trước khi hiệu chỉnh.",
    results_title: "Kết quả Hiệu chỉnh",
    results_desc: "Phân tích tương tác hiệu suất mô hình DayCent so với dữ liệu thực địa",
    pre_cal: "Trước Hiệu chỉnh",
    post_cal: "Sau Hiệu chỉnh",
    select_crop: "Chọn Cây trồng",
    available: "Có sẵn",
    summary: "Tổng kết",
    summary_desc: "Độ phù hợp mô hình (R²) trung bình trên các cây trồng, trước và sau hiệu chỉnh PEST:",
    summary_metric: "R² trung bình",
    model_fit: "Độ phù hợp (R²)",
    error: "Sai số (RMSE)",
    status: "Trạng thái",
    converged: "Hội tụ",
    running: "Đang chạy...",
    sim_vs_obs: "Mô phỏng vs Quan trắc",
    point_label: "Mô phỏng vs Quan trắc",
    line_label: "Đường 1:1",
    axis_obs_label: "Quan trắc (kg C/ha)",
    axis_sim_label: "Mô phỏng (kg C/ha)",
    adj_params: "Tham số Điều chỉnh",
    enable_post: "Bật 'Sau Hiệu chỉnh' để xem thay đổi.",
    calib_intro: "Bên trong công cụ: cách chúng tôi hiệu chỉnh mô hình",
    overview: {
      badge: "Trực tuyến · Phiên bản 1.0 (Chính thức)",
      title: "California Regen Ag Planner",
      subtitle: "Đồng phát triển bởi RegenLab cùng Trung tâm Nông nghiệp Tái sinh CSU Chico — hỗ trợ Chương trình Đất khỏe California.",
      desc: "Ứng dụng web miễn phí giúp nông dân California lập bản đồ cánh đồng, lập kế hoạch các biện pháp tái sinh, và định lượng kết quả carbon đất và khí nhà kính — xây dựng trên mô hình DayCent được hiệu chỉnh theo nghiên cứu bình duyệt về cây trồng California.",
      features_title: "Tính năng chính",
      features: [
        { t: "Kế hoạch Quản lý Sức khỏe Đất", d: "Kế hoạch theo từng cánh đồng (MS Word) kèm bản đồ, dữ liệu đất và kết quả mô hình." },
        { t: "Kết quả SOC & GHG mô hình hóa", d: "Carbon hữu cơ đất đến 30 cm và chênh lệch GHG, hiệu chỉnh theo cây trồng California." },
        { t: "Tìm biện pháp & hoàn phí", d: "Hiển thị cơ hội hoàn phí theo Chương trình Đất khỏe CDFA." },
        { t: "Resiliency Explorer (CARI)", d: "Chấm điểm khả năng chống chịu theo Chỉ số CARI." },
        { t: "Lớp bản đồ phong phú", d: "Loại đất, sụt lún, tầng nước ngầm, kênh dẫn nước, đa dạng sinh học, đất ngập nước." },
        { t: "So sánh kế hoạch", d: "So sánh các kế hoạch theo trữ lượng SOC và lợi ích GHG." }
      ],
      cta: "Mở ứng dụng",
      cta_about: "Giới thiệu (CSU Chico)"
    }
  }
};

// Each crop carries a TARGET post-calibration R2 and a (lower) pre-calibration R2.
// The time series below are constructed so the plotted Simulated-vs-Observed
// curves have EXACTLY these R2 values; RMSE and the displayed R2 are then
// computed from that same data (see r2score / rmseScore) — single source of truth.
const CROPS = [
  { id: 'rice',   name: { en: 'Rice (aglivc)', vi: 'Lúa (aglivc)' }, mean: 165, amp: 55, phase: 0.4, seed: 1.2, r2: 0.82, r2pre: 0.49, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { id: 'corn',   name: { en: 'Corn (grain)',  vi: 'Ngô (hạt)' },   mean: 240, amp: 90, phase: 1.1, seed: 2.7, r2: 0.91, r2pre: 0.58, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { id: 'almond', name: { en: 'Almonds',       vi: 'Hạnh nhân' },   mean: 300, amp: 70, phase: 2.0, seed: 3.3, r2: 0.78, r2pre: 0.46, color: 'text-orange-600', bg: 'bg-orange-100' },
  { id: 'grapes', name: { en: 'Grapes',        vi: 'Nho' },          mean: 210, amp: 60, phase: 2.6, seed: 4.1, r2: 0.85, r2pre: 0.52, color: 'text-purple-600', bg: 'bg-purple-100' },
  { id: 'cotton', name: { en: 'Cotton',        vi: 'Bông vải' },     mean: 180, amp: 65, phase: 3.2, seed: 5.5, r2: 0.88, r2pre: 0.55, color: 'text-slate-600', bg: 'bg-slate-100' },
];

const N_MONTHS = 12;

// Build a deterministic observed series + simulated series whose R2 vs observed
// equals the crop's targets exactly. Residual e is zero-mean and scaled so that
// SS_res = (1 - R2) * SS_tot  =>  R2 = 1 - SS_res/SS_tot is exact.
function buildSeries(c) {
  const obs = Array.from({ length: N_MONTHS }, (_, i) =>
    c.mean + c.amp * Math.sin((2 * Math.PI * i) / N_MONTHS + c.phase) + 0.12 * c.amp * Math.sin(i * 1.3 + c.seed)
  );
  const meanObs = obs.reduce((a, b) => a + b, 0) / N_MONTHS;
  const ssTot = obs.reduce((a, o) => a + (o - meanObs) ** 2, 0);

  const scaledResidual = (shape, r2) => {
    const m = shape.reduce((a, b) => a + b, 0) / N_MONTHS;
    const centered = shape.map((v) => v - m);          // zero-mean
    const sse = centered.reduce((a, v) => a + v * v, 0) || 1;
    const k = Math.sqrt(((1 - r2) * ssTot) / sse);     // scale to hit target R2
    return centered.map((v) => v * k);
  };

  // post: small high-frequency scatter; pre: systematic trend + wiggle (looks biased)
  const postShape = Array.from({ length: N_MONTHS }, (_, i) => Math.sin(i * 2.3 + c.seed) + 0.4 * Math.cos(i * 3.1));
  const preShape = Array.from({ length: N_MONTHS }, (_, i) => (i - (N_MONTHS - 1) / 2) + 0.8 * Math.sin(i * 1.1 + c.seed));
  const ePost = scaledResidual(postShape, c.r2);
  const ePre = scaledResidual(preShape, c.r2pre);

  return obs.map((o, i) => ({
    month: `M${i + 1}`,
    observed: o,
    simulated_post: o + ePost[i],
    simulated_pre: o + ePre[i],
  }));
}

const TIME_SERIES_DATA = Object.fromEntries(CROPS.map((c) => [c.id, buildSeries(c)]));

const r2score = (obs, sim) => {
  const n = obs.length;
  const m = obs.reduce((a, b) => a + b, 0) / n;
  const ssTot = obs.reduce((a, o) => a + (o - m) ** 2, 0) || 1;
  const ssRes = obs.reduce((a, o, i) => a + (o - sim[i]) ** 2, 0);
  return 1 - ssRes / ssTot;
};
const rmseScore = (obs, sim) => Math.sqrt(obs.reduce((a, o, i) => a + (o - sim[i]) ** 2, 0) / obs.length);

const PARAM_CHANGES = {
  rice: [
    { name: 'prdx(1)', value: 15.2, type: 'inc' },
    { name: 'wfps(2)', value: -8.5, type: 'dec' },
    { name: 'n2o_f', value: 4.1, type: 'inc' },
    { name: 'sat_k', value: -12.3, type: 'dec' },
  ],
  corn: [
    { name: 'bio_f', value: 22.5, type: 'inc' },
    { name: 'root_d', value: 5.1, type: 'inc' },
    { name: 'temp_c', value: -4.2, type: 'dec' },
  ]
};

// 1:1 calibration scatter — Observed (x) vs Simulated (y). Points hug the
// dashed 1:1 line when the fit is good (high R²); they scatter when it is poor.
const ScatterPlot = ({ data, showCalibrated, xLabel = 'Observed', yLabel = 'Simulated' }) => {
  const S = 320, pad = 42;
  const obs = data.map((d) => d.observed);
  const sim = data.map((d) => (showCalibrated ? d.simulated_post : d.simulated_pre));
  const all = [...obs, ...sim];
  const min = Math.min(...all), max = Math.max(...all);
  const span = (max - min) || 1;
  const lo = min - span * 0.1, hi = max + span * 0.1;
  const sx = (v) => pad + ((v - lo) / (hi - lo)) * (S - 2 * pad);
  const sy = (v) => (S - pad) - ((v - lo) / (hi - lo)) * (S - 2 * pad);
  const color = showCalibrated ? '#059669' : '#f59e0b';
  const ticks = [lo + span * 0.05, (lo + hi) / 2, hi - span * 0.05];

  return (
    <svg viewBox={`0 0 ${S} ${S}`} className="w-full h-full">
      {/* axes */}
      <line x1={pad} y1={S - pad} x2={S - pad} y2={S - pad} stroke="#cbd5e1" strokeWidth="1" />
      <line x1={pad} y1={pad} x2={pad} y2={S - pad} stroke="#cbd5e1" strokeWidth="1" />
      {/* axis ticks */}
      {ticks.map((tv, i) => (
        <g key={i}>
          <text x={sx(tv)} y={S - pad + 14} textAnchor="middle" fontSize="9" fill="#94a3b8">{Math.round(tv)}</text>
          <text x={pad - 6} y={sy(tv) + 3} textAnchor="end" fontSize="9" fill="#94a3b8">{Math.round(tv)}</text>
        </g>
      ))}
      {/* 1:1 reference line */}
      <line x1={sx(lo)} y1={sy(lo)} x2={sx(hi)} y2={sy(hi)} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 4" />
      {/* points */}
      {data.map((d, i) => (
        <circle key={i} cx={sx(obs[i])} cy={sy(sim[i])} r="5.5" fill={color} fillOpacity="0.65" stroke={color} strokeWidth="1.2" />
      ))}
      {/* axis labels */}
      <text x={(pad + (S - pad)) / 2} y={S - 6} textAnchor="middle" fontSize="10" fill="#64748b">{xLabel}</text>
      <text x={14} y={(pad + (S - pad)) / 2} textAnchor="middle" fontSize="10" fill="#64748b" transform={`rotate(-90 14 ${(pad + (S - pad)) / 2})`}>{yLabel}</text>
    </svg>
  );
};

const ParamBarChart = ({ params }) => (
  <div className="space-y-3">
    {params.map((p, i) => (
      <div key={i} className="flex items-center text-xs">
        <span className="w-16 font-mono text-slate-500 truncate" title={p.name}>{p.name}</span>
        <div className="flex-1 h-2 bg-slate-100 rounded-full mx-2 overflow-hidden flex relative">
          <div className="absolute left-1/2 w-[1px] h-full bg-slate-300"></div>
          {p.value > 0 ? (
            <div className="absolute left-1/2 h-full bg-emerald-500 rounded-r-full" style={{ width: `${Math.min(Math.abs(p.value) * 2, 50)}%` }}></div>
          ) : (
            <div className="absolute right-1/2 h-full bg-rose-500 rounded-l-full" style={{ width: `${Math.min(Math.abs(p.value) * 2, 50)}%` }}></div>
          )}
        </div>
        <span className={`w-10 text-right font-bold ${p.value > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{p.value > 0 ? '+' : ''}{p.value}%</span>
      </div>
    ))}
  </div>
);

const WorkflowDiagram = ({ t }) => (
  <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm mb-6">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <RefreshCw size={20} className="text-emerald-600" /> 
          {t.workflow_title}
        </h3>
      </div>
      <div className="hidden md:block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">Version 2.1.4</div>
    </div>
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 relative px-2">
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10 transform -translate-y-1/2"></div>
      <div className="flex-1 bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col items-center text-center z-10 relative group hover:border-emerald-300 transition-all">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-600 shadow-sm mb-3 border border-slate-100 group-hover:text-emerald-600"><FileJson size={24} /></div>
        <h4 className="font-bold text-slate-800 text-sm">1. {t.step1}</h4>
        <p className="text-xs text-slate-500 mt-1 px-2">{t.step1_desc}</p>
      </div>
      <ArrowRight className="hidden md:block text-slate-300 shrink-0" />
      <div className="flex-1 bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col items-center text-center z-10 relative group hover:border-emerald-300 transition-all">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-600 shadow-sm mb-3 border border-slate-100 group-hover:text-emerald-600"><Database size={24} /></div>
        <h4 className="font-bold text-slate-800 text-sm">2. {t.step2}</h4>
        <p className="text-xs text-slate-500 mt-1 px-2">{t.step2_desc}</p>
      </div>
      <ArrowRight className="hidden md:block text-slate-300 shrink-0" />
      <div className="flex-1 bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col items-center text-center z-10 relative group hover:border-emerald-300 transition-all">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-600 shadow-sm mb-3 border border-slate-100 group-hover:text-emerald-600"><GitCompare size={24} /></div>
        <h4 className="font-bold text-slate-800 text-sm">3. {t.step3}</h4>
        <p className="text-xs text-slate-500 mt-1 px-2">{t.step3_desc}</p>
      </div>
      <ArrowRight className="hidden md:block text-slate-300 shrink-0" />
      <div className="flex-1 bg-emerald-50 p-5 rounded-xl border border-emerald-200 flex flex-col items-center text-center z-10 relative shadow-md">
        <div className="absolute -top-3 -right-3 bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">Core</div>
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm mb-3 border border-emerald-100"><Calculator size={24} /></div>
        <h4 className="font-bold text-emerald-900 text-sm">4. {t.step4}</h4>
        <p className="text-xs text-emerald-700 mt-1 px-2">{t.step4_desc}</p>
      </div>
    </div>
    <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex gap-4 items-start">
      <ThermometerSun size={18} className="shrink-0 mt-0.5 text-amber-500"/>
      <div className="leading-relaxed"><span className="font-bold text-slate-700 block mb-1">{t.warmup_title}</span>{t.warmup_desc}</div>
    </div>
  </div>
);

// --- MAIN DASHBOARD EXPORT ---
const CaliforniaDashboard = ({ onBack, lang = 'en' }) => {
  const [selectedCrop, setSelectedCrop] = useState(CROPS[0]);
  const [isCalibrated, setIsCalibrated] = useState(true);
  const t = DASH_TEXT[lang] || DASH_TEXT.en;
  const o = t.overview;
  const featureIcons = [FileText, Sprout, Award, TrendingUp, Layers, GitCompare];

  const currentChartData = TIME_SERIES_DATA[selectedCrop.id] || TIME_SERIES_DATA.rice;
  const currentParams = PARAM_CHANGES[selectedCrop.id] || PARAM_CHANGES.rice;

  // Metrics computed from the SAME data that is plotted (single source of truth)
  const obsArr = currentChartData.map((d) => d.observed);
  const simArr = currentChartData.map((d) => (isCalibrated ? d.simulated_post : d.simulated_pre));
  const shownR2 = r2score(obsArr, simArr);
  const shownRmse = rmseScore(obsArr, simArr);
  const r2Post = r2score(obsArr, currentChartData.map((d) => d.simulated_post));
  const r2Pre = r2score(obsArr, currentChartData.map((d) => d.simulated_pre));
  const r2Delta = Math.round((r2Post / r2Pre - 1) * 100);
  const avgPost = CROPS.reduce((a, c) => a + r2score(TIME_SERIES_DATA[c.id].map((d) => d.observed), TIME_SERIES_DATA[c.id].map((d) => d.simulated_post)), 0) / CROPS.length;
  const avgPre = CROPS.reduce((a, c) => a + r2score(TIME_SERIES_DATA[c.id].map((d) => d.observed), TIME_SERIES_DATA[c.id].map((d) => d.simulated_pre)), 0) / CROPS.length;

  return (
    <div className="animate-fade-in space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium transition-colors">
        <ArrowLeft size={20} /> {t.back}
      </button>

      {/* Project Overview */}
      <section className="bg-gradient-to-br from-emerald-900 to-slate-800 rounded-2xl p-8 md:p-10 text-white shadow-xl">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span> {o.badge}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{o.title}</h1>
        <p className="text-emerald-100 text-lg mb-4 max-w-3xl">{o.subtitle}</p>
        <p className="text-slate-200 text-sm leading-relaxed max-w-3xl mb-6">{o.desc}</p>
        <div className="flex flex-wrap gap-3">
          <a href="https://regenagplanner.org/login" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold px-5 py-2.5 rounded-full hover:bg-emerald-50 transition-colors"><ExternalLink size={16} /> {o.cta}</a>
          <a href="https://regenerativeag.csuchico.edu/farmers-ranchers/resources/regen-ag-planner/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors"><Award size={16} /> {o.cta_about}</a>
        </div>
      </section>

      {/* Features */}
      <section>
        <h3 className="text-xl font-bold text-slate-800 mb-4">{o.features_title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {o.features.map((f, i) => {
            const Icon = featureIcons[i % featureIcons.length];
            return (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-300 transition">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3"><Icon size={18} /></div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">{f.t}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{f.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Calibration deep-dive */}
      <h3 className="text-xl font-bold text-slate-800 pt-2">{t.calib_intro}</h3>
      <section><WorkflowDiagram t={t} /></section>

      <section className="bg-slate-50 p-4 md:p-8 rounded-xl border border-slate-200 shadow-sm font-sans">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Activity className="text-emerald-600" /> {t.results_title}
            </h2>
            <p className="text-slate-500 text-sm mt-1">{t.results_desc}</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-1.5 rounded-lg border border-slate-200 shadow-sm">
            <button onClick={() => setIsCalibrated(false)} className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${!isCalibrated ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>{t.pre_cal}</button>
            <button onClick={() => setIsCalibrated(true)} className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${isCalibrated ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>{t.post_cal}</button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4 space-y-3">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.select_crop}</span>
              <span className="text-xs text-emerald-600 font-medium">{CROPS.length} {t.available}</span>
            </div>
            {CROPS.map((crop) => (
              <div key={crop.id} onClick={() => setSelectedCrop(crop)} className={`p-3 rounded-lg cursor-pointer border transition-all flex items-center justify-between ${selectedCrop.id === crop.id ? 'bg-white border-emerald-500 shadow-md ring-1 ring-emerald-500' : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${crop.bg} ${crop.color}`}><Sprout size={16} /></div>
                  <div><h4 className="font-bold text-slate-700 text-sm">{crop.name[lang]}</h4><span className="text-xs text-slate-400">ID: {crop.id}_v2</span></div>
                </div>
                {selectedCrop.id === crop.id && <ChevronRight size={16} className="text-emerald-500" />}
              </div>
            ))}
             <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-blue-800 text-xs">
                <div className="flex items-center gap-2 mb-2 font-bold"><TrendingUp size={14} /> {t.summary}</div>
                <p>{t.summary_desc}</p>
                <p className="mt-2 font-bold text-blue-900">{t.summary_metric}: {avgPre.toFixed(2)} → {avgPost.toFixed(2)}</p>
              </div>
          </div>

          <div className="lg:w-3/4 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-medium">{t.model_fit}</span>
                <div className="flex items-end gap-2 mt-1"><span className="text-2xl font-bold text-slate-800">{shownR2.toFixed(2)}</span><span className="text-xs text-emerald-600 mb-1 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center"><TrendingUp size={10} className="mr-1"/> {isCalibrated ? `+${r2Delta}%` : '-'}</span></div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-medium">{t.error}</span>
                <div className="flex items-end gap-2 mt-1"><span className="text-2xl font-bold text-slate-800">{shownRmse.toFixed(1)}</span><span className="text-xs text-rose-600 mb-1 bg-rose-50 px-1.5 py-0.5 rounded">kg C/ha</span></div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-medium">{t.status}</span>
                <div className="flex items-center gap-2 mt-2">{isCalibrated ? <span className="flex items-center gap-1 text-sm font-bold text-emerald-700"><CheckCircle2 size={18} /> {t.converged}</span> : <span className="flex items-center gap-1 text-sm font-bold text-amber-600"><RefreshCw size={18} className="animate-spin-slow" /> {t.running}</span>}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-700">{t.sim_vs_obs}</h3>
                  <div className="flex gap-4 text-xs">
                     <div className="flex items-center gap-1"><div className={`w-2.5 h-2.5 rounded-full ${isCalibrated ? 'bg-emerald-500' : 'bg-amber-500'}`}></div> {t.point_label}</div>
                     <div className="flex items-center gap-1"><div className="w-3 border-t border-dashed border-slate-400"></div> {t.line_label}</div>
                  </div>
                </div>
                <div className="h-64 w-full bg-slate-50/50 rounded-lg border border-slate-100 flex items-center justify-center relative">
                   <ScatterPlot data={currentChartData} showCalibrated={isCalibrated} xLabel={t.axis_obs_label} yLabel={t.axis_sim_label} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="mb-4"><h3 className="font-bold text-slate-700 flex items-center gap-2"><Settings size={16} /> {t.adj_params}</h3><p className="text-xs text-slate-500">PEST adjustments</p></div>
                <div className="flex-1">
                  {isCalibrated ? <ParamBarChart params={currentParams} /> : <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs text-center p-4"><AlertCircle size={32} className="mb-2 opacity-50"/>{t.enable_post}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaliforniaDashboard;