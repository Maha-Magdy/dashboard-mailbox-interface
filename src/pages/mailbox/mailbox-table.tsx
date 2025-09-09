import { Badge, Button, Flex, Group, Heading, IconButton, Input } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router";
import { useAuthStore, useMailboxStore } from "../../store";
import { AttachmentIcon, ExclamationMarkIcon, EyeIcon, LeftArrowIcon, RefreshIcon, RightArrowIcon, TrashIcon } from "../../icons";
import DataTable from "react-data-table-component";
import { useEffect, useState, type ReactNode } from "react";
import TableCheckbox from "./components/table-checkbox";
import type { Email } from "../../types/email";
import moment from "moment";
import { categoryColors } from "../../data/email-categories";
import { system } from "../../theme";
import { deleteEmail, getEmailsForUser, markEmailAsRead } from "../../services";
import { toaster } from "../../components/ui/toaster";

const MailboxTable = () => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { folderId } = useParams();
    const { unreadMailsCount, setUnreadMailsCount } = useMailboxStore();

    // varaibles realted to table
    const [data, setData] = useState<Email[]>(getEmailsForUser(user?.email!, folderId));
    const columns = [
        {
            name: 'Name',
            selector: (row: Email) => row.from.name,
            wrap: false,
            style: { fontWeight: "500", color: system.token("colors.gray.600") },
            conditionalCellStyles: [
                {
                    when: (row: Email) => !row.isRead,
                    style: { fontWeight: folderId !== 'sent' ? 'bolder' : 'normal' },
                },
            ],
        },
        {
            name: 'Category',
            cell: (row: Email) => row.category && <Badge data-tag="allowRowEvents" bgColor={categoryColors[row.category]} color="white" fontWeight="bold" height={5} px={2} textTransform="capitalize">{row.category}</Badge>,
            right: true,
        },
        {
            name: 'Subject',
            selector: (row: Email) => row.subject,
            grow: 3,
            wrap: false,
            style: { fontWeight: "500", color: system.token("colors.gray.600") },
            conditionalCellStyles: [
                {
                    when: (row: Email) => !row.isRead,
                    style: { fontWeight: folderId !== 'sent' ? 'bolder' : 'normal' },
                },
            ],
        },
        {
            name: 'Attachment',
            selector: (row: Email) => row.hasAttachment,
            cell: (row: Email) => row.hasAttachment && <AttachmentIcon data-tag="allowRowEvents" color={system.token("colors.gray.600")} width={14} height={14} />,
            center: true,
        },
        {
            name: 'Date',
            selector: (row: Email) => row.sentAt,
            format: (row: Email) => moment().diff(row.sentAt, 'hours') < 24 ? moment(row.sentAt).format('hh:mm A') : moment(row.sentAt).format('MMM DD'),
            right: true,
            style: { fontWeight: "500", color: system.token("colors.gray.600") },
            conditionalCellStyles: [
                {
                    when: (row: Email) => !row.isRead,
                    style: { fontWeight: folderId !== 'sent' ? 'bolder' : 'normal' },
                },
            ],
        },
    ];
    const customStyles = {
        rows: {
            style: {
                borderBottomColor: `${system.token("colors.charcoal.100")} !important`,
                '&:hover': {
                    backgroundColor: `${system.token("colors.gray.100")} !important`,
                },
            },
            selectedHighlightStyle: {
                '&:nth-of-type(n)': {
                    backgroundColor: system.token("colors.gray.100"),
                },
            },
        }
    }
    const [toggleCleared, setToggleCleared] = useState(false);
    const [selectedEmails, setSelectedEmails] = useState<Email[]>([]);

    const deleteSelectedEmails = () => {
        if (selectedEmails.length > 0) {
            let unreadedMailcount = 0
            selectedEmails.forEach(email => {
                if (!email.isRead && folderId === "inbox") {
                    unreadedMailcount += 1;
                }
                deleteEmail(email.id);
            });
            setUnreadMailsCount(unreadMailsCount - unreadedMailcount);

            toaster.create({
                description: selectedEmails.length > 1 ? "Emails have been deleted" : "Email has been deleted",
                type: "success",
                closable: true,
            });

            setData(getEmailsForUser(user?.email!, folderId));
        }
    }

    const markSelectedEmailsAsRead = () => {
        if (selectedEmails.length > 0) {
            let unreadedMailcount = 0
            selectedEmails.forEach(email => {
                if (!email.isRead && folderId === "inbox") {
                    unreadedMailcount += 1;
                }
                markEmailAsRead(email.id);
            });
            setUnreadMailsCount(unreadMailsCount - unreadedMailcount);
            resetEmailsSelectionState();
            setData(getEmailsForUser(user?.email!, folderId));
        }
    }

    const handleSelectedRowsChange = ({ selectedRows }: { selectedRows: Email[] }) => {
        setSelectedEmails(selectedRows);
    };

    const handleOnRowClicked = (row: Email) => {
        navigate(`/mailbox/${folderId}/${row.id}`);
    }

    const resetEmailsSelectionState = () => {
        if (selectedEmails.length > 0) {
            setToggleCleared(!toggleCleared);
            setSelectedEmails([]);
        }
    }

    useEffect(() => {
        setData(getEmailsForUser(user?.email!, folderId));
        // When the data changes, reset the selection state
        resetEmailsSelectionState();
    }, [user, folderId]);

    return (
        <Flex width="full" maxW="full" direction="column"
        // height="calc(100vh - 92px)"
        >
            <Flex direction="column" gap="4" p="4" pt={{ base: "4", md: "8" }} color="gray.600" borderBottom="1px solid" borderColor="charcoal.100">
                <Flex direction={{ base: "column", md: "row" }} justifyContent="space-between" alignItems={{ base: "start", md: "center" }} gap={4}>
                    <Heading as="h1" textTransform="capitalize" fontWeight="light" fontSize="2xl">{folderId} {folderId === 'inbox' && unreadMailsCount > 0 && `(${unreadMailsCount})`}</Heading>
                    <Group attached w="full" maxW="xs">
                        <Input size="xs" flex="1" placeholder="Search email" borderColor="gray.200" fontWeight="medium"
                            css={{ "--focus-color": "colors.gray.300" }}
                            _focusVisible={{ outlineWidth: "0.5px" }} />
                        <Button bgColor="primary" color="white" height="8">
                            Search
                        </Button>
                    </Group>
                </Flex>

                <Flex direction={{ base: "column", lg: "row" }} justifyContent="space-between" alignItems={{ base: "flex-start", lg: "center" }} gap={4}>
                    <Flex gap="2">
                        <Button aria-label="Refresh" title="Refresh" variant="outline" size="xs" height="7" color="gray" fontWeight="semibold">
                            <RefreshIcon color="gray" style={{ width: "14", height: "14" }} /> Refresh
                        </Button>

                        <IconButton aria-label="Mark as read" title="Mark as read" variant="outline" size="xs" height="7"
                            onClick={markSelectedEmailsAsRead}
                        >
                            <EyeIcon color="gray" style={{ width: "14", height: "14" }} />
                        </IconButton>

                        <IconButton aria-label="Report spam" title="Report spam" variant="outline" size="xs" height="7">
                            <ExclamationMarkIcon color="gray" style={{ width: "14", height: "14" }} />
                        </IconButton>

                        <IconButton aria-label="Delete" title="Delete" variant="outline" size="xs" height="7"
                            onClick={deleteSelectedEmails}
                        >
                            <TrashIcon color="gray" style={{ width: "14", height: "14" }} />
                        </IconButton>
                    </Flex>

                    <Flex>
                        <IconButton aria-label="Newer" title="Newer" variant="outline" size="xs" height="7" borderEndRadius={0} borderRight="unset">
                            <LeftArrowIcon color="gray" style={{ width: "14", height: "14" }} />
                        </IconButton>

                        <IconButton aria-label="Older" title="Older" variant="outline" size="xs" height="7" borderStartRadius={0}>
                            <RightArrowIcon color="gray" style={{ width: "14", height: "14" }} />
                        </IconButton>
                    </Flex>
                </Flex>
            </Flex>

            {/* <ScrollArea.Root variant="hover" size="sm">
                <ScrollArea.Viewport> */}
            <DataTable
                columns={columns}
                data={data}
                responsive
                selectableRows
                selectableRowsVisibleOnly
                selectableRowsHighlight
                selectableRowsComponent={TableCheckbox as unknown as ReactNode}
                onSelectedRowsChange={handleSelectedRowsChange}
                clearSelectedRows={toggleCleared}
                highlightOnHover
                pointerOnHover
                noTableHead
                onRowClicked={handleOnRowClicked}
                customStyles={customStyles}
            />
            {/* <ScrollArea.Scrollbar orientation="vertical" bg="white">
                        <ScrollArea.Thumb bg="gray" />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Viewport>
            </ScrollArea.Root> */}
        </Flex>
    );
}

export default MailboxTable;