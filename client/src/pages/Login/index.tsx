import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiLockClosed, HiExclamationCircle } from "react-icons/hi2";
import styles from "./styles.module.scss";
import Input from "../../components/sharedComponents/Input";
import { isAuthenticated } from "../../utils/browserStorage";
import { useLoginForm } from "./hooks/useLoginForm";

interface ILocationState {
  referal?: {
    pathname: string;
  };
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as ILocationState;
  const referal = locationState?.referal?.pathname || "/recommendations";

  const formik = useLoginForm(referal);

  useEffect(() => {
    const authToken = isAuthenticated();
    if (authToken) {
      navigate("/recommendations");
    }
  }, []);

  return (
    <div className={styles["login-container"]} data-testid="login-container">
      <div className={styles["login-wrapper"]}>
        <div className={styles["login-header"]}>
          <div className={styles["login-icon"]}>
            <HiLockClosed size={32} />
          </div>
          <h2 className={styles["login-title"]} data-testid="login-title">
            Welcome back
          </h2>
          <p className={styles["login-subtitle"]} data-testid="login-subtitle">
            Sign in to your account to continue
          </p>
        </div>

        <div className={styles["login-form-container"]}>
          <form className={styles["login-form"]} onSubmit={formik.handleSubmit}>
            <div className={styles["form-group"]}>
              <label htmlFor="username" className={styles["form-label"]}>
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Enter your username"
                disabled={formik.isSubmitting}
                data-testid="username-input"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.username && formik.errors.username
                    ? styles["input-error"]
                    : ""
                }
              />
              {formik.touched.username && formik.errors.username && (
                <div
                  className={styles["error-message"]}
                  data-testid="username-error"
                >
                  {formik.errors.username}
                </div>
              )}
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="password" className={styles["form-label"]}>
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                disabled={formik.isSubmitting}
                data-testid="password-input"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.password && formik.errors.password
                    ? styles["input-error"]
                    : ""
                }
              />
              {formik.touched.password && formik.errors.password && (
                <div
                  className={styles["error-message"]}
                  data-testid="password-error"
                >
                  {formik.errors.password}
                </div>
              )}
            </div>

            {formik.status && (
              <div
                className={styles["error-message"]}
                data-testid="error-message"
              >
                <div className={styles["error-content"]}>
                  <HiExclamationCircle size={20} />
                  <div className={styles["error-text"]}>
                    <p>{formik.status}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={styles["submit-button"]}
                data-testid="login-button"
              >
                {formik.isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
