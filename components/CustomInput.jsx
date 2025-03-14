import { Input } from "./ui/input"

<<<<<<< HEAD
const CustomInput = ({type, name, placeholder, label, className}) => {
  return (
        <div>
            <label>{label}</label>
            <Input 
=======
const CustomInput = ({type, name, placeholder, label, className, forLabel, idLabel}) => {
  return (
        <div>
            <label htmlFor={forLabel}>{label}</label>
            <Input
            id={idLabel}
>>>>>>> 064ffc4 (Creating User Interface)
            type={type}
            name={name}
            placeholder={placeholder} 
            className={className}
            />
        </div>
  )
}

export default CustomInput