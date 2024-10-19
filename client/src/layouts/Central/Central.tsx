import { Base } from "@/layouts";
import { Banner } from "./Banner";
import "./Central.style.scss";
import { Divider } from "./Divider";
import { HeaderLinks } from "./HeaderLinks";
import { Navigation } from "./Navigation";

interface Props {
  title: string;
  children: React.ReactNode;
}

function Central({ title, children }: Props) {
  return (
    <Base>
      <Banner />
      <div className="Central__page">
        <HeaderLinks />
        <Navigation />
        <h2 className="Central__page__title">{title}</h2>
        <Divider />
        <div className="Central__page__content">{children}</div>
        <Divider />
        <div className="Central__page__footer">
        <a href="/privacy-policy">Privacy Policy</a>
              <span>|</span>
              <a href="/terms-of-service">Terms of Service</a>
              <span>|</span>
              <a href="/contact">Contact Us</a>
          <div className="Central__page__footer__release">Release: 8.10.2</div>
          <div className="Central__page__footer__copyright">
            © 2024 Tunnel Runners Inc. All rights reserved.
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Central;
