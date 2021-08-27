// Dependencies
import Image from 'next/image'

export const SocialMediaMenu = () => {
  return (
    <nav className="menu menu__icons">
      <a aria-label="button" href="#">
        <Image alt="Search" height="24" src="/search.svg" width="24" />
      </a>
      <a aria-label="button" href="#">
        <Image
          alt="Shopping Cart"
          height="24"
          src="/shopping-cart.svg"
          width="24"
        />
      </a>
    </nav>
  )
}

export default SocialMediaMenu
