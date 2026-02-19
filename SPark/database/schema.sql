-- SPark Database Schema
-- PostgreSQL Database Schema for SPark - What Ignites SP

-- Drop existing tables if they exist
DROP TABLE IF EXISTS event_category_map CASCADE;
DROP TABLE IF EXISTS admin_reporting CASCADE;
DROP TABLE IF EXISTS content_items CASCADE;
DROP TABLE IF EXISTS event_categories CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS members CASCADE;

-- Members Table
CREATE TABLE members (
    member_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    biography TEXT,
    specialties VARCHAR(255),
    portfolio_links TEXT,
    contact_email VARCHAR(150) UNIQUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events Table
CREATE TABLE events (
    event_id SERIAL PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_date DATE NOT NULL,
    event_description TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    venue VARCHAR(200),
    is_published BOOLEAN DEFAULT FALSE,
    created_by_member_id INTEGER REFERENCES members(member_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event Categories Table
CREATE TABLE event_categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL,
    category_slug VARCHAR(100) UNIQUE NOT NULL
);

-- Content Items Table
CREATE TABLE content_items (
    content_id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL REFERENCES events(event_id) ON DELETE CASCADE,
    member_id INTEGER NOT NULL REFERENCES members(member_id) ON DELETE CASCADE,
    content_type VARCHAR(10) NOT NULL CHECK (content_type IN ('PHOTO', 'REPORT')),
    title VARCHAR(255),
    content_path VARCHAR(512) NOT NULL,
    coverage_stage VARCHAR(100),
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event Category Mapping Table (Many-to-Many)
CREATE TABLE event_category_map (
    event_id INTEGER REFERENCES events(event_id) ON DELETE CASCADE,
    category_id INTEGER REFERENCES event_categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, category_id)
);

-- Admin Reporting Table (Internal Use Only)
CREATE TABLE admin_reporting (
    report_id SERIAL PRIMARY KEY,
    report_type VARCHAR(100) NOT NULL,
    report_data TEXT NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    accessible_by_admin_only BOOLEAN DEFAULT TRUE
);

-- Indexes for better performance
CREATE INDEX idx_events_date ON events(event_date DESC);
CREATE INDEX idx_events_published ON events(is_published);
CREATE INDEX idx_content_items_event ON content_items(event_id);
CREATE INDEX idx_content_items_member ON content_items(member_id);
CREATE INDEX idx_content_items_type ON content_items(content_type);
CREATE INDEX idx_members_role ON members(role);
CREATE INDEX idx_members_active ON members(is_active);

-- Insert default categories
INSERT INTO event_categories (category_name, category_slug) VALUES
    ('Technology', 'technology'),
    ('Cultural', 'cultural'),
    ('Sports', 'sports'),
    ('Seminar', 'seminar'),
    ('Workshop', 'workshop'),
    ('Competition', 'competition'),
    ('Festival', 'festival');

-- Sample data for development/testing (optional - remove in production)

-- Insert sample members
INSERT INTO members (first_name, last_name, role, biography, specialties, contact_email) VALUES
('John', 'Doe', 'Lead Photographer', 'Passionate photographer with 5 years of experience in event photography.', 'Event Photography,Portrait Photography,Photo Editing', 'john.doe@college.edu'),
('Jane', 'Smith', 'Senior Reporter', 'Accomplished writer covering over 100 college events.', 'Feature Writing,Event Reporting,Interviews', 'jane.smith@college.edu'),
('Mike', 'Johnson', 'Photographer', 'Specializes in sports and action photography.', 'Sports Photography,Action Shots', 'mike.johnson@college.edu'),
('Sarah', 'Williams', 'Columnist', 'Creative writer focused on cultural events and student life.', 'Column Writing,Creative Writing', 'sarah.williams@college.edu');

-- Insert sample events
INSERT INTO events (event_name, event_date, event_description, venue, created_by_member_id, is_published) VALUES
('Annual Tech Fest 2024', '2024-03-15', 'A celebration of innovation and technology featuring workshops, competitions, and exhibitions.', 'Main Auditorium', 1, true),
('Cultural Night Extravaganza', '2024-02-28', 'An evening of music, dance, and artistic performances showcasing student talent.', 'Open Air Theatre', 2, true),
('Sports Championship Finals', '2024-03-10', 'The culmination of inter-departmental sports competitions.', 'College Stadium', 3, true);

-- Map events to categories
INSERT INTO event_category_map (event_id, category_id) VALUES
(1, 1), -- Tech Fest -> Technology
(2, 2), -- Cultural Night -> Cultural
(3, 3); -- Sports Championship -> Sports

-- Insert sample content items
INSERT INTO content_items (event_id, member_id, content_type, title, content_path) VALUES
(1, 1, 'PHOTO', 'Tech Fest Opening Ceremony', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'),
(1, 1, 'PHOTO', 'Workshop Session', 'https://images.unsplash.com/photo-1591115765373-5207764f72e7'),
(1, 2, 'REPORT', 'Tech Fest Comprehensive Report', '/reports/tech-fest-2024.pdf'),
(2, 2, 'REPORT', 'Cultural Night Coverage', '/reports/cultural-night-2024.pdf'),
(3, 3, 'PHOTO', 'Championship Finals Action', 'https://images.unsplash.com/photo-1517649763962-0c623066013b');

-- Comments for documentation
COMMENT ON TABLE members IS 'Stores information about committee members (photographers, reporters, writers, columnists)';
COMMENT ON TABLE events IS 'Stores details about college events covered by the committee';
COMMENT ON TABLE event_categories IS 'Categories for classifying events (Tech, Sports, Cultural, etc.)';
COMMENT ON TABLE content_items IS 'Photos and reports associated with events';
COMMENT ON TABLE event_category_map IS 'Many-to-many relationship between events and categories';
COMMENT ON TABLE admin_reporting IS 'Internal analytics and reporting data (admin access only)';
