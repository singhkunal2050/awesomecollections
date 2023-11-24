import requests
import json
import os
import base64

api_url = "https://api.github.com/search/repositories"
topic = "awesome"
per_page = 100
output_file = "output.json"
readme_dir = "readmes"
categories_file = "categories.json"
github_token = "<Access Token>"

def extract_topics(readme_list):
    topics = []
    for readme in readme_list:
        readme_topics = readme.get("topics", [])
        filtered_topics = [topic for topic in readme_topics if 'awesome' not in topic.lower()]
        topics.extend(filtered_topics)

    return topics

def get_all_repositories():
    all_repos = []
    page = 1

    while page <= 10:
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

def create_repo_readme_file_content(repo_list):

    if not os.path.exists(readme_dir):
        os.makedirs(readme_dir)

    total_repos = len(repo_list)
    print("Total Repositories:", total_repos)

    headers = {
        "Authorization": f"token {github_token}",
        "Accept": "application/vnd.github.v3+json"
    }

    processed_count = 0 

    for repo in repo_list:
        try:
            url = f"https://api.github.com/repos/{repo['full_name']}/readme"
            response = requests.get(url, headers=headers)

            if response.status_code != 200:
                print(f"Failed to fetch README for {repo['full_name']}, Response - {response.status_code}")
                continue

            encoded_content = response.json().get("content")
            if not encoded_content:
                continue

            decoded_content = base64.b64decode(encoded_content).decode('utf-8')
            readme = decoded_content

            json_content = {
                "repo_name": repo['full_name'].replace('/', '_'),
                "readme_content": readme
            }

            readme_path = os.path.join(readme_dir, repo['full_name'].replace('/', '_') + ".json")
            write_json_to_file(json_content, readme_path)
            
            processed_count += 1
            print(f"Processed {repo['full_name']} ({processed_count}/{total_repos})")

        except Exception as e:
            print(f"Error processing {repo['full_name']}: {e}")

    print(f"Completed processing {processed_count} out of {total_repos} repositories.")


# with open("output.json", "r") as file:
#     all_repos = json.load(file)

all_repos = get_all_repositories()
topics= extract_topics(all_repos)

write_json_to_file(topics, categories_file)

write_json_to_file(all_repos, output_file)

create_repo_readme_file_content(all_repos)
