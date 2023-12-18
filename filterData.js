function filterData(activity, days, data_array) {

    let cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    return data_array.filter(item => {

        let parts = item.date.split('_');
        let year = parseInt(parts[0], 10);
        let month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-indexed
        let day = parseInt(parts[2], 10);
        let itemDate = new Date(year, month, day);

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