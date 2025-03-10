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
        .min(8, { message: 'Password must be at least 8 characters' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
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
