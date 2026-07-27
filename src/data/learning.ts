export interface LearningModule {
  title: string;
  description: string;
  pathway: string;
}

export interface LearningPathway {
  title: string;
  description: string;
  progression: string[];
  buttonLabel: string;
  href?: string;
}

export const learningModules: LearningModule[] = [
  {
    title: 'Number Skills',
    description: 'Strengthen essential number skills, including calculations, fractions, decimals and percentages.',
    pathway: 'Part of the GCSE Foundation Maths pathway'
  },
  {
    title: 'Algebra Foundations',
    description: 'Learn the core algebra skills needed for equations, graphs and GCSE problem solving.',
    pathway: 'Part of the GCSE Maths pathways'
  },
  {
    title: 'Python Foundations',
    description: 'Learn variables, input, output, selection and repetition through practical coding activities.',
    pathway: 'Part of the Python Coding pathway'
  },
  {
    title: 'Problem-Solving Foundations',
    description: 'Develop logical thinking, reasoning and strategies for solving unfamiliar problems.',
    pathway: 'Part of the Problem Solving pathway'
  },
  {
    title: 'Introduction to AI',
    description: 'Understand what artificial intelligence is, how it is used and how to use AI tools responsibly.',
    pathway: 'Part of the Artificial Intelligence pathway'
  }
];

export const learningPathways: LearningPathway[] = [
  {
    title: 'GCSE Foundation Maths',
    description: 'Build the core skills needed for GCSE Foundation Maths through focused modules covering number, algebra, ratio, geometry, statistics and probability.',
    progression: ['Number Skills', 'Fractions and Percentages', 'Algebra Foundations', 'GCSE Foundation Preparation'],
    buttonLabel: 'Explore Foundation Maths',
    href: '/subjects/mathematics'
  },
  {
    title: 'GCSE Higher Maths',
    description: 'Develop advanced GCSE Maths skills through structured modules in algebra, geometry, trigonometry, statistics and problem solving.',
    progression: ['Core Algebra', 'Graphs and Equations', 'Geometry and Trigonometry', 'GCSE Higher Preparation'],
    buttonLabel: 'Explore Higher Maths',
    href: '/subjects/mathematics'
  },
  {
    title: 'Python Coding',
    description: 'Learn Python step by step, from basic programming concepts to practical projects and problem solving.',
    progression: ['Python Foundations', 'Selection and Loops', 'Functions and Data', 'Python Projects'],
    buttonLabel: 'Explore Python Coding',
    href: '/subjects/computer-science'
  },
  {
    title: 'Problem Solving',
    description: 'Develop logical thinking, mathematical reasoning and practical strategies for approaching unfamiliar problems.',
    progression: ['Problem-Solving Foundations', 'Number Challenges', 'Logic and Reasoning', 'Applied Projects'],
    buttonLabel: 'Explore Problem Solving'
  },
  {
    title: 'Artificial Intelligence',
    description: 'Learn the foundations of AI, explore how AI systems are used and develop responsible practical skills.',
    progression: ['Introduction to AI', 'AI Tools', 'Data and Machine Learning', 'Applied AI Projects'],
    buttonLabel: 'Explore AI',
    href: '/subjects/ai-machine-learning'
  }
];
