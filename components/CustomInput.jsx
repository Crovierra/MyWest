import { Input } from "./ui/input"

const CustomInput = ({type, name, placeholder, label, className, forLabel, idLabel, value, onChange}) => {
  return (
        <div>
            <label htmlFor={forLabel}>{label}</label>
            <Input
            id={idLabel}
            type={type}
            name={name}
            placeholder={placeholder} 
            className={className}
            value={value}
            onChange={onChange}
            />
        </div>
  )
}

export default CustomInput