import React, {useState, useEffect} from "react";
import axios from "axios";
import * as yup from "yup";
import { Link } from "react-router-dom"

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
    // state for our errors
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
    const [button, setButton] = useState(true);

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
            setButton(!valid);
        });
    }, [formState]);

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

    

   return()

}