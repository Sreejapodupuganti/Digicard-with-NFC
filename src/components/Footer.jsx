import { Container } from "../pages/Home";

// Footer
const Footer = () => (
  <footer className="py-10 border-t border-gray-200 text-center text-gray-500 text-sm bg-white">
    <Container>
      <p>© {new Date().getFullYear()} DigiCard. All rights reserved.</p>
    </Container>
  </footer>
);


export default Footer;