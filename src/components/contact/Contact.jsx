import { Link } from "react-router-dom";

const Contact = ({contact, deleteContact}) => {
return(

    <div className="col-md-6">
                    <div className="card my-2" style={{backgroundColor:"#44475a"}}>

                        <div className="card-body">
                            <div className="row align-items-center d-flex justify-content-around">
                                
                                <div className="col-md-4 col-sm-4">
                                    <img src={contact.photo} className="img-fluid rounded" style={{border:"`1px solid #bd93f9`"}} alt={contact.fullname}>
                                    </img>
                                </div>

                                    <div className="col-md-7 col-sm-7">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-dark">
                                                نام و نام خانوادگی: {" "}
                                                <span className="fw-bold">
                                                {contact.fullname}
                                                </span>
                                            </li>

                                            <li className="list-group-item list-group-item-dark">
                                                شماره موبایل: {" "}
                                                <span className="fw-bold">
                                                {contact.mobile}
                                                </span>
                                            </li>

                                            <li className="list-group-item list-group-item-dark">
                                                آدرس ایمیل: {" "}
                                                <span className="fw-bold">
                                                {contact.email}
                                                </span>
                                            </li>

                                        </ul>
                                    </div>

                                    <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center ">

                                        <Link to={`/contacts/${contact.id}`} className="btn my-2" style={{backgroundColor:"#ffb86c"}}>
                                            <i className="far fa-eye"></i>
                                        </Link>

                                        <Link to={`/contacts/edit/${contact.id}`} className="btn my-2" style={{backgroundColor:"#8be9fd"}}>
                                            <i className="fas fa-pen"></i>
                                        </Link>

                                        <button onClick={deleteContact} className="btn my-2" style={{backgroundColor:"#ff5555"}}>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                
                            </div>
                        </div>
                    </div>
                </div>

)

}

export default Contact;