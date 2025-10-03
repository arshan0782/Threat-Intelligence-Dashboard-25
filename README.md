 **Threat Intelligence Dashboard (TID)**
**Project Overview**
This project is a modern and interactive web application designed to serve as a dashboard for visualizing threat intelligence data. Built with a robust and scalable architecture, it provides a clean and responsive user interface to help security professionals monitor and analyze key Indicators of Compromise (IOCs) such as malicious IP addresses, URLs, and filenames. The application is centered on delivering an intuitive, high-performance, and data-rich experience with smooth user interactions.

**Technical Stack**
This dashboard is built using a modern front-end stack that emphasizes performance, maintainability, and a superior user experience (UX).

**⚛️ Front-End Core: React with JavaScript**
The application is developed using React.js, a powerful component-based library. The core logic is implemented in JavaScript. The use of components ensures a highly modular and maintainable codebase, where logic is separated (e.g., state in useThreatStore, rendering in IocTable).

🎨 **Styling: Tailwind CSS**
Tailwind CSS is used as a utility-first CSS framework for rapid UI development. This approach ensures a highly consistent and component-based design system, facilitating easy theme management (specifically Dark Mode) via utility props.

🧠 **State Management: Zustand**
Zustand is employed for centralized and lightweight state management. It provides a simple, un-opinionated, and fast solution for handling global states like IOC data, filters, and search terms, resulting in minimal boilerplate and improved debugging.

**✨UI Enhancements & Visualization**
Framer Motion: Integrated for creating smooth and visually engaging animations and transitions (e.g., fading/sliding table rows), significantly enhancing user experience during filtering and sorting.

recharts: Used for generating dynamic data visualizations, including the Pie Chart (IOC Distribution by Type) and Bar Chart/Histogram (IOC Distribution by Source).

React Icons: Provides a vast collection of popular, scalable icons, improving the clarity and aesthetics of the user interface.

**💡 Key Features (Based on Implementation)**
High-Performance Data Handling: Implements useMemo hooks for optimizing expensive operations like filtering, searching, and sorting, ensuring the dashboard remains snappy even with larger datasets.

Dynamic Filtering & Sorting: Comprehensive controls for filtering IOCs by type (IPs, URLs, Domains) and dynamically sorting the table data by value, source, or timestamp.

**Theme Control**: Full support for a dynamic Dark Mode that saves user preference in localStorage.

Efficient Data Handling: Built with an architectural approach that facilitates easy migration from the current mock JSON data to a real-world Server-Side API for true scalability.

**⚙️ Build and Run Instructions**
Prerequisites: Ensure you have Node.js (v14.0 or higher) and a package manager like npm or yarn installed.

Installation:
Bash

git clone [Your-Repository-URL]
cd [Your-Repository-Folder]
npm install
# or yarn install
Run Development Server:
Bash

npm run dev
# or yarn dev
The application will be available at http://localhost:<5173>.

Build for Production:
Bash

npm run build
# or yarn build
## 🖼️ Screenshots  

### 📊 Dashboard Overview  
![Dashboard Screenshot]([./assets/dashboard.png](https://github.com/arshan0782/Threat-Intelligence-Dashboard-25/blob/2f4d2f1694b0d12919f37d6f03b68d26b1980bea/Screenshot%202025-10-03%20091056.png))  

### 🔍 Search & Filter Feature  
![Search Filter Screenshot](./assets/search-filter.png)  

### 🌍 IP Mapping View  
![IP Mapping Screenshot](./assets/ip-mapping.png)  
