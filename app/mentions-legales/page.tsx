import { Metadata } from 'next'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Mentions légales',
  robots: {
    index: false,
  },
}

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero title="Mentions légales" />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2>Informations légales</h2>
            
            <h3>Éditeur du site</h3>
            <p>
              <strong>Melody Floc'h</strong><br />
              Photographe professionnelle<br />
              Email : contact@melodyfloch.fr
            </p>

            <h3>Hébergement</h3>
            <p>
              Ce site est hébergé par Vercel Inc.<br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789<br />
              États-Unis
            </p>

            <h3>Propriété intellectuelle</h3>
            <p>
              L'ensemble des contenus présents sur ce site (textes, photographies, illustrations, 
              logos) sont la propriété exclusive de Melody Floc'h et sont protégés par le 
              Code de la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication ou adaptation de tout 
              ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est 
              interdite, sauf autorisation écrite préalable.
            </p>

            <h3>Données personnelles</h3>
            <p>
              Les informations recueillies via les formulaires du site sont destinées uniquement 
              à Melody Floc'h pour le traitement de vos demandes de contact ou de réservation.
            </p>
            <p>
              Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit 
              d'accès, de rectification et de suppression des données vous concernant en nous 
              contactant par email.
            </p>

            <h3>Cookies</h3>
            <p>
              Ce site utilise des cookies uniquement pour le fonctionnement de l'interface 
              d'administration (authentification). Aucun cookie de tracking ou publicitaire 
              n'est utilisé.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

