import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MailboxTable from "../mailbox-table";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "../../../theme";

// Mock stores
vi.mock("../../store", () => ({
    useAuthStore: () => ({ user: { email: "to@example.com" } }),
    useMailboxStore: () => ({
        unreadMailsCount: 5,
        setUnreadMailsCount: vi.fn(),
    }),
}));

// Mock router
vi.mock("react-router", () => ({
    useNavigate: () => vi.fn(),
    useParams: () => ({ folderId: "inbox" }),
}));

// Mock services
vi.mock("../../services", () => ({
    getEmailsForUser: vi.fn(() => [
        {
            id: "1",
            subject: "Test Email",
            from: { name: "Sender" },
            to: { email: "to@example.com" },
            category: "Work",
            hasAttachment: false,
            isRead: false,
            sentAt: new Date(),
        },
    ]),
    deleteEmail: vi.fn(),
    markEmailAsRead: vi.fn(),
}));

// Mock DataTable correctly
vi.mock("react-data-table-component", () => ({
    default: (props: any) => (
        <div data-testid="data-table">
            {props.data.map((row: any) => (
                <div key={row.id}>{row.subject}</div>
            ))}
        </div>
    ),
}));

describe("MailboxTable", () => {
    it("renders the right folder id", () => {
        render(
            <ChakraProvider value={system}>
                <MailboxTable />
            </ChakraProvider>
        );
        // Use substring match for flexibility
        expect(screen.getByText(/inbox/i)).toBeInTheDocument();
    });
});
