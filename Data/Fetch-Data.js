import axios from 'axios'
import dotenv from 'dotenv'

// WILL HAVE TO HARD CODE DATA FOR HAPPY HOURS as I cannot seem to find any data that has it.

dotenv.config();
// API key works if API key is hard coded in this script. 
const apiKey = process.env.API_KEY


function getHappyHours(location, term) {
  // const apiKey = process.env.API_KEY
  // axios request to Yelp Fusion. I cannot seem to find any API that has data for happy hours.
  const url = `https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}&categories=bars&attributes=hot_and_new&sort_by=rating`;
  return axios.get(url, {
    // authorization header
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  })
  .then(response => {
    // Yelp fusion is sep up a search endpoint. This maps through the search endpoints based on the url above, then returns the results below. However, I have tested multple locations and every result has come back with either null on happy hour or NO
    const businesses = response.data.businesses;
    const happyHours = businesses.map(business => {
      return {
        // returns the data I am interested in for this project.
        name: business.name,
        address: business.location.display_address.join(', '),
        phone: business.display_phone,
        happyHour: business.transactions.includes('happy_hour') ? 'Yes' : 'No',
      };
    });
    return happyHours;
  })
  // error handler
  .catch(error => {
    console.log(error);
  });
}

// calls function to get data from yelp fusion API
getHappyHours('Manhattan', 'happy hour')
  .then(happyHours => {
    console.log(happyHours);
  });