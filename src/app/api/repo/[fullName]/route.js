export async function GET(request, { params }) {
    try {
        const {fullName} = params;
        const result = fullName.split('_');
        const ownerName = result[0];
        const repoName = result.slice(1).join('_');
        const url = `https://api.github.com/repos/${ownerName}/${repoName}/readme`;
        let response = await fetch(url)
        response = await response.json();
        response = {
          ...response,
          content: atob(response.content)
        };
        return Response.json({ success: true, fullName, url, response });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}