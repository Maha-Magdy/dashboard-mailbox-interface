import { Grid, GridItem } from '@chakra-ui/react'
import Header from './components/layout/header'
import Main from './components/layout/main'
import Sidebar from './components/layout/sidebar'
import { Outlet } from 'react-router'
import { useAuthStore, useMailboxStore, useUIStore } from './store'
import { getCountOfUnreadEmails, initializeEmails } from './services/mailbox'
import { Toaster } from './components/ui/toaster'
import { useEffect } from 'react'

// Initialize the mock email data when the app starts and the user authenticated
initializeEmails();

function App() {
  const { isSidebarOpen } = useUIStore();
  const { user } = useAuthStore();
  const { setUnreadMailsCount } = useMailboxStore();

  useEffect(() => {
    setUnreadMailsCount(getCountOfUnreadEmails(user?.email!));
  }, []);

  return (
    <>
      <Grid templateRows="auto 1fr" minHeight="100vh">
        <Sidebar />

        <GridItem rowSpan={1} pl={{ base: "16", md: isSidebarOpen ? "64" : "16" }}>
          <Header />
        </GridItem>

        <GridItem rowSpan={1}
          pl={{ base: "16", md: isSidebarOpen ? "64" : "16" }}
          maxW={{ base: "100vw", lg: "calc(100vw - 1rem)" }}
        >
          <Main>
            <Outlet />
          </Main>
        </GridItem>
      </Grid>
      <Toaster />
    </>
  )
}

export default App
