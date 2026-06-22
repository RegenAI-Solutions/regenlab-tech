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

const en = {
  nav: {
    home: "Home",
    about: "About",
    projects: "Research",
    videos: "Resources",
    partners: "Partners",
    careers: "Careers",
    portal: "API Portal",
    contact: "Contact",
    cta: "Collaborate"
  },
  hero: {
    tagline: "SCIENCE • QUANTIFICATION • RESEARCH",
    title_prefix: "Process-Based Carbon Quantification for",
    title_highlight: "Regenerative Agriculture",
    desc: "RegenLab builds rigorous, audit-grade carbon quantification and digital MRV infrastructure for regenerative agriculture. We provide the science and tooling; we are not a carbon project developer.",
    btn_explore: "Our Research",
    btn_mission: "Our Approach"
  },
  highlights: {
    ai_title: "Scientific Rigor",
    ai_desc: "Process-based biogeochemical quantification of soil carbon and GHG fluxes, built on the peer-reviewed DayCent model and aligned to registry methodologies (e.g., Verra VM0042 / VMD0053).",
    climate_title: "Digital MRV Infrastructure",
    climate_desc: "Automated, reproducible quantification pipelines and APIs that developers, registries, and verification bodies can rely on for transparent, auditable results.",
    origin_title: "Research & Capacity Building",
    origin_desc: "An open scientific collaboration network connecting universities and researchers to advance regenerative-agriculture science and train the next generation of quantification specialists."
  },
  about: {
    title: "About RegenLab",
    lead: "Independent Science for",
    lead_highlight: "Credible Carbon",
    sub_lead: "RegenLab is an academic and scientific collaboration program. We build the human and scientific infrastructure for high-integrity agricultural carbon quantification.",
    cta_journey: "Our Approach",
    cta_team: "Leadership",
    problem: {
      title: "The \"Language\" Challenge",
      desc: "The hardest barrier in agricultural carbon is not technology — it is people. Agricultural scientists understand the land but are often unfamiliar with digital systems; software engineers excel at code but lack field experience. This gap is why many quantification efforts fail to reach audit-grade quality.",
      ag_expert_title: "Agricultural Scientists",
      ag_expert_desc: "Understand the language of soils & crops.",
      tech_expert_title: "Technology Experts",
      tech_expert_desc: "Understand the language of data & AI.",
      bridge_text: "RegenLab is the Bridge",
      gap_label: "The language gap"
    },
    story: {
      eyebrow: "Our Journey",
      title: "Our Approach",
      subtitle: "Academic Standards, Audit-Grade Quantification",
      desc: "RegenLab exists to bring global scientific standards to the quantification of agricultural carbon — rigorously, reproducibly, and transparently.",
      steps: [
        {
          year: "2010",
          title: "Scientific Foundations",
          subtitle: "Biogeochemistry & Soil Science",
          desc: "Rooted in academic soil science and biogeochemistry — the conviction that agricultural carbon must be quantified with data and process-based models, not intuition.",
          icon: "seedling"
        },
        {
          year: "plane",
          title: "Global Standards",
          subtitle: "Process-Based Modeling (DayCent)",
          desc: "Adopting the peer-reviewed DayCent model and registry-grade methodologies to forecast yields, soil carbon, and greenhouse-gas fluxes with defensible accuracy.",
          icon: "plane"
        },
        {
          year: "industry",
          title: "Scale via Technology",
          subtitle: "Remote Sensing & Automation",
          desc: "Combining remote sensing, GIS, and serverless automation so quantification scales across thousands of fields without losing scientific reproducibility.",
          icon: "industry"
        },
        {
          year: "flag",
          title: "Infrastructure, Not Projects",
          subtitle: "RegenLab",
          desc: "RegenLab provides the science and the quantification software and dMRV infrastructure — licensed to developers, registries, and verification bodies.",
          icon: "flag"
        }
      ]
    },
    mission: {
      title: "Two Infrastructure Pillars",
      subtitle: "What We Build",
      desc: "We build foundations, not carbon projects.",
      pillar1_title: "1. Human Infrastructure (RegenLab)",
      pillar1_desc: "We connect agricultural and technology universities and bring researchers into real international science projects — building \"bilingual\" talent that understands both soil and data, and advancing open regenerative-agriculture science.",
      pillar2_title: "2. Technology Infrastructure",
      pillar2_desc: "We provide rigorous, audit-grade digital MRV and process-based quantification software for developers, registries, and verification bodies. Our principle: we provide the science and tooling — we do not source farmers, write PDDs, or sell carbon credits."
    },
    leadership: {
      title: "Leadership",
      hieu: {
        name: "Prof. Hieu Minh Nguyen",
        role: "Founder & Director, RegenLab",
        bio: "Former Rector of Hue University of Agriculture and Forestry with four decades in agricultural science and education. Founder and Director of RegenLab, leading its strategic direction and scientific program with the conviction that rigorous, accessible science is key to credible climate action."
      }
    },
    team: {
      title: "Core Scientific & Engineering Team",
      subtitle: "Leading scientists and engineers building audit-grade quantification.",
      members: [
        {
          name: "Dr. Nguyen Trung Hai",
          role: "Senior Modeller",
          bio: "Deputy Director of the Central Climate Change Center. Expert in DayCent modeling, MRV frameworks under Verra standards, and remote-sensing integration in agriculture.",
          color: "green",
          image: nguyenTrungHaiImg
        },
        {
          name: "Lap Tran",
          role: "Senior Software Engineer",
          bio: "Over 10 years of Backend/Cloud experience at international tech companies (Skedulo, FPT). Expert in building large-scale, secure quantification systems.",
          color: "blue",
          image: lapTranImg
        },
        {
          name: "Dao Thi Hang - Anna",
          role: "Carbon Methodology Expert",
          bio: "Master of Carbon Management (Adelaide). Specialist in methodology compliance and greenhouse-gas accounting across Australia and Asia-Pacific.",
          color: "yellow",
          image: daoThiHangImg
        },
        {
          name: "Assoc. Prof. Phan Kieu Diem",
          role: "Remote Sensing Expert",
          bio: "Lecturer at Can Tho University. Specialized in GIS and remote-sensing applications for land-resource monitoring and climate change.",
          color: "teal",
          image: phanKieuDiemImg
        },
        {
          name: "Dr. Nguyen Van Hien",
          role: "Soil Scientist",
          bio: "Soil scientist at the Institute of Soil Science and Agricultural Chemistry. PhD from the University of Birmingham (UK). Expert in biochar and soil carbon sequestration.",
          color: "orange",
          image: nguyenVanHienImg
        },
        {
          name: "Dr. Mai Le Quyen",
          role: "Social & ESG Expert",
          bio: "PhD in Sociology (Bonn, Germany). Expert in social-impact assessment, community development, and gender equity.",
          color: "pink",
          image: maiLeQuyenImg
        },
        {
          name: "Vu Trong Nghia - Vince",
          role: "Operations",
          bio: "MBA (Thunderbird, USA). Over 15 years of experience in strategic management and operations.",
          color: "gray",
          image: vuTrongNghiaImg
        },
        {
          name: "Tran Van Tuan Phong",
          role: "Technical Leader",
          bio: "Leads the AI and backend infrastructure, shaping RegenLab's core quantification platform.",
          color: "blue",
          image: tranVanTuanPhongImg
        },
        {
          name: "Dang Van Thang",
          role: "Software/Data Engineer",
          bio: "Data Science & AI engineer specializing in AWS architectures for large-scale data processing and reliable, scalable quantification infrastructure.",
          color: "purple",
          image: dangVanThangImg
        },
        {
          name: "Tran Cao Thuc Uyen",
          role: "Data Scientist",
          bio: "Focused on advanced LLM applications to automate scientific data extraction and quality control.",
          color: "teal",
          image: tranCaoThucUyenImg
        },
        {
          name: "Ho Thi Thanh Ngan",
          role: "Jr. Data Scientist",
          bio: "Data science engineer solving agricultural quantification challenges through applied AI.",
          color: "green",
          image: hoThiThanhNganImg
        }
      ]
    },
    projects: {
      title: "Research & Track Record",
      subtitle: "Scientific work delivered across demanding international programs.",
      items: [
        {
          country: "California, USA",
          flag: "🇺🇸",
          desc: "Co-developed the \"Regen Ag Planner\" application for California's Healthy Soils Program — quantification science supporting state-backed regenerative agriculture.",
          url: "https://regenagplanner.org/login"
        },
        {
          country: "Canada",
          flag: "🇨🇦",
          desc: "Built an automated nitrogen-recommendation and N₂O-reduction system for canola with partner Ukko.ag.",
          url: "https://ukko.ag/ukko-product/"
        },
        {
          country: "Australia",
          flag: "🇦🇺",
          desc: "3D canopy-height modeling using LiDAR and machine learning for forest-resource monitoring.",
          url: "/projects/lidar-canopy"
        },
        {
          country: "India",
          flag: "🇮🇳",
          desc: "Provided technical dMRV and DayCent quantification support for large-scale soil-organic-carbon programs under Verra standards."
        },
        {
          country: "Vietnam",
          flag: "🇻🇳",
          desc: "Building DayCent input databases and research tools for Vietnamese agro-ecological zones.",
          highlight: true
        }
      ]
    }
  },
  projects: {
    title: "Research Projects",
    filter_all: "All",
    lead: "Lead",
    status: "Status",
    dev_msg: "Detailed dashboard for this project is under development.",
    check_cali: "Please check the California’s Regen Ag Planner for a live demo."
  },
  videos: { title: "Demo Videos", owner: "Owner" },
  partners: {
    title: "Partner With Us",
    join: "Collaborate with RegenLab",
    desc: "Project developers, registries, and verification bodies: partner with us for rigorous, audit-grade carbon quantification and digital MRV. We provide the science and tooling — not carbon projects.",
    details: "Why partner",
    benefits: [
      "Process-based quantification (DayCent engine)",
      "Digital MRV API & serverless scale",
      "VMD0053 Model Validation Reports",
      "Independent scientific & methodology review"
    ],
    who_title: "Who we work with",
    who_desc: "Carbon project developers, registries, verification bodies (VVBs), and research institutions.",
    apply_title: "Get in touch",
    apply_msg: "Interested in licensing the quantification suite or collaborating on the science? Reach out to:"
  },
  careers: {
    title: "Join the Lab",
    intro_title: "Build the science of carbon quantification",
    intro: "RegenLab is a collaborative research program. We work with students, researchers, and engineers on real international quantification science — from soil-carbon modeling to MRV automation.",
    internship_title: "Internships",
    internship_desc: "Hands-on research alongside our scientific and engineering teams. We host students and recent graduates in modeling, remote sensing, and software.",
    internship_tags: ["Modeling & Data Science", "Remote Sensing / GIS", "Software Engineering", "Agronomy & Soil Science"],
    roles_title: "Open Roles",
    roles_note: "Indicative roles — reach out even if your fit isn't listed.",
    roles: [
      { title: "Carbon Modeling Scientist", type: "Full-time", location: "Hue, VN · Remote", desc: "Develop and calibrate process-based models (DayCent) for soil-carbon and GHG quantification." },
      { title: "MRV Software Engineer", type: "Full-time", location: "Remote", desc: "Build and scale the digital MRV API and serverless quantification pipelines." },
      { title: "Remote Sensing Researcher", type: "Full-time · Contract", location: "Remote", desc: "Integrate satellite data (NEE, NDVI) to constrain and validate quantification models." },
      { title: "Research Intern", type: "Internship", location: "Hue, VN · Remote", desc: "Support modeling, data processing, and methodology research with senior scientists." }
    ],
    apply_title: "How to apply",
    apply_msg: "Send your CV and a short note to:"
  },
  contact: {
    title: "Contact Us",
    get_in_touch: "Partner With Us",
    desc: "Reach out about quantification, digital MRV, methodology review, or research collaboration.",
    office_title: "Office",
    office_address: "117 Phung Hung Street, Phu Xuan Ward, Hue City, Thua Thien Hue Province, Vietnam",
    email_title: "Email",
    email_address: "info@regenlab.tech",
    hours_title: "Hours",
    hours_desc: "24/7",
    form: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      subject_general: "General enquiry",
      subject_collaboration: "Project collaboration",
      subject_internship: "Internship / Careers",
      subject_training: "Training program",
      msg: "Message",
      name_placeholder: "Your name",
      msg_placeholder: "Type your message...",
      send: "Send Message",
      sending: "Sending...",
      success_title: "Message Sent!",
      success_desc: "Thank you for contacting RegenLab. We will get back to you shortly.",
      send_another: "Send another message"
    }
  },
  footer: {
    desc: "RegenLab is the regenerative-agriculture science and digital-MRV research program of RegenAI Solutions (RAS) — advancing rigorous, audit-grade carbon quantification.",
    links: "Quick Links",
    areas: "Capabilities",
    area_items: ["Process-based modeling", "Digital MRV", "Uncertainty quantification", "Remote sensing"],
    contact: "Contact",
    rights: "All rights reserved."
  }
};

export default en;
