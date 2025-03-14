import { Input } from "./ui/input"

const CustomInput = ({type, name, placeholder, label, className}) => {
  return (
        <div>
            <label>{label}</label>
            <Input 
            type={type}
            name={name}
            placeholder={placeholder} 
            className={className}
            />
        </div>
  )
}

export default CustomInput