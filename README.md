# ICPUS

A full-stack web application for managing CPUs and its sockets, built as a recruitment task. The project is structured as a Monorepo and fully containerized for a seamless setup experience.

## 🚀 Tech Stack
* **Backend:** Java 17, Spring Boot, Spring Data JPA
* **Frontend:** React (Vite), plain CSS (minimalist, black-and-white design)
* **Database:** PostgreSQL
* **Infrastructure:** Docker, Docker Compose, Nginx

## 🛠️ How to run

You don't need to install Java, Node.js, or PostgreSQL on your local machine. The entire application, including the database and proxy server, is containerized.

1. Clone the repository.
2. Open your terminal in the root directory (where `docker-compose.yml` is located).
3. Run the following command:
   ```bash
   docker-compose up -d --build
   ```
4. Open your browser and go to: http://localhost

## 🏗️ Project Structure

The project follows a Monorepo architecture:

```
icpus/
├── backend/             # Spring Boot application
├── frontend/            # React application (includes nginx.conf)
└── docker-compose.yml   # Orchestration
```

## 📋 Database Schema

The database consists of two main entities:

### Socket

| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| socket | VARCHAR(50) | NOT NULL, UNIQUE |

### CPU

| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| brand | VARCHAR | NOT NULL |
| model | VARCHAR | NOT NULL |
| socket_id | INTEGER | FOREIGN KEY (sockets.id) |
| clockspeed | DOUBLE | NOT NULL, POSITIVE |
| cores_count | INTEGER | NOT NULL, POSITIVE |
| threads_count | INTEGER | NOT NULL, POSITIVE |
| tdp | INTEGER | NOT NULL, POSITIVE |
| price_eur | DOUBLE | NOT NULL, POSITIVE |

## 📝 API Endpoints

### Sockets

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sockets` | Get all sockets |
| GET | `/api/sockets/{id}` | Get socket by ID |
| POST | `/api/sockets` | Create socket |
| PUT | `/api/sockets/{id}` | Update socket |
| DELETE | `/api/sockets/{id}` | Delete socket |

### CPUs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cpus` | Get all CPUs |
| GET | `/api/cpus/{id}` | Get CPU by ID |
| POST | `/api/cpus` | Create CPU |
| PUT | `/api/cpus/{id}` | Update CPU |
| DELETE | `/api/cpus/{id}` | Delete CPU |

## 🔧 Configuration

All configuration is defined directly in `docker-compose.yml`. The relevant environment variables are:

| Variable | Value | Service |
|----------|-------|---------|
| `POSTGRES_USER` | `admin` | db |
| `POSTGRES_PASSWORD` | `admin` | db |
| `POSTGRES_DB` | `icpusdb` | db |
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://db:5432/icpusdb` | backend |
| `SPRING_DATASOURCE_USERNAME` | `admin` | backend |
| `SPRING_DATASOURCE_PASSWORD` | `admin` | backend |

The frontend uses Nginx as a reverse proxy — API calls to `/api/` are forwarded to the backend container internally.

## 🚀 Building

To build the project:

```bash
docker-compose up -d --build
```

## 🧹 Cleaning Up

To stop and remove the containers:

```bash
docker-compose down
```

To remove volumes and data:

```bash
docker-compose down -v
```

## 🔐 Security

* **Input Validation:** All inputs are validated on both frontend and backend.
* **Error Handling:** Comprehensive error handling with proper HTTP status codes.

## 🎨 Design

The application features a minimalist, black-and-white design with:

* Clean typography
* Subtle hover effects
* Responsive layout
* Light theme

## 🎯 Features

* ✅ Create, Read, Update, Delete CPUs
* ✅ Create, Read, Update, Delete Sockets
* ✅ Form validation (frontend + backend)
* ✅ Proper error handling
* ✅ Containerized deployment
* ✅ Responsive design
* ✅ Clean, minimalist UI

## 🤝 Contributing

This project was built as a recruitment task. Feel free to fork, modify, and use it as inspiration for your own projects.

## 📄 License

[MIT License](LICENSE)

## 👨‍💻 Author

Adrian Popielarczyk

---

**Built with Java, Spring Boot, React, and Docker**
