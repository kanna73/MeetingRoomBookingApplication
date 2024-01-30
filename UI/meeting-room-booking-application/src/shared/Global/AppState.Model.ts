import { BookingPostState } from "../BookMeeting/bookmeeting.model";
import { CheckModel } from "../Check/check.model";
import { locationModel } from "../Location/location.model";
import { LoginState } from "../Login/login.model";
import { RegisterModel } from "../Register/register.model";
import { roomList } from "../Room/room.state";
import { todayMeetingList } from "../TodayMeeting/todaymeeting.state";
import { tokenModel } from "../token.model";
import { conditionModel } from "./Render_redux/condition.model";

export interface AppStateModel{
    token:tokenModel
    condition:conditionModel
    location:locationModel
    booking:BookingPostState,
    login:LoginState,
    meeting:todayMeetingList,
    check:CheckModel,
    room:roomList,
    register:RegisterModel
}