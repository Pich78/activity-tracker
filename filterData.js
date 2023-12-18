import { dataTransform } from './dateTransform.js'

function filterData(activity, days, data_array) {

    let cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);

    return data_array.filter(item => {

        let itemDate = dateTransform(item.date);

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