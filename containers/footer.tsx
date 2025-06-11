import { useTranslations } from "next-intl";

export function FooterContainer() {
  const t = useTranslations();

  return (
    <footer className="border-t border-border bg-card/50 py-8 mt-16">
      <div className="container mx-auto px-6 md:px-8 text-center">
        <p className="text-muted-foreground">{t("footer.copyright")} ❤️</p>
      </div>
    </footer>
  );
}
