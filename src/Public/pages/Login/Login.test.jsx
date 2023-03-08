import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";
import LoginForm from "../components/LoginForm";

describe("Rendering Login Component", () => {
    const { getByText } = render(<LoginForm />);
    test("login form component", () => {
        expect(getByText("Sign In to your account")).toBeInTheDocument();
    });
    // test("Submitting login form with wrong credentials", async () => {
    //     const loginButton = screen.getByRole("button", {
    //         name: /login/i,
    //     });

    //     fireEvent.click(loginButton);

    //     expect(true).toBe(true);
    // });
});
