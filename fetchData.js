// fetchData.js
function fetchData(path) {
    return fetch(path)
        .then(response => response.json())
        .then(files => {
            let promises = files.map(file => {
                return fetch(file.download_url)
                    .then(response => response.json())
                    .then(fileData => {
                        let date = file.name.substring(0, 10); // extract date from file name
                        return fileData.map(activity => {
                            return {
                                date: date,
                                activity: activity.activity,
                                value: activity.value,
                                unit: activity.unit
                            };
                        });
                    });
            });
            return Promise.all(promises);
        })
        .then(dataArrays => [].concat(...dataArrays)) // flatten the array of arrays
        .catch(error => console.error(error));
}
