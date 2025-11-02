# Simple Go Database Migrator

This is a lightweight, file-based database migration tool written in Go. It manages your database schema changes by applying SQL scripts in a sequential, transactional manner.

This tool is designed to be executed from the root directory of your project, where it expects to find its configuration and the migrations folder.

# 🚀 Key Features

- Configuration via JSON: Database connection settings are read from a single, mandatory file (`migrator.json`).

- Sequential Migrations: Uses numbered file names (e.g., `001_initial_schema.up.sql`) to ensure migrations run in the correct order.

- Up/Down Support: Each migration consists of a pair of files: an `.up.sql` for applying the change and a `.down.sql` for rolling it back.

- Transactional Execution: Migrations are run within database transactions for integrity.

- Flexible Database Support: Supports SQLite, PostgreSQL, and MySQL via standard Go database/sql drivers.

# ⚙️ Configuration

The tool must be executed from a directory containing a file named migrator.json. It uses the Current Working Directory (CWD) to locate this file and the `migrations` folder.

`migrator.json`

This file defines the connection parameters for your database.

Key

Type

Description

Example Values

db_type

string

The database driver name.

"sqlite3", "postgres", "mysql"

db_dsn

string

The Data Source Name (connection string) for the database.

"app.db" (SQLite), "user=app dbname=prod sslmode=disable" (Postgres)

## Example (SQLite)

```
{
  "db_type": "sqlite3",
  "db_dsn": "my_application.db"
}
```

## Example (PostgreSQL)

{
"db_type": "postgres",
"db_dsn": "user=postgres password=root dbname=app_db host=localhost sslmode=disable"
}

# 💻 Usage and Commands

To run the tool, you can either use `go run db_migrator.go` or compile it into an executable (e.g., `db_migrator.exe`) and place it on your system path.

All commands should be executed from the root project directory.

| Command                     | Description                                                                                                                |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `db_migrator init`          | Initializes the database by creating the schema_migrations tracking table and ensuring the migrations/ directory exists.   |
| `db_migrator create <name>` | Creates a new pair of migration files (e.g., 001_add_users.up.sql and 001_add_users.down.sql) in the migrations directory. |
| `db_migrator up`            | Runs all pending migrations.                                                                                               |
| `db_migrator up <n>`        | Runs the next <n> pending migrations.                                                                                      |
| `db_migrator down`          | Rolls back the last applied migration.                                                                                     |
| db_migrator down <n>        | Rolls back the last <n> applied migrations.                                                                                |
| db_migrator status          | Prints the status (APPLIED or PENDING) of all migration files found in the migrations folder.                              |

## Workflow Example

1. Prepare the directory and database:

```

go run db_migrator.go init

```

2. Create a new migration:

```

go run db_migrator.go create create_users_table

```

(This creates `migrations/001_create_users_table.up.sql` and `.down.sql`)

3. Edit the SQL files to define your schema change.

4. Apply the migration:

```

go run db_migrator.go up

```

5. Check status:

```

go run db_migrator.go status

```
