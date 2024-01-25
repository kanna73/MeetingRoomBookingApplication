import { locationModel } from "../Location/location.model";
import { tokenModel } from "../token.model";
import { conditionModel } from "./Render_redux/condition.model";

export interface AppStateModel{
    token:tokenModel
    condition:conditionModel
    location:locationModel
}