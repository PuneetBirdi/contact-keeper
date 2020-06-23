import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactForm = () => {

   //creating the context (this initialization of context exists in another file and is being called here)
   const contactContext = useContext(ContactContext);
   const {addContact, current, clearCurrent, updateContact} = contactContext;

   useEffect(() =>{
      if(current !== null){
         setContact(current);
      }else{
         setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
         })
      }
   },[contactContext, current])
   //create initial state of the contact
   const [contact, setContact] = useState({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
   });

   //destructure the state
   const {name, email, phone, type} = contact;

   //onChange, set the state accordingly
   const onChange = (e) =>{
      setContact({
         ...contact, [e.target.name]:e.target.value
      })
   } 

   //onSubmit, this will call an "addContact" method that exists in the context file, not here. After that it' will reset the component state back to default
   const onSubmit = (e) =>{
      e.preventDefault();
      if(current === null){
         contactContext.addContact(contact);
      }else{
         updateContact(contact);
      }
      setContact({
         name: '',
         email: '',
         phone: '',
         type: 'personal'
      })
   }

   const clearAll = () =>{
      clearCurrent();
   }

   return (
      <form onSubmit={onSubmit}>
         <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
         <input type="text" placeholder="Name" name="name" value={name} onChange={onChange}/>
         <input type="email" placeholder="email@email.com" name="email" value={email} onChange={onChange}/>
         <input type="text" placeholder="111-111-1111" name="phone" value={phone} onChange={onChange}/>
         <h5>Contact Type</h5>
         <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange}/> Personal {' '}
         <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange}/> Professional {' '}
         <div className="">
            <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block"/>
         </div>
         {current && <div>
            <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
            </div>}
      </form>
   )
}

export default ContactForm