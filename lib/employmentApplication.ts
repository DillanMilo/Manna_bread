export type EmploymentApplicationField = {
  name: string;
  label: string;
  emailLabel?: string;
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

const timeOptions = [
  '3 am',
  '4 am',
  '5 am',
  '6 am',
  '7 am',
  '8 am',
  '9 am',
  '10 am',
  '11 am',
  '12 pm',
  '1 pm',
  '2 pm',
  '3 pm',
  '4 pm',
  '5 pm',
  '6 pm',
] as const;

const availabilityFields: EmploymentApplicationField[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
].flatMap((day) => {
  const key = day.toLowerCase();

  return [
    {
      name: `${key}From`,
      label: `${day} from`,
      type: 'select' as const,
      options: timeOptions,
    },
    {
      name: `${key}To`,
      label: `${day} to`,
      type: 'select' as const,
      options: timeOptions,
    },
  ];
});

const employerFields = (number: 1 | 2): EmploymentApplicationContent[] => {
  const prefix = `employer${number}`;
  const suffix = number === 1 ? ' (current or most recent)' : '';

  return [
    { type: 'heading', label: `Employer #${number}${suffix}` },
    { name: `${prefix}Name`, label: 'Employer name', emailLabel: `Employer #${number} — name`, type: 'text' },
    { name: `${prefix}HireDate`, label: 'Hire date', emailLabel: `Employer #${number} — hire date`, type: 'date' },
    {
      name: `${prefix}EndDate`,
      label: number === 1 ? 'End date (leave blank if currently employed)' : 'End date',
      emailLabel: `Employer #${number} — end date`,
      type: 'date',
    },
    { name: `${prefix}Address`, label: 'Address', emailLabel: `Employer #${number} — address`, type: 'text' },
    { name: `${prefix}City`, label: 'City', emailLabel: `Employer #${number} — city`, type: 'text' },
    { name: `${prefix}State`, label: 'State', emailLabel: `Employer #${number} — state`, type: 'text' },
    { name: `${prefix}ZipCode`, label: 'Zip code', emailLabel: `Employer #${number} — zip code`, type: 'text' },
    {
      name: `${prefix}Supervisor`,
      label: "Supervisor's name",
      emailLabel: `Employer #${number} — supervisor`,
      type: 'text',
    },
    {
      name: `${prefix}Phone`,
      label: 'Employer phone number',
      emailLabel: `Employer #${number} — phone`,
      type: 'tel',
    },
    { name: `${prefix}JobTitle`, label: 'Job title', emailLabel: `Employer #${number} — job title`, type: 'text' },
    { name: `${prefix}StartingPay`, label: 'Starting pay', emailLabel: `Employer #${number} — starting pay`, type: 'text' },
    { name: `${prefix}EndingPay`, label: 'Ending pay', emailLabel: `Employer #${number} — ending pay`, type: 'text' },
    { name: `${prefix}HoursPerWeek`, label: 'Hours per week', emailLabel: `Employer #${number} — hours per week`, type: 'text' },
    { name: `${prefix}Duties`, label: 'Job duties', emailLabel: `Employer #${number} — job duties`, type: 'textarea' },
    {
      name: `${prefix}ReasonForLeaving`,
      label: 'Reason for leaving',
      emailLabel: `Employer #${number} — reason for leaving`,
      type: 'textarea',
    },
  ];
};

const referenceFields = (number: 1 | 2 | 3): EmploymentApplicationContent[] => [
  { type: 'heading', label: `Reference #${number}` },
  {
    name: `reference${number}Name`,
    label: 'Name',
    emailLabel: `Reference #${number} — name`,
    type: 'text',
    required: true,
  },
  {
    name: `reference${number}Phone`,
    label: 'Phone number',
    emailLabel: `Reference #${number} — phone`,
    type: 'tel',
    required: true,
  },
  {
    name: `reference${number}Email`,
    label: 'Email address',
    emailLabel: `Reference #${number} — email`,
    type: 'email',
    required: true,
  },
];

export const employmentApplicationSections: readonly EmploymentApplicationSection[] = [
  {
    id: 'applicant',
    title: 'Applicant information',
    content: [
      { name: 'firstName', label: 'First name', type: 'text', autoComplete: 'given-name', required: true },
      { name: 'middleInitial', label: 'Middle initial', type: 'text', autoComplete: 'additional-name' },
      { name: 'lastName', label: 'Last name', type: 'text', autoComplete: 'family-name', required: true },
      { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', required: true },
      { name: 'primaryPhone', label: 'Primary phone number', type: 'tel', autoComplete: 'tel', required: true },
      { name: 'address', label: 'Address', type: 'text', autoComplete: 'street-address', required: true },
      { name: 'city', label: 'City', type: 'text', autoComplete: 'address-level2', required: true },
      { name: 'state', label: 'State', type: 'text', autoComplete: 'address-level1', required: true },
      { name: 'zipCode', label: 'Zip code', type: 'text', autoComplete: 'postal-code', required: true },
      {
        name: 'atLeast18',
        label: 'Are you at least 18 years old?',
        type: 'radio',
        required: true,
        options: ['Yes', 'No'],
      },
    ],
  },
  {
    id: 'position',
    title: 'Position & availability information',
    description:
      'Experience in the area you are applying for is helpful, but not required. If hired, you will receive position-related training specific to Manna.',
    content: [
      {
        name: 'positions',
        label: 'Position(s) you are applying for',
        type: 'checkbox',
        required: true,
        options: ['Baker', 'Cashier', 'Kitchen Hand'],
      },
      {
        name: 'bakingSkill',
        label: 'Baking skill',
        type: 'radio',
        required: true,
        options: ['None', 'Beginner', 'Intermediate', 'Advanced'],
      },
      {
        name: 'availabilityType',
        label: 'Availability',
        type: 'checkbox',
        required: true,
        options: ['Full-Time', 'Part-Time', 'Temporary/Seasonal'],
      },
      {
        name: 'weeklyHours',
        label: 'Total number of hours you are available to work each week',
        type: 'text',
        required: true,
      },
      {
        name: 'startDate',
        label: 'Date you are available to start working',
        type: 'date',
        required: true,
      },
      {
        type: 'note',
        label:
          'List the times for each day you are available to work. If you are not available on a day, leave it blank. Manna is closed on Sundays.',
      },
      ...availabilityFields,
    ],
  },
  {
    id: 'employment',
    title: 'Employment history',
    content: [...employerFields(1), ...employerFields(2)],
  },
  {
    id: 'questions',
    title: 'Questions',
    description: 'Answer the questions below as completely as possible.',
    content: [
      { name: 'originallyHeardAboutManna', label: 'How did you originally hear about Manna?', type: 'textarea' },
      { name: 'whyManna', label: 'Why do you want to work at Manna?', type: 'textarea' },
      {
        name: 'anticipatedLength',
        label: 'If hired, how long do you anticipate working at Manna (short-term, long-term, seasonal)?',
        type: 'textarea',
      },
      {
        name: 'bakingTraining',
        label: 'Explain any formal baking certificates or training you have received.',
        type: 'textarea',
      },
      {
        name: 'bakedFromScratch',
        label: 'What kinds of things have you baked from scratch?',
        type: 'checkbox',
        options: ['Cookies', 'Cakes', 'Confections', 'Quick Breads', 'Yeast Breads', 'Sourdough', 'Puff Pastries', 'Laminated Pastries', 'Other'],
      },
      {
        name: 'strengths',
        label: 'What strengths and/or qualities do you offer to the Manna team?',
        type: 'textarea',
      },
      {
        name: 'upcomingUnavailableDates',
        label: 'List any upcoming dates for which you will be unavailable to work.',
        type: 'textarea',
      },
      {
        name: 'professionalImprovement',
        label: 'Describe one habit or area in your professional life that you feel needs improvement.',
        type: 'textarea',
      },
      {
        name: 'foodHandlerPermit',
        label: "Do you have a current Food Handler's Permit?",
        type: 'radio',
        options: ['Yes', 'No'],
      },
      {
        name: 'foodHandlerCertificationDate',
        label: 'If yes, what is the approximate certification date?',
        emailLabel: "Food Handler's Permit — approximate certification date",
        type: 'date',
      },
      {
        name: 'foodManagerPermit',
        label: "Do you have a current Food Manager's Permit?",
        type: 'radio',
        options: ['Yes', 'No'],
      },
      {
        name: 'foodManagerCertificationDate',
        label: 'If yes, what is the approximate certification date?',
        emailLabel: "Food Manager's Permit — approximate certification date",
        type: 'date',
      },
    ],
  },
  {
    id: 'references',
    title: 'Personal references',
    description:
      'List three personal references who can speak to your character, such as a pastor, teacher, volunteer leader, or former coworker.',
    content: [...referenceFields(1), ...referenceFields(2), ...referenceFields(3)],
  },
  {
    id: 'source',
    title: 'How did you learn about this job posting?',
    content: [
      {
        name: 'jobPostingSource',
        label: 'Choose all that apply',
        type: 'checkbox',
        options: [
          'I received a text directly from Manna',
          'A friend or family member told me that Manna is hiring',
          'I walked into Manna and saw the sign',
          "I saw it on Manna's website",
          "I saw it on Manna's Facebook page",
          'I saw it as a job posting on Facebook Jobs',
          'Other',
        ],
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
