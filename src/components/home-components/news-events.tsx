import Image from "next/image"
import Link from "next/link"

export function NewsEvents() {
  const newsItems = [
    {
      id: 1,
      title: "New Server Opening Soon",
      image: "/images/news-1.png",
      date: "2023-04-15",
    },
    {
      id: 2,
      title: "Spring Festival Event",
      image: "/images/news-1.png",
      date: "2023-04-10",
    },
    {
      id: 3,
      title: "New Weapon Update",
      image: "/images/news-1.png",
      date: "2023-04-05",
    },
  ]

  return (
    <div className="game-panel">
      <div className="game-panel-header">
        <h2 className="text-center text-amber-300 font-bold text-lg">TIN TỨC & SỰ KIỆN</h2>
      </div>
      <div className="game-panel-content p-4">
        <div className="space-y-6">
          {newsItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="w-24 h-24 flex-shrink-0">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover border border-amber-900"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-amber-200 font-medium mb-2">{item.title}</h3>
                <p className="text-amber-100/70 text-sm mb-2">{new Date(item.date).toLocaleDateString()}</p>
                <Link href={`/news/${item.id}`} className="relative game-button inline-block">
                  <Image src="/images/small-button.png" alt="Read more" width={80} height={25} />
                  <span className="absolute inset-0 flex items-center justify-center text-amber-300 text-xs font-medium">
                    XEM TIẾP
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
