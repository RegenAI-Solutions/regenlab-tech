import {
  ArrowLeft, MessageSquare, Bot, Sparkles, Mic, Layers, Cpu,
  FileText, Database, Leaf, Globe, Search, ChevronRight, CheckCircle2,
  Bug, Scale, Newspaper, ShieldAlert, Wand2
} from 'lucide-react';

// --- TRANSLATIONS ---
const T = {
  en: {
    back: "Back to Projects",
    badge: "Chrome Extension · Beta",
    title: "Ask RegenLab",
    subtitle: "An AI agent assistant that lives in your browser — 100+ one-click or voice agents, plus a custom regenerative-agriculture & carbon agent suite that reads the page you're on.",
    stat_domain: "domain agents",
    stat_builtin: "built-in agents",
    stat_voice: "1-click / voice",
    stat_models: "multi-model",
    chat_ctx: "Reading: VM0042 — Improved Agricultural Land Management (verra.org)",
    chat_agent: "DayCent Parameter Assistant",
    chat_user: "Pull the key crop & soil parameters from this methodology section for our DayCent setup.",
    chat_reply_intro: "From §5.2 (baseline) and §8 (quantification) I extracted:",
    chat_params: [
      "Crop functional group — C3 annual (wheat)",
      "Tillage — reduced-till, 2 passes/yr",
      "Residue retained — 70%",
      "N application — 120 kg N/ha (urea)",
    ],
    chat_footer: "8 parameters extracted · formatted for DayCent-Client (.sch)",
    chat_placeholder: "Ask anything, or pick an agent…",
    cap_title: "What it can do",
    capabilities: [
      { icon: "Globe", t: "Works on any web page", d: "Reads the page you're viewing — or just your selection — so answers use real context, not guesses." },
      { icon: "Sparkles", t: "100+ agents, one click", d: "Built-in productivity agents plus a custom RegenLab suite for soil, pests, carbon and MRV." },
      { icon: "Mic", t: "Voice & quick actions", d: "Talk to it hands-free, or trigger the writing helper with a keyboard shortcut." },
      { icon: "Cpu", t: "Multi-model", d: "Pick the right LLM per task; bring your own model connections." },
      { icon: "Wand2", t: "Build your own agents", d: "Create custom agents from a prompt — no code — and share them with the team." },
      { icon: "Database", t: "Structured extraction", d: "Turn messy page content into model-ready data (e.g. DayCent inputs, MMRV records)." },
    ],
    suite_title: "The RegenLab agent suite",
    suite_sub: "Domain agents built for regenerative-agriculture science and carbon MRV.",
    agents: [
      { icon: "Leaf", t: "Soil & Nutrition Doctor", d: "Diagnoses soil and crop-nutrition issues from field data." },
      { icon: "Bug", t: "Organic Pest & Disease Tracer", d: "Regen-ag plant protection guidance from observed symptoms." },
      { icon: "Cpu", t: "DayCent Parameter Assistant", d: "Reads papers and pulls model parameters for DayCent runs." },
      { icon: "ShieldAlert", t: "MMRV Data Auditor", d: "Flags gaps and anomalies in agricultural MRV datasets." },
      { icon: "Newspaper", t: "Carbon Market Analyst", d: "Synthesises market news into a concise strategic brief." },
      { icon: "Sparkles", t: "Rice Credit Estimator", d: "Preliminary credit-potential estimate from location & maps." },
      { icon: "Scale", t: "Policy Review & Benchmarking", d: "Compares proposals against current agricultural policy." },
      { icon: "Database", t: "DayCent Data Extractor", d: "Extracts structured ag/environmental data from any page." },
    ],
    how_title: "How it works",
    steps: [
      "Open the RegenLab sidepanel on any web page.",
      "Pick an agent — or just speak your request.",
      "It reads the page (or your selection) for context.",
      "Get an answer, or export structured data for your pipeline.",
    ],
    note: "Mockup preview. Ask RegenLab (“Hỏi RegenAI”) is a Chrome extension currently in private beta.",
  },
  vi: {
    back: "Quay lại Dự án",
    badge: "Tiện ích Chrome · Beta",
    title: "Hỏi RegenLab",
    subtitle: "Trợ lý AI ngay trong trình duyệt — hơn 100 agent chạy bằng 1 cú nhấp hoặc giọng nói, kèm bộ agent chuyên biệt cho nông nghiệp tái sinh & carbon, đọc trực tiếp trang bạn đang xem.",
    stat_domain: "agent chuyên ngành",
    stat_builtin: "agent có sẵn",
    stat_voice: "1-nhấp / giọng nói",
    stat_models: "đa mô hình",
    chat_ctx: "Đang đọc: VM0042 — Quản lý Đất Nông nghiệp Cải tiến (verra.org)",
    chat_agent: "Trợ Lý DayCent Parameter",
    chat_user: "Trích các tham số cây trồng & đất chính từ phần phương pháp luận này cho cấu hình DayCent.",
    chat_reply_intro: "Từ §5.2 (kịch bản nền) và §8 (định lượng), tôi đã trích:",
    chat_params: [
      "Nhóm chức năng cây trồng — C3 hằng niên (lúa mì)",
      "Làm đất — giảm cày, 2 lượt/năm",
      "Tàn dư giữ lại — 70%",
      "Bón đạm — 120 kg N/ha (urê)",
    ],
    chat_footer: "Đã trích 8 tham số · định dạng cho DayCent-Client (.sch)",
    chat_placeholder: "Hỏi bất cứ điều gì, hoặc chọn một agent…",
    cap_title: "Khả năng",
    capabilities: [
      { icon: "Globe", t: "Hoạt động trên mọi trang web", d: "Đọc trang bạn đang xem — hoặc đoạn bạn chọn — để trả lời dựa trên ngữ cảnh thực." },
      { icon: "Sparkles", t: "Hơn 100 agent, một cú nhấp", d: "Agent năng suất có sẵn cùng bộ RegenLab cho đất, sâu bệnh, carbon và MRV." },
      { icon: "Mic", t: "Giọng nói & thao tác nhanh", d: "Ra lệnh bằng giọng nói, hoặc gọi trợ lý soạn thảo bằng phím tắt." },
      { icon: "Cpu", t: "Đa mô hình", d: "Chọn LLM phù hợp cho từng tác vụ; kết nối mô hình riêng của bạn." },
      { icon: "Wand2", t: "Tự tạo agent", d: "Tạo agent riêng từ một câu lệnh — không cần code — và chia sẻ cho nhóm." },
      { icon: "Database", t: "Trích xuất có cấu trúc", d: "Biến nội dung trang lộn xộn thành dữ liệu sẵn sàng cho mô hình (DayCent, MMRV)." },
    ],
    suite_title: "Bộ agent RegenLab",
    suite_sub: "Các agent chuyên ngành cho khoa học nông nghiệp tái sinh và MRV carbon.",
    agents: [
      { icon: "Leaf", t: "Bác sĩ Đất & Dinh dưỡng", d: "Chẩn đoán vấn đề đất và dinh dưỡng cây trồng từ dữ liệu đồng ruộng." },
      { icon: "Bug", t: "Truy vết Sâu bệnh Hữu cơ", d: "Tư vấn bảo vệ thực vật theo hướng tái sinh từ triệu chứng quan sát." },
      { icon: "Cpu", t: "Trợ lý DayCent Parameter", d: "Đọc tài liệu và trích tham số mô hình cho các lần chạy DayCent." },
      { icon: "ShieldAlert", t: "Kiểm tra Dữ liệu MMRV", d: "Phát hiện thiếu sót và bất thường trong dữ liệu MRV nông nghiệp." },
      { icon: "Newspaper", t: "Phân tích Thị trường Carbon", d: "Tổng hợp tin thị trường thành bản tham mưu chiến lược ngắn gọn." },
      { icon: "Sparkles", t: "Ước tính Tín chỉ (Lúa)", d: "Ước tính tiềm năng tín chỉ sơ bộ từ vị trí & bản đồ." },
      { icon: "Scale", t: "Thẩm định & Đối sánh Chính sách", d: "So sánh đề xuất với chính sách nông nghiệp hiện hành." },
      { icon: "Database", t: "Trích xuất Dữ liệu DayCent", d: "Trích dữ liệu nông nghiệp/môi trường có cấu trúc từ mọi trang." },
    ],
    how_title: "Cách hoạt động",
    steps: [
      "Mở sidepanel RegenLab trên bất kỳ trang web nào.",
      "Chọn một agent — hoặc nói yêu cầu của bạn.",
      "Nó đọc trang (hoặc đoạn bạn chọn) để lấy ngữ cảnh.",
      "Nhận câu trả lời, hoặc xuất dữ liệu có cấu trúc cho quy trình của bạn.",
    ],
    note: "Bản xem trước mô phỏng. Hỏi RegenLab (“Hỏi RegenAI”) là tiện ích Chrome đang trong giai đoạn beta riêng.",
  },
};

const ICONS = { MessageSquare, Bot, Sparkles, Mic, Layers, Cpu, FileText, Database, Leaf, Globe, Search, Bug, Scale, Newspaper, ShieldAlert, Wand2 };

const RegenAiChatbotDashboard = ({ onBack, lang = 'en' }) => {
  const t = T[lang] || T.en;

  return (
    <div className="animate-fade-in space-y-10">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-medium transition-colors">
        <ArrowLeft size={20} /> {t.back}
      </button>

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 to-slate-800 rounded-2xl p-8 md:p-10 text-white shadow-xl">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-4">
          <Bot size={14} /> {t.badge}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-3">{t.title}</h1>
        <p className="text-slate-200 text-lg leading-relaxed max-w-3xl mb-6">{t.subtitle}</p>
        <div className="flex flex-wrap gap-3">
          {[["25+", t.stat_domain], ["100+", t.stat_builtin], ["⚡", t.stat_voice], ["✦", t.stat_models]].map(([n, l], i) => (
            <div key={i} className="bg-white/10 border border-white/15 rounded-xl px-4 py-2">
              <div className="text-xl font-bold leading-none">{n}</div>
              <div className="text-[11px] text-emerald-200 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mock chat / sidepanel preview */}
      <section className="grid lg:grid-cols-5 gap-6 items-start">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
          {/* panel header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm"><Bot size={18} className="text-emerald-600" /> {t.title}</div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            </div>
          </div>
          {/* context chip */}
          <div className="px-4 pt-4">
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
              <Globe size={14} className="text-emerald-600 shrink-0" /> <span className="truncate">{t.chat_ctx}</span>
            </div>
          </div>
          {/* messages */}
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1"><Cpu size={12} /> {t.chat_agent}</span>
            </div>
            {/* user bubble */}
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-emerald-600 text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm shadow-sm">{t.chat_user}</div>
            </div>
            {/* assistant bubble */}
            <div className="flex justify-start">
              <div className="max-w-[90%] bg-slate-50 border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 text-sm text-slate-700">
                <p className="mb-2">{t.chat_reply_intro}</p>
                <ul className="space-y-1.5">
                  {t.chat_params.map((p, i) => (
                    <li key={i} className="flex items-start gap-2"><CheckCircle2 size={15} className="text-emerald-600 mt-0.5 shrink-0" /> <span>{p}</span></li>
                  ))}
                  <li className="flex items-start gap-2 text-slate-400"><span className="mt-0.5">…</span></li>
                </ul>
                <div className="mt-3 flex items-center gap-2 text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-2 py-1 w-fit">
                  <Database size={12} /> {t.chat_footer}
                </div>
              </div>
            </div>
          </div>
          {/* input */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-3 py-2 bg-white">
              <Search size={16} className="text-slate-400" />
              <span className="flex-1 text-sm text-slate-400">{t.chat_placeholder}</span>
              <Mic size={18} className="text-slate-400" />
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center"><MessageSquare size={15} /></div>
            </div>
          </div>
        </div>

        {/* How it works (beside the mock) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-4">{t.how_title}</h3>
          <ol className="space-y-4">
            {t.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                <span className="text-sm text-slate-600 leading-relaxed pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Capabilities */}
      <section>
        <h3 className="text-2xl font-bold text-slate-800 mb-6">{t.cap_title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.capabilities.map((c, i) => {
            const Icon = ICONS[c.icon] || Sparkles;
            return (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-300 transition">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3"><Icon size={18} /></div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">{c.t}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{c.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Agent suite */}
      <section>
        <h3 className="text-2xl font-bold text-slate-800 mb-1">{t.suite_title}</h3>
        <p className="text-slate-500 text-sm mb-6">{t.suite_sub}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.agents.map((a, i) => {
            const Icon = ICONS[a.icon] || Sparkles;
            return (
              <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center"><Icon size={16} /></div>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1 leading-snug">{a.t}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{a.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      <p className="text-xs text-slate-400 italic border-t border-slate-100 pt-4">{t.note}</p>
    </div>
  );
};

export default RegenAiChatbotDashboard;
