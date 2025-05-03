const FormatVND = (value: string| number): string => {
  if (value === null || value === undefined) {
    return "0 VND";
  }
    const num = typeof value === "string" ? parseInt(value, 10) : value;

  return num.toLocaleString("vi-VN") + " VND";
}

export
{
    FormatVND
};

