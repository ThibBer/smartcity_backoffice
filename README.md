# Projet disponible publiquement sur [GitHub](https://github.com/ThibBer/smartcity_backoffice)

# Installation
Ce projet requiert [NodeJS](https://nodejs.org/en/)

## Fichier .env
Créer un fichier .env à la racine du projet qui contient :
```dotenv
REACT_APP_API_URL=http://ip:port/
REACT_APP_API_VERSION=v1
REACT_APP_EXPONENTIAL_RETRY_COUNT=3
REACT_APP_JWT_KEY=jwt
```

## Commandes
```
npm install
npm start #Lance l'application (port 3000 par défaut)
```

- npm install : Installation des dépendances
- npm start : Lance l'application

L'application se lance sur http://localhost:3000