import SearchContact from "./contact/SearchContact";

import { useLocation } from "react-router-dom";

const Navbar = () => {

    const location = useLocation()
    

    return(
        <nav className="navbar navbar-expand-sm shadow-lg">
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                        <div className="navbar-brand">
                        <i className="fas fa-id-badge" style={{color:"#bd93f9"}}></i>{" "}
                        <span style={{color:"#f8f8f2"}}>اپلیکیشن مدیریت{" "}</span>
                        <span style={{color:"#bd93f9"}}>مخاطبین</span>
                        </div>
                    </div>
                    {location.pathname === "/contacts" ? (

                    <div className="col">
                        <SearchContact/>
                    </div>

                    ) : null}
                </div>
            </div>
        </nav>
    )
}

export default Navbar;