
#Micro PM
This project is under development.

Build with Electron, React Native and Laravel.


### Setup Laravel backend

Go to your backend folder and make a production copy of .env.local

```jsx
cp .env.local .env
```

Open .env and update your Urls

```jsx
//Your Backend URL
APP_URL=http://192.168.178.83:8000
//Your App URL
CORS_URL=http://localhost:19006
//Absolute path to your database
DB_DATABASE=/path/to/your/database/db.sqlite
```

Install [composer](https://getcomposer.org) on your computer and go to your folder and run

```jsx
composer install
```

After that, generate your passport keys

```jsx
php artisan passport:keys
```