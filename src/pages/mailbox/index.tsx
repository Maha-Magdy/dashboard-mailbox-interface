import { Box, Button, Dialog, Flex, Heading, List } from "@chakra-ui/react";
import DMIButton from "../../components/ui/dmi-button";
import { DescriptionIcon, InboxIcon, MailIcon, OfferIcon, SunIcon, TrashIcon } from "../../icons";
import { useMailboxStore } from "../../store";
import FolderLink from "./components/folder-link";
import { Link, Outlet } from "react-router";
import { system } from "../../theme";
import type { EmailCategory } from "../../types/email";
import { categoryColors, emailCategories } from "../../data/email-categories";
import ComposeEmailModal from "./components/compose-email-modal";
import { useState } from "react";

const MailboxPage = () => {
    const [isComposeEmailModalOpen, setComposeEmailModalOpen] = useState(false);
    const { unreadMailsCount } = useMailboxStore();
    const categories: EmailCategory[] = emailCategories;
    const labels: string[] = ["Family", "Work", "Home", "Children", "Holidays", "Music", "Photography", "Film"];

    return (
        <Flex gap={8} direction={{ base: 'column', lg: 'row' }}>
            <Flex direction='column' gap='5' w={{ base: "full", lg: "xs" }} color="gray.600">
                <Dialog.Root
                    size={{ mdDown: "full", md: "md" }}
                    placement="center"
                    open={isComposeEmailModalOpen}
                    onOpenChange={(e) => setComposeEmailModalOpen(e.open)}
                    initialFocusEl={() => null}
                >
                    <Dialog.Trigger asChild>
                        <DMIButton mode='primary' px={24}>Compose Mail</DMIButton>
                    </Dialog.Trigger>
                    <ComposeEmailModal setOpen={setComposeEmailModalOpen} />
                </Dialog.Root>

                <Box>
                    <Heading as='h6' mb='3' fontSize='sm' lineHeight='normal'>FOLDERS</Heading>
                    <List.Root variant="plain">
                        <List.Item display="block">
                            <FolderLink link='inbox' Icon={InboxIcon} title='Inbox' badgeInfo={unreadMailsCount <= 0 ? '' : unreadMailsCount} badgeColor='orange.300' />
                        </List.Item>

                        <List.Item display="block">
                            <FolderLink link='sent' Icon={MailIcon} title='Sent' />
                        </List.Item>

                        <List.Item display="block">
                            <FolderLink link='important' Icon={SunIcon} title='Important' />
                        </List.Item>

                        <List.Item display="block">
                            <FolderLink link='drafts' Icon={DescriptionIcon} title='Drafts' badgeInfo={2} badgeColor='red.500' />
                        </List.Item>

                        <List.Item display="block">
                            <FolderLink link='trash' Icon={TrashIcon} title='Trash' />
                        </List.Item>
                    </List.Root>
                </Box>

                <Box>
                    <Heading as='h6' mb='4' fontSize='sm' lineHeight='normal'>CATEGORIES</Heading>
                    <List.Root variant="plain" gap={2}>
                        {categories.map(category => (
                            <List.Item key={category}>
                                <Button asChild variant="plain" fontWeight='semibold' px={2} height="auto" color="gray.600" textTransform="capitalize">
                                    <Link to="inbox">
                                        <Box width='3' height='3' borderRadius='full' bgColor={categoryColors[category]}></Box>
                                        {category}
                                    </Link>
                                </Button>
                            </List.Item>
                        ))}
                    </List.Root>
                </Box>

                <Box>
                    <Heading as='h6' mb='3' fontSize='sm' lineHeight='normal'>LABELS</Heading>
                    <List.Root variant="plain" gap={2} flexDirection="row" flexWrap="wrap">
                        {labels.map(label => (
                            <List.Item key={label}>
                                <Button asChild variant="outline" fontWeight='semibold' px={4} py={1.5} height="auto" color="gray.600" bgColor="white" borderColor="charcoal.100" gap={1}
                                    _hover={{ bgColor: "charcoal.100" }}
                                    _active={{ bgColor: "charcoal.100" }}
                                >
                                    <Link to="inbox">
                                        <OfferIcon color={system.token("colors.gray.600")} style={{ width: "14", height: "14" }} /> {label}
                                    </Link>
                                </Button>
                            </List.Item>
                        ))}
                    </List.Root>
                </Box>
            </Flex>

            <Box bgColor="white" flexGrow={1} border="1px solid" borderColor="charcoal.100"
                w={{ base: "full", lg: "calc(100% - 22rem)" }}
            >
                <Outlet />
            </Box>
        </Flex>
    )
}

export default MailboxPage;