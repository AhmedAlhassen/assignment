import "./App.css";
import AddUser from "./components/AddUser";

function App() {
  return (
    <>
      <div className="w-full">
        <h1 className="text-black font-bold my-6 ">Users</h1>
        <AddUser />
      </div>
    </>
  );
}

export default App;
