# ReactApp
ReacJs FE with SpringBoot BE

In order to run the front end you must have node 16.13.2 installed; Navigate to the "react" folder inside of a terminal(e.g. command promt) and first run "npm install", then run "npm start".
In order to run the back end use the latest version of the Oracle open JDK and run the "ReactAppApplication" class.

Implemented Swagger endpoint overview using [this guide](https://www.baeldung.com/spring-rest-openapi-documentation).
> http://localhost:8080/api/swagger-ui.html

___________________________________

My own note-taking (not very important):

Database console (in-memory so the project needs to be running):
> http://localhost:8080/h2-console/
> 
> User: luminum
> 
> Pass: lustrous

Helpful endpoint defaults
> https://spring.io/guides/tutorials/rest/

[React CRUD 101](https://www.baeldung.com/spring-boot-react-crud).

When setting up the React app, for some reason setting it up inside of package.json with a proxy such as:
> "proxy": "http://localhost:8080/api",
 
and in App.js
> fetch('clients');

The data retriaval does not work.

When it is set up as the bellow it works.

Package.json
> "proxy": "http://localhost:8080",

App.js
> fetch('api/clients');

Run the frontend by navigating to the frontend folder using a terminal/command prompt windows and inputting "npm start". Also, press enter after inputting that.
