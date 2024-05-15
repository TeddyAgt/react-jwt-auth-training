import { useContext } from "react";
import { AuthContext } from "../../context";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <section className="max-w-[500px] flex-auto flex flex-col justify-center items-center">
      <h1>Profile</h1>
      <article className="">
        <h2>Personnal Informations</h2>
        <ul>
          <li>Name: {user.username}</li>
          <li>Email: {user.email}</li>
        </ul>
      </article>
    </section>
  );
}

export default Profile;
