"use client";

import { useTranslations } from "next-intl";

export function ProjectsContainer() {
  const t = useTranslations();

  const projects = [
    {
      name: "Eu tive um sonho",
      description: t("projects.eutiveumsonho"),
      href: "https://eutiveumsonho.com",
      github: "https://github.com/eutiveumsonho/eutiveumsonho",
    },
    {
      name: "Domain Verification Service",
      description: t("projects.domain-verification"),
      href: "https://domain-verification.url4irl.com",
      github: "https://github.com/url4irl/domain-verification",
    },
    {
      name: "Token Count Service",
      description: t("projects.token-count"),
      href: "https://token-count.url4irl.com",
      github: "https://github.com/url4irl/token-count",
    },
    {
      name: "SearXNG Instance",
      description: t("projects.searxng"),
      href: "https://search.url4irl.com",
      github: "https://github.com/searxng/searx-instances/issues/642",
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("nav.projects")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <a
              data-umami-event={`project-click-${project.name}`}
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2">{project.name}</h3>
              <p className="text-muted-foreground">{project.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
