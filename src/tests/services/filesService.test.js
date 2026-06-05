import axios from "axios";
import { getFiles, getFilesList } from "../../services/filesService";


const API_URL = "https://toolbox-api-latest.onrender.com";

jest.mock("axios");

describe("filesService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls the files endpoint without query params when fileName is not provided", async () => {
    axios.get.mockResolvedValueOnce({ data: [{ file: "file1.csv" }] });

    const result = await getFiles();

    expect(axios.get).toHaveBeenCalledWith(
      `${API_URL}/files/data`,
      { params: undefined },
    );
    expect(result).toEqual([{ file: "file1.csv" }]);
  });

  it("calls the files endpoint with fileName query params", async () => {
    axios.get.mockResolvedValueOnce({ data: [{ file: "file1.csv" }] });

    const result = await getFiles("file1.csv");

    expect(axios.get).toHaveBeenCalledWith(
      `${API_URL}/files/data`,
      { params: { fileName: "file1.csv" } },
    );
    expect(result).toEqual([{ file: "file1.csv" }]);
  });

  it("calls the files list endpoint", async () => {
    axios.get.mockResolvedValueOnce({ data: { files: ["file1.csv"] } });

    const result = await getFilesList();

    expect(axios.get).toHaveBeenCalledWith(
      `${API_URL}/files/list`,
    );
    expect(result).toEqual({ files: ["file1.csv"] });
  });
});
