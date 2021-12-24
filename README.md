# Projet disponible publiquement sur [GitHub](https://github.com/ThibBer/smartcity_backoffice)

# Auteurs
- BERNARD Nicolas (etu42888@henallux.be)
- BERG Thibaut (etu43163@henallux.be)

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
npm start
```

- npm install : Installation des dépendances
- npm start : Lance l'application

L'application se lance sur http://localhost:3000