function TxStatus({ txHash }) {
  if (!txHash) return null

  return (
    <div className="mt-2">
      <p>
        Tx Hash:{' '}
        <a
          className="text-blue-600 underline"
          href={`https://sepolia.etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          {txHash}
        </a>
      </p>
    </div>
  )
}

export default TxStatus
