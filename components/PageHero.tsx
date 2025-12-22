interface PageHeroProps {
  title: string
  description?: string
  backgroundImage?: string
}

export default function PageHero({ title, description, backgroundImage }: PageHeroProps) {
  return (
    <section
      className={`relative pt-32 pb-20 ${
        backgroundImage ? 'text-white' : 'bg-primary-50'
      }`}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      <div className="container-custom">
        <div className="max-w-3xl">
          <h1 className="heading-xl mb-6 animate-fade-in">{title}</h1>
          {description && (
            <p className="text-lg md:text-xl opacity-90 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

