import React, {useState, useEffect} from "react";
import axios from "axios";
import * as yup from "yup";



const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field.").min(2, "name must be more than 2 characters"),
    size: yup.string().required("Must Select a Size"),
    pepperoni: yup.boolean().defined(),
    mushrooms: yup.boolean().defined(),
    peppers: yup.boolean().defined(),
    sausage: yup.boolean().defined(),
    specInstr: yup.string().notRequired()
  });

export default function Form() {
    // state for your button and whether you can submit depending on if you fill out required fields

    // state for our form
    const [formState, setFormState] = useState({
        name: "",
        size: "",
        pepperoni: false,
        mushrooms: false,
        peppers: false,
        sausage: false,
        specInstr: ""
    })
    
    // for our errors
    const [errors, setErrors] = useState({
        name: "",
        size: "",
        pepperoni: "",
        mushrooms: "",
        peppers: "",
        sausage: "",
        specInstr: ""
    })

    //state for button
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // state for our post request 
    const [post, setPost] = useState([]);

    

    //input change
    const inputChange = e => {
        e.persist();
        const newFormData = {
          ...formState,
          [e.target.name]:
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        };

        validateChange(e);
        setFormState(newFormData);
      };
    //button disabled
            useEffect(() => {
                formSchema.isValid(formState).then(valid => {
                setButtonDisabled(!valid);
                });
            }, [formState]);
            //validate changes
            const validateChange = e => {
                yup
                  .reach(formSchema, e.target.name)
                  .validate(e.target.value)
                  .then(valid => {
                    setErrors({
                      ...errors,
                      [e.target.name]: ""
                    });
                  })
                  .catch(err => {
                    setErrors({
                      ...errors,
                      [e.target.name]: err.errors[0]
                    });
                  });
              };
        //on submit

    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/orders", formState)
            .then(res => {
                setPost(res.data); 
                    console.log("success", post);
                    console.log(res.data.size)
                setFormState({
                    name: "",
                    size: res.data.size,
                    pepperoni: false,
                    mushrooms: false,
                    peppers: false,
                    sausage: false,
                    specInstr: ""
                });
            })
            .catch(err => console.log("honey somethins broken", err.response));
    };

    

   return(

    <form onSubmit = {formSubmit}>
    <h1>Place an Order!</h1>
    <label htmlFor = 'name'>
        What is your name?
        <br/>
        <input
        type = 'text'
        name = 'name'
        id = 'nameinput'
        placeholder = 'Name'
        value={formState.name}
        onChange={inputChange}
        />
    </label>
            <br />
            <label htmlFor = 'size'>

            <h2>How Big Would you like it!</h2>
            
            <br/>
            <select name = 'size' id = 'sizeinput' onChange = {inputChange}>
                    <option name="default" value={null}></option>
                    <option name="Sm" value='Sm'>Sm</option>
                    <option name="Lg" value='Lg'>Lg</option>
                    <option name="XL" value='XL'>XL</option>
                    <option name="XxL" value='XL'>Super Fat</option>
                </select>
            </label>
            <br/>

            <div className = 'toppingsChecklist'>

            <h2>Select Toppings Honey!</h2>

                <label htmlFor = 'pepperoni'>
                    
                    <input
                        type='checkbox'
                        name='pepperoni'
                        id = 'pepperoniCheckBox'
                        checked={formState.pepperoni} 
                        onChange={inputChange}
                    /> 

                   <h3>Pepperoni</h3> 
                </label>
                <br/>

                <label htmlFor = 'mushrooms'>
                    <input
                        type='checkbox'
                        name='mushrooms'
                        id = 'mushroomsCheckBox'
                        checked={formState.mushrooms} 
                        onChange={inputChange}
                    />
                   <h3> Mushrooms</h3>
                </label>
                <br/>

                <label htmlFor = 'peppers'>
                    <input
                        type='checkbox'
                        name='peppers'
                        id = 'peppersCheckBox'
                        checked={formState.peppers} 
                        onChange={inputChange}
                    /> 
                   <h3> Peppers</h3>
                </label>
                <br/>

                <label htmlFor = 'sausage'>
                    <input
                        type='checkbox'
                        name='sausage'
                        id = 'sausageCheckBox'
                        checked={formState.sausage} 
                        onChange={inputChange}
                    />
                   <h3> Sausage</h3>
                </label>
                <br/>
            </div>

            <label htmlFor = 'Special Instructions'>
            <h3> You need Mama to do something Special for you?</h3>
                <br/>
                <textarea
                name = 'specInstr'
                id = 'specInstrInput'
                placeholder = 'Send me your sugar!'
                value={formState.specInstr} 
                onChange={inputChange}
                />
            </label>
            <br/> <br/> <br/>
            <button name = 'submit' disabled={buttonDisabled}>Pizzas on its way love</button>
            <pre>{JSON.stringify(post, null, 2)}</pre>

            

            </form>
   )

}