export default function(taggedOps, phrase) {
  return taggedOps.filter(
    (tagObj, tag) => {
      const operations = tagObj.get("operations")
      let is_tag_operation_filtered = false
      const is_tag_filtered = tag.includes(phrase.toLowerCase())

      operations.filter(operation => {
        let operation_detail = operation.get("operation")

        const is_path_filtered = operation.get("path").toLowerCase().includes(phrase.toLowerCase())
        const is_id_filtered = operation.get("id").toLowerCase().includes(phrase.toLowerCase())
        const is_summary_filtered = operation_detail.get("summary").toLowerCase().includes(phrase.toLowerCase())
        const is_operationId_filtered = operation_detail.get("operationId").toLowerCase().includes(phrase.toLowerCase())

        let is_operation_filtered = (
          is_path_filtered || is_id_filtered || is_summary_filtered || is_operationId_filtered
        )

        is_tag_operation_filtered ||= is_operation_filtered

        return is_operation_filtered
      })

      return is_tag_operation_filtered || is_tag_filtered
    }

  )
}
