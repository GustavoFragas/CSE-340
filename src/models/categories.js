import db from './db.js';

const getAllCategories = async() => {
    const query = `
        SELECT category_id, name
      FROM public.category;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getCategoryDetails = async (categoryId) => {
    const query = `
        SELECT category_id, name
        FROM category
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT c.category_id, c.name
        FROM category AS c
        INNER JOIN project_category AS pc
        ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const assignCategoryToProject = async (projectId, categoryId, client = db) => {
    const query = `
        INSERT INTO project_category (project_id, category_id)
        VALUES ($1, $2)
    `;

    await client.query(query, [projectId, categoryId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
    const client = await db.connect();

    try {
        await client.query('BEGIN');
        await client.query('SELECT project_id FROM project WHERE project_id = $1 FOR UPDATE', [projectId]);
        await client.query('DELETE FROM project_category WHERE project_id = $1', [projectId]);

        for (const categoryId of categoryIds) {
            await assignCategoryToProject(projectId, categoryId, client);
        }

        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

export {getAllCategories, getCategoryDetails, getCategoriesByProjectId, updateCategoryAssignments};
