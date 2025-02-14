# Starship Explorer

Explore detailed information about Star Wars starships with Starship Explorer, built using React, TypeScript, Mantine UI, and React Query.

## 🚀 Live Demo
[Starship Explorer Live](https://67afbd78370323b1f6883a0d--relaxed-caramel-f26df8.netlify.app/)

## 🛠️ Features

- Search and filter Star Wars starships
- View detailed information about each starship
- Pilot and film lists with dynamic fetching
- Clean and responsive UI with Mantine
- Efficient data fetching with React Query
- Caching and performance optimizations
- Developed for Script Assist

## 🏗️ Tech Stack

- **Frontend:** React, TypeScript
- **State Management:** Zustand
- **Data Fetching:** React Query
- **UI Library:** Mantine UI
- **Developer Tool:** Script Assist

## ⚙️ How React Query Works

React Query is used to handle asynchronous data fetching, caching, and state synchronization in this project. 

### 🔍 Explanation:
- **Fetching:** We use `useQuery` to fetch starship details, pilots, and films.
- **Caching:** React Query caches the responses to minimize API calls for better performance.
- **Automatic Updates:** Data is refetched when dependencies change or the cache is invalidated.
- **Error Handling:** Built-in error handling simplifies API interaction.

### Example Code:
```tsx
const { data, isLoading, isError } = useQuery(['starship', id], fetchStarshipDetails);
```
- If `isLoading` is true, a loader is displayed.
- If `isError` is true, an error message is shown.
- Once data is available, starship details are rendered.

## 🙌 Acknowledgment

I would like to sincerely thank **Script Assist** for providing me with the opportunity to work on this project as part of the interview process. This task allowed me to enhance my skills, explore new technologies, and build a functional React application. I am grateful for the chance to demonstrate my abilities through this assignment.

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/starship-explorer.git
cd starship-explorer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## ⚙️ Usage

- Search for starships using the search bar.
- Filter by manufacturer or crew size.
- Click on a starship for more details.

## 🔑 Environment Variables

No environment variables are required for this project.

## 🧪 Testing

To run tests (if available):
```bash
npm test
```

## 🚚 Deployment

Deployed using [Netlify](https://www.netlify.com/).

## 📖 License

MIT License

---

👨‍💻 Built with 💙 by Saksham Soni

