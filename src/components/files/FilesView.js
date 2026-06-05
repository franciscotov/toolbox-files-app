import React, { createContext, useContext } from "react";
import Table from "react-bootstrap/Table";

const FilesViewContext = createContext();

function FilesView({ loading, error, files, children }) {
  return (
    <FilesViewContext.Provider value={{ loading, error, files }}>
      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-between mb-4 files-page-heading">
          <div className="col-12 text-start page-title">
            <h1 className="h3 mb-1">React Test App</h1>
          </div>
        </div>
        {children}
      </div>
    </FilesViewContext.Provider>
  );
}

function Loading() {
  const { loading } = useContext(FilesViewContext);
  if (!loading) {
    return null;
  }
  return (
    <div className="alert alert-info" role="alert">
      Loading files, please wait...
    </div>
  );
}

function ErrorMessage() {
  const { error } = useContext(FilesViewContext);
  if (!error) {
    return null;
  }
  return (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  );
}

function EmptyState() {
  const { loading, error, files } = useContext(FilesViewContext);
  if (loading || error || (files && files.length > 0)) {
    return null;
  }
  return (
    <div className="alert alert-secondary" role="alert">
      No file data found yet.
    </div>
  );
}

function FilesTable() {
  const { files, loading, error } = useContext(FilesViewContext);
  if (loading || error || !files || files.length === 0) {
    return null;
  }
  return (
    <div className="table-responsive-sm">
      <Table
        responsive="sm"
        striped
        bordered
        hover
        size="sm"
        className="text-start files-table"
      >
        <thead className="table-light">
          <tr>
            <th scope="col">File Name</th>
            <th scope="col">Text</th>
            <th scope="col">Number</th>
            <th scope="col">Hex</th>
          </tr>
        </thead>
        <tbody>
          {files.map((fileInfo) =>
            fileInfo.lines.map((line, index) => (
              <tr key={`${fileInfo.file}-${index}`}>
                <td className="text-break">{fileInfo.file}</td>
                <td className="text-break">{line.text}</td>
                <td>{line.number}</td>
                <td className="text-break">{line.hex}</td>
              </tr>
            )),
          )}
        </tbody>
      </Table>
    </div>
  );
}

FilesView.Loading = Loading;
FilesView.Error = ErrorMessage;
FilesView.Empty = EmptyState;
FilesView.Table = FilesTable;

export default FilesView;
