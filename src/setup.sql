CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- ========================================
-- Insert sample data: Organizations 
-- ========================================

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
(
    'BrightFuture Builders',
    'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
    'info@brightfuturebuilders.org',
    'brightfuture-logo.png'
),
(
    'GreenHarvest Growers',
    'An urban farming collective promoting food sustainability and education in local neighborhoods.',
    'contact@greenharvest.org',
    'greenharvest-logo.png'
),
(
    'UnityServe Volunteers',
    'A volunteer coordination group supporting local charities and service initiatives.',
    'hello@unityserve.org',
    'unityserve-logo.png'
);


CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organization(organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);


-- ========================================
-- Insert sample data: Service Projects
-- ========================================

INSERT INTO project (organization_id, title, description, location, date)
VALUES
-- BrightFuture Builders (5 projetos)
(1, 'Community Center Renovation',
 'Renovate a local community center.',
 'Rexburg, Idaho', '2026-12-10'),

(1, 'School Playground Repair',
 'Repair playground equipment at a local school.',
 'Rexburg, Idaho', '2026-12-12'),

(1, 'Affordable Housing Support',
 'Help build affordable housing for local families.',
 'Idaho Falls, Idaho', '2026-12-15'),

(1, 'Community Library Renovation',
 'Improve the community library facilities.',
 'Rigby, Idaho', '2026-12-18'),

(1, 'Neighborhood Accessibility Project',
 'Install accessibility improvements in public spaces.',
 'Rexburg, Idaho', '2026-12-20'),

-- GreenHarvest Growers (5 projetos)
(2, 'Community Garden Planting',
 'Plant vegetables in a community garden.',
 'Rexburg, Idaho', '2027-04-10'),

(2, 'Urban Farming Workshop',
 'Teach sustainable farming techniques.',
 'Idaho Falls, Idaho', '2027-04-15'),

(2, 'Composting Education Day',
 'Educate residents about composting.',
 'Rigby, Idaho', '2027-04-20'),

(2, 'Neighborhood Tree Planting',
 'Plant trees in local neighborhoods.',
 'Rexburg, Idaho', '2027-05-01'),

(2, 'Food Sustainability Fair',
 'Promote sustainable food practices.',
 'Idaho Falls, Idaho', '2027-05-10'),

-- UnityServe Volunteers (5 projetos)
(3, 'Community Food Drive',
 'Collect food donations for local families.',
 'Rexburg, Idaho', '2026-12-11'),

(3, 'Senior Citizen Assistance',
 'Help elderly residents with daily tasks.',
 'Idaho Falls, Idaho', '2026-12-14'),

(3, 'Winter Clothing Donation',
 'Collect warm clothing for people in need.',
 'Rigby, Idaho', '2026-12-17'),

(3, 'Community Cleanup Day',
 'Organize volunteers to clean public spaces.',
 'Rexburg, Idaho', '2026-12-19'),

(3, 'Holiday Volunteer Outreach',
 'Support local charities during the holiday season.',
 'Idaho Falls, Idaho', '2026-12-22');

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL
);

CREATE TABLE project_category (
    project_id INT NOT NULL REFERENCES project(project_id),
    category_id INT NOT NULL REFERENCES category(category_id),
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO category (name)
VALUES
    ('Environmental'),
    ('Educational'),
    ('Community Service'),
    ('Health and Wellness')
;

-- ========================================
-- Additional Project-Category Relationships
-- ========================================

INSERT INTO project_category (project_id, category_id)
VALUES

    -- Environmental
    (6, 1),
    (8, 1),
    (9, 1),
    (10, 1),
    (14, 1),

    -- Educational
    (2, 2),
    (4, 2),
    (6, 2),
    (7, 2),

    -- Community Service
    (1, 3),
    (3, 3),
    (5, 3),
    (11, 3),
    (12, 3),
    (13, 3),
    (15, 3),

    -- Health and Wellness
    (12, 4),
    (15, 4);