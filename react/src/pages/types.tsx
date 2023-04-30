

export type ShowData = {
    show_name: string;
    show_desc: string;
    show_pic: string;
    start_time: string;
    end_time: string;
    day_of_week: number;
}
export const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export type Comment = {
    comment_id: number,
    show_id: number,
    time_stamp: string,
    comment_text: string
}
