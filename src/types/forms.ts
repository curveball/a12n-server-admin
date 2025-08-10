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
    name: z.string().optional(),
    locale: z
        .string()
        .optional()
        .refine((val) => !val || /^([a-zA-Z]{2,3})-([a-zA-Z]{2,4})$/.test(val), {
            message: 'Locale must be in format en-US, where language is 2 or 3 letters and country is 2 to 4 letters',
        }),
    givenName: z.string().optional(),
    middleName: z.string().optional(),
    familyName: z.string().optional(),
    birthdate: z
        .string()
        .optional()
        .refine((val) => !val || (/^\d{4}-\d{2}-\d{2}$/.test(val) && !isNaN(Date.parse(val))), {
            message: 'Birthdate must be a valid date in YYYY-MM-DD format',
        }),
    address: z
        .object({
            streetAddress: z.array(z.string().optional()),
            locality: z.string(),
            postalCode: z.string(),
            region: z.string(),
            country: z.string().regex(/^[a-zA-Z]{2}$/, { message: 'Country must be a 2-letter country code' }),
        })
        .optional(),
    zoneinfo: z.string().optional(),
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

export type FormErrors<T extends z.ZodType<unknown, z.ZodTypeDef, unknown>> = Partial<
    Record<keyof z.TypeOf<T>, string>
>;
export type FormOnChangeFn = (
    name: string,
) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => void;
