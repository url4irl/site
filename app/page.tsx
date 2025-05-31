import { Monitor, Users, GraduationCap, ArrowRight, Github, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="flex justify-between items-center p-6 md:p-8">
        <h1 className="text-2xl font-bold tracking-tight">URL4IRL</h1>
        <nav className="flex gap-6">
          <a href="#philosophy" className="text-muted-foreground hover:text-foreground transition-colors">
            Philosophy
          </a>
          <a href="#pillars" className="text-muted-foreground hover:text-foreground transition-colors">
            Pillars
          </a>
          <a href="https://github.com/url4irl" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 md:px-8">
        <section className="text-center py-16 md:py-24">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Technology that serves
            <span className="block text-primary">humanity</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            A paradigm shift from attention-harvesting applications to life-enhancing tools that strengthen real-world connections and empower individual agency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 justify-center">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-border px-8 py-3 rounded-lg font-medium hover:bg-accent transition-colors">
              Learn More
            </button>
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="philosophy" className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-8">Core Philosophy</h3>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Technology should serve humanity, not consume it. URL4IRL represents a paradigm shift from 
              attention-harvesting applications to life-enhancing tools that strengthen real-world connections 
              and empower individual agency.
            </p>
          </div>
        </section>

        {/* Three Pillars Section */}
        <section id="pillars" className="py-16 md:py-24">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">The Three Pillars</h3>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Screen-Time Liberation */}
            <div className="text-center group">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Monitor className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl md:text-2xl font-semibold mb-4">Screen-Time Liberation</h4>
              <p className="text-muted-foreground leading-relaxed">
                Create tools that handle mundane digital tasks efficiently, freeing people to engage with the physical world. 
                Think smart automation that works in the background, not addictive interfaces that demand constant attention.
              </p>
            </div>

            {/* Democratized Development */}
            <div className="text-center group">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl md:text-2xl font-semibold mb-4">Democratized Development</h4>
              <p className="text-muted-foreground leading-relaxed">
                Provide a comprehensive toolkit that makes building community-focused software accessible to everyone - 
                from neighborhood organizers to small business owners. Pre-built, secure modules for authentication, 
                messaging, and data management that prioritize privacy and local control.
              </p>
            </div>

            {/* Empowered Learning */}
            <div className="text-center group">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl md:text-2xl font-semibold mb-4">Empowered Learning</h4>
              <p className="text-muted-foreground leading-relaxed">
                Bridge the gap between everyday users and technology creators through educational resources that 
                demystify modern development while emphasizing ethical, human-centered design principles.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-24 text-center">
          <div className="bg-card border border-border rounded-lg p-8 md:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to join the movement?</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Help us build technology that truly serves humanity and strengthens our communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 justify-center">
                <Github className="w-4 h-4" />
                Contribute on GitHub
              </button>
              <button className="border border-border px-8 py-3 rounded-lg font-medium hover:bg-accent transition-colors flex items-center gap-2 justify-center">
                <Globe className="w-4 h-4" />
                Explore Projects
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 mt-16">
        <div className="container mx-auto px-6 md:px-8 text-center">
          <p className="text-muted-foreground">
            © 2025 URL4IRL. Technology that serves humanity.
          </p>
        </div>
      </footer>
    </div>
  );
}
