export default function ImageQualityDisclaimer() {
  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-start gap-3">
        <svg
          className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div className="flex-1">
          <p className="text-sm text-blue-900">
            <strong className="font-semibold">Note sur la qualité d'affichage :</strong> Les images peuvent paraître pixélisées à l'écran. 
            Ceci est lié au zoom effectué pour l'affichage sur le site internet. Les images originales conservent leur qualité professionnelle maximale.
          </p>
        </div>
      </div>
    </div>
  )
}


