import React, { useState } from "react";
import { getUserProfile, getUserRepos } from "./services/githubService";
import { Bar, Pie } from "react-chartjs-2";
import { Table } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const App = () => {
  const [username, setUsername] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  const [error, setError] = useState("");
  const [languageData, setLanguageData] = useState(null);
  const [recentRepos, setRecentRepos] = useState([]);
  const [languageBreakdown, setLanguageBreakdown] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const profile = await getUserProfile(username);
    const repos = await getUserRepos(username);

    if (profile) {
      setUserProfile(profile);
      setUserRepos(repos);
      setError("");
      processLanguageData(repos);
      setRecentRepos(getRecentRepos(repos));
      processLanguageBreakdown(repos);
    } else {
      setError("User not found!");
    }
  };

  const processLanguageData = (repos) => {
    const languageCount = {};
    repos.forEach((repo) => {
      const language = repo.language;
      if (language) {
        languageCount[language] = (languageCount[language] || 0) + 1;
      }
    });

    setLanguageData({
      labels: Object.keys(languageCount),
      datasets: [
        {
          label: "Languages Used",
          data: Object.values(languageCount),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        },
      ],
    });
  };

  const processLanguageBreakdown = (repos) => {
    const languageCount = {};
    repos.forEach((repo) => {
      const language = repo.language;
      if (language) {
        languageCount[language] = (languageCount[language] || 0) + repo.size; // Assuming size as a metric
      }
    });

    setLanguageBreakdown({
      labels: Object.keys(languageCount),
      datasets: [
        {
          label: "Language Breakdown",
          data: Object.values(languageCount),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        },
      ],
    });
  };

  const getRecentRepos = (repos) => {
    return repos
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 5);
  };

  return (
    <div className="app-container">
      <h1 className="title">GitHub Profile Analyzer</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}

      {userProfile && (
        <div className="profile-section">
          <div className="profile-header">
            <img src={userProfile.avatar_url} alt={userProfile.name} className="avatar" />
            <div className="profile-info">
              <h2 className="profile-name">{userProfile.name}</h2>
              <p className="profile-bio">{userProfile.bio}</p>
              <p className="profile-followers">Followers: {userProfile.followers}</p>
              <p className="profile-following">Following: {userProfile.following}</p>
            </div>
          </div>

          {languageData && (
            <div className="chart-container">
              <h3 className="chart-title">Languages Used in Repositories</h3>
              <Bar data={languageData} className="chart" />
            </div>
          )}

          {languageBreakdown && (
            <div className="chart-container">
              <h3 className="chart-title">Language Breakdown</h3>
              <Pie data={languageBreakdown} className="chart" />
            </div>
          )}

          {recentRepos.length > 0 && (
            <div className="repos-container">
              <h3 className="repos-title">Recent Repositories</h3>
              <Table striped bordered hover className="repos-table">
                <thead>
                  <tr>
                    <th>Repository Name</th>
                    <th>Stars</th>
                    <th>Forks</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRepos.map((repo) => (
                    <tr key={repo.id}>
                      <td>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          {repo.name}
                        </a>
                      </td>
                      <td>{repo.stargazers_count}</td>
                      <td>{repo.forks_count}</td>
                      <td>{new Date(repo.updated_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          {userRepos.length > 0 && (
            <div className="repos-container">
              <h3 className="repos-title">User Repositories: {userRepos.length}</h3>
              <Table striped bordered hover className="repos-table">
                <thead>
                  <tr>
                    <th>Repository Name</th>
                    <th>Stars</th>
                    <th>Forks</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {userRepos.map((repo) => (
                    <tr key={repo.id}>
                      <td>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          {repo.name}
                        </a>
                      </td>
                      <td>{repo.stargazers_count}</td>
                      <td>{repo.forks_count}</td>
                      <td>{new Date(repo.updated_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
