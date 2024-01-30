import { bookingReducer } from "../BookMeeting/bookingmeeting.reducer";
import { checkReducer } from "../Check/check.reducer";
import { locationReducer } from "../Location/location.reducer";
import { loginReducer } from "../Login/login.reducer";
import { registerReducer } from "../Register/register.reducer";
import { roomReducer } from "../Room/room.reducer";
import { meetingReducer } from "../TodayMeeting/todaymeeting.reducer";
import { tokenReducer } from "../token.reducer";
import { conditionReducer } from "./Render_redux/condition.reducer";


export const AppState={
    token:tokenReducer,
    condition:conditionReducer,
    location:locationReducer,
    booking:bookingReducer,
    login:loginReducer,
    meeting:meetingReducer,
    check:checkReducer,
    room:roomReducer,
    register:registerReducer
}