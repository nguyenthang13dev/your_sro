import Image from "next/image"

export function UpcomingEvents() {
  const events = [
    {
      date: "04/20",
      time: "20:00",
      name: "Field Game Master",
      icon: "/images/event-icon-1.png",
    },
    {
      date: "04/21",
      time: "19:00",
      name: "Double EXP",
      icon: "/images/event-icon-2.png",
    },
    {
      date: "04/22",
      time: "18:00",
      name: "GK Event",
      icon: "/images/event-icon-3.png",
    },
    {
      date: "04/23",
      time: "21:00",
      name: "PvP Event",
      icon: "/images/event-icon-4.png",
    },
  ]

  return (
    <div className="game-panel">
      <div className="game-panel-header">
        <h2 className="text-center text-amber-300 font-bold text-lg">UPCOMING EVENTS</h2>
      </div>
      <div className="game-panel-content p-2">
        <div className="space-y-2">
          {events.map((event, index) => (
            <div key={index} className="flex items-center gap-2 py-1">
              <div className="flex flex-col items-center w-14 text-xs">
                <span className="text-amber-500">{event.date}</span>
                <span className="text-amber-300">{event.time}</span>
              </div>
              <div className="flex-1 text-amber-200 text-sm">{event.name}</div>
              <div className="w-8 h-8">
                <Image
                  src={event.icon || "/placeholder.svg"}
                  alt={event.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center text-amber-500 text-xs mt-4">More events coming soon!</div>
        <div className="mt-2 flex justify-center">
          <button className="text-amber-300 text-sm border border-amber-900 bg-black/50 px-4 py-1 hover:bg-amber-900/30 transition-colors">
            ARCHIVE
          </button>
        </div>
      </div>
    </div>
  )
}
