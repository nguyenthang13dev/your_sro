"use client";
import { qlPages_BannerType } from "@/interface/QLPages_Banner/QLPages_Banner";
import { tableApiResponseCallDataType } from "@/interface/QLPages_Content/QLPages_Content";
import { qLPages_Content } from "@/services/QLPages_Content/QLPages_Content.service";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { Swiper } from "swiper";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  EffectFlip,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/effect-cube";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-flip";
import { ResponsePageList } from "@/interface/general";
import {
  tableTableDataContentDataType,
  tableTableHeaderColumnDataType,
} from "@/interface/QLPage/qLPage";
import { toast } from "react-toastify";
import { Modal } from "antd";
import { tableApi_Responsepro } from "@/interface/QLPage_Api/QLPage_Api";
import { createRoot } from "react-dom/client";
import FAQDropdownComponent from "./Components/FAQDropdownComponent";

const HomeComponent = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [dsBanner, setDsBanner] = useState<qlPages_BannerType[]>([]);
  const [html, setHtmlCode] = useState<string>("");
  const [css, setCssCode] = useState<string>("");
  const params = useParams();
  const slug = params.slug ? params.slug.toString() : "trang-chu";
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [strSlug, setStrSlug] = useState<string>("");
  const [showFormPhanAnh, setShowFormPhanAnh] = useState(false);

  const [lstApi, setListApi] = useState<tableApiResponseCallDataType[]>([]);
  const [model, setShowModel] = useState<any>();
  const [isShow, setIsShowModal] = useState<boolean>(false);
  const [tableHeader, setTableheader] = useState<
    tableTableHeaderColumnDataType[]
  >([]);

  const handleGetData = async () => {
    const response = await qLPages_Content.GetContentPageBySlug(slug);
    if (response.status) {
      setHtmlCode(response.data?.page?.html);
      setCssCode(response.data?.page?.style);
      setListApi(response.data?.lstApis);
    }
  };

  const handleGetDataPage = async (
    page: number,
    pageSize: number,
    idElement: string,
    paramsObject?: Record<string, any>
  ) => {
    try {
      const apiCall = lstApi?.find((t) => t.keyElement === idElement);

      const url = apiCall?.api
        ? `${process.env.NEXT_PUBLIC_API_URL}/api${apiCall?.api}`
        : "";

      const method = apiCall?.meThod ?? "POST";

      const params = {
        PageIndex: page,
        PageSize: pageSize,
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
          const dataHeader = data.data?.tableHeaders;

          if (tableData && dataBody) {
            // Xóa tbody cũ
            tableData.innerHTML = "";

            // Render tbody mới
            dataBody.items?.forEach((rowData: any) => {
              const tr = document.createElement("tr");
              dataHeader.forEach((header: any) => {
                const td = document.createElement("td");
                td.textContent = rowData[header.valueCell] || "";
                tr.appendChild(td);
              });
              tableData.appendChild(tr);
            });

            const paginationContainer = document.querySelector(
              `#pagination_container_${idElement}`
            );

            if (paginationContainer) {
              const totalPages = dataBody.totalPage; // Số trang tổng cộng từ API
              const pageSizeEles = pageSize || 10; // Lấy pageSize hiện tại
              const maxVisiblePages = 7; // Số lượng tối đa các trang hiển thị
              paginationContainer.innerHTML = ""; // Xóa pagination cũ

              console.log(totalPages, pageSizeEles, pageIndex);

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
      const key = target.id.replace("search__btn-", "");
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
        const pagiantioncontainer = document.querySelector(
          `#pagination_container_${key}`
        );

        const ele = pagiantioncontainer?.querySelector(
          ".pagination-btn .active"
        );

        handleGetDataPage(1, pageSize, key, searchData);
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

      if (key && page >= 1) {
        const pageSizeEles = contentRef.current.querySelector(
          `#pageSizeSelect_${key}`
        ) as HTMLSelectElement;
        const pageSize = pageSizeEles != null ? Number(pageSizeEles.value) : 10;
        handleGetDataPage(Number(page), pageSize, key);
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

  useEffect(() => {
    handleGetData();
  }, []);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    //swipper
    const swiperElements = contentRef.current.querySelectorAll(".swiper");
    if (swiperElements.length > 0) {
      swiperElements.forEach((swiperEl, index) => {
        const uniqueId = `swiper-${index}`;
        swiperEl.setAttribute("id", uniqueId);
        const swiper = new Swiper(`#${uniqueId}`, {
          modules: [EffectFade, Navigation, Pagination],
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
  }, [html]);

  const handlePrint = (target: HTMLElement, event: MouseEvent) => {
    if (!contentRef.current) {
      return;
    }

    const button = target.parentElement?.closest(".print");
    event.preventDefault();
    if (button) {
      const key = button.getAttribute("data-key");

      if (key) {
        const printContent = contentRef.current.querySelector(
          `#pagination_content_${key}`
        );
        const printWindow = window.open("", "_blank");
        if (printContent) {
          printWindow?.document.write(printContent.innerHTML);
          printWindow?.document.close();
          printWindow?.print();
        }
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

    container.addEventListener("click", handleClick);
    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [html]);

  useEffect(() => {
    const formPlaceholder = document.getElementById("RaSoat");

    if (formPlaceholder) {
      const formWrapper = document.createElement("div");
      formPlaceholder.appendChild(formWrapper);
      import("./Components/RaSoatCompoent").then(
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
      import("./Components/SoHuuTriTueComponent").then(
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
      import("./Components/FAQDropdownComponent").then(
        ({ default: FAQDropdownComponent }) => {
          formWrapper.innerHTML = "";
          const root = createRoot(formWrapper);
          root.render(<FAQDropdownComponent />);
        }
      );
    }
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
        {model ? (
          <table
            className="custom-table-modal"
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
        ) : (
          <p>Không có dữ liệu</p>
        )}
      </Modal>

      <div
        ref={contentRef}
        dangerouslySetInnerHTML={{
          __html: `
            <style>
            ${css}
            </style>
            ${html}
            `,
        }}
      ></div>
    </>
  );
};

export default HomeComponent;
