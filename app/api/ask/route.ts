import { NextRequest, NextResponse } from 'next/server';
import { personalInfo } from '@/app/data/personal-info';

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question || question.trim().length === 0) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    // Prepare context from personal info
    const context = `
You are answering questions about Ayush Sunil Shejwal. Here is his comprehensive information:

PERSONAL INFO:
- Name: ${personalInfo.name}
- Title: ${personalInfo.title}
- Phone: ${personalInfo.phone}
- Email: ${personalInfo.emails.join(', ')}
- LinkedIn: ${personalInfo.linkedin}
- GitHub: ${personalInfo.github}

EDUCATION:
- ${personalInfo.education.degree} from ${personalInfo.education.school}
- Location: ${personalInfo.education.location}
- GPA: ${personalInfo.education.gpa}
- Expected Graduation: ${personalInfo.education.graduation}
- Relevant Coursework: ${personalInfo.education.coursework.join(', ')}

PROFESSIONAL EXPERIENCE:
${personalInfo.experiences.map(exp => `
${exp.role} at ${exp.company} (${exp.period})
Location: ${exp.location}
${exp.description.map(d => '• ' + d).join('\n')}
Skills: ${exp.skills.join(', ')}
`).join('\n')}

PROJECTS:
${personalInfo.projects.map(proj => `
${proj.name} (${proj.type})
${proj.description.map(d => '• ' + d).join('\n')}
Technologies: ${proj.technologies.join(', ')}
`).join('\n')}

TECHNICAL SKILLS:
- Programming: ${personalInfo.skills.programming.join(', ')}
- Frameworks: ${personalInfo.skills.frameworks.join(', ')}
- Databases: ${personalInfo.skills.databases.join(', ')}
- Cloud & DevOps: ${personalInfo.skills.cloud_devops.join(', ')}
- AI/ML & LLMs: ${personalInfo.skills.ai_ml.join(', ')}

LEADERSHIP:
${personalInfo.leadership.map(l => `
- ${l.role} at ${l.organization}: ${l.description}
`).join('\n')}

INTERESTS: ${personalInfo.interests.join(', ')}

Answer the following question naturally and conversationally. Be helpful, friendly, and accurate based on the information provided above.

Question: ${question}
`;

    // Call Groq API
    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      return NextResponse.json(
        { error: 'Groq API key not configured. Please add GROQ_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant answering questions about Ayush Shejwal based on the provided information. Be conversational, friendly, and accurate.'
          },
          {
            role: 'user',
            content: context
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Groq API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from AI' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const answer = data.choices[0]?.message?.content || 'Sorry, I could not generate an answer.';

    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Error in ask API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
