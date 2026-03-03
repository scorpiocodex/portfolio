"use client";

import { motion } from "framer-motion";
import { AnimatedSectionNumber } from "./AnimatedElements";
import { FadeIn, FadeInItem, FadeInStagger } from "./FadeIn";

/* ─── Tier definitions ────────────────────────────────────────────────── */
type Tier = "core" | "proficient" | "familiar";

const TIER_META: Record<Tier, { label: string; dotCount: number }> = {
  core: { label: "Core", dotCount: 3 },
  proficient: { label: "Proficient", dotCount: 2 },
  familiar: { label: "Familiar", dotCount: 1 },
};

/* ─── Inline SVG Tech Icons ───────────────────────────────────────────── */
function HtmlIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.071-.757.541-6.03.089-.998H5.323l.225 2.471.013.149h7.79l-.351 3.88H8.291l.234 2.58h4.921l-.442 4.963-1.03.292-1.029-.292-.066-.738H8.32l.128 1.44 3.537.981 3.503-.972.459-5.17H8.531z" />
    </svg>
  );
}

function CssIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.002l5.355-1.12.705-7.571.058-.637.166-1.848.114-1.413z" />
    </svg>
  );
}

function JsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.405-.6-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
    </svg>
  );
}

function ReactIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.603.058-.878.17C4.7 2.12 4.258 3.7 4.723 6.137c-2.3.535-3.78 1.44-3.78 2.862 0 1.414 1.46 2.332 3.745 2.876C4.27 14.32 4.678 15.88 5.248 16.53c.64.73 1.556.97 2.404.97 1.346 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.31 0 .603-.058.878-.17 1.556-.616 1.997-2.196 1.532-4.634 2.3-.534 3.78-1.44 3.78-2.862 0-1.413-1.46-2.332-3.745-2.876.468-2.446.092-4.037-.534-4.668-.37-.37-.843-.545-1.39-.545zm-.126 1.27c.245 0 .437.048.592.163.393.295.637 1.222.334 3.005-.077.455-.19.934-.33 1.428-.77-.185-1.61-.32-2.496-.404a20.13 20.13 0 0 0-1.615-1.968c1.526-1.424 2.943-2.224 3.515-2.224zM12 8.1c.56.63 1.098 1.313 1.6 2.04a21.4 21.4 0 0 1-3.2 0A18.6 18.6 0 0 1 12 8.1zm-4.854-.928a18.5 18.5 0 0 1 1.615 1.968c-.891.083-1.727.218-2.496.404a15.5 15.5 0 0 1-.33-1.428c-.232-1.362-.093-2.38.262-2.707a.534.534 0 0 1 .379-.132c.573 0 1.99.8 3.516 2.224A20.1 20.1 0 0 0 8.55 9.56l-1.404-2.388zm-1.256 4.84c-1.845-.436-2.932-1.122-2.932-1.813 0-.686 1.082-1.382 2.932-1.814.47-.11.97-.2 1.49-.27a20.6 20.6 0 0 0 .888 2.093 20.1 20.1 0 0 0-.879 2.074c-.527-.07-1.033-.16-1.5-.27zm1.586 1.094c.77.185 1.61.32 2.496.404a20.13 20.13 0 0 0 1.615 1.968c-1.526 1.424-2.943 2.224-3.515 2.224a.534.534 0 0 1-.379-.132c-.393-.295-.637-1.222-.334-3.005.077-.455.19-.934.33-1.428l-.213-.031zM12 15.9a18.6 18.6 0 0 1-1.6-2.04 21.4 21.4 0 0 1 3.2 0A18.6 18.6 0 0 1 12 15.9zm3.45-1.468c.891-.083 1.727-.218 2.496-.404.14.494.253.973.33 1.428.303 1.783.059 2.71-.334 3.005-.156.115-.348.163-.592.163-.573 0-1.99-.8-3.516-2.224a20.1 20.1 0 0 0 1.616-1.968zm.862-1.435a20.6 20.6 0 0 0-.888-2.093c.32-.7.596-1.394.879-2.074.527.07 1.033.16 1.5.27 1.845.436 2.932 1.122 2.932 1.813 0 .686-1.082 1.382-2.932 1.814-.47.11-.97.2-1.49.27z" />
    </svg>
  );
}

function ResponsiveIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function NodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.282.282 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.284.284 0 0 0-.139.241v10.15a.27.27 0 0 0 .138.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551l-2.306-1.328A1.851 1.851 0 0 1 1.36 17.07V6.921c0-.646.35-1.249.921-1.572l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.572.323.924.926.924 1.572v10.15c0 .645-.352 1.245-.924 1.57l-8.795 5.078a1.85 1.85 0 0 1-.925.251z" />
    </svg>
  );
}

function PythonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.35.12-.33.2-.29.3-.26.32-.21.36-.16.35-.12.37-.08.34-.05.33-.02h.3l.07.01zm-5.67 17.18c.42 0 .76.34.76.76 0 .42-.34.74-.76.74a.74.74 0 0 1-.74-.74.74.74 0 0 1 .74-.76zM17.5 12l-.02-.21-.04-.27-.07-.32-.1-.35-.15-.37-.2-.36-.27-.35-.33-.32-.41-.27-.5-.22-.59-.14-.69-.05H9.23l-.69-.05-.59-.14-.5-.22-.41-.27-.34-.32-.27-.35-.2-.36-.15-.37-.1-.35-.07-.32-.04-.27-.02-.21V3.5l.03-.35.08-.31.17-.32.2-.28.3-.22.33-.16.35-.12.32-.08.36-.06.29-.03h10.83l.21.03.28.07.32.12.35.18.36.26.36.36.35.46.32.59.28.73.21.88.14 1.05.05 1.23-.06 1.22-.16 1.04-.24.87-.32.71-.36.57-.4.44-.42.33-.42.24-.4.16-.36.1-.32.05-.24.01h-.16l-.06-.01H9.89v.83h7.56l.01 2.75.02.37-.05.35-.12.33-.2.29-.3.26-.32.21-.36.16-.35.12-.37.08-.34.05-.33.02h-.3zM15.42 17.56c.42 0 .74.34.74.76a.74.74 0 0 1-.74.74.74.74 0 0 1-.76-.74c0-.42.34-.76.76-.76z" />
    </svg>
  );
}

function RestApiIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8l4 4-4 4M7 8L3 12l4 4" />
      <path d="M14 4l-4 16" />
    </svg>
  );
}

function SqlIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function PostgresIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.792.672 7.06.258 5.424.556c-1.278.233-2.69.906-3.542 2.252C.86 4.557.617 7.385 1.37 10.14c.314 1.15.82 2.417 1.58 3.428.354.47.788.884 1.305 1.136.247.12.53.197.83.197.255 0 .47-.05.657-.123.046.206.09.422.125.635.107.656.157 1.33.157 1.998 0 .382-.02.758-.06 1.124-.05.402-.12.787-.2 1.134-.086.376-.18.702-.293.974a3.26 3.26 0 0 1-.12.26l-.063.116c-.075.137-.138.24-.183.3l-.052.078a.63.63 0 0 0 .064.836.633.633 0 0 0 .837-.014c.137-.137.398-.462.634-.98.191-.42.36-.93.496-1.513.114-.49.198-.994.254-1.49.056-.518.082-1.07.082-1.626 0-.73-.057-1.478-.178-2.197a11.758 11.758 0 0 0-.268-1.204c.082-.082.163-.157.246-.23 1.04-.911 2.38-1.32 3.47-1.32h.01c1.092 0 2.43.41 3.47 1.32.083.073.164.148.246.23a11.76 11.76 0 0 0-.268 1.204c-.121.719-.178 1.466-.178 2.197 0 .556.026 1.108.082 1.626.056.496.14 1 .255 1.49.135.584.304 1.092.495 1.513.236.518.497.843.634.98a.633.633 0 0 0 .837.014.63.63 0 0 0 .064-.836l-.052-.078a3.18 3.18 0 0 1-.183-.3l-.063-.116a3.26 3.26 0 0 1-.12-.26 7.7 7.7 0 0 1-.293-.974 10.91 10.91 0 0 1-.2-1.134 12.36 12.36 0 0 1-.06-1.124c0-.668.05-1.342.157-1.998.035-.213.079-.43.125-.635.187.073.402.123.656.123.3 0 .584-.077.83-.197.518-.252.952-.666 1.306-1.136.76-1.011 1.266-2.278 1.58-3.428.753-2.756.51-5.584-.512-7.332-.852-1.346-2.263-2.019-3.542-2.252a8.477 8.477 0 0 0-1.596-.1z" />
    </svg>
  );
}

function DockerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.186V9.006a.186.186 0 0 0-.186-.186h-2.119a.186.186 0 0 0-.187.186v1.886c0 .103.084.186.187.186zm-2.954-5.43h2.118a.186.186 0 0 0 .187-.185V3.577a.186.186 0 0 0-.187-.186h-2.118a.186.186 0 0 0-.187.186v1.886c0 .102.084.185.187.185zm0 2.716h2.118a.187.187 0 0 0 .187-.186V6.292a.187.187 0 0 0-.187-.186h-2.118a.186.186 0 0 0-.187.186v1.886c0 .103.084.186.187.186zm-2.93 0h2.12a.186.186 0 0 0 .186-.186V6.292a.186.186 0 0 0-.186-.186h-2.12a.186.186 0 0 0-.184.186v1.886c0 .103.083.186.185.186zm-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.292a.186.186 0 0 0-.185-.186H5.136a.186.186 0 0 0-.186.186v1.886c0 .103.084.186.186.186zm5.893 2.715h2.118a.186.186 0 0 0 .186-.186V9.006a.186.186 0 0 0-.186-.186h-2.118a.187.187 0 0 0-.187.186v1.886c0 .103.084.186.187.186zm-2.93 0h2.12a.186.186 0 0 0 .186-.186V9.006a.186.186 0 0 0-.186-.186h-2.12a.186.186 0 0 0-.184.186v1.886c0 .103.083.186.185.186zm-2.964 0h2.119a.186.186 0 0 0 .185-.186V9.006a.186.186 0 0 0-.185-.186H5.136a.186.186 0 0 0-.186.186v1.886c0 .103.084.186.186.186zm-2.92 0h2.12a.186.186 0 0 0 .184-.186V9.006a.186.186 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.886c0 .103.084.186.186.186zM23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.72 3.104 1.133 5.276 1.133.983 0 1.973-.09 2.94-.264a10.875 10.875 0 0 0 3.552-1.387 9.347 9.347 0 0 0 2.08-1.678c1.128-1.27 1.802-2.683 2.322-3.88h.2c1.23 0 1.986-.494 2.403-.91a2.551 2.551 0 0 0 .68-1.064l.09-.27-.24-.19z" />
    </svg>
  );
}

function GitIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76a1.838 1.838 0 0 1 2.327 2.341l2.66 2.66a1.838 1.838 0 1 1-1.103 1.047l-2.48-2.48v6.53a1.838 1.838 0 1 1-1.51-.078V8.735a1.838 1.838 0 0 1-1-2.413L7.62 3.58.452 10.748c-.603.604-.603 1.582 0 2.186l10.48 10.48c.604.604 1.582.604 2.186 0l10.43-10.43c.604-.604.604-1.582 0-2.053z" />
    </svg>
  );
}

function VscodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
    </svg>
  );
}

function LinuxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 0 0-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.244-.182-.01-.373-.086-.548-.2-.073-.12-.12-.252-.14-.4-.04-.26.01-.496.09-.762.06-.22.12-.48.14-.76.03-.22.06-.44.1-.66.03-.22.09-.44.12-.64a.63.63 0 0 0 .03-.33.63.63 0 0 0-.33-.33 1.28 1.28 0 0 0-.72-.15c-.25.01-.5.1-.75.26a2.16 2.16 0 0 0-.66.66c-.14.22-.22.44-.26.66-.02.11-.03.22-.03.33 0 .18.04.36.11.54.18.48.56.88 1.04 1.12.48.24 1.04.34 1.58.3.1 0 .2-.02.3-.03a3.85 3.85 0 0 0 1.16-.44c.4-.22.74-.5 1.04-.84.11-.12.22-.25.33-.38.22.1.46.18.72.22.44.08.88.06 1.3-.04.44-.1.84-.3 1.2-.56.36-.26.66-.6.9-.98.06-.08.11-.16.14-.24.15.06.31.12.48.16.48.14.98.18 1.46.1.48-.08.94-.26 1.34-.52.4-.26.74-.6 1-.98.26-.38.42-.82.5-1.28.08-.46.08-.94.02-1.4a5.62 5.62 0 0 0-.56-1.66c-.28-.52-.64-1.02-1.06-1.44-.42-.42-.9-.78-1.42-1.06-.52-.28-1.08-.48-1.66-.56a4.02 4.02 0 0 0-.68-.04z" />
    </svg>
  );
}

function WindowsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  );
}

function PostmanIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643 4.44-4.44a.856.856 0 1 1 1.556.687zm-7.807 6.723l-.463-.463 4.453-4.453a.856.856 0 1 1 .463.463l-4.453 4.453z" />
    </svg>
  );
}

function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

/* ─── Icon map ────────────────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  "HTML5": HtmlIcon,
  "CSS3": CssIcon,
  "JavaScript": JsIcon,
  "React": ReactIcon,
  "Responsive Design": ResponsiveIcon,
  "Node.js": NodeIcon,
  "Python": PythonIcon,
  "REST APIs": RestApiIcon,
  "SQL": SqlIcon,
  "PostgreSQL": PostgresIcon,
  "Docker": DockerIcon,
  "Git / GitHub": GitIcon,
  "VS Code": VscodeIcon,
  "Linux": LinuxIcon,
  "Windows 10/11": WindowsIcon,
  "Postman": PostmanIcon,
  "Command-line": TerminalIcon,
};

/* ─── Skill data ──────────────────────────────────────────────────────── */
interface Skill {
  name: string;
  tier: Tier;
}

interface SkillGroup {
  category: string;
  number: string;
  color: string;
  skills: Skill[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Frontend",
    number: "01",
    color: "#58A6FF",
    skills: [
      { name: "HTML5", tier: "core" },
      { name: "CSS3", tier: "core" },
      { name: "JavaScript", tier: "core" },
      { name: "React", tier: "proficient" },
      { name: "Responsive Design", tier: "proficient" },
    ],
  },
  {
    category: "Backend & Data",
    number: "02",
    color: "#7C3AED",
    skills: [
      { name: "Node.js", tier: "proficient" },
      { name: "Python", tier: "proficient" },
      { name: "REST APIs", tier: "proficient" },
      { name: "SQL", tier: "proficient" },
      { name: "PostgreSQL", tier: "proficient" },
      { name: "Docker", tier: "familiar" },
    ],
  },
  {
    category: "Dev Environment",
    number: "03",
    color: "#3FB950",
    skills: [
      { name: "Git / GitHub", tier: "core" },
      { name: "VS Code", tier: "core" },
      { name: "Linux", tier: "proficient" },
      { name: "Windows 10/11", tier: "core" },
      { name: "Postman", tier: "proficient" },
      { name: "Command-line", tier: "proficient" },
    ],
  },
];

/* ─── Tier dot indicator ──────────────────────────────────────────────── */
function TierDots({ tier, color }: { tier: Tier; color: string }) {
  const { dotCount } = TIER_META[tier];
  return (
    <div className="flex items-center gap-1" title={TIER_META[tier].label}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-[5px] h-[5px] rounded-full transition-colors duration-300"
          style={{
            backgroundColor: i <= dotCount ? color : "rgba(139,148,158,0.2)",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Skill row ───────────────────────────────────────────────────────── */
function SkillRow({ skill, color, index }: { skill: Skill; color: string; index: number }) {
  const IconComponent = ICON_MAP[skill.name];

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
      className="group/skill flex items-center gap-3 py-2.5 px-3 -mx-3 rounded-lg hover:bg-white/[0.03] transition-all duration-200 cursor-default"
    >
      {/* Icon */}
      <div
        className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-all duration-200 group-hover/skill:scale-110"
        style={{
          backgroundColor: `${color}10`,
          color: `${color}cc`,
        }}
      >
        {IconComponent ? (
          <IconComponent className="w-3.5 h-3.5" />
        ) : (
          <span className="text-[10px] font-mono font-bold">{skill.name.slice(0, 2)}</span>
        )}
      </div>

      {/* Name */}
      <span className="flex-1 font-mono text-[12px] text-text-secondary group-hover/skill:text-text-primary transition-colors duration-200 tracking-wide">
        {skill.name}
      </span>

      {/* Tier dots */}
      <TierDots tier={skill.tier} color={color} />
    </motion.div>
  );
}

/* ─── Main component ──────────────────────────────────────────────────── */
export default function Skills() {
  return (
    <section id="skills" className="py-24 lg:py-32">
      <div className="max-w-content mx-auto px-6">

        {/* Header */}
        <FadeIn className="mb-16">
          <AnimatedSectionNumber number="05" label="Skills" />
          <h2 className="font-space-grotesk text-3xl lg:text-4xl font-bold text-text-primary tracking-tight">
            Technical Stack
          </h2>
          <p className="text-text-secondary text-base mt-3 max-w-md leading-relaxed">
            Tools, languages, and environments in active use.
          </p>
        </FadeIn>

        {/* Skill groups */}
        <FadeInStagger staggerDelay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SKILL_GROUPS.map((group) => (
              <FadeInItem key={group.category}>
                <div
                  className="h-full p-6 rounded-card border border-border bg-surface/40 relative overflow-hidden group hover:border-[var(--g-color)]/30 transition-all duration-300 card-glow"
                  style={{ "--g-color": group.color } as React.CSSProperties}
                >
                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1.5px]"
                    style={{ background: group.color }}
                  />

                  {/* Category header */}
                  <div className="mb-5">
                    <div
                      className="font-mono text-[10px] tracking-widest uppercase mb-2"
                      style={{ color: group.color }}
                    >
                      {group.number}
                    </div>
                    <h3 className="font-space-grotesk text-base font-semibold text-text-primary">
                      {group.category}
                    </h3>
                  </div>

                  {/* Skills list */}
                  <div className="flex flex-col gap-0">
                    {group.skills.map((skill, index) => (
                      <SkillRow
                        key={skill.name}
                        skill={skill}
                        color={group.color}
                        index={index}
                      />
                    ))}
                  </div>

                  {/* Skill count */}
                  <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: group.color }}
                      />
                      <span className="font-mono text-[10px] text-text-secondary">
                        {group.skills.length} items
                      </span>
                    </div>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </div>
        </FadeInStagger>

        {/* Tier legend */}
        <FadeIn delay={0.15} className="mt-10">
          <div className="flex flex-wrap gap-6 justify-end">
            {(["core", "proficient", "familiar"] as Tier[]).map((tier) => (
              <div key={tier} className="flex items-center gap-2.5">
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-[5px] h-[5px] rounded-full"
                      style={{
                        backgroundColor:
                          i <= TIER_META[tier].dotCount
                            ? "#8B949E"
                            : "rgba(139,148,158,0.2)",
                      }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[10px] text-text-secondary/80">
                  {tier === "core"
                    ? "Core — daily use"
                    : tier === "proficient"
                      ? "Proficient — regular use"
                      : "Familiar — working knowledge"}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
