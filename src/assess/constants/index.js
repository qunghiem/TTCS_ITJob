import config from '~/config';

// header
const CITIES = ['All Cities', 'Ho Chi Minh', 'Ha Noi', 'Da Nang', 'Others'];

const JOBS = [
  {
    title: 'Jobs by Skill',
    searchBy: 'skills',
    data: [
      'Java',
      'PHP',
      'JavaScript',
      'HTML5',
      'Manager',
      'SQL',
      'Android',
      'iOS',
      'MySQL',
      'Tester',
      'English',
      'Ruby',
      'Python',
      'Mobile Apps',
      'Ruby on Rails',
      'QA QC',
      'Database',
      '.NET',
      'Business Analyst',
      'Linux',
      'Team Leader',
      'NodeJS',
      'System Engineer',
      'Designer',
      'UI-UX',
      'Project Manager',
      'OOP',
      'Oracle',
      'MVC',
      'ReactJS',
      'Embedded',
      'J2EE',
    ],
    viewAll: 'skill',
  },
  {
    title: 'Job by Title',
    searchBy: 'title',
    data: [
      'Java Developer',
      'PHP Developer',
      'Javascript Developer',
      'ReactJS Developer',
      'HTML5 Developer',
      'SQL Developer',
      'Android Developer',
      'iOS Developer',
      'Ruby Developer',
      'Python Developer',
      'Ruby On Rails Developer',
      '.NET Developer',
      'NodeJS Developer',
      'Linux Developer',
      'OOP Developer',
      'Oracle Developer',
      'C++ Developer',
      'Wordpress Developer',
      'Designer',
      'Database Administrator',
      'Mobile Apps Developer',
      'Project Manager',
      'Product Owner',
      'Bridge Engineer',
    ],
    viewAll: 'title',
  },
  {
    title: 'Jobs by Company',
    searchBy: 'company',
    data: [
      'Hanwha Financial Technology',
      'Bstar Solutions',
      'ECR VIETNAM CO., LTD',
      'MONEX JSC',
      'SMART - SOLUTIONS',
      'TJ Tech',
      'bbv Vietnam',
      'VNIB Tech',
      'Alpha Networks Solution',
      'Athena Studio',
      'PVcomBank',
      'Parcel Perform',
      'Zalo',
      'Simple Tech Investment',
      'ShopBack',
      'Saigon Technology',
    ],
    viewAll: 'company',
  },
  {
    title: 'Jobs by City',
    searchBy: 'location',
    data: CITIES,
  },
];

const IT_COMPANIES = [
  {
    title: 'Vietnam Best IT Companies',
    to: config.routes.bestCompanies,
    data: ['Best IT Companies 2022', 'Best IT Companies 2021', 'Best IT Companies 2020', 'Best IT Companies 2019'],
  },
  { title: 'Company Reviews', to: config.routes.reviewCompany },
];

const HEADER_MOBILE_MENU = [
  { title: 'All Jobs', to: config.routes.jobs },
  ...JOBS,
  {
    title: 'Vietnam Best IT Companies',
    data: [
      { title: 'Best IT Companies 2022', to: config.routes.bestCompanies },
      { title: 'Best IT Companies 2021', to: config.routes.bestCompanies },
      { title: 'Best IT Companies 2020', to: config.routes.bestCompanies },
      { title: 'Best IT Companies 2019', to: config.routes.bestCompanies },
    ],
  },
  { title: 'Company Reviews', to: config.routes.reviewCompany },
  { title: 'Blog', to: config.routes.blog },
];

// filtered jobs
const FILTER_TITLES = {
  level: 'Job Level',
  salary: 'Salary Range',
  companyType: 'Company Type',
};

const FILTERS = [
  {
    title: FILTER_TITLES.level,
    data: ['Fresher', 'Junior', 'Senior', 'Manager'],
  },
  {
    title: FILTER_TITLES.salary,
    data: [500, 1000, 2000, 2500],
    leftCharacter: '>=',
    rightCharacter: 'USD',
  },
  {
    title: FILTER_TITLES.companyType,
    data: ['Outsourcing', 'Product'],
  },
];

// export
export { CITIES, JOBS, IT_COMPANIES, FILTERS, FILTER_TITLES, HEADER_MOBILE_MENU };
