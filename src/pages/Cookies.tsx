import { useTranslation } from "react-i18next";
import { LegalPage } from "@/components/layout/legal-page";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";

export default function Cookies() {
  const { t } = useTranslation("legal");
  const lang = useLang();

  usePageMeta({
    title: t("cookies.meta.title"),
    description: t("cookies.meta.description"),
    alternatePath: lang === "en" ? "/cookies" : "/en/cookies",
  });

  return (
    <LegalPage
      eyebrow={t("cookies.eyebrow")}
      title={t("cookies.title")}
      description={t("cookies.description")}
      lastUpdated={t("cookies.lastUpdated")}
    >
      {lang === "en" ? (
        <>
          <section>
            <h2>1. What cookies are</h2>
            <p>
              Cookies are small text files a website stores in your browser to remember information between
              visits — for example, a preference you chose or how you arrived at this site.
            </p>
          </section>

          <section>
            <h2>2. Cookies we use</h2>
            <p>This site uses the following categories of cookies:</p>

            <h3>Strictly necessary cookies</h3>
            <p>These enable the site's basic functionality and don't require consent.</p>
            <ul>
              <li>
                <strong>Cookie preference:</strong> remembers whether you accepted or declined non-essential
                cookies, so we don't show you the notice on every visit.
              </li>
            </ul>

            <h3>Analytics cookies — Google Analytics</h3>
            <p>
              We use Google Analytics to understand which pages are visited most and how visitors navigate,
              in order to improve the site's content and experience. Google Analytics sets cookies such as:
            </p>
            <ul>
              <li><strong>_ga:</strong> distinguishes unique users. Expires after 2 years.</li>
              <li><strong>_ga_&lt;ID&gt;:</strong> maintains session state. Expires after 2 years.</li>
            </ul>
            <p>
              These cookies only activate if you give consent via the site's cookie notice. Google may
              process this information according to its own{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                privacy policy
              </a>
              .
            </p>

            <h3>Marketing and other tool cookies</h3>
            <p>
              We may use additional cookies from marketing and advertising tools (for example, to measure
              campaign performance or for remarketing). Like analytics cookies, these only activate with
              your prior consent.
            </p>
          </section>

          <section>
            <h2>3. How to control cookies</h2>
            <p>
              You can accept or decline non-essential cookies (analytics and marketing) from the notice that
              appears on your first visit, and change your decision at any time by clearing this site's data
              in your browser settings. You can also delete or block cookies directly from your browser —
              keep in mind that blocking strictly necessary cookies may affect the site's functionality.
            </p>
            <p>
              You can also install the{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">
                Google Analytics opt-out add-on
              </a>{" "}
              to prevent your data from being sent to Google Analytics on any website.
            </p>
          </section>

          <section>
            <h2>4. Changes to this policy</h2>
            <p>
              We may update this policy if the cookies or tools we use change. The "last updated" date at
              the top of this page reflects the current version.
            </p>
          </section>

          <section>
            <h2>5. Contact</h2>
            <p>
              For questions about this policy, write to us at{" "}
              <a href="mailto:contacto@cyrruscs.com">contacto@cyrruscs.com</a>. See also our{" "}
              <a href="/en/privacidad">Privacy Policy</a>.
            </p>
          </section>
        </>
      ) : (
        <>
          <section>
            <h2>1. Qué son las cookies</h2>
            <p>
              Las cookies son pequeños archivos de texto que un sitio web guarda en su navegador para recordar
              información entre visitas — por ejemplo, una preferencia que usted eligió o cómo llegó a este
              sitio.
            </p>
          </section>

          <section>
            <h2>2. Cookies que usamos</h2>
            <p>Este sitio usa las siguientes categorías de cookies:</p>

            <h3>Cookies estrictamente necesarias</h3>
            <p>Permiten el funcionamiento básico del sitio y no requieren consentimiento.</p>
            <ul>
              <li>
                <strong>Preferencia de cookies:</strong> recuerda si usted aceptó o rechazó las cookies no
                esenciales, para no mostrarle el aviso en cada visita.
              </li>
            </ul>

            <h3>Cookies analíticas — Google Analytics</h3>
            <p>
              Usamos Google Analytics para entender qué páginas se visitan más y cómo navegan los visitantes,
              con el fin de mejorar el contenido y la experiencia del sitio. Google Analytics instala cookies
              como:
            </p>
            <ul>
              <li><strong>_ga:</strong> distingue usuarios únicos. Expira a los 2 años.</li>
              <li><strong>_ga_&lt;ID&gt;:</strong> mantiene el estado de la sesión. Expira a los 2 años.</li>
            </ul>
            <p>
              Estas cookies solo se activan si usted da su consentimiento en el aviso de cookies del sitio.
              Google puede procesar esta información según su propia{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                política de privacidad
              </a>
              .
            </p>

            <h3>Cookies de marketing y otras herramientas</h3>
            <p>
              Podemos usar cookies adicionales de herramientas de marketing y publicidad (por ejemplo, para
              medir el rendimiento de campañas o remarketing). Al igual que las cookies analíticas, solo se
              activan con su consentimiento previo.
            </p>
          </section>

          <section>
            <h2>3. Cómo controlar las cookies</h2>
            <p>
              Puede aceptar o rechazar las cookies no esenciales (analíticas y de marketing) desde el aviso que
              aparece en su primera visita, y cambiar su decisión en cualquier momento borrando los datos de
              este sitio en la configuración de su navegador. También puede eliminar o bloquear cookies
              directamente desde su navegador — tenga en cuenta que bloquear cookies estrictamente necesarias
              puede afectar el funcionamiento del sitio.
            </p>
            <p>
              Adicionalmente, puede instalar el{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noreferrer"
              >
                complemento de inhabilitación de Google Analytics
              </a>{" "}
              para evitar que sus datos se envíen a Google Analytics en cualquier sitio web.
            </p>
          </section>

          <section>
            <h2>4. Cambios a esta política</h2>
            <p>
              Podemos actualizar esta política si cambian las cookies o herramientas que utilizamos. La fecha
              de "última actualización" al inicio de esta página refleja la versión vigente.
            </p>
          </section>

          <section>
            <h2>5. Contacto</h2>
            <p>
              Para preguntas sobre esta política, escríbanos a{" "}
              <a href="mailto:contacto@cyrruscs.com">contacto@cyrruscs.com</a>. Vea también nuestra{" "}
              <a href="/privacidad">Política de Privacidad</a>.
            </p>
          </section>
        </>
      )}
    </LegalPage>
  );
}
