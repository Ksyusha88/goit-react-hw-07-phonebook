import axios from 'axios';
import {
    addContactRequest,
    addContactSuccess,
    addContactError,
    deleteContactRequest,
    deleteContactSuccess,
    deleteContactError,
    fetchContactRequest,
    fetchContactSuccess,
    fetchContactError
} from './actions';

axios.defaults.baseURL = 'http://localhost:4041';

const fetchContact = () => async dispatch =>{
    dispatch(fetchContactRequest());
    
try{
    const {data} = await axios.get('/contacts');
    dispatch(fetchContactSuccess(data));
} catch (error){
    dispatch(fetchContactError(error));
}
};

const addContact = ({name, number}) => dispatch =>{
    const contact = {
        name,
        number
    };

dispatch(addContactRequest);    

axios
.post('/contacts', contact)
.then(({data}) => dispatch(addContactSuccess(data)))
.catch(error => dispatch(addContactError(error)));
};

const deleteContact = contactId  => dispatch => {
    dispatch(deleteContactRequest());

    axios
    .delete(`/contacts/${contactId}`)
    .then(() => dispatch(deleteContactSuccess(contactId )))
    .catch(error => dispatch(deleteContactError(error)));
};

export default {
    addContact,
    deleteContact,
    fetchContact
};