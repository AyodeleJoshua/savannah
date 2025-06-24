import { useFormik } from "formik";
import {
  loginValidationSchema,
  type TLoginFormValues,
} from "../utils/validationSchema";
import { loginWithCredentials } from "../services";
import { setAuthTokenCookie } from "../../../utils/browserStorage";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLoginForm = (referal: string) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik<TLoginFormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const loginResponse = await loginWithCredentials(
          values.username.trim(),
          values.password,
        );

        setAuthTokenCookie(loginResponse.token);
        login();
        navigate(referal, { replace: true });
      } catch (error: unknown) {
        if (error && typeof error === "object" && "response" in error) {
          const apiError = error as { response: { data: { error: string } } };
          setStatus(apiError.response.data.error);
        } else {
          setStatus("An unexpected error occurred");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return formik;
};
