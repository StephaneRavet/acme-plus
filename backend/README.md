# ACME

## Startup

- Node.js must be installed
- Database must be hosted (maybe locally with MariaDB or MySql)
- npm install
- modify .env
- npm run dev

## Routes

| Verb | URI                                      | Level | Controller.method            | Action                                                   | Server response | Redirection client vers : |
| ---- | ---------------------------------------- | ----- | ---------------------------- | -------------------------------------------------------- | --------------- | ------------------------- |
| GET  | /                                        | n/a   | AppController.home           | Rediriger vers la collection.                            | n/a             | GET /product/collection   |
| GET  | /product/collection                      | 1     | ProductController.collection | Afficher les produits par catégories.                    | JSONArray       | VIEW_COLLECTION           |
| GET  | /product/detail/{productId}              | 1     | ProductController.detail     | Afficher le détail d'un produit.                         | JSONObject      | VIEW_DETAIL n/a           |
| POST | /user/tobasket                           | 1     | UserController.tobasket      | Ajouter un produit au panier.                            | OK              | VIEW_DETAIL n/a           |
| GET  | /user/basket                             | 1     | UserController.basket        | Afficher le panier.                                      | JSONArray       | VIEW_BASKET               |
| GET  | /user/checkout                           | 1     | UserController.checkout      | Valider le panier.                                       | OK              | VIEW_CHECKOUT             |
| GET  | /user/orders                             | 1     | UserController.orders        | Afficher la liste des commandes.                         | JSONArray       | VIEW_ORDERS               |
| GET  | /user/order/{orderId}                    | 1     | UserController.order         | Afficher le détail d'une commande.                       | JSONObject      | VIEW_ORDER                |
| GET  | /user/profile                            | 1     | UserController.profile       | Afficher le profil d'un revendeur.                       | JSONObject      | VIEW_PROFILE              |
| GET  | /user/crud                               | 2     | UserController.crud          | Afficher les revendeurs (gestion).                       | JSONArray       | VIEW_CRUD_DEALERS         |
| GET  | /user/edit                               | n/a   | UserController.edit          | Créer un revendeur (saisie).                             | n/a             | VIEW_EDIT_DEALER          |
| GET  | /user/edit/{userId}                      | 2     | UserController.edit          | Modifier un revendeur (saisie).                          | JSONObjet       | VIEW_EDIT_DEALER          |
| GET  | /user/delete/{userId}                    | 2     | UserController.delete        | Supprimer un revendeur.                                  | OK              | GET /user/crud            |
| POST | /user/save                               | 2     | UserController.save          | Sauvegarder un revendeur (création ou modification).     | OK              | GET /user/crud            |
| GET  | /category/crud                           | 2     | CategoryController.list      | Afficher les catégories (gestion).                       | JSONArray       | VIEW_CRUD_CATEGORIES      |
| GET  | /category/edit                           | n/a   | CategoryController.edit      | Créer une catégorie (saisie).                            | n/a             | VIEW_EDIT_CATEGORY        |
| GET  | /category/edit/{categoryId}              | 2     | CategoryController.edit      | Modifier une catégorie (saisie).                         | JSONObject      | VIEW_EDIT_CATEGORY        |
| GET  | /category/delete/{categoryId}            | 2     | CategoryController.delete    | Supprimer une catégorie.                                 | OK              | GET /category/crud        |
| POST | /category/save                           | 2     | CategoryController.save      | Sauvegarder une catégorie (création ou modification).    | OK              | GET /category/crud        |
| GET  | /product/crud                            | 2     | ProductController.list       | Afficher les produits par catégories (gestion).          | JSONArray       | VIEW_CRUD_PRODUCTS        |
| GET  | /product/edit                            | n/a   | ProductController.edit       | Créer un produit (saisie).                               | n/a             | VIEW_EDIT_PRODUCT         |
| GET  | /product/edit/{productId}                | 2     | ProductController.edit       | Modifier un produit (saisie).                            | JSONObject      | VIEW_EDIT_PRODUCT         |
| GET  | /product/delete/{productId}/{all ou img} | 2     | ProductController.delete     | Supprimer un produit et/ou son image.                    | OK              | GET /product/crud         |
| POST | /product/save                            | 2     | ProductController.save       | Sauvegarder un produit (création ou modification).       | OK              | GET /product/crud         |
| GET  | /user/signin                             | n/a   | UserController.signin        | Login (saisie).                                          | n/a             | VIEW_CONNECTION           |
| POST | /user/login                              | 1     | UserController.login         | Login (validation).                                      | OK              | GET /                     |
| GET  | /user/logout                             | 1     | UserController.logout        | Détruire la session.                                     | OK              | GET /user/signin          |
| GET  | /user/password_1                         | n/a   | UserController.password_1    | Saisir l'identifiant pour réinitialiser le mot de passe. | n/a             | VIEW_PASSWORD_1           |
| POST | /user/password_2                         | 1     | UserController.password_2    | Envoyer l'email pour réinitialiser le mot de passe.      | OK              | VIEW_PASSWORD_2           |
| GET  | /user/password_3                         | n/a   | UserController.password_3    | Saisie du nouveau mot de passe.                          | n/a             | VIEW_PASSWORD_3           |
| POST | /user/password_4                         | 1     | UserController.password_4    | Sauvegarde le nouveau mot de passe.                      | OK              | VIEW_PASSWORD_4           |
| GET  | /error_404                               | n/a   | AppController.error_404      | Afficher l'erreur 404 usernalisée.                       | n/a             | VIEW_ERROR_404            |
