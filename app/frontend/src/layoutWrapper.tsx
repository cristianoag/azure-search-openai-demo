import { useEffect, useRef, useState } from "react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { useMsal } from "@azure/msal-react";
import { useLogin, checkLoggedIn } from "./authConfig";
import { LoginContext } from "./loginContext";
import Layout from "./pages/layout/Layout";

const cokeTheme = {
    ...webLightTheme,
    fontFamilyBase: '"Trebuchet MS", "Avenir Next", "Segoe UI", sans-serif',
    colorBrandBackground: "#b2172f",
    colorBrandBackground2: "#941224",
    colorBrandBackgroundHover: "#991126",
    colorBrandBackgroundPressed: "#74101c",
    colorBrandBackgroundStatic: "#b2172f",
    colorBrandForeground1: "#8d1223",
    colorBrandForeground2: "#b2172f",
    colorBrandForegroundLink: "#8d1223",
    colorBrandForegroundLinkHover: "#74101c",
    colorBrandStroke1: "#b2172f",
    colorCompoundBrandBackground: "#b2172f",
    colorCompoundBrandBackgroundHover: "#991126",
    colorCompoundBrandBackgroundPressed: "#74101c",
    colorCompoundBrandStroke: "#b2172f",
    colorCompoundBrandStrokeHover: "#991126",
    colorCompoundBrandStrokePressed: "#74101c",
    colorNeutralBackground1: "#fff8f0",
    colorNeutralBackground1Hover: "#fff1e2",
    colorNeutralBackground1Pressed: "#ffe8d1",
    colorNeutralBackground2: "#fff2de",
    colorNeutralBackground3: "#f9dec0",
    colorNeutralBackground4: "#f0d2b3",
    colorNeutralForeground1: "#2d1714",
    colorNeutralForeground2: "#5f403a",
    colorNeutralForeground3: "#7a5b54",
    colorNeutralForegroundOnBrand: "#fff9f1",
    colorNeutralStroke1: "#e6cbb4",
    colorNeutralStroke2: "#d9b89b",
    shadow4: "0 8px 18px rgba(122, 16, 34, 0.12)",
    shadow16: "0 20px 48px rgba(122, 16, 34, 0.16)"
};

const LayoutWrapper = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    if (useLogin) {
        const { instance } = useMsal();
        // Keep track of the mounted state to avoid setting state in an unmounted component
        const mounted = useRef<boolean>(true);
        useEffect(() => {
            mounted.current = true;
            checkLoggedIn(instance)
                .then(isLoggedIn => {
                    if (mounted.current) setLoggedIn(isLoggedIn);
                })
                .catch(e => {
                    console.error("checkLoggedIn failed", e);
                });
            return () => {
                mounted.current = false;
            };
        }, [instance]);

        return (
            <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
                <FluentProvider theme={cokeTheme} style={{ height: "100%", backgroundColor: "transparent" }}>
                    <Layout />
                </FluentProvider>
            </LoginContext.Provider>
        );
    } else {
        return (
            <LoginContext.Provider
                value={{
                    loggedIn,
                    setLoggedIn
                }}
            >
                <FluentProvider theme={cokeTheme} style={{ height: "100%", backgroundColor: "transparent" }}>
                    <Layout />
                </FluentProvider>
            </LoginContext.Provider>
        );
    }
};

export default LayoutWrapper;
