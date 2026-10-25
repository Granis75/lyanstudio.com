# Registre de référence — Lyan Studio

**Date de référence : 24 octobre 2026**  
**Périmètre volontairement limité : 4 produits.**  
**Nature : document d'organisation, pas certification technique ni feuille de route de nouveaux projets.**

Ce document est le point d'entrée **éditorial** : il aide à retrouver le code, la documentation, les démonstrations et les limites de chaque réalisation. Le dépôt de chaque application reste la référence pour son **code et son historique**. En cas de divergence, vérifier le commit exact et corriger le texte public ; ne pas supposer qu'une fonctionnalité présente en source est déployée.

## 1 — Les quatre produits

| Produit | Besoin principal | Dépôt source | Présentation publique | Statut et frontière de preuve |
|---|---|---|---|---|
| **Kepler Express** | Logistique : clients, missions, dépenses, factures et paiements | [Kepler-Express](https://github.com/Granis75/Kepler-Express) (public) | [Portfolio](https://www.lyanstudio.com/work.html#kepler) · [Interface](https://kepler.lyanstudio.com/) | Implémentation de référence ; code et frontend accessibles. Tests complets, parcours authentifiés et adoption réelle non validés dans ce registre. |
| **AlCaisse** | Supérette : encaissement, articles, stock, sessions de caisse, reçus et sauvegardes | [alcaisse](https://github.com/Granis75/alcaisse) (privé) | [Portfolio](https://www.lyanstudio.com/work.html#alcaisse) · [Étude de cas](https://www.lyanstudio.com/alcaisse-evidence.html) | Projet client selon le développeur ; exécutable Windows x86 fourni et examiné, installation sous Windows déclarée. La [simulation web](https://www.lyanstudio.com/alcaisse-demo.html) est un produit distinct, **pas le binaire Windows**. |
| **MyBi** | Microentrepreneur : clients, missions, facturation, encaissements et pilotage | [mybi-business-app](https://github.com/Granis75/mybi-business-app) (privé) | [Portfolio](https://www.lyanstudio.com/work.html#mybi) · [Application web MyBi](https://mybi.lyanstudio.com/) | Utilisation personnelle déclarée ; modules applicatifs présents en source. Application web identifiée ; parcours authentifiés et exécution récente des tests non vérifiés indépendamment. |
| **StayOps** | Hôtellerie : opérations quotidiennes, ménage, maintenance, transmissions, linge et fournitures | [stayops-core](https://github.com/Granis75/stayops-core) (privé) | [Portfolio](https://www.lyanstudio.com/work.html#stayops) · [Étude de cas](https://www.lyanstudio.com/stayops-evidence.html) | Code orienté **opérations hôtelières** ; réservations utilisées comme contexte, **pas comme positionnement PMS**. La [démo publique](https://stayops.lyanstudio.com/demo/workspace) reste ancienne et davantage centrée sur les réservations. |

**Principe :** un lien qui répond en HTTP 200 prouve une ressource accessible, pas le bon fonctionnement d'un workflow métier. Un test automatisé réussi ne prouve ni l'utilisation client, ni une validation de sécurité en production.

## 2 — Où chercher la bonne information

| Besoin | Référence |
|---|---|
| Présentation à un recruteur ou client | [Lyan Studio — les quatre projets](https://www.lyanstudio.com/work.html) |
| Profil public synthétique | [README du profil GitHub](https://github.com/Granis75) |
| Kepler : architecture et fonctionnement | [README Kepler](https://github.com/Granis75/Kepler-Express#readme), `src/`, `supabase/` |
| AlCaisse : fonctionnement desktop et livraison | [README AlCaisse (privé)](https://github.com/Granis75/alcaisse#readme), `docs/RELEASE.md`, `docs/CLIENT_BINARY_EVIDENCE_2026-10.md` |
| MyBi : parcours produit et code | [README MyBi (privé)](https://github.com/Granis75/mybi-business-app#readme), `app/frontend/README.md` |
| StayOps : véritable plateforme opérationnelle | [README StayOps (privé)](https://github.com/Granis75/stayops-core#readme), `docs/OPERATIONS_PLATFORM_CONTRACT.md`, `docs/STAYOPS_TRANSFORMATION.md` |

Les liens vers les dépôts privés nécessitent un accès autorisé. Ne jamais publier d'informations client, de vrais tickets, de factures nominatives ou des identifiants pour rendre une démo plus attractive.

## 3 — Points ouverts à traiter, sans dériver du périmètre

| Priorité | Produit | Travail ciblé | Condition pour déclarer « vérifié » |
|---|---|---|---|
| **P0** | AlCaisse | Contrôler les permissions sur les appels IPC Electron sensibles | Tests négatifs sur les rôles et le processus principal, avec révision identifiée |
| **P0** | StayOps | Réexaminer la sécurité Auth/RLS et les migrations **dans un environnement isolé** | Rapport de test daté, provenance de la base et résultats conservés |
| **P1** | Kepler Express | Tester les règles métier, le build et l'isolement des organisations | Logs CI et tests de droits sur environnement de test |
| **P1** | MyBi | Vérifier le vrai parcours de facturation et les accès aux documents | Tests exécutés avec données fictives et capture anonymisée du fonctionnement |
| **P1** | StayOps | Montrer le vrai parcours opérationnel : tâches, transmissions, ménage | Démo fidèle au code opérationnel actuel, avec limites explicites |
| **P1** | AlCaisse | Rapprocher l'exécutable client et la documentation | Version, scénario de recette anonymisé, matériel réellement testé ou marqué non vérifié |
| **P2** | Lyan Studio | Contrôler liens, lisibilité mobile, accessibilité et contact | Recette navigateur datée, sans toucher au code des quatre produits |

Ces sujets sont des **actions de vérification et d'entretien**, pas une autorisation de développer de nouvelles fonctionnalités ni d'appliquer des changements à une base de production.

## 4 — Hors périmètre, mais préservé

Les dépôts et expériences **OpsCoreV, StorePilot, Vesper, Lyan & Co et IT Ops Desk** ne font pas partie des quatre produits présentés. Leurs fichiers ou leurs URL historiques peuvent subsister. **Ne pas les supprimer, fusionner ni archiver automatiquement** : toute opération de maintenance sur ces archives doit être décidée séparément.

- [Audit de portfolio du 23 octobre 2026](product-portfolio-audit-2026-10.md) : photographie historique, dont des choix de sélection depuis remplacés ; **ce n'est pas la liste actuelle**.
- [Rapport d'implémentation du 7 octobre 2026](implementation-report.md) : historique de travaux antérieurs ; les descriptions de pages et les résultats de tests qu'il contient correspondent à cette date, **pas à l'état de production actuel**.

## 5 — Règle de changement

Avant toute modification, écrire : **problème observé → fichier ou fonctionnalité concernée → changement minimal → méthode de vérification → risque de régression**.

Aucune refonte, ajout de produit, suppression, modification de données client, migration ou déploiement de production au seul motif de « rendre le portfolio plus impressionnant ». Mettre à jour ce registre seulement après avoir vérifié une nouvelle preuve ou acté une décision explicite.
