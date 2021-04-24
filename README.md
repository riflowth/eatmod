# EatMod
CPE101 Engineering Exploration Project

### :pencil: About
In this project, we are creating a **web application**. Our website offers users food recommendations around **[KMUTT](https://www.kmutt.ac.th)** university. Users can select food tags to filter out foods as they desire.

### :busts_in_silhouette: Members
| Name | Role |
| - | - |
| `Krid Heprakhone` | Fullstack Developer |
| `Keeratikorn Pukayaporn` | Backend Developer |
| `Nathee Jaywaree` | Backend Developer |
| `Natthapon Nuchartwong` | Frontend Developer |

### :wrench: How to install?
This application requires **[NodeJS](https://nodejs.org/)** to provide our system, after finishing NodeJS installation you can follow the instruction below to start EatMod web application.

1. Enter **`npm install`** for installing all modules that use in this project.
2. Move your current directory to **`./server`**
3. Use ***knex migration cli*** to migration/seeding the database.

> You can install *knex-migration-cli* by type **`npm install -g knex`**

*Before running the seed via Knex, make sure you set the collation in the "eatmod" database to **``utf8_unicode_ci``**.*

and then you can do migration/seeding by using the commands below.
```
knex migrate:latest
```
and then
```
knex seed:run
```

4. Once the installation completes, now you can view our web application or contribute to our application.

Feel free to send us the **[pull request](https://github.com/CPE34-A2/EatMod/pulls)** or if you have found out something works malfunction, we would appreciate it if you could let me know by sending us the **[issue ticket](https://github.com/CPE34-A2/EatMod/issues)**.

### 📎 Cheatsheet
You can run the commands below in sequence to run this web application.

```
~/eatmod> npm install
~/eatmod/server> docker-compose -p eatmod up -d
~/eatmod/server> knex migrate:latest
~/eatmod/server> knex seed:run
~/eatmod> npm test
```

*(docker) mysql default port: 3306* <br>
*(docker) phpmyadmin default port: 8000*
