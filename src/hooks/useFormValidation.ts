import { useState } from 'react';
import { z, infer as ZodInfer, ZodObject } from 'zod';
import { useToast } from '.';

const useFormValidation = <T extends ZodObject<z.ZodRawShape>>({
    schema,
    initialValues,
}: {
    schema: T;
    initialValues?: Partial<ZodInfer<T>>;
}) => {
    const toast = useToast();

    const [formState, setFormState] = useState<ZodInfer<T>>(() => {
        const schemaDefaults = Object.fromEntries(
            Object.entries(schema.shape).map(([key, field]) => {
                const fieldDefault = field._def.default;

                if (field instanceof z.ZodBoolean) {
                    return [key, fieldDefault ? fieldDefault() : false];
                }

                return [key, fieldDefault ? fieldDefault() : ''];
            }),
        );
        return { ...schemaDefaults, ...initialValues };
    });
    const [errors, setErrors] = useState<Partial<Record<keyof ZodInfer<T>, string>>>({});

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleCheckboxChange = (name: string, checked: boolean) => {
        setFormState((prev) => ({ ...prev, [name]: checked }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const isFormValid = () => {
        try {
            schema.parse(formState);
            setErrors({});
            return true;
        } catch (err) {
            if (err instanceof z.ZodError) {
                const firstError = err.errors[0];
                setErrors({ [firstError.path[0] as keyof ZodInfer<T>]: firstError.message } as Partial<
                    Record<keyof ZodInfer<T>, string>
                >);
                toast.error({ title: 'Invalid Form Submission.', description: firstError.message });
            }
            return false;
        }
    };

    return { formState, errors, handleInputChange, handleCheckboxChange, isFormValid };
};

export default useFormValidation;
