import { Toaster } from "react-hot-toast";

export default function ToastDefault() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        className: "text-[1.5rem]",
        style: {
          background: "#363636",
          color: "#fff",
        },
        success: {
          duration: 4000,
          iconTheme: {
            primary: "#4ade80",
            secondary: "#fff",
          },
        },
        error: {
          duration: 4000,
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
