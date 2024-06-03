import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-gray-200 text-primary-content">
      <aside>
        <Logo />
        <p className="-tracking-wider text-black">
          Copyright © 2024 - All right reserved
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
