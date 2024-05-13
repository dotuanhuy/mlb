
export const formatDateVN = (date) => {
    const selectedDate = new Date(date)
    return selectedDate.getDate() + "/"+ parseInt(selectedDate.getMonth()+1) +"/"+ selectedDate.getFullYear();
} 

export const formatDateTimeVN = (date) => {
    const selectedDate = new Date(date)
    return `${selectedDate.getHours()}:${selectedDate.getMinutes()}:${selectedDate.getSeconds()} ${selectedDate.getDate()}/${parseInt(selectedDate.getMonth()+1)}/${selectedDate.getFullYear()}`;
} 

export const formatDateDB = (date) => {
    const selectedDate = new Date(date)
    return selectedDate.getFullYear() + '-' + parseInt(selectedDate.getMonth()+1) + '-' + selectedDate.getDate();
}
