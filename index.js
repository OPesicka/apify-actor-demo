import fetch from "node-fetch";

const figmaTeamID = "912788418659599813"; // AlfaOptima
const figmaToken = "figd_iOtW4vr8ZiSQbSewPFzRoRcLlVr4vWL_0PrBqSWM";

function figmaProjects() {
  return fetch(`https://api.figma.com/v1/teams/${figmaTeamID}/projects`, {
    headers: {
      "X-Figma-Token": figmaToken,
    },
  }).then((response) => response.json());
}

function figmaFiles(projectID) {
  return fetch(`https://api.figma.com/v1/projects/${projectID}/files`, {
    headers: {
      "X-Figma-Token": figmaToken,
    },
  }).then((response) => response.json());
}

async function getProjectIds() {
  const res = await figmaProjects();
  const projects = res.projects;
  return projects;
}

async function getFiles(projectID) {
  const res = await figmaFiles(projectID);
  const files = res;
  return files;
}

async function getAllFiles() {
  const projectIds = await getProjectIds();
  const projectResponses = projectIds.map((project) => getFiles(project.id));
  const projects = await Promise.all(projectResponses);
  return projects.map((project) => project.files).flat().length;
}

console.log(await getAllFiles());
