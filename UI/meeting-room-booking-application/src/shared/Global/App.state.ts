import { locationReducer } from "../Location/location.reducer";
import { tokenReducer } from "../token.reducer";
import { conditionReducer } from "./Render_redux/condition.reducer";


export const AppState={
    token:tokenReducer,
    condition:conditionReducer,
    location:locationReducer
}