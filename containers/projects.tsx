"use client";

import { useTranslations } from "next-intl";
import { Github } from "lucide-react";

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
      href: "https://domain-verification.url4irl.com/docs",
      github: "https://github.com/url4irl/domain-verification",
    },
    {
      name: "Token Count Service",
      description: t("projects.token-count"),
      href: "https://token-count.url4irl.com/docs",
      github: "https://github.com/url4irl/token-count",
    },
    {
      name: "SearXNG Instance",
      description: t("projects.searxng"),
      href: "https://search.url4irl.com",
      github: "https://github.com/searxng/searx-instances/issues/642",
    },
    {
      name: "SaaS Conversion Simulator",
      description: t("projects.saas-simulator"),
      href: "https://saas-conversion-simulator.url4irl.com",
      github: "https://github.com/url4irl/saas-conversion-simulator",
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
            <div
              key={project.name}
              className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <a
                  data-umami-event={`project-click-${project.name}`}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {new URL(project.href).hostname}
                </a>
                {project.github && (
                  <a
                    data-umami-event={`github-click-${project.name}`}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
