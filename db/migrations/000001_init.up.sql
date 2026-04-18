-- ROLE
CREATE TABLE IF NOT EXISTS roles (
    id INT PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL CURRENT_TIMESTAMP
);

-- CLASS
CREATE TABLE IF NOT EXISTS class (
    id INT PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL CURRENT_TIMESTAMP
);

-- USER
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    class_id INT NOT NULL,
    role_id INT NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL CURRENT_TIMESTAMP,

    CONSTRAINT fk_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE SET NULL
);

-- QURAN_SURAH
CREATE TABLE IF NOT EXISTS quran_surah (
    id INT PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100) NOT NULL,
    juz INT NOT NULL,
    total_verses INT NOT NULL,
    from_the_page INT NOT NULL,
    to_the_page INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL CURRENT_TIMESTAMP
);

-- HAFALAN
CREATE TABLE IF NOT EXISTS hafalan (
    id INT PRIMARY KEY AUTOINCREMENT,
    user_id INT NOT NULL,
    id_surah INT NOT NULL,
    duration INT NOT NULL,
    from_the_verse INT NOT NULL,
    until_the_verse INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL CURRENT_TIMESTAMP,

    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_surah
        FOREIGN KEY (id_surah)
        REFERENCES quran_surah(id)
        ON DELETE CASCADE
);

-- USTADZ_STUDENT (junction table IF NOT EXISTS self relation)
CREATE TABLE IF NOT EXISTS ustadz_student (
    id INT PRIMARY KEY AUTOINCREMENT,
    ustadz_id INT NOT NULL,
    student_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL CURRENT_TIMESTAMP,

    CONSTRAINT fk_ustadz
        FOREIGN KEY (ustadz_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_student
        FOREIGN KEY (student_id)
        REFERENCES users(id)
        ON DELETE CASCADE

    CONSTRAINT unique_ustadz_student UNIQUE (ustadz_id, student_id);
);