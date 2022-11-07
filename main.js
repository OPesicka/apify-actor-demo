import { Actor } from "apify";
import fetch from "node-fetch";

await Actor.init();

const { token, teamID } = await Actor.getInput();

function logStatus(message) {
    console.log(message);
    return Actor.setStatusMessage(message);
}

function getURL(url, token) {
    return fetch(url, {
        headers: {
            "X-Figma-Token": token,
        },
    }).then((response) => response.json());
}

async function getProjectIds(token, teamID) {
    const url = `https://api.figma.com/v1/teams/${teamID}/projects`;
    await logStatus(`Getting projects from team ${teamID} `);
    const res = await getURL(url, token);
    const projects = res.projects;
    return projects;
}

async function getFiles(token, projectID) {
    const url = `https://api.figma.com/v1/projects/${projectID}/files`;
    const res = await getURL(url, token);
    const files = res;
    return files;
}

async function getAllFiles(token, teamID) {
    const projectIds = await getProjectIds(token, teamID);
    await logStatus(`Found ${projectIds.length} projects, counting files`);

    const projectResponses = projectIds.map((project) =>
        getFiles(token, project.id)
    );
    const projects = await Promise.all(projectResponses);
    return projects.map((project) => project.files).flat().length;
}

const result = await getAllFiles(token, teamID);
const data = { result, timestamp: new Date() };

const dataset = await Actor.openDataset(`figma-file-count-${teamID}`);
const datasetUrl = `https://api.apify.com/v2/datasets/${dataset.id}/items?clean=true&format=json`;

const tempData = {
    data,
    info: `To find all data for this team head over to ${datasetUrl}`,
};

await dataset.pushData(data);

await Actor.pushData(tempData);

await logStatus(`Counted ${result} files. Find results at ${datasetUrl}`);

await Actor.exit();
