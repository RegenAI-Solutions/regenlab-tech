import californiaImg from "../assets/dashboards/california_dashboard.jpeg";
import quangtriImg from "../assets/dashboards/quangtri_dashboard.jpg";
import canopy_dashboard from "../assets/dashboards/canopy_height_dashboard.png";
import gujarat_dashboard from "../assets/dashboards/gujarat_dashboard.jpg";
import vietnam_corn_dashboard from "../assets/dashboards/vietnam_corn_dashboard.jpeg";
import hue_soil_dashboard from "../assets/dashboards/hue_soil_dashboard.png";
import askRegenLabThumb from "../assets/dashboards/ask_regenlab.svg";
import cultivoThumb from "../assets/dashboards/cultivo_rangelands.svg";
import carbonSpaceThumb from "../assets/dashboards/carbonspace_sampling.svg";

// Order: most important projects first.
const PROJECTS_DATA = [
  {
    id: 1,
    slug: "regenai-chatbot",
    title: { en: "Ask RegenLab", vi: "Hỏi RegenLab" },
    owner: "RegenLab",
    image: askRegenLabThumb,
    category: "AI Assistant",
    summary: {
      en: "Browser AI assistant — 100+ one-click/voice agents plus a custom RegenAg & carbon agent suite.",
      vi: "Trợ lý AI trên trình duyệt — hơn 100 agent 1-nhấp/giọng nói cùng bộ agent chuyên ngành nông nghiệp tái sinh & carbon."
    },
    status: "Beta",
    dashboardComponent: "RegenAiChatbotDashboard"
  },
  {
    id: 2,
    slug: "california-regen-ag",
    title: { en: "California's Regen Ag Planner", vi: "Quy hoạch Nông nghiệp Tái sinh California" },
    owner: "RegenLab",
    image: californiaImg,
    category: "Software Tool",
    summary: {
      en: "Process-based carbon quantification powering a public planner for California's Healthy Soils Program.",
      vi: "Định lượng carbon dựa trên mô hình, vận hành công cụ lập kế hoạch công khai cho Chương trình Đất khỏe California."
    },
    status: "Active",
    dashboardComponent: "CaliforniaDashboard"
  },
  {
    id: 3,
    slug: "cultivo-rangelands",
    title: { en: "Cultivo Rangelands", vi: "Cultivo Rangelands" },
    owner: "RegenLab",
    image: cultivoThumb,
    category: "Carbon Quantification",
    summary: {
      en: "DayCent quantification of rotational-grazing soil-carbon impact, with carrying-capacity optimization.",
      vi: "Định lượng DayCent tác động carbon đất của chăn thả luân phiên, kèm tối ưu sức tải vật nuôi."
    },
    status: "Completed",
    dashboardComponent: "CultivoDashboard"
  },
  {
    id: 4,
    slug: "carbonspace-sampling",
    title: { en: "CarbonSpace Sampling Optimization", vi: "Tối ưu Lấy mẫu CarbonSpace" },
    owner: "RegenLab",
    image: carbonSpaceThumb,
    category: "Remote Sensing",
    summary: {
      en: "Satellite NEE vs. soil sampling: cost–precision optimization and model–observation fusion.",
      vi: "NEE vệ tinh vs. lấy mẫu đất: tối ưu chi phí–độ chính xác và hợp nhất mô hình–quan trắc."
    },
    status: "Completed",
    dashboardComponent: "CarbonSpaceDashboard"
  },
  {
    id: 5,
    slug: "lidar-canopy",
    title: { en: "LiDAR Canopy Mapping", vi: "Bản đồ Chiều cao Tán rừng (LiDAR)" },
    owner: "RegenLab",
    image: canopy_dashboard,
    category: "Remote Sensing",
    summary: {
      en: "3D canopy-height modeling from LiDAR + Sentinel fusion with machine learning.",
      vi: "Mô hình hóa 3D chiều cao tán rừng từ LiDAR + Sentinel kết hợp học máy."
    },
    status: "Completed",
    dashboardComponent: "CanopyDashboard"
  },
  {
    id: 6,
    slug: "gujarat-cropping",
    title: { en: "Gujarat Cropping Systems Analysis", vi: "Phân tích Hệ thống Canh tác Gujarat" },
    owner: "RegenLab",
    image: gujarat_dashboard,
    category: "Climate Modeling",
    summary: {
      en: "DayCent simulation for GHG mitigation & crop-yield potential across cropping systems.",
      vi: "Mô phỏng DayCent đánh giá tiềm năng giảm phát thải & năng suất."
    },
    status: "Active",
    dashboardComponent: "GujaratDashboard"
  },
  {
    id: 7,
    slug: "vietnam-corn",
    title: { en: "Vietnam Corn Sustainability Optimization", vi: "Tối ưu hóa Bền vững Canh tác Ngô Việt Nam" },
    owner: "RegenLab",
    image: vietnam_corn_dashboard,
    category: "Crop Science",
    summary: {
      en: "DayCent modeling to optimize tillage and fertilization for GHG reduction across 8 ecological regions.",
      vi: "Mô hình hóa DayCent tối ưu hóa làm đất và phân bón nhằm giảm phát thải GHG trên 8 vùng sinh thái."
    },
    status: "Active",
    dashboardComponent: "VietnamCornDashboard"
  },
  {
    id: 8,
    slug: "quangtri-digital",
    title: { en: "Digital Transformation: Quảng Trị", vi: "Chuyển đổi số Nông nghiệp Quảng Trị" },
    owner: "RegenLab",
    image: quangtriImg,
    category: "Digital Transformation",
    summary: { en: "Blockchain traceability for organic supply chains.", vi: "Truy xuất nguồn gốc Blockchain cho chuỗi cung ứng hữu cơ." },
    status: "Active",
    dashboardComponent: "QuangTriDashboard"
  },
  {
    id: 9,
    slug: "hue-soil-research",
    title: { en: "Hue Soil Microbiome Research", vi: "Nghiên cứu Hệ vi sinh vật Đất (Huế)" },
    owner: "RegenLab",
    image: hue_soil_dashboard,
    category: "Research",
    summary: { en: "Spatio-temporal SOC modeling with geostatistics (kriging) and DayCent.", vi: "Mô hình hóa SOC theo không gian–thời gian bằng địa thống kê (kriging) và DayCent." },
    status: "Research",
    dashboardComponent: "HueSoilDashboard"
  },
  {
    id: 10,
    slug: "soil-carbon-modeling",
    title: { en: "Soil Carbon Modeling", vi: "Mô hình hóa Carbon trong Đất" },
    owner: "Open for collaboration",
    image: null,
    category: "Climate Modeling",
    summary: { en: "Predictive modeling of sequestration.", vi: "Mô hình dự báo khả năng hấp thụ carbon." },
    status: "Proposal",
    dashboardComponent: null
  },
  {
    id: 11,
    slug: "rice-stress-analysis",
    title: { en: "Rice Stress Analysis", vi: "Phân tích Đa phổ Lúa" },
    owner: "Open for collaboration",
    image: null,
    category: "Remote Sensing",
    summary: { en: "Detecting abiotic stress using Sentinel-2.", vi: "Phát hiện căng thẳng phi sinh học bằng dữ liệu Sentinel-2." },
    status: "Proposal",
    dashboardComponent: null
  }
];

export default PROJECTS_DATA;
