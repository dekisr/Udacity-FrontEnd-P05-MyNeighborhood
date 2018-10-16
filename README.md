![MyNeighborhood](https://raw.githubusercontent.com/dekisr/Udacity-FrontEnd-P05-MyNeighborhood/master/myNeighborhood.jpg)

# My Neighborhood

## [**_[ Check the live project ]_**](https://dekisr.github.io/Udacity-FrontEnd-P05-MyNeighborhood)

## Project Overview
The goal was to create a project from scratch using React and Google Maps JavaScript API. Besides that, some requirements was to add functionality using third-party APIs to provide information when a map marker or list view entry is clicked; Implement a list view of the set of locations; Provide a filter option; Display map markers identifying at least 5 locations; Overall, the application's interface should be intuitive to use; All data API's used in the application should load asynchronously, and errors should be handled gracefully;

## About
**Content:**  
I decided to show some of my favorites René Magritte and Salvador Dalí paintings from Surrealism movement(1920s). I hope to see all these paintings in person someday. :pray:  
There is a mark for each of these paintings and also two marks in the middle of nowhere to say something about the artists. The project fetches data from a custom Google Fusion Tables, Wikipedia from Wikimedia REST API and Maps from Google Maps JavaScript API. The Service Worker used here is the one provided by Create React App. :thumbsup:

**Tools:**  
Some tools that helped me a lot:
- create-react-app
- react-google-maps
- react-burger-menu

## Instructions
You can clone or download this repository.
### To run dev environment:
> npm install  
> npm start
### To test build files:
> remove the **line 5**: [```"homepage": "https://dekisr.github.io/Udacity-FrontEnd-P05-MyNeighborhood",```] from the **package.json** file  
> npm run build  
> cd build  
> use some tool to serve a local server like [**_http-server_**](https://github.com/indexzero/http-server)  
> E.g.  
> `npm install http-server -g`  
> `http-server -p 8000`  
> You can change the **8000** to any port you want

### Resources
* [Udacity - Web Front-End Avançado](https://br.udacity.com/course/front-end-web-developer-nanodegree--nd001-br-advanced)
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
* [Google Fusion Tables](https://developers.google.com/fusiontables)
* [Wikimedia REST API](https://en.wikipedia.org/api/rest_v1)
* [Create React App](https://github.com/facebook/create-react-app)
* [React Google Maps](https://github.com/tomchentw/react-google-maps)
* [React Burger Menu](https://github.com/negomi/react-burger-menu)
* [Udacity's HTML Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/index.html)
* [Udacity's CSS Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/css.html)
* [Udacity's JavaScript Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html)
* [Udacity's Git Style Guide](https://udacity.github.io/git-styleguide/)