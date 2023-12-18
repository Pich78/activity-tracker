export function dateTransform(file_name_date) {
        
    let parts = file_name_date.split('_');
    let year = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-indexed
    let day = parseInt(parts[2], 10);
    let itemDate = new Date(year, month, day);
    return itemDate;
}