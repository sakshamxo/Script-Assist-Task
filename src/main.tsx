import {Component, StrictMode} from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import Landing from './pages/landing/Landing';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import StarshipDetail from './pages/resource/StarshipDetail';



export const routes = [
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Landing />
			},
			{
				path: '/login', 
				element: <Login />
			},
			{
        path: '/dashboard',
        element: <ProtectedRoute />,
				children: [
					{
            path: '',
            element: <Dashboard /> ,
          },
        ]
      },
			{
				path: '/starship/:id', 
				element: <StarshipDetail />
			},
		]
	}
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
