import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom";
import LoginForm from "../components/LoginForm";

import userEvent from "@testing-library/user-event";

describe("Rendering Login Component", async () => {
    const { getByRole } = render(<LoginForm />);

    test("login form component", () => {
        expect(screen.getByText("Sign In to your account")).toBeInTheDocument();
    });
    // test("Submitting login form without any data", async () => {
    //     // const submitButton = getByRole("button", { name: /login/i, hidden: true });
    //     userEvent.click(getByRole("button", { name: /login/i }));
    //     await waitFor(() => {
    //         expect(getByText(/email is required/i)).toBeInTheDocument();
    //     });
    // });
});
