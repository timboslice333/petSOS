import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Auth } from "aws-amplify";

import { AuthStack } from "./AuthStack";
import { AuthenticatedUserContext } from "../providers";
import { LoadingIndicator } from "../components";
import { createStackNavigator } from "@react-navigation/stack";
import {
  CameraScreen,
  DiscoverScreen,
  LostAndFoundScreen,
  MapScreen,
  PetInfoScreen,
  PostsScreen,
  UserScreen,
} from "../screens";

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(false);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      setUser(authUser);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();

    const handleAuthStateChange = (state, data) => {
      if (String(state) === "signedIn") {
        setIsLoading(true);
        checkUser();
        setIsLoading(false);
      }
    };
  }, [user]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <RootStack.Navigator
      screenOptions={{
        animationEnabled: false,
        presentation: "modal",
        headerShown: false,
      }}
    >
      {user ? (
        <RootStack.Screen name="Map" component={MapScreen} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthStack} />
      )}
      <RootStack.Screen name="Discover" component={DiscoverScreen} />
      <RootStack.Screen name="LostAndFound" component={LostAndFoundScreen} />
      <RootStack.Screen name="PetInfo" component={PetInfoScreen} />
      <RootStack.Screen name="Posts" component={PostsScreen} />
      <RootStack.Screen name="User" component={UserScreen} />
      <RootStack.Screen name="Camera" component={CameraScreen} />
    </RootStack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStackScreen />
    </NavigationContainer>
  );
};
