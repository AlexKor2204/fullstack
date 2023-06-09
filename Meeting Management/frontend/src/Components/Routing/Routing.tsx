import { Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import Add from "../Add/Add";


function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/add" element={<Add/>}/>
                <Route path="/add/:id" element={<Add/>}/>
                <Route path="*" element={<Main/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
