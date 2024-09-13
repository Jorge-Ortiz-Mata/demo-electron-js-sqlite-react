const DailiesList = ({ records }) => {
  return(
    <div className="container mx-auto py-4">
      <div className="grid grid-cols-1 gap-4">
        {
          records.length > 0 && records.map(record => {
            return(
              <div key={record.id} className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-lg font-semibold">{record.title}</h2>
                <p className="text-gray-600">{record.content}</p>
                <p className="text-gray-600 text-sm">ID: {record.id}</p>
                <span className="text-sm text-gray-500">Severity: {record.severity}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default DailiesList;
