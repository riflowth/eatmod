# EatMod
CPE101 Engineering Exploration Project

### :pencil: About
In this project, we are creating a **web application**. Our website offers users food recommendation around **[KMUTT](https://www.kmutt.ac.th)** university. Users can select food tags to filter out foods as they desire.

### :busts_in_silhouette: Members
| Name | Role |
| - | - |
| `Krid Heprakhone` | Frontend Developer |
| `Keeratikorn Pukayaporn` | Backend Developer |
| `Nathee Jaywaree` | Backend Developer |
| `Natthapon Nuchartwong` | Frontend Developer |

### :wrench: How to install?
1. Enter **`npm install`** for installing all modules that use in this project.
2. Use ***knex migration cli*** to migration/seeding the database by use commands below.
```
knex migrate:latest
```
and then
```
knex seed:run
```

> You can install *knex-migration-cli* by type **`npm install -g knex`**

### :computer: For devs
To start developing, you can run the command below in sequence.

```
~/eatmod> npm init
~/eatmod/server> docker-compose -p eatmod up -d
~/eatmod/server> knex migrate:latest
~/eatmod/server> knex seed:run
~/eatmod> npm test
```

*(docker) mysql default port: 3306*
*(docker) phpmyadmin default port: 8000*
