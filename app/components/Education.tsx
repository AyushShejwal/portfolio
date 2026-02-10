'use client';

interface EducationItem {
  degree: string;
  university: string;
  duration: string;
  classes?: string[];
  details: string[];
}

const educationData: EducationItem[] = [
  {
    degree: "Master of Mathematics (MMath) in Computer Science",
    university: "UNIVERSITY OF WATERLOO",
    duration: "September 2020 - September 2023",
    details: [
      "Thesis-based master's program co-supervised by Prof. Daniel Vogel & Prof. Craig Kaplan",
      "Research area: Human-Computer Interaction, XR and creativity",
      "Thesis: Perceptual Allowances of Anamorphic Interaction Cues in Spatial Augmented Reality",
      "GPA: 4.0/4.0 | 95.5%",
      "Breaks in Summer 2021, Summer 2022, and Fall 2022 for research internships"
    ]
  },
  {
    degree: "Honours Bachelor of Science (HBSc) in Computer Science",
    university: "UNIVERSITY OF TORONTO",
    duration: "September 2015 - June 2020",
    details: [
      "Specialist in Computer Science with a Computer Vision focus",
      "Graduated with High Distinction",
      "Completed a year-long PEY co-op internship (2018-2019)",
      "Dean's List (2016, 2017), President's Entrance Scholarship (2015), Friends of Victoria University Library Scholarship (2016), Canada Chinese Computer Association Scholarship (2016)"
    ]
  }
];

const Education = () => {
  return (
    <section className="py-20 bg-[#F0F9FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-16">Education</h2>
        
        <div className="grid grid-cols-1 gap-8">
          {educationData.map((edu, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-lg p-8 shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] transition-all duration-300">
                <div className="flex flex-col gap-4">
                  {/* Header */}
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                      {edu.degree}
                    </h3>
                    <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                      {edu.university}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full w-fit">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-600">{edu.duration}</span>
                  </div>

                  {/* Details */}
                  <ul className="mt-4 space-y-3">
                    {edu.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-gray-400 mt-1">•</span>
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education; 