import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: false,
    street: false,
    postalCode: false,
    city: false,
  });
  const [state, setState] = useState({
    nameIsTouched: false,
    streetIsTouched: false,
    postalCodeIsTouched: false,
    cityIsTouched: false,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const validateName = /^[a-zA-Z\s]{2,50}$/.test(enteredName);
    const enteredStreet = streetInputRef.current.value;
    const validateStreet = /^[a-zA-Z0-9\s,'-]{3,100}$/.test(enteredStreet);
    const enteredPostalCode = postalCodeInputRef.current.value;
    const validatePostalCode = /^[0-9]{5}(-[0-9]{4})?$/.test(enteredPostalCode);
    const enteredCity = cityInputRef.current.value;
    const validateCity = /^[a-zA-Z\s]{2,50}$/.test(enteredCity);

    setFormInputValidity({
      name: validateName,
      street: validateStreet,
      postalCode: validatePostalCode,
      city: validateCity,
    });

    setState({
      nameIsTouched: true,
      streetIsTouched: true,
      postalCodeIsTouched: true,
      cityIsTouched: true,
    });

    const formIsValid =
      validateName && validateStreet && validatePostalCode && validateCity;

    if (!formIsValid) {
      return;
    }

    console.log(enteredName, enteredStreet, enteredPostalCode, enteredCity);
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          !formInputValidity.name && state.nameIsTouched ? classes.invalid : ""
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          ref={nameInputRef}
          onBlur={() =>
            setState((prevState) => ({ ...prevState, nameIsTouched: true }))
          }
        />
        {!formInputValidity.name && state.nameIsTouched && (
          <p>Please enter name</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.street && state.streetIsTouched
            ? classes.invalid
            : ""
        }`}
      >
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          ref={streetInputRef}
          onBlur={() =>
            setState((prevState) => ({ ...prevState, streetIsTouched: true }))
          }
        />
        {!formInputValidity.street && state.streetIsTouched && (
          <p>Please enter street</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.postalCode && state.postalCodeIsTouched
            ? classes.invalid
            : ""
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          ref={postalCodeInputRef}
          onBlur={() =>
            setState((prevState) => ({
              ...prevState,
              postalCodeIsTouched: true,
            }))
          }
        />
        {!formInputValidity.postalCode && state.postalCodeIsTouched && (
          <p>Please enter postal code</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          !formInputValidity.city && state.cityIsTouched ? classes.invalid : ""
        }`}
      >
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          ref={cityInputRef}
          onBlur={() =>
            setState((prevState) => ({ ...prevState, cityIsTouched: true }))
          }
        />
        {!formInputValidity.city && state.cityIsTouched && (
          <p>Please enter city</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
