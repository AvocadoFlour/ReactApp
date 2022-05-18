# ReactApp
ReacJs FE with SpringBoot BE

Implemented Swagger endpoint overview using [this guide](https://www.baeldung.com/spring-rest-openapi-documentation).
> http://localhost:8080/api/swagger-ui.html

Database console
> http://localhost:8080/h2-console/
> 
> User: luminum
> 
> Pass: lustrous

Helpful endpoint defaults
> https://spring.io/guides/tutorials/rest/

When setting up the React app, for some reason setting it up inside of package.json with a proxy such as:
> "proxy": "http://localhost:8080/api",
 
and in App.js
> fetch('clients');

The data retriaval does not work.
When it is set up as the bellow it works
Package.json
> "proxy": "http://localhost:8080",

App.js
> fetch('api/clients');
