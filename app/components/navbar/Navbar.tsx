import NavLinks from "./NavLinks";
import SocialLinks from "./SocialLinks";

/**
 * Persistent site chrome rendered from the root layout: the vertical primary
 * navigation and the social/contact icon links.
 */
export default function Navbar() {
  return (
    <>
      <NavLinks />
      <SocialLinks />
    </>
  );
}
