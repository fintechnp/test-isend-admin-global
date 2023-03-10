import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import "@testing-library/jest-dom";
import LoginForm from "../components/LoginForm";
import user from "@testing-library/user-event";

describe("Rendering Login Component", async () => {
    render(<LoginForm />);
    test("login form component", () => {
        expect(screen.getByText("Sign In to your account")).toBeInTheDocument();
    });
    test("Submitting login form without any data", async () => {
        // const emailInput = await screen.findByRole("textbox", { name: /email/i });
        // console.log("🚀 ~ file: Login.test.jsx:14 ~ test ~ emailInput:", emailInput);
        // const passwordInput = screen.queryByTestId("password");
        // const emailInputError = screen.getByText("Email is required");
        // await user.type(emailInput, "govind");
        // await user.type(passwordInput, "govind12");
        // await waitFor(() => {
        //     expect(emailInput).toBeInTheDocument();
        // });
        // expect(onSubmit).toHaveBeenCalledWith({ lazy: true });
    });
});
