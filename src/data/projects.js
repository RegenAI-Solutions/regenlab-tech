import californiaImg from "../assets/california_dashboard.jpeg";
import quangtriImg from "../assets/quangtri_dashboard.jpg";

const PROJECTS_DATA = [
  {
    id: 1,
    title: { en: "Vietnam Corn Optimization", vi: "Tối ưu hóa Giống Ngô Việt Nam" },
    owner: "uyen91nct2016@gmail.com",
    image: null,
    category: "Crop Science",
    summary: { en: "Optimizing corn yield using data-driven genetic selection.", vi: "Tối ưu hóa năng suất ngô bằng chọn lọc di truyền dựa trên dữ liệu." },
    status: "Active"
  },
  {
    id: 2,
    title: { en: "California’s Regen Ag Planner", vi: "Quy hoạch Nông nghiệp Tái sinh California" },
    owner: "Trần Văn Tuấn Phong",
    image: californiaImg,
    category: "Software Tool",
    summary: { en: "Digital planner for regenerative transition.", vi: "Công cụ lập kế hoạch kỹ thuật số cho chuyển đổi tái sinh." },
    status: "Active"
  },
  {
    id: 3,
    title: { en: "Indian IGP & Gujarat Analysis", vi: "Phân tích Khu vực IGP & Gujarat Ấn Độ" },
    owner: "thanhnganho0105@gmail.com",
    image: null,
    category: "Regional Analysis",
    summary: { en: "Satellite imagery processing for water efficiency.", vi: "Xử lý ảnh vệ tinh để đánh giá hiệu quả sử dụng nước." },
    status: "Active"
  },
  {
    id: 4,
    title: { en: "Hỏi RegenAI", vi: "Hỏi RegenAI" },
    owner: "Trần Văn Tuấn Phong",
    image: null,
    category: "AI Assistant",
    summary: { en: "LLM-powered chatbot for Vietnamese agriculture.", vi: "Chatbot AI chuyên biệt cho kiến thức nông nghiệp Việt Nam." },
    status: "Beta"
  },
  {
    id: 5,
    title: { en: "Digital Transformation: Quảng Trị", vi: "Chuyển đổi số Nông nghiệp Quảng Trị" },
    owner: "Lab Team",
    image: quangtriImg,
    category: "Digital Transformation",
    summary: { en: "Blockchain traceability for organic chains.", vi: "Truy xuất nguồn gốc Blockchain cho chuỗi cung ứng hữu cơ." },
    status: "Active"
  },
  {
    id: 6,
    title: { en: "Thang’s Project", vi: "Dự án Nghiên cứu Đất (Thắng)" },
    owner: "dvthang774@gmail.com",
    image: null,
    category: "Research",
    summary: { en: "Advanced soil microbiome analysis.", vi: "Phân tích hệ vi sinh vật đất tiên tiến." },
    status: "Research"
  },
  {
    id: 7,
    title: { en: "VMD0053", vi: "VMD0053 (Carbon)" },
    owner: "uyen91nct2016@gmail.com",
    image: null,
    category: "Carbon Protocol",
    summary: { en: "Verified Carbon Standard methodology.", vi: "Phương pháp luận Tiêu chuẩn Carbon được xác minh." },
    status: "Review"
  },
  {
    id: 8,
    title: { en: "AI-Driven Pest Detection", vi: "Phát hiện Sâu bệnh bằng AI" },
    owner: "Open for Lead",
    image: null,
    category: "AI/Computer Vision",
    summary: { en: "Using drone imagery for early detection.", vi: "Sử dụng hình ảnh drone để phát hiện sớm dịch bệnh." },
    status: "Proposal"
  },
  {
    id: 9,
    title: { en: "Soil Carbon Modeling", vi: "Mô hình hóa Carbon trong Đất" },
    owner: "Open for Lead",
    image: null,
    category: "Climate Modeling",
    summary: { en: "Predictive modeling of sequestration.", vi: "Mô hình dự báo khả năng hấp thụ carbon." },
    status: "Proposal"
  },
  {
    id: 10,
    title: { en: "Rice Stress Analysis", vi: "Phân tích Đa phổ Lúa" },
    owner: "Open for Lead",
    image: null,
    category: "Remote Sensing",
    summary: { en: "Detecting abiotic stress using Sentinel-2.", vi: "Phát hiện căng thẳng phi sinh học bằng dữ liệu Sentinel-2." },
    status: "Proposal"
  }
];

export default PROJECTS_DATA;
