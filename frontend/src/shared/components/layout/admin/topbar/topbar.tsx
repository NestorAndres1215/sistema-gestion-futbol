
import { logout} from "../utils/logout";
import styles from "./../layout.module.css";

export default function Topbar({ title, subtitle }: { title: string; subtitle: string }) {

    return (
        <header className={styles.topbar}>
            <div>
                <div className={styles.pageTitle}>{title}</div>
                <div className={styles.pageSub}>{subtitle}</div>
            </div>
            <div className={styles.topbarRight}>
                <div className={styles.searchBox}>
                    <span className={styles.searchIcon}>
                        <i className="fas fa-search"></i>
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className={styles.searchInput}
                    />
                </div>
                <button
                    className={styles.iconBtn}
                    onClick={logout}
                    aria-label="Cerrar sesión"
                >
                    <i className="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
        </header>
    );
}