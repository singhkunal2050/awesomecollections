export async function GET(request, { params }) {
    try {
        const {fullName} = params;
        const result = fullName.split('_');
        const ownerName = result[0];
        const repoName = result.slice(1).join('_');
        const url = `https://api.github.com/repos/${ownerName}/${repoName}/readme`;
        let repoData = await fetch(url)
        repoData = await repoData.json();
        const url2 =  repoData.download_url; //`https://raw.githubusercontent.com/${ownerName}/${repoName}/master/README.md`;
        let response = await fetch(url2);
        response = await response.text();
        return Response.json({ success: true, fullName, url2, response });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}