import { useTranslation } from "react-i18next";
import { LegalPage } from "@/components/layout/legal-page";
import { usePageMeta } from "@/lib/use-page-meta";
import { useLang } from "@/lib/language";
// Registers this route's translation namespace. Side-effect import: it must
// run at module scope so the copy is in i18next's store before the component
// below renders. See src/i18n/index.ts for why it isn't in the entry bundle.
import "@/i18n/ns/legal";

export default function Privacidad() {
  const { t } = useTranslation("legal");
  const lang = useLang();

  usePageMeta({
    title: t("privacidad.meta.title"),
    description: t("privacidad.meta.description"),
    alternatePath: lang === "en" ? "/privacidad" : "/en/privacidad",
  });

  return (
    <LegalPage
      eyebrow={t("privacidad.eyebrow")}
      title={t("privacidad.title")}
      description={t("privacidad.description")}
      lastUpdated={t("privacidad.lastUpdated")}
    >
      {lang === "en" ? (
        <>
          <section>
            <h2>1. Data controller</h2>
            <p>
              Cyrrus Consulting Services S.A.S. (NIT 9011219531) ("Cyrrus", "we") is the controller of the
              personal data collected through this website. For any questions about this policy, you can
              write to us at <a href="mailto:contacto@cyrruscs.com">contacto@cyrruscs.com</a>.
            </p>
          </section>

          <section>
            <h2>2. What data we collect</h2>
            <p>We collect personal data only when you provide it directly, for example when you:</p>
            <ul>
              <li>Fill out the contact form (name, email, company, phone, and message).</li>
              <li>Write to us directly by email.</li>
            </ul>
            <p>
              We also passively collect browsing data through Google Analytics and other analytics and
              marketing tools, only if you consent via the site's cookie notice — see our <a href="/en/cookies">Cookie Policy</a> for details on which cookies are used and how to
              disable them.
            </p>
          </section>

          <section>
            <h2>3. What we use your data for</h2>
            <ul>
              <li>Responding to your contact request and coordinating a call with the Cyrrus team.</li>
              <li>Understanding the business context and challenge you describe, to route your inquiry to the right area.</li>
              <li>Communicating with you about the status of your request.</li>
              <li>Understanding, through Google Analytics and other analytics tools, how the site is used to improve its content and experience.</li>
            </ul>
            <p>We don't use your data to send unsolicited advertising or for purposes other than those described here without your consent.</p>
          </section>

          <section>
            <h2>4. Who we share your data with</h2>
            <p>We don't sell or rent your personal data to third parties. We may only share information with:</p>
            <ul>
              <li>Technical infrastructure providers that operate this site (e.g., hosting and form-submission services), under confidentiality obligations.</li>
              <li>Google Analytics and other analytics and marketing tools, only aggregated browsing data and only if you've given consent — we don't share contact-form data with them.</li>
              <li>Competent authorities, when required by law.</li>
            </ul>
          </section>

          <section>
            <h2>5. How long we keep your data</h2>
            <p>
              We keep contact-form data for as long as necessary to handle your request and, afterward, for
              the period required by applicable law or until you request its deletion.
            </p>
          </section>

          <section>
            <h2>6. Your rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Know, update, and correct your personal data.</li>
              <li>Request proof of the authorization given for processing your data.</li>
              <li>Request deletion of your data when it's no longer necessary for the purpose it was collected for.</li>
              <li>Revoke authorization or object to the processing of your data.</li>
            </ul>
            <p>
              To exercise these rights, write to us at <a href="mailto:contacto@cyrruscs.com">contacto@cyrruscs.com</a>.
            </p>
          </section>

          <section>
            <h2>7. Information security</h2>
            <p>
              We apply reasonable technical and organizational measures to protect your personal data
              against unauthorized access, loss, or misuse.
            </p>
          </section>

          <section>
            <h2>8. Changes to this policy</h2>
            <p>
              We may update this policy occasionally. The "last updated" date at the top of this page
              reflects the current version.
            </p>
          </section>

          <section>
            <h2>9. Contact</h2>
            <p>
              If you have questions about this policy or how your data is handled, write to us at <a href="mailto:contacto@cyrruscs.com">contacto@cyrruscs.com</a>.
            </p>
          </section>
        </>
      ) : (
        <>
          <section>
            <h2>1. Responsable del tratamiento</h2>
            <p>
              Cyrrus Consulting Services S.A.S. (NIT 9011219531) ("Cyrrus", "nosotros") es responsable del
              tratamiento de los datos personales que se recolectan a través de este sitio web. Para
              cualquier consulta sobre esta política, puede escribirnos a <a href="mailto:contacto@cyrruscs.com">contacto@cyrruscs.com</a>.
            </p>
          </section>

          <section>
            <h2>2. Qué datos recolectamos</h2>
            <p>Recolectamos datos personales únicamente cuando usted los proporciona directamente, por ejemplo al:</p>
            <ul>
              <li>Completar el formulario de contacto (nombre, correo electrónico, empresa, teléfono y mensaje).</li>
              <li>Escribirnos directamente por correo electrónico.</li>
            </ul>
            <p>
              También recolectamos datos de navegación de forma pasiva a través de Google Analytics y otras
              herramientas de analítica y marketing, únicamente si usted da su consentimiento en el aviso de
              cookies del sitio — vea nuestra <a href="/cookies">Política de Cookies</a> para el detalle de
              qué cookies se usan y cómo desactivarlas.
            </p>
          </section>

          <section>
            <h2>3. Para qué usamos sus datos</h2>
            <ul>
              <li>Responder a su solicitud de contacto y coordinar una conversación con el equipo de Cyrrus.</li>
              <li>Entender el contexto y reto de negocio que describe, para dirigir su consulta al área correcta.</li>
              <li>Comunicarnos con usted sobre el estado de su solicitud.</li>
              <li>Entender, mediante Google Analytics y otras herramientas de analítica, cómo se usa el sitio para mejorar su contenido y experiencia.</li>
            </ul>
            <p>No usamos sus datos para enviar publicidad no solicitada ni los usamos con fines distintos a los aquí descritos sin su consentimiento.</p>
          </section>

          <section>
            <h2>4. Con quién compartimos sus datos</h2>
            <p>
              No vendemos ni alquilamos sus datos personales a terceros. Solo podemos compartir información con:
            </p>
            <ul>
              <li>Proveedores de infraestructura técnica que operan este sitio (por ejemplo, hosting y servicios de envío de formularios), bajo obligaciones de confidencialidad.</li>
              <li>Google Analytics y otras herramientas de analítica y marketing, únicamente datos de navegación agregados y solo si usted dio su consentimiento — no compartimos con ellas los datos del formulario de contacto.</li>
              <li>Autoridades competentes, cuando la ley lo exija.</li>
            </ul>
          </section>

          <section>
            <h2>5. Cuánto tiempo conservamos sus datos</h2>
            <p>
              Conservamos los datos del formulario de contacto durante el tiempo necesario para atender su
              solicitud y, posteriormente, por el plazo que exija la normativa aplicable o hasta que usted
              solicite su eliminación.
            </p>
          </section>

          <section>
            <h2>6. Sus derechos</h2>
            <p>Usted tiene derecho a:</p>
            <ul>
              <li>Conocer, actualizar y rectificar sus datos personales.</li>
              <li>Solicitar prueba de la autorización otorgada para el tratamiento de sus datos.</li>
              <li>Solicitar la eliminación de sus datos cuando ya no sean necesarios para la finalidad para la que fueron recolectados.</li>
              <li>Revocar la autorización u oponerse al tratamiento de sus datos.</li>
            </ul>
            <p>
              Para ejercer estos derechos, escríbanos a <a href="mailto:contacto@cyrruscs.com">contacto@cyrruscs.com</a>.
            </p>
          </section>

          <section>
            <h2>7. Seguridad de la información</h2>
            <p>
              Aplicamos medidas técnicas y organizativas razonables para proteger sus datos personales contra
              acceso no autorizado, pérdida o uso indebido.
            </p>
          </section>

          <section>
            <h2>8. Cambios a esta política</h2>
            <p>
              Podemos actualizar esta política ocasionalmente. La fecha de "última actualización" al inicio de
              esta página refleja la versión vigente.
            </p>
          </section>

          <section>
            <h2>9. Contacto</h2>
            <p>
              Si tiene preguntas sobre esta política o el tratamiento de sus datos, escríbanos a <a href="mailto:contacto@cyrruscs.com">contacto@cyrruscs.com</a>.
            </p>
          </section>
        </>
      )}
    </LegalPage>
  );
}
