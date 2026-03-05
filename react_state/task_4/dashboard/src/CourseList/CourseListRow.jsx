function CourseListRow({
    isHeader= false, 
    textFirstCell = "",
    textSecondCell = null
}) {
    const headerColor = "bg-[var(--color-table-header)]/[0.66]"
    const rowColor = "bg-[var(--color-table-rows)]/[0.45]"
    const headerBorder = "border border-gray-400"
    const cellBorder = "border border-gray-400 pl-2"
    if (isHeader) {
        if (textSecondCell === null) {
            return (
                <tr className={headerColor}>
                    <th className={headerBorder} colSpan="2">
                        {textFirstCell}
                    </th>
                </tr>
            )
        }
        return (
            <tr className={headerColor}>
                <th className={headerBorder}>
                    {textFirstCell}
                </th>
                <th className={headerBorder}>
                    {textSecondCell}
                </th>
            </tr>
        )
    }
    return (
        <tr className={rowColor}>
            <td className={cellBorder}>
                {textFirstCell}
            </td>
            <td className={cellBorder}>
                {textSecondCell}
            </td>
        </tr>
    )
}

export default CourseListRow