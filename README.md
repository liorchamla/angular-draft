# CONSTRUIRE UN SYSTEME DE ROUTING

0. Introduction + Rappel : ne rien faire à part regarder, et bien comprendre que c'est un exemple et qu'il ne faut absolument pas en tenir compte en réalité !
1. Créer un composant par page (avec path et ngIf)
2. Rendre les liens réactifs (via onClick) + pushState
3. Extraire les routes du template (problème ngOnInit)
4. Cycle de vie : ngAfterViewInit + correction de la navigation
5. Créer une directive link + problème de communication
6. L'événément PopState
7. Créer un service Router pour centraliser la logique
8. Créer un composant pour centraliser le rendu
9. Extraire les routes du service (app.module)
10. Aider à la réutilisation grâce à un module
11. Donner les routes depuis l'extérieur
12. Ajouter des données dans les routes + getActualRoute() dans router + Problème pour AppComponent ngOnInit !!
13. Être au courant lorsque l'adresse change (EventEmitter) + Le soucis du premier chargement
14. Un point sur les Observables RxJS
15. Découverte du BehaviorSubject
16. Réutiliser un observable pour Recevoir les data à chaque fois qu'elles changent ! (pipe + map)
17. Filtrer les signaux de l'observable (distinctUntilChanged)
18. Donner un style au lien actif

## Conclusion et Quizz

# UTILISER LE SYSTEME DE ROUTING LIVRE PAR ANGULAR

1. Importer le RouterModule d'Angular + forRoot
2. Les directives et composants
3. Obtenir les informations sur la route actuelle dans les composants + Problème dans AppComponent
4. Utiliser les événements du Router

# REQUETES HTTP AVEC ANGULAR ET LE HTTPCLIENTMODULE

0. L'API MovieDB - Inscription et APIKey
1. Créer la liste des films en utilisant `fetch()`
2. Tests unitaires et problématique de fetch()
3. Utiliser le client Http d'Angular
4. Tests unitaires
5. Refactoriser dans un service
6. Récupérer les genres de films
7. Raffiner les données via les pipes
8. Tests unitaires
9. Utiliser le SpectatorHttp pour faciliter les tests de services
10. Refactoring tests MoviesComponent en mockant le service
11. Utiliser un intercepteur pour gérer la clé API
12. Tests unitaires

## Conclusion et Quizz

# OBSERVABLES EN PROFONDEUR

1. Ecouter le scroll et reconnaitre le bas de la page
2. L'opérateur _map_ pour modifier le signal
3. L'opérateur _distinctUntilChanged_ pour ne signaler qu'un signal
4. L'opérateur _filter_ pour filtrer les signaux
5. Le problème du _map_ quand on gère un observable
6. L'opérateur _switchMap_ pour maper en un autre observable
7. Récupérer les genres de films
8. L'opérateur de création _forkJoin_ pour unir des signaux
9. La notion de souscription (en regardant le scroll dans movies puis dans movie avec un _tap_)
10. Le cycle de vie NgOnDestroy
11. Créer la page d'un film

## Conclusion et Quizz
