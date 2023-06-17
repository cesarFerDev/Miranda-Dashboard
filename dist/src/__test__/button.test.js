import React from "react";
import '@testing-library/jest-dom';
import { render, cleanup, screen } from "@testing-library/react";
import { Button } from "./button";
describe("Button color testing", () => {
    afterEach(cleanup);
    test("Style changes with props", () => {
        render(React.createElement(Button, { color: "white", background: "red" }));
        expect(screen.getByRole('button')).toHaveStyle(`color: white;
             background-color: red`);
    });
    test("Style changes with props", () => {
        render(React.createElement(Button, { color: "red", background: "white" }));
        expect(screen.getByRole('button')).toHaveStyle(`color: red;
             background-color: white`);
    });
    test("Styles by default", () => {
        render(React.createElement(Button, null));
        expect(screen.getByRole('button')).toHaveStyle(`color: black;
             background-color: grey`);
    });
});
