
const FeatureCard = ({title, body, children} : {title: string, body: string, children: React.ReactNode}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-[400px] gap-3">
      {children}
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-base">{body}</p>
    </div>
  )
}

export default FeatureCard