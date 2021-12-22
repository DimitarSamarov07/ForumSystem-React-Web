# ForumSystem-Angular-Web

My own project *[ForumSystem](https://github.com/DimitarSamarov07/ForumSystem-Web)* rewritten with React. That's my
project assignment for the React course at SoftUni.

## :pencil: Project Description

This is a quick re-write of my old project. It's a fairly simple forum system with an admin panel, separate from the
publicly accessible pages. The project has 2 layouts - one for the public area and another one for everything related to
the admin panel. I am using Backendless for managing all the data and user authentication. The authentication state in
the app is handled by both Backendless and an AuthProvider, which uses the Context API provided by React.

Admins can create and delete categories. Each category has posts. Posts can be posted by every registered user,
including admins. Users are able to upvote/downvote a post and a score is calculated based on that. Each user has
"karma" points, which increase with each upvote on the same user's posts. The "karma" points also decrease with each
downvote. A user CAN have negative karma. Users can edit their own posts and replies, while admins are able to edit and
delete whatever post they decide to. Replies can only be modified by the author, and they can't be deleted. For security
purposes, admin permissions can only be gained by editing them in directly from the Backendless console. Users can
change a post's content, while admins can additionally change the title.

## How to run the project locally

Running the project is very simple. Open a new terminal, copy the commands below, and you should be good to go.

```
git clone "https://github.com/DimitarSamarov07/ForumSystem-React-Web"
```

```
cd ForumSystem-React-Web/forum-system
```

```
npm start
```

Don't forget to modify the .env file with your own Backendless credentials and populate the database as shown in the
Database schema below. Feel free to open an issue if you encounter something unexpected.

Enjoy :sparkles:

## :hammer: Used technologies and libraries

* React 17
* React Router v6
* Backendless
* Cloudinary
* TinyMCE
* SweetAlert2
* AdminLTE
* DataTables
* Bootstrap
* Context API
* React Spinners
* Moment.js
* Dotenv
* Emotion (primarily as a dependency)

# Link

https://forumsystem.netlify.app/

## Database schema

![](https://i.ibb.co/n0HZBFY/Categories-schema.png)

## :v: Show your opinion

Give a :star: if you like this project!


