// fetchData.js
async function fetchData(path) {
    try {
        const response = await fetch(path);
        const files = await response.json();
        let promises = files.map(async file => {
            const fileResponse = await fetch(file.download_url);
            const fileData = await fileResponse.json();
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
        let dataArrays = await Promise.all(promises);
        return [].concat(...dataArrays); // flatten the array of arrays
    } catch (error) {
        console.error(error);
    }
}
