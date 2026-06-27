import { Link, useLocation } from "react-router-dom";

const navItems = [
    {
        to: "/dashboard",
        icon: "ti-layout-dashboard",
        label: "Dashboard",
        description: "Overview & summary"
    },
    {
        to: "/expenses",
        icon: "ti-wallet",
        label: "Expenses",
        description: "Track spending"
    },
    {
        to: "/advisor",
        icon: "ti-brain",
        label: "AI Advisor",
        description: "Smart insights"
    },
    {
        to: "/forecast",
        icon: "ti-trending-up",
        label: "Forecast",
        description: "Future projections"
    },
    {
        to: "/chatbot",
        icon: "ti-message-dots",
        label: "Chatbot",
        description: "Ask anything"
    },
    {
        to: "/voice",
        icon: "ti-microphone",
        label: "Voice Assistant",
        description: "Speak your query"
    }
];

function Sidebar() {
    const location = useLocation();

    return (
        <>
            {/* Tabler Icons CDN */}
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
            />

            <aside style={styles.sidebar}>

                {/* Logo / Brand */}
                <div style={styles.brand}>
                    <div style={styles.logoWrap}>
                        <i className="ti ti-chart-pie-2" style={styles.logoIcon} aria-hidden="true" />
                    </div>
                    <div>
                        <p style={styles.brandName}>AI Expense</p>
                        <p style={styles.brandTagline}>Analyzer</p>
                    </div>
                </div>

                <div style={styles.divider} />

                {/* Section Label */}
                <p style={styles.sectionLabel}>NAVIGATION</p>

                {/* Nav Links */}
                <nav style={styles.nav}>
                    {navItems.map(({ to, icon, label, description }) => {
                        const isActive = location.pathname === to;
                        return (
                            <Link
                                key={to}
                                to={to}
                                style={{
                                    ...styles.navLink,
                                    ...(isActive ? styles.navLinkActive : {})
                                }}
                            >
                                {isActive && <span style={styles.activeBar} />}
                                <span style={{
                                    ...styles.iconWrap,
                                    ...(isActive ? styles.iconWrapActive : {})
                                }}>
                                    <i className={`ti ${icon}`} style={styles.navIcon} aria-hidden="true" />
                                </span>
                                <span style={styles.navText}>
                                    <span style={{
                                        ...styles.navLabel,
                                        ...(isActive ? styles.navLabelActive : {})
                                    }}>
                                        {label}
                                    </span>
                                    <span style={styles.navDesc}>{description}</span>
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                <div style={styles.divider} />

                {/* Footer */}
                <div style={styles.footer}>
                    <div style={styles.footerAvatar}>
                        <i className="ti ti-user" style={{ fontSize: "16px", color: "#94a3b8" }} aria-hidden="true" />
                    </div>
                    <div style={styles.footerText}>
                        <p style={styles.footerName}>My Account</p>
                        <p style={styles.footerSub}>Settings & Profile</p>
                    </div>
                    <i className="ti ti-settings" style={styles.footerIcon} aria-hidden="true" />
                </div>

            </aside>
        </>
    );
}

const styles = {
    sidebar: {
        width: "260px",
        minHeight: "100vh",
        background: "#0b1222",
        display: "flex",
        flexDirection: "column",
        padding: "24px 16px",
        boxSizing: "border-box",
        borderRight: "1px solid rgba(255,255,255,0.06)",
    },

    /* Brand */
    brand: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "0 8px",
        marginBottom: "20px",
    },
    logoWrap: {
        width: "40px",
        height: "40px",
        borderRadius: "10px",
        background: "linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    logoIcon: {
        fontSize: "20px",
        color: "#ffffff",
    },
    brandName: {
        margin: 0,
        fontSize: "15px",
        fontWeight: "700",
        color: "#f1f5f9",
        letterSpacing: "-0.01em",
        lineHeight: 1.2,
    },
    brandTagline: {
        margin: 0,
        fontSize: "12px",
        color: "#64748b",
        fontWeight: "400",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
    },

    /* Divider */
    divider: {
        height: "1px",
        background: "rgba(255,255,255,0.06)",
        margin: "8px 0",
    },

    /* Section label */
    sectionLabel: {
        margin: "16px 0 8px",
        padding: "0 12px",
        fontSize: "10px",
        letterSpacing: "0.1em",
        color: "#475569",
        fontWeight: "600",
        textTransform: "uppercase",
    },

    /* Nav */
    nav: {
        display: "flex",
        flexDirection: "column",
        gap: "2px",
    },
    navLink: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 12px",
        borderRadius: "10px",
        textDecoration: "none",
        transition: "background 0.15s ease",
        background: "transparent",
        overflow: "hidden",
    },
    navLinkActive: {
        background: "rgba(59, 130, 246, 0.12)",
    },
    activeBar: {
        position: "absolute",
        left: 0,
        top: "20%",
        width: "3px",
        height: "60%",
        borderRadius: "0 3px 3px 0",
        background: "#3B82F6",
    },
    iconWrap: {
        width: "34px",
        height: "34px",
        borderRadius: "8px",
        background: "rgba(255,255,255,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        transition: "background 0.15s ease",
    },
    iconWrapActive: {
        background: "rgba(59, 130, 246, 0.2)",
    },
    navIcon: {
        fontSize: "17px",
        color: "#94a3b8",
    },
    navText: {
        display: "flex",
        flexDirection: "column",
        gap: "1px",
        minWidth: 0,
    },
    navLabel: {
        fontSize: "13.5px",
        fontWeight: "500",
        color: "#cbd5e1",
        lineHeight: 1.3,
    },
    navLabelActive: {
        color: "#93c5fd",
    },
    navDesc: {
        fontSize: "11px",
        color: "#475569",
        lineHeight: 1.3,
    },

    /* Footer */
    footer: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 8px",
        marginTop: "8px",
        borderRadius: "10px",
        cursor: "pointer",
    },
    footerAvatar: {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        background: "rgba(255,255,255,0.07)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    footerText: {
        flex: 1,
        minWidth: 0,
    },
    footerName: {
        margin: 0,
        fontSize: "13px",
        fontWeight: "500",
        color: "#94a3b8",
        lineHeight: 1.3,
    },
    footerSub: {
        margin: 0,
        fontSize: "11px",
        color: "#475569",
        lineHeight: 1.3,
    },
    footerIcon: {
        fontSize: "16px",
        color: "#475569",
    },
};

export default Sidebar;
