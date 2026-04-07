import ProjectDetail from "@/components/ProjectDetail";
import { SITE } from "@/lib/constants";
import { getAllSlugs, getProjectBySlug } from "@/lib/projects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);
    if (!project) return {};

    return {
        title: `${project.name} — ${project.tagline} | ${SITE.name}`,
        description: project.description,
        openGraph: {
            title: `${project.name} — ${project.tagline}`,
            description: project.description,
            url: `${SITE.url}/projects/${project.slug}`,
            siteName: `${SITE.name} — Portfolio`,
            type: "article",
        },
    };
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return <ProjectDetail project={project} />;
}
