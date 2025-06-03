import { z } from 'zod';

export const CreateUserModalSchema = z.object({
    nickname: z.string().min(1, { message: 'User Name is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email format' }),
    autoGeneratePassword: z.boolean(),
    autoValidateEmail: z.boolean(),
});

export const UpdateUserModalSchema = z.object({
    nickname: z.string().min(1, { message: 'User Name is required' }),
    active: z.boolean(),
});

export type UserUpdateInitialValues = {
    nickname: string;
    id: string;
    active: boolean;
};

export const CreateAppModalSchema = z.object({
    appName: z.string().min(1, { message: 'App Name is required' }),
    appURL: z.string().url({ message: 'Invalid URL format' }).optional().or(z.literal('')),
});

export const UpdateAppModalSchema = z.object({
    appName: z.string().min(1, { message: 'App Name is required' }),
    appURL: z.string().url({ message: 'Invalid URL format' }).optional().or(z.literal('')),
});

export type UserAppInitialValues = {
    appName: string;
    appURL: string;
};

export interface ActionButtonsProps {
    isUpdate?: boolean;
    isValid: boolean;
    onCreate: () => boolean;
    onClose: () => void;
}

export interface PasswordGeneratedModalProps {
    password: string;
    onClose: () => void;
}

export type FormErrors<T extends z.ZodType<unknown, z.ZodTypeDef, unknown>> = Partial<
    Record<keyof z.TypeOf<T>, string>
>;
export type FormOnChangeFn = (
    name: string,
) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => void;
