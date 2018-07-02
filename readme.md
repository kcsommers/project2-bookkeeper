![Alt text](./static/img/project2-screenshots/book.png?raw=true "Book Page")
![Alt text](./static/img/project2-screenshots/group.png?raw=true "Group Page")
![Alt text](./static/img/project2-screenshots/home.png?raw=true "Home Page")
![Alt text](./static/img/project2-screenshots/list.png?raw=true "List Page")
![Alt text](./static/img/project2-screenshots/profile.png?raw=true "Profile Page")
![Alt text](./static/img/project2-screenshots/searchResults.png?raw=true "Search Results Page")

| Method | Path			|
| -------| ------------ |
| GET	 | / 			|
| GET	 | /auth/signup |
| GET	 | /auth/login  |
| POST 	 | /auth/signup |
| POST 	 | /auth/login	|
| GET 	 | /auth/logout	|
| POST 	 | /api			|

| Method | Path				|
| -------| ----------------	|
| POST 	 | /user			|
| GET 	 | /user/search		|
| GET 	 | /user/:id		|
| GET 	 | /user/:id/update	|
| POST 	 | /user/id/update	|

| Method | Path			|
| -------| ------------ |
| GET 	 | /lists/new	|
| GET 	 | /lists/:id	|
| POST 	 | /lists/:id	|
| DELETE | /lists/:id	|

| Method | Path				|
| -------| ---------------- |
| POST 	 | /books			|
| POST 	 | /books/update	|
| DELETE | /books/:id		|
| PUT 	 | /books/:id/update|

| Method | Path				|
| -------| ---------------- |
| GET 	 | /quotes			|
| POST 	 | /quotes/:id/new	|
| DELETE | /quotes/:id		|
| GET 	 | /notes			|
| POST 	 | /notes/:id/new	|
| DELETE | /notes/:id		|

| Method | Path					|
| -------| -------------------- |
| GET	 | /groups				|
| GET 	 | /groups/:id			|
| GET 	 | /groups/search		|
| POST 	 | /groups/join			|
| GET	 | /groups/:bookId/new	|
| POST 	 | /groups/:id/update	|
| POST 	 | /posts				|
