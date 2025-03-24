import React from 'react';
import Select from 'react-select';
import TextError from './TextError'
import { ErrorMessage, useFormikContext } from 'formik';
import styles from "./Input.module.scss"

const CustomSelect = (props) => {
    const { name, label, options,required, ...rest } = props;
    const formik = useFormikContext();
    const handleSelectChange = (selectedOption) => {
        formik.setFieldTouched(name, true);
        //console.log('selectedOption', selectedOption)
        //formik.setFieldValue(name, selectedOption ? selectedOption.value : '');
        const value = rest.isCCMember?selectedOption:selectedOption.map((option) => option.value) // Extract only the values
        //console.log('value', value)
        formik.setFieldValue(name, value);
//     const value=rest.isMulti?'true':'false'
// console.log('value', value)
const value1=rest.isCCMember?'true':'false'
//console.log('value1', value1)
    
  
    };
    const customStyles = {
        control: (provided) => ({
          ...provided,
          width: '185px',
          borderRadius: '5px',
          fontWeight: 500,
          border: '0.5px solid #e1e1ef',
          fontSize: '12px',
          color: 'rgb(10, 10, 57) !important',
          
          textAlign: 'start',
          boxShadow:'none',
          padding:'0px',
          '&:hover': {
      border: '0.5px solid #e1e1ef', 
    },
        }),
        placeholder: (provided) => ({
          ...provided,
          color: '#adb5bd',
        }),
        singleValue: (provided) => ({
          ...provided,
          color: 'rgb(10, 10, 57)',
        }),
      };
      
   
    return (
        <div className={styles.inputControl}>
            <span htmlFor={name}>{label}{required?"*":""}</span>
            <Select
                id={name}
                name={name}
                styles={customStyles}
                options={options}
                onChange={handleSelectChange}
                value={formik.values[label]}
                {...rest}
                isSearchable={true}
            />
            <ErrorMessage name={name} component={TextError} />
        </div>
    );
};

export default CustomSelect;
