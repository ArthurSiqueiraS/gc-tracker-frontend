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

const challenges = {
  fornalha: { name: 'Fornalha Infernal', completionTimes: 2, completedTimes: 0 },
  altar: { name: 'Altar da Ruína', completionTimes: 2, completedTimes: 0 },
  ilusoes: { name: 'Torre das Ilusões', completionTimes: 3, completedTimes: 0 },
  berkas: { name: 'Covil do Berkas', completionTimes: 1, completedTimes: 0 },
  harkyon: { name: 'Terra do Julgamento', completionTimes: 3, completedTimes: 0 },
  extincao: { name: 'Torre da Extinção', completionTimes: 3, completedTimes: 0 },
}

const chars = {
  arme: { challenges, splash: 'http://localhost:3000/arme.png' },
  elesis: { challenges, splash: 'http://localhost:3000/elesis.png' },
  lire: { challenges, splash: 'http://localhost:3000/lire.png' },
  lass: { challenges, splash: 'http://localhost:3000/lass.png' },
  ryan: { challenges, splash: 'http://localhost:3000/ryan.png' },
  ronan: { challenges, splash: 'http://localhost:3000/ronan.png' },
  amy: { challenges, splash: 'http://localhost:3000/amy.png' },
  jin: { challenges, splash: 'http://localhost:3000/jin.png' },
  sieghart: { challenges, splash: 'http://localhost:3000/sieghart.png' },
  mari: { challenges, splash: 'http://localhost:3000/mari.png' },
  dio: { challenges, splash: 'http://localhost:3000/dio.png' },
  zero: { challenges, splash: 'http://localhost:3000/zero.png' },
  rey: { challenges, splash: 'http://localhost:3000/rey.png' },
  lupus: { challenges, splash: 'http://localhost:3000/lupus.png' },
  lin: { challenges, splash: 'http://localhost:3000/lin.png' },
  azin: { challenges, splash: 'http://localhost:3000/azin.png' },
  holy: { challenges, splash: 'http://localhost:3000/holy.png' },
  edel: { challenges, splash: 'http://localhost:3000/edel.png' },
  veigas: { challenges, splash: 'http://localhost:3000/veigas.png' },
  uno: { challenges, splash: 'http://localhost:3000/uno.png' },
}

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