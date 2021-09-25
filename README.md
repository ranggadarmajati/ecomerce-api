<p align="center"><a href="#" target="_blank"><img src="https://i.ibb.co/3v7HN7g/courier-api.png" width="400"></a></p>
# Ecomerce-API

This is the Ecomerce API Project.
This project uses the Adonis Framework Js

## Installing AdonisJs CLI
```bash
 npm i -g @adonisjs/cli
```
## Setup Project


1. clone this project and move to project directory
2. install all the dependencies required:
```bash
npm install or yarn install
```
3. Create `.env` file (copy `.env.example` and fill it)
4. Create Postgres Database and set on `.env` file
4. Use the adonis command to install Project :
```js
 adonis key:generate
 
 adonis migration:run

 adonis seed --files RoleSeeder.js

 adonis seed --files UserSeeder.js
```
5. See Router
```js
 adonis route:list
```
6. Run this Project
```js
 adonis serve --dev
```
7. Finish

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)