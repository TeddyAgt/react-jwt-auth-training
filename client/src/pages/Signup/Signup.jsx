import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUser } from "../../API/users";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const defaultValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    username: yup
      .string()
      .required("This fiels is required")
      .min(5, "Too short"),
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
      const user = await createUser(credentials);
      console.log(user);
      // navigate("/signin");
    } catch (e) {
      setError("generic", { type: "generic", message: e });
    }
  });

  return (
    <section className="flex-auto flex items-center justify-center flex-col">
      <h1 className="text-5xl mb-4 font-bold">Sign Up</h1>
      <form
        onSubmit={submit}
        className="flex flex-col bg-white max-w-[500px] p-4 rounded">
        <div className="mb-4 flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            {...register("username")}
            type="text"
            id="username"
            name="username"
            className="border rounded p-1"
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div className="mb-4 flex flex-col">
          <label htmlFor="email">Email</label>
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
          <label htmlFor="name">Password</label>
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
  );
}

export default Signup;
