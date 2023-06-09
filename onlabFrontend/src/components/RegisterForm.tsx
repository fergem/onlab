import { useForm } from "react-hook-form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthHooks";
import User, { RegisterModel } from "../models/User";

export default function RegisterForm() {
  let navigate: NavigateFunction = useNavigate();
  const { registerUser } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RegisterModel>({ mode: "onBlur" });

  const handleRegister = (registerModel: RegisterModel) => {
    registerUser(registerModel).then(
      () => {
        navigate("/login");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  };
  return (
    <div className="flex justify-center text-center items-center h-fit">
      <div className="card shadow-2xl rounded-xl p-10">
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="flex flex-col gap-4">
            <div className="form-control w-full max-w-xs">
              <label className="label">Email</label>
              <input
                className={`input input-bordered w-full max-w-xs ${
                  !!errors.email ? "input-error" : "input-primary"
                }`}
                id="email"
                placeholder="Email"
                type="email"
                {...register("email", {
                  required: "This is required",
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Email is invalid",
                  },
                })}
              />
              <label className="label text-error text-sm">
                {errors.email && errors.email.message}
              </label>
            </div>
            <div className="form-control">
              <label className="label">Username</label>
              <input
                className={`input input-bordered w-full max-w-xs ${
                  errors.userName ? "input-error" : "input-primary"
                }`}
                id="userName"
                placeholder="Username"
                {...register("userName", {
                  required: "This is required",
                  minLength: {
                    value: 6,
                    message: "Username must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Username must not exceed 20 characters",
                  },
                })}
              />
              <label className="label text-error text-sm">
                {errors.userName && errors.userName.message}
              </label>
            </div>
            <div className="form-control">
              <label className="label">Password</label>
              <input
                className={`input input-bordered w-full max-w-xs ${
                  errors.password ? "input-error" : "input-primary"
                }`}
                id="password"
                placeholder="Password"
                type="password"
                {...register("password", {
                  required: "This is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 40,
                    message: "Password must not exceed 40 characters",
                  },
                })}
              />
              <label className="label text-error text-sm">
                {errors.password && errors.password.message}
              </label>
            </div>
            <button className="btn btn-primary" type="submit">
              {isSubmitting ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
