import { useContent } from '@/context/locale';
import { EmailCopy } from '@/components/contact/EmailCopy';
import { CvButton } from '@/components/ui/CvButton';
import { Icon } from '@/components/ui/Icon';
import { Marquee } from '@/components/ui/Marquee';
import { Reveal } from '@/components/ui/Reveal';
import { SplitReveal } from '@/components/ui/SplitReveal';

export function Contact() {
  const { site, socials, ui } = useContent();
  const { contact } = site;

  return (
    <section
      id="contact"
      className="relative isolate overflow-clip pb-section before:pointer-events-none before:absolute before:bottom-[-40vw] before:left-1/2 before:-z-1 before:aspect-square before:w-[120vw] before:-translate-x-1/2 before:rounded-full before:bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-accent)_16%,transparent),transparent)] before:content-['']"
      aria-labelledby="contact-eyebrow contact-headline"
    >
      <Marquee
        items={contact.marquee}
        className="border-y border-line py-6 text-[length:clamp(2rem,1rem+4vw,5rem)] leading-[1.1] font-medium tracking-[-0.04em]"
      />

      <div className="site-container pt-section">
        <p className="label flex gap-3">
          <span className="text-accent">(05)</span>
          {ui.contact.eyebrow}
        </p>

        <h2 className="mt-8 text-display leading-tight font-medium tracking-[-0.055em] max-[640px]:text-[clamp(2.25rem,12vw,3.5rem)]">
          <SplitReveal
            id="contact-eyebrow"
            text={contact.eyebrow}
            className="serif-accent text-[0.5em] tracking-[-0.02em]! text-fg-muted"
          />
          <SplitReveal id="contact-headline" text={contact.headline} delay={0.15} />
        </h2>

        <div className="mt-[clamp(4rem,3rem+5vw,9rem)] grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-x-gutter gap-y-16 max-[960px]:grid-cols-1">
          <Reveal className="flex flex-col gap-8">
            <p className="max-w-[30rem] text-lg text-fg-muted">{contact.subline}</p>
            <EmailCopy email={site.email} />
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-8">
              <p className="font-mono text-xs tracking-label text-fg-muted uppercase">
                {contact.cvNote}
              </p>
              <CvButton />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="border-t border-line">
              {socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-line py-4 transition-[padding] duration-420 ease-out hover:px-3 focus-visible:px-3"
                    data-cursor="label"
                    data-cursor-label={ui.contact.open}
                  >
                    <span className="text-lg">{social.label}</span>
                    <span className="font-mono text-xs text-fg-subtle">{social.handle}</span>
                    <Icon
                      name="arrowUpRight"
                      className="transition-transform duration-420 ease-out group-hover:rotate-45 group-hover:text-accent group-focus-visible:rotate-45 group-focus-visible:text-accent"
                    />
                    <span className="sr-only">{ui.opensInNewTab}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
