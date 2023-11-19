import { useContext } from "react";

import { ContactContext } from "../../context/contactContext";

const SearchContact = ({query , search}) => {

    const { contactSearch} = useContext(ContactContext)

    return(
        <div className="input-group mx-2 w-75" dir="ltr">
            <span className="input-group-text" style={{background:"#bd93f9"}}>
                <i className="fas fa-search"></i>
            </span>

            <input dir="rtl" type="text" onChange={event => contactSearch(event.target.value)}
            className="form-control" placeholder="جستجوی مخاطبین"></input>
        </div>
    )

}

export default SearchContact;