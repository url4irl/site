import { useTranslations } from "next-intl";
import Link from "next/link";

export function FooterContainer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-border bg-card/50 py-8 mt-16">
      <div className="container mx-auto px-6 md:px-8 text-center">
        <p className="text-muted-foreground">
          <Link
            href="https://uptime.url4irl.com/status/open-services"
            target="_blank"
            data-umami-event="footer-status"
          >
            {t("footer.status")}
          </Link>
        </p>
        <p className="text-muted-foreground">{t("footer.copyright")} ❤️</p>
      </div>
    </footer>
  );
}
