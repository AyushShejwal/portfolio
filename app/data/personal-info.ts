export const personalInfo = {
  name: "Ayush Sunil Shejwal",
  title: "Computer Science Student",
  phone: "(602)-596-5182",
  university: "Arizona State University (Honors)",
  emails: ["ashejwal@asu.edu", "ayushshejwal2204@gmail.com"],
  linkedin: "https://linkedin.com/in/ayush2204",
  github: "https://github.com/AyushShejwal",

  bio: "Computer Science Student at Arizona State University (Honors) with a 3.90/4.00 GPA, passionate about AI/ML, full-stack development, and building innovative solutions.",

  education: {
    school: "Arizona State University (Honors)",
    location: "Tempe, AZ",
    degree: "Bachelor of Science in Computer Science",
    gpa: "3.90 / 4.00",
    graduation: "May 2026",
    coursework: [
      "Data Structures and Algorithms (C++, Python)",
      "Digital Design Fundamentals",
      "Discrete Math",
      "Object Oriented Programming",
      "Calculus I, II, III",
      "Probability & Statistics",
      "Linear Algebra",
      "Database Management"
    ]
  },

  experiences: [
    {
      company: "Pebbles AI",
      url: "https://pebblesai.xyz",
      role: "AI/Full-Stack Engineering Intern",
      location: "Remote",
      period: "August 2025 — Present",
      description: [
        "Architected a high-performance local RAG system in Python/Flask using ChromaDB and vLLM, implementing two-stage retrieval (dense embeddings + BAAI cross-encoder reranking) to reduce query latency by 95% (71.8s → 2.5s) while preserving multi-document reasoning accuracy",
        "Led inference architecture pivot from PowerInfer to vLLM with Qwen2.5-7B-Instruct, enabling stable 128K-context serving; built secure Gmail and Outlook ingestion pipelines integrated into a GPU-backed RunPod deployment",
        "Built a cross-platform Tauri desktop app bundling a local Python AI backend via PyInstaller with automated provisioning"
      ],
      skills: ["Python", "Flask", "vLLM", "ChromaDB", "Tauri", "RunPod", "RAG", "AI", "BAAI"]
    },
    {
      company: "STILED",
      url: "https://thestiled.com",
      role: "CTO, Co-founder",
      location: "Tempe, AZ",
      period: "April 2025 — Present",
      description: [
        "Developed an AI-powered virtual try-on platform with Gemini 2.5 and MediaPipe, integrating fit scoring based on body measurements and skin tone (ITA°/LAB) to generate real-time, anatomically accurate outfit visualizations",
        "Built and deployed scalable backend services on GCP with PostgreSQL and Firebase; engineered brand-specific scrapers for 30+ retail websites with automated measurement normalization to support dynamic content",
        "Validated product with 50 pilot users (ages 18–31): 89% Found combined fit+color+outfit suggestions useful, 92.5% would use while shopping online, featured in Business of Fashion and AllThingsFashionTech"
      ],
      skills: ["GCP", "Gemini 2.5", "MediaPipe", "PostgreSQL", "Firebase", "AI", "Computer Vision", "Web Scraping"]
    },
    {
      company: "ASU Center for Carbon Emission Lab",
      role: "Research Aide",
      location: "Tempe, AZ",
      period: "August 2024 — December 2024",
      description: [
        "Engineered a Python data pipeline using PIconnect, Pandas, and datetime to extract, clean, validate, and process 500+ industrial time-series datasets (CO2 levels, heat, wind, humidity), producing analysis-ready CSVs",
        "Developed a Flask app with RESTful APIs for tag file uploads, processed data retrieval, and automated reporting, reducing manual intervention and streamlining lab workflows by 30%"
      ],
      skills: ["Python", "Flask", "Pandas", "PIconnect", "Data Processing", "RESTful APIs", "Time-series Analysis"]
    }
  ],

  projects: [
    {
      name: "Market Insights AI",
      type: "Personal Project",
      description: [
        "Built a financial insights platform combining GPT-4 and VADER for AI-powered sentiment analysis and real-time market prediction",
        "Integrated Alpha Vantage for live stock data and visualized insights using D3.js and ECharts for financial graphs",
        "Applied ORM concepts using SQLAlchemy and designed scalable APIs with FastAPI, ensuring modularity and speed"
      ],
      technologies: ["Python", "FastAPI", "React", "TypeScript", "GPT-4", "VADER", "PostgreSQL", "TailwindCSS", "D3.js", "SQLAlchemy", "Alpha Vantage"]
    },
    {
      name: "Eventus",
      type: "LA Hacks",
      description: [
        "Developed a news aggregator app leveraging Google's Gemini API for NLP-based sentiment analysis to mitigate media bias",
        "Designed a responsive UI with Reflex, using libraries like Styled Components and Zustand for state management"
      ],
      technologies: ["Python", "Reflex Dev", "Google Gemini API", "News API", "NLP", "Sentiment Analysis"]
    }
  ],

  skills: {
    programming: ["Python", "C++", "JavaScript", "TypeScript", "Java", "SQL", "C", "HTML", "CSS", "Sass", "Bash"],
    frameworks: [
      "React.js", "Node.js", "Angular", "Flask", "FastAPI", "TailwindCSS",
      "TensorFlow", "PyTorch", "Scikit-learn", "HuggingFace Transformers",
      "Pandas", "NumPy", "SciPy", "VADER Sentiment"
    ],
    databases: ["PostgreSQL", "MySQL", "MongoDB", "Firebase", "Supabase"],
    cloud_devops: ["AWS (Lambda, S3)", "Azure Cloud", "Git/GitHub", "CI/CD (GitHub Actions)", "Linux/Unix", "Railway"],
    ai_ml: [
      "LangChain", "OllamaLLM", "ChatOpenAI", "ChatAnthropic",
      "embeddings & vector search (Chroma, FAISS)", "prompt engineering",
      "Pydantic output parsing", "OpenCV", "RAG", "vLLM", "Gemini", "MediaPipe"
    ]
  },

  leadership: [
    {
      role: "Senator",
      organization: "IRA Fulton Schools of Engineering, ASU",
      description: "Managing the appropriations team by allocating a budget of $300k"
    },
    {
      role: "Vice President",
      organization: "Software Developers Association",
      description: "Managing finances, event logistics, company relations"
    }
  ],

  interests: ["AI/ML", "Full-Stack Development", "Building Products", "Soccer/Football", "Financial Technology"]
};
