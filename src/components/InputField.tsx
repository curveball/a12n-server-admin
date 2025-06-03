import { TextField } from '@radix-ui/themes';
import clsx from 'clsx';

interface InputFieldProps extends TextField.RootProps {
    error?: string;
    children?: React.ReactNode;
}

const InputField = ({ type, name, value, onChange, error, placeholder, children, ...props }: InputFieldProps) => {
    return (
        <div className='space-y-2'>
            <TextField.Root
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={clsx(
                    'border p-1 rounded w-full',
                    error ? 'border-red-500' : 'border-gray-300',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500',
                )}
                {...props}
            >
                {children}
            </TextField.Root>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
        </div>
    );
};

export default InputField;
