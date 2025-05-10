const FormatVND = (value: string| number): string => {
  if (value === null || value === undefined) {
    return "0";
  }
    const num = typeof value === "string" ? parseInt(value, 10) : value;

  return num.toLocaleString("vi-VN");
}

export
{
  FormatVND
};

