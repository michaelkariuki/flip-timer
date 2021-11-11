import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
//COMPONENTS
import Timer2 from "./Timer2";


export default function Routes(){
    return (
        <Router>
            <Route exact path="/" component={Timer2}/>
        </Router>
    )
}

