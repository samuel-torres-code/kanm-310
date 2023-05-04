

export type ShowData = {
    show_id?: string;
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
    comment_text: string,
    time_stamp: string,
    show_id: number,
    user_id: number,
    username: string
}

export type User = {
    user_id: number;
    username: string;
    password: string;
    email: string;
    first_name: string;
    last_name: string;
    show_name?: string;
  }
  

  export type UserShowData = User&ShowData;

  export type SongPlay = {
    set_id: string;
    track_id: string;
    track_name: string;
    track_runtime: string;
    track_artist: string;
    track_album: string;
    category: string;
    mandatory: string;
    time_stamp: string;
    show_id: string;
    show_name: string;
    set_date: string;
  };
  export type ShowSets = {
    
        [set_id: string]: SongPlay[];
      
      
  };
  