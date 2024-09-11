# GitHub Profile Analyzer

## Overview

GitHub Profile Analyzer is a React-based web application that allows users to analyze GitHub profiles. It fetches user profile data and repositories from GitHub and visualizes this data through charts and tables. Users can view a profile summary, analyze language usage, and explore recent and all repositories.

## Features

- **Profile Information:** Displays the user's name, bio, avatar, followers, and following counts.
- **Language Usage Charts:** Shows a bar chart of languages used across repositories and a pie chart for language breakdown.
- **Recent Repositories:** Lists the most recently updated repositories with details such as stars, forks, and last update date.
- **User Repositories:** Provides a table of all repositories owned by the user with similar details.

## Technologies Used

- **React:** For building the user interface.
- **Chart.js:** For rendering charts (Bar and Pie).
- **React Bootstrap:** For styling and layout components.
- **Bootstrap:** For additional styling and responsive design.

## Setup

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later) or Yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/github-profile-analyzer.git

2. **Navigate to the project directory:**

    ```bash
    cd github-profile-analyzer

3. **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```
    Or using Yarn:
    ```bash
    yarn install
    ```

4. **Create a .env file in the root directory of the project with the following content:**
    ```bash
    REACT_APP_GITHUB_TOKEN=your_github_token
    ```
    Replace your_github_token with your personal GitHub API token. This token is required for making requests to the GitHub API.

5. **Run the development server:**

    Using npm:

    ```bash
    npm run dev
    ```
    Or using Yarn:
    ```bash
    yarn run dev
    ```
    
    The application will start on http://localhost:5173.


## Usage

1. **Open the application** in your web browser by navigating to [http://localhost:5173](http://localhost:5173).

2. **Enter a GitHub username** in the search field.

3. **Click "Search"** to fetch and display the data.

4. **View the following information:**
   - **User's profile information:** Displays the user's name, bio, profile picture, followers, and following count.
   - **Language usage charts:** Shows a bar chart of languages used in the user's repositories and a pie chart of language breakdown.
   - **Recent repositories:** Lists the most recently updated repositories.
   - **All repositories:** Provides a table of all the user's repositories with details like stars, forks, and last updated date.
