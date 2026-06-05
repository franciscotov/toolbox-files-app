import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFiles,
  selectFiles,
  selectFilesLoading,
  selectFilesError,
} from "../../store/filesSlice";
import FilesView from "../../components/files/FilesView";

function FilesPage() {
  const dispatch = useDispatch();
  const files = useSelector(selectFiles);
  const loading = useSelector(selectFilesLoading);
  const error = useSelector(selectFilesError);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fileName = params.get("fileName") || "";
    dispatch(fetchFiles(fileName));
  }, [dispatch]);

  return (
    <FilesView loading={loading} error={error} files={files}>
      <FilesView.Loading />
      <FilesView.Error />
      <FilesView.Empty />
      <FilesView.Table />
    </FilesView>
  );
}

export default FilesPage;
