import { Link } from "react-router-dom";

import { BasePageSlugs } from "@models/pages/enums";
import footerLogo from "@static/images/footerLogo.svg";

export default function FooterLogo() {
    return (
        <Link to={BasePageSlugs.DASHBOARD}>
            <img
                src={footerLogo}
                alt="logo"
            />
        </Link>
    );
}
