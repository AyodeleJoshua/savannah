import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { HiLockClosed, HiExclamationCircle } from "react-icons/hi2";
import styles from "./styles.module.scss";
import { Input } from "./components/Input";
import { loginWithCredentials } from "./services";
import {
  getItemFromStorage,
  setItemInStorage,
} from "../../utils/browserStorage";
import { constants } from "../../utils/constants";

interface ILocationState {
  referal?: {
    pathname: string;
  };
}

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const locationState = location.state as ILocationState;
  const referal = locationState?.referal?.pathname || "/recommendations";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSigningIn(true);

    try {
      const loginResponse = await loginWithCredentials(username, password);
      login();
      setItemInStorage(constants.AUTH_TOKEN, loginResponse.token);
      navigate(referal, { replace: true });
    } catch (error: any) {
      setError(error.response.data.error);
    } finally {
      setIsSigningIn(false);
    }
  };

  useEffect(() => {
    const authToken = getItemFromStorage(constants.AUTH_TOKEN);
    if (authToken) {
      navigate("/recommendations");
    }
  }, []);

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-wrapper"]}>
        <div className={styles["login-header"]}>
          <div className={styles["login-icon"]}>
            <HiLockClosed size={32} />
          </div>
          <h2 className={styles["login-title"]}>Welcome back</h2>
          <p className={styles["login-subtitle"]}>
            Sign in to your account to continue
          </p>
        </div>

        <div className={styles["login-form-container"]}>
          <form onSubmit={handleSubmit} className={styles["login-form"]}>
            <div className={styles["form-group"]}>
              <label htmlFor="username" className={styles["form-label"]}>
                Username
              </label>
              <div className={styles["input-wrapper"]}>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  disabled={isSigningIn}
                />
              </div>
            </div>

            <div className={styles["form-group"]}>
              <label htmlFor="password" className={styles["form-label"]}>
                Password
              </label>
              <div className={styles["input-wrapper"]}>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${styles["form-input"]} ${styles["password-input"]}`}
                  disabled={isSigningIn}
                />
              </div>
            </div>

            {error && (
              <div className={styles["error-message"]}>
                <div className={styles["error-content"]}>
                  <div className={styles["error-icon"]}>
                    <HiExclamationCircle size={20} />
                  </div>
                  <div className={styles["error-text"]}>
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSigningIn}
                className={styles["submit-button"]}
              >
                {isSigningIn ? "Signing in..." : "Sign in"}
              </button>
            </div>

            <div className={styles["demo-credentials"]}>
              <p className={styles["demo-title"]}>Demo credentials:</p>
              <div className={styles["demo-content"]}>
                <p>Username: admin</p>
                <p>Password: password</p>
              </div>
            </div>
          </form>
        </div>

        <div className={styles["login-footer"]}>
          <p className={styles["footer-text"]}>
            By signing in, you agree to our{" "}
            <a href="#" className={styles["footer-link"]}>
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className={styles["footer-link"]}>
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
