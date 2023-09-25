import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Powered By-{" "}
          <a
            href={siteConfig.url}
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            Ajit Patil
          </a>
          .
        </p>
      </div>
    </footer>
  )
}
