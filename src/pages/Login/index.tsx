import React from "react";

import Button from "components/Button/Button";
import FormControl from "components/Form/FormControl";
import FormLabel from "components/Form/FormLabel";
import TextInput from "components/Form/TextInput";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="w-screen h-screen flex items-center justify-center text-slightGray">
      <div className="w-5/12 bg-slate-100 border border-neutral-200 rounded-md px-20 py-16 flex flex-col justify-center">
        <h1 className="text-3xl font-semibold mb-8">Login</h1>
        <div>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextInput name="email" type="email" />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextInput name="password" type="password" />
          </FormControl>

          <FormControl>
            <div className="flex items-center">
              <Button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-600 text-center text-white font-medium text-sm mr-2"
                onClick={() => {
                  console.log("sbm");
                }}
              >
                Login
              </Button>
              <Link to="/register">
                <p className="text-sm text-cyan-500">Register</p>
              </Link>
            </div>
          </FormControl>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
