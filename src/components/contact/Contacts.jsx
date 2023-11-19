import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { ContactContext } from '../../context/contactContext';
import Contact from './Contact'
import Spinner from '../Spinner'

const Contacts = () => {

    const {filteredContacts, loading, deleteContact} = useContext(ContactContext)

    return(
        <>
        <section className="container">
            <div className="grid">
                <div className="row mt-3">
                    <div className="col">
                        <p className="h3">
                            <Link to={"/contacts/add"} className="btn mx-2" style={{backgroundColor:"#ff79c6"}}>
                                ایجاد مخاطب جدید
                                <i className="fa fa-plus-circle mx-2"></i>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {
            loading ? <Spinner/> : (

                <section className="container">
            <div className="row">
            {filteredContacts.length > 0
            ? (filteredContacts.map((c) => (
            <Contact key={c.id}
            deleteContact={() => deleteContact(c.id, c.fullname)}
            contact={c} />))
            ) : (
              <div
                className="text-center py-5"
                style={{ backgroundColor: "#44475a" }}
              >
                <p className="h3" style={{ color: "#ffb86c" }}>
                  مخاطب یافت نشد ...
                </p>
                <img
                  src={require("../../assets/no-found.gif")}
                  alt="پیدا نشد"
                  className="w-25"
                />
              </div>
            )}

                

            </div>
        </section>
        
            )}
        </>
    )
}

export default Contacts;