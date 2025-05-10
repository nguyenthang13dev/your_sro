"use client"

import { useSelector } from "@/store/hooks"
import { CalendarOutlined, TagOutlined } from "@ant-design/icons"
import { Card, ConfigProvider, Divider, Tag, theme, Typography } from "antd"
import dayjs from "dayjs"

const { Title, Text, Paragraph } = Typography

const DetailTinTuc = () =>
{
  

  const news = useSelector( state => state.currentNews.news );
  // Custom theme for Ant Design
  const customTheme = {
    token: {
      colorPrimary: "#ca8a04", // yellow-600
      colorBgContainer: "rgba(0, 0, 0, 0.6)",
      colorBorder: "#ca8a04", // yellow-600
      borderRadius: 8,
    },
    components: {
      Card: {
        colorBorderSecondary: "#92400e", // yellow-800
      },
      Button: {
        colorPrimary: "#b45309", // yellow-700
        colorPrimaryHover: "#a16207", // yellow-600
      },
    },
  }

  // Map news type to a more readable format and tag color
  const getNewsTypeInfo = (type?: string) => {
    switch (type) {
      case "news":
        return { label: "Tin tức", color: "blue" }
      case "event":
        return { label: "Sự kiện", color: "green" }
      case "notification":
        return { label: "Thông báo mới", color: "red" }
      case "lawplay":
      return { label: "Luật chơi", color: "orange" }
      case "updateroad":
        return { label: "Lịch trình update", color: "purple" }
      case "jobselect":
        return { label: "Lựa job", color: "purple" }
      default:
        return { label: "Không xác định", color: "default" }
    }
  }

  const typeInfo = getNewsTypeInfo(news?.type)

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        ...customTheme,
      }}
    >
      <Card
        bordered
        style={{
          background: "rgba(0, 0, 0, 0.6)",
          borderColor: "#ca8a04",
          borderWidth: 2,
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Title level={4} style={{ color: "#fcd34d", margin: 0 }}>
            {news?.title || "Chi tiết tin tức"}
          </Title>
        </div>

        <div style={{ marginBottom: 12 }}>
          {news?.type && (
            <Tag color={typeInfo.color} icon={<TagOutlined />} style={{ marginRight: 8 }}>
              {typeInfo.label}
            </Tag>
          )}

          {news?.publishDate && (
            <Tag icon={<CalendarOutlined />} color="gold">
              {dayjs(news.publishDate).format("DD/MM/YYYY")}
            </Tag>
          )}
        </div>

        <Divider style={{ borderColor: "#92400e", margin: "12px 0" }} />

        <div style={{ color: "#fef08a", fontSize: 14, lineHeight: 1.5 }}>
          {news?.content ? (
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: news.content }}
              style={{
                padding: 0,
                color: "#f8fafc", // slate-50
                fontSize: "1rem",
              }}
            />
          ) : (
            <Text style={{ color: "#fef08a" }}>Không có nội dung</Text>
          )}
        </div>
      </Card>

      {/* Add the following styles to properly render Quill content */}
      <style jsx global>{`
        .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6 {
          color: #fcd34d;
          margin-top: 1em;
          margin-bottom: 0.5em;
        }
        .ql-editor h1 { font-size: 1.75em; }
        .ql-editor h2 { font-size: 1.5em; }
        .ql-editor h3 { font-size: 1.25em; }
        .ql-editor p {
          margin-bottom: 1em;
        }
        .ql-editor ul, .ql-editor ol {
          padding-left: 2em;
          margin-bottom: 1em;
        }
        .ql-editor li {
          margin-bottom: 0.5em;
        }
        .ql-editor a {
          color: #38bdf8;
          text-decoration: underline;
        }
        .ql-editor img {
          max-width: 100%;
          height: auto;
          margin: 1em 0;
          border-radius: 4px;
        }
        .ql-editor blockquote {
          border-left: 4px solid #ca8a04;
          padding-left: 1em;
          margin-left: 0;
          margin-right: 0;
          font-style: italic;
          color: #cbd5e1;
        }
        .ql-editor pre {
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
          padding: 1em;
          overflow-x: auto;
        }
        .ql-editor code {
          background-color: rgba(0, 0, 0, 0.3);
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-family: monospace;
        }
      `}</style>
    </ConfigProvider>
  )
}

export default DetailTinTuc
