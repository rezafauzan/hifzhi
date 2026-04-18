# ERD hifzi app
```mermaid
erDiagram
    USER {
        int id PK
        string name 
        int class_id FK
        int role_id FK
        string username
        string password
        timestamp created_at
        timestamp updated_at
    }

    ROLE {
        int id PK
        string role
        string name
        timestamp created_at
        timestamp updated_at
    }

    USTADZ_STUDENT {
        int id PK
        int ustadz_id FK
        int students_id FK
        timestamp created_at
        timestamp updated_at
    }

    HAFALAN {
        int id PK
        int user_id FK
        int id_surah FK
        int duration
        int from_the_verse
        int until_the_verse
        timestamp created_at
        timestamp updated_at
    }

    QURAN_SURAH {
        int id PK
        string name
        int juz
        int total_verses
        int form_the_page
        int to_the_page
        timestamp created_at
        timestamp updated_at
    }

    ROLE ||--o| USER : has
    USER ||--o{ HAFALAN : owns
    QURAN_SURAH ||--o{ HAFALAN : contains
    USER ||--o{ USTADZ_STUDENT : with_teather
    USER ||--o{ USTADZ_STUDENT : with_student