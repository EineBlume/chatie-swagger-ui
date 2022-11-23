export default function(taggedOps, phrase) {
  let filteredTaggedOps = taggedOps.map(
    (tagObj, tag) => {
      let operations = tagObj.get("operations")
      let isTaggedOpsFiltered = false
      const isTagFiltered = tag.indexOf(phrase) !== -1

      const filteredOperations = operations.map(operation => {
        let operation_detail = operation.get("operation")

        const isPathFiltered = operation.get("path").indexOf(phrase) !== -1
        const isIdFiltered = operation.get("id").indexOf(phrase) !== -1

        let operationId = operation_detail.get("operationId")

        if (operationId === '_____1') {
          operationId = operation_detail.get("__originalOperationId")
        }
        const isOperationIdFiltered = operationId.indexOf(phrase) !== -1



        let isOperationFiltered = (
          isPathFiltered || isIdFiltered || isOperationIdFiltered
        )

        isTaggedOpsFiltered ||= isOperationFiltered

        return isOperationFiltered ? operation : null
      }).filter(operation => operation !== null)

      tagObj = tagObj.set("operations", filteredOperations)

      return (isTaggedOpsFiltered || isTagFiltered) ? tagObj : null
    }
  ).filter(tagObj => tagObj !== null)

  return filteredTaggedOps
}
