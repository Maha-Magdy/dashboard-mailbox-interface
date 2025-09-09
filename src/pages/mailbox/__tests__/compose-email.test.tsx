import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "../../../theme";

// ---------------------- MOCKS ---------------------- //
const mockNavigate = vi.fn();
vi.mock("react-router", () => ({
    useNavigate: () => mockNavigate,
}));

vi.mock("../components/compose-email-form", () => ({
    default: ({ callback }: { callback: () => void }) => (
        <button onClick={callback}>Send Email</button>
    ),
}));

import ComposeEmail from "../compose-email";

describe("ComposeEmail component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderComponent = () =>
        render(
            <ChakraProvider value={system}>
                <ComposeEmail />
            </ChakraProvider>
        );

    it("renders heading and ComposeEmailForm", () => {
        renderComponent();
        expect(screen.getByText("New Email")).toBeInTheDocument();
        expect(screen.getByText("Send Email")).toBeInTheDocument();
    });

    it("calls navigate callback when form button is clicked", () => {
        renderComponent();
        fireEvent.click(screen.getByText("Send Email"));
        expect(mockNavigate).toHaveBeenCalledWith("/mailbox/inbox");
    });
});
