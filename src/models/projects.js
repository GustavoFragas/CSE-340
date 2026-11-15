import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT
            project.project_id,
            project.date, 
            project.title,
            project.description,
            project.location,
            organization.name AS organization_name
        FROM project
        INNER JOIN organization
        ON project.organization_id = organization.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            p.project_id,
            p.organization_id,
            p.title,
            p.description,
            p.location,
            p.date
        FROM project AS p
        INNER JOIN project_category AS pc
        ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.date;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getUpcomingProjects = async (numberOfProjects) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.date, 
            p.location,
            o.name AS organization_name,
            o.organization_id
        FROM project AS p
        INNER JOIN organization AS o
        ON p.organization_id = o.organization_id
        WHERE p.date >= CURRENT_DATE
        ORDER BY p.date ASC
        LIMIT $1;
    `;

    const queryParams = [numberOfProjects];
    const result = await db.query(query, queryParams);

    return result.rows;

}

const getProjectDetails = async (id) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.date, 
            p.location,
            o.organization_id,
            o.name AS organization_name
        FROM project AS p
        INNER JOIN organization AS o
        ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

    const queryParams = [id];
    const result = await db.query(query, queryParams);

    return result.rows[0];
}

export {getUpcomingProjects}
export {getAllProjects}  
export {getProjectsByOrganizationId}
export {getProjectDetails}
export {getProjectsByCategoryId}
