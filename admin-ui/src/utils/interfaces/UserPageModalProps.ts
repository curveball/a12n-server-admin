export interface UserModalState {
  userName: string;
  email: string;
  password?: string;
  autoGeneratePassword?: boolean;
  emailValidated?: boolean;
}

export interface UserModalContentProps {
  state: UserModalState;
  errors: Partial<Record<keyof UserModalState, string>>;
  onChange: (field: keyof UserModalState, value: string | boolean) => void;
}

export interface ActionButtonsProps {
  isUpdate?: boolean;
  isValid: boolean;
  onCreate: () => boolean;
  onClose: () => void;
}

export interface UserModalProps {
  onClose: () => void;
  userData?: any;
}
