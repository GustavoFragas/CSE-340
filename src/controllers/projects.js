import { getUpcomingProjects, getProjectDetails, createProject, updateProject } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';
import { getAllOrganizations } from '../models/organizations.js';
import { body, validationResult } from 'express-validator';

const projectValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Project title must be between 3 and 150 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required')
        .isLength({ max: 999 })
        .withMessage('Project description must be less than 1000 characters'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required')
        .isLength({ max: 199 })
        .withMessage('Project location must be less than 200 characters'),
    body('date')
        .notEmpty()
        .withMessage('Project date is required')
        .isDate({ format: 'YYYY-MM-DD', strictMode: true })
        .withMessage('Please provide a valid project date'),
    body('organizationId')
        .notEmpty()
        .withMessage('Organization is required')
        .isInt()
        .withMessage('Please select a valid organization')
];

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    console.log(projects);

    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects });
};

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Project';

    res.render('new-project', { title, organizations });
};

const processNewProjectForm = async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect('/new-project');
    }

    const { title, description, location, date, organizationId } = req.body;
    await createProject(title, description, location, date, organizationId);

    req.flash('success', 'Project added successfully!');
    res.redirect('/projects');
};

const showEditProjectForm = async (req, res) => {
    const projectDetails = await getProjectDetails(req.params.id);

    if (!projectDetails) {
        res.status(404).render('errors/404', { title: 'Page Not Found' });
        return;
    }

    const organizations = await getAllOrganizations();
    const title = 'Edit Project';
    res.render('edit-project', { title, projectDetails, organizations });
};

const processEditProjectForm = async (req, res) => {
    const projectId = req.params.id;
    const results = validationResult(req);
    if (!results.isEmpty()) {
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });

        return res.redirect(`/edit-project/${projectId}`);
    }

    const { title, description, location, date, organizationId } = req.body;
    await updateProject(projectId, title, description, location, date, organizationId);

    req.flash('success', 'Project updated successfully!');
    res.redirect(`/project/${projectId}`);
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


export { showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm };
