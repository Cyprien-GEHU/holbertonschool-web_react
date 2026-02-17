function CourseListRow({
  isHeader = false,
  textFirstCell = "",
  textSecondCell = null,
}) {
  const bgColor = isHeader
    ? "bg-[var(--color-table-header)] bg-opacity-[66%]"
    : "bg-[var(--color-table-rows)] bg-opacity-[45%]";

  const cellTdColor = "border border-gray-400 pl-[8px]";
  const cellThColor = "border border-gray-400";

  if (isHeader === true) {
    if (textSecondCell === null) {
      return (
        <tr className={bgColor}>
          <th colSpan={2} className={cellThColor}>{textFirstCell}</th>
        </tr>
      );
    }
    return (
      <tr className={bgColor}>
        <th className={cellThColor}>{textFirstCell}</th>
        <th className={cellThColor}>{textSecondCell}</th>
      </tr>
    );
  }
  return (
    <tr className={bgColor}>
      <td className="border border-gray-400 pl-[8px]">{textFirstCell}</td>
      <td className="border border-gray-400 pl-[8px]">{textSecondCell}</td>
    </tr>
  );
}

export default CourseListRow;
