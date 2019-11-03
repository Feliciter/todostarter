# What's it ?

Todo-list application


# What's inside ?

Parcel + Babel (ES6+) + SASS 

Simple todo front-end boilerplate and Javascript bundlers with <a href="https://github.com/parcel-bundler">Parcel</a> and CSS preprocessing with <a href="https://github.com/sass/sass">Sass</a>.

## Installation

Clone the repository

~~~
$ git clone https://github.com/Feliciter/todostarter.git
~~~

Install dependencies and run the start script (parcel)

~~~
$ npm install
$ npm start OR parcel index.html
~~~

Open the project url `http://localhost:1234/`

## Overview

#### Use story

Simple  todo-list application which includes next functionality:
a title, description, priority fields and a default status - open;
Edit all todo-item fields;
Move todo-item in done status;
Delete todo-item
Search todo-item by title;
Filter todo-item by status;
Filter todo-item by priority.

In use:
pure JavaScript with Babel transpiler;
with Scss  postprocessor;
and module bundler Parcel;


#### Directory structure
~~~
    |-- index.html
    |-- app.js // Main application bundler
    |-- .postcssrc // Parcel configuration
    |-- src
        |-- scss
            |-- common.scss
        |-- js
            |-- [...]
~~~
