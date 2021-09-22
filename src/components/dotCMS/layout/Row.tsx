export const Row: React.FC = ({ children }): JSX.Element => {
  return (
    <section className="container grid grid-cols-12 gap-2 my-2">
      {children}
    </section>
  )
}

export default Row
