// fetchData.js
function fetchData(path) {
    return fetch(path)
        .then(response => response.json())
        .then(files => {
            let data = [];
            files.forEach(file => {
                fetch(file.download_url)
                    .then(response => response.json())
                    .then(fileData => {
                        let date = file.name.substring(0, 10); // extract date from file name
                        fileData.forEach(activity => {
                            data.push({
                                date: date,
                                activity: activity.activity,
                                value: activity.value,
                                unit: activity.unit
                            });
                        });
                    })
                    .catch(error => console.error(error));
            });
            return data;
        })
        .catch(error => console.error(error));
}
