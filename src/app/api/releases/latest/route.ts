import { createErrorResponse, createSuccessResponse } from "@/helper/response";

export async function GET() {
    const repoUrl = process.env.NEXT_PUBLIC_REPOSITORY_URL;
    if (!repoUrl) {
        return createErrorResponse("Missing repository URL", 500);
    }

    const repoPath = repoUrl.replace("https://github.com/", "");

    try {
        const response = await fetch(
            `https://api.github.com/repos/${repoPath}/releases/latest`,
            {
                next: {
                    revalidate: 60 * 60,
                },
            },
        );

        if (!response.ok) {
            throw new Error(`GitHub API responded with ${response.status}`);
        }

        const data = await response.json();
        let body = data.body || "";

        // Server-side cleanup of markdown
        body = body.replace(/ \(#\d+\)/g, "");
        body = body.replace(/ \(\[.*]\(.*\)\)/g, "");

        return createSuccessResponse({
            body,
            version: data.tag_name,
        });
    } catch (error: any) {
        console.error(
            "Failed to fetch release notes from GitHub:",
            error?.message,
        );
        return createErrorResponse("Failed to fetch release notes");
    }
}
