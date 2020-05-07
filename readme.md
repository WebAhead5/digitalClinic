

# Digital Clinic

## Intreduction

our task this week was to implement the the following bullets in our project:
- server side rending using handlebars
- authentication + authorization (log-in/register/logout/etc...)
- databases using postgres
- testing  


## Website Concept
we've decided to go with an "app" that helps calm some of your undesired doubts and fears by hosting a platform where you can ask doctors all over the world about helth issues you have or might have,
get their professional opinion by a click of a button. 


### Features
* log in as a doctor or patient
* ask questions and have them asnwered by pZrofessionals
* gorgor you password? you can reset it!


### Initial Concept Art

![](https://i.imgur.com/RayDIJQ.png)



## Code Documentation 
- [database tables structure](https://github.com/WebAhead5/digitalClinic/issues/52)
- [database models structure](https://github.com/WebAhead5/digitalClinic/issues/65)
- [server routes](https://github.com/WebAhead5/digitalClinic/issues/67)
- [cookie keys](https://github.com/WebAhead5/digitalClinic/issues/68)
- [res.locals](https://github.com/WebAhead5/digitalClinic/issues/69)
- [environment variables](https://github.com/WebAhead5/digitalClinic/issues/70)



## work split
we used this ["Project Manager"](https://github.com/WebAhead5/digitalClinic/projects/2)  to split the work between the party members and to keep track of the works that needs to be done.

basically an issue was created for each task, and it was assigned a label and a party member/ pair.


## Streach Goals
all the streach goals can be found [here](https://github.com/WebAhead5/digitalClinic/labels/stretch%20goals).


## Difficulties

#### <u>working on the front end and splitting the work between party members</u>
    
- each member worked on a diffrant section which created lots and lots and conflicts
- the front end was the most neglected part of the project


#### <u>sending an email to the user if he hits the "reset password" in the "login" page</u>
- we didn't have time to send an actual email to the user, but we did send s dommy email
- instructions on how to access that dommy email are logged on the website

## Source
to run the website locally
1) clone the repo
2) add a .env file in the root directory of the project and store in it the following variables ["environment variables"](https://github.com/WebAhead5/digitalClinic/issues/70).
3) run npm install 
4) run the server using npm dev

## Credits
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [express](https://www.npmjs.com/package/express)
- [csurf](https://www.npmjs.com/package/csurf)
- [helmet](https://www.npmjs.com/package/helmet)
- [pg](https://www.npmjs.com/package/pg)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
