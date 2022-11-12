import { useState } from 'react';
import css from '../ContactForm/ContactForm.module.css';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addedContact } from 'redux/contacts-slice';

export default function ContactForm() {

    const { contacts } = useSelector(store => store.contacts);
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const nameId = nanoid();
    const numberId = nanoid()

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {

            case 'name':
                setName(value);
                break;

            case 'number':
                setNumber(value);
                break

            default:
                return;
        }
    }

    const isDublicate = (name) => {
        const resault = contacts.find(item => item.name.toLocaleLowerCase() === name.toLocaleLowerCase());
        return resault;
    }

    const handleContact = (e) => {
        e.preventDefault();
        if (isDublicate(name)) {
            return alert(`${name} is already in contacts.`);
        }
        dispatch(addedContact({ name, number }));
        setName('');
        setNumber('');
    }

    return (
        <div className={css.contactForm}>
            <form onSubmit={handleContact}>
                <div className={css.contactFormBlock}>
                    <label className={css.contactFormInput} htmlFor={nameId}>
                        Name
                    </label>
                    <input
                        id={nameId}
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className={css.contactFormBlock}>
                    <label className={css.contactFormInput} htmlFor={numberId}>
                        Number
                    </label>
                    <input
                        id={numberId}
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        value={number}
                        onChange={handleChange}
                    />
                </div>
                <button className={css.btnContactForm}>Add contact</button>
            </form>
        </div>
    );
}