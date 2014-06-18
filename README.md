# Graphc.ly

Graphc.ly is an immediate-feedback programming environment for excruciatingly short programs THAT PRODUCE DOT FILES. 

If you are doing functional programming, c.ly can be good for quickly prototyping a function THAT PRODUCES A DOT FILE.

If you are teaching others how to program or doing a code demo, c.ly is great for showing your students immediate feedback FROM THE DOT FILE.

C.ly is also a collaborative programming environment and can be used for remote pair programming WITH DOT FILES.

## Installation

```bash
$ git clone git@github.com:tetsuharu/graphc.ly.git
$ cd graphc.ly
$ npm install
$ PORT=3000 node server.js
```
then point your browser to http://localhost:3000/ !

## Heroku
Turns out you can install graphc.ly on heroku pretty easily, and overcome your so-called 'security concerns' :)

```bash
$ heroku create
$ heroku labs:enable websockets
$ git push heroku master
$ heroku open
```
