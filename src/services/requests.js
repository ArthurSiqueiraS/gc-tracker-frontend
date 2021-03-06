const axios = require('axios')

let baseURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:8000/'
} else {
  baseURL = 'https://gc-tracker.herokuapp.com/'
}

const client = axios.create({
  baseURL
})

export const fetchChars = () => {
  return client.get('/chars')
}

export const fetchChallenges = () => {
  return client.get('/challenges')
}

export const markChallenge = (char, challenge, marks) => {
  return client.post(`/chars/${char}/mark_challenge`, {
    challenge,
    marks,
  })
}