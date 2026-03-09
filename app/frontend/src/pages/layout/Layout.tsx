import { Outlet, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Layout.module.css";
import appLogo from "../../assets/Coca-Cola-Logo.png";

import { useLogin } from "../../authConfig";

import { LoginButton } from "../../components/LoginButton";

const Layout = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer}>
                    <Link to="/" className={styles.headerTitleContainer}>
                        <img src={appLogo} alt="Coca-Cola logo" className={styles.headerLogo} />
                        <div className={styles.headerTextGroup}>
                            <span className={styles.headerEyebrow}>Coke knowledge agent</span>
                            <h3 className={styles.headerTitle}>{t("headerTitle")}</h3>
                        </div>
                    </Link>
                    <div className={styles.loginMenuContainer}>{useLogin && <LoginButton />}</div>
                </div>
            </header>

            <main className={styles.main} id="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
