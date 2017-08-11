# Down Days
First Full Stack Application - GA WDIr-Gizmo  
downdays.herokuapp.com

![Register to Join the Down Days Community](/screenshots/register_page.png?raw=true)

*********

A members-only forum for backcountry skiers and snowboarders to upload, share, and discuss information and advice about off-piste terrain, adventure travel, and ski bum life. "The only online forum devoted exclusively to skiing and snowboarding."

![Modal: Start Game](/screenshots/posts_index_page.png?raw=true)

![Modal: Start Game](/screenshots/member_show_page.png?raw=true)

![Modal: Start Game](/screenshots/show_post_page_current_user.png?raw=true)

*********

MVP:

Down Days is a working full-stack application and adheres to the MVC file structure. I built the app using Node.js, Mongoose, Express and EJS.

Models: Users (login credentials), Members, Posts.

Complete RESTful routes and full CRUD.

Data stored in a mongo database and accessed using mongo queries.

Project has its own independent git repo, hosted on Github.

App is deployed online and accessible to the public via Heroku.

*****

FEATURES:

Sessions: User must register and log in to the site in order to view its data.

Current user can view all posts, can create new posts, and can update/delete his/her own posts.

Current user can also update his/her "about me" and profile picture.

Each user has a profile page with a username, a profile picture, an "about me" section, and a list of all their posts, with links to the posts.

THE WHITE ROOM: The homepage of the website (once logged in) is a forum page called "the white room" (named after that epic moment when you're skiing deep powder and you stop, turn, or otherwise cause the powder to engulf you, and all you can see is white, as if you're inside a cloud) which is an index page of all the posts on the site, and a place for skiers and snowboarders to talk to each other about literally anything.

Seed data: visit /members/seed/newdata/viaseedfile to seed data and visit /members/dropdatabase/cannotundo to drop the database.

CSS Partials

*****

APPROACH:

When designing this app, I looked to Reddit for inspiration. My two main goals were a simple, clean front-end design and the ability for users to interact with each other in a casual way via posting and commenting on each other's posts. I also wanted the app to be members-only in order to make it feel intimate and exclusive, like a tight knit group of friends.

*****

UNSOLVED PROBLEMS AND ONGOING GOALS:

There are many features I have not yet added to the site but would like to add, including:

Responsive design and JQuery
Upvotes
Hashtags
Post categories
Comments and comment-ability on posts
Google maps drop pin
Search bar
AJAX
