function filterData(activity, days, data_array) {
    console.log("Filter Data")
    let cutoff = new Date();
    console.log("Today's date: " + cutoff)
    cutoff.setDate(cutoff.getDate() - days);
    console.log("Past date: " + cutoff)

    return data_array.filter(item => {
        console.log("Data from item: " + item.date)
        let itemDate = new Date(item.date);
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