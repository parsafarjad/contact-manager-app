import { Link } from "react-router-dom";
import { useContext } from "react";
import { Formik, Form, Field,ErrorMessage } from "formik";

import { ContactContext } from "../../context/contactContext";
import Spinner from "../Spinner";
import { values } from "lodash";
import {contactSchema} from "../../validations/contactValidation"

const AddContact = () => {

    const{loading, groups, createContact} = useContext(ContactContext)


    return(
        <>
        {loading ? (<Spinner/>) : (<>
        
            <section className="p-3">
                <img src={require("../../assets/man-taking-note.png")}
                height="400px"  alt=""
                style={{position:"absolute", zIndex:"-1", top:"150px", left:"100px", opacity:"50%"}}/>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 fw-bold text-center" style={{color:"#50fa7b"}}>
                                ساخت مخاطب جدید
                            </p>
                        </div>
                    </div>

                    <hr className="mb-2" style={{color:"#50fa7b"}}/>

                    <div className="row mt-5">
                        <div className="col-md-4">

                            <Formik
                            initialValues= {{
                                fullname:"",
                                photo:"",
                                mobile:"",
                                email:"",
                                job:"",
                                group:"",
                            }}
                                validationSchema= {contactSchema}
                                onSubmit= {(values) => {
                                    console.log(values)
                                    createContact(values)
                                }}
                                >
                            
                            
                            <Form>
                                <div className="mb-2">
                                    <Field 
                                    className="form-control"
                                    name="fullname"
                                    type="text"
                                    placeholder="نام و نام خانوادگی"
                                    
                                    >
                                    </Field>
                                   <ErrorMessage name="fullname" render={msg => <div className="text-danger">{msg}</div>}/>
                                </div>
                                <div className="mb-2">
                                    <Field
                                    className="form-control"
                                    name="photo"
                                    type="text"
                                    placeholder="آدرس تصویر"

                                    >
                                    </Field>
                                    <ErrorMessage name="photo" render={msg => <div className="text-danger">{msg}</div>}/>
                                </div>
                                <div className="mb-2">
                                    <Field
                                    className="form-control"
                                    name="mobile"
                                    type="number"
                                    placeholder="شماره موبایل"

                                    >
                                    </Field>
                                    <ErrorMessage name="mobile" render={msg => <div className="text-danger">{msg}</div>}/>
                                </div>
                                <div className="mb-2">
                                    <Field
                                    className="form-control"
                                    name="email"
                                    type="email"
                                    placeholder="آدرس ایمیل"

                                    >
                                    </Field>
                                    <ErrorMessage name="email" render={msg => <div className="text-danger">{msg}</div>}/>
                                </div>
                                <div className="mb-2">
                                    <Field
                                    className="form-control"
                                    name="job"
                                    type="text"
                                    placeholder="شغل"

                                    >
                                    </Field>
                                    <ErrorMessage name="job" render={msg => <div className="text-danger">{msg}</div>}/>
                                </div>
                                <div className="mb-2">
                                    <Field className="form-control"
                                    name="group"
                                    as="select"

                                    >
                                        <option value="">انتخاب گروه</option>

                                        {groups.length > 0 &&
                                            groups.map((group) => (
                                                <option key={group.id} value={group.id}>
                                                    {group.name}
                                                </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="group" render={msg => <div className="text-danger">{msg}</div>}/>
                                </div>
                                <div className="mx-2">
                                    <input
                                    className="btn"
                                    type="submit"
                                    style={{backgroundColor:"#bd93f9"}}
                                    value="ساخت مخاطب"></input>

                                    <Link
                                    to={"/contacts"}
                                    className="btn mx-2"
                                    style={{backgroundColor:"#6272a4"}}>انصراف</Link>
                                </div>

                            </Form>
                            </Formik>                      
                        </div>
                    </div>
                </div>
            </section>

        </>) 
        }
        </>
    )

}

export default AddContact;