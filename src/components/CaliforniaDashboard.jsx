import React, { useState } from 'react';
import { 
  Activity, Settings, CheckCircle2, 
  AlertCircle, TrendingUp, RefreshCw, 
  ArrowLeft, ChevronRight, Sprout,
  FileJson, Database, GitCompare, ArrowRight, 
  ThermometerSun, Calculator
} from 'lucide-react';

// --- DATA FOR DASHBOARD ---

const CROPS = [
  { id: 'rice', name: 'Rice (aglivc)', r2: 0.82, rmse: 145.2, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { id: 'corn', name: 'Corn (grain)', r2: 0.91, rmse: 89.5, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  { id: 'almond', name: 'Almonds', r2: 0.78, rmse: 210.1, color: 'text-orange-600', bg: 'bg-orange-100' },
  { id: 'grapes', name: 'Grapes', r2: 0.85, rmse: 112.3, color: 'text-purple-600', bg: 'bg-purple-100' },
  { id: 'cotton', name: 'Cotton', r2: 0.88, rmse: 95.4, color: 'text-slate-600', bg: 'bg-slate-100' },
];

const TIME_SERIES_DATA = {
  rice: Array.from({ length: 12 }, (_, i) => ({
    month: `M${i + 1}`,
    observed: 100 + Math.random() * 50 + Math.sin(i) * 20,
    simulated_pre: 80 + Math.random() * 40 + Math.sin(i) * 15,
    simulated_post: 100 + Math.random() * 20 + Math.sin(i) * 20,
  })),
  corn: Array.from({ length: 12 }, (_, i) => ({
    month: `M${i + 1}`,
    observed: 200 + Math.random() * 80 + Math.cos(i) * 40,
    simulated_pre: 150 + Math.random() * 60 + Math.cos(i) * 30,
    simulated_post: 195 + Math.random() * 30 + Math.cos(i) * 40,
  })),
};

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

// --- SUB-COMPONENTS ---

const LineChart = ({ data, showCalibrated }) => {
  const height = 200;
  const width = 600;
  const padding = 20;
  const maxVal = Math.max(...data.map(d => Math.max(d.observed, d.simulated_pre, d.simulated_post))) * 1.1;
  const getX = (i) => (i / (data.length - 1)) * (width - 2 * padding) + padding;
  const getY = (v) => height - padding - (v / maxVal) * (height - 2 * padding);
  const pointsSimPre = data.map((d, i) => `${getX(i)},${getY(d.simulated_pre)}`).join(' ');
  const pointsSimPost = data.map((d, i) => `${getX(i)},${getY(d.simulated_post)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
      <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e2e8f0" strokeWidth="1" />
      <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#e2e8f0" strokeWidth="1" />
      {!showCalibrated && <polyline points={pointsSimPre} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4"/>}
      {showCalibrated && <polyline points={pointsSimPost} fill="none" stroke="#059669" strokeWidth="2" />}
      {data.map((d, i) => (<circle key={i} cx={getX(i)} cy={getY(d.observed)} r="3" className="fill-slate-800"/>))}
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

// --- INDEPENDENT WORKFLOW COMPONENT ---
const WorkflowDiagram = () => (
  <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between mb-8">
      <div>
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <RefreshCw size={20} className="text-emerald-600" /> 
          Calibration Pipeline
        </h3>
        <p className="text-slate-500 text-sm mt-1">Automated parameter optimization workflow using PEST & DayCent</p>
      </div>
      <div className="hidden md:block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
        Version 2.1.4
      </div>
    </div>
    
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 relative px-2">
      {/* Connecting Line (Desktop) */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10 transform -translate-y-1/2"></div>

      {/* Step 1: Input */}
      <div className="flex-1 bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col items-center text-center z-10 relative group hover:border-emerald-300 hover:shadow-md transition-all">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-600 shadow-sm mb-3 border border-slate-100 group-hover:text-emerald-600 group-hover:scale-110 transition-transform">
          <FileJson size={24} />
        </div>
        <h4 className="font-bold text-slate-800 text-sm">1. Input JSONs</h4>
        <p className="text-xs text-slate-500 mt-1 px-2">Site, Soil, Weather & Management Data Setup</p>
      </div>

      <ArrowRight className="hidden md:block text-slate-300 shrink-0" />

      {/* Step 2: Model Run */}
      <div className="flex-1 bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col items-center text-center z-10 relative group hover:border-emerald-300 hover:shadow-md transition-all">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-600 shadow-sm mb-3 border border-slate-100 group-hover:text-emerald-600 group-hover:scale-110 transition-transform">
          <Database size={24} />
        </div>
        <h4 className="font-bold text-slate-800 text-sm">2. DayCent Run</h4>
        <p className="text-xs text-slate-500 mt-1 px-2">Warm-up Phase + Simulation Phase</p>
      </div>

      <ArrowRight className="hidden md:block text-slate-300 shrink-0" />

      {/* Step 3: Compare */}
      <div className="flex-1 bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col items-center text-center z-10 relative group hover:border-emerald-300 hover:shadow-md transition-all">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-600 shadow-sm mb-3 border border-slate-100 group-hover:text-emerald-600 group-hover:scale-110 transition-transform">
          <GitCompare size={24} />
        </div>
        <h4 className="font-bold text-slate-800 text-sm">3. Comparison</h4>
        <p className="text-xs text-slate-500 mt-1 px-2">Simulated vs. Observed (calc_GHG function)</p>
      </div>

      <ArrowRight className="hidden md:block text-slate-300 shrink-0" />

      {/* Step 4: Optimize */}
      <div className="flex-1 bg-emerald-50 p-5 rounded-xl border border-emerald-200 flex flex-col items-center text-center z-10 relative shadow-md transform scale-105 md:scale-100 md:hover:scale-105 transition-transform">
        <div className="absolute -top-3 -right-3 bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">Core</div>
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm mb-3 border border-emerald-100">
          <Calculator size={24} />
        </div>
        <h4 className="font-bold text-emerald-900 text-sm">4. PEST Optimization</h4>
        <p className="text-xs text-emerald-700 mt-1 px-2">Sensitivity Analysis & Parameter Update Loop</p>
      </div>
    </div>

    <div className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex gap-4 items-start">
      <ThermometerSun size={18} className="shrink-0 mt-0.5 text-amber-500"/>
      <div className="leading-relaxed">
        <span className="font-bold text-slate-700 block mb-1">Warm-up Phase (Spin-up):</span> 
        The model executes a stabilization period (e.g., 2004-2010) to equilibrate soil carbon pools before the calibration period begins. This ensures the baseline is scientifically accurate before the PEST algorithm starts adjusting sensitive parameters like <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 mx-1 text-slate-800 font-mono">frtc</code> or <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 mx-1 text-slate-800 font-mono">ppdf</code>.
      </div>
    </div>
  </div>
);

// --- MAIN DASHBOARD PAGE ---

const CaliforniaDashboard = ({ onBack }) => {
  const [selectedCrop, setSelectedCrop] = useState(CROPS[0]);
  const [isCalibrated, setIsCalibrated] = useState(true);
  const currentChartData = TIME_SERIES_DATA[selectedCrop.id] || TIME_SERIES_DATA.rice;
  const currentParams = PARAM_CHANGES[selectedCrop.id] || PARAM_CHANGES.rice;

  return (
    <div className="animate-fade-in space-y-8">
      {/* Header Navigation */}
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium transition-colors">
        <ArrowLeft size={20} /> Back to Projects
      </button>

      {/* SECTION 1: WORKFLOW DIAGRAM (Methodology) */}
      <section>
        <WorkflowDiagram />
      </section>

      {/* SECTION 2: INTERACTIVE RESULTS (Data) */}
      <section className="bg-slate-50 p-4 md:p-8 rounded-xl border border-slate-200 shadow-sm font-sans">
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Activity className="text-emerald-600" />
              Calibration Results
            </h2>
            <p className="text-slate-500 text-sm mt-1">Interactive analysis of DayCent model performance vs. Field observations</p>
          </div>
          
          {/* Interactive Toggle */}
          <div className="flex items-center gap-3 bg-white p-1.5 rounded-lg border border-slate-200 shadow-sm">
            <button onClick={() => setIsCalibrated(false)} className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${!isCalibrated ? 'bg-slate-800 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
              Pre-Calibration
            </button>
            <button onClick={() => setIsCalibrated(true)} className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${isCalibrated ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
              Post-Calibration
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* SIDEBAR: CROP LIST */}
          <div className="lg:w-1/4 space-y-3">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Crop</span>
              <span className="text-xs text-emerald-600 font-medium">{CROPS.length} Available</span>
            </div>
            {CROPS.map((crop) => (
              <div key={crop.id} onClick={() => setSelectedCrop(crop)} className={`p-3 rounded-lg cursor-pointer border transition-all flex items-center justify-between ${selectedCrop.id === crop.id ? 'bg-white border-emerald-500 shadow-md ring-1 ring-emerald-500' : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${crop.bg} ${crop.color}`}><Sprout size={16} /></div>
                  <div><h4 className="font-bold text-slate-700 text-sm">{crop.name}</h4><span className="text-xs text-slate-400">ID: {crop.id}_v2</span></div>
                </div>
                {selectedCrop.id === crop.id && <ChevronRight size={16} className="text-emerald-500" />}
              </div>
            ))}
             <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-blue-800 text-xs">
                <div className="flex items-center gap-2 mb-2 font-bold"><TrendingUp size={14} /> Summary</div>
                <p>Average R² across all 15 crops improved from <strong>0.45</strong> to <strong>0.82</strong> after PEST calibration.</p>
              </div>
          </div>

          {/* MAIN CHARTS AREA */}
          <div className="lg:w-3/4 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-medium">Model Fit (R²)</span>
                <div className="flex items-end gap-2 mt-1">
                  <span className="text-2xl font-bold text-slate-800">{isCalibrated ? selectedCrop.r2 : (selectedCrop.r2 * 0.6).toFixed(2)}</span>
                  <span className="text-xs text-emerald-600 mb-1 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center"><TrendingUp size={10} className="mr-1"/> {isCalibrated ? '+35%' : '-'}</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-medium">Error (RMSE)</span>
                <div className="flex items-end gap-2 mt-1">
                  <span className="text-2xl font-bold text-slate-800">{isCalibrated ? selectedCrop.rmse : (selectedCrop.rmse * 1.5).toFixed(1)}</span>
                  <span className="text-xs text-rose-600 mb-1 bg-rose-50 px-1.5 py-0.5 rounded">kg C/ha</span>
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-xs text-slate-500 font-medium">Status</span>
                <div className="flex items-center gap-2 mt-2">
                  {isCalibrated ? <span className="flex items-center gap-1 text-sm font-bold text-emerald-700"><CheckCircle2 size={18} /> Converged</span> : <span className="flex items-center gap-1 text-sm font-bold text-amber-600"><RefreshCw size={18} className="animate-spin-slow" /> Running...</span>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-700">Simulated vs Observed (N2O)</h3>
                  <div className="flex gap-4 text-xs">
                     <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-800"></div> Observed</div>
                     <div className="flex items-center gap-1"><div className={`w-3 h-1 ${isCalibrated ? 'bg-emerald-500' : 'bg-slate-400 border-t border-dashed border-slate-600'}`}></div> Simulated</div>
                  </div>
                </div>
                <div className="h-64 w-full bg-slate-50/50 rounded-lg border border-slate-100 flex items-center justify-center relative">
                   <LineChart data={currentChartData} showCalibrated={isCalibrated} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="mb-4"><h3 className="font-bold text-slate-700 flex items-center gap-2"><Settings size={16} /> Adjusted Params</h3><p className="text-xs text-slate-500">PEST algorithm adjustments</p></div>
                <div className="flex-1">
                  {isCalibrated ? <ParamBarChart params={currentParams} /> : <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs text-center p-4"><AlertCircle size={32} className="mb-2 opacity-50"/>Enable "Post-Calibration" to see changes.</div>}
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