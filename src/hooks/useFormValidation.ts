import { useState } from 'react';
import { z, infer as ZodInfer, ZodObject } from 'zod';
import { useToast } from '.';

type ErrorShape<T> =
    T extends Array<infer U> ? Array<ErrorShape<U>> : T extends object ? { [K in keyof T]?: ErrorShape<T[K]> } : string;

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
    const [errors, setErrors] = useState<Partial<ErrorShape<ZodInfer<T>>>>({});

    function setNestedValue(obj: any, path: string, value: any) {
        const keys = path.split('.');
        let temp = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            const nextKey = keys[i + 1];
            const isArrayIndex = !isNaN(Number(nextKey));
            if (isArrayIndex) {
                if (!Array.isArray(temp[key])) temp[key] = [];
            } else {
                if (!temp[key]) temp[key] = {};
            }
            temp = temp[key];
        }
        const lastKey = keys[keys.length - 1];
        if (!isNaN(Number(lastKey))) {
            temp[Number(lastKey)] = value;
        } else {
            temp[lastKey] = value;
        }
    }

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => {
            const updated = { ...prev };
            setNestedValue(updated, name, value);
            return updated;
        });
        setErrors((prev) => {
            const updated = { ...prev };
            setNestedValue(updated, name, '');
            return updated;
        });
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
                const newErrors: any = {};
                err.errors.forEach((zodErr) => {
                    const path = zodErr.path.join('.');
                    setNestedValue(newErrors, path, zodErr.message);
                });
                setErrors(newErrors);
                const firstError = err.errors[0];
                toast.error({ title: 'Invalid Form Submission.', description: firstError.message });
            }
            return false;
        }
    };

    return { formState, setFormState, errors, handleInputChange, handleCheckboxChange, isFormValid };
};

export default useFormValidation;
