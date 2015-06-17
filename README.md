# Gulp seed for angular
##### Installation
Instal node js and ruby (for scss). Then run:
```sh 
$ npm install && bower install
```
##### Development running
Start application fist time:
```sh
$ gulp serve
```
This will create simple express server and prepare app for first time.
First time sass sources will be compiled into css. Each next time, you can run gulp default, or gulp command without any task name:
```sh
$ gulp
```
##### Test run
To run app for testing, when sources are compiled, use next command:
```sh
$ gulp host
```
##### Production build
To get production build run next command:
```sh
$ gulp build
```
##### Other tasks
Manually to remove all generated sources (like css files and build folder and generated index.html) run:
```sh
$ gulp clean-generated
```
Manually to generate index.html run:
```sh
$ gulp inject-files
```
Manually to compile all sass files into css files run:
```sh
$ gulp sass
```
To run jshint on sources use:
```sh
$ gulp jshint
```

Вместо index.html нужно править index-inject.html
Index html здесь генерируется на лету при измении файлов.

Тестовое окружение тоже настроено и написан один тест для примера на одну директиву.
