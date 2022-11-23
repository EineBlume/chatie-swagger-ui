export default function(taggedOps, phrase) {
  let filteredTaggedOps = taggedOps.map(
    (tagObj, tag) => {
      let operations = tagObj.get("operations")
      let isTaggedOpsFiltered = false
      const isTagFiltered = tag.includes(phrase)

      const filteredOperations = operations.map(operation => {
        let operation_detail = operation.get("operation")

        const isPathFiltered = operation.get("path").includes(phrase)
        const isIdFiltered = operation.get("id").includes(phrase)
        const isOperationIdFiltered = operation_detail.get("operationId").includes(phrase)

        let isOperationFiltered = (
          isPathFiltered || isIdFiltered || isOperationIdFiltered
        )

        isTaggedOpsFiltered ||= isOperationFiltered

        return isOperationFiltered ? operation : null
      }).filter(operation => operation !== null)


      tagObj = tagObj.set("operations", filteredOperations)

      return (isTaggedOpsFiltered || isTagFiltered) ? tagObj : null
    }
  )

  filteredTaggedOps = filteredTaggedOps.filter(tagObj => tagObj !== null)

  return filteredTaggedOps
}
