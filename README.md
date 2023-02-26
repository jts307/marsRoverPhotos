# Mars Rover Photos
This is a website that allows the user to search through images taken by the Mars Rover from the previous day. It also allows the user to post an image to the Mars Rover Instagram. To do so, you need the Mars Rover Facebook login info which is: 

email: marsroverimages@gmail.com
password: kNay%/@/VT&#40;x@G3

The instagram images can be viewed at: https://www.instagram.com/marsroverphotos/

The live website is here: https://relaxed-biscochitos-cb229e.netlify.app

This is probably self-explanatory but I will just say it. To navigate through the photos use the Next/Previous buttons. To upload an image to the Instagram: press "Post to Instagram", login using the Mars Rover facebook info above, give permissions to app, ???, and profit. It will load for a second and the image should be available for viewing on the instagram linked above.

## Backend

The app communicates with a backend api that I created that converts images to an aspect ratio acceptable for instagram.

github for backend: https://github.com/jts307/marsRover-api

heroku for backend: https://mars-rover-instagram.herokuapp.com/

## What went well

I was able to create something that has a practical use. I can imagine it would be nice to look through the Mars Rover Images and the ability to quickly share something you might find interesting is also nice. 

## What went wrong

The only thing that really went wrong is Twitter. For some reason, they will not allow access to their api without approval. They removed essential, i.e. free unapproved, access a few weeks ago which is unlucky. So I had to switch to Instagram which turned out to be decently convoluted because you have to set up a business account, link it to facebook, create a facebook app, and more. It felt like a spent more time looking through account settings and the like on Facebook/Instagram than coding.
