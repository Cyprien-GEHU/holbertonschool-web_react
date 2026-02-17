function CourseListRow({
  isHeader = false,
  textFirstCell = "",
  textSecondCell = null,
}) {
  const bgColor = isHeader
    ? "bg-[var(--color-table-header)] opacity-66"
    : "bg-[var(--color-table-rows)] opacity-45";

  const cellColor = "border border-gray-400 pl-2";

  if (isHeader === true) {
    if (textSecondCell === null) {
      return (
        <tr className={bgColor}>
          <th colSpan={2} className={cellColor}>{textFirstCell}</th>
        </tr>
      );
    }
    return (
      <tr className={bgColor}>
        <th className={cellColor}>{textFirstCell}</th>
        <th className={cellColor}>{textSecondCell}</th>
      </tr>
    );
  }
  return (
    <tr className={bgColor}>
      <td className={cellColor}>{textFirstCell}</td>
      <td className={cellColor}>{textSecondCell}</td>
    </tr>
  );
}

export default CourseListRow;
