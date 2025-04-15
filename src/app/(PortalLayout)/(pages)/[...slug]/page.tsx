"use client";
import { qLPages_Content } from "@/services/QLPages_Content/QLPages_Content.service";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-flip";

import Swiper from "swiper";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

import { createRoot } from "react-dom/client";
import { tableApiResponseCallDataType } from "@/interface/QLPages_Content/QLPages_Content";
import { ResponsePageList } from "@/interface/general";
import { tableTableHeaderColumnDataType } from "@/interface/QLPage/qLPage";
import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { PrinterFilled } from "@ant-design/icons";

const HomeComponent = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [showFormPhanAnh, setShowFormPhanAnh] = useState(false);
  const [html, setHtmlCode] = useState<string>("");
  const [css, setCssCode] = useState<string>("");
  const params = useParams();
  const [strSlug, setStrSlug] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(1);
  const slugArray = Array.isArray(params.slug) ? params.slug : [params.slug];
  const lastSlug = slugArray[slugArray.length - 1];
  const [lstApi, setListApi] = useState<tableApiResponseCallDataType[]>([]);
  const [tableHeader, setTableheader] = useState<
    tableTableHeaderColumnDataType[]
  >([]);
  const tableRef = useRef<HTMLTableElement>(null);
  const [isShow, setIsShowModal] = useState<boolean>(false);

  const [model, setShowModel] = useState<any>();

  const handleGetData = async () => {
    const response = await qLPages_Content.GetContentPageBySlug(
      strSlug,
      pageIndex
    );
    if (response.status && response.data?.page) {
      setHtmlCode(response.data.page.html.replace(/\\"/g, "") || "");
      setCssCode(response.data.page.style || "");
      setListApi(response.data?.lstApis);
    }
  };

  const handlePrint = (target: HTMLElement, event: MouseEvent) => {
    if (!contentRef.current) {
      return;
    }
    const button = target.closest(".print");
    event.preventDefault();
    if (button) {
      const key = button.getAttribute("data-key");
      if (key) {
        const printContent = contentRef.current.querySelector(
          `#pagination_content_${key}`
        );

        const printDetail = contentRef.current.querySelector(`.detail-content`);

        if (printContent || printDetail) {
          const printWindow = window.open("", "_blank");

          if (printWindow) {
            printWindow.document.write(`
                            <html>
                                <head>
                                <title>In nội dung</title>
                                <link rel="stylesheet" href="/path/to/your/styles.css"> 
                                <style>
                                    body { font-family: Arial, sans-serif; padding: 20px; }
                                </style>
                                </head>
                                <body>
                                ${
                                  printContent?.innerHTML ||
                                  printDetail?.innerHTML
                                }
                                </body>
                            </html>
                            `);

            printWindow.document.close();

            setTimeout(() => {
              printWindow.print();
              printWindow.close();
            }, 500); // Đợi một chút để đảm bảo nội dung được load hoàn tất
          }
        } else {
          console.warn("Không tìm thấy nội dung để in");
        }
      }
    }
  };

  const handlePrintModal = () => {
    if (tableRef.current) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
              <html>
                <head>
                  <title>In nội dung</title>
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      padding: 20px;
                    }
                    table {
                      width: 100%;
                      border-collapse: collapse;
                      margin: 0 auto;
                    }
                    table, th, td {
                      border: 1px solid #ddd;
                    }
                    th, td {
                      padding: 8px;
                      text-align: left;
                    }
                    tr:nth-child(even) {
                      background-color: #f9f9f9;
                    }
                    tr:hover {
                      background-color: #f1f1f1;
                    }
                    th {
                      background-color: #4CAF50;
                      color: white;
                    }
                  </style>
                </head>
                <body>
                  ${tableRef.current.innerHTML}
                </body>
              </html>
            `);

        printWindow.document.close();

        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500); // Đợi một chút để đảm bảo nội dung được load hoàn tất
      }
    }
  };

  useEffect(() => {
    if (!lastSlug) return;

    if (slugArray.length === 1) {
      setStrSlug(lastSlug);
    } else if (slugArray.length === 2) {
      const isPageParam = lastSlug && /^p\d+$/.test(lastSlug);
      const categorySlug = isPageParam
        ? slugArray.slice(0, -1).join("/")
        : slugArray.join("/");
      setStrSlug(categorySlug);
    }
  }, [params.slug]);

  useEffect(() => {
    if (strSlug !== "") {
      handleGetData();
    }
  }, [strSlug]);

  useEffect(() => {
    if (html != "") {
      if (contentRef.current) {
        const swiperElements = contentRef.current.querySelectorAll(".swiper");
        if (swiperElements.length > 0) {
          swiperElements.forEach((swiperEl, index) => {
            const uniqueId = `swiper-${index}`;
            swiperEl.setAttribute("id", uniqueId);

            new Swiper(`#${uniqueId}`, {
              modules: [EffectFade, Navigation, Pagination, Autoplay],
              slidesPerView: 1,
              spaceBetween: 10,
              loop: true,
              autoplay: {
                delay: 3000,
                disableOnInteraction: false,
              },
              navigation: {
                nextEl: `#${uniqueId} .swiper-button-next`,
                prevEl: `#${uniqueId} .swiper-button-prev`,
              },
              pagination: {
                el: `#${uniqueId} .swiper-pagination`,
                clickable: true,
              },
            });
          });
        }

        const container = contentRef.current;
        const handleClick = (event: MouseEvent) => {
          const target = event.target as HTMLElement;
          if (
            target.classList.value?.includes("print") ||
            target.parentElement?.classList.value?.includes("print")
          ) {
            handlePrint(target, event);
          }
        };

        const formPlaceholder = document.getElementById("PhanAnh");

        if (formPlaceholder) {
          setShowFormPhanAnh(true);
        } else {
          setShowFormPhanAnh(false);
        }

        const searchInput = document.getElementById(
          "searchInput"
        ) as HTMLInputElement;
        if (searchInput) {
          const handleInput = () => {
            const dataKey = searchInput.getAttribute("data-key");
            const newsContainer = document.getElementById(
              `pagination_content_${dataKey}`
            );
            if (!newsContainer) return;
            const newsItems = newsContainer.getElementsByClassName("grid-item");
            searchInput.addEventListener("input", function () {
              const searchText = searchInput.value.toLowerCase();

              for (const item of newsItems) {
                const titleElement = (item as HTMLElement).querySelector(
                  "h2 a"
                );
                const titleText = titleElement
                  ? (titleElement as HTMLElement).innerText.toLowerCase()
                  : "";

                if (titleText.includes(searchText)) {
                  (item as HTMLElement).style.display = "block";
                } else {
                  (item as HTMLElement).style.display = "none";
                }
              }
            });
          };

          searchInput.addEventListener("input", handleInput);
          return () => searchInput.removeEventListener("input", handleInput);
        }

        container.addEventListener("click", handleClick);
        return () => {
          container.removeEventListener("click", handleClick);
        };
      }
    }
  }, [html]);

  useEffect(() => {
    if (!showFormPhanAnh) return;
    const formPlaceholder = document.getElementById("PhanAnh");
    if (formPlaceholder && !formPlaceholder.hasChildNodes()) {
      const formWrapper = document.createElement("div");
      formPlaceholder.appendChild(formWrapper);

      import("../PhanAnh/page").then(({ default: PhanAnhComponent }) => {
        formWrapper.innerHTML = "";
        const root = createRoot(formWrapper);
        root.render(<PhanAnhComponent />);
      });
    }
  }, [showFormPhanAnh]);

  useEffect(() => {
    const formPlaceholder = document.getElementById("RaSoat");

    if (formPlaceholder) {
      const formWrapper = document.createElement("div");
      formPlaceholder.appendChild(formWrapper);
      import("../../Components/RaSoatCompoent").then(
        ({ default: RaSoatCompoent }) => {
          formWrapper.innerHTML = "";
          const root = createRoot(formWrapper);
          root.render(<RaSoatCompoent />);
        }
      );
    }
  }, [html]);

  useEffect(() => {
    const formPlaceholder = document.getElementById("SoHuu");
    if (formPlaceholder) {
      const formWrapper = document.createElement("div");
      formPlaceholder.appendChild(formWrapper);
      import("../../Components/SoHuuTriTueComponent").then(
        ({ default: SoHuuTriTueComponent }) => {
          formWrapper.innerHTML = "";
          const root = createRoot(formWrapper);
          root.render(<SoHuuTriTueComponent />);
        }
      );
    }
  }, [html]);

  useEffect(() => {
    const formPlaceholder = document.getElementById("CauHoiThuongGap");

    if (formPlaceholder) {
      const formWrapper = document.createElement("div");
      formPlaceholder.appendChild(formWrapper);
      import("../../Components/FAQDropdownComponent").then(
        ({ default: FAQDropdownComponent }) => {
          formWrapper.innerHTML = "";
          const root = createRoot(formWrapper);
          root.render(<FAQDropdownComponent />);
        }
      );
    }
  }, [html]);

  //Author: TechNguyen
  const handleGetDataByPage = async (
    page: number,
    pageSize: number,
    idElement: string,
    type: string,
    paramsObject?: Record<string, any>
  ) => {
    try {
      const apiCall = lstApi?.find((t) => t.keyElement === idElement);
      if (lstApi.length > 0 && type != "CATEGORY") {
        const url = apiCall?.api
          ? `${process.env.NEXT_PUBLIC_API_URL}/api${apiCall?.api}`
          : "";

        const method = apiCall?.meThod ?? "POST";

        const params = {
          PageIndex: page,
          PageSize: pageSize,
          IdTable: idElement,
        };

        if (paramsObject) {
          Object.keys(paramsObject).forEach((key) => {
            (params as any)[key] = paramsObject[key];
          });
        }

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: method === "GET" ? null : JSON.stringify(params),
        });

        if (!response.ok) {
          throw new Error(
            `Request failed: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        if (data.status) {
          const tableCur = contentRef.current?.querySelector(
            `.table-${idElement}`
          ) as HTMLElement;
          if (tableCur != null) {
            const tableData = tableCur.querySelector("tbody");
            const dataBody = data?.data?.bodyRow?.dataBody as ResponsePageList;
            if (tableData && dataBody) {
              // Xóa tbody cũ
              tableData.innerHTML = "";

              tableData.innerHTML = data?.data?.htmlTable;

              const paginationContainer = document.querySelector(
                `#pagination_container_${idElement}`
              );

              if (paginationContainer) {
                const totalPages = dataBody.totalPage; // Số trang tổng cộng từ API
                const pageSizeEles = pageSize || 10; // Lấy pageSize hiện tại
                const maxVisiblePages = 7; // Số lượng tối đa các trang hiển thị
                paginationContainer.innerHTML = ""; // Xóa pagination cũ

                const createPageButton = (pageNumber: number) => {
                  const pageButton = document.createElement("button");
                  pageButton.classList.add("pagination-btn");
                  if (pageNumber === page) {
                    pageButton.classList.add("active");
                  }
                  pageButton.setAttribute("data-key", idElement);
                  pageButton.setAttribute("data-page", pageNumber.toString());
                  pageButton.textContent = pageNumber.toString();
                  paginationContainer.appendChild(pageButton);
                };

                // Hiển thị nút "Trang trước"
                if (pageIndex > 1) {
                  const prevButton = document.createElement("button");
                  prevButton.classList.add("pagination-btn");
                  prevButton.textContent = "«";
                  prevButton.setAttribute(
                    "data-page",
                    (pageIndex - 1).toString()
                  );
                  paginationContainer.appendChild(prevButton);
                }

                if (totalPages <= maxVisiblePages) {
                  // Nếu số trang ít, hiển thị hết
                  for (let i = 1; i <= totalPages; i++) {
                    createPageButton(i);
                  }
                } else {
                  // Luôn hiển thị trang đầu tiên
                  createPageButton(1);

                  if (pageIndex > 4) {
                    // Nếu trang hiện tại cách xa trang đầu, hiển thị "..."
                    const dots = document.createElement("span");
                    dots.textContent = "...";
                    paginationContainer.appendChild(dots);
                  }

                  // Hiển thị 2 trang trước, trang hiện tại và 2 trang sau
                  for (
                    let i = Math.max(2, pageIndex - 2);
                    i <= Math.min(totalPages - 1, pageIndex + 2);
                    i++
                  ) {
                    createPageButton(i);
                  }

                  if (pageIndex < totalPages - 3) {
                    // Nếu trang hiện tại cách xa trang cuối, hiển thị "..."
                    const dots = document.createElement("span");
                    dots.textContent = "...";
                    paginationContainer.appendChild(dots);
                  }

                  // Luôn hiển thị trang cuối cùng
                  createPageButton(totalPages);
                }

                // Hiển thị nút "Trang sau"
                if (pageIndex < totalPages) {
                  const nextButton = document.createElement("button");
                  nextButton.classList.add("pagination-btn");
                  nextButton.textContent = "»";
                  nextButton.setAttribute(
                    "data-page",
                    (pageIndex + 1).toString()
                  );
                  paginationContainer.appendChild(nextButton);
                }
              }
            }
          }
        }
      } else {
        const response = await qLPages_Content.GetContentPageCategory(
          strSlug,
          idElement,
          page
        );
        if (response.status) {
          const container = document.querySelector(
            `#pagination_content_${idElement}`
          );

          if (container) {
            container.innerHTML = response.data;
          }
        }
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  //logic xử lý chi tiết nội dung
  const handleXemChiTietNoiDung = async (
    target: HTMLElement,
    event: MouseEvent
  ) => {
    try {
      const dataId = target.getAttribute("data-key");
      const element = target.className.replace("view-detail_", "");

      const apiCall = lstApi?.find((x) => x.keyElement == element.toString());

      const url = apiCall?.api
        ? `${process.env.NEXT_PUBLIC_API_URL}/api${apiCall?.api}`
        : "";

      const method = apiCall?.meThod ?? "POST";
      const params = {
        id: dataId,
      };
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method === "GET" ? null : JSON.stringify(params),
      });
      if (!response.ok) {
        throw new Error(
          `Request failed: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      if (data.status) {
        const dataBody = data?.data?.bodyRow?.dataBody as ResponsePageList;

        const dataHeader: tableTableHeaderColumnDataType[] =
          data.data?.tableHeaders;
        setTableheader(dataHeader);
        if (dataBody.items) {
          setShowModel(dataBody.items[0]);
          setIsShowModal(true);
        }
      }
    } catch (err) {
      toast.error("Có lỗi trong quá trình xảy ra");
    }
  };

  //logic xử lý
  const handleLogicButton = (target: HTMLElement, event: MouseEvent) => {
    if (target) {
      const key = target.getAttribute("data-key") || "";
      const type = target.getAttribute("data-type") || "";
      //lấy danh sách input;
      if (contentRef.current) {
        const searchContainer = document.querySelector(`.search-class__${key}`);

        if (!searchContainer) return;
        const searchInputs = searchContainer.querySelectorAll("input");
        const searchData: Record<string, any> = {};

        searchInputs.forEach((input) => {
          const inputsElemenet = input as HTMLInputElement;
          searchData[inputsElemenet.id.replace("search_", "")] =
            inputsElemenet.value;
        });

        const pageSizeEles = contentRef.current.querySelector(
          `#pageSizeSelect_${key}`
        ) as HTMLSelectElement;
        const pageSize = pageSizeEles != null ? Number(pageSizeEles.value) : 10;
        handleGetDataByPage(1, pageSize, key, type, searchData);
      }
    }
  };

  //logic xử lý pagination
  const handlePagiantion = (target: HTMLElement, event: MouseEvent) => {
    if (!contentRef.current) {
      return;
    }
    const button = target.closest(".pagination-btn");
    event.preventDefault();
    if (button) {
      const key = button.getAttribute("data-key");
      const page = Number(button.getAttribute("data-page")) || 1;
      const type = button.getAttribute("data-type") || "";

      if (key && page >= 1) {
        const pageSizeEles = contentRef.current.querySelector(
          `#pageSizeSelect_${key}`
        ) as HTMLSelectElement;
        const pageSize = pageSizeEles != null ? Number(pageSizeEles.value) : 10;
        handleGetDataByPage(Number(page), pageSize, key, type);
        const container = document.querySelector(
          `#pagination_container_${key}`
        );
        if (container) {
          container.querySelectorAll(".pagination-btn").forEach((btn) => {
            btn.classList.remove("active");
          });
          button.classList.add("active");
        }
      }
    }
  };

  const handleChangeRowInTable = (target: HTMLElement) => {
    if (target) {
      const key = target.getAttribute("data-key") || "";
      const type = target.getAttribute("data-type") || "";
      //lấy danh sách input;
      if (contentRef.current) {
        const searchContainer = document.querySelector(`.search-class__${key}`);

        if (!searchContainer) return;
        const searchInputs = searchContainer.querySelectorAll("input");
        const searchData: Record<string, any> = {};

        searchInputs.forEach((input) => {
          const inputsElemenet = input as HTMLInputElement;
          searchData[inputsElemenet.id.replace("search_", "")] =
            inputsElemenet.value;
        });

        const pageSizeEles = contentRef.current.querySelector(
          `#pageSizeSelect_${key}`
        ) as HTMLSelectElement;
        const pageSize = pageSizeEles != null ? Number(pageSizeEles.value) : 10;
        handleGetDataByPage(1, pageSize, key, type, searchData);
      }
    }
  };

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // if (target.tagName === "A") return;
      //phân trang
      if (target.classList.value?.includes("pagination-btn")) {
        handlePagiantion(target, event);
      }
      //tìm kiếm
      if (target.classList.value?.includes("search-btn")) {
        handleLogicButton(target, event);
      }

      if (target.classList.value.includes("view-detail_")) {
        //xem chi tiết
        handleXemChiTietNoiDung(target, event);
      }

      if (target.parentElement?.classList.value?.includes("print")) {
        handlePrint(target, event);
      }
    };

    const handleChange = (event: Event) => {
      const target = event.target as HTMLSelectElement;
      if (target?.classList.value?.includes("page-size-select")) {
        handleChangeRowInTable(target);
      }
    };

    container.addEventListener("click", handleClick);
    container.addEventListener("change", handleChange);
    return () => {
      container.removeEventListener("click", handleClick);
      container.removeEventListener("change", handleChange);
    };
  }, [html]);

  return (
    <>
      <Modal
        open={isShow}
        title="Xem Chi Tiết"
        onCancel={() => {
          setIsShowModal(false);
        }}
        footer={null}
      >
        <Button
          type="primary"
          size="small"
          onClick={handlePrintModal}
          className="my-3"
          style={{ marginLeft: "auto", display: "block", marginBottom: "10px" }}
        >
          <PrinterFilled /> In
        </Button>

        {model ? (
          <div ref={tableRef}>
            <table
              className="custom-table-modal print"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <tbody>
                {tableHeader?.map((header) => (
                  <tr key={header.valueCell}>
                    <td>{header.label}</td>

                    <td>
                      {model[
                        header?.valueCell[0]?.toLowerCase() +
                          header.valueCell.substring(1)
                      ] ?? ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </Modal>

      {html ? (
        <>
          <div
            ref={contentRef}
            dangerouslySetInnerHTML={{
              __html: `<style>${css}</style>${html}`,
            }}
          ></div>
        </>
      ) : (
        // <Error />
        <></>
      )}
    </>
  );
};
export default HomeComponent;
