# MERN-Menu-Broadcaster

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://choosealicense.com/licenses/mit/)
## Description

## Technology Stack

  ![javaScript](https://img.shields.io/badge/-javascript-61DAFB?color=green&style=flat)
  ![expressJS](https://img.shields.io/badge/-express.js-61DAFB?color=red&style=flat)
  ![nodeJS](https://img.shields.io/badge/-node.js-61DAFB?color=teal&style=flat)
  ![mongoDB](https://img.shields.io/badge/-mongoDB-61DAFB?color=pink&style=flat)
  ![mongoose](https://img.shields.io/badge/-mongoose-61DAFB?color=purple&style=flat)

## User Story
```md
AS A user
I WANT an software to allow my business to change menuboards, and specials from location 
SO THAT I can limit time needed and offer an easy solution to making changes
```

## Installation

Mongo DB -
  [Install Guide](https://coding-boot-camp.github.io/full-stack/mongodb/how-to-install-mongodb)
  
Node.js - Verison 16.18.0
  [DownloadLinks](https://nodejs.org/download/release/v16.18.0/)
  Install Node.js
  

## Usage
```md
Menu Software
Software to display Slides/Menus of our choosing to each Device
TV uses embed browser
No longer have to physcially change usbs
Run Specials
    Add specials
    run a special for a day, week, year
    easier last minute corrections
    
Upselling
    broadcast groups images, names, as you enter
    welcomes
    more frequently updated information
```
## Current Roadmap
```md
Build server/client and display page
tv browser to displayed page
style page
load Images, slides
    Working prototype
```
## Notes
```md
Needs:
Update Slide
Update SlideShow
Update Endpoints
Display Endpoints
```
## Preview

## Instructions

## Uploading Slides
(please compress images before uploading, currently being implemented to reduce bandwidth and slow loading on internal network) compressnow.com
Login
Choose File ( must be smaller the 9MB )
press upload - you should then see the picture added to the avaible slildes in create slide show below.

## Creating a Slide Show
```md
Enter a name for the slide show
select the slides you wish to have in the show by clicking on them. they will have a highlighted blue edge to tell you, you have them selected. 
IMPORTANT - the order in which you select the slides is the order in which they play
once set, and name entered press create slideshow
the slideshow should then be listed in the create endpoint list below
```

## Edit Slide Show
```md
if you wish to edit a slide show, with the wrench icon to the right of the slide show name under create endpoint will allow you change a slide show. select the wrench, this will load a page and let you reselect the slides you want. again - order matters.

once set hit update slideshow. you will need to hit back to get back to the home atm. the slide show should now be updated.


Navigating to Endpoints -
LG TV -
	using the TV's web browser app. (TV firmware should be updated to atleast 5.0.x)

	current address: 192.168.3.84:3000/ss/1

	1 - being the deviceID of the endpoint you want the TV to display.

	Front Left Entrance Tv's 1
	Front Left Hanging Tv 3
	Front Right Hanging Tv 4

	once page is loading, press ok on the TV remote for the navigation bar to hide itself.

	POS Menu Endpoints: (this is to be done on the PC, using google chrome, and setting the page to fullscreen with f11.)
	 6 - Reg Prices, w/ Card Fee, buffet
	 7 - Works Best Deal Package
```
