export default function(taggedOps, phrase) {
  return taggedOps.filter(
    (tagObj, tag) => {
      const operations = tagObj.get("operations")
      let isTaggedOpsFiltered = false
      const isTagFiltered = tag.includes(phrase.toLowerCase())

      operations.filter(operation => {
        let operation_detail = operation.get("operation")

        console.log(operation_detail)

        const isPathFiltered = operation.get("path").toLowerCase().includes(phrase.toLowerCase())
        const isIdFiltered = operation.get("id").toLowerCase().includes(phrase.toLowerCase())
        const isOperationIdFiltered = operation_detail.get("operationId").toLowerCase().includes(phrase.toLowerCase())

        let isOperationFiltered = (
          isPathFiltered || isIdFiltered || isOperationIdFiltered
        )

        isTaggedOpsFiltered ||= isOperationFiltered

        return isOperationFiltered
      })

      return isTaggedOpsFiltered || isTagFiltered
    }
  )
}
