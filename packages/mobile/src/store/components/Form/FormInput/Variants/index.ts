import Phone from "../Variants/Phone";
import DefaultTextInput from "./Default";
import ListInput from "./List";
import Material from "./Material";
import OtpCodeInput from "./OtpCode";

export const InputVariants = {
    default: DefaultTextInput,
    phone: Phone,
    material: Material,
    'otp-code': OtpCodeInput,
    'options-list':  ListInput
}

