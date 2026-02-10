'use client';

import Image from 'next/image';

interface Project {
  id: number;
  name: string;
  image: string;
  skills: string[];
}

const Projects = () => {
  const getSkillIcon = (skill: string): React.ReactNode => {
    // Map skill names to image filenames
    const skillImageMap: { [key: string]: string } = {
      'React': 'react.jpg',
      'Node.js': 'nodejs.png',
      'MongoDB': 'mongodb.png',
      'Supabase': 'supabase.png',
      'Vercel': 'vercel.png'
    };

    const imagePath = skillImageMap[skill];

    if (imagePath) {
      return (
        <div className="relative w-8 h-8">
          <Image
            src={`/skills/${imagePath}`}
            alt={skill}
            fill
            className="object-contain"
          />
        </div>
      );
    }

    // Fallback for skills without images
    return <span className="text-sm px-3 py-1 bg-black text-white rounded-full">{skill}</span>;
  };

  const projects: Project[] = [
    {
      id: 1,
      name: 'Project One',
      image: '/images/image1.png',
      skills: ['React', 'TypeScript', 'Tailwind CSS']
    },
    {
      id: 2,
      name: 'Project Two',
      image: '/images/image1.png',
      skills: ['Next.js', 'Node.js', 'MongoDB']
    },
    {
      id: 3,
      name: 'Project Three',
      image: '/images/image1.png',
      skills: ['Python', 'Django', 'PostgreSQL']
    },
    {
      id: 4,
      name: 'Project Four',
      image: '/images/image1.png',
      skills: ['React Native', 'Firebase', 'Redux']
    },
    {
      id: 5,
      name: 'Project Five',
      image: '/images/image1.png',
      skills: ['Vue.js', 'Express', 'MySQL']
    },
    {
      id: 6,
      name: 'Project Six',
      image: '/images/image1.png',
      skills: ['Flutter', 'Dart', 'AWS']
    }
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl lg:text-7xl text-[#1a2332] mb-12 text-center">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#FDF8F3] rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer shadow-lg"
            >
              {/* Project Image */}
              <div className="relative h-48 w-full bg-gray-200">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-2xl md:text-3xl text-[#1a2332] mb-4">
                  {project.name}
                </h3>

                {/* Skills Icons */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {project.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center"
                      title={skill}
                    >
                      {getSkillIcon(skill)}
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-300 my-4"></div>

                {/* Links */}
                <div className="flex gap-4">
                  {/* GitHub Link */}
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1a2332] hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>

                  {/* External Link */}
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1a2332] hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
