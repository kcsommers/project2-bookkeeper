![Alt text](./static/img/project2-screenshots/book.png?raw=true "Book Page")
![Alt text](./static/img/project2-screenshots/group.png?raw=true "Group Page")
![Alt text](./static/img/project2-screenshots/home.png?raw=true "Home Page")
![Alt text](./static/img/project2-screenshots/list.png?raw=true "List Page")
![Alt text](./static/img/project2-screenshots/profile.png?raw=true "Profile Page")
![Alt text](./static/img/project2-screenshots/searchResults.png?raw=true "Search Results Page")

│ Method │ Path                │
├────────┼─────────────────────┤
│ GET    │ /                   │
├────────┼─────────────────────┤
│ GET    │ /auth/signup        │
├────────┼─────────────────────┤
│ GET    │ /auth/login         │
├────────┼─────────────────────┤
│ POST   │ /auth/signup        │
├────────┼─────────────────────┤
│ POST   │ /auth/login         │
├────────┼─────────────────────┤
│ GET    │ /auth/logout        │
├────────┼─────────────────────┤
│ POST   │ /api                │
├────────┼─────────────────────┤
│ GET    │ /user/search        │
├────────┼─────────────────────┤
│ POST   │ /user               │
├────────┼─────────────────────┤
│ GET    │ /user/:id           │
├────────┼─────────────────────┤
│ GET    │ /user/:id/update    │
├────────┼─────────────────────┤
│ POST   │ /user/:id/update    │
├────────┼─────────────────────┤
│ GET    │ /lists/new          │
├────────┼─────────────────────┤
│ GET    │ /lists/:id          │
├────────┼─────────────────────┤
│ POST   │ /lists              │
├────────┼─────────────────────┤
│ DELETE │ /lists/:id          │
├────────┼─────────────────────┤
│ GET    │ /books/:id          │
├────────┼─────────────────────┤
│ POST   │ /books              │
├────────┼─────────────────────┤
│ POST   │ /books/:id/update   │
├────────┼─────────────────────┤
│ PUT    │ /books/update       │
├────────┼─────────────────────┤
│ DELETE │ /books/:id          │
├────────┼─────────────────────┤
│ GET    │ /quotes/:id/new     │
├────────┼─────────────────────┤
│ POST   │ /quotes             │
├────────┼─────────────────────┤
│ DELETE │ /quotes/:id         │
├────────┼─────────────────────┤
│ GET    │ /notes/:id/new      │
├────────┼─────────────────────┤
│ POST   │ /notes              │
├────────┼─────────────────────┤
│ DELETE │ /notes/:id          │
├────────┼─────────────────────┤
│ GET    │ /groups             │
├────────┼─────────────────────┤
│ GET    │ /groups/search      │
├────────┼─────────────────────┤
│ GET    │ /groups/:id         │
├────────┼─────────────────────┤
│ POST   │ /groups/join        │
├────────┼─────────────────────┤
│ GET    │ /groups/:bookId/new │
├────────┼─────────────────────┤
│ POST   │ /groups             │
├────────┼─────────────────────┤
│ POST   │ /groups/:id/update  │
├────────┼─────────────────────┤
│ POST   │ /posts              │