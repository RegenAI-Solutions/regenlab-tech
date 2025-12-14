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
    internship: "Careers",
    contact: "Contact",
    cta: "Collaborate"
  },
  hero: {
    tagline: "RESEARCH • EDUCATION • INNOVATION",
    title_prefix: "Pioneering Research in",
    title_highlight: "Regenerative Agriculture",
    desc: "RegenLab is a dedicated research hub applying AI, remote sensing, and data science to advance sustainable farming practices and train the next generation of ag-tech leaders.",
    btn_explore: "Our Research",
    btn_mission: "Training Programs"
  },
  highlights: {
    ai_title: "Scientific Excellence",
    ai_desc: "Conducting rigorous research on soil health, crop resilience, and carbon sequestration using advanced modeling tools like DayCent.",
    climate_title: "Tech Transfer",
    climate_desc: "Bridging the gap between academic research and practical application through technology transfer and pilot programs.",
    origin_title: "Capacity Building",
    origin_desc: "Empowering students, researchers, and local communities with cutting-edge knowledge in AgTech and data science."
  },
  about: {
    title: "Our Story",
    lead: "A Journey Connecting",
    lead_highlight: "Technology & Agriculture",
    sub_lead: "We are building \"human infrastructure\" and \"technological infrastructure\" to position Vietnam as a powerhouse in high-tech regenerative agriculture.",
    cta_journey: "Our Journey",
    cta_team: "Leadership",
    problem: {
      title: "The \"Language\" Challenge",
      desc: "In Vietnam, the biggest barrier is not just technology, but people. Agricultural experts understand the land but are unfamiliar with digitization. Conversely, tech engineers excel at programming but lack field experience. This gap causes many AgTech projects to fail.",
      ag_expert_title: "Agricultural Experts",
      ag_expert_desc: "Understand the language of Soil & Crops.",
      tech_expert_title: "Technology Experts",
      tech_expert_desc: "Understand the language of Data & AI.",
      bridge_text: "RegenLab is the Bridge"
    },
    story: {
      title: "Our Story",
      subtitle: "From the Classroom to International Fields",
      desc: "RegenLab was born from the aspiration to bring global standards to solve Vietnamese agricultural challenges.",
      steps: [
        {
          year: "2010",
          title: "Beginning in Hue",
          subtitle: "Academic Foundation & Biochemistry",
          desc: "Started as a biochemistry lecturer at Hue University of Agriculture and Forestry, realizing agriculture needs precise data rather than intuition.",
          icon: "seedling"
        },
        {
          year: "plane",
          title: "Reaching the World",
          subtitle: "Colorado State University (USA)",
          desc: "Fulbright Scholar at Colorado State University (USA). Mastered the DayCent model for yield and greenhouse gas forecasting.",
          icon: "plane"
        },
        {
          year: "industry",
          title: "Industrial Scale",
          subtitle: "Shell & Clean Energy Regulator (Australia)",
          desc: "Solved the problem of scaling models using Remote Sensing/GIS at Shell. Participated in developing Australia's 2021 Soil Carbon Methodology.",
          icon: "industry"
        },
        {
          year: "flag",
          title: "Homecoming & Building",
          subtitle: "RegenLab Vietnam",
          desc: "Returned to Vietnam, established RegenLab & RegenAI. Combined international experience to build local MMRV infrastructure.",
          icon: "flag"
        }
      ]
    },
    mission: {
      title: "Our Mission: Two Infrastructure Pillars",
      subtitle: "Strategic Mission",
      desc: "We don't just sell solutions, we build foundations.",
      pillar1_title: "1. Human Infrastructure (RegenLab)",
      pillar1_desc: "We train the next generation of \"Digital Agricultural Engineers\". By connecting Agricultural and Technology Universities, bringing students into real international projects, we create \"bilingual\" talent - understanding both soil and technology.",
      pillar2_title: "2. Technological Infrastructure (RegenAI)",
      pillar2_desc: "Providing reliable MMRV (Measurement, Monitoring, Reporting, Verification) solutions. Our philosophy: \"Using technology to bring money (climate finance) to farmers, not selling technology products to farmers.\""
    },
    leadership: {
      title: "Leadership & Founders",
      hieu: {
        name: "Prof. Hieu Minh Nguyen",
        role: "Visionary Founder & Director",
        bio: "Former Rector of Hue University of Agriculture and Forestry with 40 years of dedication. Laid the foundation connecting Vietnamese agriculture with global climate finance markets. Founded RegenAI with the belief that technology is key to solving climate change."
      },
      trung: {
        name: "Prof. Dr. Nguyen Huu Trung",
        role: "Founder & Principal Scientist",
        bio: "DayCent modeling and MMRV expert. Former Fulbright Scholar (CSU), Technical Manager at Shell, and Scientific Lead at Regrow & Varaha. Directly building technical infrastructure and databases to realize the Net Zero vision."
      }
    },
    team: {
      title: "Core Team of Experts",
      subtitle: "A combination of leading scientists and talented technology engineers.",
      members: [
        {
          name: "Dr. Nguyen Trung Hai",
          role: "Senior Modeller",
          bio: "Deputy Director of Central Climate Change Center. Expert in DayCent modeling, MRV framework under Verra standards, and remote sensing integration in agriculture.",
          color: "green",
          image: nguyenTrungHaiImg
        },
        {
          name: "Lap Tran",
          role: "Senior Software Engineer",
          bio: "Over 10 years of Backend/Cloud experience at international tech companies (Skedulo, FPT). Expert in building large-scale and secure systems.",
          color: "blue",
          image: lapTranImg
        },
        {
          name: "Helen Tran",
          role: "Protocol Expert",
          bio: "Master of Environment (Melbourne). Expert consultant on carbon projects, greenhouse gas inventory (ISO 14064) in Australia and Asia.",
          color: "purple",
          // image: helenTranImg // Missing image
        },
        {
          name: "Dao Thi Hang - Anna",
          role: "Carbon Market Expert",
          bio: "Master of Carbon Management (Adelaide). Director of Global Expert Pty Ltd. Practical experience in farm operations and carbon trading consulting.",
          color: "yellow",
          image: daoThiHangImg
        },
        {
          name: "Assoc. Prof. Phan Kieu Diem",
          role: "Remote Sensing Expert",
          bio: "Lecturer at Can Tho University. Specialized in GIS and Remote Sensing applications for land resource monitoring and climate change.",
          color: "teal",
          image: phanKieuDiemImg
        },
        {
          name: "Dr. Nguyen Van Hien",
          role: "Soil Scientist",
          bio: "Soil scientist at Institute of Soil Science and Agricultural Chemistry. PhD from University of Birmingham (UK). Expert in Biochar and carbon sequestration in soil.",
          color: "orange",
          image: nguyenVanHienImg
        },
        {
          name: "Dr. Mai Le Quyen",
          role: "Social Expert",
          bio: "PhD in Sociology (Bonn, Germany). Deputy Director of CKC Center. Expert in social impact assessment, community development, and gender equality.",
          color: "pink",
          image: maiLeQuyenImg
        },
        {
          name: "Vu Trong Nghia - Vince",
          role: "Project Management",
          bio: "MBA (Thunderbird, USA). Co-founder of Bizzi Bots. Over 15 years of experience in strategic management, startup operations, and investment funds.",
          color: "gray",
          image: vuTrongNghiaImg
        },
        {
          name: "Tran Van Tuan Phong",
          role: "Technical Leader",
          bio: "Having been with RegenAI since the early days (over 1.5 years), Phong has been instrumental in building the core AI & Backend foundation. Leveraging his solid background as a Data Science & AI Engineer, he now leads the technical team, shaping the core solutions for RegenAI.",
          color: "blue",
          image: tranVanTuanPhongImg
        },
        {
          name: "Dang Van Thang",
          role: "Software/Data Engineer",
          bio: "A Data Science & AI Engineer by training, Thang has spent more than 1.5 years with the company, specializing in designing AWS architectures for large-scale data processing. He is currently focused on optimizing data infrastructure to ensure stability and scalability.",
          color: "purple",
          image: dangVanThangImg
        },
        {
          name: "Tran Cao Thuc Uyen",
          role: "Data Scientist",
          bio: "Over the past 1.5 years at RegenAI, Uyen has dedicated herself to mastering unstructured data challenges. Starting as an AI Engineer, she is now spearheading research into advanced LLM applications to automate information extraction.",
          color: "teal",
          image: tranCaoThucUyenImg
        },
        {
          name: "Ho Thi Thanh Ngan",
          role: "Jr. Data Scientist",
          bio: "With over 1.5 years of hands-on experience developing machine learning models at RegenAI, Ngan consistently applies her Data Science mindset to real-world problems. She is currently passionate about solving specific agricultural challenges through creative AI solutions.",
          color: "green",
          image: hoThiThanhNganImg
        }
      ]
    },
    projects: {
      title: "Projects & Real Impact",
      subtitle: "We have built and deployed AgTech solutions in the most demanding markets.",
      items: [
        {
          country: "California, USA",
          flag: "🇺🇸",
          desc: "Developed the \"Regen Ag Planner\" application for California's Healthy Soils Program. Helping farmers plan sustainable farming.",
          url: "https://regenagplanner.org/login"
        },
        {
          country: "Canada",
          flag: "🇨🇦",
          desc: "Built an automated nitrogen recommendation system for Canola crops with partner Ukko.ag, optimizing input costs for farmers.",
          url: "https://ukko.ag/ukko-product/"
        },
        {
          country: "Australia",
          flag: "🇦🇺",
          desc: "3D canopy height modeling using LiDAR & Machine Learning for effective forest resource monitoring.",
          url: "/projects/lidar-canopy"
        },
        {
          country: "India",
          flag: "🇮🇳",
          desc: "Provided MMRV technical support for large-scale soil carbon credit projects under Verra standards, unlocking climate finance."
        },
        {
          country: "Vietnam",
          flag: "🇻🇳",
          desc: "Developed \"Ask RegenAI\" - Agricultural virtual assistant. Building input database for DayCent model in Vietnam.",
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
  internship: {
    title: "Join the Revolution",
    join: "Partner with Us",
    desc: "Are you a smallholder farmer, cooperative, or investor? Join our mission.",
    details: "Why Join?",
    apply_title: "Contact for Partnership",
    apply_msg: "Interested in piloting our MMRV Suite? Reach out to:",
    who_title: "Who we are looking for",
    who_desc: "Undergraduate or graduate students with a strong background in either computer science or agricultural sciences."
  },
  contact: {
    title: "Contact Us",
    get_in_touch: "Unlock New Revenue",
    desc: "Tap into new income streams with verified carbon credits.",
    form: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      msg: "Message",
      send: "Send Message",
      sending: "Sending...",
      success_title: "Message Sent!",
      success_desc: "Thank you for contacting RegenLab. We will get back to you shortly."
    }
  },
  footer: {
    desc: "A research laboratory dedicated to advancing regenerative agriculture through science and technology.",
    links: "Quick Links",
    areas: "Technology",
    contact: "Contact",
    rights: "All rights reserved."
  }
};

export default en;
