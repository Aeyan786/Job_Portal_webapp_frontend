# JobSite - Frontend

This is the frontend of **JobSite**, a simple job portal that connects applicants with recruiters. It’s built using **React.js**, **Tailwind CSS**, and **ShadCN UI** for a clean and responsive UI.

## 🔑 Features (for Applicants)

- View all available jobs without logging in
- View job details
- After login:
  - Apply to jobs
  - See the status of each application (Pending / Accepted / Rejected)
  - Edit personal profile: name, email, phone number, skills, resume, profile picture, and bio

## 👨‍💼 Features (for Recruiters)

- Create, update, and delete companies
- Create, update, and delete jobs (only after creating a company)
- Can only delete a company after removing all its jobs
- View applicants who applied to a job
- See applicant details (name, email, resume, etc.)
- Update application status (default is Pending → can be set to Accepted or Rejected)

## 🔐 Access Control

- Public users can only view jobs
- Applying to jobs or accessing dashboards requires login
- Role-based features (applicant vs recruiter)

## ⚙️ Tech Stack

- React.js
- Tailwind CSS
- ShadCN UI
- Axios (for API calls)
- React Router

## 🌐 Live Demo

- Backend is deployed on **Railway**
- Frontend is deployed on **Vercel**  
🔗 [jobsite-frontend.vercel.app](https://job-portal-webapp-frontend.vercel.app)


## 🏁 Getting Started

```bash
npm install
npm run dev
