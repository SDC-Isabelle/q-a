-- Database: sdc

-- DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Table: public.questions

-- DROP TABLE IF EXISTS public.questions;

CREATE TABLE IF NOT EXISTS public.questions
(
    id bigint NOT NULL DEFAULT nextval('questions_id_seq'::regclass),
    product_id bigint,
    body text COLLATE pg_catalog."default",
    date_written double precision,
    asker_name text COLLATE pg_catalog."default",
    asker_email text COLLATE pg_catalog."default",
    reported boolean DEFAULT false,
    helpful integer DEFAULT 0,
    CONSTRAINT questions_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.questions
    OWNER to postgres;

-- Table: public.answers

-- DROP TABLE IF EXISTS public.answers;

CREATE TABLE IF NOT EXISTS public.answers
(
    id bigint NOT NULL DEFAULT nextval('answers_id_seq'::regclass),
    question_id bigint,
    body text COLLATE pg_catalog."default",
    date_written double precision,
    answer_name text COLLATE pg_catalog."default",
    answer_email text COLLATE pg_catalog."default",
    reported smallint DEFAULT 0,
    helpful smallint DEFAULT 0,
    CONSTRAINT answers_pkey PRIMARY KEY (id),
    CONSTRAINT question_id FOREIGN KEY (question_id)
        REFERENCES public.questions (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.answers
    OWNER to postgres;

-- Table: public.photos

-- DROP TABLE IF EXISTS public.photos;

CREATE TABLE IF NOT EXISTS public.photos
(
    id bigint NOT NULL DEFAULT nextval('photos_id_seq'::regclass),
    answer_id bigint,
    url text COLLATE pg_catalog."default",
    CONSTRAINT photos_pkey PRIMARY KEY (id),
    CONSTRAINT answer_id FOREIGN KEY (answer_id)
        REFERENCES public.answers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.photos
    OWNER to postgres;

copy public.questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpful) FROM '/Users/leiliang/Desktop/questions csv.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8' QUOTE '\"' ESCAPE '''';

copy public.answers (id, question_id, body, date_written, answer_name, answer_email, reported, helpful) FROM '/Users/leiliang/Desktop/answers.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8' QUOTE '\"' ESCAPE '''';

copy public.photos (id, answer_id, url) FROM '/Users/leiliang/Desktop/answers_photos.csv' DELIMITER ',' CSV HEADER ENCODING 'UTF8' QUOTE '\"' ESCAPE '''';"