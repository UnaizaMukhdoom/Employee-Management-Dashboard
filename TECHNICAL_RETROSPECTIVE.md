Employee Management Dashboard

The Employee Management Dashboard was built using Next.js, React, Tailwind CSS, Axios, Recharts, and the JSONPlaceholder API. The goal was to create a responsive, API-driven dashboard where users can search, filter, sort, and explore employee information efficiently.

During development, one of the main challenges was understanding the App Router structure in Next.js and deciding when a component needed to be a Client Component versus a Server Component. I also had to learn how to fetch data from an external API properly, manage loading and error states, and keep search, filtering, sorting, and pagination working together correctly instead of conflicting with each other.

To improve maintainability, I separated the application into components such as Sidebar, Dashboard Cards, Search Bar, Sort Control, Employee Table, Pagination, and an Employee Modal that fetches that specific employee's posts on demand. I also moved data-fetching logic into custom hooks, so each component stays focused on either displaying data or managing one piece of the UI — not both.

Through this project, I strengthened my understanding of React Hooks, component composition, routing, API integration, responsive design, and debugging real build errors. I also became more confident using Git and GitHub, including resolving a merge conflict, and deploying an application with Vercel.

If more time were available, I would add real authentication, full CRUD functionality connected to a real backend, role-based access control, export features, and I would centralize a few pieces of logic (like the active/inactive status calculation) that currently exist in more than one component.

Overall, this project improved my practical frontend development skills and gave me hands-on experience building a structured, API-driven dashboard using modern web technologies.