export type EmploymentApplicationField = {
  name: string;
  label: string;
  emailLabel?: string;
  helpText?: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'textarea' | 'radio' | 'checkbox' | 'select';
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  options?: readonly string[];
};

export type EmploymentApplicationContent =
  | EmploymentApplicationField
  | { type: 'heading'; label: string }
  | { type: 'note'; label: string };

export type EmploymentApplicationSection = {
  id: string;
  title: string;
  description?: string;
  content: readonly EmploymentApplicationContent[];
};

const employerFields = (number: 1 | 2 | 3): EmploymentApplicationContent[] => {
  const prefix = `employer${number}`;
  const isMostRecent = number === 1;

  return [
    { type: 'heading', label: isMostRecent ? 'Most recent employer' : `Employer #${number}` },
    {
      name: `${prefix}Name`,
      label: isMostRecent ? 'Most Recent Employer Company Name' : `Employer #${number} Company Name`,
      emailLabel: `Employer #${number} — company name`,
      type: 'text',
      required: isMostRecent,
    },
    {
      name: `${prefix}HireDate`,
      label: number === 2 ? 'Approximate Hire Dates (Start date)' : 'Approximate Hire Date (Start date)',
      emailLabel: `Employer #${number} — approximate hire date`,
      type: 'text',
      required: isMostRecent,
    },
    {
      name: `${prefix}EndDate`,
      label: 'Approximate Finish Date',
      emailLabel: `Employer #${number} — approximate finish date`,
      type: 'text',
      required: isMostRecent,
    },
    {
      name: `${prefix}SupervisorContact`,
      label: "Boss/Supervisor's Name and Phone number",
      emailLabel: `Employer #${number} — boss/supervisor and phone`,
      type: 'text',
      required: isMostRecent,
    },
    {
      name: `${prefix}JobTitle`,
      label: 'Job title',
      emailLabel: `Employer #${number} — job title`,
      type: 'text',
      required: isMostRecent,
    },
    {
      name: `${prefix}StartingPay`,
      label: 'List the Starting Pay',
      emailLabel: `Employer #${number} — starting pay`,
      type: 'text',
      required: isMostRecent,
    },
    {
      name: `${prefix}EndingPay`,
      label: 'List the Ending Pay',
      emailLabel: `Employer #${number} — ending pay`,
      type: 'text',
      required: isMostRecent,
    },
    {
      name: `${prefix}HoursPerWeek`,
      label: 'Hours per week',
      emailLabel: `Employer #${number} — hours per week`,
      type: 'text',
      required: isMostRecent,
    },
    {
      name: `${prefix}Duties`,
      label: 'Job Duties',
      emailLabel: `Employer #${number} — job duties`,
      type: 'textarea',
    },
    {
      name: `${prefix}ReasonForLeaving`,
      label: 'Reason for Leaving',
      emailLabel: `Employer #${number} — reason for leaving`,
      type: 'textarea',
      required: isMostRecent,
    },
  ];
};

const referenceFields = (number: 1 | 2): EmploymentApplicationContent[] => [
  { type: 'heading', label: `Reference #${number}` },
  {
    name: `reference${number}Name`,
    label: `Name of Reference #${number}`,
    emailLabel: `Reference #${number} — name`,
    type: 'text',
    required: true,
  },
  {
    name: `reference${number}Contact`,
    label: 'Phone Number or Email address',
    emailLabel: `Reference #${number} — phone or email`,
    type: 'text',
    required: true,
  },
];

export const employmentApplicationSections: readonly EmploymentApplicationSection[] = [
  {
    id: 'applicant',
    title: 'Applicant information',
    description:
      'Thank you for your interest in working on our team at Manna!\n\nAfter you fill out and submit this application, we will receive it in our office and reach out to those chosen for an interview, via text message. This may take a few days to a few weeks, depending on the amount of applicants, and the immediate need.',
    content: [
      {
        type: 'note',
        label:
          'Please note that ALL CANDIDATES MUST BE:\n\n1. At least 18 years old (graduated) and available during our weekday operating hours.\n2. Have a Social Security number and bank account (for paychecks via direct deposit).\n4. Have reliable transportation.',
      },
      { name: 'fullName', label: 'Full name (first/last)', type: 'text', autoComplete: 'name', required: true },
      {
        name: 'email',
        label: 'Email address',
        helpText: 'We will use this to send you a copy of your application.',
        type: 'email',
        autoComplete: 'email',
        required: true,
      },
      { name: 'primaryPhone', label: 'Primary Phone Number', type: 'tel', autoComplete: 'tel', required: true },
      {
        name: 'address',
        label: 'Address (address, City, State, Zip)',
        type: 'text',
        autoComplete: 'street-address',
        required: true,
      },
      { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', autoComplete: 'bday', required: true },
    ],
  },
  {
    id: 'position',
    title: 'Position & availability information',
    description:
      'Experience in the area(s) for which you are applying is beneficial, but not required. If hired, applicants will receive position-related training specific to Manna.',
    content: [
      {
        name: 'positions',
        label: 'Position(s) You Are Applying For',
        type: 'checkbox',
        required: true,
        options: ['Baker', 'Barista', 'Customer Service', 'Cook', 'Manager', 'Looking for anything', 'Other'],
      },
      {
        name: 'baristaLatteArtSkill',
        label: 'Barista Latte Art Skill Level',
        helpText: "Please indicate your skill level if you're applying for a Barista position",
        type: 'radio',
        options: [
          'None-(not my thing)',
          'None-(but interested and willing to learn)',
          'Beginner (can sometimes produce simple designs but not consistently, )',
          'Intermediate (can produce 1-2 simple textured milk designs consistently)',
          'Advanced (can produce several intricate designs and very comfortable with each one)',
          'Other',
        ],
      },
      {
        name: 'baristaEspressoSkill',
        label: 'Barista Dial-in Espresso Skill level/interest',
        helpText: "Please indicate your dial-in skill level if you're applying for a Barista position",
        type: 'radio',
        options: [
          'None-(not my thing)',
          'None-(but interested and willing to learn)',
          'Some experience/interest',
          'Seasoned and comfortable at dialing in espresso',
          'Other',
        ],
      },
      {
        name: 'bakingSkill',
        label: "Baking Skill Level (Please indicate your skill level if you're applying for a Baker position)",
        type: 'radio',
        options: [
          'None (not my thing)',
          'None (no experience baking, but willing to learn)',
          'Beginner (baked things from a box mix, simple baked goods like cookies/brownies/bars)',
          'Intermediate (baked yeast breads/rolls, and med. complex items like sourdough, scones, cakes, cheesecake etc)',
          'Advanced (highly skilled in croissant lamination, macarons, pate au choux, puff pastry etc.)',
          'Other',
        ],
      },
      {
        name: 'availabilityType',
        label: 'Availability',
        helpText: 'Please mark how much time you are ABLE to offer to serve in this job',
        type: 'checkbox',
        required: true,
        options: ['Full-Time (35-40 hours)', 'Part-Time (25-35 hours)', 'Light hours (15-25)', 'Other'],
      },
      {
        name: 'idealHours',
        label: 'Your ideal minimum/max hours',
        helpText: 'Please indicate your PREFERRED number of hours per week',
        type: 'text',
        required: true,
      },
      {
        name: 'anticipatedLength',
        label: 'If hired, how long do you anticipate working at Manna?',
        type: 'radio',
        required: true,
        options: [
          'Seasonal (2-3 months)',
          'Short-term (3-6 months)',
          'Long-term (hopefully a year or more, if it works out great)',
        ],
      },
      {
        name: 'startDate',
        label: 'Date you are available to start working',
        type: 'date',
        required: true,
      },
      { type: 'heading', label: 'Daily availability' },
      {
        type: 'note',
        label:
          "Please list your daily availability, and what days you are unavailable. (Manna's different shifts range from 4 a.m. to 5 p.m. , depending on the job).\n\nAs a Christian organization, we are always closed on Sundays.",
      },
      {
        name: 'weekdayAvailability',
        label: 'My WEEKDAYS Availability: (ie 4am - 5pm)',
        type: 'text',
        required: true,
      },
      {
        name: 'saturdayAvailability',
        label:
          'My SATURDAY Availability: (ie 4am - 5pm) Please note that Saturdays are our busiest day, and therefore important for applicants to be available on that day, in many of our hiring positions.',
        type: 'text',
        required: true,
      },
      {
        name: 'regularlyUnavailable',
        label: 'Days/Times Regularly UNAVAILABLE (i.e. "I\'m unavailable Wednesdays from 12-4:00"):',
        type: 'text',
        required: true,
      },
    ],
  },
  {
    id: 'employment',
    title: 'Employment history',
    description: 'Please list your past employers and what you did in those positions',
    content: [...employerFields(1), ...employerFields(2), ...employerFields(3)],
  },
  {
    id: 'questions',
    title: 'Questions',
    description: 'Answer all questions below as completely as possible.',
    content: [
      { name: 'originallyHeardAboutManna', label: 'How did you originally hear about Manna?', type: 'textarea' },
      { name: 'whyManna', label: 'Why do you want to work at Manna?', type: 'textarea', required: true },
      {
        name: 'strengths',
        label: 'What strengths and/or qualities do you offer to the Manna team?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'extensiveTimeOff',
        label:
          'List any large-scale upcoming events for which you will need to request extensive time off from work (i.e., family vacations, mission trips, surgical medical procedures, etc.)?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'urgentCancellations',
        label:
          'Do you experience any ongoing or periodic situations that occur, for which you urgently need to cancel from work on short notice (i.e., migraines, family crisis issues, mental health episodes, unreliable transportation, urgent pet care, child care, etc.)?',
        type: 'textarea',
        required: true,
      },
      {
        name: 'scheduleFlexibility',
        label: 'How much flexibility will you need for your work schedule vs your life schedule?',
        type: 'radio',
        required: true,
        options: [
          'A lot. My family has a lot of demands and responsibilities, and I will be working this job around those',
          'Medium. I have school or other responsibilities on a regular schedule.',
          'My schedule is wide open. Easily applied to Manna’s work schedule',
          'Other',
        ],
      },
      {
        name: 'professionalImprovement',
        label: 'Describe one habit or area in your professional life that you feel you would like to improve upon.',
        type: 'textarea',
        required: true,
      },
      {
        name: 'certifications',
        label: "Do you have a current and active Food Handler’s or Food Manager's Certificate?",
        type: 'checkbox',
        required: true,
        options: [
          "Active Food Handler's Certificate",
          "Active Food Manager's Certificate",
          'Neither one, but I am willing to become certified upon hire',
        ],
      },
    ],
  },
  {
    id: 'references',
    title: 'Personal references',
    description:
      'List 2 personal references who will testify to your character (ex. pastor, previous employer, youth director, scout leader, teachers, people you’ve volunteered with, co-worker, etc.).',
    content: [...referenceFields(1), ...referenceFields(2)],
  },
  {
    id: 'fit',
    title: "Please tell us a bit more about why you're here today",
    content: [
      {
        name: 'visitedManna',
        label: 'Have you been to Manna before?',
        type: 'radio',
        required: true,
        options: ['Not yet', 'Yes, once', 'Yes, multiple times', 'Other'],
      },
      {
        name: 'goalsAtManna',
        label: 'If hired, what do you hope to gain most from your time at Manna?',
        helpText: 'Please mark all that apply',
        type: 'checkbox',
        required: true,
        options: [
          'Financial security',
          'A pleasant environment in which to spend my days',
          'Sharpening my gifts and skills',
          'Building people',
          'Building faith',
          'Learning about small business growth',
          'Moving into leadership positions at Manna',
          'Other',
        ],
      },
      {
        name: 'highestPriority',
        label: 'Of the above, which one is highest priority to you right now, and why?',
        type: 'textarea',
        required: true,
      },
      {
        type: 'note',
        label:
          'Thank you for taking time to apply at Manna Bread from Heaven!\n\nRecommended: If you wish to proactively follow-up after submitting this application, please email us your questions, thoughts, resume etc. at: support@mannabreadfromheaven.com',
      },
    ],
  },
] as const;

export function isEmploymentApplicationField(
  content: EmploymentApplicationContent,
): content is EmploymentApplicationField {
  return content.type !== 'heading' && content.type !== 'note';
}

export const employmentApplicationFields = employmentApplicationSections.flatMap((section) =>
  section.content.filter(isEmploymentApplicationField),
);

export const employmentRequiredFields = employmentApplicationFields.filter((field) => field.required);
