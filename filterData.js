function filterData(activity, days, data_array) {
    console.log("Filter Data")
    let cutoff = new Date();
    console.log("Today's date: " + cutoff)
    cutoff.setDate(cutoff.getDate() - days);
    console.log("Past date: " + cutoff)

    return data_array.filter(item => {
        console.log("Data from item: " + item.date)

        let parts = item.date.split('_');
        let year = parseInt(parts[0], 10);
        let month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-indexed
        let day = parseInt(parts[2], 10);
        let itemDate = new Date(year, month, day);

        console.log("Converted item date: " + item.date)
        if (item.activity === activity) {
            console.log(itemDate)
            console.log(cutoff)
            if (itemDate >= cutoff) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    });
}