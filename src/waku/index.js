function Init() {
  const handleClick = async () => {
    await fetch("http://localhost:3000/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "hoge", email: "ok@sample.com" }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  return (
    <div className="App">
      <button onClick={handleClick}>post</button>
    </div>
  );
}

export default Init;
