/*
  # Add sample job listings

  1. Data Population
    - Adds sample job listings to demonstrate the platform's functionality
    - Includes various job types, companies, and requirements
    - Uses realistic job descriptions and requirements

  2. Security
    - No changes to security policies
    - Uses existing RLS policies
*/

INSERT INTO jobs (title, company, description, requirements, location, type, user_id)
VALUES
  (
    'Full-Stack Engineer Intern',
    'Referrio',
    'We are looking for a highly motivated, self-driven Full-Stack Intern who is passionate about software development and eager to build scalable, high-performance web applications. You will play a key role in developing and optimizing our core platform, working with React on the frontend, FastAPI on the backend, and PostgreSQL for data management.',
    ARRAY['React', 'FastAPI', 'PostgreSQL', 'Python', 'Git'],
    'Remote',
    'internship',
    (SELECT id FROM profiles LIMIT 1)
  ),
  (
    'Senior Frontend Developer',
    'TechCorp',
    'Join our team as a Senior Frontend Developer and help shape the future of our web applications. You will be responsible for architecting and implementing complex user interfaces, mentoring junior developers, and ensuring best practices in frontend development.',
    ARRAY['React', 'TypeScript', 'Next.js', 'Tailwind CSS', '5+ years experience'],
    'San Francisco, CA',
    'full-time',
    (SELECT id FROM profiles LIMIT 1)
  ),
  (
    'Backend Engineer',
    'DataFlow Systems',
    'We are seeking a Backend Engineer to join our growing team. You will be responsible for designing and implementing scalable APIs, optimizing database performance, and maintaining our microservices architecture.',
    ARRAY['Python', 'Django', 'PostgreSQL', 'Redis', 'AWS'],
    'New York, NY',
    'full-time',
    (SELECT id FROM profiles LIMIT 1)
  ),
  (
    'DevOps Engineer',
    'CloudScale',
    'Looking for a DevOps Engineer to help automate our infrastructure and deployment processes. You will work with cutting-edge cloud technologies and help maintain our CI/CD pipelines.',
    ARRAY['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins'],
    'Remote',
    'full-time',
    (SELECT id FROM profiles LIMIT 1)
  ),
  (
    'UI/UX Designer',
    'CreativeMinds',
    'Join our design team to create beautiful and intuitive user interfaces. You will work closely with product managers and developers to bring designs from concept to implementation.',
    ARRAY['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
    'Austin, TX',
    'full-time',
    (SELECT id FROM profiles LIMIT 1)
  );