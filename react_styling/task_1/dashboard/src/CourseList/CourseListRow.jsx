function CourseListRow({
  isHeader = false,
  textFirstCell = "",
  textSecondCell = null,
}) {

  const cellTdColor = "border border-gray-400 pl-[8px]";
  const cellThColor = "border border-gray-400";

  if (isHeader === true) {
    if (textSecondCell === null) {
      return (
        <tr className="bg-[rgba(222,181,181,0.66)]">
          <th colSpan={2} className={cellThColor}>{textFirstCell}</th>
        </tr>
      );
    }
    return (
      <tr className="bg-[rgba(222,181,181,0.66)]">
        <th className={cellThColor}>{textFirstCell}</th>
        <th className={cellThColor}>{textSecondCell}</th>
      </tr>
    );
  }
  return (
    <tr className="bg-[rgba(205,205,205,0.45)]">
      <td className={cellTdColor}>{textFirstCell}</td>
      <td className={cellTdColor}>{textSecondCell}</td>
    </tr>
  );
}

export default CourseListRow;
