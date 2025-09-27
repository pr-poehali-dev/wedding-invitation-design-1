CREATE TABLE wedding_responses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    attending VARCHAR(10) NOT NULL CHECK (attending IN ('yes', 'no')),
    alcohol_preference VARCHAR(20) CHECK (alcohol_preference IN ('champagne', 'wine', 'vodka')),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);