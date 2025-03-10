export type ToastFns = {
    success: ({ title, description }: ToastFnParams) => void;
    error: ({ title, description }: ToastFnParams) => void;
    info: ({ title, description }: ToastFnParams) => void;
    warning: ({ title, description }: ToastFnParams) => void;
    loading: ({ title, description }: ToastFnParams) => void;
};

export type ToastFnParams = {
    title: string;
    description?: string;
};
