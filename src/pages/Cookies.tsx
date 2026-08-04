import { LegalPage } from "@/components/layout/legal-page";
import { usePageMeta } from "@/lib/use-page-meta";

export default function Cookies() {
  usePageMeta({
    title: "Política de Cookies | Cyrrus Consulting Services",
    description:
      "Qué cookies utiliza el sitio web de Cyrrus Consulting Services, incluyendo Google Analytics, y cómo puede administrar sus preferencias.",
  });

  return (
    <LegalPage
      eyebrow="Legal"
      title="Política de Cookies"
      description="Qué cookies usamos en este sitio y cómo puede controlarlas."
      lastUpdated="3 de agosto de 2026"
    >
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
    </LegalPage>
  );
}
