export function ServerStatus() {
    const servers = [
      { name: "Server 1", status: "Operational", online: true },
      { name: "Login", status: "Online", online: true },
      { name: "Character", status: "All online", online: true },
      { name: "Statistics", status: "", online: false },
      { name: "Players Online", status: "1,234", online: true },
      { name: "Accounts Created", status: "45,678", online: true },
      { name: "Characters Created", status: "78,901", online: true },
      { name: "Guild Registered", status: "2,345", online: true },
    ]
  
    return (
      <div className="game-panel">
        <div className="game-panel-header">
          <h2 className="text-center text-amber-300 font-bold text-lg">THÔNG TIN MÁY CHỦ</h2>
        </div>
        <div className="game-panel-content p-2">
          <ul className="space-y-1">
            {servers.map((server, index) => (
              <li
                key={index}
                className="flex justify-between items-center py-1 px-2 border-b border-amber-900/30 last:border-0"
              >
                <span className="text-amber-200 text-sm">{server.name}</span>
                <span className={`text-sm ${server.online ? "text-green-500" : "text-gray-400"}`}>{server.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  