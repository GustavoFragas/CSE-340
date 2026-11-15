import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';

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
        res.status(404).render('errors/404', { title: 'Page Not Found' });
        return;
    }

    const categories = await getCategoriesByProjectId(projectId);
    const title = 'Project Details';
    res.render('project', { title, project: projectDetails, categories });
};


export { showProjectsPage, showProjectDetailsPage };
