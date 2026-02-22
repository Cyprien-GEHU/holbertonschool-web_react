function Login() {
  return (
    <div className="App-body flex flex-col p-5 pl-10 h-[45vh] border-t-4 border-[color:var(--main-color)]">
      <p className="text-xl">Login to access the full dashboard</p>
      <form action="" className="mt-8 text-lg">
        <label htmlFor="email" className="pr-2">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            className="border rounded pl-2"
          />
        </label>
        <label htmlFor="password" className="pl-2 pr-2">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            className="border rounded pl-2"
          />
        </label>
        <button
          className="label-button cursor-pointer border px-1 rounded ml-2"
          type="submit"
        >
          OK
        </button>
      </form>
    </div>
  );
}

export default Login;
