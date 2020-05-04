

# Template For New Projects

## Initializing the project
<details>
<summary>initialize project</summary>

### must
- [ ] setup .env file with DB_URL and "DB_TEST_URL"
- [ ] initialize database in "db_build.sql"
- [ ] setup router handlers (in the ./server/routes folder)
- [ ] link the routes to the "router.js" file
- [ ] setup the "./server/routes/error.js" 

------------
- [ ] check [tape-promise](https://www.npmjs.com/package/tape-promise).
-----------
### templating 
- [ ] setup main layout (main.hbs) 
- [ ] add views 
- [ ] add helpers
-----------
### optional
- [ ]  show and implement 404.html - page not found
- [ ]  show and implement 500.html - page not found

</details>


----------

## Website Concept

## Initial Website Design (using Figma)

## Database Tables

## Code Structure diagram
![](https://i.imgur.com/Iiceqzi.png)

## the site's routes + params

## Database SQL CRUD Guidelines

- <u>readAll</u>(cb)
    - returns the entire table
    -  cb = (err,rows)=>{}
- <u>read</u>(count, offset, cb)
    -  returns the number of elements starting from the offset index
    -  cb = (err,rows)=>{} 
- <u>count</u>(cb)
    - returns the number of rows
    - cb = (error,count) => {}
- <u>create</u>(obj,cb)
    - obj - key value pairs matching the column name and their values
    - cb => (err)=>{}
- <u>delete</u>(id, cb)
    - cb = (err)=>{}


## Database Input validators
create a seprate file for input validation

## front-end logic Stricture
logic comunicate with the backend using the provided routes

## Work Splitting


- **<u>pair 1</u>**
    - server
        - [ ]
    - SQL
        - [ ]
    - logic
        - [ ]
    - dom
        - [ ]

        

        
- **<u>pair 2</u>**
    - server
        - [ ]
    - SQL
        - [ ]
    - logic
        - [ ]
    - dom
        - [ ]

