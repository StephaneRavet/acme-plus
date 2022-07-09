# ACME

## Initialisation du projet

Il y a deux fichiers `.env` (dotenv) qui permettent de paramètrer le projet pour qu'il fonctionne sur votre machine, ou pour un déploiement. Voici les deux fichiers ainsi que les variables de configuration qu'ils contiennent :
* `/backend/.env`
  * DB_HOST
  * DB_NAME
  * DB_USER
  * DB_USER_PASSWORD
  * SQL_LOGGING
  * PORT
  * JWT_SECRET_KEY=jwt-secre
* `/frontend/.env`
  * REACT_APP_BACKEND_URL


`REACT_APP_BACKEND_URL` et `PORT` doivent être cohérents, exemple : `PORT=3001` et `REACT_APP_BACKEND_URL=http://localhost:3001`