import { useState , useEffect, useContext } from "react";
import { ContactContext } from "../../context/contactContext"; 

import { Link , useParams } from "react-router-dom";

import { getContact , getGroup } from "../../services/contactService";
import Spinner from "../Spinner";

const ViewContact = () => {

    const {contactId} = useParams();

    const[state, setState] = useState({
        contact: {},
        group: {}
    })

    const{loading , setLoading} = useContext(ContactContext)

    useEffect(() => {
        const fetchData = async() => {
            try{
                setLoading(true);
                const{data : contactData} = await getContact(contactId)
                const{data : groupData} = await getGroup(contactData.group)

                setLoading(false)
                setState({...state,
                contact: contactData,
                group: groupData})
            }
            catch(error){
                console.log(error.message)
                setState({...state, loading:false})
            }
        }

        fetchData();
    }, []);

    const {contact,group} = state

    return(
        <>
        <section className="view-contact-intro p3">
        <div className="container">
          <div className="row my-2 text-center">
            <p className="h3 fw-bold" style={{ color: "#8be9fd" }}>
              اطلاعات مخاطب
            </p>
          </div>
        </div>
      </section>

      <hr style={{ backgroundColor: "#8be9fd" }} />

      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(contact).length > 0 && (
            <section className="view-contact mt-e">
              <div
                className="container p-2"
                style={{ borderRadius: "1em", backgroundColor: "#44475a" }}
              >
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img
                      src={contact.photo}
                      alt=""
                      className="img-fluid rounded"
                      style={{ border: " 1px solid ", borderColor:"#bd93f9" }}
                    />
                  </div>
                  <div className="col-md-9">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-dark">
                        نام و نام خانوادگی :{" "}
                        <span className="fw-bold">{contact.fullname}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شماره موبایل :{" "}
                        <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        ایمیل : <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شغل : <span className="fw-bold">{contact.job}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        گروه : <span className="fw-bold">{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <Link
                      to={"/contacts"}
                      className="btn"
                      style={{ backgroundColor: "#bd93f9" }}
                    >
                      برگشت به صفحه اصلی
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
        </>
    )
    
}

export default ViewContact;