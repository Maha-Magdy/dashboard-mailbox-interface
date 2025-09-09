import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ViewEmail from "../view-email";
import * as router from "react-router";
import * as services from "../../../services";
import * as authStore from "../../../store";
import * as mailboxStore from "../../../store";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "../../../theme";
import { toaster } from "../../../components/ui/toaster";

// Mock useNavigate
vi.spyOn(router, "useNavigate").mockReturnValue(vi.fn());
// Mock useParams
vi.spyOn(router, "useParams").mockReturnValue({ folderId: "inbox", emailId: "1" });
// Mock getEmail so we don't call the real function
vi.spyOn(services, "getEmail").mockReturnValue({
    id: "1",
    subject: "Test Email",
    body: "This is a test email body",
    from: { name: "John Doe", email: "john@example.com" },
    to: { name: "Maha Magdy", email: "me@example.com" },
    cc: { name: "", email: "" },
    isRead: false,
    sentAt: "",
    hasAttachment: false,
});
// Mock auth store
vi.spyOn(authStore, "useAuthStore").mockReturnValue({ user: { email: "me@example.com" } });
// Mock mailbox store
vi.spyOn(mailboxStore, "useMailboxStore").mockReturnValue({
    unreadMailsCount: 5,
    setUnreadMailsCount: vi.fn(),
});
// Mock deleteEmail and toaster
vi.spyOn(services, "deleteEmail").mockImplementation(vi.fn());
vi.spyOn(toaster, "create").mockImplementation(vi.fn());

describe("ViewEmail Component", () => {
    it("renders email subject, sender, and body", () => {
        render(
            <ChakraProvider value={system}>
                <ViewEmail />
            </ChakraProvider>
        );

        expect(screen.getByText("Test Email")).toBeInTheDocument();
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("(john@example.com)")).toBeInTheDocument();
        expect(screen.getByText("This is a test email body")).toBeInTheDocument();
    });

    it("renders Delete button and allows clicking it", () => {
        render(
            <ChakraProvider value={system}>
                <ViewEmail />
            </ChakraProvider>
        );

        const deleteButton = screen.getByRole("button", { name: /Delete/i });
        expect(deleteButton).toBeInTheDocument();

        fireEvent.click(deleteButton);

        expect(services.deleteEmail).toHaveBeenCalledWith("1");
        expect(toaster.create).toHaveBeenCalled();
    });

    it("sets default user image if specific user image not found", async () => {
        render(
            <ChakraProvider value={system}>
                <ViewEmail />
            </ChakraProvider>
        );

        const image = await screen.findByRole("img");
        expect(image).toHaveAttribute("src", expect.stringContaining("default-user.jpg"));
    });
});
