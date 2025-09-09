import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react"; // Import ChakraProvider
import { system } from "../../../theme";

// Mocking external dependencies
const mockLogin = vi.fn();

vi.mock("../../../store", () => ({
    useAuthStore: () => ({
        isAuthenticated: false,
        login: mockLogin,
    }),
}));

const mockUseNavigate = vi.fn();
vi.mock("react-router", () => ({
    Navigate: vi.fn(),
    useNavigate: () => mockUseNavigate,
}));

vi.mock("../../../services", () => ({
    authenticateUser: vi.fn(),
}));

import { authenticateUser } from '../../../services';
import LoginPage from '../index';

describe("LoginPage", () => {
    // A function to render the component with default mocks
    const setup = () => render(
        <ChakraProvider value={system}>
            <LoginPage />
        </ChakraProvider>
    );

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render the login form and its elements", () => {
        setup();
        expect(screen.getByRole("heading", { name: /Hello Again!/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter you password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
    });

    it("should display validation errors for invalid input", async () => {
        const user = userEvent.setup();
        setup();

        await user.click(screen.getByRole("button", { name: /Login/i }));

        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });

    it("should redirect to the dashboard on successful login", async () => {
        const mockAuthenticateUser = authenticateUser as unknown as ReturnType<typeof vi.fn>;
        const user = userEvent.setup();
        mockAuthenticateUser.mockReturnValueOnce({ id: "1", name: "Test User" });
        setup();

        await user.type(screen.getByLabelText(/Email/), "test@example.com");
        await user.type(screen.getByPlaceholderText(/Enter you password/i), "password123");
        await user.click(screen.getByRole("button", { name: /Login/i }));

        expect(mockAuthenticateUser).toHaveBeenCalledOnce();
        expect(mockAuthenticateUser).toHaveBeenCalledWith("test@example.com", "password123");
        expect(mockLogin).toHaveBeenCalledWith({ id: "1", name: "Test User" });
        expect(mockUseNavigate).toHaveBeenCalledWith("/");
    });

    it("should display an error message on failed login", async () => {
        const mockAuthenticateUser = authenticateUser as unknown as ReturnType<typeof vi.fn>;
        const user = userEvent.setup();
        mockAuthenticateUser.mockReturnValueOnce(null);
        setup();

        await user.type(screen.getByLabelText(/Email/i), "wrong@example.com");
        await user.type(screen.getByPlaceholderText(/Enter you password/i), "wrongpass");
        await user.click(screen.getByRole("button", { name: /Login/i }));

        expect(screen.getByText(/Invalid login credentials/i)).toBeInTheDocument();
    });
});