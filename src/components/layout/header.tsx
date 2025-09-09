import { Badge, Button, Flex, Input, useBreakpointValue } from "@chakra-ui/react";
import { useAuthStore, useMailboxStore, useUIStore } from "../../store"
import { BellIcon, BurgerMenuIcon, LogoutIcon, MailIcon } from "../../icons";
import { Link } from "react-router";
import DMIButton from "../ui/dmi-button";

function Header() {
    const { toggleSidebar } = useUIStore();
    const { logout } = useAuthStore();
    const { unreadMailsCount } = useMailboxStore();
    const showOnDesktop = useBreakpointValue({ base: false, md: true });

    return (
        <Flex justifyContent='space-between' alignItems='center' gap={4} padding='4'>
            <DMIButton mode="primary" px={0} py={0} minW={9} maxH={7}
                onClick={toggleSidebar}
                >
                <BurgerMenuIcon color="white" />
            </DMIButton>

            <Input placeholder="Search for something..." flexGrow={1} border='unset' paddingInline={0} maxH={7} fontWeight='medium'
                _focusVisible={{ border: '1px solid', borderColor: 'gray.200', outline: 'unset', paddingInline: '3' }} />

            {showOnDesktop && (
                <Button asChild bgColor='unset' paddingInline={0} minW={8} maxH={7}
                    _hover={{ transform: "scale(1.05)" }}>
                    <Link to='/'>
                        <MailIcon color='gray' />
                        {unreadMailsCount > 0 && <Badge bgColor="orange.300" color="white" fontSize="xs" fontWeight="bold" paddingInline={1} position='absolute' top='-10px' left='45%'>{unreadMailsCount}</Badge>}
                    </Link>
                </Button>
            )}

            {showOnDesktop && (
                <Button bgColor='unset' paddingInline={0} minW={8} maxH={7}
                    _hover={{ transform: "scale(1.05)" }}>
                    <Flex position='relative' top='2px'>
                        <BellIcon color='gray' />
                    </Flex>
                    <Badge bgColor="primary" color="white" fontSize="xs" fontWeight="bold" paddingInline={1} position='absolute' top='-8px' left='50%'>8</Badge>
                </Button>
            )}
            <Button bgColor='unset' border='unset' paddingInline={0} maxH={7} color="gray" fontWeight="semibold" gap={0}
                _hover={{ transform: "scale(1.025)" }}
                onClick={() => logout()}
            >
                <LogoutIcon color="gray" />
                {showOnDesktop && ("Log out")}
            </Button>
        </Flex>
    );
}

export default Header