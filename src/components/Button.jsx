import styles from "./Button.module.css";

function Button({ children, onClick, type }) {
    return (
        <button
            className={`${styles.btn} ${
                type == "primary" ? styles.primary : type == "back" ? styles.back : styles.position
            }`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;
