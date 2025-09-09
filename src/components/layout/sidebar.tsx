import { Heading, Text, List, Image, Flex, Badge, Box, Link, ScrollArea, chakra, CloseButton, useBreakpointValue, } from "@chakra-ui/react";
import { system } from "../../theme";
import { ArrowDropDownIcon, ArrowLeftIcon, DashboardIcon, DesktopIcon, DiamondIcon, EditIcon, GraphIcon, LaptopIcon, MailIcon, PagesIcon, PieChartIcon, TubeIcon, WorldIcon } from "../../icons";
import sidebarListItemBackground from "../../assets/svgs/sidebar-background-user-list-item.svg";
import type { ReactNode } from "react";
import { NavLink } from "react-router";
import { useAuthStore, useMailboxStore, useUIStore } from "../../store";
import { getEmailsForUser } from "../../services";

interface SidebarItem {
  name: string;
  icon?: ReactNode;
  path: string;
  badge?: { color: string, text: string };
  children?: SidebarItem[];
}

function Sidebar() {
  const { unreadMailsCount } = useMailboxStore();
  const { user } = useAuthStore();
  const inboxCount: number = getEmailsForUser(user?.email!, 'inbox').length;
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  const SidebarItems: SidebarItem[] = [
    {
      name: 'Dashboards',
      icon: <DashboardIcon color={system.token("colors.charcoal.200")} width={18} />,
      path: '',
    },
    {
      name: 'Layouts',
      icon: <DiamondIcon color={system.token("colors.charcoal.200")} width={16} />,
      path: '',
    },
    {
      name: 'Graphs',
      icon: <GraphIcon color={system.token("colors.charcoal.200")} />,
      path: '',
    },
    {
      name: 'Mailbox',
      icon: <MailIcon color={system.token("colors.charcoal.200")} width={18} />,
      path: 'mailbox',
      badge: unreadMailsCount > 0 ? { color: 'orange.300', text: `${unreadMailsCount}/${inboxCount}` } : undefined,
      children: [
        {
          name: 'Inbox',
          path: 'mailbox/inbox'
        },
        {
          name: 'Email view',
          path: 'mailbox'
        },
        {
          name: 'Compose email',
          path: 'mailbox/compose'
        },
        {
          name: 'Email templates',
          path: 'mailbox'
        },
      ]
    },
    {
      name: 'Metrics',
      icon: <PieChartIcon color={system.token("colors.charcoal.200")} width={18} />,
      path: '',
    },
    {
      name: 'Widgets',
      icon: <TubeIcon color={system.token("colors.charcoal.200")} width={14} />,
      path: '',
    },
    {
      name: 'Forms',
      icon: <EditIcon color={system.token("colors.charcoal.200")} width={22} />,
      path: '',
    },
    {
      name: 'App Views',
      icon: <DesktopIcon color={system.token("colors.charcoal.200")} width={18} />,
      path: '',
      badge: { color: 'primary', text: 'SPECIAL' },
    },
    {
      name: 'Documents',
      icon: <PagesIcon color={system.token("colors.charcoal.200")} width={18} />,
      path: '',
    },
    {
      name: 'Locations',
      icon: <WorldIcon color={system.token("colors.charcoal.200")} width={18} />,
      path: '',
    },
    {
      name: 'Systems',
      icon: <LaptopIcon color={system.token("colors.charcoal.200")} width={18} />,
      path: '',
    },
  ];

  return (
    <List.Root variant="plain" bgColor="charcoal.500" position="fixed" height="vh"
      w={isSidebarOpen ? "2xs" : '16'}
      minW={isSidebarOpen ? "2xs" : '16'}
      zIndex={{ base: "overlay", md: "auto" }}
    >
      <List.Item paddingX={isSidebarOpen ? 6 : 4} paddingY={isSidebarOpen ? 10 : 6}
        backgroundColor='charcoal.800' backgroundImage={`url(${sidebarListItemBackground})`} bgRepeat='no-repeat' bgSize='cover' backgroundPositionY='top'>
        {!isSidebarOpen && (
          <Link aria-label="Back to homepage" href="/">
            <chakra.svg width="8" height="3" viewBox="0 0 180 72" fill="null">
              <path d="M13.8835 71.6084H0V0H13.8835V71.6084Z" fill="white" />
              <path d="M95.4778 0V71.6084H81.5942L48.7062 22.2501V71.6084H34.8226V0H48.7062L81.5942 49.3583V0H95.4778Z" fill="white" />
              <path d="M180 42.2794H150.671V71.6084H137.721V42.2794H108.392V29.329H137.721V0H150.671V29.329H180V42.2794Z" fill="white" />
            </chakra.svg>
          </Link>
        )}

        {isSidebarOpen && (
          <Flex width="full" justifyContent="space-between">
            <Flex direction="column" gap={1}>
              <Image
                src={`../src/assets/user-profile-photos/${user?.email.split("@")[0]}.jpg`}
                boxSize="50px"
                borderRadius="full"
                fit="cover"
                alt={user?.email.split("@")[0]}
              />
              <Heading as='h6' size='md' color="white">David Williams</Heading>
              <Flex gap={1} alignItems="Center">
                <Text color="charcoal.200">Art Director</Text>
                <ArrowDropDownIcon color={system.token("colors.charcoal.200")} />
              </Flex>
            </Flex>
            {isMobile && (
              <CloseButton size="lg" color="white" minW={10}
                _hover={{ bgColor: "charcoal.800" }}
                onClick={toggleSidebar}
              />
            )}
          </Flex>
        )}
      </List.Item>

      <ScrollArea.Root variant="hover" size="sm">
        <ScrollArea.Viewport>
          {SidebarItems.map(SidebarItem => (
            <List.Item key={SidebarItem.name} display="block">
              <NavLink to={SidebarItem.path} style={{ width: '100%' }}>
                {({ isActive }) => (
                  <Flex minW='full' justifyContent='space-between' cursor="pointer" padding={4} paddingLeft={isSidebarOpen ? 6 : 4}
                    bgColor={isActive ? "charcoal.800" : "charcoal.500"}
                    borderLeft={isActive ? "4px solid" : "unset"}
                    borderColor="primary"
                    _hover={{ bg: "charcoal.800" }}
                  >
                    <Flex gap={1} alignItems='center'>
                      <List.Indicator asChild mr="0">
                        <Box minW={6} display={isSidebarOpen ? 'block' : 'flex'} justifyContent='center' alignItems='center'>
                          {SidebarItem.icon}
                        </Box>
                      </List.Indicator>
                      {isSidebarOpen && (<Text color={system.token("colors.charcoal.200")} fontWeight="semibold">{SidebarItem.name}</Text>)}
                    </Flex>
                    {isSidebarOpen && (
                      <Flex>
                        {SidebarItem.badge && <Badge bgColor={SidebarItem.badge.color} color="white" fontWeight="bold" py="0.5" px={2}>{SidebarItem.badge.text}</Badge>}
                        {SidebarItem.children && <ArrowLeftIcon color={system.token("colors.charcoal.200")} />}
                      </Flex>
                    )}
                  </Flex>
                )}
              </NavLink>
              {SidebarItem.children && isSidebarOpen && (
                <List.Root variant="plain" bgColor="charcoal.800" gap={4} pb={4}
                  borderLeft={"4px solid"}
                  borderColor="primary"
                >
                  {SidebarItem.children.map(child => (
                    <List.Item key={child.name}>
                      <NavLink to={child.path} style={{ width: '100%' }}>
                        <Box minW='full' cursor="pointer" paddingLeft="14" bgColor="charcoal.800">
                          <Text color={system.token("colors.charcoal.200")} _hover={{ color: 'white' }} fontWeight="semibold">{child.name}</Text>
                        </Box>
                      </NavLink>
                    </List.Item>
                  ))}
                </List.Root>
              )}
            </List.Item>
          ))}
          <ScrollArea.Scrollbar orientation="vertical" bg={system.token("colors.charcoal.500")}>
            <ScrollArea.Thumb bg={system.token("colors.charcoal.900")} />
          </ScrollArea.Scrollbar>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </List.Root >
  );
}

export default Sidebar;
