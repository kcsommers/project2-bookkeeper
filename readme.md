# WDI Project 2 - Bookkeeper

This is a node application designed to allow users to catelogue books, organize notes and quotes, find and create clubs, and see what others are reading.

## Getting Started

This was my first attempt at a full stack application, which also meant my first attempt at planning a full stack application. I spent some time writing on the classroom walls organizing my models and their associations, and really saw how important it is to visualize everything before trying to write it. And the same goes for the frontend. For my last project I didn't use wireframes, so I really wanted to see how much they could help me this time. I spent some time on Mockflow organizing, drawing, and redrawing pages, which was especially helpful because I wanted to use CSS grids to create my templates. After refreshing my memory a bit with how to use grids, it became pretty simple to look at my wireframe and determine how to divide the rows and columns. Having said that, I did spend far more time on css for this project than I was planning to, and certainly more than I was hoping to. I used Materialize as well, and found I had to battle it fairly often to get the pages looking how I wanted. My eye for design is lacking to begin with, and got frustrated at times with how unprofessional the site was looking. 

## Wireframes

### Book Page
![Alt text](./static/img/project2-screenshots/book.png?raw=true "Book Page")

### Group Page
![Alt text](./static/img/project2-screenshots/group.png?raw=true "Group Page")

### Home Page
![Alt text](./static/img/project2-screenshots/home.png?raw=true "Home Page")

### List Page
![Alt text](./static/img/project2-screenshots/list.png?raw=true "List Page")

### Profile Page
![Alt text](./static/img/project2-screenshots/profile.png?raw=true "Profile Page")

### Search results Page
![Alt text](./static/img/project2-screenshots/searchResults.png?raw=true "Search Results Page")



As far as the backend, I was actually pleasantly surprised at how well it all came together. Going in to this project (and going in to this program), I thought this is where I would start to feel overwhelmed. Maybe where everything would start going over my head. But I've found (for the most part) that I am starting to wrap my brain around the things we've gone over. I got more comfortable as the project went on, which could maybe be assumed from the variety of at times chaotic routes I used to pass information around. It was very helpful for all of my models to have corresponding controllers, there's no way I could have stayed sane navigating my editor otherwise. I divided my views up similarly. And while organizing everything that way definately made my life easier, of course there were times my head spun just trying to find the right page to modify. 


## Routes

## main/auth/api controllers
| Method | Path					|
| -------| -------------------- |
| GET	 | / 					|
| GET	 | /auth/signup 		|
| GET	 | /auth/login  		|
| POST 	 | /auth/signup 		|
| POST 	 | /auth/login			|
| GET 	 | /auth/logout			|
| POST 	 | /api					|

## users controller
| Method | Path					|
| -------| --------------------	|
| POST 	 | /user				|
| GET 	 | /user/search			|
| GET 	 | /user/:id			|
| GET 	 | /user/:id/update		|
| POST 	 | /user/id/update		|

## lists controller
| Method | Path					|
| -------| -------------------- |
| GET 	 | /lists/new			|
| GET 	 | /lists/:id			|
| POST 	 | /lists/:id			|
| DELETE | /lists/:id			|

## books controller
| Method | Path					|
| -------| -------------------- |
| POST 	 | /books				|
| POST 	 | /books/update		|
| DELETE | /books/:id			|
| PUT 	 | /books/:id/update	|

## quotes controller
| Method | Path					|
| -------| -------------------- |
| GET 	 | /quotes				|
| POST 	 | /quotes/:id/new		|
| DELETE | /quotes/:id			|
| GET 	 | /notes				|
| POST 	 | /notes/:id/new		|
| DELETE | /notes/:id			|

## groups controller
| Method | Path					|
| -------| -------------------- |
| GET	 | /groups				|
| GET 	 | /groups/:id			|
| GET 	 | /groups/search		|
| POST 	 | /groups/join			|
| GET	 | /groups/:bookId/new	|
| POST 	 | /groups/:id/update	|
| POST 	 | /posts				|


## In the future

Overall I'm pretty happy with this project. I have to admit, at first it didn't feel like something I was going to be incredibly passionate about. But as I got started and did some looking around I had a pretty hard time find something that was doing exactly what I had in mind. Over time, I could see developing it essentially into a facebook specifically for books, and I hope to have time to return to it soon. Obviously in its current state there are tons of privacy issues, and thats what I'm most looking forward to learning to improve this project. It's also not currently mobile, and I think in the real world this app would be much more useful on mobile devices. I definitely want to rectify that as well, and I don't think it will be too much of a challenge with materialize and CSS grids. I would also like to use Google Books' Embedded Viewer API to allow users to read ebooks with the app, and provide links to buy books. 

## Technologies

* HTML
* CSS
* Materialize
* Font Awesome
* javaScript
* jQuery
* Node.js
* Express
* Sequelize
* Postgres

## Acknowledgements
* This woman and her very helpful explantion of sequelize migrations https://www.youtube.com/watch?v=gwrfXtC-y3k&t=390s
* Steve, Kyle and all my helpful and supportive classmates

http://www.example.com or <http://www.example.com>
