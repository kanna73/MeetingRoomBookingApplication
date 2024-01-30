import { BookingEffects } from "../BookMeeting/bookingmeeting.effects";
import { LocationEffects } from "../Location/location.Effects";

export const  AppEffects={
    location:LocationEffects,
    booking:BookingEffects,
    login:LocationEffects
}