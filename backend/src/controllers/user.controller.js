

const userSignup = async (params) => {
  const { username, password, firstName, lastName } = req.body();
  if (!(username || password || firstName || lastName)) {
    res.json({
      message: "all field are required",
    });
  }
};

