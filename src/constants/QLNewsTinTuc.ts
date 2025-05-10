const newsTypeMap: Record<string, string> = {
  news: "Tin tức",
  event: "Sự kiện",
  all: "Tất cả",
  notification: "Thông báo mới",
};
const objectFixNews = Object.freeze( {
  serverinfor: "serverinfor",
  lawplay: "lawplay",
  updateroad: "updateroad",
  jobselect: "jobselect"
})

export
{
  newsTypeMap,
  objectFixNews
};

