import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => { // next allows us to have the function continued
  try {
    // from the req in frontend -> we grab the Authorization header,
    // that is where the token will be set in the frontend
    //  the front sets this and we grab it in the backend via -> token
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) { // (00:56:40)
      // take everything from the right side of Bearer, thats how we grab the actual token
      token = token.slice(7, token.length).trimLeft(); // se trim the space also because we added spaces
    }

    // this is where we use that secret string you do not want anybody to know
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); // run the next function
    // for middleware this next() function is what we have to use
    // so the next one will proceed to the next step of the function (GPT say call-stack)
    //  says we are not gonna use it yet -> we have no API to...
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
