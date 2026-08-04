import { LegalPage } from "@/components/layout/legal-page";
import { usePageMeta } from "@/lib/use-page-meta";

export default function Privacidad() {
  usePageMeta({
    title: "Política de Privacidad | Cyrrus Consulting Services",
    description:
      "Cómo Cyrrus Consulting Services recolecta, usa y protege los datos personales de quienes visitan este sitio o contactan a la empresa.",
  });

  return (
    <LegalPage
      eyebrow="Legal"
      title="Política de Privacidad"
      description="Cómo tratamos los datos personales de quienes visitan este sitio o nos contactan."
      lastUpdated="3 de agosto de 2026"
    >
      <section>
        <h2>1. Responsable del tratamiento</h2>
        <p>
          Cyrrus Consulting Services ("Cyrrus", "nosotros") es responsable del tratamiento de los datos
          personales que se recolectan a través de este sitio web. Para cualquier consulta sobre esta
          política, puede escribirnos a{" "}
          <a href="mailto:contacto@cyrruscs.com">contacto@cyrruscs.com</a>.
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
          Para ejercer estos derechos, escríbanos a{" "}
          <a href="mailto:contacto@cyrruscs.com">contacto@cyrruscs.com</a>.
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
          Si tiene preguntas sobre esta política o el tratamiento de sus datos, escríbanos a{" "}
          <a href="mailto:contacto@cyrruscs.com">contacto@cyrruscs.com</a>.
        </p>
      </section>
    </LegalPage>
  );
}
