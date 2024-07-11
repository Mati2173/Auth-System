# Auth System

## Technologies

![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![DjangoREST](https://img.shields.io/badge/REST_FRAMEWORK-ff1709?style=for-the-badge&logo=django&logoColor=white&color=851111&labelColor=778187)
![Djoser](https://img.shields.io/badge/DJOSER-ff1709?style=for-the-badge&logo=django&logoColor=white&color=092&labelColor=778187)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Description

**Auth System** is a token-based user authentication system **(JWT)** built with **Django, Django Rest Framework y Djoser**. The frontend is developed with **React y Redux Toolkit**, styled with **Tailwind CSS**. This project allows users to register, sign in, and manage their accounts.

## Features

- User registration with email activation and confirmation
- User sign in
- Viewing account data
- Password reset request and email confirmation
- Listing of registered users (staff members only)

## Files and Directories

- **core/**: Directory containing the main Django project.
- **user/**: Directory containing the Django application for the user model.
- **public/**: Static files and entry point for the React application.
- **src/**: Source code of the React application.
- **manage.py**: Main file to manage your Django project.
- **package.json**: File containing npm dependencies and scripts for the frontend.
- **package-lock.json**: Auto-generated file to lock the exact versions of npm dependencies.
- **postcss.config.js**: PostCSS configuration for CSS processing.
- **tailwind.config.js**: Tailwind CSS configuration.
- **requirements.txt**: File listing all the Python dependencies needed for the backend.

## Requirements and Installation

- Have **[Python 3.11.8](https://www.python.org/downloads/)** and **[Node.js 20.15.1](https://nodejs.org/en/download/package-manager)** installed on your PC

- Clone the repository

    ```bash
    git clone https://github.com/Mati2173/Auth-System.git
    cd Auth-System
    ```

### Frontend

- Install the frontend dependencies:

    ```bash
    npm install
    ```

- Build the frontend:

    ```bash
    npm run build
    ```

### Backend

- **Configure environment variables in the .env file**: Create a file named **.env** in the root directory of the project with the following settings

    ```properties
    # DJANGO SETTINGS
    # A secret key for your Django project.
    SECRET_KEY='YourSecretKeyHere'
    # Set to False in a production environment
    DEBUG=True
    # A list of strings representing the host/domain names that this Django site can serve in a production environment
    ALLOWED_HOSTS_DEV='*'


    # DATABASE SETTINGS (WITH POSTGRESQL)
    # The URL of your PostgreSQL database. Database 'name' must exist
    DATABASE_URL='postgres://user:password@host:port/name'

    # EMAIL SETTINGS (WITH SMTP)
    # The SMTP URL for sending emails
    EMAIL_URL='smtp+tls://host_user:host_password@smtp.your-email-provider.com:port'


    # API URL FOR AUTHENTICATION
    # The URL of Django API
    REACT_APP_API_URL='http://localhost:8000/auth'
    ```

    If you need more information on configuring the environment variables, refer to the resources below:
    - [Django Secret Key Generator](https://djecrety.ir/)
    - [How to use PostgreSQL with Django](https://www.enterprisedb.com/postgres-tutorials/how-use-postgresql-django)
    - [Configuring SMTP Server in Django](https://medium.com/django-unleashed/configuring-smtp-server-in-django-a-comprehensive-guide-91810a2bca3f)

- Create and activate a python virtual environment:

    ```bash
    python -m venv venv
    # En Windows
    venv/Scripts/activate 
    # En Unix o MacOS
    source venv/bin/activate  
    ```

- Install the backend dependencies:

    ```bash
    pip install -r requirements.txt
    ```

- Run the Django project migrations:

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

- Collect the static files:

    ```bash
    python manage.py collectstatic
    ```

## Creating a Superuser

To create a superuser in Django, run the following command and follow the prompts:

```bash
python manage.py createsuperuser

Email: johndoe@example.com
First Name: John
Last Name: Doe
Date of birth: 1970-01-01
Profile image: users/johndoe.jpg
Password: ********
Password (again): ********

Superuser created successfully.
```

> The profile image field is optional and can either be left empty or contain the path to your image file in media/users/ (e.g., users/johndoe.jpg).

## Running the application

- Start the application server:

    ```bash
    python manage.py runserver
    ```

- Access the application in your browser: [http://127.0.0.1:8000](http://127.0.0.1:8000)
