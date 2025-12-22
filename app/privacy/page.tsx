import { Metadata } from 'next'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  robots: {
    index: false,
  },
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Politique de confidentialité" />

      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2>Protection de vos données personnelles</h2>
            
            <h3>Collecte des données</h3>
            <p>
              Melody Floc'h collecte vos données personnelles uniquement lorsque vous :
            </p>
            <ul>
              <li>Remplissez le formulaire de contact</li>
              <li>Réservez une séance photo en ligne</li>
            </ul>

            <h3>Données collectées</h3>
            <p>
              Les données personnelles que nous collectons peuvent inclure :
            </p>
            <ul>
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone (optionnel)</li>
              <li>Message ou commentaires</li>
            </ul>

            <h3>Utilisation des données</h3>
            <p>
              Vos données sont utilisées exclusivement pour :
            </p>
            <ul>
              <li>Répondre à vos demandes de contact</li>
              <li>Gérer vos réservations de séances photo</li>
              <li>Vous envoyer des confirmations par email</li>
            </ul>
            <p>
              Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers, 
              sauf obligation légale.
            </p>

            <h3>Conservation des données</h3>
            <p>
              Vos données personnelles sont conservées pendant la durée nécessaire aux finalités 
              pour lesquelles elles ont été collectées, puis supprimées ou anonymisées.
            </p>

            <h3>Sécurité</h3>
            <p>
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données 
              personnelles contre tout accès, modification, divulgation ou destruction non autorisés.
            </p>

            <h3>Vos droits</h3>
            <p>
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <ul>
              <li>Droit d'accès à vos données</li>
              <li>Droit de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité</li>
              <li>Droit d'opposition</li>
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à l'adresse : contact@melodyfloch.fr
            </p>

            <h3>Modifications</h3>
            <p>
              Cette politique de confidentialité peut être modifiée à tout moment. 
              La version actualisée sera toujours disponible sur cette page.
            </p>

            <p className="text-sm text-gray-600 mt-8">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

