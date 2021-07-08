import React from "react";
import "./App.css";
import Amplify from "aws-amplify";
import { AmplifyAuthenticator, AmplifyGreetings, AmplifySignIn } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const GreetingsApp = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <AmplifyGreetings username={user.username}></AmplifyGreetings>
    </div>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignIn
        headerText="Welcome to JrWright121.com"
        slot="sign-in"
      ></AmplifySignIn>
    </AmplifyAuthenticator>
  );
};

export default GreetingsApp;