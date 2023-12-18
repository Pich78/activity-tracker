function filterData(activity, days, data_array) {
    let cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    return data_array.filter(item => {
        let itemDate = new Date(item.date);
        if (item.activity === activity) {
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