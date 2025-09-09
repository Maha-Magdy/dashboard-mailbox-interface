import { render, screen } from "@testing-library/react";
import { describe, it, beforeEach, vi, expect } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "../../../theme";

// ---------------------- MOCKS ---------------------- //
const mockUseMailboxStore = {
    unreadMailsCount: 3,
    setUnreadMailsCount: vi.fn(),
};

// Mock store
vi.mock("../../store", () => ({
    useMailboxStore: () => mockUseMailboxStore,
}));

// Mock DMIButton
vi.mock("../../components/ui/dmi-button", () => {
    return ({ children }: { children: React.ReactNode }) => <button>{children}</button>;
});

// Mock ComposeEmailModal
vi.mock("./components/compose-email-modal", () => {
    return () => (
        <div data-testid="compose-modal">ComposeEmailModal</div>
    );
});

// Mock react-router
vi.mock("react-router", () => ({
    Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Outlet: () => <div data-testid="outlet" />,
}));

// Mock icons
vi.mock("../../icons", () => ({
    InboxIcon: () => <span>InboxIcon</span>,
    MailIcon: () => <span>MailIcon</span>,
    SunIcon: () => <span>SunIcon</span>,
    DescriptionIcon: () => <span>DescriptionIcon</span>,
    TrashIcon: () => <span>TrashIcon</span>,
    OfferIcon: () => <span>OfferIcon</span>,
}));

// Import component AFTER mocks
import MailboxPage from "../index";

describe("MailboxPage component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderComponent = () =>
        render(
            <ChakraProvider value={system}>
                <MailboxPage />
            </ChakraProvider>
        );

    it("renders Compose Mail button", () => {
        renderComponent();
        expect(screen.getByText("Compose Mail")).toBeInTheDocument();
    });

    it("renders folder names with icons and unread badge", () => {
        renderComponent();
        expect(screen.getByText("Inbox")).toBeInTheDocument();
        expect(screen.getByText("Sent")).toBeInTheDocument();
        expect(screen.getByText("Important")).toBeInTheDocument();
        expect(screen.getByText("Drafts")).toBeInTheDocument();
        expect(screen.getByText("Trash")).toBeInTheDocument();
    });

    it("renders categories", () => {
        renderComponent();
        expect(screen.getByText("Family")).toBeInTheDocument();
        expect(screen.getByText("Work")).toBeInTheDocument();
        expect(screen.getByText("Home")).toBeInTheDocument();
    });

    it("renders labels", () => {
        renderComponent();
        expect(screen.getByText("Music")).toBeInTheDocument();
        expect(screen.getByText("Film")).toBeInTheDocument();
    });

    it("renders Outlet placeholder", () => {
        renderComponent();
        expect(screen.getByTestId("outlet")).toBeInTheDocument();
    });
});
