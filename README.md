# Jobs Agent Frontend:

[Jobs Agent Backend](https://github.com/rom-orlovich/jobs-agent-backend) :point_left:

## About My Project:
The Jobs Agent is a web application designed to help job seekers efficiently search for their next job across multiple online sources that provide job listings. 
Traditional job searches can be time-consuming and involve sifting through hundreds of irrelevant job listings. 

The Jobs Agent addresses this issue by allowing users to fill out their profiles with relevant search queries and using them to scan various job listing sites 
to retrieve all relevant job listings in one place.
The system enables users to filter job listings that match their requirements, making the job search process more streamlined and efficient.

This repository contains the frontend part of the Jobs Agent project.
The frontend part is responsible for displaying the UI of job data, improving the search and filter process for a more user-friendly experience, and enabling users track their job search process in the jobs they send already their CV.


## Main Features:

- **Users System** :
 - Users can log in with their Google account, create their own private user account.
 - The user can create his profile that contains the user's job preferences, which the backend algorithm uses to identify which jobs fit the user's profile.
 - The user can create search queries with criteria on how to search jobs in the jobs listing sites. 
- **Job Display** - The application displays the founded jobs, and the user can scroll down to load more jobs.
- **Filtering** - The application enables filtering the displayed jobs according to job title, location, the site where the jobs found, company, and by suitability  level.
- **Matching Page** - The page displays only the jobs that match the user's profile.
- **Tracking Page** : 
     - Each job post has a track button that the user can click to save the job post in their profile.
     - The tracking job posts display in the Tracking page. 
     - In the Tracking page, the user can click on the "Add Info" button to add information on how the job search process is progressing after the user sends their CV to the job.
- **Search History** :
- The Search History page displays the user's search history.
- The user can easily get the results from his history searches.
- The user can edit these queries and create a new query based on them. 
- The user can also delete old queries and download the data of those old queries if the data exists.


## Technologies:

- [Next.js](https://nextjs.org/)- A React-based framework used for building server-side rendered and optimized web applications
- [TypeScript](https://www.typescriptlang.org/) - For type checking and improved developer productivity.
- [MongoDB](https://www.mongodb.com/) - A NoSQL database that is used to store users' account data.

## Packages:
  - [React](https://reactjs.org/) - A JavaScript library used for building user interfaces..
  - [SWR](https://swr.vercel.app/) - For fetching data and caching the response in the client-side, used for improving the performance of the application.
  - [Axios ](https://axios-http.com/docs/intro) - For making API requests to the backend.
  - [Next-Auth](https://next-auth.js.org/getting-started/example) - An authentication library for Next.js applications, used for authenticating users with their Google accounts.
  - [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework used for styling the user interface of the application.
  - [HeadlessUI/React ](https://headlessui.com/) - A collection of accessible UI components for React, used for building the user interface of the application
  - [React-Toastify](https://fkhadra.github.io/react-toastify/introduction/) -For displaying toast messages in the application..
  - [use-debounce](https://www.npmjs.com/package/use-debounce) - For improving the search and filter process by debouncing user's inputs.
  - [React-Icons](https://react-icons.github.io/react-icons/search) - For displaying icons in the application..
  - [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware) -For proxying HTTPS TO HTTP requests to my backend api.
  - [ESLint](https://eslint.org/) - For linting tool for identifying and reporting on patterns in JavaScript code, used for maintaining code quality.
  - [Prettier](https://prettier.io/) - For ensureing consistency in code style and formatting across the project.
  - [Husky](https://www.npmjs.com/package/husky) - For git hooks manager that used for running scripts before git commands.
  - [Lint-staged](https://www.npmjs.com/package/lint-staged) - For running linters against staged git files, used for maintaining code quality.
 
 ## How It Works:

### User Profile Creation:
 - The user logs in with their Google account and fills out their overall years of experience, job requirements, and excluded requirements.
 - The information entered by the user is saved in the database and used by the matching algorithm to filter job postings.
 - The more specific the user's profile, the better the algorithm performs.
### Getting the Results:
 - After clicking on the "Load Scanner" button, the backend scanner scans various job listing sites for jobs that match the user's search criteria.
 - The results are displayed on the "Jobs" page, where the user can filter the jobs further or go to the "Matching" page to see jobs that match their profile.
### Tracking Jobs:
 - If the user finds a job they've already applied for, they can track it by clicking on the "Track" button on the job posting.
 - In the "Tracking" page, users can add additional information on the job application process and see all of their tracked job postings.
### Search History:
 - Users can access their search history, where they can edit, delete, and load previous searches.
 - If there are job postings associated with a previous search, users can download the data as a CSV file.
 

## Installation

1. **Clone the repo**
   ```
   git clone git@github.com:rom-orlovich/jobs-agent-backend.git
   ```
2. **Install all the dependencies**
   ```
   npm run ci
   ```
   
3. **Create .env.local and your mongoDB URI into it**
   ```
   MONGO_DB_URI= <Your URI>
   ```
   
4. **Run Client**

   ```
   npm run dev
   ```

5. **Go to http://localhost:3000 and have fun**!


## What's next?:
1. **Implement end-to-end testing with Cypress** - to ensure that the system is functioning correctly and all features are working as expected.
2. **Style improvements** - Refining the UI to ensure a clean and intuitive experience for users.
3. **New features on demand** - Use user's feedback in order to improve the system. If you have a feature request, please let us know and we'll do our best to consider it for future development.

## Images:

### Home Page

<img alt="Home page" src="./readme-images/home-page.png" width="600" hight="600">

### Search Posts

<img alt="Autocomplete suggesting" src="./readme-images/autocomplete-suggesting.png" width="600" hight="600">
<img alt="Search results" src="./readme-images/search-results.png" width="600" hight="600">

### Mobile Display

<img alt="Mobile display" src="./readme-images/mobile.png" width="600" hight="600">
<img alt="Mobile sideBar" src="./readme-images/mobile-sideBar.png" width="600" hight="600">

### App's Tests

<img alt="Feed test" src="./readme-images/feed-test.png" width="600" hight="600">
<img alt="Search input tests" src="./readme-images/search-input-tests.png" width="600" hight="600">
<img alt="Tests coverage" src="./readme-images/tests-coverage.png" width="600" hight="600">
