import {
  ArrowLeft, Layers, TrendingUp, TrendingDown, Database, CheckCircle2,
  Sprout, Droplets, Activity, ChevronRight
} from 'lucide-react';

const T = {
  en: {
    back: "Back to Projects",
    badge: "Carbon Quantification · Delivered",
    title: "Cultivo Rangelands",
    subtitle: "Biogeochemical modeling of rotational-grazing impacts on soil organic carbon across four rangeland assets — with asset-specific carrying-capacity optimization. Built on the DayCent process model.",
    stat: [["4", "rangeland assets"], ["20-yr", "projection horizon"], ["36", "sensitivity scenarios"], ["3.7", "peak tC/ha SOC"]],
    method_title: "The quantification pipeline",
    method_sub: "A deterministic, configuration-driven workflow for full reproducibility.",
    steps: [
      ["Harmonize field data", "Management records and field-sampled SOC into standardized inputs."],
      ["Acquire environmental data", "Gridded soil, 30+ yr daily weather, and historical fire regime."],
      ["Build daily schedules", "Programmatic DayCent management events at daily resolution."],
      ["Sequential simulation", "Spin-up → 45-yr historical baseline → 20-yr divergent projections."],
      ["Calibrate & optimize", "Nelder-Mead calibration to observed SOC; carrying-capacity sweep."],
    ],
    chart_title: "Peak 20-year SOC benefit by asset (tC/ha)",
    chart_note: "Asset labels de-identified. Rotational vs. continuous-grazing delta at optimal carrying capacity.",
    findings_title: "What the modeling showed",
    findings: [
      { icon: "Activity", t: "Management trumps environment", d: "Biomass-removal intensity and grazing response drove ~45% of SOC variance — overgrazing negates inherent environmental advantages." },
      { icon: "Layers", t: "Clay stabilizes carbon", d: "A positive correlation (r ≈ 0.34) between topsoil clay and peak SOC benefit: heavier soils protect returned carbon." },
      { icon: "Droplets", t: "Aridity-recovery effect", d: "The largest absolute SOC gains occurred on the driest, most-depleted assets — a recovery spike under rotational management." },
      { icon: "TrendingDown", t: "The overgrazing cliff", d: "Carbon-yield curves define the herd size beyond which biomass removal outpaces recovery and SOC collapses." },
    ],
    caveat: "Scope: this assessment covered soil organic carbon and ecosystem respiration. Non-CO₂ greenhouse gases (enteric CH₄, soil N₂O) were outside scope and are flagged as the required next step. Each asset was modeled as a single lumped unit. De-identified summary of a delivered client analysis; figures are illustrative.",
  },
  vi: {
    back: "Quay lại Dự án",
    badge: "Định lượng Carbon · Đã bàn giao",
    title: "Cultivo Rangelands",
    subtitle: "Mô hình hóa sinh địa hóa tác động của chăn thả luân phiên lên carbon hữu cơ đất trên bốn khu chăn thả — kèm tối ưu sức tải vật nuôi theo từng khu. Xây dựng trên mô hình DayCent.",
    stat: [["4", "khu chăn thả"], ["20 năm", "khung dự báo"], ["36", "kịch bản độ nhạy"], ["3.7", "tC/ha SOC đỉnh"]],
    method_title: "Quy trình định lượng",
    method_sub: "Quy trình tất định, điều khiển bằng cấu hình, đảm bảo tái lập hoàn toàn.",
    steps: [
      ["Chuẩn hóa dữ liệu đồng ruộng", "Hồ sơ canh tác và SOC lấy mẫu thành dữ liệu đầu vào chuẩn."],
      ["Thu thập dữ liệu môi trường", "Đất dạng lưới, thời tiết ngày 30+ năm, và chế độ cháy lịch sử."],
      ["Tạo lịch theo ngày", "Sự kiện quản lý DayCent ở độ phân giải ngày."],
      ["Mô phỏng tuần tự", "Khởi động → nền lịch sử 45 năm → dự báo phân kỳ 20 năm."],
      ["Hiệu chỉnh & tối ưu", "Hiệu chỉnh Nelder-Mead theo SOC quan trắc; quét sức tải."],
    ],
    chart_title: "Lợi ích SOC đỉnh 20 năm theo khu (tC/ha)",
    chart_note: "Nhãn khu đã ẩn danh. Chênh lệch luân phiên vs. chăn thả liên tục tại sức tải tối ưu.",
    findings_title: "Kết quả mô hình hóa",
    findings: [
      { icon: "Activity", t: "Quản lý quan trọng hơn môi trường", d: "Cường độ lấy sinh khối và phản ứng chăn thả chiếm ~45% biến thiên SOC — chăn thả quá mức triệt tiêu lợi thế môi trường." },
      { icon: "Layers", t: "Sét ổn định carbon", d: "Tương quan dương (r ≈ 0.34) giữa sét tầng mặt và lợi ích SOC đỉnh: đất nặng bảo vệ carbon hoàn trả." },
      { icon: "Droplets", t: "Hiệu ứng phục hồi vùng khô", d: "Lợi ích SOC tuyệt đối lớn nhất ở các khu khô và suy thoái nhất — đợt phục hồi dưới chăn thả luân phiên." },
      { icon: "TrendingDown", t: "Vách quá tải", d: "Đường năng suất carbon xác định quy mô đàn mà vượt qua đó SOC sụp đổ." },
    ],
    caveat: "Phạm vi: carbon hữu cơ đất và hô hấp hệ sinh thái. Khí nhà kính ngoài CO₂ (CH₄ tiêu hóa, N₂O đất) ngoài phạm vi và được nêu là bước tiếp theo cần thiết. Mỗi khu mô hình hóa như một đơn vị gộp. Bản tóm tắt đã ẩn danh của một phân tích khách hàng đã bàn giao; số liệu mang tính minh họa.",
  },
};

const ICONS = { Activity, Layers, Droplets, TrendingDown, TrendingUp, Sprout, Database };

const Bars = ({ data, max, color = "bg-emerald-500" }) => (
  <div className="flex items-end gap-4 h-48 px-2">
    {data.map((d, i) => (
      <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
        <span className="text-sm font-bold text-slate-800 mb-1">{d.v.toFixed(1)}</span>
        <div className={`w-full rounded-t-md ${color}`} style={{ height: `${(d.v / max) * 100}%` }}></div>
        <span className="text-[11px] text-slate-500 mt-2 text-center">{d.label}</span>
      </div>
    ))}
  </div>
);

const CultivoDashboard = ({ onBack, lang = 'en' }) => {
  const t = T[lang] || T.en;
  const chart = [
    { label: "Asset A", v: 3.0 }, { label: "Asset B", v: 1.4 },
    { label: "Asset C", v: 1.4 }, { label: "Asset D", v: 3.6 },
  ];

  return (
    <div className="animate-fade-in space-y-10">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium transition-colors">
        <ArrowLeft size={20} /> {t.back}
      </button>

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 to-slate-800 rounded-2xl p-8 md:p-10 text-white shadow-xl">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-4">
          <Sprout size={14} /> {t.badge}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{t.title}</h1>
        <p className="text-slate-200 text-lg leading-relaxed max-w-3xl mb-6">{t.subtitle}</p>
        <div className="flex flex-wrap gap-3">
          {t.stat.map(([n, l], i) => (
            <div key={i} className="bg-white/10 border border-white/15 rounded-xl px-4 py-2">
              <div className="text-xl font-bold leading-none">{n}</div>
              <div className="text-[11px] text-emerald-200 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pipeline */}
      <section>
        <h3 className="text-2xl font-bold text-slate-800 mb-1">{t.method_title}</h3>
        <p className="text-slate-500 text-sm mb-6">{t.method_sub}</p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {t.steps.map((s, i) => (
            <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative">
              <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center mb-3">{i + 1}</span>
              <h4 className="font-bold text-slate-800 text-sm mb-1 leading-snug">{s[0]}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{s[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chart */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-1">{t.chart_title}</h3>
        <Bars data={chart} max={4} />
        <p className="text-xs text-slate-400 italic mt-3">{t.chart_note}</p>
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

export default CultivoDashboard;
