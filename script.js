const apiUrl = "https://api.github.com/search/repositories";
const topic = "awesome";
const perPage = 100; // Number of items per page
let allRepos = [];

async function getAllRepositories() {
    let page = 1;

    while (page < 10) {
        // Construct the full URL with query parameters
        const fullUrl = `${apiUrl}?q=topic:Awesome&sort=stars&order=desc&per_page=100&page=${page}`;
        console.log({ fullUrl });

        // Make the API request using the fetch function
        const response = await fetch(fullUrl, {
            headers: {
                Accept: "application/vnd.github.v3+json",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const repos = data.items;

        if (repos.length === 0) {
            break; // No more pages
        }

        allRepos = allRepos.concat(repos);
        page++;
    }

    return allRepos;
}

// Example usage
getAllRepositories()
    .then((repos) => {
        // Process the data
        repos.forEach((repo) => {
            console.log(`Repo: ${repo.name}, Stars: ${repo.stargazers_count}`);
        });
        const filePath = 'output.json';
        writeJsonToFile(allRepos, filePath);
    })
    .catch((error) => {
        console.error("Error:", error);
    });


function writeJsonToFile(jsonObject, filePath) {
    // Convert the JSON object to a string with indentation for better readability
    const jsonString = JSON.stringify(jsonObject, null, 2);

    // Write the JSON string to the file
    fs.writeFileSync(filePath, jsonString, 'utf-8');

    console.log(`JSON written to ${filePath}`);
}

