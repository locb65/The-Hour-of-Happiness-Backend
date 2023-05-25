# Clink City - An app for Happy Hour Enthusiasts


## To run the app locally:

* Fork and clone down the repository
* cd into the new directory
* run `npm install` to install all depenencies
* open in your favorite code editor
* start your mongodb server locally
    * Mac: run `Mongod` in your terminal
    * WSL: run `sudo systemctl start mongod`
* run `npm start` to run the app 
locally
    * optionally you can run `node Data/seed.js` in the base dir to seed  some test data


## Configuration

* create a .env file in the root dir
* generate key/value pairs like so:

```
SECRET_KEY=your_secret_key
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET_KEY=your_cloudinary_api_secret_key
MONGO_URI=your_mongo_uri
```
## Dependencies

| Dependencies               | Version      |
| -----------                | -----------  |
| axios                      | 1.4.0        |
| bcrypt                     | 5.1.0        |
| cloudinary                 | 1.37.0       |
| cookie-parser              | 1.4.6        |
| cors                       | 2.8.5        |
| dotevn                     | 16.0.3       |
| express                    | 4.18.2       |
| express-sessions           | 1.17.3       |
| mongoose                   | 7.1.0        |
| multer                     | 1.4.5-lts.1  |
| multer-storage-cloudinary  | 4.0.0        |
| passport                   | 0.6.0        |
| passport-local             | 1.0.0        |
| connect-mongo              | 5.0.0        |


These should all be installed when you run `npm install`


## Restaurant Routes

|Method	|Endpoint	|Description|
|-------|-----------|-----------|
|GET	|/happy-hour-time	|Home route|
|GET	|/happy-hour-time/search/name	|Search restaurants by name|
|GET	|/happy-hour-time/:id	|Get restaurant by ID|
|POST	|/happy-hour-time/new-happy-hour-location	|Add a new restaurant|
|PUT	|/happy-hour-time/update-happy-hour-location/:id	|Update a restaurant|
|DELETE	|/happy-hour-time/delete-happy-hour-location/:id	|Delete a restaurant|

## Restaurant Owner Routes

|Method	|Endpoint	|Description|
|-------|-----------|-----------|
|GET	|/accounts/restaurant-owners	|Get all restaurant owners|
|GET	|/accounts/restaurant-owners/:id	|Get restaurant owner by ID|
|GET	|/accounts/restaurant-owners/:id/owned-restaurants	|Get owner's specific restaurants|
|POST	|/accounts/restaurant-owners/new-owner	|Create a new restaurant owner|
|PUT	|/accounts/update-owner/:id	|Update a restaurant owner|
|DELETE	|/accounts/delete-owner/:id	|Delete a restaurant owner|

## Misc Routes

|Method	|Endpoint	|Description|
|-------|-----------|-----------|
|GET    | /check-authentication      |check if a user is authenticated  |
|POST   | /login    | Route for user login authentication|  
|POST   | /logout   | Route for user authentication  | 
|POST   | /upload-img |Route for uploading images|  


## Example JSON Output


For Restaurants:

```
  {
    _id: ObjectId("646d66696740427bb51002b1"),
    name: 'asdasd',
    address: {
      street: '5300 Holmes Run Parkway Apt. 1412',
      city: 'Alexandria',
      state: 'Virginia (VA)',
      zipCode: '22304',
      _id: ObjectId("646d66696740427bb51002b2")
    },
    phone: '8044755826',
    happyHour: {
      day: 'dasdas',
      time: 'dasdas',
      deals: 'dasd',
      _id: ObjectId("646d66696740427bb51002b3")
    },
    menu: 'asdasd',
    restaurantImg: 'https://res.cloudinary.com/dk5rjoauw/image/upload/v1684891264/images_2_lqos6w.jpg',
    owner: ObjectId("646d2d0a94848586a78da287"),
    __v: 0
  }
```

For Users:

```
  {
    _id: ObjectId("646d2d0a94848586a78da287"),
    name: 'test',
    email: 'test2@gmail.com',
    password: '$2b$10$q2KikoGpfR5P85endRr/h.x9qDggJVXOhIGt/WpUbLcMWmk4Shapm',
    restaurants: [
      ObjectId("646d45f60456614c24d027a4"),
      ObjectId("646d5eca6740427bb5100245"),
      ObjectId("646d5f8f6740427bb5100256"),
      ObjectId("646d60e96740427bb510026d"),
      ObjectId("646d612c6740427bb510027b"),
      ObjectId("646d651a6740427bb510029c"),
      ObjectId("646d66696740427bb51002b1")
    ],
    __v: 0
  }
```
## Built with!

* [JavaScript]

## Future additions
1. Fix bug with users auth not persisting on refresh.
2. Fix bug with Heroku deployment status 304
3. Fix bug with check-authentication route not working as intended
4. add a general user model/controllers/routes
5. add a events model/controllers/routes
6. switch from passport.js to another auth framework