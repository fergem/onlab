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
  } = useForm<RegisterModel>({ mode: "onChange" });

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
  //isLoading={isSubmitting}
  //isInvalid={!!errors.email}
  return (
    <div className="flex justify-center text-center align-center">
      <div className="card shadow-2xl rounded-xl p-10">
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="flex flex-col gap-4">
            <div className="form-control">
              <label className="label">Email</label>
              <input
                className={`input input-bordered w-full max-w-xs ${
                  errors.email ? "input-error" : "input-primary"
                }`}
                id="email"
                placeholder="email"
                type="email"
                {...register("email", {
                  required: "This is required",
                })}
              />
              <div className="color-error">
                {errors.email && errors.email.message}
              </div>
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
                })}
              />
              <div className="color-error">
                {errors.userName && errors.userName.message}
              </div>
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
                })}
              />
              <div className="color-error">
                {errors.password && errors.password.message}
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
