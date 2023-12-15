// countFile.js
function countFiles(path) {
    return fetch(path)
        .then(response => response.json())
        .then(data => {
            return data.length;
        })
        .catch(error => console.error(error));
}
