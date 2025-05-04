# Mezikka - Cahier des Charges

## Contexte du Projet

Mezikka est une plateforme communautaire de streaming musical où chaque utilisateur peut créer, partager, et découvrir de la musique. Chaque profil affiche l’activité musicale de l’utilisateur et permet d’interagir avec la communauté via likes, suivis, playlists, et chansons. Un espace administrateur est prévu pour surveiller les statistiques, gérer les utilisateurs et modérer le contenu. La plateforme est conçue pour être sécurisée, rapide et responsive.

---

## 1. Gestion des Utilisateurs

### 1.1 Inscription et Authentification

- **Création de Compte**  
   En tant qu’utilisateur, je souhaite créer un compte avec mon email et un mot de passe afin d’accéder à la plateforme.

- **Connexion**  
   En tant qu’utilisateur, je souhaite me connecter avec mes identifiants pour accéder à mon espace personnel.

- **Authentification Sécurisée (JWT)**  
   En tant qu’utilisateur, je souhaite être authentifié via un système sécurisé JWT afin de protéger mes données, avec les refresh tokens.

### 1.2 Gestion de Profil

- **Personnalisation du Profil**  
   En tant qu’utilisateur, je souhaite modifier mon nom d’utilisateur, avatar et biographie afin de personnaliser mon profil.

- **Consultation de Profils**  
   En tant qu’utilisateur, je souhaite consulter le profil des autres utilisateurs pour découvrir leurs contributions musicales.

- **Contenus du Profil**  
   En tant qu’utilisateur, je souhaite voir sur un profil les playlists, chansons créées, chansons likées, followers et followings.

- **Suivi et Désabonnement**  
   En tant qu’utilisateur, je souhaite suivre ou me désabonner d’un autre utilisateur afin de personnaliser mon flux musical.

---

## 2. Création, Découverte et Lecture Musicale

### 2.1 Création et Partage de Musique

- **Création Musicale In-App**  
   En tant qu’utilisateur, je souhaite créer de la musique via un outil intégré avec enregistrement pour composer sur la plateforme.

- **Sauvegarde via Clé Unique**  
   En tant qu’utilisateur, je souhaite pouvoir sauvegarder et charger mes chansons à l’aide de clés uniques générées automatiquement.

- **Upload de Mes Créations**  
   En tant qu’utilisateur, je souhaite publier mes chansons sur la plateforme pour les partager avec la communauté.

- **Suppression de Mes Chansons**  
   En tant qu’utilisateur, je souhaite pouvoir supprimer mes propres chansons si je ne veux plus les partager.

### 2.2 Découverte et Lecture

- **Recherche de Contenu**  
   En tant qu’utilisateur, je souhaite rechercher des chansons, playlists ou utilisateurs par titre, genre ou nom.

- **Navigation par Genre**  
   En tant qu’utilisateur, je souhaite découvrir de la musique en explorant les genres disponibles.

- **Lecteur Audio**  
   En tant qu’utilisateur, je souhaite lire les chansons via un lecteur intégré pour une expérience fluide.

---

## 3. Engagement et Fonctionnalités Sociales

### 3.1 Likes et Playlists

- **Aimer du Contenu**  
   En tant qu’utilisateur, je souhaite aimer des chansons et playlists pour marquer mes favoris.

- **Voir mes Likes**  
   En tant qu’utilisateur, je souhaite consulter la liste des chansons et playlists que j’ai aimées.

- **Création de Playlists**  
   En tant qu’utilisateur, je souhaite créer des playlists avec un nom, une image de couverture et des chansons.

- **Modification/Suppression de Playlist**  
   En tant qu’utilisateur, je souhaite modifier ou supprimer mes playlists selon mes préférences.

### 3.2 Réseau Social

- **Système de Followers**  
   En tant qu’utilisateur, je souhaite suivre et être suivi en temps réel pour interagir avec d’autres artistes.

- **Statistiques de Profil**  
   En tant qu’utilisateur, je souhaite voir le nombre de personnes que je suis et celles qui me suivent.

---

## 4. Administration de la Plateforme

### 4.1 Tableau de Bord Administrateur

- **Vue Statistique**  
   En tant qu’administrateur, je souhaite voir des statistiques sur les utilisateurs, les chansons, les likes, etc.

### 4.2 Gestion du Contenu et des Utilisateurs

- **Ajout de Genres Musicaux**  
   En tant qu’administrateur, je souhaite ajouter de nouveaux genres à la plateforme pour enrichir le catalogue musical.

- **Suppression de Contenu Utilisateur**  
   En tant qu’administrateur, je souhaite supprimer des chansons, playlists ou remixes ne respectant pas les règles.

- **Suppression de Comptes Utilisateurs**  
   En tant qu’administrateur, je souhaite pouvoir supprimer des comptes utilisateurs si nécessaire.

---

## 5. Performances, Sécurité et Accessibilité

### 5.1 Optimisation Technique

- **Performance Backend**  
   En tant qu’utilisateur, je souhaite bénéficier de réponses rapides et d’une plateforme fluide.

- **Sécurisation des Fichiers Audio**  
   En tant qu’utilisateur, je souhaite que mes chansons soient stockées de manière sécurisée.

- **Responsive Design**  
   En tant qu’utilisateur, je souhaite utiliser la plateforme sur tous les supports (PC, tablette, mobile) sans perte de confort.

---

## Architecture Technique

- **Backend** : Laravel (PHP)
- **Frontend** : React.js, TypeScript
- **Base de Données** : PostgreSQL
- **API** : REST
