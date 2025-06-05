import { CheckCircledIcon, CrossCircledIcon, ExclamationTriangleIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { Heading, Spinner, Text } from '@radix-ui/themes';
import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export const DEFAULT_TOAST_OPTIONS: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    pauseOnHover: true,
    theme: 'light',
    icon: false,
};

export enum TOAST_TYPE {
    SUCCESS = 'success',
    INFO = 'info',
    ERROR = 'error',
    WARNING = 'warning',
    LOADING = 'loading',
}

export const DEFAULT_TOAST_MESSAGES = {
    success: {
        status: TOAST_TYPE.SUCCESS,
        title: 'Action succeeded!',
        description: 'The specified action went through!',
    },
    error: {
        status: TOAST_TYPE.ERROR,
        title: 'Something went wrong!',
        description: 'An unexpected error occurred. Please try again later.',
    },
};

const useToast = (): ToastFns => {
    const statusIcons = {
        [TOAST_TYPE.SUCCESS]: <CheckCircledIcon style={{ width: '20px', height: '20px' }} />,
        [TOAST_TYPE.ERROR]: <CrossCircledIcon style={{ width: '20px', height: '20px' }} />,
        [TOAST_TYPE.INFO]: <InfoCircledIcon style={{ width: '20px', height: '20px' }} />,
        [TOAST_TYPE.WARNING]: <ExclamationTriangleIcon style={{ width: '20px', height: '20px' }} />,
        [TOAST_TYPE.LOADING]: <Spinner style={{ width: '20px', height: '20px' }} />,
    };

    const statusClasses = {
        [TOAST_TYPE.SUCCESS]: 'success_toast',
        [TOAST_TYPE.ERROR]: 'error_toast',
        [TOAST_TYPE.INFO]: 'info_toast',
        [TOAST_TYPE.WARNING]: 'warning_toast',
        [TOAST_TYPE.LOADING]: 'loading_toast',
    };

    const showToast = (type: TOAST_TYPE, title: string, description?: string) => {
        toast[type](
            <div style={{ fontFamily: 'Matter', width: '600px' }}>
                <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '6px', color: 'white' }}
                >
                    {statusIcons[type]}
                    <Heading
                        style={{
                            fontFamily: 'Matter',
                            fontSize: '18px',
                            ...(type === TOAST_TYPE.LOADING && { color: 'var(--amber-11)' }),
                        }}
                    >
                        {title}
                    </Heading>
                </div>
                {description && (
                    <Text
                        style={{
                            fontFamily: 'Matter',
                            color: type === TOAST_TYPE.LOADING ? 'var(--bronze-12)' : '#FFFFFFBF',
                        }}
                    >
                        {description}
                    </Text>
                )}
            </div>,
            { ...DEFAULT_TOAST_OPTIONS, className: statusClasses[type] } as ToastOptions,
        );
    };

    const success = ({ title, description }: ToastFnParams) => showToast(TOAST_TYPE.SUCCESS, title, description);
    const error = ({ title, description }: ToastFnParams) => showToast(TOAST_TYPE.ERROR, title, description);
    const info = ({ title, description }: ToastFnParams) => showToast(TOAST_TYPE.INFO, title, description);
    const warning = ({ title, description }: ToastFnParams) => showToast(TOAST_TYPE.WARNING, title, description);
    const loading = ({ title, description }: ToastFnParams) => showToast(TOAST_TYPE.LOADING, title, description);

    return { success, error, info, warning, loading };
};

export default useToast;
