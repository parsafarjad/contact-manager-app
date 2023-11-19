import { useEffect, useState, useContext } from "react";

import {Formik, Form, Field, ErrorMessage} from "formik"

import { Link , useNavigate , useParams } from "react-router-dom";

import { useImmer } from "use-immer";

import {toast} from "react-toastify"

import { ContactContext } from "../../context/contactContext";
import { getContact, updateContact } from "../../services/contactService";
import Spinner from "../Spinner";

import {contactSchema} from "../../validations/contactValidation"

const EditContact = () => {

    const {contactId} = useParams();
    const navigate = useNavigate();
    const{loading, setLoading, groups, contacts, setContacts, setFilteredContacts} = useContext(ContactContext)

    const [contact, setContact] = useImmer({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const {data : contactData} = await getContact(contactId);

                setLoading(false)
                setContact(contactData)

            }
            catch (error){
                console.log(error.message)
                setLoading(false)
            }
        }

        fetchData();
    }, [])

    const submitForm = async(values) => {
    
        try{
            setLoading(true)
            const {data, status} = await updateContact(values, contactId);

            if(status === 200){
                setLoading(false)

                toast.info("مخاطب با موفقیت ویرایش شد")

                setContacts((draft) => {
                  const contactIndex = draft.findIndex(
                    (contact) => contact.id === parseInt(contactId)
                  )
                  draft[contactIndex] = {...data}
                })

                setFilteredContacts((draft) => {
                  const contactIndex = draft.findIndex(
                    (contact) => contact.id === parseInt(contactId)
                  )
                  draft[contactIndex] = {...data}
                })
                
                navigate("/contacts")
            }
        }
        catch(error){
            console.log(error.message)
            setLoading(false)
        } 
    }
 
    return(

        <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: "#ffb86c" }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: "#ffb86c" }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">

                              <Formik
                                initialValues= {contact}
                                validationSchema={contactSchema}
                                onSubmit= {(values) => {
                                    console.log(values)
                                    submitForm(values)
                                }}
                              >
                            
                            
                            <Form>
                                <div className="mb-2">
                                    <Field
                                    className="form-control"
                                    name="fullname"
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
                                    value="ویرایش مخاطب"></input>

                                    <Link
                                    to={"/contacts"}
                                    className="btn mx-2"
                                    style={{backgroundColor:"#6272a4"}}>انصراف</Link>
                                </div>

                            </Form>
                            </Formik>

                </div>
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: "1px solid" , borderColor:"#bd93f9" }}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
                alt=""
              />
            </div>
          </section>
        </>
      )}
    </>

    )
}

export default EditContact;