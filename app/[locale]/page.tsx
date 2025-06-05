import { Monitor, Users, GraduationCap, ArrowRight, Github, Globe } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="flex justify-between items-center p-6 md:p-8">
        <h1 className="text-2xl font-bold tracking-tight">URL4IRL</h1>
        <nav className="flex gap-6">
          <a href="#philosophy" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.philosophy')}
          </a>
          <a href="#pillars" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.pillars')}
          </a>
          <a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('nav.blog')}
          </a>
          <a href="https://github.com/url4irl" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Github className="w-4 h-4" />
            {t('nav.github')}
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 md:px-8">
        <section className="text-center py-16 md:py-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {t('hero.title')}
            <span className="block text-primary">{t('hero.titleHighlight')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 justify-center">
              {t('hero.getStarted')}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-border px-8 py-3 rounded-lg font-medium hover:bg-accent transition-colors">
              {t('hero.learnMore')}
            </button>
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="philosophy" className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-8">{t('philosophy.title')}</h3>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {t('philosophy.description')}
            </p>
          </div>
        </section>

        {/* Three Pillars Section */}
        <section id="pillars" className="py-16 md:py-24">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">{t('pillars.title')}</h3>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Screen-Time Liberation */}
            <div className="text-center group">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Monitor className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl md:text-2xl font-semibold mb-4">{t('pillars.screenTime.title')}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {t('pillars.screenTime.description')}
              </p>
            </div>

            {/* Democratized Development */}
            <div className="text-center group">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl md:text-2xl font-semibold mb-4">{t('pillars.democratized.title')}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {t('pillars.democratized.description')}
              </p>
            </div>

            {/* Empowered Learning */}
            <div className="text-center group">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl md:text-2xl font-semibold mb-4">{t('pillars.empowered.title')}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {t('pillars.empowered.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-24 text-center">
          <div className="bg-card border border-border rounded-lg p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t('cta.title')}</h3>
            <p className="text-lg text-muted-foreground mb-8">
              {t('cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 justify-center">
                <Github className="w-4 h-4" />
                {t('cta.contribute')}
              </button>
              <button className="border border-border px-8 py-3 rounded-lg font-medium hover:bg-accent transition-colors flex items-center gap-2 justify-center">
                <Globe className="w-4 h-4" />
                {t('cta.explore')}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-16">
        <div className="container mx-auto px-6 md:px-8 text-center">
          <p className="text-muted-foreground">
            {t('footer.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
}