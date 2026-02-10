'use client';

interface ExperienceItem {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  skills?: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "Atharva International",
    position: "Data Analyst Intern",
    duration: "May 2023 - Jul 2023",
    location: "Nashik, IND",
    description: [
      "Automated financial workflows with Python using Pandas for data manipulation and Matplotlib for visualization, reducing manual effort by 25%.",
      "Executed optimized SQL queries to extract, analyze, and report insights from relational databases, leveraging indexing and query optimization techniques."
    ],
    skills: ["Python", "Pandas", "SQL", "Matplotlib"]
  },
  {
    company: "ASU Center for Carbon Emission Lab",
    position: "Research Aide",
    duration: "Aug 2024 - Dec 2024",
    location: "Tempe, AZ",
    description: [
      "Engineered a Python-based pipeline with Ptconnect, pandas, and datetime to extract and process over 500 industrial time-series sensor (CO2 levels, heat intensity, wind flow, humidity) datasets, outputting clean CSV files.",
      "Built a Flask application with integrated RESTful APIs for tag file uploads and processed data retrieval, reducing manual intervention and streamlining workflows by working on Product Development and Management."
    ],
    skills: ["Python", "Flask", "RESTful APIs", "Pandas"]
  },
  {
    company: "ASU Department of Computer Science",
    position: "Research Aide",
    duration: "Jan 2023 - May 2023",
    location: "Tempe, AZ",
    description: [
      "Automated data scraping using Python and BeautifulSoup, processing questionnaire datasets into a format compatible with AI testing software using Pandas.",
      "Generated 5K+ formatted datasets by implementing batch processing techniques, improving model efficiency by 40%."
    ],
    skills: ["Python", "BeautifulSoup", "Pandas", "Data Processing"]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl text-[#1a2332] mb-16 text-center">
          Experience
        </h2>

        <div className="relative">
          {/* Center vertical line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#1a2332] via-gray-300 to-transparent -ml-[1px]"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 top-8 -ml-3 w-6 h-6 rounded-full bg-[#1a2332] border-4 border-[#FDF8F3] z-10 shadow-lg"></div>

                {/* Content card */}
                <div className={`md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                  <div className="bg-[#FDF8F3] rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-[#1a2332]">
                    {/* Company and Position */}
                    <div className="mb-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-[#1a2332] mb-2">
                        {exp.position}
                      </h3>
                      <p className="text-lg md:text-xl text-gray-700 font-medium">
                        {exp.company}
                      </p>
                    </div>

                    {/* Duration and Location */}
                    <div className={`flex flex-wrap gap-4 mb-6 text-sm text-gray-600 ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}>
                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-medium">{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <ul className={`space-y-3 mb-6 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {exp.description.map((item, i) => (
                        <li key={i} className={`flex gap-3 text-gray-700 leading-relaxed ${
                          index % 2 === 0 ? 'md:flex-row-reverse md:text-right' : ''
                        }`}>
                          <span className="text-[#1a2332] font-bold mt-1">▸</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Skills */}
                    {exp.skills && (
                      <div className={`flex flex-wrap gap-2 ${
                        index % 2 === 0 ? 'md:justify-end' : ''
                      }`}>
                        {exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 text-sm font-medium bg-[#1a2332] text-white rounded-full hover:bg-opacity-80 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
