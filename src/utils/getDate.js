import { NEXT_YEAR, BEGIN_YEAR } from "./constant"
import { formatDateDB } from "./fomatDate"

export const getYears = () => {
    const arr = []
    for (let i = +BEGIN_YEAR; i <= (+BEGIN_YEAR + NEXT_YEAR); i++) {
        arr.push(i)
    }
    return arr
}

export const getToDayDB = () => {
    const selectedDate = new Date()
    return selectedDate.getFullYear() + '-' + parseInt(selectedDate.getMonth() + 1) + '-' + selectedDate.getDate();
}

export const getWeeksInYear = (year) => {
    const weeks = [];
    const date = new Date(year, 0, 1); // Ngày đầu tiên của năm
    const endDate = new Date(year, 11, 31); // Ngày cuối cùng của năm

    // Đặt ngày vào ngày đầu tuần (thứ 2)
    date.setDate(date.getDate() + (1 - date.getDay() + 7) % 7);

    while (date < endDate) {
        const weekNumber = getWeekNumber(date); // Lấy số tuần từ hàm getWeekNumber()
        const weekStartDate = new Date(date); // Ngày bắt đầu tuần
        const weekEndDate = new Date(date);
        weekEndDate.setDate(weekEndDate.getDate() + 6); // Ngày kết thúc tuần

        const week = {
            weekNumber: weekNumber,
            startDate: weekStartDate,
            endDate: weekEndDate
        };

        weeks.push(week);
        date.setDate(date.getDate() + 7); // Tăng ngày lên 7 để đi đến tuần tiếp theo
    }

    return weeks;
}

export const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    // Lấy ngày đầu tiên của tuần đầu tiên của năm
    const firstWeekDay = firstDayOfYear.getDay(); // 0: Chủ nhật, 1: Thứ hai, ..., 6: Thứ bảy
    const firstWeekStart = new Date(firstDayOfYear); // Sao chép ngày đầu tiên của năm
    firstWeekStart.setDate(firstDayOfYear.getDate() - firstWeekDay);

    // Tính toán số ngày giữa ngày hiện tại và ngày đầu tiên của năm
    const timeDiff = date.getTime() - firstWeekStart.getTime();
    // Chuyển đổi số ngày thành số tuần (1 tuần = 7 ngày)
    const weekNumber = Math.ceil((timeDiff / (1000 * 3600 * 24)) / 7);

    return weekNumber;
}

export const getCurrentWeek = () => {
    const today = new Date(); // Ngày hôm nay
    const currentDay = today.getDay(); // Thứ của ngày hôm nay (0 - Chủ nhật, 1 - Thứ hai, ..., 6 - Thứ bảy)
    const startDate = new Date(today); // Ngày bắt đầu tuần
    const endDate = new Date(today); // Ngày kết thúc tuần

    startDate.setDate(today.getDate() + 1 - currentDay); // Đặt ngày bắt đầu tuần bằng cách trừ số ngày đã trôi qua từ đầu tuần đến ngày hôm nay
    endDate.setDate(today.getDate() + (7 - currentDay)); // Đặt ngày kết thúc tuần bằng cách thêm số ngày còn lại đến hết tuần

    return {
        startDate: formatDateDB(startDate),
        endDate: formatDateDB(endDate)
    };
}
