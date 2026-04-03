** Scema Definations **

api_keys schema:
id, user_id (FK), key_hash, name, created_at, lastused_at

documents schema:
id, job_id (FK), recipient_data, verify_token, s3_url, created_at

jobs schema:
- id (uuid, PK), job_type (text, enum: CERTIFICATE_BATCH), ideompotency_key (text, unique), user_id (uuid, FK to users), template_id (uuid, FK to templates), status (text, enum: queued, processing, completed, failed), attempts (integer), max_attempts (integer), last_error (text), failed_at (timestamp), total_count (integer), processed_count (integer), zip_s3_url (text), webhook_url (text), created_at (timestamp), completed_at (timestamp)   

placeholders schema:
id, template_id (FK), name, x, y, width, strategy, min_font_size, align, font_size, font_color, font_family

templates schema:
id, user_id (FK), name, s3_url, width, height, created_at

users schema:
id, username, email, password_hash, created_at