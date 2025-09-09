import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from './theme.ts'
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router'
import LoginPage from './pages/login/index.tsx'
import MailboxPage from './pages/mailbox/index.tsx'
import MailboxTable from './pages/mailbox/mailbox-table.tsx'
import ComposeEmail from './pages/mailbox/compose-email.tsx'
import ViewEmail from './pages/mailbox/view-email.tsx'
import { useAuthStore } from './store/index.ts'

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <App />,
        children: [
          {
            index: true,
            element: <Navigate to="mailbox" replace />,
          },
          {
            path: 'mailbox',
            element: <MailboxPage />,
            children: [
              {
                path: ':folderId',
                element: <MailboxTable />,
              },
              {
                path: ':folderId/:emailId',
                element: <ViewEmail />,
              },
              {
                path: 'compose',
                element: <ComposeEmail />,
              },
              {
                index: true,
                element: <Navigate to="inbox" replace />,
              },
            ],
          }
        ],
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>,
)
