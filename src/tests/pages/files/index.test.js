import React from "react";
import { render, screen } from "@testing-library/react";
import FilesPage from "../../../pages/files/index";
import { useDispatch, useSelector } from "react-redux";
import * as filesSlice from "../../../store/filesSlice";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("FilesPage", () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useDispatch.mockReturnValue(dispatchMock);
  });

  it("dispatches fetchFiles with the fileName search param", () => {
    window.history.pushState({}, "Test page", "/?fileName=file1.csv");
    useSelector.mockImplementation((selector) =>
      selector({ files: { items: [], loading: false, error: null } }),
    );

    const spy = jest.spyOn(filesSlice, "fetchFiles");
    render(<FilesPage />);

    expect(spy).toHaveBeenCalledWith("file1.csv");
    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });

  it("renders the files table when file data exists", () => {
    window.history.pushState({}, "Test page", "/");
    const sampleFiles = [
      {
        file: "file1.csv",
        lines: [
          { number: "123", text: "hello", hex: "abcd" },
        ],
      },
    ];
    useSelector.mockImplementation((selector) =>
      selector({ files: { items: sampleFiles, loading: false, error: null } }),
    );

    render(<FilesPage />);

    expect(screen.getByText("file1.csv")).toBeInTheDocument();
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("abcd")).toBeInTheDocument();
  });
});
