# **Slide**

## Project Description
Slide is a social media API that allows users to create an account, post thoughts, find friends, and react to friends thoughts. This is a stricly back end project built with Node and Express, and MongoDB with the Mongoose library for the database.

## Table of Contents:
[Project Install](#project-install)

[License](#license)

[Project Usage](#project-usage)

[Project Contribution](#project-contribution)

[Project Testing](#tests)

[Questions](#questions)

## Project Install:
To use this project, simply clone this repo, npm install the dependencies, and start the server in the command line with npm start. Since there is no front end, Insomnia was and can be used for all routes. 


## License:
Please click the license badge for more information on the license under which this project is covered.
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
## Project Usage:
To use this project, there are two root urls from which all other actions stem, users and thoughts.

`http://localhost:3001/api/users`

This is the base route for users. 

This will Get request all users.
This will also Post request a single user according to a JSON body with a username and email key.


`http://localhost:3001/api/users/<userId>`

This will Get request a single user according to the inputted userId.
This will also Put request a single user's Id according to a JSON body with a username key.
This will also Delete request a single user's account.

`http://localhost:3001/api/users/<userId>/friends/<friendId>`

This will Post request a new friend to the userId's friends list.
This will also Delete request a friend from the userId's friends list.


`http://localhost:3001/api/thoughts`

This is the other base route for thoughts. 

This will Get request all thoughts.
This will also Post request a single thought attributed to a user according to a JSON body with keys thoughtText, username, and userId.

`http://localhost:3001/api/thoughts/<thoughtId>`
This will Get request a single thought according to the inputted thoughtId.
This will also Put request a single thought according to a JSON body with a thoughtText key.
This will also Delete request a single thought 

`http://localhost:3001/api/thoughts/<thoughtId>/reactions`
This will Post request a reaction to a specific thought according to a JSON body with keys reactionBody and your username.
This will also Delete request a specific reaction if you include the reactionId in the url after `/reactions`


## Questions:
GitHub Username: CMolitor96

GitHub profile: (https://github.com/CMolitor96)

Please email me at (charlie.molitor.38@gmail.com) for any further questions regarding this application.
