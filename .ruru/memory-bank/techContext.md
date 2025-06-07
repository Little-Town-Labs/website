# Technical Context

## Technologies Used

**Core Little Town Labs & AeroCode:**
*   **Languages**: Python (primary for AI/backend), JavaScript/TypeScript (for web frontends/backends if applicable)
*   **Frameworks**: (To be determined for AeroCode core, potentially FastAPI or similar for agent APIs)
*   **AI/ML**: Standard ML libraries (e.g., scikit-learn, PyTorch/TensorFlow if needed for custom models within AeroCode), NLP libraries.
*   **Cloud Services**: (To be determined - e.g., AWS, GCP, or Azure for hosting AeroCode, HomeschoolingMinds)
*   **Other Tools**: Docker (for containerization of agents/services)

**HomeschoolingMinds Platform:**
*   **Frontend**: (To be determined - e.g., React, Vue, Svelte, or a server-rendered framework)
*   **Backend**: (To be determined - could leverage AeroCode agents or a separate backend service)
*   **Database**: (To be determined - e.g., PostgreSQL, MySQL, or a NoSQL DB for user data and compliance records)

**Data Analytics Consultancy:**
*   **Data Warehouse**: **Snowflake**
*   **Data Transformation**: **dbt (data build tool)** with SQL
*   **Business Intelligence/Visualization**: **Power BI Service**
*   **Orchestration**: (To be determined - e.g., Airflow, Dagster, or dbt Cloud's scheduler)
*   **AI Assistance**: AeroCode (for dbt code generation, automation scripts, Power BI automation)
*   **Version Control**: Git (for dbt projects and any other code)

## Development Environment Setup

**General:**
*   **IDE**: VS Code with Roo Code extension.
*   **Project Management**: Linear.app.
*   **Filesystem Management**: Desktop Commander.
*   **AI Tooling**: MCP integrations for various AI tools, including AeroCode itself once operational.
*   **Version Control**: Git, hosted on (To be determined - e.g., GitHub, GitLab).

**Data Analytics Consultancy Specific:**
*   Local dbt Core installation or dbt Cloud CLI.
*   Access to a Snowflake development environment.
*   Power BI Desktop for report development.
*   Python environment for scripting and AeroCode agent interaction.

## Technical Constraints

*   **Data Security & Privacy:** Critical for HomeschoolingMinds (student PII) and Data Analytics Consultancy (client enterprise data). Compliance with relevant regulations (FERPA, GDPR, CCPA, etc.) is paramount.
*   **Scalability:** Systems (AeroCode, HomeschoolingMinds, Snowflake for DAC) must be designed to handle growth in users, data volume, and complexity.
*   **Interoperability:** AeroCode agents must be easily integrable with various platforms and client systems.
*   **AI Ethics:** Responsible AI development practices must be followed, especially for educational guidance and data analysis.

## Dependencies

*   **External APIs:**
    *   HomeschoolingMinds: Potential HSLDA API, state education department APIs (if available).
    *   Data Analytics Consultancy: Client-specific data source APIs, Snowflake & Power BI APIs.
*   **Cloud Provider Services:** Dependencies on the chosen cloud provider(s) for hosting, storage, and managed services.
*   **Open Source Libraries:** Numerous Python, JS/TS, and dbt packages. Version management is crucial.

## Tool Usage Patterns

*   **AeroCode for Automation:** Leverage AeroCode agents via MCP to automate repetitive coding tasks, generate boilerplate, assist in documentation, and perform initial data analysis where appropriate.
*   **dbt Best Practices:**
    *   Modular data models.
    *   Source control for all dbt code.
    *   Automated testing of data transformations.
    *   Clear documentation for dbt models.
    *   Staging, intermediate, and mart layers for data modeling.
*   **Infrastructure as Code (IaC):** Where feasible, manage cloud infrastructure using IaC tools (e.g., Terraform, CloudFormation).
*   **CI/CD:** Implement CI/CD pipelines for automated testing and deployment of AeroCode agents, HomeschoolingMinds features, and dbt projects.

---

*This document provides an overview of the technical landscape of the project.*