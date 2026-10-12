import { CourseDetail, FaqItem, GalleryImage } from '../types';

export const INSTITUTE_INFO = {
  name: "The PI Classes",
  tagline: "The Centre of Excellence",
  slogan: "Learn Better. Understand Better. Achieve Better.",
  logo: "/logo.jpg",
  phone: "+91 9470040069",
  cleanPhone: "9470040069",
  whatsappUrl: "https://wa.me/919470040069",
  address: "Near Indira Gandhi Pustakalay, Mirchaibari, Katihar, Bihar",
  googleMapsQuery: "https://www.google.com/maps/search/?api=1&query=Indira+Gandhi+Pustakalay+Mirchaibari+Katihar+Bihar",
  description: "The PI Classes is a coaching institute dedicated to providing quality academic education and focused guidance to school students. We help students build strong concepts, improve their academic performance, and prepare confidently for their examinations.",
  goal: "To provide students with the right guidance, strong conceptual knowledge, and a supportive learning environment that helps them achieve their academic goals.",
  callReasons: [
    "Admission enquiries",
    "Course details",
    "Batch information",
    "Fee details",
    "Demo class enquiries"
  ],
  workingHours: "Monday – Saturday: 7:00 AM – 7:30 PM | Sunday: Special Doubt Sessions",
};

export const COURSES: CourseDetail[] = [
  {
    id: "cbse-7-10",
    title: "CBSE Classes 7 – 10",
    badge: "Foundation & Boards",
    subtitle: "Complete Academic Coaching for CBSE Students",
    grades: "Classes 7, 8, 9 & 10",
    description: "Holistic academic program designed to strengthen core foundations, master NCERT syllabus, and prepare students thoroughly for school and board examinations with systematic evaluation.",
    subjects: [
      "Mathematics",
      "Science (Physics, Chemistry, Biology)",
      "English",
      "Social Science (History, Civics, Geography, Economics)",
      "Sanskrit",
      "Other school subjects as applicable"
    ],
    focusPoints: [
      "Concept clarity with step-by-step understanding",
      "CBSE & NCERT-based comprehensive learning",
      "Regular daily and weekly practice problem sets",
      "Dedicated doubt-solving sessions after every chapter",
      "Periodic tests, assessments, and progress reports",
      "Structured examination preparation and answer writing techniques"
    ],
    suitableFor: "Students in Classes 7 to 10 wanting top-tier academic guidance and board excellence",
    scheduleHighlights: [
      "Small batch sizes for personalized attention",
      "Chapter-wise worksheets & NCERT exemplar discussion",
      "Periodic parent-teacher performance feedback"
    ],
    icon: "BookOpen"
  },
  {
    id: "physics-11-12",
    title: "Classes 11 & 12 — Physics",
    badge: "Specialized Coaching",
    subtitle: "In-Depth Conceptual & Problem-Solving Mastery",
    grades: "Classes 11 & 12",
    description: "Exclusive, rigorous Physics coaching specifically engineered for senior secondary students to demystify complex concepts, master derivations, and excel in numerical problem-solving.",
    subjects: [
      "Class 11 Physics (Mechanics, Thermodynamics, Waves & Oscillations, Properties of Matter)",
      "Class 12 Physics (Electrostatics, Current, Magnetism, Optics, Modern Physics, Semiconductor Devices)"
    ],
    focusPoints: [
      "Strong conceptual foundation with intuitive visualization",
      "Numerical problem-solving from basic to advanced levels",
      "Rigorous NCERT-based preparation & derivations practice",
      "Mastery over important concepts, formulas, and derivations",
      "Regular timed tests modeled on latest CBSE Board patterns",
      "One-on-one doubt-solving support to eliminate confusion",
      "Targeted Board examination preparation and scoring strategy"
    ],
    suitableFor: "Class 11 & 12 Science students targeting maximum marks in CBSE Board exams and strong fundamentals",
    scheduleHighlights: [
      "Formula books and derivation summary handbooks",
      "Previous 10 years CBSE board questions analysis",
      "Step-wise marking scheme training for board exams"
    ],
    icon: "Atom"
  }
];

export const WHY_CHOOSE_US = [
  {
    id: 1,
    title: "Experienced and Dedicated Teaching",
    description: "Passionate mentorship committed to guiding each student with proven pedagogical methods that turn difficult topics into understandable ideas.",
    icon: "Award"
  },
  {
    id: 2,
    title: "Concept-Based Learning",
    description: "We eliminate rote memorization by emphasizing deep first-principles understanding, logical reasoning, and real-world application.",
    icon: "Lightbulb"
  },
  {
    id: 3,
    title: "CBSE-Focused Preparation",
    description: "Meticulously aligned with the latest CBSE guidelines, NCERT textbooks, chapter weightage, and board question blueprints.",
    icon: "Compass"
  },
  {
    id: 4,
    title: "Regular Tests & Assessments",
    description: "Weekly chapter tests, monthly cumulative exams, and full-length simulated test papers with detailed performance review.",
    icon: "ClipboardCheck"
  },
  {
    id: 5,
    title: "Personal Attention",
    description: "Small batch sizes ensure every student is closely monitored, understood, and encouraged at their individual pace of learning.",
    icon: "Users"
  },
  {
    id: 6,
    title: "Doubt-Solving Support",
    description: "No question goes unanswered. Dedicated time slots and individual teacher access ensure doubts are resolved immediately.",
    icon: "HelpCircle"
  },
  {
    id: 7,
    title: "Quality Study Material",
    description: "Curated chapter notes, essential formula sheets, question banks, and NCERT-focused assignment booklets.",
    icon: "FileText"
  },
  {
    id: 8,
    title: "Exam-Oriented Preparation",
    description: "Time-management training, answer-presentation guidelines, and rigorous mock test practice to build calm confidence.",
    icon: "Target"
  }
];

export const FAQS: FaqItem[] = [
  {
    category: "Admissions",
    question: "Can my child attend a Free Demo Class before enrolling?",
    answer: "Yes, absolutely! The PI Classes offers complimentary demo classes so parents and students can experience our teaching methodology, interactive environment, and faculty approach before taking admission."
  },
  {
    category: "Admissions",
    question: "How do I enquire about batch timings and fees?",
    answer: "You can directly call us at +91 9470040069 or submit an online enquiry form on this website. Our team will share exact schedule slots and fee structures based on your selected class and subjects."
  },
  {
    category: "Academics",
    question: "What subjects are covered for CBSE Classes 7 to 10?",
    answer: "We provide comprehensive academic coaching covering Mathematics, Science (Physics, Chemistry, Biology), English, Social Science (History, Civics, Geography, Economics), Sanskrit, and other applicable school subjects."
  },
  {
    category: "Academics",
    question: "Why is Physics coaching in Classes 11 and 12 given special focus?",
    answer: "Physics in senior secondary demands a rock-solid grasp of derivations, mathematical calculus applications, and systematic numerical problem-solving. Our dedicated Physics coaching ensures students master every derivation and score top marks in their CBSE Board examinations."
  },
  {
    category: "Batches",
    question: "What is the average batch size at The PI Classes?",
    answer: "We intentionally maintain controlled, small batch sizes so our faculty can provide true personal attention, observe each student's progress, and solve individual doubts without anyone being left behind."
  },
  {
    category: "Batches",
    question: "Where exactly is the institute located in Katihar?",
    answer: "We are conveniently located Near Indira Gandhi Pustakalay, Mirchaibari, Katihar, Bihar. It is easily accessible with a peaceful and student-friendly academic environment."
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "gallery-img-0",
    url: "https://thepiclasses.org.in/gallery/img-0.jpg",
    title: "Main Classroom & Lecture Environment",
    category: "Classroom",
    tag: "Classroom",
    caption: "Spacious, well-ventilated classroom setting equipped for interactive whiteboard lectures and focused study at Mirchaibari."
  },
  {
    id: "gallery-img-1",
    url: "https://thepiclasses.org.in/gallery/img-1.jpg",
    title: "Batch Studies & Board Exam Preparation",
    category: "Classroom",
    tag: "Academic Batch",
    caption: "Students working through comprehensive problem sheets and CBSE board exam practice sessions with teacher supervision."
  },
  {
    id: "gallery-img-3",
    url: "https://thepiclasses.org.in/gallery/img-3.jpg",
    title: "Physics & Mathematics Concept Deep-Dive",
    category: "Academic Sessions",
    tag: "Concept Building",
    caption: "Step-by-step mathematical problem solving and fundamental physics laws demystified on the board."
  },
  {
    id: "gallery-img-4",
    url: "https://thepiclasses.org.in/gallery/img-4.jpg",
    title: "Interactive Mentorship & Doubt Solving",
    category: "Academic Sessions",
    tag: "Faculty Interaction",
    caption: "Direct, personal faculty-student discussions where core scientific and mathematical concepts are simplified step-by-step."
  },
  {
    id: "gallery-img-5",
    url: "https://thepiclasses.org.in/gallery/img-5.jpg",
    title: "Classroom Learning & Focused Study Sessions",
    category: "Classroom",
    tag: "Classroom Sessions",
    caption: "Engaged students attending concept-building sessions, mastering NCERT problem solving and CBSE board curriculum."
  },
  {
    id: "gallery-img-13",
    url: "https://thepiclasses.org.in/gallery/img-13.jpg",
    title: "Dedicated Study Hours & Test Practice",
    category: "Academic Sessions",
    tag: "Test Assessment",
    caption: "Weekly assessment tests and guided practice sessions helping students build speed, accuracy, and exam temperament."
  },
  {
    id: "gallery-img-18",
    url: "https://thepiclasses.org.in/gallery/img-18.jpg",
    title: "Student Collaboration & Group Learning",
    category: "Classroom",
    tag: "Peer Learning",
    caption: "Encouraging collaborative discussion and peer-to-peer problem solving under expert teacher guidance."
  },
  {
    id: "gallery-img-22",
    url: "https://thepiclasses.org.in/gallery/img-22.jpg",
    title: "Individual Guidance & Doubt Clearance",
    category: "Mentorship",
    tag: "Personal Attention",
    caption: "One-on-one attention addressing specific learning bottlenecks and strengthening foundation concepts for every student."
  },
  {
    id: "teachers-day-pic2",
    url: "https://thepiclasses.org.in/teachers-day/pic2.jpg",
    title: "Teachers' Day Opening & Cake Cutting",
    category: "Celebrations & Events",
    tag: "Celebration",
    caption: "Students gathering to celebrate Teachers' Day with joy, gratitude, and traditional cake cutting ceremony."
  },
  {
    id: "teachers-day-pic7",
    url: "https://thepiclasses.org.in/teachers-day/pic7.jpg",
    title: "Student Tributes & Speeches on Teachers' Day",
    category: "Celebrations & Events",
    tag: "Student Speech",
    caption: "Inspiring speeches and heartfelt tributes delivered by students expressing appreciation for their teachers' guidance."
  },
  {
    id: "teachers-day-pic19",
    url: "https://thepiclasses.org.in/teachers-day/pic19.jpg",
    title: "Teacher-Student Bonding & Joyous Moments",
    category: "Celebrations & Events",
    tag: "Celebration",
    caption: "Memorable celebration moments reflecting the warm, respectful bond between teachers and students at the centre."
  },
  {
    id: "teachers-day-pic20",
    url: "https://thepiclasses.org.in/teachers-day/pic20.jpg",
    title: "Teachers' Day Celebration & Student Honors",
    category: "Celebrations & Events",
    tag: "Teachers' Day",
    caption: "Heartwarming celebration honoring our mentors and strengthening the student-faculty bond at the institute."
  },
  {
    id: "teachers-day-pic30",
    url: "https://thepiclasses.org.in/teachers-day/pic30.jpg",
    title: "Faculty Mentorship & Student Felicitation",
    category: "Mentorship",
    tag: "Institute Life",
    caption: "Building confidence, discipline, and mutual respect between students and teachers at The PI Classes Centre of Excellence."
  },
  {
    id: "teachers-day-pic31",
    url: "https://thepiclasses.org.in/teachers-day/pic31.jpg",
    title: "Student Gifts & Gratitude Presentation",
    category: "Celebrations & Events",
    tag: "Gratitude",
    caption: "Students presenting tokens of respect and bouquets to esteemed mentors on the auspicious occasion of Teachers' Day."
  },
  {
    id: "teachers-day-pic33",
    url: "https://thepiclasses.org.in/teachers-day/pic33.jpg",
    title: "Group Celebration & Institute Pride",
    category: "Celebrations & Events",
    tag: "Batch Group",
    caption: "The PI Classes family celebrating togetherness, dedication to learning, and academic excellence at Mirchaibari."
  },
  {
    id: "teachers-day-pic38",
    url: "https://thepiclasses.org.in/teachers-day/pic38.jpg",
    title: "Faculty Recognition & Inspiring Guidance",
    category: "Mentorship",
    tag: "Faculty Blessing",
    caption: "Guidance and encouraging words from mentor Binay Kumar sharing keys to academic consistency and high board scores."
  },
  {
    id: "teachers-day-pic43",
    url: "https://thepiclasses.org.in/teachers-day/pic43.jpg",
    title: "Smiles, Motivation & High Spirits",
    category: "Mentorship",
    tag: "Motivation",
    caption: "Fostering an energetic, supportive atmosphere where students feel motivated to aim for top ranks and board excellence."
  }
];
