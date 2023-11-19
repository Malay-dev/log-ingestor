<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Log Ingestor and Query App - Dyte</h3>

  <p align="center">
   This project encompasses a Log Ingestor system and a Query Interface, providing the ability to manage extensive log data efficiently and perform queries based on specific criteria.
    <br />
    <a href="https://github.com/Malay-dev/log-ingestor.git"><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

### Built With

- **Node.js and Express Server:**

  - Manages incoming requests and their corresponding responses efficiently.

- **RabbitMQ Message Queue:**

  - Transfers logs to a message queue for further processing.
  - A subscriber component consumes these logs, directing them to the database.

- **MongoDB (Sharded):**
  - Efficiently handles extensive log data.
  - Employs sharded MongoDB, equipped with 3 configuration servers and 2 shards for scalability.
  - Timestamps are indexed for optimal write performance.

### Load Balancing

- **Nginx:**
  - Performs load balancing across multiple Node.js servers to manage high request volumes.
  - Redirects incoming requests to distinct instances of the Node.js application for efficient processing.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To set up the project locally using Docker, follow these steps:

### Prerequisites

Ensure you have Docker installed on your system.

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Malay-dev/log-ingestor.git
   cd log-ingestor
   ```
2. **Edit the .env.example -> .env**

   ```
    PORT=3000
    MONGO_USER="root"
    MONGO_PASSWORD="example"
    RABBIT_MQ_USER="root"
    RABBIT_MQ_PASSWORD="example"
   ```

3. **Start the containers:**

   ```bash
   docker-compose up -d --scale log-ingestor=2
   ```

   This command starts all the necessary containers. The `-d` flag runs the containers in the background, and `--scale log-ingestor=2` scales the log-ingestor service to two instances.

4. **Wait for the containers to be ready:**
   While the containers are starting up, the Node.js app connects to the database and RabbitMQ. You can verify their status by checking the logs using Docker Desktop or running the following command for each instance:

   ```bash
   docker logs -f log-ingestor-query-log-ingestor-1
   ```

   Replace `1` with `2` for the second instance.

   ![image](public/terminal.png)

5. **Interact with the System:**

   - **HTTP Requests:**
     - Make HTTP POST requests to the `/log` endpoint to submit logs.
     - Use HTTP GET requests at the same endpoint with various query parameters to retrieve logs.
     - Example GET request: `http://localhost:3000/log?level=error`
     - Experiment with different query parameters based on log attributes.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Malay Kumar - [@void_MalayK](https://twitter.com/void_MalayK) - email@email_client.com

Project Link: [https://github.com/Malay-dev/log-ingestor.git](https://github.com/Malay-dev/log-ingestor.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>
```
