import React from "react";
import { render, screen } from "@testing-library/react";
import FilesView from "../../../components/files/FilesView";

const sampleFiles = [
  {
    file: "file1.csv",
    lines: [
      {
        number: "123",
        text: "hello",
        hex: "abcd",
      },
    ],
  },
];

describe("FilesView", () => {
  it("renders the loading view when loading is true", () => {
    render(
      <FilesView loading={true} error={null} files={[]}>
        <FilesView.Loading />
        <FilesView.Error />
        <FilesView.Empty />
        <FilesView.Table />
      </FilesView>,
    );

    expect(screen.getByText("Loading files, please wait...")).toBeInTheDocument();
    expect(screen.queryByText("No file data found yet.")).not.toBeInTheDocument();
  });

  it("renders the error view when error is provided", () => {
    render(
      <FilesView loading={false} error="Something went wrong" files={[]}>
        <FilesView.Loading />
        <FilesView.Error />
        <FilesView.Empty />
        <FilesView.Table />
      </FilesView>,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.queryByText("Loading files, please wait...")).not.toBeInTheDocument();
    expect(screen.queryByText("No file data found yet.")).not.toBeInTheDocument();
  });

  it("renders the empty state when there are no files, no loading, and no error", () => {
    render(
      <FilesView loading={false} error={null} files={[]}>
        <FilesView.Loading />
        <FilesView.Error />
        <FilesView.Empty />
        <FilesView.Table />
      </FilesView>,
    );

    expect(screen.getByText("No file data found yet.")).toBeInTheDocument();
    expect(screen.queryByText("Loading files, please wait...")).not.toBeInTheDocument();
  });

  it("renders the table when files are available", () => {
    render(
      <FilesView loading={false} error={null} files={sampleFiles}>
        <FilesView.Loading />
        <FilesView.Error />
        <FilesView.Empty />
        <FilesView.Table />
      </FilesView>,
    );

    expect(screen.getByText("file1.csv")).toBeInTheDocument();
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("abcd")).toBeInTheDocument();
    expect(screen.queryByText("No file data found yet.")).not.toBeInTheDocument();
  });
});
