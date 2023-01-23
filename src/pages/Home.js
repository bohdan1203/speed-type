import { useAuth } from "../contexts/AuthContext";

const Home = () => {
  const { currentUser } = useAuth();

  return <div className="">{currentUser?.email}</div>;
};

export default Home;
