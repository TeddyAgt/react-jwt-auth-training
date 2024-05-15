import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function Signin() {
  const { signin, user } = useContext(AuthContext);

  const defaultValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .required("This field is required")
      .email("Email is invalid"),
    password: yup
      .string()
      .required("This field is required")
      .min(6, "Password is too short"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = handleSubmit(async (credentials) => {
    clearErrors();
    try {
      await signin(credentials);
    } catch (e) {
      setError("generic", { type: "generic", message: e });
    }
  });

  return (
    <>
      {user ? (
        <Navigate to="/profile"></Navigate>
      ) : (
        <section className="flex-auto flex items-center justify-center flex-col">
          <h1 className="text-5xl mb-4 font-bold">Sign In</h1>
          <form
            onSubmit={submit}
            className="flex flex-col bg-white max-w-[500px] p-4 rounded shadow-lg min-w-[300px]">
            <div className="mb-4 flex flex-col">
              <label
                className="mb-2"
                htmlFor="email">
                Email
              </label>
              <input
                {...register("email")}
                type="text"
                id="email"
                name="email"
                className="border rounded p-1"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            <div className="mb-4 flex flex-col">
              <label
                className="mb-2"
                htmlFor="name">
                Password
              </label>
              <input
                {...register("password")}
                type="text"
                id="password"
                name="password"
                className="border rounded p-1"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            {errors.generic && <p>{errors.generic.message}</p>}
            <button
              type="submit"
              // Pour empêcher la double validation
              // Je désactive le bouton pendant la soumission du formulaire
              disabled={isSubmitting}
              className="bg-sky-500 rounded py-1 px-2 text-white font-bold">
              Submit
            </button>
          </form>
        </section>
      )}
    </>
  );
}

export default Signin;
