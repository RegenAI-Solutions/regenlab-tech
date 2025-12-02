import californiaImg from "../assets/dashboards/california_dashboard.jpeg";
import quangtriImg from "../assets/dashboards/quangtri_dashboard.jpg";
import netzero_dashboard from "../assets/dashboards/netzero_dashboard.png";
import canopy_dashboard from "../assets/dashboards/canopy_height_dashboard.png";
import gujarat_dashboard from "../assets/dashboards/gujarat_dashboard.jpg";
import vietnam_corn_dashboard from "../assets/dashboards/vietnam_corn_dashboard.jpeg";
import hue_soil_dashboard from "../assets/dashboards/hue_soil_dashboard.png";

const PROJECTS_DATA = [
  {
    id: 1,
    slug: "vietnam-corn",
    title: {
      en: "Vietnam Corn Sustainability Optimization Project",
      vi: "Dự án Tối ưu hóa Bền vững Canh tác Ngô Việt Nam"
    },
    owner: "Lab Team",
    image: vietnam_corn_dashboard,
    category: "Crop Science",
    summary: { en: "DayCent modeling to optimize tillage and fertilization for GHG reduction across 8 ecological regions.", vi: "Mô hình hóa DayCent tối ưu hóa làm đất và phân bón nhằm giảm phát thải GHG trên 8 vùng sinh thái."
    },
    status: "Active",
    dashboardComponent: "VietnamCornDashboard"
  },
  {
    id: 2,
    slug: "california-regen-ag",
    title: { en: "California's Regen Ag Planner", vi: "Quy hoạch Nông nghiệp Tái sinh California" },
    owner: "Lab Team",
    image: californiaImg,
    category: "Software Tool",
    summary: { en: "Digital planner for regenerative transition.", vi: "Công cụ lập kế hoạch kỹ thuật số cho chuyển đổi tái sinh." },
    status: "Active",
    dashboardComponent: "CaliforniaDashboard"
  },
  {
    id: 3,
    slug: "gujarat-cropping",
    title: { en: "Gujarat Cropping Systems Analysis", vi: "Phân tích Hệ thống Canh tác Gujarat" },
    owner: "Lab Team",
    image: gujarat_dashboard,
    category: "Climate Modeling",
    summary: {
      en: "DayCent simulation for GHG mitigation & crop yield potential.",
      vi: "Mô phỏng DayCent đánh giá tiềm năng giảm phát thải & năng suất."
    },
    status: "Active",
    dashboardComponent: "GujaratDashboard"
  },
  {
    id: 4,
    slug: "regenai-chatbot",
    title: { en: "Hỏi RegenAI", vi: "Hỏi RegenAI" },
    owner: "Lab Team",
    image: null,
    category: "AI Assistant",
    summary: { en: "LLM-powered chatbot for Vietnamese agriculture.", vi: "Chatbot AI chuyên biệt cho kiến thức nông nghiệp Việt Nam." },
    status: "Beta",
    dashboardComponent: null
  },
  {
    id: 5,
    slug: "quangtri-digital",
    title: { en: "Digital Transformation: Quảng Trị", vi: "Chuyển đổi số Nông nghiệp Quảng Trị" },
    owner: "Lab Team",
    image: quangtriImg,
    category: "Digital Transformation",
    summary: { en: "Blockchain traceability for organic chains.", vi: "Truy xuất nguồn gốc Blockchain cho chuỗi cung ứng hữu cơ." },
    status: "Active",
    dashboardComponent: "QuangTriDashboard"
  },
  {
    id: 6,
    slug: "hue-soil-research",
    title: { en: "Thang's Project", vi: "Dự án Nghiên cứu Đất (Thắng)" },
    owner: "Lab Team",
    image: hue_soil_dashboard,
    category: "Research",
    summary: { en: "Advanced soil microbiome analysis.", vi: "Phân tích hệ vi sinh vật đất tiên tiến." },
    status: "Research",
    dashboardComponent: "HueSoilDashboard"
  },
  {
    id: 7,
    slug: "net-zero-carbon",
    title: { en: "Net Zero Carbon", vi: "Net Zero Carbon" },
    owner: "Lab Team",
    image: netzero_dashboard,
    category: "Carbon Market",
    summary: { en: "A scalable, AI-powered carbon framework for Vietnam.", vi: "Khung dự án tín chỉ carbon quy mô quốc gia ứng dụng AI." },
    status: "Pilot",
    dashboardComponent: "NetzeroDashboard"
  },
  {
    id: 8,
    slug: "lidar-canopy",
    title: { en: "LiDAR Canopy Mapping", vi: "Bản đồ Chiều cao Tán rừng (LiDAR)" },
    owner: "Open for Lead",
    image: canopy_dashboard,
    category: "Remote Sensing",
    summary: { en: "3D canopy height modeling using LiDAR & Machine Learning.", vi: "Mô hình hóa 3D chiều cao tán rừng sử dụng LiDAR & Học máy." },
    status: "Completed",
    dashboardComponent: "CanopyDashboard"
  },
  {
    id: 9,
    slug: "soil-carbon-modeling",
    title: { en: "Soil Carbon Modeling", vi: "Mô hình hóa Carbon trong Đất" },
    owner: "Open for Lead",
    image: null,
    category: "Climate Modeling",
    summary: { en: "Predictive modeling of sequestration.", vi: "Mô hình dự báo khả năng hấp thụ carbon." },
    status: "Proposal",
    dashboardComponent: null
  },
  {
    id: 10,
    slug: "rice-stress-analysis",
    title: { en: "Rice Stress Analysis", vi: "Phân tích Đa phổ Lúa" },
    owner: "Open for Lead",
    image: null,
    category: "Remote Sensing",
    summary: { en: "Detecting abiotic stress using Sentinel-2.", vi: "Phát hiện căng thẳng phi sinh học bằng dữ liệu Sentinel-2." },
    status: "Proposal",
    dashboardComponent: null
  }
];

export default PROJECTS_DATA;
