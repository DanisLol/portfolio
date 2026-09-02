import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SocialLinks from "./SocialLinks";

/**
 * Persistent site chrome rendered from the root layout: the "MJ" wordmark,
 * the vertical primary navigation, and the social/contact icon links.
 */
export default function Navbar() {
  return (
    <>
      <Logo />
      <NavLinks />
      <SocialLinks />
    </>
  );
}
