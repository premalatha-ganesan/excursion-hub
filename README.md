## ExcursionHub

ExcursionHub is a web application designed to simplify travel planning. 
It allows its users to browse different attractions across the globe, read the reviews and add them to their wishlists. 
It also allows users to create packages which can be shared with agent or shared with others. 


### Developers

- Andrew Williams
- Brayden Simon
- Premalatha Ganesan

### Technology Stack

[Frontend](https://github.com/AllHubs-June-2024-Liftoff/Dakotah-Group-1/tree/main/capstone/excursionhub)  
- JavaScript
- ReactJS with Material UI
- Web3Forms

[Backend](https://github.com/AllHubs-June-2024-Liftoff/Dakotah-Group-1/tree/main/capstone/src)
- Java
- SpringBoot
- MySQL

## Installation

Both the frontend and backend code is in the same repository.

- Clone this GIT repository using `git clone` command

### Run React App

  - Navigate to `capstone/excursionhub`
  - Run the command `npm install`, This will install all the dependent libraries (like material ui etc.,) needed to run the web app
  - Once the dependencies are installed successfully, Run `npm run dev` to start the web app in development mode
  - Watch the logs to ensure there are no startup errors
  - Application will start in 5173 port by default

### Run Spring Boot App

  - Open the Spring Boot project located under `capstone/src` in IntelliJ IDE
  - Using the Run Configurations option, select the main program as `com.excursionhub.capstone.ExcursionHubApplication` and the following `Environment Variables`. Set the environment variable as per your local setup and create a new Run configuration profile
    ```
    # Database hostname
    APP_DB_HOST=
    # Database schema name
    APP_DB_NAME=
    # Database password
    APP_DB_PASS=
    # Database port
    APP_DB_PORT=
    # Database username
    APP_DB_USER=
    # GMAIL Admin Password used by Password Reset email flow
    EMAIL_PASSWORD=
    ```
  - Start the spring boot application using the Run option in IntelliJ IDE
  - Watch the start up logs to ensure there are no errors during startup
  - Seed data required to run the application will be automatically loaded into the configured local database
  - Application will start and run in default port of `8080`






