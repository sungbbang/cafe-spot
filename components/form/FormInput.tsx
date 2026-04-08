import { Input } from '../ui/input';
import { Label } from '../ui/label';

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

function FormInput({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
}: FormInputProps) {
  return (
    <div className='space-y-2'>
      <Label htmlFor={name}>
        {label}
        {required && <span className='text-destructive'>*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default FormInput;
