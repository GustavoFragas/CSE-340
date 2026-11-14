import { getAllProjects, getUpcomingProjects, getProjectDetails, getProjectsByOrganizationId } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    console.log(projects);

    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);

    if (!projectDetails) {
        res.status(404).send('Project not found');
        return;
    }

    const title = 'Project Details';
        res.render('project', { title, project: projectDetails });};


export { showProjectsPage, showProjectDetailsPage };
