import { z } from 'zod';

export const CreateUserModalSchema = z.object({
    userName: z.string().min(1, { message: 'User Name is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email format' }),
    autoGeneratePassword: z.boolean(),
    autoValidateEmail: z.boolean(),
});

export const UpdateUserModalSchema = z.object({
    userName: z.string().min(1, { message: 'User Name is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email format' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters, should contain at least 1 uppercase & lowercase letter, and 1 number' })
});

export type UserUpdateInitialValues = {
    userName: string;
    email: string;
    password: string;
};

export interface ActionButtonsProps {
    isUpdate?: boolean;
    isValid: boolean;
    onCreate: () => boolean;
    onClose: () => void;
}

export type FormErrors<T extends z.ZodType<unknown, z.ZodTypeDef, unknown>> = Partial<
    Record<keyof z.TypeOf<T>, string>
>;
export type FormOnChangeFn = (
    name: string,
) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => void;
