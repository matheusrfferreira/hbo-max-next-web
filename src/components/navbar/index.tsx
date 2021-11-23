import Link from "next/link";

import styles from "./nav.module.css";


export const Navbar = () => {
    return (
        <nav className={styles.container}>
            <Link passHref href={"/movies"}><h1>Horror Max</h1></Link>
        </nav>
    );
};