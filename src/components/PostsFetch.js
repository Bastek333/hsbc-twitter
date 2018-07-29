export default function postsFetch() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
  }

