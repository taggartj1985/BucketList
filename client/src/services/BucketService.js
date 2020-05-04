const baseUrl = 'http://localhost:3000/api/countries/';

export default {
  getBucketList() {
    return fetch(baseUrl)
    .then(res => res.json())
  },

  postVisit(payload){
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
  },

  updateCountry(id, payload){
    return fetch(baseURL + id, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
  }
}
