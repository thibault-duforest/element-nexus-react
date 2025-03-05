const ContentHeader = ({ title }: { title: string }) => {
  return (
    <header className="mb-6">
      <h2 className="text-4xl">{title}</h2>
    </header>
  )
}

export default ContentHeader
