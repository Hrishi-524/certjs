"use client";

import { useCallback, useEffect, useState } from "react";

import { DOCUMENTATION_SIDEBAR } from "@/components/data/documentation/sidebar";

const SCROLL_OFFSET = 96;
const NAVIGATION_IDS = DOCUMENTATION_SIDEBAR.flatMap((section) =>
    section.items.map((item) => item.href.replace("#", ""))
);

function getHash(id: string) {
    return `#${id}`;
}

function normalizeLabel(value: string) {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function getSections() {
    return Array.from(
        document.querySelectorAll<HTMLElement>("section[id]")
    );
}

function getNavigableSections() {
    const navigationIds = new Set(NAVIGATION_IDS);

    return getSections().filter((section) => navigationIds.has(section.id));
}

function findSectionByLabel(label: string) {
    const normalizedLabel = normalizeLabel(label);

    return getSections().find((section) => {
        const heading = section.querySelector("h1, h2, h3");
        const headingLabel = heading?.textContent ?? "";

        return normalizeLabel(headingLabel) === normalizedLabel;
    });
}

function getCurrentSectionId() {
    const sections = getNavigableSections();

    if (sections.length === 0) {
        return "";
    }

    const currentSection = sections.reduce<HTMLElement | null>(
        (current, section) => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop > SCROLL_OFFSET) {
                return current;
            }

            if (!current) {
                return section;
            }

            return sectionTop > current.getBoundingClientRect().top
                ? section
                : current;
        },
        null
    );

    if (currentSection) {
        return currentSection.id;
    }

    return sections[0]?.id ?? "";
}

export function resolveDocumentationTargetId(href: string, label: string) {
    const hrefId = href.startsWith("#") ? href.slice(1) : "";

    if (typeof document === "undefined") {
        return hrefId;
    }

    if (hrefId && document.getElementById(hrefId)) {
        return hrefId;
    }

    return findSectionByLabel(label)?.id ?? hrefId;
}

export function useDocumentationScrollSpy() {
    const [activeId, setActiveId] = useState("");

    const updateActiveSection = useCallback(() => {
        const nextActiveId = getCurrentSectionId();

        if (!nextActiveId) {
            return;
        }

        setActiveId(nextActiveId);

        const nextHash = getHash(nextActiveId);

        if (window.location.hash !== nextHash) {
            window.history.replaceState(null, "", nextHash);
        }
    }, []);

    const scrollToHash = useCallback((hash: string, behavior: ScrollBehavior) => {
        const id = hash.startsWith("#") ? hash.slice(1) : hash;
        const target = id ? document.getElementById(id) : null;

        if (!target) {
            return;
        }

        target.scrollIntoView({
            behavior,
            block: "start",
        });
    }, []);

    const handleLinkClick = useCallback(
        (href: string, label: string) => {
            const targetId = resolveDocumentationTargetId(href, label);

            if (!targetId) {
                return;
            }

            const nextHash = getHash(targetId);
            window.history.pushState(null, "", nextHash);
            setActiveId(targetId);
            scrollToHash(nextHash, "smooth");
        },
        [scrollToHash]
    );

    useEffect(() => {
        let frame = 0;

        const requestUpdate = () => {
            window.cancelAnimationFrame(frame);
            frame = window.requestAnimationFrame(updateActiveSection);
        };

        const observer = new IntersectionObserver(requestUpdate, {
            rootMargin: `-${SCROLL_OFFSET}px 0px -55% 0px`,
            threshold: [0, 0.1, 0.25, 0.5, 1],
        });

        getSections().forEach((section) => observer.observe(section));
        requestUpdate();

        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);

        const handlePopState = () => {
            scrollToHash(window.location.hash, "smooth");
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.cancelAnimationFrame(frame);
            observer.disconnect();
            window.removeEventListener("scroll", requestUpdate);
            window.removeEventListener("resize", requestUpdate);
            window.removeEventListener("popstate", handlePopState);
        };
    }, [scrollToHash, updateActiveSection]);

    return {
        activeId,
        handleLinkClick,
        resolveTargetId: resolveDocumentationTargetId,
    };
}
