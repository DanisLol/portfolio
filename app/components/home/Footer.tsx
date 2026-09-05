import PrimaryButton from "@/app/components/PrimaryButton";
import { siteLinks } from "@/data/site";

/**
 * Bottom footer band with a résumé call-to-action.
 */
export default function Footer() {
  return (
    <footer className="mt-32 ml-[100px] flex h-[230px] items-end justify-end bg-footer-brown pb-[18px] pr-[15px]">
      <PrimaryButton href={siteLinks.resume}>Guest Page</PrimaryButton>
    </footer>
  );
}


