import requests
import json
import os
import base64

api_url = "https://api.github.com/search/repositories"
topic = "awesome"
per_page = 10
output_file = "output.json"
readme_dir = "readmes"

def get_all_repositories():
    all_repos = []
    page = 1

    while page < 10:
        full_url = f"{api_url}?q=topic:{topic}&sort=stars&order=desc&per_page={per_page}&page={page}"
        print({"full_url": full_url})

        response = requests.get(full_url, headers={"Accept": "application/vnd.github.v3+json"})

        if not response.ok:
            raise Exception(f"HTTP error! Status: {response.status_code}")

        data = response.json()
        repos = data["items"]

        if not repos:
            break

        all_repos.extend(repos)
        page += 1

    return all_repos

def write_json_to_file(json_object, file_path):
    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(json_object, file, indent=2)
    print(f"JSON written to {file_path}")

def get_repo_readme_file_content():

    if not os.path.exists(readme_dir):
        os.makedirs(readme_dir)

    with open(output_file, 'r', encoding='utf-8') as file:
        repo_list = json.load(file)

    for repo in repo_list:
        url = f"https://api.github.com/repos/{repo['full_name']}/readme"
        response = requests.get(url, headers={"Accept": "application/vnd.github.v3+json"})

        encoded_content = response.json().get("content")

        if not encoded_content:
            continue;

        decoded_content = base64.b64decode(encoded_content).decode('utf-8')

        readme = decoded_content

        json_content = {
            "repo_name": repo['full_name'].replace('/', '_'),
            "readme_content": readme
        }

        readme_path = os.path.join(readme_dir, repo['full_name'].replace('/', '_'))
        write_json_to_file(json_content, readme_path)

all_repos = get_all_repositories()

write_json_to_file(all_repos, output_file)

get_repo_readme_file_content()
