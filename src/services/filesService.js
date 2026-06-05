import axios from "axios";

const API_URL = "https://toolbox-api-latest.onrender.com";
// const API_URL = "http://localhost:3001/";

async function getFiles(fileName) {
  try {
    const response = await axios.get(`${API_URL}/files/data`, {
      params: fileName ? { fileName } : undefined,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function getFilesList() {
  try {
    const response = await axios.get(`${API_URL}/files/list`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { getFiles, getFilesList };
