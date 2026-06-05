import reducer, {
  fetchFiles,
  selectFiles,
  selectFilesLoading,
  selectFilesError,
} from "../../store/filesSlice";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

describe("filesSlice reducer and selectors", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("handles fetchFiles.pending", () => {
    const nextState = reducer(initialState, { type: fetchFiles.pending.type });
    expect(nextState).toEqual({ items: [], loading: true, error: null });
  });

  it("handles fetchFiles.fulfilled", () => {
    const payload = [{ file: "file1.csv", lines: [] }];
    const nextState = reducer(
      { ...initialState, loading: true },
      { type: fetchFiles.fulfilled.type, payload },
    );

    expect(nextState).toEqual({ items: payload, loading: false, error: null });
    expect(selectFiles({ files: nextState })).toBe(payload);
    expect(selectFilesLoading({ files: nextState })).toBe(false);
    expect(selectFilesError({ files: nextState })).toBe(null);
  });

  it("handles fetchFiles.rejected", () => {
    const nextState = reducer(
      { ...initialState, loading: true },
      { type: fetchFiles.rejected.type, payload: "Request failed" },
    );

    expect(nextState).toEqual({ items: [], loading: false, error: "Request failed" });
  });
});
