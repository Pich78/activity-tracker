function filterData(activity, days, data_array) {
    console.log("Filter Data")
    let cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    return data_array.filter(item => {
        let itemDate = new Date(item.date);
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