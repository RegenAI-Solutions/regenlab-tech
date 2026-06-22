import nguyenTrungHaiImg from '../../assets/members/nguyen_trung_hai.jpeg';
import lapTranImg from '../../assets/members/lap_tran.jpeg';
import daoThiHangImg from '../../assets/members/dao_thi_hang.jpeg';
import phanKieuDiemImg from '../../assets/members/phan_kieu_diem.webp';
import nguyenVanHienImg from '../../assets/members/nguyen_van_hien.jpeg';
import maiLeQuyenImg from '../../assets/members/mai_le_quyen.jpg';
import vuTrongNghiaImg from '../../assets/members/vu_trong_nghia.jpeg';
import tranVanTuanPhongImg from '../../assets/members/tran_van_tuan_phong.png';
import dangVanThangImg from '../../assets/members/dang_van_thang.jpeg';
import hoThiThanhNganImg from '../../assets/members/ho_thi_thanh_ngan.jpeg';
import tranCaoThucUyenImg from '../../assets/members/tran_cao_thuc_uyen.jpg';

const vi = {
  nav: {
    home: "Trang chủ",
    about: "Giới thiệu",
    projects: "Nghiên cứu",
    videos: "Tài nguyên",
    partners: "Đối tác",
    careers: "Tuyển dụng",
    portal: "Cổng API",
    contact: "Liên hệ",
    cta: "Hợp tác"
  },
  hero: {
    tagline: "KHOA HỌC • ĐỊNH LƯỢNG • NGHIÊN CỨU",
    title_prefix: "Định lượng Carbon dựa trên Mô hình cho",
    title_highlight: "Nông nghiệp Tái sinh",
    desc: "RegenLab xây dựng hạ tầng định lượng carbon và MRV số nghiêm ngặt, đạt chuẩn kiểm toán cho nông nghiệp tái sinh. Chúng tôi cung cấp khoa học và công cụ; chúng tôi không phải là đơn vị phát triển dự án carbon.",
    btn_explore: "Nghiên cứu",
    btn_mission: "Phương pháp"
  },
  highlights: {
    ai_title: "Nghiêm ngặt Khoa học",
    ai_desc: "Định lượng sinh địa hóa dựa trên mô hình cho carbon đất và phát thải khí nhà kính, xây dựng trên mô hình DayCent đã được bình duyệt và phù hợp các phương pháp luận đăng ký (vd: Verra VM0042 / VMD0053).",
    climate_title: "Hạ tầng MRV Số",
    climate_desc: "Quy trình và API định lượng tự động, tái lập được, mà các nhà phát triển, tổ chức đăng ký và đơn vị thẩm định có thể tin cậy để cho ra kết quả minh bạch, kiểm toán được.",
    origin_title: "Nghiên cứu & Đào tạo",
    origin_desc: "Mạng lưới hợp tác khoa học mở, kết nối các trường đại học và nhà nghiên cứu để thúc đẩy khoa học nông nghiệp tái sinh và đào tạo thế hệ chuyên gia định lượng kế tiếp."
  },
  about: {
    title: "Về RegenLab",
    lead: "Khoa học Độc lập cho",
    lead_highlight: "Carbon Đáng tin cậy",
    sub_lead: "RegenLab là chương trình hợp tác học thuật và khoa học. Chúng tôi xây dựng hạ tầng con người và khoa học cho việc định lượng carbon nông nghiệp chất lượng cao.",
    cta_journey: "Phương pháp",
    cta_team: "Ban Lãnh đạo",
    problem: {
      title: "Trăn trở về \"Ngôn ngữ\"",
      desc: "Rào cản lớn nhất trong carbon nông nghiệp không phải là công nghệ, mà là con người. Các nhà khoa học nông nghiệp am hiểu đất đai nhưng xa lạ với hệ thống số; kỹ sư phần mềm giỏi lập trình nhưng thiếu thực tế đồng ruộng. Khoảng cách này khiến nhiều nỗ lực định lượng không đạt chất lượng kiểm toán.",
      ag_expert_title: "Nhà khoa học Nông nghiệp",
      ag_expert_desc: "Hiểu ngôn ngữ của Đất & Cây trồng.",
      tech_expert_title: "Chuyên gia Công nghệ",
      tech_expert_desc: "Hiểu ngôn ngữ của Dữ liệu & AI.",
      bridge_text: "RegenLab là Cầu nối",
      gap_label: "Khoảng cách ngôn ngữ"
    },
    story: {
      eyebrow: "Hành trình",
      title: "Phương pháp của Chúng tôi",
      subtitle: "Chuẩn mực Học thuật, Định lượng đạt chuẩn Kiểm toán",
      desc: "RegenLab tồn tại để mang chuẩn mực khoa học toàn cầu vào việc định lượng carbon nông nghiệp — nghiêm ngặt, tái lập được và minh bạch.",
      steps: [
        {
          year: "2010",
          title: "Nền tảng Khoa học",
          subtitle: "Sinh địa hóa & Khoa học Đất",
          desc: "Bắt nguồn từ khoa học đất và sinh địa hóa — niềm tin rằng carbon nông nghiệp phải được định lượng bằng dữ liệu và mô hình, chứ không bằng cảm tính.",
          icon: "seedling"
        },
        {
          year: "plane",
          title: "Chuẩn mực Toàn cầu",
          subtitle: "Mô hình hóa dựa trên Mô hình (DayCent)",
          desc: "Áp dụng mô hình DayCent đã được bình duyệt và các phương pháp luận đạt chuẩn đăng ký để dự báo năng suất, carbon đất và phát thải khí nhà kính với độ chính xác bảo vệ được.",
          icon: "plane"
        },
        {
          year: "industry",
          title: "Mở rộng nhờ Công nghệ",
          subtitle: "Viễn thám & Tự động hóa",
          desc: "Kết hợp viễn thám, GIS và tự động hóa serverless để mở rộng định lượng trên hàng nghìn cánh đồng mà không mất đi tính tái lập khoa học.",
          icon: "industry"
        },
        {
          year: "flag",
          title: "Hạ tầng, không phải Dự án",
          subtitle: "RegenLab",
          desc: "RegenLab cung cấp khoa học cùng phần mềm định lượng và hạ tầng dMRV — cấp phép cho các nhà phát triển, tổ chức đăng ký và đơn vị thẩm định.",
          icon: "flag"
        }
      ]
    },
    mission: {
      title: "Hai Trụ cột Hạ tầng",
      subtitle: "Điều chúng tôi xây dựng",
      desc: "Chúng tôi xây dựng nền móng, không phải các dự án carbon.",
      pillar1_title: "1. Hạ tầng Con người (RegenLab)",
      pillar1_desc: "Chúng tôi kết nối các trường đại học nông nghiệp và công nghệ, đưa nhà nghiên cứu vào các dự án khoa học quốc tế thực tế — tạo nguồn nhân lực \"song ngữ\" hiểu cả đất lẫn dữ liệu, và thúc đẩy khoa học nông nghiệp tái sinh mở.",
      pillar2_title: "2. Hạ tầng Công nghệ",
      pillar2_desc: "Chúng tôi cung cấp phần mềm MRV số và định lượng dựa trên mô hình, nghiêm ngặt và đạt chuẩn kiểm toán, cho các nhà phát triển, tổ chức đăng ký và đơn vị thẩm định. Nguyên tắc: chúng tôi cung cấp khoa học và công cụ — không tìm nông dân, không viết PDD, không bán tín chỉ carbon."
    },
    leadership: {
      title: "Ban Lãnh Đạo",
      hieu: {
        name: "GS.TS Nguyễn Minh Hiếu",
        role: "Nhà sáng lập & Giám đốc, RegenLab",
        bio: "Nguyên Hiệu trưởng Đại học Nông Lâm Huế với bốn thập kỷ trong khoa học và giáo dục nông nghiệp. Nhà sáng lập và Giám đốc RegenLab, dẫn dắt định hướng chiến lược và chương trình khoa học với niềm tin rằng khoa học nghiêm ngặt, dễ tiếp cận là chìa khóa cho hành động khí hậu đáng tin cậy."
      }
    },
    team: {
      title: "Đội ngũ Khoa học & Kỹ thuật Nòng cốt",
      subtitle: "Các nhà khoa học và kỹ sư hàng đầu xây dựng định lượng đạt chuẩn kiểm toán.",
      members: [
        {
          name: "TS. Nguyễn Trung Hải",
          role: "Senior Modeller",
          bio: "Phó Giám đốc Trung tâm BĐKH miền Trung. Chuyên gia về mô hình DayCent, khung MRV theo chuẩn Verra và tích hợp viễn thám trong nông nghiệp.",
          color: "green",
          image: nguyenTrungHaiImg
        },
        {
          name: "Lap Tran",
          role: "Senior Software Engineer",
          bio: "Hơn 10 năm kinh nghiệm Backend/Cloud tại các công ty công nghệ quốc tế (Skedulo, FPT). Chuyên gia xây dựng hệ thống định lượng quy mô lớn và bảo mật.",
          color: "blue",
          image: lapTranImg
        },
        {
          name: "Dao Thi Hang - Anna",
          role: "Carbon Methodology Expert",
          bio: "Thạc sĩ Quản lý Carbon (Adelaide). Chuyên gia về tuân thủ phương pháp luận và kiểm kê khí nhà kính tại Úc và Châu Á - Thái Bình Dương.",
          color: "yellow",
          image: daoThiHangImg
        },
        {
          name: "PGS.TS Phan Kiều Diễm",
          role: "Remote Sensing Expert",
          bio: "Giảng viên ĐH Cần Thơ. Chuyên sâu về ứng dụng GIS và Viễn thám trong giám sát tài nguyên đất đai và biến đổi khí hậu.",
          color: "teal",
          image: phanKieuDiemImg
        },
        {
          name: "TS. Nguyễn Văn Hiển",
          role: "Soil Scientist",
          bio: "Nhà khoa học đất tại Viện Thổ nhưỡng Nông hóa. Tiến sĩ tại ĐH Birmingham (Anh). Chuyên gia về Biochar và cô lập carbon trong đất.",
          color: "orange",
          image: nguyenVanHienImg
        },
        {
          name: "TS. Mai Lệ Quyên",
          role: "Social & ESG Expert",
          bio: "Tiến sĩ Xã hội học (Bonn, Đức). Chuyên gia đánh giá tác động xã hội, phát triển cộng đồng và bình đẳng giới.",
          color: "pink",
          image: maiLeQuyenImg
        },
        {
          name: "Vũ Trọng Nghĩa - Vince",
          role: "Operations",
          bio: "MBA (Thunderbird, Mỹ). Hơn 15 năm kinh nghiệm quản trị chiến lược và vận hành.",
          color: "gray",
          image: vuTrongNghiaImg
        },
        {
          name: "Trần Văn Tuấn Phong",
          role: "Technical Leader",
          bio: "Dẫn dắt hạ tầng AI và Backend, định hình nền tảng định lượng cốt lõi của RegenLab.",
          color: "blue",
          image: tranVanTuanPhongImg
        },
        {
          name: "Đặng Văn Thắng",
          role: "Software/Data Engineer",
          bio: "Kỹ sư Khoa học Dữ liệu & AI, chuyên thiết kế kiến trúc AWS xử lý dữ liệu lớn và hạ tầng định lượng ổn định, mở rộng được.",
          color: "purple",
          image: dangVanThangImg
        },
        {
          name: "Trần Cao Thục Uyên",
          role: "Data Scientist",
          bio: "Tập trung vào các ứng dụng LLM tiên tiến để tự động hóa trích xuất dữ liệu khoa học và kiểm soát chất lượng.",
          color: "teal",
          image: tranCaoThucUyenImg
        },
        {
          name: "Hồ Thị Thanh Ngân",
          role: "Jr. Data Scientist",
          bio: "Kỹ sư khoa học dữ liệu giải quyết các bài toán định lượng nông nghiệp bằng AI ứng dụng.",
          color: "green",
          image: hoThiThanhNganImg
        }
      ]
    },
    projects: {
      title: "Nghiên cứu & Kinh nghiệm",
      subtitle: "Công việc khoa học đã thực hiện trong các chương trình quốc tế khắt khe.",
      items: [
        {
          country: "California, USA",
          flag: "🇺🇸",
          desc: "Đồng phát triển ứng dụng \"Regen Ag Planner\" cho Chương trình Đất khỏe California — khoa học định lượng hỗ trợ nông nghiệp tái sinh do nhà nước bảo trợ.",
          url: "https://regenagplanner.org/login"
        },
        {
          country: "Canada",
          flag: "🇨🇦",
          desc: "Xây dựng hệ thống khuyến nghị đạm và giảm phát thải N₂O tự động cho cây Canola cùng đối tác Ukko.ag.",
          url: "https://ukko.ag/ukko-product/"
        },
        {
          country: "Úc",
          flag: "🇦🇺",
          desc: "Mô hình hóa 3D chiều cao tán rừng sử dụng LiDAR & Học máy để giám sát tài nguyên rừng.",
          url: "/projects/lidar-canopy"
        },
        {
          country: "Ấn Độ",
          flag: "🇮🇳",
          desc: "Cung cấp hỗ trợ kỹ thuật dMRV và định lượng DayCent cho các chương trình carbon đất quy mô lớn theo tiêu chuẩn Verra."
        },
        {
          country: "Việt Nam",
          flag: "🇻🇳",
          desc: "Xây dựng cơ sở dữ liệu đầu vào DayCent và công cụ nghiên cứu cho các vùng sinh thái nông nghiệp Việt Nam.",
          highlight: true
        }
      ]
    }
  },
  projects: {
    title: "Dự án Nghiên cứu",
    filter_all: "Tất cả",
    lead: "Phụ trách",
    status: "Trạng thái",
    dev_msg: "Dashboard chi tiết đang được phát triển.",
    check_cali: "Xem demo tại dự án California’s Regen Ag Planner."
  },
  videos: { title: "Video Demo", owner: "Người đăng" },
  partners: {
    title: "Hợp tác cùng Chúng tôi",
    join: "Hợp tác với RegenLab",
    desc: "Nhà phát triển dự án, tổ chức đăng ký và đơn vị thẩm định: hãy hợp tác cùng chúng tôi về định lượng carbon và MRV số nghiêm ngặt, đạt chuẩn kiểm toán. Chúng tôi cung cấp khoa học và công cụ — không phải các dự án carbon.",
    details: "Vì sao hợp tác",
    benefits: [
      "Định lượng dựa trên mô hình (engine DayCent)",
      "API MRV số & mở rộng serverless",
      "Báo cáo Thẩm định Mô hình VMD0053",
      "Rà soát khoa học & phương pháp luận độc lập"
    ],
    who_title: "Đối tượng hợp tác",
    who_desc: "Nhà phát triển dự án carbon, tổ chức đăng ký, đơn vị thẩm định (VVB) và viện nghiên cứu.",
    apply_title: "Liên hệ",
    apply_msg: "Quan tâm cấp phép bộ công cụ định lượng hoặc hợp tác khoa học? Liên hệ:"
  },
  careers: {
    title: "Gia nhập RegenLab",
    intro_title: "Xây dựng khoa học định lượng carbon",
    intro: "RegenLab là chương trình nghiên cứu hợp tác. Chúng tôi làm việc cùng sinh viên, nhà nghiên cứu và kỹ sư trong các dự án khoa học định lượng quốc tế thực tế — từ mô hình hóa carbon đất đến tự động hóa MRV.",
    internship_title: "Thực tập",
    internship_desc: "Nghiên cứu thực hành cùng đội ngũ khoa học và kỹ thuật. Chúng tôi tiếp nhận sinh viên và cử nhân mới trong mô hình hóa, viễn thám và phần mềm.",
    internship_tags: ["Mô hình hóa & Khoa học Dữ liệu", "Viễn thám / GIS", "Kỹ thuật Phần mềm", "Nông học & Khoa học Đất"],
    roles_title: "Vị trí đang tuyển",
    roles_note: "Vị trí mang tính tham khảo — cứ liên hệ kể cả khi chưa thấy vị trí phù hợp.",
    roles: [
      { title: "Nhà khoa học Mô hình Carbon", type: "Toàn thời gian", location: "Huế, VN · Từ xa", desc: "Phát triển và hiệu chỉnh các mô hình dựa trên mô hình (DayCent) cho định lượng carbon đất và khí nhà kính." },
      { title: "Kỹ sư Phần mềm MRV", type: "Toàn thời gian", location: "Từ xa", desc: "Xây dựng và mở rộng API MRV số cùng các pipeline định lượng serverless." },
      { title: "Nhà nghiên cứu Viễn thám", type: "Toàn thời gian · Hợp đồng", location: "Từ xa", desc: "Tích hợp dữ liệu vệ tinh (NEE, NDVI) để ràng buộc và kiểm định mô hình định lượng." },
      { title: "Thực tập sinh Nghiên cứu", type: "Thực tập", location: "Huế, VN · Từ xa", desc: "Hỗ trợ mô hình hóa, xử lý dữ liệu và nghiên cứu phương pháp luận cùng các nhà khoa học cấp cao." }
    ],
    apply_title: "Cách ứng tuyển",
    apply_msg: "Gửi CV và một đoạn giới thiệu ngắn tới:"
  },
  contact: {
    title: "Liên Hệ Với Chúng Tôi",
    subtitle: "Kết Nối",
    hero_title: "Hãy Cùng Nhau",
    hero_highlight: "Kiến Tạo Carbon Đáng tin cậy",
    hero_desc: "Chúng tôi luôn sẵn sàng hợp tác về định lượng, MRV số, rà soát phương pháp luận và nghiên cứu khoa học.",
    get_in_touch: "Hợp tác cùng Chúng tôi",
    desc: "Liên hệ về định lượng, MRV số, rà soát phương pháp luận, hoặc hợp tác nghiên cứu.",
    office_title: "Văn Phòng",
    office_address: "117 Đường Phùng Hưng, Phường Phú Xuân, Thành phố Huế, Tỉnh Thừa Thiên Huế, Việt Nam",
    email_title: "Email",
    email_address: "info@regenlab.tech",
    phone_title: "Điện Thoại",
    phone_number: "+84 (234) 123 4567",
    hours_title: "Giờ Làm Việc",
    hours_desc: "Thứ Hai - Thứ Sáu: 8:00 - 17:00",
    form_title: "Gửi Tin Nhắn",
    form_desc: "Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.",
    form: {
      name: "Họ và tên",
      email: "Địa chỉ email",
      phone: "Số điện thoại",
      subject: "Chủ đề",
      subject_general: "Câu hỏi chung",
      subject_collaboration: "Hợp tác dự án",
      subject_internship: "Thực tập / Tuyển dụng",
      subject_training: "Chương trình đào tạo",
      msg: "Nội dung tin nhắn",
      name_placeholder: "Họ và tên của bạn",
      msg_placeholder: "Nhập nội dung tin nhắn...",
      send: "Gửi Tin Nhắn",
      sending: "Đang gửi...",
      success_title: "Gửi Thành Công!",
      success_desc: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
      send_another: "Gửi tin nhắn khác"
    }
  },
  footer: {
    desc: "RegenLab là chương trình nghiên cứu khoa học nông nghiệp tái sinh và MRV số của RegenAI Solutions (RAS) — thúc đẩy định lượng carbon nghiêm ngặt, đạt chuẩn kiểm toán.",
    links: "Liên kết nhanh",
    areas: "Năng lực",
    area_items: ["Mô hình hóa dựa trên mô hình", "MRV số", "Định lượng độ bất định", "Viễn thám"],
    contact: "Thông tin",
    rights: "Bảo lưu mọi quyền."
  }
};

export default vi;
