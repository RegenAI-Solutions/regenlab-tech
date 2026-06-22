import {
  ArrowLeft, Globe, Layers, Database, TrendingDown, CheckCircle2,
  Activity, ChevronRight
} from 'lucide-react';

const T = {
  en: {
    back: "Back to Projects",
    badge: "Remote Sensing · Proof-of-Value",
    title: "CarbonSpace Sampling Optimization",
    subtitle: "How many soil cores would a monitoring programme need to match satellite-derived carbon precision — and at what cost? A stratified-sampling simulation across two UK fields, plus model–observation fusion.",
    stat: [["2", "UK fields"], ["up to 96%", "cost reduction"], ["10%", "credit-grade precision"], ["~59%", "model error cut"]],
    method_title: "How the analysis works",
    steps: [
      ["Target variable", "5-year cumulative Net Ecosystem Exchange (NEE) — a strong proxy for soil-carbon change."],
      ["Stratify the field", "k-means strata from satellite covariates, or a historical carbon-trend proxy."],
      ["Optimal sample size", "Neyman allocation with a finite-population correction to hit a precision target."],
      ["Cost model", "Soil: cores × $120 × 2 campaigns. Satellite: area × $5/ha/yr × 5 years."],
    ],
    cost_title: "Cost to reach 10% precision — soil sampling vs. satellite",
    field_a: "Field A — Cropland (~14 ha)",
    field_b: "Field B — Grassland (~12 ha)",
    soil_label: "Soil sampling",
    sat_label: "Satellite monitoring",
    cores: "cores",
    saving: "cost reduction",
    findings_title: "What it showed",
    findings: [
      { icon: "TrendingDown", t: "Cost decoupled from precision", d: "Soil-sampling cost scales with cores; satellite monitoring is a flat per-hectare fee — up to 96% cheaper at equal precision." },
      { icon: "Layers", t: "Smarter strata, fewer cores", d: "Stratifying with a historical carbon-trend proxy roughly halved the cores needed on the cropland field (38 → 18)." },
      { icon: "Activity", t: "Model + observation fusion", d: "Calibrating the DayCent model to satellite NEE cut error (RMSE) by ~59% (1.32 → 0.54 tCO₂/ha/yr) — neither method alone is enough." },
      { icon: "Globe", t: "Reversal-risk monitoring", d: "Continuous NEE flags drought-driven carbon losses (e.g. 2022) in near-real time, rather than years later at the next sampling campaign." },
    ],
    caveat: "NEE is used as a direct proxy for soil-organic-carbon change. Field identifiers and locations are de-identified; figures are from a proof-of-value analysis.",
  },
  vi: {
    back: "Quay lại Dự án",
    badge: "Viễn thám · Bằng chứng Giá trị",
    title: "Tối ưu Lấy mẫu CarbonSpace",
    subtitle: "Một chương trình giám sát cần bao nhiêu mẫu đất để đạt độ chính xác carbon từ vệ tinh — và tốn bao nhiêu? Mô phỏng lấy mẫu phân tầng trên hai cánh đồng tại Anh, kèm hợp nhất mô hình–quan trắc.",
    stat: [["2", "cánh đồng (Anh)"], ["đến 96%", "giảm chi phí"], ["10%", "độ chính xác cấp tín chỉ"], ["~59%", "giảm sai số mô hình"]],
    method_title: "Cách phân tích hoạt động",
    steps: [
      ["Biến mục tiêu", "NEE tích lũy 5 năm — đại diện mạnh cho thay đổi carbon đất."],
      ["Phân tầng cánh đồng", "Phân tầng k-means từ biến vệ tinh, hoặc xu hướng carbon lịch sử."],
      ["Cỡ mẫu tối ưu", "Phân bổ Neyman kèm hiệu chỉnh tổng thể hữu hạn để đạt mục tiêu độ chính xác."],
      ["Mô hình chi phí", "Đất: mẫu × $120 × 2 đợt. Vệ tinh: diện tích × $5/ha/năm × 5 năm."],
    ],
    cost_title: "Chi phí để đạt độ chính xác 10% — lấy mẫu đất vs. vệ tinh",
    field_a: "Cánh đồng A — Cây trồng (~14 ha)",
    field_b: "Cánh đồng B — Đồng cỏ (~12 ha)",
    soil_label: "Lấy mẫu đất",
    sat_label: "Giám sát vệ tinh",
    cores: "mẫu",
    saving: "giảm chi phí",
    findings_title: "Kết quả",
    findings: [
      { icon: "TrendingDown", t: "Chi phí tách khỏi độ chính xác", d: "Chi phí lấy mẫu đất tăng theo số mẫu; giám sát vệ tinh là phí cố định trên hecta — rẻ hơn tới 96% ở cùng độ chính xác." },
      { icon: "Layers", t: "Phân tầng thông minh, ít mẫu hơn", d: "Phân tầng bằng xu hướng carbon lịch sử giảm gần một nửa số mẫu trên cánh đồng cây trồng (38 → 18)." },
      { icon: "Activity", t: "Hợp nhất mô hình + quan trắc", d: "Hiệu chỉnh DayCent theo NEE vệ tinh giảm sai số (RMSE) ~59% (1.32 → 0.54 tCO₂/ha/năm) — không phương pháp nào đơn lẻ là đủ." },
      { icon: "Globe", t: "Giám sát rủi ro đảo ngược", d: "NEE liên tục phát hiện mất carbon do hạn hán (vd 2022) gần thời gian thực, thay vì nhiều năm sau ở đợt lấy mẫu kế tiếp." },
    ],
    caveat: "NEE được dùng làm đại diện trực tiếp cho thay đổi carbon hữu cơ đất. Mã định danh và vị trí cánh đồng đã ẩn danh; số liệu từ phân tích bằng chứng giá trị.",
  },
};

const ICONS = { TrendingDown, Layers, Activity, Globe, Database };

const CostRow = ({ label, value, cores, width, color, coresLabel }) => (
  <div className="mb-3">
    <div className="flex justify-between text-xs mb-1">
      <span className="text-slate-600">{label}{cores ? ` · ${cores} ${coresLabel}` : ""}</span>
      <span className="font-bold text-slate-800">${value.toLocaleString()}</span>
    </div>
    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${width}%` }}></div>
    </div>
  </div>
);

const CarbonSpaceDashboard = ({ onBack, lang = 'en' }) => {
  const t = T[lang] || T.en;
  const MAXC = 9120;
  const fields = [
    { name: t.field_a, soil: 9120, sat: 350, cores: 38, save: 96 },
    { name: t.field_b, soil: 2400, sat: 300, cores: 10, save: 88 },
  ];

  return (
    <div className="animate-fade-in space-y-10">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium transition-colors">
        <ArrowLeft size={20} /> {t.back}
      </button>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-cyan-900 rounded-2xl p-8 md:p-10 text-white shadow-xl">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-4">
          <Globe size={14} /> {t.badge}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{t.title}</h1>
        <p className="text-slate-200 text-lg leading-relaxed max-w-3xl mb-6">{t.subtitle}</p>
        <div className="flex flex-wrap gap-3">
          {t.stat.map(([n, l], i) => (
            <div key={i} className="bg-white/10 border border-white/15 rounded-xl px-4 py-2">
              <div className="text-xl font-bold leading-none">{n}</div>
              <div className="text-[11px] text-cyan-200 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Method */}
      <section>
        <h3 className="text-2xl font-bold text-slate-800 mb-6">{t.method_title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {t.steps.map((s, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center mb-3">{i + 1}</span>
              <h4 className="font-bold text-slate-800 text-sm mb-1 leading-snug">{s[0]}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{s[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cost comparison */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-6">{t.cost_title}</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {fields.map((f, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-slate-700 text-sm">{f.name}</h4>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1">−{f.save}% {t.saving}</span>
              </div>
              <CostRow label={t.soil_label} value={f.soil} cores={f.cores} coresLabel={t.cores} width={(f.soil / MAXC) * 100} color="bg-slate-400" />
              <CostRow label={t.sat_label} value={f.sat} width={Math.max((f.sat / MAXC) * 100, 3)} color="bg-emerald-500" />
            </div>
          ))}
        </div>
      </section>

      {/* Findings */}
      <section>
        <h3 className="text-2xl font-bold text-slate-800 mb-6">{t.findings_title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.findings.map((f, i) => {
            const Icon = ICONS[f.icon] || CheckCircle2;
            return (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><Icon size={20} /></div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{f.t}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{f.d}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <p className="text-xs text-slate-400 italic border-t border-slate-100 pt-4">{t.caveat}</p>
    </div>
  );
};

export default CarbonSpaceDashboard;
