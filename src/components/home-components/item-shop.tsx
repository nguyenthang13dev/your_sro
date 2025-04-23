import Image from "next/image"
import Link from "next/link"

export function ItemShop() {
  return (
    <Link href="/item-shop" className="block">
      <div className="relative">
        <Image src="/images/item-shop-banner.png" alt="Item Shop" width={300} height={80} className="w-full" />
        <div className="absolute inset-0 flex items-center px-4">
          <div className="w-12 h-12 mr-2">
            <Image
              src="/images/coin-icon.png"
              alt="Coins"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-amber-300 font-bold text-lg">ITEMSHOP</h3>
            <p className="text-amber-100 text-xs">Purchase premium items</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
