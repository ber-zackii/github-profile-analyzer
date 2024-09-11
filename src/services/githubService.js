import axios from "axios";

const GITHUB_API_URL = "https://api.github.com";

const githubAPI = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});

// Fetch user profile data
export const getUserProfile = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

// Fetch user repositories
export const getUserRepos = async (username) => {
  try {
    const response = await githubAPI.get(`/users/${username}/repos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user repositories:", error);
    return [];
  }
};
