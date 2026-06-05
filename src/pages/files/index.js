import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFiles,
  selectFiles,
  selectFilesLoading,
  selectFilesError,
} from "../../store/filesSlice";
import Table from "react-bootstrap/Table";

function FilesPage() {
  const dispatch = useDispatch();
  const files = useSelector(selectFiles);
  const loading = useSelector(selectFilesLoading);
  const error = useSelector(selectFilesError);

  useEffect(() => {
    dispatch(fetchFiles());
  }, [dispatch]);

  return (
    <div className="container py-4">
      <div className="d-flex align-items-center justify-content-between mb-4 files-page-heading">
        <div className="col-12 text-start page-title">
          <h1 className="h3 mb-1">React Test App</h1>
        </div>
      </div>

      {loading && (
        <div className="alert alert-info" role="alert">
          Loading files, please wait...
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && files.length === 0 && (
        <div className="alert alert-secondary" role="alert">
          No file data found yet.
        </div>
      )}

      {!loading && files.length > 0 && (
        <div className="table-responsive-sm">
          <Table
            responsive="sm"
            striped
            bordered
            hover
            size="sm"
            className="text-start files-table "
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
      )}
    </div>
  );
}

export default FilesPage;
